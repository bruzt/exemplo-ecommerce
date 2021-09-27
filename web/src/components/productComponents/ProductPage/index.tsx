import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSwr from "swr";

import api from "../../../services/api";
import { useCart } from "../../../contexts/cartContext";
import { ICategory, useFilterBar } from "../../../contexts/filterBarContext";
import PageLayout from "../../PageLayout";
import ImageSlider from "../ImageSlider";
import OnSaleCountDown from "../OnSaleCountdown";
import ProductCard from "../ProductCard";
import { IProduct } from "../../../pages/product/[productId]";

import { Container, BuyedWithContainer } from "./styles";

interface IProps {
  product: IProduct;
}

let timeoutId: NodeJS.Timeout;

export default function Product({ product }: IProps) {
  //const [getProduct, setProduct] = useState<IProduct>(product);

  const [getQuantity, setQuantity] = useState(1);
  const [getBuyButtonDisabled, setBuyButtonDisabled] = useState(false);

  const [getIsOnSale, setIsOnSale] = useState(product.isOnSale);

  const cartContext = useCart();
  const router = useRouter();
  const filterBarContext = useFilterBar();

  const fetcher = (url: string) =>
    api.get<IProduct>(url).then((result) => result.data);

  const { data: swrData } = useSwr(
    `/products/${product.id}?buyedWith=4`,
    fetcher,
    {
      focusThrottleInterval: 60000,
      onError: (error) => {
        console.log(error);
        alert("Erro ao buscar producto");
      },
    }
  );

  const productData = swrData || product;

  useEffect(() => {
    if (productData) {
      if (productData.quantity_stock == 0) {
        setBuyButtonDisabled(true);
        setQuantity(0);
      }

      setIsOnSale(productData.isOnSale);
    }
  }, [productData]);

  /*useEffect(() => {
        fetchProduct();
    }, []);*/

  /*async function fetchProduct() {
        try {
            const response = await api.get(`/products/${product.id}?buyedWith=4`);

            setProduct(response.data);

        } catch (error) {
            console.error(error);
            alert('Erro, recarregue a página');
        }
    }*/

  function handleQuantity(value: number) {
    if (productData.quantity_stock > 0) {
      if (value == 0 || value == null) {
        setBuyButtonDisabled(true);
        setQuantity(value);
      } else if (value < 0) {
        setBuyButtonDisabled(true);
        setQuantity(0);
      } else if (value > productData.quantity_stock) {
        setQuantity(productData.quantity_stock);
        setBuyButtonDisabled(false);
      } else {
        setQuantity(value);
        setBuyButtonDisabled(false);
      }
    }
  }

  function addToCartButton() {
    cartContext.addToCart({ id: productData.id, qtd: getQuantity });

    router.push("/order");
  }

  function findCategoryFather(fatherId: number) {
    const categories: ICategory[] = [];

    const [father] = filterBarContext.getCategories.filter(
      (category) => fatherId == category.id
    );

    if (father) {
      categories.push(father);

      categories.push(...findCategoryFather(father.parent_id));
    }

    return categories;
  }

  function handleCategorySearch(category: ICategory) {
    router.push({
      pathname: "/search",
      query: {
        categoryId: category.id,
        page: 1,
        category: String(category.name).split(" ").join("-"),
      },
    });
  }

  return (
    <>
      <Head>
        <title>{productData.title} | Exemplo e-commerce</title>
        <meta name="description" content={productData.description} />
        <meta name="keywords" content={productData.category.name} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:description" content={productData.description} />
        <meta name="twitter:title" content={productData.title} />
        <meta name="twitter:site" content="Exemplo-ecommerce" />
        <meta name="twitter:domain" content="Exemplo-ecommerce E-Shop" />
        <meta
          name="twitter:image:src"
          content={productData.images[0] && productData.images[0].url}
        />
        <meta name="twitter:creator" content="Exemplo-ecommerce" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={productData.title} />
        <meta property="og:description" content={productData.description} />
        <meta
          property="og:url"
          content={`http://localhost:3000/product/${productData.id}`}
        />
        <meta property="og:site_name" content="Exemplo-ecommerce E-Shop" />
        <meta
          property="og:image"
          content={productData.images[0] && productData.images[0].url}
        />
        <meta
          property="article:publisher"
          content="http://www.facebook.com/Exemplo-ecommerce"
        />
        <meta property="article:tag" content="" />
        <meta property="article:section" content="Produtos" />
        <meta
          property="article:published_time"
          content={new Date().toISOString()}
        />
      </Head>

      <PageLayout>
        <Container>
          <div className="breadcrumb">
            {productData.category.parent_id != null &&
              productData.category.parent_id != 0 && (
                <>
                  {findCategoryFather(productData.category.parent_id)
                    .reverse()
                    .map((category, index) => (
                      <React.Fragment key={category.id}>
                        {index > 0 && (
                          <span data-testid="category-spacer">{" > "}</span>
                        )}
                        <a
                          onClick={() => handleCategorySearch(category)}
                          data-testid="category-name"
                        >
                          {category.name}
                        </a>
                      </React.Fragment>
                    ))}
                  <span data-testid="category-spacer">{" > "}</span>
                </>
              )}
            <a
              onClick={() => handleCategorySearch(productData.category)}
              data-testid="category-name"
            >
              {productData.category.name}
            </a>
          </div>

          <h1>{productData.title}</h1>

          <div className="img-slider-container">
            <ImageSlider images={productData.images} />
          </div>

          <div className="buy-card-container">
            <div className="buy-card">
              {getIsOnSale && (
                <OnSaleCountDown
                  product={productData}
                  setIsOnSale={setIsOnSale}
                  timeoutId={timeoutId}
                />
              )}

              <div className="buy-card-infos">
                <h2>Preço</h2>
                {getIsOnSale && (
                  <p className="original-price" data-testid="original-price">
                    R$ {Number(productData.price).toFixed(2)}
                  </p>
                )}
                {productData.quantity_stock > 0 ? (
                  getIsOnSale && (
                    <p className="discount" data-testid="discount-percent">
                      -{productData.discount_percent}%
                    </p>
                  )
                ) : (
                  <p className="lacking" data-testid="lacking">
                    Em falta
                  </p>
                )}
                <p className="price">R$ {productData.finalPrice} a unidade</p>

                <p>
                  Qtd:{" "}
                  <input
                    type="number"
                    id="qtd"
                    data-testid="qtd-input"
                    value={getQuantity}
                    onChange={(event) =>
                      handleQuantity(Number(event.target.value))
                    }
                  />
                </p>

                <p data-testid="quantity-stock">
                  Disponível: {productData.quantity_stock}
                </p>

                <p className="total">
                  Total: R${" "}
                  {(
                    Number(
                      getIsOnSale ? productData.finalPrice : productData.price
                    ) * getQuantity
                  ).toFixed(2)}
                </p>

                <button
                  type="button"
                  onClick={addToCartButton}
                  disabled={getBuyButtonDisabled}
                  data-testid="add-to-cart-page-button"
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          </div>

          <div className="description">
            <div>
              <p>{productData.description}</p>
              <br />
              <p>Peso: {productData.weight}kg</p>
              <p>Comprimento: {productData.length}cm</p>
              <p>Altura: {productData.height}cm</p>
              <p>Largura: {productData.width}cm</p>
            </div>
          </div>

          <div
            className="html-body"
            dangerouslySetInnerHTML={{ __html: productData.html_body }}
          />
        </Container>

        {productData.productsBuyedWith.length > 0 && (
          <BuyedWithContainer data-testid="buyed-with-container">
            <h3>Frequentemente comprados juntos</h3>

            <div className="buyed-with-grid">
              {productData.productsBuyedWith.map((productBuyedWith) => (
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
