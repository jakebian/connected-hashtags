module.exports = {
    writeToFile: writeToFile,
    getNextHashtags: getNextHashtags,
    chooseNextHashtag: chooseNextHashtag
};

var FileWriter = require('./FileWriter');
var GraphExceptions = require('./GraphExceptions');
var HashTagUtil = require('./HashTagUtil');

function writeToFile(hashTag, result) {
    var writeToFile = FileWriter.getHashtagFileWriter(hashTag);
    writeToFile(result);
}

function getNextHashtags(queryResult, completed, limit) {
    var result = [];
    var statuses = queryResult.statuses;
    for (var statusIdx = 0; statusIdx < statuses.length; statusIdx++) {
        if (result.length < limit) {
            var hashtagPool = HashTagUtil.getStatusHashtags(statuses[statusIdx]);
            var nextHashtag = chooseNextHashtag(hashtagPool, completed.concat(result));
            if (nextHashtag) {
                result.push(nextHashtag);
            }
        }
        else {
            return result;
        }
    }
    return result;
}


// returns null if unable to choose
function chooseNextHashtag(hashtagPool, completed) {
    if (hashtagPool.length > 1) {
        for (var hashtagIdx = 0; hashtagIdx < hashtagPool.length; hashtagIdx++) {
            var hashtag = hashtagPool[hashtagIdx].text.toLowerCase();
            var shouldVisit = HashTagUtil.shouldVisitTag(hashtag, completed);
            if (shouldVisit) {
                return hashtag;
            }
        }
    }
}

// NOT USED

function getNextHashtag(queryResult, completed) {
    var statuses = queryResult.statuses;
    for (var statusIdx = 0; statusIdx < statuses.length; statusIdx++) {
        var hashtagPool = HashTagUtil.getStatusHashtags(statuses[statusIdx]);
        var nextHashtag = chooseNextHashtag(hashtagPool, completed);
        if (nextHashtag) {
            return nextHashtag;
        }
    }
    throw new GraphExceptions.NoConnectedHashtagsException('no more connected hashtags');
}

