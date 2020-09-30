import React, { useState } from 'react';
import Head from 'next/head'
import { Resizable } from 're-resizable';
import { FaCaretRight } from 'react-icons/fa';

import ProductsList from '../ProductsList';
import AddProduct from '../AddProduct';
import CategoriesList from '../CategoriesList';
import AddCategory from '../AddCategory';

import { Container, Menu, MainContainer } from './styles';

type SelectedMenu = 
    "" |
    "products-list" |
    "add-products" |
    "categories-list" |
    "add-categories" |
    "orders-list" |
    "update-orders"
;

export default function Main(){

    const [getSelectedMenu, setSelectedMenu] = useState<SelectedMenu>('');

    return (
        <>
            <Head>
                <title>Exemplo e-commerce Admin page</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Container>

                <Menu>
                    <div className='resizable-box'>
                        <Resizable
                            defaultSize={{
                                width: 200,
                                height: '100%',
                            }}
                            /*size={{ 
                                width: 300, 
                                height: '100%'
                            }}*/
                            minWidth={50}
                            maxWidth={500}
                            style={{ 
                                transition: 'width 0.2s'
                            }}
                        >

                            <nav>
                                <input type="checkbox" id='products-cb' /> 
                                <div className='cb-label'>
                                    <div className="icon">
                                        <FaCaretRight /> 
                                    </div>
                                    <label htmlFor="products-cb">Produtos</label>
                                </div>
                                
                                <ul>
                                    <li
                                        className={`${(getSelectedMenu == "products-list") ? 'active' : ''}`} 
                                        onClick={() => setSelectedMenu("products-list")}
                                    >
                                        <span>Listar</span>
                                    </li>
                                    <li
                                        className={`${(getSelectedMenu == 'add-products') ? 'active' : ''}`} 
                                        onClick={() => setSelectedMenu('add-products')}        
                                    >
                                        <span>Adicionar</span>
                                    </li>
                                </ul>
                            </nav>

                            <nav>
                                <input type="checkbox" id='categories-cb' /> 
                                <div className='cb-label' >
                                    <div className="icon">
                                        <FaCaretRight /> 
                                    </div>
                                    <label htmlFor="categories-cb">Categorias</label>
                                </div>
                                
                                <ul>
                                    <li
                                        className={`${(getSelectedMenu == 'categories-list') ? 'active' : ''}`} 
                                        onClick={() => setSelectedMenu('categories-list')} 
                                    >
                                        <span>Listar</span>
                                    </li>
                                    <li
                                        className={`${(getSelectedMenu == 'add-categories') ? 'active' : ''}`} 
                                        onClick={() => setSelectedMenu('add-categories')} 
                                    >
                                        <span>Adicionar</span>
                                    </li>
                                </ul>
                            </nav>

                            <nav>
                                <input type="checkbox" id='orders-cb' /> 
                                <div className='cb-label' >
                                    <div className="icon">
                                        <FaCaretRight /> 
                                    </div>
                                    <label htmlFor="orders-cb">
                                        Ordens
                                    </label>
                                </div>
                                
                                <ul>
                                    <li
                                        className={`${(getSelectedMenu == 'orders-list') ? 'active' : ''}`} 
                                        onClick={() => setSelectedMenu('orders-list')} 
                                    >
                                        <span>Listar</span>
                                    </li>
                                    <li
                                        className={`${(getSelectedMenu == 'update-orders') ? 'active' : ''}`} 
                                        onClick={() => setSelectedMenu('update-orders')} 
                                    >
                                        <span>Atualizar</span>
                                    </li>
                                </ul>
                            </nav>
                            
                        </Resizable>
                    </div>
                    
                </Menu>

                <MainContainer>
                    <div id='content'>
                        {(getSelectedMenu == 'products-list') && <ProductsList />}

                        {(getSelectedMenu == 'add-products') && <AddProduct />}

                        {(getSelectedMenu == 'categories-list') && <CategoriesList />}

                        {(getSelectedMenu == 'add-categories') && <AddCategory />}

                        {(getSelectedMenu == 'orders-list') && <div>orders-list</div>}

                        {(getSelectedMenu == 'update-orders') && <div>update-orders</div>}
                    </div>
                </MainContainer>
            </Container>
        </>
    );
}
