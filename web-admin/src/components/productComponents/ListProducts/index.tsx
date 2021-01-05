import React, { useState, useEffect, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';

import { Container } from './styles';

import PencilIcon from '../../genericComponents/icons/Pencil';
import TrashIcon from '../../genericComponents/icons/TrashCan';
import PaginationNav from '../../PaginationNav';
import UpdateProduct from '../UpdateProduct';

import { ICategory } from '../AddProduct';

export interface IProduct {
    id: number;
    title: string;
    description: string;
    price: string;
    finalPrice: string;
    discount_percent: number;
    discount_datetime_start: string;
    discount_datetime_end: string;
    isOnSale: boolean;
    quantity_stock: number;
    category: ICategory;
    tangible: boolean;
    weight: string;
    length: string;
    height: string;
    width: string;
    html_body: string;
    images: Array<{
        id: number;
        filename: string;
    }>
}

interface IFetchProducts {
    count: number;
    products: IProduct[];
}

export default function ListProducts(){

    const [getProducts, setProducts] = useState<IProduct[]>([]);

    const [getSeachBar, setSeachBar] = useState('');

    const [getTotalPages, setTotalPages] = useState(1);


    const [getUpdeting, setUpdeting] = useState(false);
    const [getUpdetingProduct, setUpdetingProduct] = useState<IProduct>({} as IProduct);

    const router = useRouter();

    const _currentPage = Number(router.query.page) || 1;
    const _itemsPerPage = 15;
    const _page = `offset=${(_currentPage - 1) * _itemsPerPage}&limit=${_itemsPerPage}`;  

     useEffect( () => {

        if(getUpdeting == false) fetchProducts();

    }, [_currentPage, getUpdeting]);

    async function fetchProducts(){

        try {

            let response: AxiosResponse<IFetchProducts>;

            // Se for um numero procura pelo id
            if (Number(getSeachBar.trim())){

                const res: AxiosResponse<IProduct> = await api.get(`/products/${getSeachBar.trim()}`);

                response = {
                    ...res,
                    data: {
                        count: 1,
                        products: [res.data]
                    }
                };

            } else if(getSeachBar.trim().length != 0){

                response = await api.get(`/products?title=${getSeachBar}&${_page}`);

            } else {
                
                response = await api.get(`/products?${_page}&filter=id`);
            }

            //const sortedProductsById = response.data.products.sort( (prod1: Products, prod2: Products) => prod1.id > prod2.id ? -1 : 1);
            
            //setProducts(sortedProductsById);

            const totalPages = (response.data.products.length < _itemsPerPage && _currentPage == 1)
                    ? 1
                    : Math.ceil(response.data.count/_itemsPerPage);

            setTotalPages(totalPages);
            setProducts(response.data.products);
            
        } catch (error) {
            console.log(error);
            alert('Não foi possivel obter os produtos, tente novamente');
        }
    }

    async function onSubmit(event: FormEvent) {
        
        event.preventDefault();

        fetchProducts();
    }

    function handlePagination(value: number){

        router.push({
            pathname: '/admin',
            query: {
                ...router.query,
                page: value
            }
        });
    }

    function handleUpdateModal(product: IProduct){

        setUpdeting(true);
        setUpdetingProduct(product);
    }

    async function handleDeleteProduct(id: number) {
        if(confirm('Tem certeza que deseja deletar esse produto?')){
            try {

                await api.delete(`/products/${id}`);

                fetchProducts();

            } catch (error) {
                console.log(error);
                alert('Erro ao deletar produto');
            }
        }            
    }

    return (
        <Container>

            {getUpdeting && <UpdateProduct product={getUpdetingProduct} setUpdeting={setUpdeting} />}
            
            <h2>Lista de produtos</h2>

            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    value={getSeachBar} 
                    onChange={(event) => setSeachBar(event.target.value)} 
                    placeholder='Nome ou ID do produto'
                />
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
                        <th style={{ width: 100 }}>Desconto</th>
                        <th style={{ width: 150 }}>Preço</th>
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
                            <td>{product.isOnSale ? product.discount_percent + '%' : '-'}</td>
                            <td>R$ {product.finalPrice}</td>
                            <td>{product.quantity_stock}</td>
                            <td id='td-actions'>
                                <div>
                                    <button type='button' onClick={() => handleUpdateModal(product)}>
                                        <PencilIcon title='Editar' />
                                    </button>
                                    <button type='button' onClick={() => handleDeleteProduct(product.id)}>
                                        <TrashIcon title='Excluir' />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {getTotalPages > 1 && (
                <PaginationNav
                    totalPages={getTotalPages}
                    currentPage={_currentPage}
                    limitPageNav={5}
                    handlePagination={handlePagination}
                />
            )}

        </Container>
    );
}
