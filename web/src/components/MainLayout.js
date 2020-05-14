import React from 'react';

export default function MainLayout({ children }) {

  return (
      <>
        <main>
            {children}
        </main>

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
