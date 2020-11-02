import React from 'react';
import { useRouter } from 'next/router';

import api from '../services/api';

import FallbackLoadingSpinner from '../components/FallbackLoadingSpinner';
import Product from '../components/productComponents/Product';
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
    quantity_stock: number;
    quantity_sold: number;
    discount_percent:   number;
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
    finalPrice: string;
}

interface IProps {
    product: IProduct
}

export async function getStaticPaths() {

    const response = await api.get('/products?section=best-sellers&limit=100');
    
    const paths = response.data.products.map( (data) => ({ 
        params: { 
            productId: String(data.id),
            //productName: data.title.split(' ').join('-')
        }}));
        
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }) {
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

        return <Product product={product} />;
    }
}
