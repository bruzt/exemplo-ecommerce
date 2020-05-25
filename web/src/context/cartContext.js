import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext({});

export function CartContextProvider({ children }){

    const [cartState, setCart] = useState([]);
    const [productsState, setProducts] = useState([]);
    const [getSubtotalPrice, setSubtotalPrice] = useState(0);
    const [totalPriceState, setTotalPrice] = useState(0);
    const [cepInputState, setCepInput] = useState('');
    const [freightSelectedState, setFreightSelected] = useState(null);
    const [freightPriceState, setFreightPrice] = useState(null);
    const [addressIdState, setAddressId] = useState(null);
    const [getFreightMeasures, setFreightMeasures] = useState(null);

    useEffect( () => {
        
        const storedCart = JSON.parse(sessionStorage.getItem('cart'));

        if(storedCart) setCart(storedCart);

    }, [])

    function addToCart(newProduct){

        let cart = [];
        let findIt = false;

        if(cartState.length > 0){
            
            cartState.forEach( (product) => {
    
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

    function removeFromCart(id){

        resetFreight();

        const cart = cartState.filter( (product) => product.id != id);
        const products = productsState.filter( (product) => product.id != id);
        
        sessionStorage.setItem('cart', JSON.stringify(cart));
        setCart(cart);
        setProducts(products);
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
            cart: cartState, 
            setCart, 
            addToCart, 
            removeFromCart ,
            productsState,
            setProducts,
            getSubtotalPrice,
            setSubtotalPrice,
            totalPriceState,
            setTotalPrice,
            cepInputState,
            setCepInput,
            freightSelectedState,
            setFreightSelected,
            freightPriceState,
            setFreightPrice,
            addressIdState,
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

    const context = useContext(Context);

    return context;
}