import React, { createContext, useContext, useState, useEffect } from 'react';

const Context = createContext({});

export function CartContextProvider({ children }){

    const [getCart, setCart] = useState([]);
    const [getProducts, setProducts] = useState([]);
    const [getSubtotalPrice, setSubtotalPrice] = useState(0);
    const [getTotalPrice, setTotalPrice] = useState(0);
    const [getZipCode, setZipCode] = useState('');
    const [getFreightSelected, setFreightSelected] = useState(null);
    const [getFreightPrice, setFreightPrice] = useState(null);
    const [getAddressId, setAddressId] = useState(null);
    const [getFreightMeasures, setFreightMeasures] = useState(null);

    useEffect( () => {
        
        const storedCart = JSON.parse(sessionStorage.getItem('cart'));

        if(storedCart) setCart(storedCart);

    }, [])

    function addToCart(newProduct){

        let cart = [];
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

    function removeFromCart(id){

        resetFreight();

        const cart = getCart.filter( (product) => product.id != id);
        const products = getProducts.filter( (product) => product.id != id);
        
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

    const context = useContext(Context);

    return context;
}