import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import api from '../services/api';
import Link from 'next/link';
import { FaSearchLocation } from 'react-icons/fa'

import { useCart } from '../context/cartContext';

import PageLayout from '../components/PageLayout';

export default function Order() {

    const [productsState, setProducts] = useState([]);
    const [totalPriceState, setTotalPrice] = useState(0);
    const [cepInputState, setCepInput] = useState('');
    const [pacCheckState, setPacChecked] = useState(false);
    const [sedexCheckState, setSedexCheckStateChecked] = useState(false);
    const [freightPriceState, setFreightPrice] = useState(null);

    const cartContext = useCart();

    useEffect(() => {

        getProducts();

    }, []);

    useEffect(() => {

        calcTotalPrice();

    }, [productsState, cartContext.cart, pacCheckState, sedexCheckState]);

    useEffect(() => {

        resetFreight();

    }, [cepInputState]);

    function resetFreight(){

        setPacChecked(false);
        setSedexCheckStateChecked(false);
        setFreightPrice(0);
    }

    function calcTotalPrice() {

        let totalPrice = 0;

        for (let i = 0; i < cartContext.cart.length; i++) {

            if (productsState.length > 0) {

                totalPrice += productsState[i].finalPrice * cartContext.cart[i].qtd;

            }
        }

        if(pacCheckState) totalPrice += Number((freightPriceState.pac.Valor).replace(',', '.'))
        else if(sedexCheckState) totalPrice += Number((freightPriceState.sedex.Valor).replace(',', '.'))
        
        setTotalPrice(totalPrice.toFixed(2));
    }

    async function getProducts() {

        const products = []

        for (let i = 0; i < cartContext.cart.length; i++) {

            try {

                const response = await api.get(`/products/${cartContext.cart[i].id}`);

                const finalPrice = (response.data.discount_percent == 0)
                    ? Number(response.data.price).toFixed(2)
                    : (response.data.price - (response.data.price * (response.data.discount_percent / 100))).toFixed(2);

                products.push({ finalPrice, ...response.data });

            } catch (error) {
                console.error(error);
                alert('Erro, recarregue a página');
                break;
            }
        }

        setProducts(products);
    }

    function verifyQtd({ id, qtd }) {

        resetFreight();

        const [ product ] = productsState.filter((product) => product.id == id);

        const [ cart ] = cartContext.cart.filter((product) => product.id == id);

        if (((cart.qtd + qtd) == (product.quantity_stock + 1)) || ((cart.qtd + qtd) < 1)) {

            qtd = 0;

        } else if ((cart.qtd) > product.quantity_stock) {

            qtd = product.quantity_stock - cart.qtd;
        }

        cartContext.addToCart({ id, qtd });
    }

    function removeFromCart(id) {

        const products = productsState.filter((product) => product.id != id);

        setProducts(products);
        cartContext.removeFromCart(id);
    }

    function verifyFreightChecked(name){

        if(name == 'pac'){

            setSedexCheckStateChecked(false);
            setPacChecked(true);

        } else if (name == 'sedex'){

            setPacChecked(false);
            setSedexCheckStateChecked(true);
        }
    }

    async function getFreightPrice(){

        let weight = 0;
        let length = 0;
        let height = 0;
        let width = 0;
        let diameter = 0;

        for(let i = 0; i < productsState.length; i++) {

            weight += Number((productsState[i].weight).replace(',', '.')) * cartContext.cart[i].qtd;
            height += Number(productsState[i].height) * cartContext.cart[i].qtd;

            if(length < productsState[i].length) length = Number(productsState[i].length);
            if(width < productsState[i].width) width = Number(productsState[i].width);
            if(diameter < productsState[i].diameter) diameter = Number(productsState[i].diameter);
        }

        weight = String(weight).replace('.', ',');

        try {

            const response = await api.post('/freight', {
                destZipCode: String(cepInputState).replace('-', ''),
                weight,
                length,
                height,
                width
            });

            if(response.data.pac.MsgErro) {

                alert(response.data.pac.MsgErro)

            } else if(response.data.sedex.MsgErro){

                alert(response.data.sedex.MsgErro)

            } else {

                setFreightPrice(response.data);
            }
            
        } catch (error) {
            console.error(error);
            alert('Erro, tente novamente');
        }
    }

    return (
        <>
            <Head>
                <title>Carrinho de compras</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <section>

                    <table>
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
                            {productsState.length > 0 && productsState.map((product, index) => (
                                <tr key={product.id}>
                                    <td className='td-image'>
                                        <p>
                                            <img
                                                src='https://picsum.photos/800/400'
                                                /*src={product.images[0] && product.images[0].url} */
                                                alt={'imagem-' + product.name.split(' ').join('-')}
                                            />
                                        </p>
                                    </td>
                                    <td className='td-name'>
                                        <p>
                                            <Link href={`/${product.id}/${product.name.split(' ').join('-')}`}>
                                                <a>
                                                    <span className='over-hidden'>{product.name}</span>
                                                    {(product.discount_percent != 0)
                                                        ? <span className='order-discount'>-{product.discount_percent}%</span>
                                                        : null
                                                    }
                                                </a>
                                            </Link>
                                        </p>
                                    </td>
                                    <td className='td-price'>
                                        <p>
                                            R$ {product.finalPrice}
                                        </p>
                                    </td>
                                    <td className='td-qtd'>
                                        <p>
                                            <button
                                                type="button"
                                                id='remove'
                                                onClick={() => removeFromCart(product.id)}
                                                title='Remover do carrinho'
                                            >
                                                X
                                            </button>
                                            <button
                                                type="button"
                                                id='less'
                                                onClick={() => verifyQtd({ id: product.id, qtd: -1 })}
                                                title='Remover 1'
                                            >
                                                -
                                            </button>
                                            <span className='cart-qtd'>{cartContext.cart[index].qtd}</span>
                                            <button
                                                type="button"
                                                id='plus'
                                                onClick={() => verifyQtd({ id: product.id, qtd: 1 })}
                                                title='Adicionar 1'
                                            >
                                                +
                                            </button>
                                        </p>
                                        <p>
                                            Disponível: {product.quantity_stock}
                                        </p>
                                    </td>
                                    <td className='td-total'>
                                        R$ {(product.finalPrice * cartContext.cart[index].qtd).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <div className='freight-total'>

                        <div className="calc-freight">
                            <div className='cep-input'>
                                Calculo de frete: <input type='text' placeholder='CEP' value={cepInputState} onChange={(event) => setCepInput(event.target.value)} />
                                <button type='button' onClick={() => getFreightPrice()}>
                                    <FaSearchLocation size={20} />
                                </button>
                            </div>
                            
                            {freightPriceState ? (
                                <div className='choose-freight'>
                                    <div>
                                        <span>
                                            <input 
                                                type="radio" 
                                                name='pac'
                                                checked={pacCheckState} 
                                                onChange={(event) => verifyFreightChecked(event.target.name)} 
                                            /> 
                                            <p>PAC - R$ {freightPriceState.pac.Valor} - {freightPriceState.pac.PrazoEntrega} Dias</p>
                                        </span>
                                        <span>
                                            <input 
                                                type="radio" 
                                                name='sedex'
                                                checked={sedexCheckState} 
                                                onChange={(event) => verifyFreightChecked(event.target.name)} 
                                            /> 
                                            <p>SEDEX - R$ {freightPriceState.sedex.Valor} - {freightPriceState.sedex.PrazoEntrega} Dias</p>  
                                        </span>
                                    </div>
                                </div>
                            )
                            : null}
                        </div>

                        <div className="total-price">
                            <p>Total: R$ {totalPriceState}</p>
                            <button type='button'>Fechar Pedido</button>
                        </div>

                    </div>

                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    min-height: 800px;
                    padding: 10px;
                }

                table {
                    width: 100%;
                }

                .th-image {
                    width: 10%;
                }

                .th-product {
                    width: 45%;
                }

                .th-price {
                    width: 15%; 
                }

                .th-qtd {
                    width: 15%;
                }

                .th-total {
                    width: 15%;
                }

                tbody tr td {
                    height: 50px;
                    vertical-align: middle;
                }

                .td-image {
                    text-align: center;
                }

                .td-image img {
                    max-width: 100%;
                    height: 50px;
                }

                .td-name .over-hidden {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    padding: 10px 0 0 0;
                }

                .td-name a {
                    display: flex;
                    justify-content: space-between;
                }

                .td-name .order-discount {
                    background: #3E8C34;
                    padding: 5px 10px;
                    margin: 0 0 0 10px;
                }

                .td-price {
                    text-align: center;
                }

                .td-qtd p {
                    display: flex;
                    justify-content: center;
                }

                .td-qtd .cart-qtd {
                    font-weight: bold;
                    font-size: 20px;
                }

                .td-qtd p + p {
                    margin: 5px 0 0 0;
                }

                .td-qtd button {
                    width: 20px; 
                    height: 20px;
                    margin: 0 10px;
                    border: 0;
                    border-radius: 2px;
                    font-weight: bold;
                }

                .td-qtd button:active {
                    background: #3E8C34;
                }

                .td-qtd button#remove {
                    background: #a32e39;
                }
                
                .td-qtd button#remove:active { 
                    background: #bf2232;
                }

                .td-qtd input {
                    width: 40px;
                }

                .td-total {
                    text-align: center;
                    font-weight: bold;
                }

                .freight-total {
                    display: flex;
                    justify-content: flex-end;
                }

                .total-price {
                    font-size: 30px;
                    font-weight: bold;
                    margin: 20px 30px 0 0;
                }

                .total-price button {
                    width: 100%;
                    height: 50px;
                    margin: 10px 0 0 0;
                    border: 0;
                    background: ${(false) ? '#a32e39' : '#3E8C34'};
                    font-size: 20px;
                    font-weight: bold;
                }

                .total-price button:hover {
                    background: ${(false) ? '#bf2232' : '#41A933'};
                }

                .total-price button:active {
                    background: ${(false) ? '#a32e39' : '#3E8C34'};
                }

                .calc-freight {
                    margin: 20px 50px 0 0;
                }

                .calc-freight .cep-input {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .calc-freight input {
                    width: 150px;
                    height: 30px;
                    font-size: 30px;  
                    padding: 0 0 0 2px;  
                }

                .calc-freight button {
                    width: 30px;
                    height: 30px;
                    border: 0;
                    border-radius: 2px;
                    margin: 0 0 0 5px;
                }

                .calc-freight button:active {
                    background: #3E8C34;
                }

                /* remove arrows from input[type="number"] Chrome, Safari, Edge, Opera */
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }

                /* remove arrows from input[type="number"] Firefox */
                input[type=number] {
                    -moz-appearance: textfield;
                }

                .choose-freight {
                    margin: 10px 0 0 0;
                }

                .choose-freight span {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .choose-freight span input {
                    margin: 0 10px 0 0;
                }

                .choose-freight input {
                    width: 20px;
                }
            `}</style>
        </>
    );
}
