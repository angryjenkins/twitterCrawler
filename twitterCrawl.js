require('dotenv').config();

var Twitter = require('twitter');
var colors = require('colors');
var keys = require('./keys');
var moment = require('moment');

var subject = process.argv[2];
var client = new Twitter(keys.twitterKeys);

client.stream('statuses/filter', { track: subject, lang: 'en' }, function(
	stream,
) {
	stream.on('data', function(tweet) {
		var twit = {
			time: '\n::: ' + moment().format('MMM Do YYYY h:mma'),
			name: tweet.user.name,
			handle: ' @' + tweet.user.screen_name,
			loc: tweet => (tweet.user.location ? ' ::: ' + tweet.user.location : ''),
			post: tweet =>
				tweet.truncated ? tweet.extended_tweet.full_text : tweet.text,
		};

		console.log('\n_____________'.white);

		console.log(
			twit.name.yellow.bold +
				' ' +
				twit.handle.brightGreen.bold +
				twit.time.white +
				twit.loc(tweet).magenta,
		);

		console.log(twit.post(tweet));
	});
	stream.on('error', function(error) {
		console.log(error);
	});
});
