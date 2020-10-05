import React, { FormEvent, useEffect, useState } from 'react';

import api from '../../../services/api';

import { Container } from './styles';

import Button from '../../generic/Button';
import RichTextEditor from '../../RichTextEditor';

export default function AddProduct() {

    const [getCategories, setCategories] = useState([]);

    const [getTitle, setTitle] = useState('');
    const [getFiles, setFiles] = useState<File[]>([]);
    const [getDescription, setDescription] = useState('');

    const [getPrice, setPrice] = useState('');
    const [getDiscount, setDiscount] = useState('0');
    const [getQtdStock, setQtdStock] = useState('0');
    const [getCategory, setCategory] = useState('0');
    const [getTangible, setTangible] = useState(1);

    const [getWeight, setWeight] = useState('');
    const [getLength, setLength] = useState('');
    const [getHeight, setHeight] = useState('');
    const [getWidth, setWidth] = useState('');

    const [getHtmlText, setHtmlText] = useState('');

    let inputElement: HTMLInputElement;

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

    function handleFilesInput(event: FormEvent<HTMLInputElement>) {

        const files = Array.from(event.currentTarget.files);

        if (files.length > 0) {

            const concatFiles = [...getFiles, ...files];

            const uniqueFiles = concatFiles.map( (file) => file['name'])
                .map( (name, index, final) => final.indexOf(name) === index && index)
                .filter( (index) => concatFiles[index])
                .map( (file) => concatFiles[file])
            ;

            setFiles(uniqueFiles);
        }
    }

    function handleRemoveFile(name: string) {

        const files = getFiles.filter((file) => file.name != name);

        setFiles(files);
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
            discount_percent: Number(getDiscount),
            category_id: Number(getCategory),
            tangible: Boolean(Number(getTangible)),
            weight: String(getWeight).replace('.', ','),
            length: Number(getLength),
            height: Number(getHeight),
            width: Number(getWidth),
            html_body: getHtmlText.trim().length > 0 ? String(getHtmlText) : undefined
        }

        try {

            const response = await api.post('/products', product);

            if (getFiles.length > 0) {

                const data = new FormData();

                getFiles.forEach((file) => data.append('file', file, file.name));

                await api.post(`/products/${response.data.id}/images`, data);
            }

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

                <div className="input-group">
                    <label htmlFor="file-input">Imagens</label>
                    <button type='button' id='file-input' onClick={() => inputElement.click()}>
                        Selecione as imagens
                    </button>
                    <input
                        ref={(element) => inputElement = element}
                        type='file'
                        accept="image/png,image/gif,image/jpeg"
                        multiple
                        onChange={handleFilesInput}
                    />
                    {getFiles.length > 0 && <br />}
                    {getFiles.map((file, index) => (
                        <p key={index}>
                            {file.name}
                            <button
                                type='button'
                                className='remove-file'
                                onClick={() => handleRemoveFile(file.name)}
                            >
                                X
                            </button>
                        </p>
                    ))}
                </div>

                <div className="input-group">
                    <label htmlFor="product-description">Descrição</label>
                    <textarea
                        id="product-description"
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
                        <label htmlFor="product-stock">Qtd em Estoque</label>
                        <input
                            type="number"
                            min="0" id='product-stock'
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
                                <option key={index} value={category.id}>{category.name}</option>
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
                            id="product-height"
                            value={getHeight} onChange={(event) => setHeight(event.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-width">Largura (cm)</label>
                        <input
                            type="number"
                            min="0"
                            id="product-width"
                            value={getWidth}
                            onChange={(event) => setWidth(event.target.value)}
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

                <Button type='submit'>
                    Cadastrar
                </Button>

            </form>

            {(getHtmlText.length > 0) && (
                <div className="preview">
                    <h2>Preview</h2>
                    <div
                        className='html-text'
                        dangerouslySetInnerHTML={{ __html: getHtmlText }}
                    />
                </div>
            )}

        </Container>
    );
}
