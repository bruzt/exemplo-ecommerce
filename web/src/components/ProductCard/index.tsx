import React from 'react';
import Link from 'next/link';

import noImg from '../../assets/img-n-disp.png';

import { useCart } from '../../contexts/cartContext';

import { Container } from './styles';

import { IProduct } from '../../pages/[productId]';

interface IProps {
	product: IProduct;
}

export default function ProductCard({ product }: IProps) {

    const cartContext = useCart();
	
	const discount = (product.discount_percent != 0)
        ? '-' + product.discount_percent + '%'
        : null;

    function handleAddToCart(id: number){

        cartContext.addToCart({ id, qtd: 1 });
        alert('Produto adicionado ao carrinho');
    }

    return (
        <Container>


            <Link href={`/${product.id}?product=${String(product.title).split(' ').join('-')}`}>
                <a title={product.title}>

                    {(product.quantity_stock > 0) 
                        ? (discount) 
                            ? <span className='discount'>{discount}</span>
                            : null
                        : <span className='lacking'>Em falta</span>
                    }

                    <div className="product-info">

                        <div className='img-container'>
                            <img
                                //src={product.images[0] && product.images[0].url}
                                src={`${(product.images.length > 0) ? `${process.env.BACKEND_URL}/uploads/${product.images[0].filename}` : noImg}`}
                                alt={'imagem-' + product.title.split(' ').join('-')}
                            />
                        </div>
            
                        <div className='title-container'>
                            <span className='title'>{product.title}</span>
                        </div>

                        <div className='price-and-discount'>
                            {(discount) ? <span className='original-price'>R$ {Number(product.price).toFixed(2)}</span> : <span></span>}
                            
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
