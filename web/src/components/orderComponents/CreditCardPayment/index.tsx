import React, { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import Loading from "react-loader-spinner";
import axios from "axios";

import api from "../../../services/api";
import formatCpf from "../../../utils/formatCpf";
import formatPhone from "../../../utils/formatPhone";
import formatZipCode from "../../../utils/formatZipCode";
import { useUser } from "../../../contexts/userContext";
import { useOrder } from "../../../contexts/orderContext";
import LoadingModal from "../../LoadingModal";
import { IUf } from "../SelectAddress";
import { IOrder } from "../PaymentMethodPage";

import { Container } from "./styles";

interface IProps {
  order: IOrder;
  getDisabledBoletoButton: boolean;
  setDisabledBoletoButton: React.Dispatch<boolean>;
  setShowThanksForBuy: React.Dispatch<boolean>;
}

interface IInstallmentsOptions {
  freeInstallments: number;
  maxInstallments: number;
  interestRate: number;
  installments: number[];
}

export default function CreditCardPayment({
  order,
  getDisabledBoletoButton,
  setDisabledBoletoButton,
  setShowThanksForBuy,
}: IProps) {
  const [getCardHolderName, setCardHolderName] = useState("");
  const [getCardNumber, setCardNumber] = useState("");
  const [getCardCvv, setCardCvv] = useState("");
  const [getCardExpirationMonth, setCardExpirationMonth] = useState("");
  const [getCardExpirationYear, setCardExpirationYear] = useState("");

  const [getInstallmentsOptions, setInstallmentsOptions] =
    useState<IInstallmentsOptions>();
  const [getInstallments, setInstallments] = useState(1);

  const [getIsFetching, setIsFetching] = useState(false);

  const [getPhone, setPhone] = useState("");
  const [getCpf, setCpf] = useState("");
  const [getValidCpf, setValidCpf] = useState(true);

  const [getUfs, setUfs] = useState<IUf[]>([]);

  const [getStreet, setStreet] = useState("");
  const [getNumber, setNumber] = useState("");
  const [getNeighborhood, setNeighborhood] = useState("");
  const [getCity, setCity] = useState("");
  const [getState, setState] = useState("");
  const [getZipCode, setZipCode] = useState("");

  const [getDisabledPayButton, setDisabledPayButton] = useState(true);

  const userContext = useUser();
  const orderContext = useOrder();
  const router = useRouter();

  useEffect(() => {
    fetchInstallments();
    fetchUfs();
  }, []);

  useEffect(() => {
    if (
      getCardHolderName.length < 3 ||
      getCardNumber.length < 19 ||
      getCardCvv.length < 3 ||
      getCardExpirationMonth.length < 1 ||
      getCardExpirationYear.length < 1 ||
      getPhone.length < 14 ||
      getCpf.length < 14 ||
      !getValidCpf ||
      getStreet.length < 3 ||
      getNumber.length < 1 ||
      getNeighborhood.length < 3 ||
      getCity.length < 3 ||
      getState.length < 1 ||
      getZipCode.length < 9
    ) {
      setDisabledPayButton(true);
    } else {
      const year = String(new Date().getFullYear()).substr(-2);
      const month = new Date().getMonth() + 1;

      if (
        year == getCardExpirationYear &&
        month > Number(getCardExpirationMonth)
      ) {
        setDisabledPayButton(true);
      } else {
        setDisabledPayButton(false);
      }
    }
  }, [
    getCardHolderName,
    getCardNumber,
    getCardCvv,
    getCardExpirationMonth,
    getCardExpirationYear,
    getPhone,
    getCpf,
    getStreet,
    getNumber,
    getNeighborhood,
    getCity,
    getState,
    getZipCode,
  ]);

  async function fetchInstallments() {
    try {
      setIsFetching(true);

      const response = await api.post("/installments", {
        amount: (
          Number(order.total_price) + Number(order.freight_price)
        ).toFixed(2),
      });

      setInstallmentsOptions(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      alert("Erro ao buscar opções de parcela");

      router.push("/");
    }
  }

  async function fetchUfs() {
    try {
      const response = await axios.get<IUf[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );

      setUfs(response.data);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      alert("Erro ao buscar lista de estados");
    }
  }

  function handleCardNumber(value: string | number) {
    let cardNumber = String(value);

    cardNumber = cardNumber.replace(/[^0-9]/g, "");

    if (cardNumber.length == 16) {
      const part1 = cardNumber.slice(0, 4);
      const part2 = cardNumber.slice(4, 8);
      const part3 = cardNumber.slice(8, 12);
      const part4 = cardNumber.slice(12, 16);

      cardNumber = `${part1} ${part2} ${part3} ${part4}`;
    }

    setCardNumber(cardNumber);
  }

  function handleCardCvv(value: string | number) {
    let cardCvv = String(value);

    cardCvv = cardCvv.replace(/[^0-9]/g, "");

    setCardCvv(cardCvv);
  }

  function handleCpf(value: string | number) {
    const format = formatCpf(value);

    setValidCpf(format.valid);
    setCpf(format.cpf);
  }

  function handleSameAddressButton() {
    setStreet(order.address.street);
    setNumber(order.address.number);
    setNeighborhood(order.address.neighborhood);
    setCity(order.address.city);
    setState(order.address.state);
    setZipCode(formatZipCode(order.address.zipcode));
  }

  async function handlePaySubmit(event: FormEvent) {
    event.preventDefault();

    if (getDisabledPayButton) return;

    setDisabledPayButton(true);
    setDisabledBoletoButton(true);

    const card_expiration_date =
      String(getCardExpirationMonth) + String(getCardExpirationYear);
    const phone = getPhone
      .replace("(", "")
      .replace(")", "")
      .replace(" ", "")
      .replace(/-/g, "");
    const cpf = getCpf.replace(/\.|-/g, "");

    try {
      const response = await api.post(`/orders/${order.id}/payment`, {
        credit_card: {
          installments: Number(getInstallments),
          card_number: String(getCardNumber).replace(/ /g, ""),
          card_cvv: getCardCvv,
          card_expiration_date,
          card_holder_name: getCardHolderName,
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
          billing: {
            name: getCardHolderName,
            address: {
              street: getStreet,
              street_number: getNumber,
              neighborhood: getNeighborhood,
              city: getCity,
              state: getState.toLowerCase(),
              zipcode: getZipCode.replace("-", ""),
              country: "br",
            },
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

      setShowThanksForBuy(true);
    } catch (error) {
      console.error(error);
      alert("Erro ao pagar com cartão de crédito");
      setDisabledPayButton(false);
      setDisabledBoletoButton(false);
    }
  }

  return (
    <Container data-testid="credit-card-component">
      {getIsFetching && <LoadingModal spinnerSize="10rem" />}

      <h2>Cartão de Crédito</h2>

      <form onSubmit={handlePaySubmit}>
        <div className="grid-columns">
          <div className="cc-form">
            <div className="flex-column">
              <label htmlFor="card-holder-name" className="holder-name-label">
                Nome impresso no cartão
              </label>
              <input
                id="card-holder-name"
                data-testid="card-holder-name"
                type="text"
                placeholder="Nome"
                value={getCardHolderName}
                onChange={(event) => setCardHolderName(event.target.value)}
              />
            </div>

            <div className="flex-row justify-center">
              <div className="flex-column">
                <label htmlFor="card-number">Numero do cartão</label>
                <input
                  id="card-number"
                  data-testid="card-number"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  value={getCardNumber}
                  onChange={(event) => handleCardNumber(event.target.value)}
                />
              </div>
            </div>

            <div className="flex-row justify-center">
              <div className="flex-column">
                <label htmlFor="card-cvv">CVV</label>
                <input
                  id="card-cvv"
                  data-testid="card-cvv"
                  type="text"
                  placeholder="000"
                  maxLength={3}
                  value={getCardCvv}
                  onChange={(event) => handleCardCvv(event.target.value)}
                />
              </div>

              <div className="flex-column">
                <label htmlFor="card-expiration-month">Vencimento</label>
                <div className="flex-row-2">
                  <select
                    id="card-expiration-month"
                    data-testid="card-expiration-month"
                    value={getCardExpirationMonth}
                    placeholder="Mês"
                    onChange={(event) =>
                      setCardExpirationMonth(event.target.value)
                    }
                  >
                    <option value=""></option>
                    {Array.from(Array(12)).map((_, index) => (
                      <option
                        key={index}
                        value={index < 9 ? `0${index + 1}` : index + 1}
                      >
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </option>
                    ))}
                  </select>
                  <p>/</p>
                  <select
                    id="card-expiration-year"
                    data-testid="card-expiration-year"
                    value={getCardExpirationYear}
                    placeholder="Ano"
                    onChange={(event) =>
                      setCardExpirationYear(event.target.value)
                    }
                  >
                    <option value=""></option>
                    {Array.from(Array(10)).map((_, index) => (
                      <option
                        key={index}
                        value={String(
                          new Date(
                            new Date().setFullYear(
                              new Date().getFullYear() + index
                            )
                          ).getFullYear()
                        ).substr(-2)}
                      >
                        {String(
                          new Date(
                            new Date().setFullYear(
                              new Date().getFullYear() + index
                            )
                          ).getFullYear()
                        ).substr(-2)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex-row justify-center">
              <div className="flex-column">
                <label htmlFor="tel">DDD + Telefone</label>
                <input
                  type="text"
                  id="tel"
                  data-testid="phone"
                  placeholder="(00) 0-0000-0000"
                  maxLength={16}
                  value={getPhone}
                  onChange={(event) =>
                    setPhone(formatPhone(event.target.value))
                  }
                />
              </div>
              <div className="flex-column">
                <label htmlFor="cpf">CPF</label>
                <input
                  id="cpf"
                  data-testid="cpf"
                  type="text"
                  placeholder="123-456-789-00"
                  className={`${getValidCpf ? "" : "invalid-value"}`}
                  maxLength={14}
                  value={getCpf}
                  onChange={(event) => handleCpf(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="cc-form">
            <h2>Endereço de cobrança do cartão</h2>

            <div className="flex-column">
              <label htmlFor="street">Logradouro</label>
              <input
                id="street"
                data-testid="street"
                type="text"
                value={getStreet}
                onChange={(event) => setStreet(event.target.value)}
              />
            </div>

            <div className="flex-row flex-justify-start">
              <div className="flex-column">
                <label htmlFor="number"> Nº</label>
                <input
                  id="number"
                  data-testid="number-input"
                  type="text"
                  value={getNumber}
                  onChange={(event) => setNumber(event.target.value)}
                />
              </div>
              <div className="flex-column w-100">
                <label htmlFor="neighborhood">Bairro</label>
                <input
                  id="neighborhood"
                  data-testid="neighborhood"
                  type="text"
                  value={getNeighborhood}
                  onChange={(event) => setNeighborhood(event.target.value)}
                />
              </div>
            </div>

            <div className="flex-row">
              <div className="flex-column">
                <label htmlFor="city">Cidade</label>
                <input
                  id="city"
                  data-testid="city"
                  type="text"
                  value={getCity}
                  onChange={(event) => setCity(event.target.value)}
                />
              </div>

              <div className="flex-column">
                <label htmlFor="state"> Estado</label>
                <select
                  id="state"
                  data-testid="state"
                  value={getState}
                  onChange={(event) => setState(event.target.value)}
                >
                  <option value=""></option>
                  {getUfs.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>
                      {uf.sigla}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-column">
                <label htmlFor="zipcode">CEP </label>
                <input
                  id="zipcode"
                  data-testid="zipcode"
                  type="text"
                  maxLength={9}
                  value={getZipCode}
                  onChange={(event) =>
                    setZipCode(formatZipCode(event.target.value))
                  }
                />
              </div>
            </div>
            <div className="flex-row same-addr-button">
              <button
                type="button"
                data-testid="same-address-button"
                onClick={handleSameAddressButton}
              >
                Mesmo da entrega
              </button>
            </div>
          </div>
        </div>

        {order && (
          <div className="button-total">
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

            <select
              id="installments"
              onChange={(event) => setInstallments(Number(event.target.value))}
            >
              {getInstallmentsOptions?.installments.map(
                (installment, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}x de R${Number(installment).toFixed(2)}
                    {index + 1 > 1 &&
                      (index + 1 <= getInstallmentsOptions.freeInstallments
                        ? " (sem juros)"
                        : ` (${getInstallmentsOptions.interestRate}% R$${(
                            installment *
                            (index + 1)
                          ).toFixed(2)})`)}
                  </option>
                )
              )}
            </select>

            <button
              type="submit"
              data-testid="pay-submit-button"
              disabled={getDisabledPayButton}
            >
              {getDisabledBoletoButton ? (
                <Loading
                  type="TailSpin"
                  color="#0D2235"
                  height="1.875rem"
                  width="1.875rem"
                />
              ) : (
                "PAGAR"
              )}
            </button>
          </div>
        )}
      </form>
    </Container>
  );
}
