import React, { useEffect } from "react";

import { useOrder } from "../../contexts/orderContext";
import { useCart } from "../../contexts/cartContext";

import OrderProgress from "../../components/orderComponents/OrderProgress";
import PageLayout from "../../components/PageLayout";
import Cart from "../../components/orderComponents/Cart";
import SelectAddress from "../../components/orderComponents/SelectAddress";
import CreateBuyOrder from "../../components/orderComponents/CreateBuyOrder";
import ThanksForBuy from "../../components/orderComponents/ThanksForBuy";

export default function Order() {
  const orderContext = useOrder();
  const cartContext = useCart();

  useEffect(() => {
    orderContext.setOrderFlowNumber(1);
  }, []);

  return (
    <PageLayout>
      {(cartContext.getCart.length > 0 ||
        orderContext.getOrderFlowNumber == 4) && <OrderProgress />}

      {orderContext.getOrderFlowNumber == 1 && <Cart />}
      {orderContext.getOrderFlowNumber == 2 && <SelectAddress />}
      {orderContext.getOrderFlowNumber == 3 && <CreateBuyOrder />}
      {orderContext.getOrderFlowNumber == 4 && <ThanksForBuy />}
    </PageLayout>
  );
}
