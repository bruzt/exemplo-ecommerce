import React, { FormEvent, useEffect, useState } from 'react';
import api from '../../../services/api';
import Link from 'next/link';
import { FaSearchLocation } from 'react-icons/fa';
import Loading from 'react-loader-spinner';
import Head from 'next/head';

import formatZipCode from '../../../utils/formatZipCode';

import { Container } from './styles';

import { useUser } from '../../../contexts/userContext';
import { useCart } from '../../../contexts/cartContext';
import { useOrder } from '../../../contexts/orderContext';

export default function Cart() {
    
    const [getZipCodeButtonDisabled, setZipCodeButtonDisabled] = useState(false);

    const [getUnableToBuy, setUnableToBuy] = useState<number[]>([]);

    const userContext = useUser();
    const cartContext = useCart();
    const orderContext = useOrder();

    useEffect(() => {
        if(process.browser) window.scrollTo({ top: 0 });
        cartContext.resetFreight();
        fetchProducts();
    }, []);

    useEffect(() => {
        calcTotalPrice();

    }, [cartContext.getProducts, cartContext.getCart, cartContext.getFreightSelected]);

    async function fetchProducts() {

        const products = [];
        for (let i = 0; i < cartContext.getCart.length; i++) {
            try {
                const response = await api.get(`/products/${cartContext.getCart[i].id}`);
                
                products.push(response.data);

                const cart = [ ...cartContext.getCart ];
                if(cartContext.getCart[i].qtd > response.data.quantity_stock){

                    cart[i].qtd = response.data.quantity_stock;
                }

                if(response.data.quantity_stock < 1) setUnableToBuy([ ...getUnableToBuy, cartContext.getCart[i].id ]);

                localStorage.setItem('cart', JSON.stringify(cart));
                
                cartContext.setCart(cart);

            } catch (error) {
                console.error(error);
                //alert('Erro, recarregue a página');
                break;
            }
        }

        cartContext.setProducts(products);
    }

    function handleZipCode(value: string){

        cartContext.resetFreight();

        cartContext.setZipCode(formatZipCode(value));
    }

    function calcTotalPrice() {

        let totalPrice = 0;

        for (let i = 0; i < cartContext.getCart.length; i++) {

            if(cartContext.getProducts[i]){

                totalPrice += Number(cartContext.getProducts[i].finalPrice) * (cartContext.getCart[i].qtd < 1 ? 1 : cartContext.getCart[i].qtd);
            }
        }

        cartContext.setSubtotalPrice(Number(totalPrice.toFixed(2)));

        if(cartContext.getFreightSelected == 'pac') totalPrice += Number((cartContext.getFreightPrice.pac.valor).replace(',', '.'))
        else if(cartContext.getFreightSelected == 'sedex') totalPrice += Number((cartContext.getFreightPrice.sedex.valor).replace(',', '.'))
        
        cartContext.setTotalPrice(Number(totalPrice.toFixed(2)));
    }

    function verifyQtd({ id, qtd }: { id: number, qtd: number }) {
        
        if(getUnableToBuy.indexOf(id) > -1) return;

        cartContext.resetFreight();

        const [ product ] = cartContext.getProducts.filter((product) => product.id == id);

        const [ cart ] = cartContext.getCart.filter((product) => product.id == id);

        if (((cart.qtd + qtd) == (product.quantity_stock + 1)) || ((cart.qtd + qtd) < 1)) {

            qtd = 0;

        } else if ((cart.qtd) > product.quantity_stock) {

            qtd = product.quantity_stock - cart.qtd;
        }

        cartContext.addToCart({ id, qtd });
    }

    function handleFreightCheck(name: string){

        if(name == 'pac') cartContext.setFreightSelected('pac');
        else if (name == 'sedex') cartContext.setFreightSelected('sedex');
    }

    async function getFreightPrice(event: FormEvent){

        event.preventDefault();

        setZipCodeButtonDisabled(true);

        let weight = 0;
        let length = 0;
        let height = 0;
        let width = 0;

        for(let i = 0; i < cartContext.getProducts.length; i++) {

            weight += Number(String(cartContext.getProducts[i].weight).replace(',', '.')) * cartContext.getCart[i].qtd;
            height += Number(cartContext.getProducts[i].height) * cartContext.getCart[i].qtd;

            if(length < Number(cartContext.getProducts[i].length)) length = Number(cartContext.getProducts[i].length);
            if(width < Number(cartContext.getProducts[i].width)) width = Number(cartContext.getProducts[i].width);
        }

        const strWeight = String(weight).replace('.', ',');

        cartContext.setFreightMeasures({ 
            weight: strWeight,
            length: String(length),
            height: String(height),
            width: String(width),
        });

        try {
        
            const response = await api.post('/freight', {
                destZipCode: String(cartContext.getZipCode).replace('-', ''),
                weight: strWeight,
                length,
                height,
                width
            });
            
            if(response.data.pac.msgErro && Object.keys(response.data.pac.msgErro).length > 0) {
                
                console.error(response.data.pac.msgErro);
                alert(response.data.pac.msgErro);
                setZipCodeButtonDisabled(false);
                
            } else if(response.data.sedex.msgErro && Object.keys(response.data.sedex.msgErro).length > 0){
                
                console.error(response.data.sedex.msgErro);
                alert(response.data.sedex.msgErro);
                setZipCodeButtonDisabled(false);
            } 
                
            cartContext.setFreightPrice(response.data);
            setZipCodeButtonDisabled(false);
            
        } catch (error) {
            console.error(error);
            //alert('Erro, tente novamente');
        }
    }

    function handleRemoveFromCart(productId: number){

        const newUnableToBuy = getUnableToBuy.filter( (id) => id != productId);

        setUnableToBuy(newUnableToBuy);

        cartContext.removeFromCart(productId);
    }

    function handleCloseOrder(){

        if(getUnableToBuy.length > 0 || cartContext.getCart.length < 1) return;

        orderContext.setOrderFlowNumber(2);
    }

    return (
        <>
            <Head>
                <title>Carrinho de compra</title>
                <meta name="robots" content="noindex" />
            </Head>

            <Container>
                {(cartContext.getProducts.length == 0) 
                ? (
                    <h1 className='empty' data-testid='empty-h1'>Carrinho vazio</h1>
                ) 
                : (
                    <>
                        <h1>Carrinho</h1>
                        <table data-testid='cart-table'>
                            <thead>
                                <tr>
                                    <th className='th-image'>Imagem</th>
                                    <th className='th-product'>Produto</th>
                                    <th className='th-price'>Preço unitário</th>
                                    <th className='th-qtd'>Quantidade</th>
                                    <th className='th-total'>Preço</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartContext.getProducts.map((product) => {

                                    let index: number;
                                    for(let i=0; i < cartContext.getCart.length; i++){
                                        if(cartContext.getCart[i].id == product.id){
                                            index = i;
                                            break;
                                        }
                                    }

                                    return (
                                        <tr 
                                            key={product.id} 
                                            className={product.quantity_stock < 1 ? 'out-of-stock' : ''} 
                                            data-testid='product-row'
                                        >
                                            <td className='td-image'>
                                                <img
                                                    //src='https://i.picsum.photos/id/892/800/400.jpg'
                                                    /*src='https://picsum.photos/800/400'*/
                                                    /*src={product.images[0] && product.images[0].url} */
                                                    src={`${(product.images.length > 0) ? `${process.env.BACKEND_URL}/uploads/${product.images[0].filename}` : '/images/img-n-disp.png'}`}
                                                    alt={'imagem-' + product.title.split(' ').join('-')}
                                                />
                                            </td>
                                            <td className='td-name'>
                                                <Link href='/[productId]' as={`/${product.id}?product=${String(product.title).split(' ').join('-')}`}>
                                                    <a>
                                                        <span className='over-hidden'>{product.title}</span>
                                                        {(product.isOnSale)
                                                            ? <span className='order-discount'>-{product.discount_percent}%</span>
                                                            : null
                                                        }
                                                    </a>
                                                </Link>
                                            </td>
                                            <td className='td-price'>
                                                R$ {product.finalPrice}
                                            </td>
                                            <td className='td-qtd'>
                                                <span>
                                                    <button
                                                        type="button"
                                                        id='remove'
                                                        data-testid='remove-button'
                                                        onClick={() => handleRemoveFromCart(product.id)}
                                                        title='Remover do carrinho'
                                                    >
                                                        X
                                                    </button>
                                                    <button
                                                        type="button"
                                                        id='less'
                                                        data-testid='less-button'
                                                        disabled={getUnableToBuy.indexOf(product.id) > -1}
                                                        onClick={() => verifyQtd({ id: product.id, qtd: -1 })}
                                                        title='Remover 1'
                                                    >
                                                        -
                                                    </button>
                                                    <p className='cart-qtd' data-testid='cart-qtd'>{cartContext.getCart[index].qtd}</p>
                                                    <button
                                                        type="button"
                                                        id='plus'
                                                        data-testid='plus-button'
                                                        disabled={getUnableToBuy.indexOf(product.id) > -1}
                                                        onClick={() => verifyQtd({ id: product.id, qtd: 1 })}
                                                        title='Adicionar 1'
                                                    >
                                                        +
                                                    </button>
                                                </span>
                                                <span>
                                                    Disponível: {product.quantity_stock}
                                                </span>
                                            </td>
                                            <td className='td-total'>
                                                R$ {(Number(product.finalPrice) * cartContext.getCart[index].qtd).toFixed(2)}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    
                        <div className='freight-total'>

                            <div className="calc-freight">
                                <form className='cep-input'>
                                    Calculo de frete:
                                    &nbsp;
                                    <input 
                                        id='cep'
                                        data-testid='submit-zipcode-input' 
                                        type='text' 
                                        placeholder='CEP' 
                                        maxLength={9}
                                        value={cartContext.getZipCode} 
                                        onChange={(event) => handleZipCode(event.target.value)} 
                                    />
                                    <button 
                                        type='submit' 
                                        data-testid='submit-zipcode-button' 
                                        onClick={(event) => getFreightPrice(event)}
                                        disabled={(
                                                cartContext.getProducts.length == 0 || 
                                                cartContext.getZipCode.length < 9 ||
                                                getZipCodeButtonDisabled
                                            ) ? true : false}
                                    >
                                        {(getZipCodeButtonDisabled)
                                            ? <Loading
                                                type="TailSpin"
                                                color="black"
                                                height={20}
                                                width={20}
                                            />
                                            : <FaSearchLocation size={20} />
                                        }
                                    </button>
                                </form>
                                
                                {cartContext.getFreightPrice ? (
                                    <div className='choose-freight'>
                                        {cartContext.getFreightPrice.pac.message ? (
                                            <span>
                                                <p>Correios PAC - {cartContext.getFreightPrice.pac.message}</p>
                                            </span>
                                        ) : (
                                            <span>
                                                <input 
                                                    type="radio" 
                                                    id='pac'
                                                    data-testid='freight-radio'
                                                    checked={cartContext.getFreightSelected == 'pac' ? true : false} 
                                                    onChange={() => handleFreightCheck('pac')} 
                                                /> 
                                                <label htmlFor='pac'>Correios PAC - R$ {cartContext.getFreightPrice.pac.valor} - {cartContext.getFreightPrice.pac.prazoEntrega} Dias</label>
                                            </span>
                                        )}
                                        
                                        {cartContext.getFreightPrice.sedex.message ? (
                                            <span>
                                                <p>Correios SEDEX - {cartContext.getFreightPrice.sedex.message}</p>
                                            </span>
                                        ):(
                                            <span>
                                                <input 
                                                    type="radio" 
                                                    id='sedex'
                                                    checked={cartContext.getFreightSelected == 'sedex' ? true : false} 
                                                    onChange={() => handleFreightCheck('sedex')} 
                                                /> 
                                                <label htmlFor='sedex'>Correios SEDEX - R$ {cartContext.getFreightPrice.sedex.valor} - {cartContext.getFreightPrice.sedex.prazoEntrega} Dias</label>  
                                            </span>
                                        )}
                                    </div>
                                )
                                : null}
                            </div>

                            <div className="total-price">
                                <span>Subtotal: R$ {Number(cartContext.getSubtotalPrice).toFixed(2)}</span>
                                <span>
                                    Frete: R$ {(cartContext.getFreightSelected) 
                                        ? (
                                            Number((cartContext.getFreightPrice[cartContext.getFreightSelected].valor).replace(',', '.')).toFixed(2)
                                        ) : ( '0.00' )
                                    }
                                </span>
                                <span className='total'>Total: R$ {Number(cartContext.getTotalPrice).toFixed(2)}</span>
                                
                                {(userContext.getLogin) ? (
                                    (cartContext.getFreightSelected == null) ? (
                                        <button 
                                            type='button'
                                            data-testid='select-freight-button'
                                            disabled={true}
                                        >
                                            Selecione o frete
                                        </button>
                                    ) : (
                                        <button 
                                            type='button'
                                            data-testid='close-order-button'
                                            onClick={handleCloseOrder}
                                            disabled={
                                                (cartContext.getCart.length == 0) 
                                                    ? true 
                                                    : (getUnableToBuy.length > 0) 
                                                        ? true
                                                        : false
                                            }
                                        >
                                            Fechar Pedido
                                        </button>
                                    )
                                ) : (
                                    <button 
                                        type='button' 
                                        className='login'
                                        data-testid='login-button'
                                        onClick={() => userContext.handleSwitchModal()}
                                    >
                                        Fazer Login
                                    </button>
                                )}
                            </div>

                        </div>
                    </>
                )}
                
            </Container>
        </>
    );
}
