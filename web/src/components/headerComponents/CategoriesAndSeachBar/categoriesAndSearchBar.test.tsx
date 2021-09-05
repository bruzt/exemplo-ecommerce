import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import router from "next/router";

import CategoriesAndSearchBar from "./";
import { FilterBarContextProvider } from "../../../contexts/filterBarContext";
import { ThemeContextProvider } from "../../../contexts/themeContext";
import api from "../../../services/api";
import { fakeCategories, fakeProducts } from "../../../testUtils/fakeData";

jest.mock("next/router", () => require("next-router-mock"));

describe("Categories and Search Bar Tests", () => {
  /*beforeAll(() => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);
    apiMock.onGet("/products?limit=5&title=placa}").reply(200, fakeProducts);
  });*/

  it("should open category dropdown", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const { getByTestId } = await waitFor(() =>
      render(
        <FilterBarContextProvider>
          <ThemeContextProvider>
            <CategoriesAndSearchBar />
          </ThemeContextProvider>
        </FilterBarContextProvider>
      )
    );

    const categoryDropDownLi = getByTestId("category-menu") as HTMLLIElement;
    const firstLevelCategoriesUl = getByTestId(
      "first-level-categories"
    ) as HTMLUListElement;

    fireEvent.click(categoryDropDownLi);

    expect(categoryDropDownLi).toHaveClass("active");
    expect(firstLevelCategoriesUl).toHaveStyle("display: block");
  });

  it("should category dropdown be closed", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const { getByTestId } = await waitFor(() =>
      render(
        <FilterBarContextProvider>
          <ThemeContextProvider>
            <CategoriesAndSearchBar />
          </ThemeContextProvider>
        </FilterBarContextProvider>
      )
    );

    const categoryDropDownLi = getByTestId("category-menu") as HTMLLIElement;
    const firstLevelCategoriesUl = getByTestId(
      "first-level-categories"
    ) as HTMLUListElement;

    expect(categoryDropDownLi).not.toHaveClass("active");
    expect(firstLevelCategoriesUl).toHaveStyle("display: none");
  });

  it("should redirect to search page", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onGet("/products?categoryId=1&page=1&category=hardware")
      .reply(200, fakeProducts);

    const { getByTestId, getAllByTestId } = await waitFor(() =>
      render(
        <FilterBarContextProvider>
          <ThemeContextProvider>
            <CategoriesAndSearchBar />
          </ThemeContextProvider>
        </FilterBarContextProvider>
      )
    );

    const categoryDropDownLi = getByTestId("category-menu") as HTMLLIElement;
    const [categoryChildrenLi] = getAllByTestId(
      "category-children"
    ) as HTMLLIElement[];

    fireEvent.click(categoryDropDownLi);
    fireEvent.click(categoryChildrenLi);

    expect(categoryDropDownLi).not.toHaveClass("active");
    expect(router.pathname).toBe("/search");
  });

  it("should close category menu when click in other element (click away)", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const { getByTestId } = await waitFor(() =>
      render(
        <FilterBarContextProvider>
          <ThemeContextProvider>
            <CategoriesAndSearchBar />
          </ThemeContextProvider>
        </FilterBarContextProvider>
      )
    );

    const categoryDropDownLi = getByTestId("category-menu") as HTMLLIElement;
    const searchBarInput = getByTestId("search-bar") as HTMLInputElement;

    fireEvent.click(categoryDropDownLi);
    fireEvent.click(searchBarInput);

    expect(categoryDropDownLi).not.toHaveClass("active");
  });

  it("should search for title", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onGet("/products?limit=5&title=placa}")
      .reply(200, fakeProducts)
      .onGet("/products?page=1&title=placa}")
      .reply(200, fakeProducts);

    const spyApi = jest.spyOn(api, "get");

    const { getByTestId } = await waitFor(() =>
      render(
        <FilterBarContextProvider>
          <ThemeContextProvider>
            <CategoriesAndSearchBar />
          </ThemeContextProvider>
        </FilterBarContextProvider>
      )
    );

    const searchBarInput = getByTestId("search-bar") as HTMLInputElement;
    const searchBarButton = getByTestId(
      "search-bar-button"
    ) as HTMLButtonElement;

    fireEvent.change(searchBarInput, { target: { value: "placa" } });
    fireEvent.click(searchBarButton);

    expect(spyApi).toBeCalledTimes(1);
    expect(router.pathname).toBe("/search");
  });

  it("should change theme", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    const { getByTestId } = await waitFor(() =>
      render(
        <FilterBarContextProvider>
          <ThemeContextProvider>
            <CategoriesAndSearchBar />
          </ThemeContextProvider>
        </FilterBarContextProvider>
      )
    );

    const themeSwitch = getByTestId("theme-switch");
    const categoryMenu = getByTestId("category-menu");

    fireEvent.click(themeSwitch);

    expect(categoryMenu).toHaveStyle("background: #16324C");
  });

  it("should change theme back to dark", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    await act(async () => {
      const { getByTestId } = render(
        <FilterBarContextProvider>
          <ThemeContextProvider>
            <CategoriesAndSearchBar />
          </ThemeContextProvider>
        </FilterBarContextProvider>
      );

      const themeSwitch = getByTestId("theme-switch");
      const categoryMenu = getByTestId("category-menu");

      fireEvent.click(themeSwitch);
      fireEvent.click(themeSwitch);

      expect(categoryMenu).toHaveStyle("background: #0D2235");
    });
  });
});
