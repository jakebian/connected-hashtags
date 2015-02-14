
// Utilities for writing files

module.exports = {
    write: write,
    getHashtagFileWriter: getHashtagFileWriter
};


var fs = require('fs');

function write(path, content) {
    fs.writeFile(path, content, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Finished writing to " + path);
        }
    });
}

function getHashtagFileWriter(hashTag) {
    function writer(result) {
        write(getFilePath(hashTag), JSON.stringify(result));
    }
    return writer;
}

function getFilePath(hashTag) {
    return './data/' + hashTag + '.json';
}

