import React from 'react';

const ProductsList: React.FC = () => {

    return (
        <>
            <section>
                <h1>Lista de produtos</h1>

                <table>
                    <thead>
                        <tr>
                            <th style={{ width: 50}}>ID</th>
                            <th style={{ width: 100}}>Imagem</th>
                            <th style={{ width: 500}}>Nome</th>
                            <th style={{ width: 200}}>Preço</th>
                            <th style={{ width: 200}}>Desconto</th>
                            <th style={{ width: 200}}>Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                <div className="img-container">
                                    <img 
                                        src="https://upload.wikimedia.org/wikipedia/en/thumb/6/63/IMG_%28business%29.svg/1280px-IMG_%28business%29.svg.png" 
                                        alt="lala"
                                    />
                                </div>
                            </td>
                            <td className='name'>Processador AMD Ryzen 5 3600 3.6Ghz turbo 4.2Ghz AM4 DDR4</td>
                            <td>R$ 1400,00</td>
                            <td>-</td>
                            <td>5</td>
                        </tr>
                    </tbody>
                </table>

            </section>

            <style jsx>{`
                section {
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                table {
                    margin-top: 20px;
                    font-size: 20px;
                }

                table td {
                    text-align: center;
                    line-height: 50px;
                }

                div.img-container {
                    width: 100px;
                    height: 50px;
                }

                div.img-container img {
                    width: auto;
                    height: auto;
                    max-width: 100px;
                    max-height: 50px;
                }

                td.name {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                }

            `}</style>
        </>
    );
}

export default ProductsList;