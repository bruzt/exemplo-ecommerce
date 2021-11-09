import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import CreditCardPayment from "./";
import { CartContextProvider } from "../../../contexts/cartContext";
import { UserContextProvider } from "../../../contexts/userContext";
import { OrderContextProvider } from "../../../contexts/orderContext";
import {
  fakeUser,
  fakeCpfs,
  fakeAddress,
  fakeCreditCardOrder,
  fakeFreightPrice,
  fakeInstallments,
  fakeOrder,
  fakeAxiosUfs,
} from "../../../testUtils/fakeData";
import api from "../../../services/api";

jest.mock("next/router", () => require("next-router-mock"));

describe("Credit Card Payment Tests", () => {
  it("should call api to pay with credit card", async () => {
    const apiMock = new MockAdapter(api);
    apiMock
      .onPost("/installments")
      .reply(200, fakeInstallments)
      .onPost(`/orders/${fakeOrder.id}/payment`)
      .reply(200, fakeCreditCardOrder);

    const axiosMock = new MockAdapter(axios);
    axiosMock
      .onGet("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .reply(200, fakeAxiosUfs);

    const spyApi = jest.spyOn(api, "post");

    function mockSetDisable(value = false) {
      return value;
    }

    function mockShowThanksForBuy(value = false) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <UserContextProvider
          _testUser={{ ...fakeUser, addresses: [fakeAddress] }}
          _testLogin={true}
        >
          <OrderContextProvider>
            <CreditCardPayment
              order={fakeOrder}
              getDisabledBoletoButton={mockSetDisable()}
              setDisabledBoletoButton={mockSetDisable}
              setShowThanksForBuy={mockShowThanksForBuy}
            />
          </OrderContextProvider>
        </UserContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");
    const sameAddressButton = getByTestId("same-address-button");
    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "12345678987" } });

    fireEvent.click(sameAddressButton);

    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(spyApi).toBeCalledTimes(2);
  });

  it("should not call api to pay with credit card - name too small", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");
    const sameAddressButton = getByTestId("same-address-button");
    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Te" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "19999999999" } });

    fireEvent.click(sameAddressButton);

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - card number too small", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");
    const sameAddressButton = getByTestId("same-address-button");
    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, { target: { value: "411111111111111" } });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "19999999999" } });

    fireEvent.click(sameAddressButton);

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - card cvv too small", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");
    const sameAddressButton = getByTestId("same-address-button");
    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "99" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "19999999999" } });

    fireEvent.click(sameAddressButton);

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - month not selected", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");
    const sameAddressButton = getByTestId("same-address-button");
    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "19999999999" } });

    fireEvent.click(sameAddressButton);

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - year not selected", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");
    const sameAddressButton = getByTestId("same-address-button");
    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "19999999999" } });

    fireEvent.click(sameAddressButton);

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - CPF too small", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");
    const sameAddressButton = getByTestId("same-address-button");
    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0].substr(-1) } });
    fireEvent.change(phoneInput, { target: { value: "19999999999" } });

    fireEvent.click(sameAddressButton);

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - phone too small", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");
    const sameAddressButton = getByTestId("same-address-button");
    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "199999999" } });

    fireEvent.click(sameAddressButton);

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - street too small", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");

    const streetInput = getByTestId("street");
    const numberInput = getByTestId("number-input");
    const neighborhoodInput = getByTestId("neighborhood");
    const cityInput = getByTestId("city");
    const stateInput = getByTestId("state");
    const zipcodeInput = getByTestId("zipcode");

    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "199999999" } });

    fireEvent.change(streetInput, { target: { value: "ru" } });
    fireEvent.change(numberInput, { target: { value: "542" } });
    fireEvent.change(neighborhoodInput, {
      target: { value: "bairro bairroso" },
    });
    fireEvent.change(cityInput, { target: { value: "Limeira" } });
    fireEvent.change(stateInput, { target: { value: "SP" } });
    fireEvent.change(zipcodeInput, { target: { value: "12240650" } });

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - home number too small", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");

    const streetInput = getByTestId("street");
    const numberInput = getByTestId("number-input");
    const neighborhoodInput = getByTestId("neighborhood");
    const cityInput = getByTestId("city");
    const stateInput = getByTestId("state");
    const zipcodeInput = getByTestId("zipcode");

    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "199999999" } });

    fireEvent.change(streetInput, { target: { value: "rua foo" } });
    fireEvent.change(numberInput, { target: { value: "" } });
    fireEvent.change(neighborhoodInput, {
      target: { value: "bairro bairroso" },
    });
    fireEvent.change(cityInput, { target: { value: "Limeira" } });
    fireEvent.change(stateInput, { target: { value: "SP" } });
    fireEvent.change(zipcodeInput, { target: { value: "12240650" } });

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - neighborhood too small", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");

    const streetInput = getByTestId("street");
    const numberInput = getByTestId("number-input");
    const neighborhoodInput = getByTestId("neighborhood");
    const cityInput = getByTestId("city");
    const stateInput = getByTestId("state");
    const zipcodeInput = getByTestId("zipcode");

    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "199999999" } });

    fireEvent.change(streetInput, { target: { value: "rua foo" } });
    fireEvent.change(numberInput, { target: { value: "542" } });
    fireEvent.change(neighborhoodInput, { target: { value: "ba" } });
    fireEvent.change(cityInput, { target: { value: "Limeira" } });
    fireEvent.change(stateInput, { target: { value: "SP" } });
    fireEvent.change(zipcodeInput, { target: { value: "12240650" } });

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - city too small", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");

    const streetInput = getByTestId("street");
    const numberInput = getByTestId("number-input");
    const neighborhoodInput = getByTestId("neighborhood");
    const cityInput = getByTestId("city");
    const stateInput = getByTestId("state");
    const zipcodeInput = getByTestId("zipcode");

    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "199999999" } });

    fireEvent.change(streetInput, { target: { value: "rua foo" } });
    fireEvent.change(numberInput, { target: { value: "542" } });
    fireEvent.change(neighborhoodInput, {
      target: { value: "bairro bairroso" },
    });
    fireEvent.change(cityInput, { target: { value: "Li" } });
    fireEvent.change(stateInput, { target: { value: "SP" } });
    fireEvent.change(zipcodeInput, { target: { value: "12240650" } });

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - state not selected", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");

    const streetInput = getByTestId("street");
    const numberInput = getByTestId("number-input");
    const neighborhoodInput = getByTestId("neighborhood");
    const cityInput = getByTestId("city");
    const stateInput = getByTestId("state");
    const zipcodeInput = getByTestId("zipcode");

    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "199999999" } });

    fireEvent.change(streetInput, { target: { value: "rua foo" } });
    fireEvent.change(numberInput, { target: { value: "542" } });
    fireEvent.change(neighborhoodInput, {
      target: { value: "bairro bairroso" },
    });
    fireEvent.change(cityInput, { target: { value: "Limeira" } });
    fireEvent.change(stateInput, { target: { value: "" } });
    fireEvent.change(zipcodeInput, { target: { value: "12240650" } });

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });

  it("should not call api to pay with credit card - zipcode too small", async () => {
    const apiInstallmentsMock = new MockAdapter(api);
    apiInstallmentsMock.onPost("/installments").reply(200, fakeInstallments);

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
              <CreditCardPayment
                order={fakeOrder}
                getDisabledBoletoButton={mockSetDisable()}
                setDisabledBoletoButton={mockSetDisable}
                setShowThanksForBuy={mockShowThanksForBuy}
              />
            </OrderContextProvider>
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    const cardHolderNameInput = getByTestId("card-holder-name");
    const cardNumberInput = getByTestId("card-number");
    const cardCvvInput = getByTestId("card-cvv");
    const cardExpirationMonthInput = getByTestId("card-expiration-month");
    const cardExpirationYearInput = getByTestId("card-expiration-year");
    const phoneInput = getByTestId("phone");
    const cpfInput = getByTestId("cpf");

    const streetInput = getByTestId("street");
    const numberInput = getByTestId("number-input");
    const neighborhoodInput = getByTestId("neighborhood");
    const cityInput = getByTestId("city");
    const stateInput = getByTestId("state");
    const zipcodeInput = getByTestId("zipcode");

    const paySubmitButton = getByTestId("pay-submit-button");

    fireEvent.change(cardHolderNameInput, { target: { value: "Test User" } });
    fireEvent.change(cardNumberInput, {
      target: { value: "4111111111111111" },
    });
    fireEvent.change(cardCvvInput, { target: { value: "999" } });
    fireEvent.change(cardExpirationMonthInput, { target: { value: "12" } });
    fireEvent.change(cardExpirationYearInput, {
      target: { value: String(new Date().getFullYear()).substr(-2) },
    });
    fireEvent.change(cpfInput, { target: { value: fakeCpfs[0] } });
    fireEvent.change(phoneInput, { target: { value: "199999999" } });

    fireEvent.change(streetInput, { target: { value: "rua foo" } });
    fireEvent.change(numberInput, { target: { value: "542" } });
    fireEvent.change(neighborhoodInput, {
      target: { value: "bairro bairroso" },
    });
    fireEvent.change(cityInput, { target: { value: "Limeira" } });
    fireEvent.change(stateInput, { target: { value: "SP" } });
    fireEvent.change(zipcodeInput, { target: { value: "1224065" } });

    const apiOrderMock = new MockAdapter(api);
    apiOrderMock.onPost("/orders").reply(200, fakeCreditCardOrder);
    await waitFor(() => fireEvent.click(paySubmitButton));

    expect(paySubmitButton).toBeDisabled();
    expect(spyApi).toBeCalledTimes(1);
  });
});
