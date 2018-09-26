var Twitter   = require('twitter');
var colors    = require('colors');
var keys      = require('./keys');
var moment = require('moment');

var subject   = process.argv[2];
var client = new Twitter(keys.twitterKeys);

client.stream('statuses/filter', {track: subject, lang: 'en'},  function(stream){
  stream.on('data', function(tweet) {
    var tweetTime = moment().format("MMM Do YYYY h:mma");
    console.log(('____________').yellow);

    console.log(tweet.user.name.yellow + " " +(" @" + tweet.user.screen_name + " ").yellow.bold + ' ::: ' + colors.yellow(tweetTime));
    console.log(tweet.text);
  });
  stream.on('error', function(error) {
    console.log(error);
  });
});
