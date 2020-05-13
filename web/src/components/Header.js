import React from 'react';
import styled from 'styled-components';
import { FaShoppingBasket } from 'react-icons/fa';
import Link from 'next/link';

import GlobalStyle from '../GlobalStyle';

export default function Header() {
  
    return (
        <>
            <GlobalStyle />

            <Container>
                <div>
                    <Link href='/'>
                        <img 
                            src='http://qnimate.com/wp-content/uploads/2014/03/images2.jpg'
                            alt='logo' 
                        />
                    </Link>

                    <Link href='/order'>
                        <FaShoppingBasket className='icon' size={40} />
                    </Link>
                </div>
            </Container>
        </>
    );
}

const Container = styled.header`
    height: 100px;
    border-bottom: 1px solid black;

    div {
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
        margin: 55px 10px 0 0;
        cursor: pointer;
    }
`;