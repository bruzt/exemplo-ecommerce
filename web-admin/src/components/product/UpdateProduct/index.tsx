import React, { FormEvent, useEffect, useState } from 'react';

import api from '../../../services/api';

import { Container } from './styles';

import Button from '../../generic/Button';
import AddImageInput from '../AddImageInput';
import ImagesGrid from '../ImagesGrid';
import RichTextEditor from '../../RichTextEditor';

import { IProduct } from '../ListProducts';
import { ICategory } from '../AddProduct';

interface IProps {
    product: IProduct;
    setUpdeting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateProduct({ product, setUpdeting }: IProps) {

    const [getCategories, setCategories] = useState<ICategory[]>([]);

    const [getTitle, setTitle] = useState(product.title);
    const [getFiles, setFiles] = useState<File[]>([]);
    const [getDescription, setDescription] = useState(product.description);

    const [getPrice, setPrice] = useState(String(product.price));
    const [getDiscount, setDiscount] = useState(String(product.discount_percent));
    const [getQtdStock, setQtdStock] = useState(String(product.quantity_stock));
    const [getCategoryId, setCategoryId] = useState(String(product.category.id));
    const [getTangible, setTangible] = useState((product.tangible) ? "1" : "0");

    const [getWeight, setWeight] = useState(product.weight.replace(',', '.'));
    const [getLength, setLength] = useState(product.length);
    const [getHeight, setHeight] = useState(product.height);
    const [getWidth, setWidth] = useState(product.width);

    const [getHtmlBody, setHtmlBody] = useState(product.html_body);
    
    useEffect( () => {
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
        if (getCategoryId == '0') return alert('Categoria não selecionada');
        if (getWeight.trim().length == 0) return alert('Peso não preenchido');
        if (getLength.trim().length == 0) return alert('Comprimento não preenchido');
        if (getHeight.trim().length == 0) return alert('Altura não preenchido');
        if (getWidth.trim().length == 0) return alert('Largura não preenchido');

        const data = {
            title: getTitle,
            description: getDescription,
            price: Number(getPrice),
            quantity_stock: Number(getQtdStock),
            discount_percent: Number(getDiscount),
            category_id: Number(getCategoryId),
            tangible: Boolean(Number(getTangible)),
            weight: getWeight.replace('.', ','),
            length: Number(getLength),
            height: Number(getHeight),
            width: Number(getWidth),
            html_body: getHtmlBody.trim().length > 0 ? getHtmlBody : undefined
        };

        try {

            await api.put(`/products/${product.id}`, data);

            if(getFiles.length > 0){

                const files = new FormData();

                getFiles.forEach( (file) => files.append('file', file, file.name));

                await api.post(`/products/${product.id}/images`, files);
            }

            alert('Produto atualizado com sucesso');

            setUpdeting(false);
            
        } catch (error) {
            console.log(error);
            alert('Erro ao atualizar produto');
        }
    }

    return (
        <Container>
            
            <form onSubmit={onSubmit}>

                <header>
                    <button type='button' onClick={() => setUpdeting(false)}>X</button>
                </header>

                <ImagesGrid product={product} />

                <div className="input-group">
                    <label htmlFor="product-title">Título</label>
                    <input type="text" id='product-title' value={getTitle} onChange={(event) => setTitle(event.target.value)} />
                </div>

                <AddImageInput getFiles={getFiles} setFiles={setFiles} />

                <div className="input-group">
                    <label htmlFor="product-description">Descrição</label>
                    <textarea 
                        id='product-description' 
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
                        <label htmlFor="product-stock">Qtd estoque</label>
                        <input 
                            type="number" 
                            min='0'
                            id='product-stock' 
                            value={getQtdStock} 
                            onChange={(event) => setQtdStock(event.target.value)} 
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-category">Categoria</label>
                        <select id="product-category" value={getCategoryId} onChange={(event) => setCategoryId(event.target.value)}>
                            <option value="0"></option>
                            {getCategories.map( (category, index) => (
                                <option key={index} value={`${category.id}`}>{category.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group product-tangible-group">
                        <label htmlFor="product-tangible">Tangível</label>
                        <select id="product-tangible" value={getTangible} onChange={(event) => setTangible(event.target.value)}>
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
                            min="0.00"
                            step="0.01"
                            id='product-weight' 
                            value={getWeight} 
                            onChange={(event) => setWeight(event.target.value)} 
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-length">Comprimento (cm)</label>
                        <input 
                            type="number" 
                            min='0'
                            id='product-length' 
                            value={getLength} 
                            onChange={(event) => setLength(event.target.value)} 
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-height">Altura (cm)</label>
                        <input 
                            type="number" 
                            min='0'
                            id='product-height' 
                            value={getHeight} 
                            onChange={(event) => setHeight(event.target.value)} 
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-width">Largura (cm)</label>
                        <input 
                            type="number" 
                            min='0'
                            id='product-width' 
                            value={getWidth} 
                            onChange={(event) => setWidth(event.target.value)} 
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label>Corpo do anúncio</label>
                    <RichTextEditor
                        getContent={getHtmlBody}
                        setContent={setHtmlBody}
                    />
                </div>

                <Button type='submit'>
                    Atualizar
                </Button>
            </form>

            <div className="preview">
                <h2>Preview</h2>

                <div className="preview-content" dangerouslySetInnerHTML={{ __html: getHtmlBody }} />

            </div>

        </Container>
    );
}
