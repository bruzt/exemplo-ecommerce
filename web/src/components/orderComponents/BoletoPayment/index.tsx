import React, { useState, useEffect, FormEvent } from "react";

import api from "../../../services/api";
import formatCpf from "../../../utils/formatCpf";
import formatPhone from "../../../utils/formatPhone";
import { useUser } from "../../../contexts/userContext";
import { useOrder } from "../../../contexts/orderContext";
import { IOrder } from "../PaymentMethodPage";

import { Container, LoadingSpinner } from "./styles";

interface IProps {
  order: IOrder;
  getDisabledCreditCardButton: boolean;
  setDisabledCreditCardButton: React.Dispatch<boolean>;
  setShowThanksForBuy: React.Dispatch<boolean>;
}

export default function BoletoPayment({
  order,
  getDisabledCreditCardButton,
  setDisabledCreditCardButton,
  setShowThanksForBuy,
}: IProps) {
  const [getDisabledCreateBoletoButton, setDisabledCreateBoletoButton] =
    useState(true);

  const [getValidCpf, setValidCpf] = useState(true);

  const [getCpf, setCpf] = useState("");
  const [getPhone, setPhone] = useState("");

  const userContext = useUser();
  const orderContext = useOrder();

  useEffect(() => {
    if (getCpf.length == 14 && getValidCpf && getPhone.length > 13) {
      setDisabledCreateBoletoButton(false);
    } else setDisabledCreateBoletoButton(true);
  }, [getCpf, getPhone]);

  function handleCpf(value) {
    const format = formatCpf(value);

    setValidCpf(format.valid);
    setCpf(format.cpf);
  }

  async function handleCreateBoleto(event: FormEvent) {
    event.preventDefault();

    setDisabledCreateBoletoButton(true);
    setDisabledCreditCardButton(true);

    const phone = getPhone
      .replace("(", "")
      .replace(")", "")
      .replace(" ", "")
      .replace(/-/g, "");
    const cpf = getCpf.replace(".", "").replace(".", "").replace("-", "");

    try {
      const response = await api.post(`/orders/${order.id}/payment`, {
        boleto: {
          customer: {
            external_id: String(userContext.getUser.id),
            name: userContext.getUser.name,
            email: userContext.getUser.email,
            type: "individual",
            country: "br",
            phone_numbers: ["+55" + phone],
            documents: [
              {
                type: "cpf",
                number: cpf,
              },
            ],
          },
          shipping: {
            name: userContext.getUser.name,
            address: {
              street: order.address.street,
              street_number: order.address.number,
              neighborhood: order.address.neighborhood,
              city: order.address.city,
              state: order.address.state.toLowerCase(),
              zipcode: order.address.zipcode.replace("-", ""),
              country: "br",
            },
          },
        },
      });

      orderContext.setOrderId(response.data.order.id);
      orderContext.setBoletoUrl(response.data.pagarme.boleto_url);

      setShowThanksForBuy(true);
    } catch (error) {
      console.log(error);
      alert("Erro ao gerar boleto");
      setDisabledCreateBoletoButton(false);
      setDisabledCreditCardButton(false);
    }
  }

  return (
    <Container data-testid="boleto-component">
      <h2>Boleto</h2>

      {order && (
        <form className="boleto-form" onSubmit={handleCreateBoleto}>
          <div className="freight-total">
            <p>Subtotal: R$ {Number(order.total_price).toFixed(2)}</p>
            <p>Frete: R$ {Number(order.freight_price).toFixed(2)}</p>
            <p>
              Total: R${" "}
              {(
                Number(order.total_price) + Number(order.freight_price)
              ).toFixed(2)}
            </p>
          </div>

          <div className="inputs">
            <div className="input-group">
              <label htmlFor="cpf">CPF</label>
              <input
                id="cpf"
                data-testid="cpf"
                type="text"
                className={`${getValidCpf ? "" : "invalid-cpf"}`}
                maxLength={14}
                value={getCpf}
                onChange={(event) => handleCpf(event.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">DDD + Telefone</label>
              <input
                id="phone"
                data-testid="phone"
                type="text"
                maxLength={16}
                value={getPhone}
                onChange={(event) => setPhone(formatPhone(event.target.value))}
              />
            </div>
          </div>

          <button
            type="submit"
            data-testid="boleto-submit-button"
            disabled={getDisabledCreateBoletoButton}
          >
            {getDisabledCreditCardButton ? <LoadingSpinner /> : "GERAR BOLETO"}
          </button>
        </form>
      )}
    </Container>
  );
}
