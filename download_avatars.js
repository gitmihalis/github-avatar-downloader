const request = require('request');
const GITHUB_USER = "gitmihalis";
const GITHUB_TOKEN = "d6aa0f9e34c80a0785969911c4bcdc2e2dd5dcc3";

console.log(`
( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)
					Welcome to the GitHub Avatar Downloader!
( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)
`);

function getRepoContributors(repoOwner, repoName, cb) {
	const options = {
		uri: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
		headers: { 
			"User-Agent": "GitHub Avatar Downloader - Student Project",
			Accept: "application/vnd.github.v3+json" 
		},
	};
	request(options, function(err, res, body) {
		let data = JSON.parse(body)
		cb(err, data);
	})

}
getRepoContributors('jquery', 'jquery', function(error, result) {
	if (error) throw error;
	result.forEach( function (user) {
		console.log(user.avatar_url);
	})
});

function downloadImageByURL(url, filePath) {
  // ...
}
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")