import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

export default function Header() {
  
    return (
        <>
            <style global jsx>{`
                * {
                    margin: 0;
                    padding: 0;
                    outline: 0;
                    box-sizing: border-box;
                }
            
                html, body {
                    height: 100%;
                }
            
                body {
                    background: #99a19b;
                    font-family: Arial, Helvetica, sans-serif;
                }
            
                a {
                    text-decoration: none;
                    color: inherit;
                }
            `}</style>

            <header>
                <div className='limit-center'>
                    <Link href='/'>
                        <img 
                            src='http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
                            alt='logo' 
                            title='Home'
                        />
                    </Link>

                    <div className='icon' title='Carrinho de compras'>
                        <Link href='/order'>
                            <div>
                                <FaShoppingCart size={40} />
                                <p>Carrinho</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            <style jsx>{`
                header {
                    height: 100px;
                    border-bottom: 1px solid black;
                }

                .limit-center {
                    width: 100%;
                    max-width: 1300px;
                    margin: 0 auto;

                    display: flex;
                    justify-content: space-between;
                }

                img {
                    max-width: 100%;
                    height: 90px;
                    align-self: center;
                    cursor: pointer;
                }

                .icon {
                    /*float: right;*/
                    margin: 35px 10px 0 0;
                    cursor: pointer;
                    text-align: center;
                }
            
            `}</style>
        </>
    );
}
