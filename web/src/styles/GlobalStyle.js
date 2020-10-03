import React from 'react';

export default function GlobalStyle() {

    return (
        <style jsx global>{`
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
                background: #1C4061;
                color: #eee;
                font-family: Arial, Helvetica, sans-serif;
            }

            a {
                text-decoration: none;
                color: inherit;
            }

            input, select {
                background: #eee;
            }

            /*ul {
                list-style: none;
            }*/
        `}</style>
    );
}
