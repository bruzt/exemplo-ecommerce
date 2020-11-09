import React from 'react';

import { Container } from './styles';

import Header from '../headerComponents/Header';
import Footer from '../Footer';

interface IProps {
	children: React.ReactNode;
}

export default function PageLayout({ children }: IProps) {
	
	return (
        <>
            <Header />

            <Container>
                {children}
            </Container>

            <Footer />
        </>
    );
}
