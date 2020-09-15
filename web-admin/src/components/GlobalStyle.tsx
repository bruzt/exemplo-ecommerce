import React from 'react';

const GlobalStyle: React.FC = () => {

    return (
        <style jsx global>{`

            :root {
                --background: #1C4061;
                --primary: #0D2235;
                --secondary: #16324C;
                --color: #eee;
                --warning: #EED202;
                --warning-active: #f0dc4d;
                --danger: #a32e39;
                --danger-active: #bf2232;
            }

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
                background: var(--background);
                color: var(--color);
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

export default GlobalStyle;