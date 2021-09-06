import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";

import ImagesGrid from "./";
import { ThemeContextProvider } from "../../../contexts/ThemeContext";
import api from "../../../services/api";
import { fakeProduct } from "../../../testUtils/fakeData";

describe("Images Grid Tests", () => {
  it("should show product images", async () => {
    const { queryAllByTestId } = render(
      <ThemeContextProvider>
        <ImagesGrid product={fakeProduct} />
      </ThemeContextProvider>
    );

    const images = queryAllByTestId("product-img");

    expect(images[0]).toBeInTheDocument();
  });

  it("should delete product images", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onDelete("/products/images/3").reply(204);

    const apiSpy = jest.spyOn(api, "delete");

    const spyConfirm = jest.spyOn(window, "confirm");
    spyConfirm.mockImplementation(jest.fn(() => true));

    const { queryAllByTestId, getAllByTestId } = render(
      <ThemeContextProvider>
        <ImagesGrid product={fakeProduct} />
      </ThemeContextProvider>
    );

    const removeButtons = getAllByTestId("remove-button");

    await waitFor(() => fireEvent.click(removeButtons[0]));

    const images = queryAllByTestId("product-img");

    expect(images.length).toBe(0);
    expect(spyConfirm).toBeCalledTimes(1);
    expect(apiSpy).toBeCalledTimes(1);
  });
});
