import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Container } from './styles';

import PencilIcon from '../Icons/Pencil';
import TrashIcon from '../Icons/TrashCan';

interface Products {
    id: number;
    title: string;
    price: number;
    discount_percent: number;
    quantity_stock: number;
    images: Array<{
        filename: string;
    }>
}

export default function ProductsList(){

    const [getProducts, setProducts] = useState<Products[]>([]);

     useEffect( () => {

        fetchProducts();

    }, []);

    async function fetchProducts(){

        try {

            const response = await api.get('/products');
            
            setProducts(response.data.products.sort( (prod1: Products, prod2: Products) => prod1.id > prod2.id ? -1 : 1));
            
        } catch (error) {
            console.log(error);
            alert('Não foi possivel obter os produtos, tente novamente');
        }
    }

    return (
        <Container>
            
            <h1>Lista de produtos</h1>

            <table>
                <thead>
                    <tr>
                        <th style={{ width: 50 }}>ID</th>
                        <th style={{ width: 100 }}>Imagem</th>
                        <th style={{ width: 500 }}>Nome</th>
                        <th style={{ width: 150 }}>Preço</th>
                        <th style={{ width: 100 }}>Desconto</th>
                        <th style={{ width: 100 }}>Estoque</th>
                        <th style={{ width: 100 }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {getProducts.map( (product, index) => (
                        <tr key={index}>
                            <td>{product.id}</td>
                            <td>
                                <div className="img-container">
                                    <img 
                                        src={(product.images.length > 0) ? 'http://localhost:3001/uploads/' + product.images[0].filename : ''} 
                                        alt={product.title}
                                    />
                                </div>
                            </td>
                            <td className='name'>{product.title}</td>
                            <td>R$ {product.price}</td>
                            <td>{product.discount_percent}</td>
                            <td>{product.quantity_stock}</td>
                            <td id='td-actions'>
                                <div>
                                    <button type='button'>
                                        <PencilIcon title='Editar' />
                                    </button>
                                    <button type='button'>
                                        <TrashIcon title='Excluir' />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </Container>
    );
}
