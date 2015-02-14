# Connected Hashtags

## What is it
 
This is a simple utility generating a tree of hashtags using asynchronous calls to the twitter API. This in turn provide a natural way of generating a connected graph of tweets from the twitter API. The program works as follows:

*Input*: 

- `startTag`: string
- `depth`: integer
- `breadth`: integer

*Output*:

2 hashtags are connected if there exists a tweet which has both hashtags. The program visits hashtags
in such a tree of specified depth and breadth. It then dumps a number of tweets in JSON format under
each hashtag under `/data`.

## Setting Up

You need to configure a local file with your twitter credentials. 
Create a file `twitter/TwitterConsts.js`, with content:

```javascript
    module.exports = {
        CONSUMER_KEY: '...',
        CONSUMER_SECERET: '...',
        ACCESS_TOKEN_KEY: '...',
        ACCESS_TOKEN_SECERET: '...'
    };
```

This program uses the popular [node-twitter package](https://github.com/desmondmorris/node-twitter) as well as [underscore.js](http://underscorejs.org/). Install both by running.
```
npm install
```

## Usage

```javascript

var GraphGenerator = require('./GraphGenerator');

var generator = new GraphGenerator();

// loads tree spanning from #life with breadth 2 and depth 2
generator.loadTweetsGraph('life', 2, 2);

```

## Warning

Be conscious of [Twitter API rate limits](https://dev.twitter.com/rest/public/rate-limits). For example generating a graph of breadth 3 and depth 5 gives `3^5 = 243` API calls per 15 min window, which exceeds the 180 allowed for search queries.

