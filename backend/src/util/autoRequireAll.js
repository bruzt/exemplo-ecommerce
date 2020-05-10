const path = require('path');
const fs = require('fs');

/**
 * @param {string} sourcePath This folder location (__dirname)
 * @param {string} dirPath Path to the folder you want to require all .js files
 * @returns {Object<string, NodeRequire>} An object with all required files in dirPath, the key is the file name without '.js'
 */
function autoRequireAll(sourcePath, dirPath) {

    const requires = {};

    var normalizedPath = path.join(sourcePath, dirPath);

    fs.readdirSync(normalizedPath).forEach( (file) => {

        const filePath = `${normalizedPath}/` + file;

        if(fs.lstatSync(filePath).isFile()){ // verify if is a file, not a directory

            const fileName = file.split('.')[0] // remove .js
            
            requires[fileName] = require(filePath);
        }
    });

    return requires;
}

module.exports = autoRequireAll;