const withImages = require('next-images');

module.exports = withImages({
    env: {
        BACKEND_URL: 'http://192.168.1.10:3001'
    }
});