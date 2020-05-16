import React from 'react';

import Header from './Header';
import Footer from './Footer';

export default function PageLayout({ children }) {

    return (
        <>
            <Header />

            <main>
                {children}
            </main>

            <Footer />

            <style jsx>{`
                main {
                    width: 100%;
                    max-width: 1300px;
                    margin: 0 auto;
                    border-right: 1px solid black;
                    border-left: 1px solid black;
                }
            `}</style>
        </>
    );
}