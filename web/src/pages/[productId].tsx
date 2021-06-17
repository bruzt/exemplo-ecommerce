import React, { useState, useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import api from '../services/api';

import FallbackLoadingSpinner from '../components/FallbackLoadingSpinner';
import ProductPage from '../components/productComponents/ProductPage';
import Page404 from '../components/Page404';

export interface IImage {
    id: number;
    url: string;
    filename: string;
}

export interface IProduct {
    id: number;
    title: string;
    description: string;
    html_body: string;
    price: string;
    finalPrice: string;
    quantity_stock: number;
    quantity_sold: number;
    discount_percent: number;
    discount_datetime_start: string;
    discount_datetime_end: string;
    isOnSale: boolean;
    dateNow: string;
    tangible: boolean;
    weight: string;
    length: string;
    height: string;
    width: string;
    createdAt: string;
    images: IImage[];
    category: {
        id: number;
        name: string;
        parent_id: number;
    };
}

interface IProps {
    product: IProduct
}

export const getStaticPaths: GetStaticPaths = async () => {

    const response = await api.get('/products?section=best-sellers&limit=100');
    
    const paths = response.data.products.map( (data: IProduct) => ({ 
        params: { 
            productId: String(data.id),
        }}));
        
    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        
        const response = await api.get<IProduct>(`/products/${params.productId}`);
    
        return {
            props: { product: response.data }
        };

    } catch (error) {
        return {
            props: { product: false }
        };
    }
}

export default function productId({ product }: IProps) {

    const router = useRouter();

    if(router.isFallback){

        return <FallbackLoadingSpinner />

    } else if(!product){

        return <Page404 />;

    } else {

        return <ProductPage product={product} />;
    }
}
