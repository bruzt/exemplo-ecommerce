import styled from "styled-components";

export const Container = styled.section`
  min-height: calc(100vh - 22.9rem);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  * {
    margin: 1.25rem 0;
  }

  h2 {
    text-align: center;

    color: ${(props) => props.theme.color2};
  }

  a {
    background: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.color};
    font-size: 1.25rem;
    padding: 0.625rem 1.25rem;
    border-radius: 0.3125rem;

    &:hover {
      background: ${(props) => props.theme.secondary};
    }

    &:active {
      background: ${(props) => props.theme.primary};
    }
  }
`;
