require('dotenv').config();
const request = require('request');
const fs = require('fs');

// =========== GIT_HUB API CREDENTIALS ==========================================
const GITHUB_USER = process.env.GITHUB_USER;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.argv.slice(4, 5);
// ==============================================================================

// if user doesnt have access token in environment, take as argument.
if ( GITHUB_TOKEN === undefined || GITHUB_TOKEN.length < 1) {
	console.error(`Error: GITHUB ACCESS TOKEN is not defined
	Set one in your environment, or pass in as a thrird argument 
	==> download_avatar.js [ owner, repo, TOKEN ]`);
	return;
} 
console.log(`
( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)
      Welcome to the GitHub Avatar Downloader!
( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)
`);

const owner = process.argv.slice(2, 3);
const repository = process.argv.slice(3, 4);	

// Options for the API request
const options = {
	uri: `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repository}/${owner}/contributors`,
	headers: { 
		"User-Agent": "GitHub Avatar Downloader - Student Project",
		Accept: "application/vnd.github.v3+json" 
	},
};

// Collect avatar image urls 
function downloadAvatars(err, res, body) {
	if (res  && res.statusCode === 404) {
		console.log('Repository not found!, check that the owner and repo are correct and try again.');
	}
	if (!err && res.statusCode === 200) {
		let contributors = JSON.parse(body)

		for ( let c of contributors ) {
			request.get(c.avatar_url)
				.pipe(fs.createWriteStream(`./avatars/${c.login}.jpg`))
				.on('error', function(err) { 
					console.log(`Error downloading from ${c.avatar_url}`)
				})
		}
		
	}
}
request(options, downloadAvatars )



