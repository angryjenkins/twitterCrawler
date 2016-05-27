var Twitter   = require('twitter');
var colors    = require('colors');
var keys      = require('./keys');

var subject   = process.argv[2];
var client = new Twitter(keys.twitterKeys);


client.stream('statuses/filter', {track: subject, lang: 'en'},  function(stream){
  stream.on('data', function(tweet) {
    var tweetTime = new Date ();
    console.log(('____________').yellow);

    console.log(tweet.user.name.yellow + " " +(" @" + tweet.user.screen_name + " ").cyan.bold + ' ::: ' + colors.cyan(tweetTime));
    console.log(tweet.text);
  });

  //BULLSHIT POSH, SORRY GITHUB!
  stream.on('error', function(error) {
    console.log(error);
  });
});