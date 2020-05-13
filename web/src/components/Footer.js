import React from 'react';
import styled from 'styled-components';

export default function Footer() {

  return (
    <Container>

        <p>Contruido por Bruno Zutim</p>

    </Container>
  );
}

const Container = styled.footer`
    height: 200px;
    border-top: 1px solid black;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
`;