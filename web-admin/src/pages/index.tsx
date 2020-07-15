import React from 'react';
import Head from 'next/head'
import { Resizable } from 're-resizable';
import { FaCaretRight } from 'react-icons/fa';

import GlobalStyle from '../components/GlobalStyle';

const Home: React.FC = () => {

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
                            <div className='cb-label' >
                                <div className="icon">
                                    <FaCaretRight /> 
                                </div>
                                <label htmlFor="products-cb">Produtos</label>
                            </div>
                            
                            <ul>
                                <li>
                                    <span>Listar</span>
                                </li>
                                <li>
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
                                <li>
                                    <span>Listar</span>
                                </li>
                                <li>
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
                                <li>
                                    <span>Listar</span>
                                </li>
                                <li>
                                    <span>Adicionar</span>
                                </li>
                            </ul>
                        </nav>
                        
                    </Resizable>
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

                div.resizable-box nav + nav, li {
                    border-top: 1px solid var(--secondary);
                }

                ul li {
                    background: var(--secondary);
                    border-top: 1px solid var(--background);
                }

            `}</style>
        </>
    );
}

export default Home;
