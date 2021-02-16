const { ingest } = require('./connection');

async function ingestProductTitle(id, title) {
    
    await ingest.push('products', 'default', id, title, { lang: 'por' });
}

module.exports = ingestProductTitle;
