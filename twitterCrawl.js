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
			desc: tweet => (tweet.user.description ? chalk.greenBright.italic(` ::: ${tweet.user.description}`) : ''),
			loc: tweet => (tweet.user.location ? `::: ${tweet.user.location}` : ''),
			post: tweet => {
				if (typeof tweet.retweeted_status === 'object' && tweet.retweeted_status !== null) {
					const { name, location, screen_name, verified, description } = tweet.retweeted_status.user;

					let retweeted = `${chalk.bgGray.italic('retweeted ' + chalk.yellow.bold(name) + ', aka ' + chalk.bold.blueBright('@' + screen_name))}`;

					if (location) retweeted += '\nfrom ' + chalk.italic.yellow.bold(location)
					if (description) retweeted += ` :: ${chalk.italic(description)}`
					if (verified) retweeted += chalk.bold.cyanBright(` :: verified!`)

					const retweet = tweet.retweeted_status.truncated ? tweet.retweeted_status.extended_tweet.full_text : tweet.retweeted_status.text
					
					const date = `\n(from ${chalk.italic.yellow(new Date(tweet.retweeted_status.created_at).toLocaleString('en-US',  {
						weekday: 'long',
						day: 'numeric',
						year: 'numeric',
						month: 'long',
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric'
					}))})`

					return `\n${retweeted} ${date}\n\n${retweet}`
				}

				if (tweet.truncated === true) {
					return tweet.extended_tweet.full_text
				}

				return tweet.text
			},
			verified: tweet.user.verified,
			quote: tweet => {
				if (typeof tweet.quoted_status === 'object' && tweet.quoted_status !== null) {
					const { name, location, screen_name, verified, description } = tweet.quoted_status.user;

					let quoted = `${chalk.bgGray.italic('quoted ' + chalk.yellow.bold(name) + ', aka ' + chalk.bold.blueBright('@' + screen_name) )}`;


					if (location) quoted += '\nfrom ' + chalk.italic.yellow.bold(location)
					if (description) quoted += ` :: ${chalk.italic(description)}`
					if (verified) quoted += chalk.bold.cyanBright(` :: verified!`)

					const quote = tweet.quoted_status.truncated ? tweet.quoted_status.extended_tweet.full_text : tweet.quoted_status.text
					
					const date = `\n(from ${chalk.italic.yellow(new Date(tweet.quoted_status.created_at).toLocaleString('en-US',  {
						weekday: 'long',
						day: 'numeric',
						year: 'numeric',
						month: 'long',
						hour: 'numeric',
						minute: 'numeric',
						second: 'numeric'
					}))})`

					return `\n${quoted} ${date}\n\n${quote}`
				}

				return false
			}
		};

		console.log(chalk.bold.whiteBright('\n_____________'))

		console.log(`${chalk.greenBright.bold(twit.name)} ${(chalk.yellow(twit.handle))} ${twit.desc(tweet)}`)
		console.log(`${chalk.cyan.bold.italic(twit.time)} ${chalk.yellow(twit.loc(tweet))}`)

		if(twit.verified) { console.log(chalk.bold.cyanBright(':: verified!! ::'))}
		console.log('\n' + twit.post(tweet));

		if (twit.quote(tweet) !== false) {
			console.log(twit.quote(tweet))
		}

		// console.log("TWEET IN FULL!", JSON.stringify(tweet, null, 2));
	});
	stream.on('error', function(error) {
		console.log(error);
	});
});
