import React from 'react';
import { GetStaticProps } from 'next';

import api from '../services/api';

import HomePage from '../components/HomePage';

import { IProduct } from './[productId]';

interface IProps {
    onSale: IProduct[];
    bestSellers: IProduct[];
    news: IProduct[];
}

export const getStaticProps: GetStaticProps = async () => {

    let onSale;
    let bestSellers;
    let news;

    try {
        onSale = await api.get('/products?section=on-sale&limit=8');
    } catch (error) {
        onSale = { data: { products: [] }};
    }

    try {
        bestSellers = await api.get('/products?section=best-sellers&limit=8');
    } catch (error) {
        bestSellers = { data: { products: [] }};
    }

    try {
        news = await api.get('/products?section=news&limit=8');
    } catch (error) {
        news = { data: { products: [] }};
    }

    return {
        props: { 
            onSale: onSale.data.products,
            bestSellers: bestSellers.data.products,
            news: news.data.products
        }, 
        revalidate: 1 * 60 * 60, // 1 hora
    }
}

export default function Index({ onSale, bestSellers, news }: IProps) {

    return <HomePage onSale={onSale} bestSellers={bestSellers} news={news} />
}
