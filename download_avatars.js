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
	uri: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repository + '/' + owner + '/contributors',
	headers: { 
		"User-Agent": "GitHub Avatar Downloader - Student Project",
		Accept: "application/vnd.github.v3+json" 
	},
};

// Collect avatar image urls 
function downloadAvatars(err, arr) {
	if (err) throw new Error('Could not find contributors');
	arr.forEach( function(contributor) {
		request.get(contributor.avatar_url)
			.on('error', console.log(`Error downloading from ${contributor.avatar_url}`))
			.pipe(fs.createWriteStream(`./avatars/${contributor.login}.jpg`))
	});
}

const contributors = request(options, function(err, res, body) {
	let data = JSON.parse(body);
	// Print the response status code if a response was received 
	if(res  && res.statusCode === 404) {
		console.log(`${res.statusCode} response.`)
		console.log('Repository not found!, check that the owner and repo are correct and try again.');
		return;
	}
	return data;
});



