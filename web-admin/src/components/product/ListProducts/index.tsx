import React, { useState, useEffect, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';

import { Container } from './styles';

import PencilIcon from '../../generic/icons/Pencil';
import TrashIcon from '../../generic/icons/TrashCan';

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

interface IFetchProducts {
    count: number;
    products: Products[];
}

export default function ListProducts(){

    const [getProducts, setProducts] = useState<Products[]>([]);

    const [getSeachBar, setSeachBar] = useState('');

    const router = useRouter();

    const _currentPage = Number(router.query.page) || 1;
    const _itemsPerPage = 15;
    const _page = `&offset=${(_currentPage - 1) * _itemsPerPage}&limit=${_itemsPerPage}`;  

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

    async function onSubmit(event: FormEvent) {
        
        event.preventDefault();

        try {

            let response: AxiosResponse<IFetchProducts>;

            if(getSeachBar.trim().length != 0){

                response = await api.get(`/products?title=${getSeachBar}${_page}`);

                setProducts(response.data.products);
            } 
            
        } catch (error) {
            console.log(error);
            alert('Erro ao filtrar produtos');
        }
    }

    return (
        <Container>
            
            <h1>Lista de produtos</h1>

            <form onSubmit={onSubmit}>
                <input type="text" value={getSeachBar} onChange={(event) => setSeachBar(event.target.value)} />
                <button type='submit'>
                    <FaSearch size={16} />
                </button>
            </form>

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
