# matt martin's Twitter Crawler (v1.1.0)


## Summary

Say you are watching the Mets play the Phillies, and they are failing to hit. Again.

Open the twitterCrawler directory in your terminal and type "node twitterCrawler mets". Timestamped tweets will stream to your terminal in real time.

## Method

This command line app uses Node and npm's twitter package to stream tweets related to a query. It works just like any Node app that uses *process.argv* for input.

+ Get a Twitter Developer Key!

It is needed to work with the API and will provide the four "secrets" that need to be added to the *keys.js* file included. Go to https://dev.twitter.com/, sign in with your twitter credentials, make an app, and you will receive these four keys (visible under "manage your apps".)

Plug these four keys into the quotes in the keys.js file and you are set to stream tweets to your terminal.

+ Clone the master

> $ git clone https://github.com/angryjenkins/twitterCrawler.git

Enter the cloned directory with your terminal and start the app by typing

> $ node twitterCrawl "<query>"

Have fun!

## TwitterCrawl 1.1.0 - NPM START

>Now you can use "npm start *query*" to search. Nodemon is integrated.

Please note, the current color scheme is best viewed on a terminal with a DARK background. The [colors](https://www.npmjs.com/package/colors) npm package is used to configure them.