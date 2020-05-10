const fs = require('fs');

function deleteDbFile(){

    fs.unlinkSync('./_tests/database.sqlite')
}

module.exports = deleteDbFile();