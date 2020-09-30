import React, { useState } from 'react';

import { Container } from './styles';

import Button from '../generic/Button';
import RichTextEditor from '../RichTextEditor';

export default function AddProduct(){

    const [getHtmlText, setHtmlText] = useState('');

    return (
        <Container>
            
            <form onSubmit={(event) => event.preventDefault()}>

                <div className="input-group">
                    <label htmlFor="product-title">Título</label>
                    <input type="text" id='product-title' />
                </div>

                <div className="input-group">
                    <label htmlFor="product-description">Descrição</label>
                    <textarea id="product-description" />
                </div>

                <div className='form-line'>
                    <div className="input-group">
                        <label htmlFor="product-price">Preço (R$)</label>
                        <input type="text" id='product-price' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-discount">Desconto (%)</label>
                        <input type="text" id='product-discount' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-stock">Qtd em Estoque</label>
                        <input type="text" id='product-stock' />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-tangible">Tangível</label>
                        <select id='product-tangible'>
                            <option value={1}>Sim</option>
                            <option value={0}>Não</option>
                        </select>
                    </div>
                </div>

                <div className='form-line'>

                    <div className="input-group">
                        <label htmlFor="product-weight">Peso (kg)</label>
                        <input type='text' id="product-weight" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-length">Comprimento (cm)</label>
                        <input type='text' id="product-length" />
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="product-height">Altura (cm)</label>
                        <input type='text' id="product-height" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="product-width">Largura (cm)</label>
                        <input type='text' id="product-width" />
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="editor">Corpo do anúncio</label>
                    <RichTextEditor setContent={setHtmlText} id='editor' />
                </div>

                <Button type='submit'>
                    Cadastrar
                </Button>

            </form>

            <div 
                className='html-text'
                dangerouslySetInnerHTML={{ __html: getHtmlText }} 
            />

        </Container>
    );
}
