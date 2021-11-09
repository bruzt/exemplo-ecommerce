import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { useOrder } from "../../../contexts/orderContext";

import OrderProgress from "../OrderProgress";
import CreditCardPayment from "../CreditCardPayment";
import BoletoPayment from "../BoletoPayment";
import PageLayout from "../../PageLayout";
import ThanksForBuy from "../ThanksForBuy";
import api from "../../../services/api";

import { Container } from "./styles";

export interface IOrder {
  id: number;
  freight_name: string;
  freight_price: string;
  total_price: string;
  payment_method: string | null;
  status: string;
  boleto_url: null;
  tracking_code: null;
  createdAt: string;
  updatedAt: string;
  address_id: number;
  user_id: number;
  address: {
    id: number;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
  };
}

export default function PaymentMethodPage() {
  const [getOrder, setOrder] = useState<IOrder>();

  const [getPaymentMethod, setPaymentMethod] = useState(null);

  const [getDisabledCreditCardButton, setDisabledCreditCardButton] =
    useState(false);
  const [getDisabledBoletoButton, setDisabledBoletoButton] = useState(false);

  const [showThanksForBuy, setShowThanksForBuy] = useState(false);

  const router = useRouter();
  const orderContext = useOrder();

  useEffect(() => {
    if (process.browser) window.scrollTo({ top: 0 });

    orderContext.setOrderFlowNumber(3);
    orderContext.setOrderId(null);
    orderContext.setBoletoUrl("");
  }, []);

  useEffect(() => {
    if (router.query.id) fetchOrder();
  }, [router.query.id]);

  useEffect(() => {
    if (showThanksForBuy == true) orderContext.setOrderFlowNumber(4);
  }, [showThanksForBuy]);

  async function fetchOrder() {
    try {
      const response = await api.get<IOrder>(`/orders/${router.query.id}`);

      setOrder(response.data);
    } catch (error) {
      console.log(error);
      alert("Erro ao buscar order de compra");
      router.push("/");
    }
  }

  return (
    <>
      <Head>
        <title>Pagamento</title>
        <meta name="robots" content="noindex" />
      </Head>

      <PageLayout>
        <OrderProgress />

        {showThanksForBuy ? (
          <ThanksForBuy />
        ) : (
          <Container>
            <h1>Método de pagamento</h1>

            <div className="cc-boleto-buttons">
              <button
                type="button"
                className={`cc-button ${
                  getPaymentMethod == "cc" ? "active" : ""
                }`}
                disabled={getDisabledCreditCardButton}
                data-testid="select-credit-card-button"
                onClick={() => setPaymentMethod("cc")}
              >
                Cartão de crédito
              </button>

              <button
                type="button"
                className={`boleto-button ${
                  getPaymentMethod == "boleto" ? "active" : ""
                }`}
                disabled={getDisabledBoletoButton}
                data-testid="select-boleto-button"
                onClick={() => setPaymentMethod("boleto")}
              >
                Boleto
              </button>
            </div>

            {getPaymentMethod == "cc" && (
              <CreditCardPayment
                order={getOrder}
                getDisabledBoletoButton={getDisabledBoletoButton}
                setDisabledBoletoButton={setDisabledBoletoButton}
                setShowThanksForBuy={setShowThanksForBuy}
              />
            )}
            {getPaymentMethod == "boleto" && (
              <BoletoPayment
                order={getOrder}
                getDisabledCreditCardButton={getDisabledCreditCardButton}
                setDisabledCreditCardButton={setDisabledCreditCardButton}
                setShowThanksForBuy={setShowThanksForBuy}
              />
            )}
          </Container>
        )}
      </PageLayout>
    </>
  );
}
