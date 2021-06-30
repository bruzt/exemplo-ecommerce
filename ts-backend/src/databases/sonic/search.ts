import connection from './connection';

async function searchProduct(title: string, limit?: number, offset?: number){
    
    return await connection.search.query('products', 'default', title, { lang: 'por', limit, offset });
}

export default {
    searchProduct
}
