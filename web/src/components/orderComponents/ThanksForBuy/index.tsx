import React from "react";

import { useOrder } from "../../../contexts/orderContext";

import { Container } from "./styles";

export default function ThanksForBuy() {
  const orderContext = useOrder();

  return (
    <Container>
      <h2>
        Obrigado pela compra, seu pedido será processado e qualquer alteração
        será informada por email
      </h2>

      <h2>Ordem de compra Nº {orderContext.getOrderId}</h2>

      {orderContext.getBoletoUrl.length > 0 && (
        <a
          href={orderContext.getBoletoUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="boleto-url"
        >
          ABRIR BOLETO
        </a>
      )}
    </Container>
  );
}
