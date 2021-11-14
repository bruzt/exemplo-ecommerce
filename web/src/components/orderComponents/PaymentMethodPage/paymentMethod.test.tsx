import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import router from "next/router";

import PaymentMethodPage from "./";
import { OrderContextProvider } from "../../../contexts/orderContext";
import { CartContextProvider } from "../../../contexts/cartContext";
import { UserContextProvider } from "../../../contexts/userContext";
import { ThemeContextProvider } from "../../../contexts/themeContext";
import { FilterBarContextProvider } from "../../../contexts/filterBarContext";
import api from "../../../services/api";
import {
  fakeAddress,
  fakeUser,
  fakeFreightPrice,
  fakeInstallments,
  fakeOrder,
  fakeCategories,
} from "../../../testUtils/fakeData";

jest.mock("next/router", () => require("next-router-mock"));

describe("Payment Method Tests", () => {
  it("should render credit card component", async () => {
    router.query.id = "1";

    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onGet("/orders/1")
      .reply(200, { ...fakeOrder, status: "select_payment_method" });

    const { getByTestId, queryByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <FilterBarContextProvider>
            <CartContextProvider>
              <OrderContextProvider>
                <UserContextProvider
                  _testUser={{ ...fakeUser, addresses: [fakeAddress] }}
                  _testLogin={true}
                >
                  <PaymentMethodPage />
                </UserContextProvider>
              </OrderContextProvider>
            </CartContextProvider>
          </FilterBarContextProvider>
        </ThemeContextProvider>
      )
    );

    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

    const creditCardButton = getByTestId("select-credit-card-button");

    await waitFor(() => fireEvent.click(creditCardButton));

    const boletoComponent = queryByTestId("boleto-component");
    const creditCardComponent = queryByTestId("credit-card-component");

    expect(creditCardComponent).toBeInTheDocument();
    expect(boletoComponent).not.toBeInTheDocument();
  });

  it("should render boleto component", async () => {
    router.query.id = "1";

    const apiMock = new MockAdapter(api);
    apiMock
      .onGet("/categories")
      .reply(200, fakeCategories)
      .onGet("/orders/1")
      .reply(200, { ...fakeOrder, status: "select_payment_method" });

    const { getByTestId, queryByTestId } = await waitFor(() =>
      render(
        <ThemeContextProvider>
          <FilterBarContextProvider>
            <OrderContextProvider>
              <CartContextProvider
                _testFreightPrice={fakeFreightPrice}
                _testFreightSelected="pac"
                _testAddressId={fakeAddress.id}
              >
                <UserContextProvider
                  _testUser={{ ...fakeUser, addresses: [fakeAddress] }}
                  _testLogin={true}
                >
                  <PaymentMethodPage />
                </UserContextProvider>
              </CartContextProvider>
            </OrderContextProvider>
          </FilterBarContextProvider>
        </ThemeContextProvider>
      )
    );

    const boletoButton = getByTestId("select-boleto-button");

    fireEvent.click(boletoButton);

    const boletoComponent = queryByTestId("boleto-component");
    const creditCardComponent = queryByTestId("credit-card-component");

    expect(boletoComponent).toBeInTheDocument();
    expect(creditCardComponent).not.toBeInTheDocument();
  });
});
