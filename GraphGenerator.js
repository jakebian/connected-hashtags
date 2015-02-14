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
    // console.log(this.globals);
    var formattedHashtag = hashTag.toLowerCase();
    this.globals.completed = this.globals.completed.concat(hashTag);
    TwitterClient.query(

            'search/tweets', 

            TwitterUtil.getHashtagQuery(formattedHashtag), 

            this.getResultHandler
                (
                    formattedHashtag, 
                    levelsRemaining, 
                    breadth
                )
        );
}

function getResultHandler(hashTag, levelsRemaining, breadth) {
    var completed = this.globals.completed;
    var generator = this;

    function handler(result) {
        QueryResultUtil.writeToFile(hashTag, result);
        if (levelsRemaining > 0) {
            var nextTags = QueryResultUtil.getNextHashtags(result, completed, breadth);
            console.log(nextTags);
            nextTags.forEach(function (nextTag) {
                generator.loadTweets(
                    nextTag, 
                    levelsRemaining - 1,
                    breadth
                );
            });
        }
    }
    return handler;
}

