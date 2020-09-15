import React, { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import api from '../services/api';

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

const ProductsList: React.FC = () => {

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
        <>
            <section>
                <h1>Lista de produtos</h1>

                <table>
                    <thead>
                        <tr>
                            <th style={{ width: 50}}>ID</th>
                            <th style={{ width: 100}}>Imagem</th>
                            <th style={{ width: 500}}>Nome</th>
                            <th style={{ width: 150}}>Preço</th>
                            <th style={{ width: 100}}>Desconto</th>
                            <th style={{ width: 100}}>Estoque</th>
                            <th style={{ width: 100}}>Ações</th>
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
                                            <FaPencilAlt fontSize={20} />
                                        </button>
                                        <button type='button'>
                                            <FaTrashAlt fontSize={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </section>

            <style jsx>{`
                section {
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                table {
                    margin-top: 20px;
                    font-size: 20px;
                    border-spacing: 0 5px;
                }

                table td {
                    text-align: center;
                    line-height: 50px;
                    background: var(--primary);
                }

                table td:first-child {
                    border-top-left-radius: 5px;
                    border-bottom-left-radius: 5px;
                }

                table td:last-child {
                    border-top-right-radius: 5px;
                    border-bottom-right-radius: 5px;
                }

                div.img-container {
                    width: 100px;
                    height: 50px;
                }

                div.img-container img {
                    width: auto;
                    height: auto;
                    max-width: 100px;
                    max-height: 50px;
                    overflow: hidden;
                }

                td.name {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

                td#td-actions {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                td#td-actions button {
                    height: 100%;
                    border: none;
                    padding: 2px;
                    cursor: pointer;    
                    border-radius: 2px;
                }

                td#td-actions button:nth-child(1) {
                    margin-right: 5px;
                    background: var(--warning);
                }

                td#td-actions button:nth-child(2) {
                    background: var(--danger);
                }

                td#td-actions button:nth-child(1):active {
                    background: var(--warning-active);
                }

                td#td-actions button:nth-child(2):active {
                    background: var(--danger-active);
                }
            `}</style>
        </>
    );
}

export default ProductsList;