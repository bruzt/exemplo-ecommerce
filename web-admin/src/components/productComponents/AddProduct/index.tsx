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

export default function AddProduct() {

    const [getCategories, setCategories] = useState<ICategory[]>([]);

    const [getTitle, setTitle] = useState('');
    const [getFiles, setFiles] = useState<File[]>([]);
    const [getDescription, setDescription] = useState('');

    const [getPrice, setPrice] = useState('');
    const [getQtdStock, setQtdStock] = useState('0');
    const [getCategory, setCategory] = useState('0');
    const [getTangible, setTangible] = useState(1);
    
    const [getWeight, setWeight] = useState('');
    const [getLength, setLength] = useState('');
    const [getHeight, setHeight] = useState('');
    const [getWidth, setWidth] = useState('');

    const [getDiscount, setDiscount] = useState('0');
    const [getDiscountDatetimeStart, setDiscountDatetimeStart] = useState<string | null>(null);
    const [getDiscountDatetimeEnd, setDiscountDatetimeEnd] = useState<string | null>(null);

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
        if (getWeight.trim().length == 0) return alert('Peso não preenchido');
        if (getLength.trim().length == 0) return alert('Comprimento não preenchido');
        if (getHeight.trim().length == 0) return alert('Altura não preenchido');
        if (getWidth.trim().length == 0) return alert('Largura não preenchido');

        const product = {
            title: getTitle,
            description: getDescription,
            price: Number(getPrice),
            quantity_stock: Number(getQtdStock),
            category_id: Number(getCategory),
            tangible: Boolean(Number(getTangible)),
            weight: Number(getWeight.replace(',', '.')),
            length: Number(getLength.replace(',', '.')),
            height: Number(getHeight.replace(',', '.')),
            width: Number(getWidth.replace(',', '.')),
            discount_percent: Number(getDiscount),
            discount_datetime_start: getDiscountDatetimeStart ? getDiscountDatetimeStart : undefined,
            discount_datetime_end: getDiscountDatetimeEnd ? getDiscountDatetimeEnd : undefined,
            html_body: getHtmlText.trim().length > 0 ? String(getHtmlText) : undefined
        }

        try {
            setIsFetching(true);
            const response = await api.post('/products', product);

            if (getFiles.length > 0) {

                const data = new FormData();

                getFiles.forEach((file) => data.append('file', file, file.name));

                await api.post(`/products/${response.data.id}/images`, data);
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
            setWeight('');
            setLength('');
            setHeight('');
            setWidth('');
            setHtmlText('');

        } catch (error) {
            console.log(error);
            alert('Erro ao cadastrar produto');
        }
    }

    return (
        <Container>

            <h2>Adicionar produto</h2>

            <form onSubmit={onSubmit}>

                <div className="input-group">
                    <label htmlFor="product-title">Título</label>
                    <input
                        type="text"
                        id='product-title'
                        value={getTitle}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>

                <AddImageInput getFiles={getFiles} setFiles={setFiles} />

                <div className="input-group">
                    <label htmlFor="product-description">Descrição</label>
                    <textarea
                        id="product-description"
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
                            min="0.00"
                            step="0.01"
                            id='product-price'
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
                            value={getQtdStock}
                            onChange={(event) => setQtdStock(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-category">Categoria</label>
                        <select
                            id='product-category'
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
                            min="0.00"
                            step="0.01"
                            id="product-weight"
                            value={getWeight}
                            onChange={(event) => setWeight(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-length">Comprimento (cm)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            id="product-length"
                            value={getLength}
                            onChange={(event) => setLength(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-height">Altura (cm)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            id="product-height"
                            value={getHeight} onChange={(event) => setHeight(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-width">Largura (cm)</label>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            id="product-width"
                            value={getWidth}
                            onChange={(event) => setWidth(event.target.value)}
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
                            value={getDiscount}
                            onChange={(event) => setDiscount(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="datetime-start">Início do desconto</label>
                        <input
                            type="datetime-local"
                            value={getDiscountDatetimeStart}
                            onChange={(event) => setDiscountDatetimeStart(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="datetime-start">Fim do desconto</label>
                        <input
                            type="datetime-local"
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
