const { ingest } = require('./connection');

async function flushProduct(id){

    await ingest.flusho('products', 'default', id);
}

module.exports = {
    flushProduct
};
