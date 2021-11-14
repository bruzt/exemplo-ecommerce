import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "react-loader-spinner";

import api from "../../../services/api";
import { useUser } from "../../../contexts/userContext";
import { useCart } from "../../../contexts/cartContext";
import { IOrder } from "../../accountComponents/AccountMyShoppings";
import OrderProgress from "../OrderProgress";

import { Container } from "./styles";

export default function CreateBuyOrder() {
  const userContext = useUser();
  const cartContext = useCart();
  const router = useRouter();

  useEffect(() => {
    postBuyOrder();
  }, []);

  async function postBuyOrder() {
    try {
      const [address] = userContext.getUser.addresses.filter(
        (address) => address.id == cartContext.getAddressId
      );

      const products_id = cartContext.getCart.map((product) => product.id);
      const quantity_buyed = cartContext.getCart.map((product) => product.qtd);
      const freight_price = Number(
        cartContext.getFreightPrice[
          cartContext.getFreightSelected
        ].valor.replace(",", ".")
      );

      const response = await api.post<IOrder>("/orders", {
        products_id,
        quantity_buyed,
        address_id: address.id,
        freight_name: cartContext.getFreightSelected,
        freight_price,
      });

      cartContext.cleanCart();

      router.push(`order/${response.data.id}/payment`);
    } catch (error) {
      console.log(error);
      alert("Erro ao criar a order de compra");
      router.push("/order");
    }
  }

  return (
    <>
      <OrderProgress />

      <Container>
        <Loading
          type="TailSpin"
          color="#0D2235"
          height="4.6875rem"
          width="4.6875rem"
        />
      </Container>
    </>
  );
}
