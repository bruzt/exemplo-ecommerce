/*eslint no-undef: "off"*/

const withImages = require('next-images');
const withPWA = require('next-pwa');

const nextConfig = {
    env: {
        SITE_DOMAIN: process.env.SITE_DOMAIN || 'http://localhost:3000',
        BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3001'
    },

    pwa: {
        dest: 'public'
    },

    webpack: (config, { isServer }) => {
        if (isServer) {
            require('./src/utils/generateSiteMap')
        }

        return config
    }
};

module.exports = withPWA(withImages(nextConfig));
