const fs = require('fs');
const path = require('path');

function deleteDbFile(){

    fs.unlinkSync(path.resolve(__dirname, '..', '..', './database.sqlite'))
}

module.exports = deleteDbFile();