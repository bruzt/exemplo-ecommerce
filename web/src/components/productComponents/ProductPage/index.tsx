import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import api from '../../../services/api';
import { useCart } from '../../../contexts/cartContext';
import { ICategory, useFilterBar } from '../../../contexts/filterBarContext';

import { Container, BuyedWithContainer } from './styles';

import PageLayout from '../../PageLayout';
import ImageSlider from '../ImageSlider';
import OnSaleCountDown from '../OnSaleCountdown';
import ProductCard from '../ProductCard';

import { IProduct } from '../../../pages/[productId]';

interface IProps {
    product: IProduct;
    productsBuyedWith: IProduct[];
}

let timeoutId: NodeJS.Timeout;

export default function Product({ product, productsBuyedWith }: IProps) {

    const [getProduct, setProduct] = useState<IProduct>(product);
    const [getProductsBuyedWith, setProductsBuyedWith] = useState<IProduct[]>(productsBuyedWith);

    const [getQuantity, setQuantity] = useState(1);
    const [getBuyButtonDisabled, setBuyButtonDisabled] = useState(false);

    const [getIsOnSale, setIsOnSale] = useState(getProduct.isOnSale);

    const cartContext = useCart();
    const router = useRouter();
    const filterBarContext = useFilterBar();

    useEffect(() => {
        fetchProduct();
    }, []);

    useEffect(() => {
        if (getProduct.quantity_stock == 0) {

            setBuyButtonDisabled(true);
            setQuantity(0);
        }

        setIsOnSale(getProduct.isOnSale);
        
    }, [getProduct]);

    async function fetchProduct() {
        try {
            const response = await api.get(`/products/${product.id}`);

            setProduct(response.data.product);
            setProductsBuyedWith(response.data.productsBuyedWith);

        } catch (error) {
            console.error(error);
            alert('Erro, recarregue a página');
        }
    }

    function handleQuantity(value: number) {

        if (getProduct.quantity_stock > 0) {

            if (value == 0 || value == null) {

                setBuyButtonDisabled(true);
                setQuantity(value);

            } else if (value < 0) {

                setBuyButtonDisabled(true);
                setQuantity(0);

            } else if (value > getProduct.quantity_stock) {

                setQuantity(getProduct.quantity_stock);
                setBuyButtonDisabled(false);

            } else {

                setQuantity(value);
                setBuyButtonDisabled(false);
            }
        }
    }

    function addToCartButton() {

        cartContext.addToCart({ id: getProduct.id, qtd: getQuantity });

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
                <title>{getProduct.title} | Exemplo e-commerce</title>
                <meta name="description" content={getProduct.description} />
                <meta name="keywords" content={getProduct.category.name} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:description" content={getProduct.description} />
                <meta name="twitter:title" content={getProduct.title} />
                <meta name="twitter:site" content="Exemplo-ecommerce" />
                <meta name="twitter:domain" content="Exemplo-ecommerce E-Shop" />
                <meta name="twitter:image:src" content={getProduct.images[0] && getProduct.images[0].url} />
                <meta name="twitter:creator" content="Exemplo-ecommerce" />
                <meta property="og:locale" content="pt_BR" />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={getProduct.title} />
                <meta property="og:description" content={getProduct.description} />
                <meta property="og:url" content={`http://localhost:3000/product/${getProduct.id}`} />
                <meta property="og:site_name" content="Exemplo-ecommerce E-Shop" />
                <meta property="og:image" content={getProduct.images[0] && getProduct.images[0].url} />
                <meta property="article:publisher" content="http://www.facebook.com/Exemplo-ecommerce" />
                <meta property="article:tag" content="" />
                <meta property="article:section" content="Produtos" />
                <meta property="article:published_time" content={new Date().toISOString()} />
            </Head>

            <PageLayout>

                <Container>

                    <div className="breadcrumb">
                        <>
                            {(getProduct.category.parent_id != null && getProduct.category.parent_id != 0) && (
                                <>
                                    {findCategoryFather(getProduct.category.parent_id).reverse().map((category, index) => (
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
                                onClick={() => handleCategorySearch(getProduct.category)}
                            >
                                {getProduct.category.name}
                            </a>
                        </>
                    </div>

                    <h1>{getProduct.title}</h1>

                    <div className='img-slider-container'>

                        <ImageSlider images={getProduct.images} />

                    </div>

                    <div className='buy-card-container'>

                        <div className='buy-card'>

                            {getIsOnSale && (
                                <OnSaleCountDown 
                                    product={getProduct}
                                    setIsOnSale={setIsOnSale}
                                    timeoutId={timeoutId}
                                />
                            )}

                            <div className="buy-card-infos">
                                <h2>Preço</h2>
                                {(getIsOnSale) ? <p className='original-price'>R$ {Number(getProduct.price).toFixed(2)}</p> : false}
                                {(getProduct.quantity_stock > 0)
                                    ? (getIsOnSale)
                                        ? <p className='discount'>-{getProduct.discount_percent}%</p>
                                        : null
                                    : <p className='lacking'>Em falta</p>
                                }
                                <p className='price'>R$ {getIsOnSale ? getProduct.finalPrice : getProduct.price} a unidade</p>
                                <p>Qtd: <input type="number" id="qtd" value={getQuantity} onChange={(event) => handleQuantity(Number(event.target.value))} /></p>
                                <p>Disponível: {getProduct.quantity_stock}</p>
                                <p className='total'>Total: R$ {(Number(getIsOnSale ? getProduct.finalPrice : getProduct.price) * getQuantity).toFixed(2)}</p>
                                <button type='button' onClick={addToCartButton} disabled={getBuyButtonDisabled}>
                                    Adicionar ao carrinho
                                </button>
                            </div>
                        </div>

                    </div>

                    <div className='description'>
                        <div>
                            <p>{getProduct.description}</p>
                            <br />
                            <p>Peso: {getProduct.weight}kg</p>
                            <p>Comprimento: {getProduct.length}cm</p>
                            <p>Altura: {getProduct.height}cm</p>
                            <p>Largura: {getProduct.width}cm</p>
                        </div>
                    </div>

                    <div
                        className="html-body"
                        dangerouslySetInnerHTML={{ __html: getProduct.html_body }}
                    />

                </Container>

                {getProductsBuyedWith.length > 0 && (
                    <BuyedWithContainer>
                        <h3>Frequentemente comprados juntos</h3>

                        <div className="buyed-with-grid">
                            {getProductsBuyedWith.map((productBuyedWith) => (
                                <ProductCard 
                                    key={productBuyedWith.id} 
                                    product={productBuyedWith} 
                                />
                            ))}
                        </div>
                    </BuyedWithContainer>
                )}
            </PageLayout>
        </>
    );
}
