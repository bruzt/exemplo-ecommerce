import React from 'react';

export default function Footer() {

    return (
        <>
            <footer>

                <p>Contruido por Bruno Zutim</p>

            </footer>

            <style jsx>{`
                footer {
                    height: 200px;
                    bottom: 0;
                    background: #0D2235;
                    color: #eee;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </>
    );
}
