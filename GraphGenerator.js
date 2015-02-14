module.exports = function () {
    this.globals = {};
    this.loadTweets = loadTweets;
    this.loadTweetsGraph = loadTweetsGraph;
    this.getResultHandler = getResultHandler;
}

var TwitterUtil = require('./util/TwitterUtil');
var QueryResultUtil = require('./util/QueryResultUtil');
var TwitterClient = require('./twitter/TwitterClient');

function loadTweetsGraph(startTag, depth, breadth) {
    this.globals.completed = [];
    this.loadTweets(startTag, depth, breadth);
}

function loadTweets(hashTag, levelsRemaining, breadth) {
    var formattedHashtag = hashTag.toLowerCase();
    var resultHandler = this.getResultHandler(formattedHashtag, levelsRemaining, breadth);
    var query = TwitterUtil.getHashtagQuery(formattedHashtag);

    this.globals.completed = this.globals.completed.concat(formattedHashtag);

    TwitterClient.query('search/tweets', query, resultHandler);
}

function getResultHandler(hashTag, levelsRemaining, breadth) {
    var generator = this;

    return handler;

    function handler(result) {
        QueryResultUtil.writeToFile(hashTag, result);
        if (levelsRemaining > 0) {
            var nextTags = QueryResultUtil.getNextHashtags(result, generator.globals.completed, breadth);
            nextTags.forEach(loadNextTweets);
        }
    }

    function loadNextTweets(nextTag) {
        generator.loadTweets(
            nextTag, 
            levelsRemaining - 1,
            breadth
        );
    }
}

