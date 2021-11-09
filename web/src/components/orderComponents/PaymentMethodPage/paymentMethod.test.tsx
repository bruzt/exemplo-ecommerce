import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";

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
} from "../../../testUtils/fakeData";

jest.mock("next/router", () => require("next-router-mock"));

describe("Payment Method Tests", () => {
  it("should render credit card component", async () => {
    const { getByTestId, queryByTestId } = render(
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
    const { getByTestId, queryByTestId } = render(
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
    );

    const boletoButton = getByTestId("select-boleto-button");

    fireEvent.click(boletoButton);

    const boletoComponent = queryByTestId("boleto-component");
    const creditCardComponent = queryByTestId("credit-card-component");

    expect(boletoComponent).toBeInTheDocument();
    expect(creditCardComponent).not.toBeInTheDocument();
  });

  it("should have back button", async () => {
    const { queryByTestId } = render(
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
    );

    const paymentMethodBackButton = queryByTestId("payment-method-back-button");

    expect(paymentMethodBackButton).toBeInTheDocument();
  });
});
