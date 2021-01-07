const pagarme = require('pagarme');

/**
 * @returns {Promise} client
 */
module.exports = function pagarMeClient() {
    
    return pagarme.client.connect({ api_key: process.env.PAGARME_API_KEY });
}
