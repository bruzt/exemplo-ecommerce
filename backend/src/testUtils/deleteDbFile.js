const fs = require('fs');

function deleteDbFile(){

    fs.unlinkSync('./database.sqlite')
}

module.exports = deleteDbFile();