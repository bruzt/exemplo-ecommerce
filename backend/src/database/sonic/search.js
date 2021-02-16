const { search } = require('./connection');

async function searchProductTitle(title, limit, offset){
    
    return await search.query('products', 'default', title, { lang: 'por', limit, offset });
}

module.exports = searchProductTitle;
