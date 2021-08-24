require('dotenv').config();

const Twitter = require('twitter');
const chalk = require('chalk');
const keys = require('./keys');

const subject = process.argv[2];
const client = new Twitter(keys.twitterKeys);

client.stream('statuses/filter', { track: subject, lang: 'en' }, function(
	stream,
) {
	stream.on('data', function(tweet) {
		const twit = {
			time: `\n::: ${new Date().toLocaleString('en-US',  {
				weekday: 'long',
				day: 'numeric',
				year: 'numeric',
				month: 'long',
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			})}`,
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
