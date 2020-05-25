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
                    max-width: 1100px;
                    margin: 0 auto;
                }
            `}</style>
        </>
    );
}