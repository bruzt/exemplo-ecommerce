import React, { useEffect, useState } from "react";

import { useOrder } from "../../contexts/orderContext";
import { useCart } from "../../contexts/cartContext";

import OrderProgress from "../../components/orderComponents/OrderProgress";
import PageLayout from "../../components/PageLayout";
import Cart from "../../components/orderComponents/Cart";
import SelectAddress from "../../components/orderComponents/SelectAddress";
import CreateBuyOrder from "../../components/orderComponents/CreateBuyOrder";

export default function Order() {
  const [getFirstRender, setFirstRender] = useState(true);

  const orderContext = useOrder();
  const cartContext = useCart();

  useEffect(() => {
    orderContext.setOrderFlowNumber(1);

    setFirstRender(false);
  }, []);

  return (
    <PageLayout>
      {cartContext.getCart.length > 0 && <OrderProgress />}

      {getFirstRender == false &&
        ((orderContext.getOrderFlowNumber == 1 && <Cart />) ||
          (orderContext.getOrderFlowNumber == 2 && <SelectAddress />) ||
          (orderContext.getOrderFlowNumber == 3 && <CreateBuyOrder />))}
    </PageLayout>
  );
}
