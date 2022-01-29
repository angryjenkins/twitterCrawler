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
			desc: tweet => (tweet.user.description ? chalk.greenBright.italic(' ::: ' + tweet.user.description) : ''),
			loc: tweet => (tweet.user.location ? '::: ' + tweet.user.location : ''),
			post: tweet => {
				if (typeof tweet.retweeted_status === 'object' && tweet.retweeted_status !== null) {
					const retweeted = `@${tweet.retweeted_status.user.screen_name}`

					const retweet = tweet.retweeted_status.truncated ? tweet.retweeted_status.extended_tweet.full_text : tweet.retweeted_status.text

					return `${chalk.bgGray.italic('retweeting ' + retweeted)}: ${retweet}` 
				}

				if (tweet.truncated === true) {
					return tweet.extended_tweet.full_text
				}

				return tweet.text
			}
		};

		console.log(chalk.bold.white('\n_____________'))

		console.log(`${chalk.green.bold(twit.name)} ${(chalk.yellow.bold(twit.handle))} ${chalk.cyanBright(twit.desc(tweet))}`)
		console.log(`${chalk.blueBright.italic(twit.time)} ${chalk.cyan.italic(twit.loc(tweet))}`)
 
		console.log('\n' + twit.post(tweet));
	});
	stream.on('error', function(error) {
		console.log(error);
	});
});
