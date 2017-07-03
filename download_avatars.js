const request = require('request');
const GITHUB_USER = "gitmihalis";
const GITHUB_TOKEN = "0762d876dbbdb59e5cbebea36c05bdc6191cc27a";

console.log(`
( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)
					Welcome to the GitHub Avatar Downloader!
( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)
`);

function getRepoContributors(repoOwner, repoName, cb) {
	const options = {
		uri: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
		headers: { "User-Agent": "GitHub Avatar Downloader - Student Project" }
	};
	// request.get(options)
	// 	.on('err', (err) => { throw err } )
	// 	.on('response', (res) => { console.log(res.statusCode) });
	request(options, function(err, res, body) {
		cb(err, body)
	})

}
getRepoContributors('jquery', 'jquery', function(error, result) {
	console.log('Errors: ' + error);
	console.log('Result: ' + result);
});