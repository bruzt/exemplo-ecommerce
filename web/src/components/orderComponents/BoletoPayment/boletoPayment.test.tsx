import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";

import BoletoPayment from "./";
import { CartContextProvider } from "../../../contexts/cartContext";
import { UserContextProvider } from "../../../contexts/userContext";
import { OrderContextProvider } from "../../../contexts/orderContext";
import {
  fakeUser,
  fakeCpfs,
  fakeAddress,
  fakeBoletoOrder,
  fakeFreightPrice,
  fakeOrder,
} from "../../../testUtils/fakeData";
import api from "../../../services/api";

jest.mock("next/router", () => require("next-router-mock"));

describe("Boleto Payment Tests", () => {
  beforeAll(() => {
    const apiMock = new MockAdapter(api);
    apiMock.onPost("/orders").reply(200, fakeBoletoOrder);
  });

  it("should call api to create boleto", async () => {
    const spyApi = jest.spyOn(api, "post");

    function mockSetDisable(value = true) {
      return value;
    }
    function mockShowThanksForBuy(value = false) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <CartContextProvider
          _testFreightPrice={fakeFreightPrice}
          _testFreightSelected="pac"
          _testAddressId={fakeAddress.id}
        >
          <UserContextProvider
            _testUser={{ ...fakeUser, addresses: [fakeAddress] }}
            _testLogin={true}
          >
            <OrderContextProvider>
              <BoletoPayment
                order={fakeOrder}
                getDisabledCreditCardButton={mockSetDisable()}
                setDisabledCreditCardButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cpfInput = getByTestId("cpf");
    const phoneInput = getByTestId("phone");
    const boletoSubmitButton = getByTestId("boleto-submit-button");

    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: 1999999999 } });

    await waitFor(() => fireEvent.click(boletoSubmitButton));

    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not allow to create boleto - invalid CPF", async () => {
    const spyApi = jest.spyOn(api, "post");

    function mockSetDisable(value = true) {
      return value;
    }

    function mockShowThanksForBuy(value = false) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <CartContextProvider
          _testFreightPrice={fakeFreightPrice}
          _testFreightSelected="pac"
          _testAddressId={fakeAddress.id}
        >
          <UserContextProvider
            _testUser={{ ...fakeUser, addresses: [fakeAddress] }}
            _testLogin={true}
          >
            <OrderContextProvider>
              <BoletoPayment
                order={fakeOrder}
                getDisabledCreditCardButton={mockSetDisable()}
                setDisabledCreditCardButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cpfInput = getByTestId("cpf");
    const phoneInput = getByTestId("phone");
    const boletoSubmitButton = getByTestId("boleto-submit-button");

    fireEvent.change(cpfInput, { target: { value: 99999999999 } });
    fireEvent.change(phoneInput, { target: { value: 19999999999 } });

    await waitFor(() => fireEvent.click(boletoSubmitButton));

    expect(spyApi).toBeCalledTimes(0);
  });
});
