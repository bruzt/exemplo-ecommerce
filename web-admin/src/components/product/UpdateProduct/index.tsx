import React, { FormEvent, useState } from 'react';

import { Container } from './styles';

import { IProduct } from '../ListProducts';

import Button from '../../generic/Button';
import AddImageInput from '../AddImageInput';
import ImagesGrid from '../ImagesGrid';

interface IProps {
    product: IProduct;
    setUpdeting: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateProduct({ product, setUpdeting }: IProps) {

    const [getTitle, setTitle] = useState(product.title);
    const [getFiles, setFiles] = useState<File[]>([]);
    const [getDescription, setDescription] = useState(product.description);

    async function onSubmit(event: FormEvent) {

        event.preventDefault();

        try {
            
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
                    <textarea id='product-description' value={getDescription} onChange={(event) => setDescription(event.target.value)} />
                </div>

                <Button type='submit'>
                    Atualizar
                </Button>
            </form>


        </Container>
    );
}
