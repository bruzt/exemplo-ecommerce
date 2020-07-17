import React, { useState } from 'react';
import Head from 'next/head'
import { Resizable } from 're-resizable';
import { FaCaretRight } from 'react-icons/fa';

import GlobalStyle from '../components/GlobalStyle';
import ProductsList from '../components/ProductsList';

type SelectedMenu = 
    "" |
    "products-list" |
    "add-products" |
    "categories-list" |
    "add-categories" |
    "orders-list" |
    "update-orders";

const Home: React.FC = () => {

    const [getSelectedMenu, setSelectedMenu] = useState<SelectedMenu>('');

    return (
        <>
            <Head>
                <title>Exemplo e-commerce Admin page</title>
                <meta name="robots" content="noindex" />
            </Head>

            <GlobalStyle />

            <main>

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
                
                <div id='content'>
                    {(getSelectedMenu == 'products-list') && <ProductsList />}

                    {(getSelectedMenu == 'add-products') && <div>add-products</div>}

                    {(getSelectedMenu == 'categories-list') && <div>categories-list</div>}

                    {(getSelectedMenu == 'add-categories') && <div>add-categories</div>}

                    {(getSelectedMenu == 'orders-list') && <div>orders-list</div>}

                    {(getSelectedMenu == 'update-orders') && <div>update-orders</div>}
                </div>
                
            </main>

            <style jsx>{`
                main {
                    display: flex;
                    min-height: 800px;
                }

                div.resizable-box {
                    border-right: 2px solid var(--primary);
                    background: var(--secondary)
                }

                input[type=checkbox] {
                    display: none;
                }

                ul {
                    display: none;
                    position: relative;
                }

                li span {
                    position: relative;
                    left: 10px;
                }

                input[type=checkbox]:checked ~ ul {
                    display: block;
                }

                div.icon {
                    transition: transform .1s linear;
                }

                input[type=checkbox]:checked ~ div.cb-label div.icon {
                    transform: rotate(90deg);
                }

                div.cb-label, div.cb-label label, li {
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                    white-space: nowrap;
                    line-height: 30px;
                    font-size: 20px;
                    background: var(--primary);
                    color: var(--color);
                    padding: 5px;
                    cursor: pointer;
                }

                ul li.active {
                    background: var(--background);
                }

                div.resizable-box nav + nav, li {
                    border-top: 1px solid var(--secondary);
                }

                ul li {
                    background: var(--secondary);
                    border-top: 1px solid var(--background);
                }

                div#content {
                    width: 100%;
                }

            `}</style>
        </>
    );
}

export default Home;
