import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PageLayout from '../../PageLayout';
import AccountGeneral from '../AccountGeneral';
import AccountAddresses from '../AccountAddresses';
import AccountMyShoppings from '../AccountMyShoppings';

import { Container } from './styles';

export default function AccountMenu() {

    const router = useRouter();

    return (
        <>
            <Head>
                <title>Minha Conta</title>
                <meta name="robots" content="noindex" />
            </Head>

            <PageLayout>

                <Container>

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
                            {(router.query.menu == 'my-shopping') && <AccountMyShoppings />}

                        </div>
                    </div>

                </Container>

            </PageLayout>
        </>
    );
}
