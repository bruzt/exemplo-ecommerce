import React from 'react';
import Head from 'next/head'
import { Resizable } from 're-resizable';
import { FaCaretRight } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Container, Menu, MainContainer } from './styles';

import Header from '../Header';
import Footer from '../Footer';
import ListProducts from '../productComponents/ListProducts';
import AddProduct from '../productComponents/AddProduct';
import CategoriesList from '../categoryComponents/ListCategories';
import AddCategory from '../categoryComponents/AddCategory';
import ListOrders from '../orderComponents/ListOrders';

export default function Main(){

    const router = useRouter();

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
                                <input type="checkbox" id='products-cb' defaultChecked={router.query.menu == "products-list"} /> 
                                <div className='cb-label'>
                                    <div className="icon">
                                        <FaCaretRight /> 
                                    </div>
                                    <label htmlFor="products-cb">Produtos</label>
                                </div>
                                
                                <ul>
                                    <li className={`${(router.query.menu == "products-list") ? 'active' : ''}`}>
                                        <Link href='/admin?menu=products-list'>
                                            <a>
                                                <span>Listar</span>
                                            </a>
                                        </Link>
                                    </li>

                                    <li className={`${(router.query.menu == 'add-product') ? 'active' : ''}`}>
                                        <Link href='/admin?menu=add-product'>
                                            <a>
                                                <span>Adicionar</span>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            <nav>
                                <input type="checkbox" id='categories-cb' defaultChecked={router.query.menu == 'categories-list'} /> 
                                <div className='cb-label' >
                                    <div className="icon">
                                        <FaCaretRight /> 
                                    </div>
                                    <label htmlFor="categories-cb">Categorias</label>
                                </div>
                                
                                <ul>
                                    <li className={`${(router.query.menu == 'categories-list') ? 'active' : ''}`}>
                                        <Link href='/admin?menu=categories-list'>
                                            <a>
                                                <span>Listar</span>
                                            </a>
                                        </Link>
                                    </li>
                                    <li className={`${(router.query.menu == 'add-category') ? 'active' : ''}`}>
                                        <Link href='/admin?menu=add-category'>
                                            <a>
                                                <span>Adicionar</span>
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>

                            <nav>
                                <input type="checkbox" id='orders-cb' defaultChecked={router.query.menu == 'orders-list'} /> 
                                <div className='cb-label' >
                                    <div className="icon">
                                        <FaCaretRight /> 
                                    </div>
                                    <label htmlFor="orders-cb">
                                        Ordens
                                    </label>
                                </div>
                                
                                <ul>
                                    <li className={`${(router.query.menu == 'orders-list') ? 'active' : ''}`}>
                                        <Link href='/admin?menu=orders-list'>
                                            <a>
                                                <span>Listar</span>
                                            </a>
                                        </Link>
                                    </li>
                                    {/*<li className={`${(router.query.menu == 'update-order') ? 'active' : ''}`}>
                                        <Link href='/admin?menu=update-order'>
                                            <a>
                                                <span>Atualizar</span>
                                            </a>
                                        </Link>
                                    </li>*/}
                                </ul>
                            </nav>
                            
                        </Resizable>
                    </div>
                    
                </Menu>

                <MainContainer>
                    <div id='content'>
                        {(router.query.menu == 'products-list') && <ListProducts />}

                        {(router.query.menu == 'add-product') && <AddProduct />}

                        {(router.query.menu == 'categories-list') && <CategoriesList />}

                        {(router.query.menu == 'add-category') && <AddCategory />}

                        {(router.query.menu == 'orders-list') && <ListOrders />}

                        {(router.query.menu == 'update-order') && <div>update-order</div>}
                    </div>
                </MainContainer>
            </Container>

            <Footer />
        </>
    );
}
