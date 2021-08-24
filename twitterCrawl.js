require('dotenv').config();

var Twitter = require('twitter');
var chalk = require('chalk');
var keys = require('./keys');

var subject = process.argv[2];
var client = new Twitter(keys.twitterKeys);

client.stream('statuses/filter', { track: subject, lang: 'en' }, function(
	stream,
) {
	stream.on('data', function(tweet) {
		var twit = {
			time: '\n::: ' + new Date().toUTCString(),
			name: tweet.user.name,
			handle: ' @' + tweet.user.screen_name,
			loc: tweet => (tweet.user.location ? ' ::: ' + tweet.user.location : ''),
			post: tweet =>
				tweet.truncated ? tweet.extended_tweet.full_text : tweet.text,
		};

		console.log(chalk.bold.white('\n_____________'))

		console.log(
			chalk.hex('#98fb98').bold(twit.name) +
				' ' +
				chalk.cyanBright(twit.handle) +
				chalk.hex('#87ceeb').italic(twit.time) +
				chalk.hex('#87ceeb').italic(twit.loc(tweet)),
		);
 
		console.log('\n' + twit.post(tweet));
	});
	stream.on('error', function(error) {
		console.error(error);
	});
});
