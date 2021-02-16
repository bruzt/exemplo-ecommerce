const { ingest } = require('./connection');

async function ingestProduct(id, title) {
    
    await ingest.push('products', 'default', id, title, { lang: 'por' });
}

module.exports = {
    ingestProduct
};
