import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useCart } from '../../../contexts/cartContext';
import { ICategory, useFilterBar } from '../../../contexts/filterBarContext';

import { Container } from './styles';

import PageLayout from '../../PageLayout';
import ImageSlider from '../ImageSlider';
import OnSaleCountDown from '../OnSaleCountdown';

import { IProduct } from '../../../pages/[productId]';

interface IProps {
    product: IProduct;
}

let timeoutId: NodeJS.Timeout;

export default function Product({ product }: IProps) {

    const [getQuantity, setQuantity] = useState(1);
    const [getBuyButtonDisabled, setBuyButtonDisabled] = useState(false);

    const [getIsOnSale, setIsOnSale] = useState(product.isOnSale);

    const cartContext = useCart();
    const router = useRouter();
    const filterBarContext = useFilterBar();

    useEffect(() => {
        if (product.quantity_stock == 0) {

            setBuyButtonDisabled(true);
            setQuantity(0);
        }
    }, [product]);

    function handleQuantity(value: number) {

        if (product.quantity_stock > 0) {

            if (value == 0 || value == null) {

                setBuyButtonDisabled(true);
                setQuantity(value);

            } else if (value < 0) {

                setBuyButtonDisabled(true);
                setQuantity(0);

            } else if (value > product.quantity_stock) {

                setQuantity(product.quantity_stock);
                setBuyButtonDisabled(false);

            } else {

                setQuantity(value);
                setBuyButtonDisabled(false);
            }
        }
    }

    function addToCartButton() {

        cartContext.addToCart({ id: product.id, qtd: getQuantity });

        router.push('/order');
    }

    function findCategoryFather(fatherId: number) {

        const categories: ICategory[] = [];

        const [father] = filterBarContext.getCategories.filter((category) => fatherId == category.id);

        if (father) {

            categories.push(father);

            categories.push(...findCategoryFather(father.parent_id));
        }

        return categories;
    }

    function handleCategorySearch(category: ICategory) {

        router.push({
            pathname: '/search',
            query: {
                categoryId: category.id,
                page: 1,
                category: String(category.name).split(' ').join('-')
            }
        });
    }

    return (
        <>
            <Head>
                <title>{product.title} | Exemplo e-commerce</title>
                <meta name="description" content={product.description} />
                <meta name="keywords" content={product.category.name} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content={product.description} />
                <meta name="twitter:title" content={product.title} />
                <meta name="twitter:site" content="Exemplo-ecommerce" />
                <meta name="twitter:domain" content="Exemplo-ecommerce E-Shop" />
                <meta name="twitter:image:src" content={product.images[0] && product.images[0].url} />
                <meta name="twitter:creator" content="Exemplo-ecommerce" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={product.title} />
                <meta property="og:description" content={product.description} />
                <meta property="og:url" content={`http://localhost:3000/product/${product.id}`} />
                <meta property="og:site_name" content="Exemplo-ecommerce E-Shop" />
                <meta property="og:image" content={product.images[0] && product.images[0].url} />
                <meta property="article:publisher" content="http://www.facebook.com/Exemplo-ecommerce" />
                <meta property="article:tag" content="" />
                <meta property="article:section" content="Produtos" />
                <meta property="article:published_time" content={new Date().toISOString()} />
            </Head>

            <PageLayout>

                <Container>

                    <div className="breadcrumb">
                        <>
                            {(product.category.parent_id != null && product.category.parent_id != 0) && (
                                <>
                                    {findCategoryFather(product.category.parent_id).reverse().map((category, index) => (
                                        <React.Fragment key={index}>
                                            {(index != 0) && <span> {'>'} </span>}
                                            <a
                                                onClick={() => handleCategorySearch(category)}
                                            >
                                                {category.name}
                                            </a>
                                        </React.Fragment>
                                    ))}
                                    <span> {'>'} </span>
                                </>
                            )}
                            <a
                                onClick={() => handleCategorySearch(product.category)}
                            >
                                {product.category.name}
                            </a>
                        </>
                    </div>

                    <h1>{product.title}</h1>

                    <div className='img-slider-container'>

                        <ImageSlider images={product.images} />

                    </div>

                    <div className='buy-card-container'>

                        <div className='buy-card'>

                            {getIsOnSale && (
                                <OnSaleCountDown 
                                    product={product}
                                    setIsOnSale={setIsOnSale}
                                    timeoutId={timeoutId}
                                />
                            )}

                            <div className="buy-card-infos">
                                <h2>Preço</h2>
                                {(getIsOnSale) ? <p className='original-price'>R$ {Number(product.price).toFixed(2)}</p> : false}
                                {(product.quantity_stock > 0)
                                    ? (getIsOnSale)
                                        ? <p className='discount'>-{product.discount_percent}%</p>
                                        : null
                                    : <p className='lacking'>Em falta</p>
                                }
                                <p className='price'>R$ {getIsOnSale ? product.finalPrice : product.price} a unidade</p>
                                <p>Qtd: <input type="number" id="qtd" value={getQuantity} onChange={(event) => handleQuantity(Number(event.target.value))} /></p>
                                <p>Disponível: {product.quantity_stock}</p>
                                <p className='total'>Total: R$ {(Number(getIsOnSale ? product.finalPrice : product.price) * getQuantity).toFixed(2)}</p>
                                <button type='button' onClick={addToCartButton} disabled={getBuyButtonDisabled}>
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className='description'>
                        <div>
                            <p>{product.description}</p>
                            <br />
                            <p>Peso: {product.weight}kg</p>
                            <p>Comprimento: {product.length}cm</p>
                            <p>Altura: {product.height}cm</p>
                            <p>Largura: {product.width}cm</p>
                        </div>
                    </div>

                    <div
                        className="html-body"
                        dangerouslySetInnerHTML={{ __html: product.html_body }}
                    />

                </Container>

            </PageLayout>
        </>
    );
}
