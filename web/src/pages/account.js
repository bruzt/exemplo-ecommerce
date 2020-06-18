import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PageLayout from '../components/PageLayout';
import AccountGeneral from '../components/AccountGeneral';
import AccountAddresses from '../components/AccountAddresses';
import AccountMyShopping from '../components/AccountMyShopping';

export default function Account() {

    const router = useRouter();

    return (
        <>
            <Head>
                <title>Minha Conta</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <section>

                    <div className="menu-content-grid">

                        <nav className="menu">
                            <a 
                                className={`menu-item ${(router.query.menu == 'account-data') ? 'active' : ''}`}
                                onClick={() => router.push({
                                    pathname: '/account',
                                    query: { menu: 'account-data' }
                                })}
                            >
                                Dados da conta
                            </a>
                            <a 
                                className={`menu-item ${(router.query.menu == 'addresses') ? 'active' : ''}`}
                                onClick={() => router.push({
                                    pathname: '/account',
                                    query: { menu: 'addresses' }
                                })}
                            >
                                Gerenciar Endereços
                            </a>
                            <a 
                                className={`menu-item ${(router.query.menu == 'my-shopping') ? 'active' : ''}`}
                                onClick={() => router.push({
                                    pathname: '/account',
                                    query: { menu: 'my-shopping' }
                                })}
                            >
                                Minhas compras
                            </a>
                        </nav>

                        <div className="content">
                            
                            {(router.query.menu == 'account-data') && <AccountGeneral />}
                            {(router.query.menu == 'addresses') && <AccountAddresses />}
                            {(router.query.menu == 'my-shopping') && <AccountMyShopping />}

                        </div>
                    </div>


                </section>

            </PageLayout>

            <style jsx>{`
                section {
                    min-height: 800px;
                    margin-top: 60px;
                }

                div.menu-content-grid {
                    display: grid;
                    grid-template-columns: 200px 1fr;
                    margin-top: 20px;
                }

                a.menu-item {
                    width: 100%;
                    height: 50px;
                    background: #0D2235;
                    cursor: pointer;
                    
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                a.menu-item:hover {
                    background: #16324C;
                }

                a.menu-item:active {
                    background: #0D2235;
                }

                a.menu-item.active {
                    background: #16324C;
                }

                a.menu-item + a.menu-item {
                    border-top: 1px solid #1C4061;
                }

                div.content {
                    padding: 0 10px;
                }
            `}</style>
        </>
    );
}