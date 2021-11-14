import styled from "styled-components";

export const Container = styled.section`
  min-height: calc(100vh - 22.9rem);

  padding-top: 1rem;

  h1 {
    text-align: center;
    margin-bottom: 1.5625rem;

    color: ${(props) => props.theme.color2};
  }

  .back-button {
    border: 0;
    background: transparent;
    font-size: 1.875rem;
    cursor: pointer;
    color: ${(props) => props.theme.color2};
  }

  .cc-boleto-buttons {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .cc-boleto-buttons button {
    font-size: 1.875rem;
    padding: 1.25rem 1.875rem;
    margin: 0.625rem;
    border: ${(props) =>
      props.theme.title === "light" ? "1px solid #111" : 0};
    border-radius: 0.3125rem;
    color: ${(props) => props.theme.primary};
    cursor: pointer;

    &:hover,
    &.active {
      background: ${(props) => props.theme.primary};
      color: ${(props) => props.theme.color};
    }
  }

  @media (max-width: 600px) {
    .cc-boleto-buttons {
      flex-direction: column;
    }
  }
`;

export const LoadingCenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
