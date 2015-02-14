
// Methods for interfacing with Twtitter

module.exports = {
    query: query
};


var TwitterService = require('./TwitterService');

function query(path, params, successCallback, errorCallback) {

    var client = TwitterService.getClient();

    client.get(path, params, function(error, result, response){
        if (error) {
            if (errorCallback) {
                errorCallback(error);
            }
            else {
                console.log(error);
            }
        }
        else {
            successCallback(result, response);
        }
    });

}

