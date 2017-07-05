const request = require('request');
const fs = require('fs');
const GITHUB_USER = "gitmihalis";
const GITHUB_TOKEN = "55dcf90f9c8cb50301eb4ca8d8672f8dc2feff90";
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
		let data = JSON.parse(body)
		cb(err, data);
	})

}

getRepoContributors(owner, repository, function(error, result) {
	if (error) throw error;
	for ( let i = 0; i < result.length; i += 1) {
		if ( result[i].avatar_url ) {
			downloadImageByURL(result[i].avatar_url, result[i].login );		
		}
	}
	// })
});

function downloadImageByURL(url, filePath) {
  // The function will make a request to a given url, 
  // saving the resulting image file to a specified filePath.
  request.get(url).pipe(fs.createWriteStream('avatars/' + filePath + '.jpg') );
}
