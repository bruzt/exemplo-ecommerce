import React, { useState } from 'react';
import Link from 'next/link';

import noImg from '../../../assets/img-n-disp.png';

import { useCart } from '../../../contexts/cartContext';

import { IProduct } from '../../../pages/[productId]';
import OnSaleCountdown from '../OnSaleCountdown';

import { Container } from './styles';

interface IProps {
	product: IProduct;
}

let timeoutId: number;

export default function ProductCard({ product }: IProps) {

    const [getIsOnSale, setIsOnSale] = useState(product.isOnSale);

    const cartContext = useCart();

    function handleAddToCart(id: number){

        cartContext.addToCart({ id, qtd: 1 });
        alert('Produto adicionado ao carrinho');
    }

    return (
        <Container>

            <Link href={`/${product.id}?product=${String(product.title).split(' ').join('-')}`}>
                <a title={product.title}>

                    {(product.quantity_stock > 0) 
                        ? (getIsOnSale) 
                            ? <span className='discount'>{product.discount_percent + '%'}</span>
                            : null
                        : <span className='lacking'>Em falta</span>
                    }

                    <div className="product-info">

                        <figure className='img-container'>
                            <img
                                //src={product.images[0] && product.images[0].url}
                                src={`${(product.images.length > 0) ? `${process.env.BACKEND_URL}/uploads/${product.images[0].filename}` : noImg}`}
                                alt={'imagem-' + product.title.split(' ').join('-')}
                            />
                        </figure>

                        {getIsOnSale && (
                            <OnSaleCountdown 
                                product={product}
                                setIsOnSale={setIsOnSale}
                                timeoutId={timeoutId}
                            />
                        )}
            
                        <div className='title-container'>
                            <span className='title'>{product.title}</span>
                        </div>

                        <div className='price-and-discount'>
                            {(getIsOnSale) ? <span className='original-price'>R$ {Number(product.price).toFixed(2)}</span> : <span></span>}
                            
                            <span className='price'>R$ {product.finalPrice}</span>
                        </div>
                    </div>
                </a>
            </Link>

            <button 
                type='button'
                disabled={product.quantity_stock === 0}
                onClick={() => handleAddToCart(product.id)}
            >
                Adicionar ao carrinho
            </button>

		</Container>
	);
}
