const { ingest } = require('./connection');

async function ingestTitle(id, title) {

    await ingest.push('products', 'default', String(id), title, { lang: 'por' });
}

module.exports = ingestTitle;
