import React, { FormEvent, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';

import api from '../../../services/api';

import { Container } from './styles';

import Button from '../../genericComponents/Button';
import RichTextEditor from '../../RichTextEditor';
import AddImageInput from '../AddImageInput';

export interface ICategory {
    id: number;
    name: string;
    parent_id: number;
}

interface IProps {
    _testFiles?: File[];
}

export default function AddProduct({ _testFiles }: IProps) {

    const [getCategories, setCategories] = useState<ICategory[]>([]);

    const [getTitle, setTitle] = useState('');
    const [getFiles, setFiles] = useState<File[]>(_testFiles || []);
    const [getDescription, setDescription] = useState('');

    const [getPrice, setPrice] = useState('');
    const [getQtdStock, setQtdStock] = useState('0');
    const [getCategory, setCategory] = useState('0');
    const [getTangible, setTangible] = useState(1);
    
    const [getWeight, setWeight] = useState(0);
    const [getLength, setLength] = useState(0);
    const [getHeight, setHeight] = useState(0);
    const [getWidth, setWidth] = useState(0);

    const [getDiscount, setDiscount] = useState('0');
    const [getDiscountDatetimeStart, setDiscountDatetimeStart] = useState<string>('');
    const [getDiscountDatetimeEnd, setDiscountDatetimeEnd] = useState<string>('');

    const [getHtmlText, setHtmlText] = useState('');

    const [getIsFetching, setIsFetching] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {

        try {

            const response = await api.get('/categories');

            setCategories(response.data);

        } catch (error) {
            console.log(error);
            alert('Erro ao buscar categorias');
        }
    }

    async function onSubmit(event: FormEvent) {

        event.preventDefault();

        if (getTitle.trim().length == 0) return alert('Título não preenchido');
        if (getDescription.trim().length == 0) return alert('Descrição não preenchida');
        if (getPrice.trim().length == 0) return alert('Preço não preenchido');
        if (getCategory == '0') return alert('Categoria não selecionada');

        if(getTangible){
            if (getWeight == 0) return alert('Peso não preenchido');
            if (getLength == 0) return alert('Comprimento não preenchido');
            if (getHeight == 0) return alert('Altura não preenchido');
            if (getWidth == 0) return alert('Largura não preenchido');
        }

        const product = {
            title: getTitle,
            description: getDescription,
            price: Number(getPrice),
            quantity_stock: Number(getQtdStock),
            category_id: Number(getCategory),
            tangible: Boolean(Number(getTangible)),
            weight: getWeight,
            length: getLength,
            height: getHeight,
            width: getWidth,
            discount_percent: Number(getDiscount),
            discount_datetime_start: getDiscountDatetimeStart ? getDiscountDatetimeStart : undefined,
            discount_datetime_end: getDiscountDatetimeEnd ? getDiscountDatetimeEnd : undefined,
            html_body: getHtmlText.trim().length > 0 ? String(getHtmlText) : undefined
        }

        try {
            setIsFetching(true);
            const response = await api.post('/products', product);

            if (getFiles.length > 0) {
                try {
                    const data = new FormData();
    
                    getFiles.forEach((file) => data.append('file', file, file.name));
    
                    await api.post(`/products/${response.data.id}/images`, data);

                } catch (error) {
                    console.log(error);
                    alert('Erro ao adicionar as imagens');
                    setIsFetching(false)
                }
            }

            setIsFetching(false);
            alert('Produto cadastrado com sucesso');

            setTitle('');
            setFiles([]);
            setDescription('');
            setPrice('');
            setQtdStock('0');
            setDiscount('0');
            setCategory('0');
            setTangible(1);
            setWeight(0);
            setLength(0);
            setHeight(0);
            setWidth(0);
            setHtmlText('');

        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar produto');
            setIsFetching(false);
        }
    }

    return (
        <Container data-testid='add-product-container'>

            <h2>Adicionar produto</h2>

            <form onSubmit={onSubmit}>

                <div className="input-group">
                    <label htmlFor="product-title">Título</label>
                    <input
                        type="text"
                        id='product-title'
                        data-testid='product-title-input'
                        value={getTitle}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>

                <AddImageInput getFiles={getFiles} setFiles={setFiles} />

                <div className="input-group">
                    <label htmlFor="product-description">Descrição</label>
                    <textarea
                        id="product-description"
                        data-testid="product-description-input"
                        maxLength={255}
                        value={getDescription}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>

                <div className='form-line'>
                    <div className="input-group">
                        <label htmlFor="product-price">Preço (R$)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            id='product-price'
                            data-testid='product-price-input'
                            value={getPrice}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-stock">Qtd em Estoque</label>
                        <input
                            type="number"
                            min="0"
                            id='product-stock'
                            data-testid='product-stock-input'
                            value={getQtdStock}
                            onChange={(event) => setQtdStock(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-category">Categoria</label>
                        <select
                            id='product-category'
                            data-testid='product-category-select'
                            value={getCategory}
                            onChange={(event) => setCategory(event.target.value)}
                        >
                            <option value={0}></option>
                            {getCategories.map((category, index) => (
                                <option key={index} value={category.id}>{category.id} - {category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-tangible">Tangível</label>
                        <select
                            id='product-tangible'
                            data-testid='product-tangible-select'
                            value={getTangible}
                            onChange={(event) => setTangible(Number(event.target.value))}
                        >
                            <option value={1}>Sim</option>
                            {/*<option value={0}>Não</option>*/}
                        </select>
                    </div>
                </div>

                <div className='form-line'>

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
                            value={getHeight} onChange={(event) => setHeight(Number(event.target.value))}
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

                <div className="form-line">
                    <div className="input-group">
                        <label htmlFor="product-discount">Desconto (%)</label>
                        <input
                            type="number"
                            min="0"
                            max='100'
                            id='product-discount'
                            data-testid='product-discount-input'
                            value={getDiscount}
                            onChange={(event) => setDiscount(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="datetime-start">Início do desconto</label>
                        <input
                            type="datetime-local"
                            id='datetime-start'
                            data-testid='datetime-start-input'
                            value={getDiscountDatetimeStart}
                            onChange={(event) => setDiscountDatetimeStart(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="datetime-end">Fim do desconto</label>
                        <input
                            type="datetime-local"
                            id='datetime-end'
                            data-testid='datetime-end-input'
                            value={getDiscountDatetimeEnd}
                            onChange={(event) => setDiscountDatetimeEnd(event.target.value)}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>Corpo do anúncio</label>
                    <RichTextEditor
                        getContent={getHtmlText}
                        setContent={setHtmlText}
                    />
                </div>

                <Button 
                    type='submit'
                    data-testid='submit-button'
                    className={`${getIsFetching && 'is-fetching'}`}
                    disabled={getIsFetching}
                >
                    {getIsFetching
                        ? (
                            <Loader
                                type="TailSpin"
                                color="#0D2235"
                                height={30}
                                width={30}
                            />
                        )
                        : (
                            'Cadastrar'
                        )
                    }
                </Button>

                {(getHtmlText.length > 0) && (
                    <div className="preview">
                        <h2>Preview</h2>

                        <hr />

                        <div
                            className='html-text'
                            dangerouslySetInnerHTML={{ __html: getHtmlText }}
                        />

                        <hr />
                    </div>
                )}

            </form>

        </Container>
    );
}
