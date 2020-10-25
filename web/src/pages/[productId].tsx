import React from 'react';

import api from '../services/api';

import Product from '../components/Product';

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
    images: Array<{
        id: number;
        url: string;
        filename: string;
    }>;
    category: {
        id: number;
        name: string;
        parent_id: number;
    }
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

    const response = await api.get<IProduct>(`/products/${params.productId}`);

    return {
        props: { product: response.data }
    }
}

export default function productId({ product }: IProps) {
    
    return <Product product={product} />
}
