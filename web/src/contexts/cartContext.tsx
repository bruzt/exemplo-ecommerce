import React, { createContext, useContext, useState, useEffect } from "react";

import { IProduct } from "../pages/product/[productId]";

interface IProps {
  children: React.ReactNode;
  _testFreightPrice?: IFreights;
  _testFreightSelected?: TFreights;
  _testAddressId?: number;
  _testCartItems?: ICartItem[];
  _testZipCode?: string;
}

interface ICartItem {
  id: number;
  qtd: number;
}

interface iFreightMeasures {
  weight: string;
  length: string;
  height: string;
  width: string;
}

interface IFreights {
  pac: {
    valor: string;
    prazoEntrega: string;
    message?: string;
  };
  sedex: {
    valor: string;
    prazoEntrega: string;
    message?: string;
  };
}

type TFreights = "pac" | "sedex";

interface IUseCart {
  getCart: ICartItem[];
  setCart: React.Dispatch<React.SetStateAction<ICartItem[]>>;
  addToCart: (newProduct: ICartItem) => void;
  removeFromCart: (id: number) => void;
  getProducts: IProduct[];
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
  getSubtotalPrice: number;
  setSubtotalPrice: React.Dispatch<React.SetStateAction<number>>;
  getTotalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  getZipCode: string;
  setZipCode: React.Dispatch<React.SetStateAction<string>>;
  getFreightSelected: TFreights | null;
  setFreightSelected: React.Dispatch<React.SetStateAction<string | null>>;
  getFreightPrice: IFreights | null;
  setFreightPrice: React.Dispatch<React.SetStateAction<IFreights | null>>;
  getAddressId: number | null;
  setAddressId: React.Dispatch<React.SetStateAction<number | null>>;
  getFreightMeasures: iFreightMeasures | null;
  setFreightMeasures: React.Dispatch<
    React.SetStateAction<iFreightMeasures | null>
  >;
  cleanCart: () => void;
  resetFreight: () => void;
}

const Context = createContext({} as IUseCart);

export function CartContextProvider({
  children,
  _testFreightPrice,
  _testFreightSelected,
  _testAddressId,
  _testCartItems,
  _testZipCode,
}: IProps) {
  const [getCart, setCart] = useState<ICartItem[]>(_testCartItems || []);
  const [getProducts, setProducts] = useState<IProduct[]>([]);
  const [getSubtotalPrice, setSubtotalPrice] = useState(0);
  const [getTotalPrice, setTotalPrice] = useState(0);
  const [getZipCode, setZipCode] = useState(_testZipCode || "");
  const [getFreightSelected, setFreightSelected] = useState<TFreights | null>(
    _testFreightSelected
  );
  const [getFreightPrice, setFreightPrice] = useState<IFreights | null>(
    _testFreightPrice
  );
  const [getAddressId, setAddressId] = useState<number | null>(_testAddressId);
  const [getFreightMeasures, setFreightMeasures] =
    useState<iFreightMeasures | null>(null);

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart"));

    if (storedCart) setCart(storedCart);
  }, []);

  function addToCart(newProduct: ICartItem) {
    const cart = [];

    if (getCart.length > 0) {
      for (const product of getCart) {
        if (newProduct.id == product.id) {
          newProduct.qtd = Number(newProduct.qtd) + Number(product.qtd);
        } else {
          cart.push(product);
        }
      }
    }

    cart.push(newProduct);

    sessionStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  }

  function removeFromCart(id: number) {
    if (confirm("Tem certeza que deseja remover esse item?")) {
      resetFreight();

      const cart = getCart.filter((product) => product.id != id);
      const products = getProducts.filter((product) => product.id != id);

      sessionStorage.setItem("cart", JSON.stringify(cart));
      setCart(cart);
      setProducts(products);
    }
  }

  function resetFreight() {
    setFreightSelected(null);
    setFreightPrice(null);
  }

  function cleanCart() {
    setCart([]);
    setProducts([]);
    sessionStorage.removeItem("cart");
    setSubtotalPrice(0);
    setTotalPrice(0);
  }

  return (
    <Context.Provider
      value={{
        getCart,
        setCart,
        addToCart,
        removeFromCart,
        getProducts,
        setProducts,
        getSubtotalPrice,
        setSubtotalPrice,
        getTotalPrice,
        setTotalPrice,
        getZipCode,
        setZipCode,
        getFreightSelected,
        setFreightSelected,
        getFreightPrice,
        setFreightPrice,
        getAddressId,
        setAddressId,
        getFreightMeasures,
        setFreightMeasures,
        cleanCart,
        resetFreight,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useCart() {
  const context = useContext(Context);

  return context;
}
