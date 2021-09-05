import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";

import MobileMenu from "./";
import { UserContextProvider } from "../../../contexts/userContext";
import { FilterBarContextProvider } from "../../../contexts/filterBarContext";
import { fakeUser, fakeCategories } from "../../../testUtils/fakeData";
import api from "../../../services/api";

jest.mock("next/router", () => require("next-router-mock"));

describe("Mobile Menu Tests", () => {
  it("should open login modal", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    function setModal(value = true) {
      return value;
    }

    const { getByTestId, queryByTestId } = await waitFor(() =>
      render(
        <UserContextProvider>
          <FilterBarContextProvider>
            <MobileMenu
              setMobileMenuActive={setModal}
              searchBar={() => <span />}
            />
          </FilterBarContextProvider>
        </UserContextProvider>
      )
    );

    const loginModalButton = getByTestId("login-modal-button");
    const userAccountButton = queryByTestId("user-account-button");

    fireEvent.click(loginModalButton);

    expect(loginModalButton).toBeInTheDocument();
    expect(userAccountButton).not.toBeInTheDocument();
  });

  it("should render user account buton when logged", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    function setModal(value = true) {
      return value;
    }

    const { getByTestId, queryByTestId } = await waitFor(() =>
      render(
        <UserContextProvider _testUser={fakeUser} _testLogin={true}>
          <FilterBarContextProvider>
            <MobileMenu
              setMobileMenuActive={setModal}
              searchBar={() => <span />}
            />
          </FilterBarContextProvider>
        </UserContextProvider>
      )
    );

    const userAccountButton = getByTestId("user-account-button");
    const loginModalButton = queryByTestId("login-modal-button");

    fireEvent.click(userAccountButton);

    expect(userAccountButton).toBeInTheDocument();
    expect(loginModalButton).not.toBeInTheDocument();
  });

  it("should logout when click in logout button", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    function setModal(value = true) {
      return value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <UserContextProvider _testUser={fakeUser} _testLogin={true}>
          <FilterBarContextProvider>
            <MobileMenu
              setMobileMenuActive={setModal}
              searchBar={() => <span />}
            />
          </FilterBarContextProvider>
        </UserContextProvider>
      )
    );

    const logoutButton = getByTestId("user-logout-button");

    fireEvent.click(logoutButton);

    const loginModalButton = getByTestId("login-modal-button");

    expect(logoutButton).not.toBeInTheDocument();
    expect(loginModalButton).toBeInTheDocument();
  });

  it("should close modal on click", async () => {
    const apiMock = new MockAdapter(api);
    apiMock.onGet("/categories").reply(200, fakeCategories);

    let closeModal = true;
    function setModal(value = true) {
      closeModal = value;
    }

    const { getByTestId } = await waitFor(() =>
      render(
        <UserContextProvider _testUser={fakeUser} _testLogin={true}>
          <FilterBarContextProvider>
            <MobileMenu
              setMobileMenuActive={setModal}
              searchBar={() => <span />}
            />
          </FilterBarContextProvider>
        </UserContextProvider>
      )
    );

    const closeModalButton = getByTestId("exit-mobile-menu");

    fireEvent.click(closeModalButton);

    expect(closeModal).toBe(false);
  });
});
