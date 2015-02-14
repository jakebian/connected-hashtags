
// A singleton containing global twitter methods

module.exports = {
    getClient: getClient
};


var Twitter = require('twitter');
var TwitterConsts = require('./TwitterConsts');

var client;

function getClient() {
    if (!client) {
        client = newClient();
    }
    return client;
}

function newClient() {
    var client =
        new Twitter({
          consumer_key: TwitterConsts.CONSUMER_KEY,
          consumer_secret: TwitterConsts.CONSUMER_SECERET,
          access_token_key: TwitterConsts.ACCESS_TOKEN_KEY,
          access_token_secret: TwitterConsts.ACCESS_TOKEN_SECERET
        });

    return client;
}