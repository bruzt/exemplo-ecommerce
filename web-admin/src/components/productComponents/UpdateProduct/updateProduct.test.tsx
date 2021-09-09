import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";

import UpdateProduct from "./";
import { ThemeContextProvider } from "../../../contexts/ThemeContext";
import api from "../../../services/api";
import { fakeProduct, fakeCategories } from "../../../testUtils/fakeData";

describe("Update Product Tests", () => {
  it("should close modal", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    let isModalOpen = true;
    function setModal(value: boolean) {
      isModalOpen = value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct product={fakeProduct} setUpdateModalOpen={setModal} />
        </ThemeContextProvider>
      )
    );

    const closeUpdateModalButton = getByTestId("close-update-modal-button");

    fireEvent.click(closeUpdateModalButton);

    expect(isModalOpen).toBe(false);
  });

  it("should call api to update a product", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPut("/products/1")
      .reply(200, fakeProduct);

    const apiSpy = jest.spyOn(api, "put");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const fakeProfuctWithSale = {
      ...fakeProduct,
      discount_datetime_start: "2021-08-06T14:36:51.149Z",
      discount_datetime_end: "2021-08-08T14:36:51.149Z",
    };

    function setModal(value: boolean) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct
            product={fakeProfuctWithSale}
            setUpdateModalOpen={setModal}
          />
        </ThemeContextProvider>
      )
    );

    const productTitleInput = getByTestId("product-title-input");
    const productDescriptionTextarea = getByTestId(
      "product-description-textarea"
    );
    const productPriceInput = getByTestId("product-price-input");
    const productStockInput = getByTestId("product-stock-input");
    const productCategorySelect = getByTestId("product-category-select");
    const productWeightInput = getByTestId("product-weight-input");
    const productLengthInput = getByTestId("product-length-input");
    const productHeightInput = getByTestId("product-height-input");
    const productWidthInput = getByTestId("product-width-input");
    const productDiscountInput = getByTestId("product-discount-input");
    const datetimeStartInput = getByTestId("datetime-start-input");
    const datetimeEndInput = getByTestId("datetime-end-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(productTitleInput, { target: { value: "teste titulo" } });
    fireEvent.change(productDescriptionTextarea, {
      target: { value: "teste descrição" },
    });
    fireEvent.change(productPriceInput, { target: { value: 111.11 } });
    fireEvent.change(productStockInput, { target: { value: 55 } });
    fireEvent.change(productCategorySelect, { target: { value: 1 } });
    fireEvent.change(productWeightInput, { target: { value: 1.111 } });
    fireEvent.change(productLengthInput, { target: { value: 11.1 } });
    fireEvent.change(productHeightInput, { target: { value: 12.2 } });
    fireEvent.change(productWidthInput, { target: { value: 13.3 } });
    fireEvent.change(productDiscountInput, { target: { value: 25 } });
    fireEvent.change(datetimeStartInput, {
      target: { value: "2021-09-08T00:00" },
    });
    fireEvent.change(datetimeEndInput, {
      target: { value: "2021-09-10T00:00" },
    });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(1);
  });

  it("should call api to update a product adding a image", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onPut("/products/1")
      .reply(200, fakeProduct)
      .onPost("/products/1/images")
      .reply(200);

    const apiSpy = jest.spyOn(api, "post");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });

    function setModal(value: boolean) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct
            product={fakeProduct}
            setUpdateModalOpen={setModal}
            _testFiles={[file]}
          />
        </ThemeContextProvider>
      )
    );
    const submitButton = getByTestId("submit-button");

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(1);
  });

  it("should not call api to update a product - title too small", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const apiSpy = jest.spyOn(api, "put");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    function setModal(value: boolean) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct product={fakeProduct} setUpdateModalOpen={setModal} />
        </ThemeContextProvider>
      )
    );

    const productTitleInput = getByTestId("product-title-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(productTitleInput, { target: { value: "" } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to update a product - description too small", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const apiSpy = jest.spyOn(api, "put");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    function setModal(value: boolean) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct product={fakeProduct} setUpdateModalOpen={setModal} />
        </ThemeContextProvider>
      )
    );

    const productDescriptionTextarea = getByTestId(
      "product-description-textarea"
    );
    const submitButton = getByTestId("submit-button");

    fireEvent.change(productDescriptionTextarea, {
      target: { value: "" },
    });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to update a product - no price", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const apiSpy = jest.spyOn(api, "put");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    function setModal(value: boolean) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct product={fakeProduct} setUpdateModalOpen={setModal} />
        </ThemeContextProvider>
      )
    );

    const productPriceInput = getByTestId("product-price-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(productPriceInput, { target: { value: "" } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to update a product - no category selected", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const apiSpy = jest.spyOn(api, "put");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    function setModal(value: boolean) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct product={fakeProduct} setUpdateModalOpen={setModal} />
        </ThemeContextProvider>
      )
    );

    const productCategorySelect = getByTestId("product-category-select");

    const submitButton = getByTestId("submit-button");

    fireEvent.change(productCategorySelect, { target: { value: "0" } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to update a product - no weight", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const apiSpy = jest.spyOn(api, "put");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    function setModal(value: boolean) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct product={fakeProduct} setUpdateModalOpen={setModal} />
        </ThemeContextProvider>
      )
    );

    const productWeightInput = getByTestId("product-weight-input");

    const submitButton = getByTestId("submit-button");

    fireEvent.change(productWeightInput, { target: { value: "" } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to update a product - no length", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const apiSpy = jest.spyOn(api, "put");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    function setModal(value: boolean) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct product={fakeProduct} setUpdateModalOpen={setModal} />
        </ThemeContextProvider>
      )
    );

    const productLengthInput = getByTestId("product-length-input");

    const submitButton = getByTestId("submit-button");

    fireEvent.change(productLengthInput, { target: { value: "" } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to update a product - no height", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const apiSpy = jest.spyOn(api, "put");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    function setModal(value: boolean) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct product={fakeProduct} setUpdateModalOpen={setModal} />
        </ThemeContextProvider>
      )
    );

    const productHeightInput = getByTestId("product-height-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(productHeightInput, { target: { value: "" } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });

  it("should not call api to update a product - no width", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const apiSpy = jest.spyOn(api, "put");

    const alertSpy = jest.spyOn(window, "alert");
    alertSpy.mockImplementation(jest.fn(() => true));

    function setModal(value: boolean) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <UpdateProduct product={fakeProduct} setUpdateModalOpen={setModal} />
        </ThemeContextProvider>
      )
    );

    const productWidthInput = getByTestId("product-width-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(productWidthInput, { target: { value: "" } });

    await waitFor(() => fireEvent.click(submitButton));

    expect(apiSpy).toBeCalledTimes(0);
  });
});
