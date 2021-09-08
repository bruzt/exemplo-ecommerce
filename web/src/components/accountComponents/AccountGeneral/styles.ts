import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 1.875rem;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 37.5rem;
    background: ${(props) => props.theme.primary};
    border-radius: 0.3125rem;
    padding: 1.25rem 0.625rem;
  }

  div.form-group {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 25rem;
  }

  label {
    margin-left: 0.3125rem;
    margin-top: 1.25rem;
  }

  label span {
    font-size: 0.875rem;
  }

  input {
    width: 100%;
    height: 2.5rem;
    padding: 0.3125rem;
    font-size: 1.25rem;
    border: 0;
    border-radius: 0.3125rem;

    &.invalid {
      border: 0.125rem solid ${(props) => props.theme.danger};
    }

    &.valid {
      border: 0.125rem solid ${(props) => props.theme.success};
    }
  }

  div.change-password-group {
    width: 100%;
    max-width: 18.75rem;
    margin-top: 1.25rem;
  }

  div.change-password-group h2 {
    margin-bottom: -0.625rem;
  }

  button[type="submit"] {
    width: 100%;
    height: 3.75rem;
    max-width: 18.75rem;
    margin-top: 1.875rem;
    font-size: 1.875rem;
    padding: 0.3125rem 0.625rem;
    border: 0;
    border-radius: 0.3125rem;
    background: ${(props) => props.theme.success};
    color: inherit;
    cursor: pointer;

    &.is-fetching {
      font-size: 0;
    }

    &:hover {
      background: ${(props) => props.theme.successActive};
    }

    &:active {
      background: ${(props) => props.theme.success};
    }

    &:disabled {
      background: ${(props) => props.theme.danger};
    }

    &:disabled:hover {
      background: ${(props) => props.theme.dangerActive};
    }
  }
`;
