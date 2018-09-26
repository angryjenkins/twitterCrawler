var Twitter   = require('twitter');
var colors    = require('colors');
var keys      = require('./keys');
var moment = require('moment');

var subject   = process.argv[2];
var client = new Twitter(keys.twitterKeys);

client.stream('statuses/filter', {track: subject, lang: 'en'},  function(stream){
  stream.on('data', function(tweet) {
    var tweetTime = new Date ();
    console.log(('_______________').yellow);

    console.log(tweet.user.name.yellow 
        + " " 
        +(" @" + tweet.user.screen_name + " ").yellow.bold 
        + '\n::: ' + colors.yellow(tweetTime));

    console.log(tweet.text);
  });
  stream.on('error', function(error) {
    console.log(error);
  });
});
