import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";

import AddProduct from "./";
import { ThemeContextProvider } from "../../../contexts/ThemeContext";
import api from "../../../services/api";
import { fakeCategories, fakeProduct } from "../../../testUtils/fakeData";

describe("Add Product Tests", () => {
  it("should call api to add product", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPost("/products")
      .reply(201, fakeProduct);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <AddProduct />
        </ThemeContextProvider>
      )
    );

    const titleInput = getByTestId("product-title-input");
    const descriptionInput = getByTestId("product-description-input");
    const priceInput = getByTestId("product-price-input");
    const stockInput = getByTestId("product-stock-input");
    const categorySelect = getByTestId("product-category-select");
    const tangibleSelect = getByTestId("product-tangible-select");
    const weightInput = getByTestId("product-weight-input");
    const lengthInput = getByTestId("product-length-input");
    const heightInput = getByTestId("product-height-input");
    const widthInput = getByTestId("product-width-input");
    const discountInput = getByTestId('product-discount-input');
    const datetimeStartInput = getByTestId('datetime-start-input');
    const datetimeEndInput = getByTestId('datetime-end-input');
    const submitButton = getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "product test" } });
    fireEvent.change(descriptionInput, { target: { value: "some product" } });
    fireEvent.change(priceInput, { target: { value: 10.5 } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(categorySelect, { target: { value: 1 } });
    fireEvent.change(tangibleSelect, { target: { value: 1 } });
    fireEvent.change(weightInput, { target: { value: 1.777 } });
    fireEvent.change(lengthInput, { target: { value: 15.5 } });
    fireEvent.change(heightInput, { target: { value: 20.9 } });
    fireEvent.change(widthInput, { target: { value: 12 } });
    fireEvent.change(discountInput, { target: { value: 10 } });
    fireEvent.change(datetimeStartInput, { target: { value: '2021-09-02T00:00' } });
    fireEvent.change(datetimeEndInput, { target: { value: '2021-09-03T00:00' } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(1);
  });

  it("should call api to add product and images", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPost("/products")
      .reply(201, fakeProduct)
      .onPost("/products/1/images")
      .reply(200);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <AddProduct _testFiles={[file]} />
        </ThemeContextProvider>
      )
    );

    const titleInput = getByTestId("product-title-input");
    const descriptionInput = getByTestId("product-description-input");
    const priceInput = getByTestId("product-price-input");
    const stockInput = getByTestId("product-stock-input");
    const categorySelect = getByTestId("product-category-select");
    const tangibleSelect = getByTestId("product-tangible-select");
    const weightInput = getByTestId("product-weight-input");
    const lengthInput = getByTestId("product-length-input");
    const heightInput = getByTestId("product-height-input");
    const widthInput = getByTestId("product-width-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "product test" } });
    fireEvent.change(descriptionInput, { target: { value: "some product" } });
    fireEvent.change(priceInput, { target: { value: 10.5 } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(categorySelect, { target: { value: 1 } });
    fireEvent.change(tangibleSelect, { target: { value: 1 } });
    fireEvent.change(weightInput, { target: { value: 1.777 } });
    fireEvent.change(lengthInput, { target: { value: 15.5 } });
    fireEvent.change(heightInput, { target: { value: 20.9 } });
    fireEvent.change(widthInput, { target: { value: 12 } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(2);
  });

  it("should not call api to add product - no title", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPost("/products")
      .reply(201, fakeProduct);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <AddProduct />
        </ThemeContextProvider>
      )
    );

    const descriptionInput = getByTestId("product-description-input");
    const priceInput = getByTestId("product-price-input");
    const stockInput = getByTestId("product-stock-input");
    const categorySelect = getByTestId("product-category-select");
    const tangibleSelect = getByTestId("product-tangible-select");
    const weightInput = getByTestId("product-weight-input");
    const lengthInput = getByTestId("product-length-input");
    const heightInput = getByTestId("product-height-input");
    const widthInput = getByTestId("product-width-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(descriptionInput, { target: { value: "some product" } });
    fireEvent.change(priceInput, { target: { value: 10.5 } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(categorySelect, { target: { value: 1 } });
    fireEvent.change(tangibleSelect, { target: { value: 1 } });
    fireEvent.change(weightInput, { target: { value: 1.777 } });
    fireEvent.change(lengthInput, { target: { value: 15.5 } });
    fireEvent.change(heightInput, { target: { value: 20.9 } });
    fireEvent.change(widthInput, { target: { value: 12 } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to add product - no description", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPost("/products")
      .reply(201, fakeProduct);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <AddProduct />
        </ThemeContextProvider>
      )
    );

    const titleInput = getByTestId("product-title-input");
    const priceInput = getByTestId("product-price-input");
    const stockInput = getByTestId("product-stock-input");
    const categorySelect = getByTestId("product-category-select");
    const tangibleSelect = getByTestId("product-tangible-select");
    const weightInput = getByTestId("product-weight-input");
    const lengthInput = getByTestId("product-length-input");
    const heightInput = getByTestId("product-height-input");
    const widthInput = getByTestId("product-width-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "product test" } });
    fireEvent.change(priceInput, { target: { value: 10.5 } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(categorySelect, { target: { value: 1 } });
    fireEvent.change(tangibleSelect, { target: { value: 1 } });
    fireEvent.change(weightInput, { target: { value: 1.777 } });
    fireEvent.change(lengthInput, { target: { value: 15.5 } });
    fireEvent.change(heightInput, { target: { value: 20.9 } });
    fireEvent.change(widthInput, { target: { value: 12 } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to add product - no price", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPost("/products")
      .reply(201, fakeProduct);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <AddProduct />
        </ThemeContextProvider>
      )
    );

    const titleInput = getByTestId("product-title-input");
    const descriptionInput = getByTestId("product-description-input");
    const stockInput = getByTestId("product-stock-input");
    const categorySelect = getByTestId("product-category-select");
    const tangibleSelect = getByTestId("product-tangible-select");
    const weightInput = getByTestId("product-weight-input");
    const lengthInput = getByTestId("product-length-input");
    const heightInput = getByTestId("product-height-input");
    const widthInput = getByTestId("product-width-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "product test" } });
    fireEvent.change(descriptionInput, { target: { value: "some product" } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(categorySelect, { target: { value: 1 } });
    fireEvent.change(tangibleSelect, { target: { value: 1 } });
    fireEvent.change(weightInput, { target: { value: 1.777 } });
    fireEvent.change(lengthInput, { target: { value: 15.5 } });
    fireEvent.change(heightInput, { target: { value: 20.9 } });
    fireEvent.change(widthInput, { target: { value: 12 } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to add product - no category", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPost("/products")
      .reply(201, fakeProduct);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <AddProduct />
        </ThemeContextProvider>
      )
    );

    const titleInput = getByTestId("product-title-input");
    const descriptionInput = getByTestId("product-description-input");
    const priceInput = getByTestId("product-price-input");
    const stockInput = getByTestId("product-stock-input");
    const tangibleSelect = getByTestId("product-tangible-select");
    const weightInput = getByTestId("product-weight-input");
    const lengthInput = getByTestId("product-length-input");
    const heightInput = getByTestId("product-height-input");
    const widthInput = getByTestId("product-width-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "product test" } });
    fireEvent.change(descriptionInput, { target: { value: "some product" } });
    fireEvent.change(priceInput, { target: { value: 10.5 } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(tangibleSelect, { target: { value: 1 } });
    fireEvent.change(weightInput, { target: { value: 1.777 } });
    fireEvent.change(lengthInput, { target: { value: 15.5 } });
    fireEvent.change(heightInput, { target: { value: 20.9 } });
    fireEvent.change(widthInput, { target: { value: 12 } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to add product - no weight", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPost("/products")
      .reply(201, fakeProduct);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <AddProduct />
        </ThemeContextProvider>
      )
    );

    const titleInput = getByTestId("product-title-input");
    const descriptionInput = getByTestId("product-description-input");
    const priceInput = getByTestId("product-price-input");
    const stockInput = getByTestId("product-stock-input");
    const categorySelect = getByTestId("product-category-select");
    const tangibleSelect = getByTestId("product-tangible-select");
    const lengthInput = getByTestId("product-length-input");
    const heightInput = getByTestId("product-height-input");
    const widthInput = getByTestId("product-width-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "product test" } });
    fireEvent.change(descriptionInput, { target: { value: "some product" } });
    fireEvent.change(priceInput, { target: { value: 10.5 } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(categorySelect, { target: { value: 1 } });
    fireEvent.change(tangibleSelect, { target: { value: 1 } });
    fireEvent.change(lengthInput, { target: { value: 15.5 } });
    fireEvent.change(heightInput, { target: { value: 20.9 } });
    fireEvent.change(widthInput, { target: { value: 12 } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to add product - no length", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPost("/products")
      .reply(201, fakeProduct);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <AddProduct />
        </ThemeContextProvider>
      )
    );

    const titleInput = getByTestId("product-title-input");
    const descriptionInput = getByTestId("product-description-input");
    const priceInput = getByTestId("product-price-input");
    const stockInput = getByTestId("product-stock-input");
    const categorySelect = getByTestId("product-category-select");
    const tangibleSelect = getByTestId("product-tangible-select");
    const weightInput = getByTestId("product-weight-input");
    const heightInput = getByTestId("product-height-input");
    const widthInput = getByTestId("product-width-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "product test" } });
    fireEvent.change(descriptionInput, { target: { value: "some product" } });
    fireEvent.change(priceInput, { target: { value: 10.5 } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(categorySelect, { target: { value: 1 } });
    fireEvent.change(tangibleSelect, { target: { value: 1 } });
    fireEvent.change(weightInput, { target: { value: 1.777 } });
    fireEvent.change(heightInput, { target: { value: 20.9 } });
    fireEvent.change(widthInput, { target: { value: 12 } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to add product - no height", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPost("/products")
      .reply(201, fakeProduct);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <AddProduct />
        </ThemeContextProvider>
      )
    );

    const titleInput = getByTestId("product-title-input");
    const descriptionInput = getByTestId("product-description-input");
    const priceInput = getByTestId("product-price-input");
    const stockInput = getByTestId("product-stock-input");
    const categorySelect = getByTestId("product-category-select");
    const tangibleSelect = getByTestId("product-tangible-select");
    const weightInput = getByTestId("product-weight-input");
    const lengthInput = getByTestId("product-length-input");
    const widthInput = getByTestId("product-width-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "product test" } });
    fireEvent.change(descriptionInput, { target: { value: "some product" } });
    fireEvent.change(priceInput, { target: { value: 10.5 } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(categorySelect, { target: { value: 1 } });
    fireEvent.change(tangibleSelect, { target: { value: 1 } });
    fireEvent.change(weightInput, { target: { value: 1.777 } });
    fireEvent.change(lengthInput, { target: { value: 15.5 } });
    fireEvent.change(widthInput, { target: { value: 12 } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to add product - no width", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPost("/products")
      .reply(201, fakeProduct);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <AddProduct />
        </ThemeContextProvider>
      )
    );

    const titleInput = getByTestId("product-title-input");
    const descriptionInput = getByTestId("product-description-input");
    const priceInput = getByTestId("product-price-input");
    const stockInput = getByTestId("product-stock-input");
    const categorySelect = getByTestId("product-category-select");
    const tangibleSelect = getByTestId("product-tangible-select");
    const weightInput = getByTestId("product-weight-input");
    const lengthInput = getByTestId("product-length-input");
    const heightInput = getByTestId("product-height-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(titleInput, { target: { value: "product test" } });
    fireEvent.change(descriptionInput, { target: { value: "some product" } });
    fireEvent.change(priceInput, { target: { value: 10.5 } });
    fireEvent.change(stockInput, { target: { value: 10 } });
    fireEvent.change(categorySelect, { target: { value: 1 } });
    fireEvent.change(tangibleSelect, { target: { value: 1 } });
    fireEvent.change(weightInput, { target: { value: 1.777 } });
    fireEvent.change(lengthInput, { target: { value: 15.5 } });
    fireEvent.change(heightInput, { target: { value: 20.9 } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });
});
