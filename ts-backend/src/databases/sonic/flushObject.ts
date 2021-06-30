import connection from './connection';

async function flushProduct(id: number){

    await connection.ingest.flusho('products', 'default', String(id));
}

export default {
    flushProduct
}
