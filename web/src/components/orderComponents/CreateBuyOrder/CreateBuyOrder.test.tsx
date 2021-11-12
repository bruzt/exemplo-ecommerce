import React from "react";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import router from "next/router";

import CreateBuyOrder from "./";
import { UserContextProvider } from "../../../contexts/userContext";
import { CartContextProvider } from "../../../contexts/cartContext";
import api from "../../../services/api";
import {
  fakeAddress,
  fakeFreightPrice,
  fakeUser,
  fakeOrder,
} from "../../../testUtils/fakeData";

jest.mock("next/router", () => require("next-router-mock"));

describe("CreateBuyOrder Tests", () => {
  it("should call api to create buy order", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onPost(`/orders`).reply(200, fakeOrder);

    const apiSpy = jest.spyOn(api, "post");

    await waitFor(() =>
      render(
        <CartContextProvider
          _testCartItems={[{ id: 1, qtd: 1 }]}
          _testFreightPrice={fakeFreightPrice}
          _testFreightSelected="sedex"
          _testAddressId={fakeAddress.id}
        >
          <UserContextProvider
            _testUser={{ ...fakeUser, addresses: [fakeAddress] }}
            _testLogin={true}
          >
            <CreateBuyOrder />
          </UserContextProvider>
        </CartContextProvider>
      )
    );

    expect(apiSpy).toBeCalledTimes(1);
    expect(router.pathname).toBe("order/1/payment");
  });
});
