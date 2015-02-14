module.exports = {
    getHashtagQuery: getHashtagQuery
}
function getHashtagQuery(hashTag) {
    return {q: '#' + hashTag};
}