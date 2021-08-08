import React, { useState } from 'react';
//import Link from 'next/link';
import { useRouter } from 'next/router';

import { useCart } from '../../../contexts/cartContext';

import { IProduct } from '../../../pages/[productId]';
import OnSaleCountdown from '../OnSaleCountdown';

import { Container } from './styles';

interface IProps {
	product: IProduct;
}

let timeoutId: NodeJS.Timeout;

export default function ProductCard({ product }: IProps) {

    const [getIsOnSale, setIsOnSale] = useState(product.isOnSale);

    const cartContext = useCart();
    const router = useRouter();

    function handleAddToCart(id: number){

        cartContext.addToCart({ id, qtd: 1 });
        alert('Produto adicionado ao carrinho');
    }

    function handleProductClickAnchor(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>){

        event.preventDefault();

        router.push({
            pathname: `/${product.id}`,
            query: {
                product: String(product.title).split(' ').join('-'),
            }
        });
    }

    return (
        <Container>

            {/*<Link href={`/${product.id}?product=${String(product.title).split(' ').join('-')}`}>*/}
            <a 
                title={product.title} 
                data-testid='product-card-anchor'
                onClick={handleProductClickAnchor}
                href={`/${product.id}?product=${String(product.title).split(' ').join('-')}`}
            >

                {(product.quantity_stock > 0) 
                    ? (getIsOnSale) 
                        ? <span className='discount' data-testid='discount-span'>{product.discount_percent + '%'}</span>
                        : null
                    : <span className='lacking' data-testid='lacking-span'>Em falta</span>
                }

                <div className="product-info">

                    <figure className='img-container'>
                        <img
                            //src={product.images[0] && product.images[0].url}
                            src={`${(product.images.length > 0) ? `${process.env.BACKEND_URL}/uploads/${product.images[0].filename}` : '/images/img-n-disp.png'}`}
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

                    <div className="title-price">
                        <div className='title-container'>
                            <span className='title'>{product.title}</span>
                        </div>

                        <div className='price-and-discount'>
                            {(getIsOnSale) ? <span className='original-price'>R$ {Number(product.price).toFixed(2)}</span> : <span></span>}
                            
                            <span className='price'>R$ {product.finalPrice}</span>
                        </div>
                    </div>
                </div>
            </a>
            {/*</Link>*/}

            <button 
                type='button'
                data-testid='add-to-cart-button'
                disabled={product.quantity_stock === 0}
                onClick={() => handleAddToCart(product.id)}
            >
                Adicionar ao carrinho
            </button>

		</Container>
	);
}
