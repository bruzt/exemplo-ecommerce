/*eslint no-undef: "off"*/

const withImages = require('next-images');

module.exports = withImages({
    env: {
        SITE_DOMAIN: process.env.SITE_DOMAIN || 'http://localhost:3000',
        BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3001'
    },

    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./src/utils/generateSiteMap')
        }
    
        return config
    }
});
