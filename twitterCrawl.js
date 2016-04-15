var Twitter = require('twitter');
var colors = require('colors');
var subject = process.argv[2];

var client = new Twitter({
  consumer_key: 'ykW7lgMUFThqz5IL4q5ScI7Ss',
  consumer_secret: 'vvZ3YB54OozPZvquxlKVkONVspn6Dzj1wDBnK6XFvSZxyzCuxo',
  access_token_key: '733105861-FaINs5DuUaEz1leoqgmEHpYFkWryaSpDy3NBVA7F',
  access_token_secret: '0Jlu8gQbkYp2RYWEEIY8LmRowfcLoR0e0BXC9McqVLOsK'
});

client.stream('statuses/filter', {track: subject, lang: 'en'},  function(stream){
  stream.on('data', function(tweet) {
    var tweetTime = new Date ();
    console.log((" @" + tweet.user.screen_name + " ").bgBlue + ' ::: ' + colors.cyan(tweetTime));
    console.log(tweet.text);
    console.log('*********');
  });
  //BULLSHIT POSH, SORRY GITHUB!
  stream.on('error', function(error) {
    console.log(error);
  });
});
