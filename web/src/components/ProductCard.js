import React from 'react';
import Link from 'next/link';

export default function ProductCard({ product }) {

    const discount = (product.discount_percent != 0)
        ? '-' + product.discount_percent + '%'
        : null;

    const finalPrice = (product.discount_percent != 0)
        ? (product.price - (product.price * (product.discount_percent / 100))).toFixed(2)
        : Number(product.price).toFixed(2);

    return (
        <>
            <Link href='/[productId]' as={`/${product.id}?product=${String(product.title).split(' ').join('-')}`}>
                <a title={product.title}>
                    <div className='p-card'>
                        <div className='img-container'>
                            <img
                                src='https://i.picsum.photos/id/892/800/400.jpg'
                                /*src={`https://picsum.photos/800/400`}*/
                                /*src={product.images[0] && product.images[0].url} */
                                alt={'imagem-' + product.title.split(' ').join('-')}
                            />
                        </div>
                        <div className='title-price'>
                            <p className='title'>{product.title}</p>
                            <div className='price-discount'>
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


            <style jsx>{`
                .p-card {
                    border-radius: 5px;
                    max-height: 350px;
                    overflow: hidden;
                    padding: 10px;
                    background: #0D2235;
                }

                .p-card:hover {
                    box-shadow: 5px 5px #16324C;    
                }

                .p-card img {
                    width: 100%;
                    max-width: 475px;
                    height: auto;
                }

                .p-card .title-price {
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

                .p-card .title {
                    font-size: 15px;
                    margin-top: 10px;
                    
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2; /* number of lines to show */
                    -webkit-box-orient: vertical;
                }

                .p-card .price-discount {
                    margin: 10px 0 0 0;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }

                .p-card .price-discount .discount {
                    background: #41773A;
                    padding: 5px 10px;
                }

                .p-card .price-discount .lacking {
                    background: #a32e39;
                    padding: 5px 10px;
                }

                .p-card .price {
                    font-size: 30px;
                    font-weight: bold;
                    padding: 5px 10px;

                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1; /* number of lines to show */
                    -webkit-box-orient: vertical;
                }
            `}</style>
        </>
    );
}
