import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { Resizable } from 're-resizable';
import { FaCaretRight } from 'react-icons/fa';
import { useRouter } from 'next/router';

import api from '../../services/api';

import { Container, Menu, MainContainer } from './styles';

import Header from '../Header';
import Footer from '../Footer';
import ListProducts from '../product/ListProducts';
import AddProduct from '../product/AddProduct';
import CategoriesList from '../category/ListCategories';
import AddCategory from '../category/AddCategory';

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

    const router = useRouter()

    useEffect( () => {
        if(!api.defaults.headers.authorization) router.replace('/');
    }, []);

    return (
        <>
            <Head>
                <title>Exemplo e-commerce Admin page</title>
                <meta name="robots" content="noindex" />
            </Head>

            <Header />

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
                        {(getSelectedMenu == 'products-list') && <ListProducts />}

                        {(getSelectedMenu == 'add-products') && <AddProduct />}

                        {(getSelectedMenu == 'categories-list') && <CategoriesList />}

                        {(getSelectedMenu == 'add-categories') && <AddCategory />}

                        {(getSelectedMenu == 'orders-list') && <div>orders-list</div>}

                        {(getSelectedMenu == 'update-orders') && <div>update-orders</div>}
                    </div>
                </MainContainer>
            </Container>

            <Footer />
        </>
    );
}
