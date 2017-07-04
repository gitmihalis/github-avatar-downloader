const request = require('request');
const fs = require('fs');
const GITHUB_USER = "gitmihalis";
const GITHUB_TOKEN = "554f9fd2a4f225332b80bc5cff474d6204f7aa6f";

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
	for ( let i = 0; i < result.length; i += 1) {
	// result.forEach( function (user) {
		if ( result[i].avatar_url ) {
			downloadImageByURL(result[i].avatar_url, result[i].login );		
		}
	}
	// })
});

function downloadImageByURL(url, filePath) {
	console.log(filePath)
  // The function will make a request to a given url, 
  // saving the resulting image file to a specified filePath.
  request.get(url).pipe(fs.createWriteStream('avatars/' + filePath + '.jpg') );
}
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "kvirani.jpg")