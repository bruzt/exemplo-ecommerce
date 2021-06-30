import connection from './connection';

async function ingestProduct(id: number, title: string) {
    
    await connection.ingest.push('products', 'default', String(id), title, { lang: 'por' });
}

export default {
    ingestProduct
}
