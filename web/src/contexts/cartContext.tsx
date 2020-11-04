import React, { createContext, useContext, useState, useEffect } from 'react';

import { IProduct } from '../pages/[productId]';

interface IProps {
    children: React.ReactNode;
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
        "Valor": string;
        "PrazoEntrega": string;
        "MsgErro": string;
    };
    sedex: {
        "Valor": string;
        "PrazoEntrega": string;
        "MsgErro": string;
    }
}

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
    getFreightSelected: "pac" | "sedex" | null;
    setFreightSelected: React.Dispatch<React.SetStateAction<string | null>>;
    getFreightPrice: IFreights | null;
    setFreightPrice: React.Dispatch<React.SetStateAction<IFreights | null>>;
    getAddressId: number | null;
    setAddressId: React.Dispatch<React.SetStateAction<number | null>>;
    getFreightMeasures: iFreightMeasures | null;
    setFreightMeasures: React.Dispatch<React.SetStateAction<iFreightMeasures | null>>;
    orderFinished: () => void;
    resetFreight: () => void;
}

const Context = createContext({});

export function CartContextProvider({ children }: IProps){

    const [getCart, setCart] = useState<ICartItem[]>([]);
    const [getProducts, setProducts] = useState<IProduct[]>([]);
    const [getSubtotalPrice, setSubtotalPrice] = useState(0);
    const [getTotalPrice, setTotalPrice] = useState(0);
    const [getZipCode, setZipCode] = useState('');
    const [getFreightSelected, setFreightSelected] = useState<string | null>(null);
    const [getFreightPrice, setFreightPrice] = useState<number | null>(null);
    const [getAddressId, setAddressId] = useState<number | null>(null);
    const [getFreightMeasures, setFreightMeasures] = useState<iFreightMeasures | null>(null);

    useEffect( () => {
        
        const storedCart = JSON.parse(sessionStorage.getItem('cart'));

        if(storedCart) setCart(storedCart);

    }, [])

    function addToCart(newProduct: ICartItem){

        const cart = [];
        let findIt = false;

        if(getCart.length > 0){
            
            getCart.forEach( (product) => {
    
                if(newProduct.id == product.id){
                        
                    newProduct.qtd = Number(newProduct.qtd) + Number(product.qtd);
    
                    findIt = true;
                    cart.push(newProduct);
    
                } else {
    
                    cart.push(product);
                } 
            });

            if(!findIt) cart.push(newProduct);

        } else {

            cart.push(newProduct);
        }
           
        sessionStorage.setItem('cart', JSON.stringify(cart));
        setCart(cart);
    }

    function removeFromCart(id: number){

        if(confirm("Tem certeza que deseja remover esse item?")){

            resetFreight();
    
            const cart = getCart.filter( (product) => product.id != id);
            const products = getProducts.filter( (product) => product.id != id);
            
            sessionStorage.setItem('cart', JSON.stringify(cart));
            setCart(cart);
            setProducts(products);
        }
    }

    function resetFreight(){

        setFreightSelected(null);
        setFreightPrice(0);
    }

    function orderFinished(){

        setCart([]);
        setProducts([]);
        sessionStorage.removeItem('cart');
        setSubtotalPrice(0);
        setTotalPrice(0);
    }

    return (
        <Context.Provider value={{ 
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
            orderFinished,
            resetFreight
        }}>
            {children}
        </Context.Provider>
    );
}

export function useCart(){

    const context = useContext(Context) as IUseCart;

    return context;
}