var _ = require('underscore');

module.exports = {
    shouldVisitTag: shouldVisitTag,
    getStatusHashtags: getStatusHashtags
};

function hashtagsEqual(ht1, ht2) {
    return ht1.toLowerCase() === ht2.toLowerCase();
}

function getStatusHashtags(status) {
    return status.entities.hashtags;
}

function shouldVisitTag(hashtag, visted) {
    return !_.contains(visted, hashtag);
}