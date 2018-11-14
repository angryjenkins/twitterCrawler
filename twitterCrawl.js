require('dotenv').config()

var Twitter   = require('twitter');
var colors    = require('colors');
var keys      = require('./keys');
var moment = require('moment');

var subject   = process.argv[2];
var client = new Twitter(keys.twitterKeys);

client.stream('statuses/filter', {track: subject, lang: 'en'},  function(stream){
  stream.on('data', function(tweet) {

    var twit = {
      time: '\n::: ' + moment().calendar(),
      name: tweet.user.name,
      handle: " @" + tweet.user.screen_name,
      loc: function(tweet){
        if(tweet.user.location){
          return " ::: " + tweet.user.location;
        } else {
          return "";
        }
      },
      post: tweet.text
    }

    console.log(('\n_____________').yellow);

    console.log(twit.name.white 
      + " " 
      + twit.handle.yellow.bold 
      + twit.time.yellow
      + twit.loc(tweet).yellow
    );

    console.log(twit.post);
  });
  stream.on('error', function(error) {
    console.log(error);
  });
});
