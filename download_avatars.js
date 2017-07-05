const request = require('request');
const fs = require('fs');
const GITHUB_USER = "gitmihalis";
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const owner = process.argv.slice(2, 3);
const repository = process.argv.slice(3, 4);

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
		if (err) { throw err }
		let data = JSON.parse(body)
		console.log(data.message)
		cb(err, data);
	});
}

getRepoContributors(owner, repository, function(error, result) {
	if (error) throw error;
	for ( let i = 0; i < result.length; i += 1) {
		if ( result[i].avatar_url ) {
			downloadImageByURL(result[i].avatar_url, result[i].login );		
		}
	}
});

function downloadImageByURL(url, filePath) {
  // request given avatar url and write the image to avatars/ 
  request.get(url).pipe(fs.createWriteStream('avatars/' + filePath + '.jpg') );
}
