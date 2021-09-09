import React, { FormEvent, useEffect, useState } from "react";
import Loader from "react-loader-spinner";

import api from "../../../services/api";

import { Container } from "./styles";

import Button from "../../genericComponents/Button";
import AddImageInput from "../AddImageInput";
import ImagesGrid from "../ImagesGrid";
import RichTextEditor from "../../RichTextEditor";

import { IProduct } from "../ListProducts";
import { ICategory } from "../AddProduct";

interface IProps {
  product: IProduct;
  setUpdateModalOpen: React.Dispatch<boolean>;
  _testFiles?: File[];
}

export default function UpdateProduct({
  product,
  setUpdateModalOpen,
  _testFiles,
}: IProps) {
  const [getCategories, setCategories] = useState<ICategory[]>([]);

  const [getTitle, setTitle] = useState(product.title);
  const [getFiles, setFiles] = useState<File[]>(_testFiles || []);
  const [getDescription, setDescription] = useState(product.description);

  const [getPrice, setPrice] = useState(String(product.price));
  const [getQtdStock, setQtdStock] = useState(String(product.quantity_stock));
  const [getCategoryId, setCategoryId] = useState(String(product.category.id));
  const [getTangible, setTangible] = useState(product.tangible ? "1" : "0");

  const [getWeight, setWeight] = useState(product.weight);
  const [getLength, setLength] = useState(product.length);
  const [getHeight, setHeight] = useState(product.height);
  const [getWidth, setWidth] = useState(product.width);

  const [getDiscount, setDiscount] = useState(String(product.discount_percent));
  const [getDiscountDatetimeStart, setDiscountDatetimeStart] = useState<string>(
    product.discount_datetime_start
      ? serializeDateBr(product.discount_datetime_start)
      : ""
  );
  const [getDiscountDatetimeEnd, setDiscountDatetimeEnd] = useState<string>(
    product.discount_datetime_end
      ? serializeDateBr(product.discount_datetime_end)
      : ""
  );

  const [getHtmlBody, setHtmlBody] = useState(product.html_body);

  const [getIsFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  function serializeDateBr(date: string) {
    return new Date(new Date(date).setHours(new Date(date).getHours() - 3))
      .toJSON()
      .slice(0, 19);
  }

  async function fetchCategories() {
    try {
      const response = await api.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.log(error);
      alert("Erro ao buscar categorias");
    }
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    if (getTitle.trim().length == 0) return alert("Título não preenchido");
    if (getDescription.trim().length == 0)
      return alert("Descrição não preenchida");
    if (String(getPrice).trim().length == 0)
      return alert("Preço não preenchido");
    if (getCategoryId == "0") return alert("Categoria não selecionada");
    if (String(getWeight).trim().length == 0 || getWeight == 0)
      return alert("Peso não preenchido");
    if (String(getLength).trim().length == 0 || getLength == 0)
      return alert("Comprimento não preenchido");
    if (String(getHeight).trim().length == 0 || getHeight == 0)
      return alert("Altura não preenchido");
    if (String(getWidth).trim().length == 0 || getWidth == 0)
      return alert("Largura não preenchido");

    const data = {
      title: getTitle,
      description: getDescription,
      price: Number(getPrice),
      quantity_stock: Number(getQtdStock),
      discount_percent: Number(getDiscount),
      discount_datetime_start: getDiscountDatetimeStart
        ? getDiscountDatetimeStart
        : undefined,
      discount_datetime_end: getDiscountDatetimeEnd
        ? getDiscountDatetimeEnd
        : undefined,
      category_id: Number(getCategoryId),
      tangible: Boolean(Number(getTangible)),
      weight: getWeight,
      length: getLength,
      height: getHeight,
      width: getWidth,
      html_body: getHtmlBody.trim().length > 0 ? getHtmlBody : undefined,
    };

    try {
      setIsFetching(true);
      await api.put(`/products/${product.id}`, data);

      if (getFiles.length > 0) {
        const files = new FormData();

        getFiles.forEach((file) => files.append("file", file, file.name));

        await api.post(`/products/${product.id}/images`, files);
      }

      setIsFetching(false);
      alert("Produto atualizado com sucesso");

      setUpdateModalOpen(false);
    } catch (error) {
      console.log(error);
      alert("Erro ao atualizar produto");
      setIsFetching(false);
    }
  }

  return (
    <Container data-testid="update-modal-container">
      <form onSubmit={onSubmit}>
        <header>
          <button
            type="button"
            data-testid="close-update-modal-button"
            onClick={() => setUpdateModalOpen(false)}
          >
            X
          </button>
        </header>

        <ImagesGrid product={product} />

        <div className="input-group">
          <label htmlFor="product-title">Título</label>
          <input
            type="text"
            id="product-title"
            data-testid="product-title-input"
            value={getTitle}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <AddImageInput getFiles={getFiles} setFiles={setFiles} />

        <div className="input-group">
          <label htmlFor="product-description">Descrição</label>
          <textarea
            id="product-description"
            data-testid="product-description-textarea"
            maxLength={255}
            value={getDescription}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="product-price">Preço (R$)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              id="product-price"
              data-testid="product-price-input"
              value={getPrice}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="product-stock">Qtd estoque</label>
            <input
              type="number"
              min="0"
              id="product-stock"
              data-testid="product-stock-input"
              value={getQtdStock}
              onChange={(event) => setQtdStock(event.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="product-category">Categoria</label>
            <select
              id="product-category"
              data-testid="product-category-select"
              value={getCategoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            >
              <option value="0"></option>
              {getCategories.map((category, index) => (
                <option key={index} value={`${category.id}`}>
                  {category.id} - {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group product-tangible-group">
            <label htmlFor="product-tangible">Tangível</label>
            <select
              id="product-tangible"
              value={getTangible}
              onChange={(event) => setTangible(event.target.value)}
            >
              <option value="1">Sim</option>
              <option value="0">Não</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="product-weight">Peso (kg)</label>
            <input
              type="number"
              min="0"
              step="0.001"
              id="product-weight"
              data-testid="product-weight-input"
              value={getWeight}
              onChange={(event) => setWeight(Number(event.target.value))}
            />
          </div>

          <div className="input-group">
            <label htmlFor="product-length">Comprimento (cm)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              id="product-length"
              data-testid="product-length-input"
              value={getLength}
              onChange={(event) => setLength(Number(event.target.value))}
            />
          </div>

          <div className="input-group">
            <label htmlFor="product-height">Altura (cm)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              id="product-height"
              data-testid="product-height-input"
              value={getHeight}
              onChange={(event) => setHeight(Number(event.target.value))}
            />
          </div>

          <div className="input-group">
            <label htmlFor="product-width">Largura (cm)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              id="product-width"
              data-testid="product-width-input"
              value={getWidth}
              onChange={(event) => setWidth(Number(event.target.value))}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="input-group">
            <label htmlFor="product-discount">Desconto (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              id="product-discount"
              data-testid="product-discount-input"
              value={getDiscount}
              onChange={(event) => setDiscount(event.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="datetime-start">Início do desconto</label>
            <input
              type="datetime-local"
              id="datetime-start"
              data-testid="datetime-start-input"
              value={getDiscountDatetimeStart}
              onChange={(event) => setDiscountDatetimeStart(event.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="datetime-end">Fim do desconto</label>
            <input
              type="datetime-local"
              id="datetime-end"
              data-testid="datetime-end-input"
              value={getDiscountDatetimeEnd}
              onChange={(event) => setDiscountDatetimeEnd(event.target.value)}
            />
          </div>
        </div>

        <section className="text-editor">
          <label>Corpo do anúncio</label>
          {process.browser && (
            <RichTextEditor getContent={getHtmlBody} setContent={setHtmlBody} />
          )}
        </section>

        <Button
          type="submit"
          data-testid="submit-button"
          className={`${getIsFetching && "is-fetching"}`}
          disabled={getIsFetching}
        >
          {getIsFetching ? (
            <Loader type="TailSpin" color="#0D2235" height={30} width={30} />
          ) : (
            "Atualizar"
          )}
        </Button>

        <div className="preview">
          <h2>Preview</h2>

          <hr />

          <div
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: getHtmlBody }}
          />

          <hr />
        </div>
      </form>
    </Container>
  );
}
