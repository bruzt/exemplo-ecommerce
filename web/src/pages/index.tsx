import React from 'react';

import api from '../services/api';

import HomePage from '../components/HomePage';

import { IProduct } from './[productId]';

//export async function getStaticProps() {
export async function getServerSideProps() {

    const onSale = await api.get('/products?section=on-sale&limit=8');
    const bestSellers = await api.get('/products?section=best-sellers&limit=8');
    const news = await api.get('/products?section=news&limit=8');

    return {
        props: { 
            onSale: onSale.data.products,
            bestSellers: bestSellers.data.products,
            news: news.data.products
        }
    }
}

interface IProps {
    onSale: IProduct[];
    bestSellers: IProduct[];
    news: IProduct[];
}

export default function Index({ onSale, bestSellers, news }: IProps) {

    return <HomePage onSale={onSale} bestSellers={bestSellers} news={news} />
}
