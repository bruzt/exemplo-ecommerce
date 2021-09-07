import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";

import ListProducts from "./";
import { ThemeContextProvider } from "../../../contexts/ThemeContext";
import api from "../../../services/api";
import {
  fakeProducts,
  fakeProduct,
  fakeCategories,
} from "../../../testUtils/fakeData";

jest.mock("next/router", () => require("next-router-mock"));

describe("List Products Tests", () => {
  it("should list products", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/products?offset=0&limit=15&filter=id")
      .reply(200, fakeProducts);

    const { queryAllByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <ListProducts />
        </ThemeContextProvider>
      )
    );

    const productsRows = queryAllByTestId("product-row");

    expect(productsRows.length).toBeGreaterThan(0);
  });

  it("should search by product id", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/products?offset=0&limit=15&filter=id")
      .reply(200, fakeProducts)
      .onGet("/products/1")
      .reply(200, fakeProduct);

    const { queryByTestId, getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <ListProducts />
        </ThemeContextProvider>
      )
    );

    const searchProductInput = getByTestId("search-product-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(searchProductInput, { target: { value: "1" } });

    await waitFor(() => fireEvent.click(submitButton));

    const productsRow = queryByTestId("product-row");

    expect(productsRow).toBeInTheDocument();
  });

  it("should search by product title", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/products?offset=0&limit=15&filter=id")
      .reply(200, fakeProducts)
      .onGet("/products?title=produto&offset=0&limit=15")
      .reply(200, fakeProducts);

    const { queryAllByTestId, getByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <ListProducts />
        </ThemeContextProvider>
      )
    );

    const searchProductInput = getByTestId("search-product-input");
    const submitButton = getByTestId("submit-button");

    fireEvent.change(searchProductInput, { target: { value: "produto" } });

    await waitFor(() => fireEvent.click(submitButton));

    const productsRows = queryAllByTestId("product-row");

    expect(productsRows.length).toBeGreaterThan(0);
  });

  it("should open update modal", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/products?offset=0&limit=15&filter=id")
      .reply(200, fakeProducts)
      .onGet("/categories")
      .reply(200, fakeCategories);

    const { queryAllByTestId, queryByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <ListProducts />
        </ThemeContextProvider>
      )
    );

    const updateModalButtons = queryAllByTestId("update-modal-button");

    await waitFor(() => fireEvent.click(updateModalButtons[0]));

    const updateModalContainer = queryByTestId("update-modal-container");

    expect(updateModalContainer).toBeInTheDocument();
  });

  it("should delete a product", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/products?offset=0&limit=15&filter=id")
      .reply(200, fakeProducts)
      .onDelete("/products/1")
      .reply(204);

    const apiSpy = jest.spyOn(api, "delete");

    const confirmSpy = jest.spyOn(window, "confirm");
    confirmSpy.mockImplementation(jest.fn(() => true));

    const { queryAllByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <ListProducts />
        </ThemeContextProvider>
      )
    );

    const deleteButtons = queryAllByTestId("delete-button");

    await waitFor(() => fireEvent.click(deleteButtons[0]));

    expect(confirmSpy).toBeCalledTimes(1);
    expect(apiSpy).toBeCalledTimes(1);
  });
});
