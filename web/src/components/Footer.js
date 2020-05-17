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
                    border-top: 1px solid black;
                    bottom: 0;
                    background: #60615b;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            `}</style>
        </>
    );
}
