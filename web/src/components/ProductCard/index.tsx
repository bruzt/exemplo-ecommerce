import React from 'react';
import Link from 'next/link';

import noImg from '../../assets/img-n-disp.png';

import { Container } from './styles';

import { IProduct } from '../../pages/[productId]';

interface IProps {
	product: IProduct;
}

export default function ProductCard({ product }: IProps) {
	
	const discount = (product.discount_percent != 0)
        ? '-' + product.discount_percent + '%'
        : null;

    const finalPrice = (product.discount_percent != 0)
        ? (Number(product.price) - (Number(product.price) * (product.discount_percent / 100))).toFixed(2)
        : Number(product.price).toFixed(2);

    return (
        <Container>
            <Link href={`/${product.id}?product=${String(product.title).split(' ').join('-')}`}>
                <a title={product.title}>
                    <div className='p-card'>
                        <div className='img-container'>
                            <img
                                //src={product.images[0] && product.images[0].url}
                                src={`${(product.images.length > 0) ? `${process.env.BACKEND_URL}/uploads/${product.images[0].filename}` : noImg}`}
                                alt={'imagem-' + product.title.split(' ').join('-')}
                            />
                        </div>
                        <div className='title-price'>
                            <p className='title'>{product.title}</p>
                            <div className='price-discount'>
                                {(discount) ? <p className='original-price'>R$ {Number(product.price).toFixed(2)}</p> : false}
                                <p className='price'>R$ {finalPrice}</p>

                                {(product.quantity_stock > 0) 
                                    ? (discount) 
                                        ? <p className='discount'>{discount}</p>
                                        : null
                                    : <p className='lacking'>Em falta</p>
                                }
                            </div>
                        </div>
                    </div>
                </a>
            </Link>
		</Container>
	);
}
