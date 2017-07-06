require('dotenv').config();
console.log(`
( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)
      Welcome to the GitHub Avatar Downloader!
( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)( ͡° ͜ʖ ͡°)
`);
const request = require('request');
const fs = require('fs');
const GITHUB_USER = "gitmihalis";
const owner = process.argv.slice(2, 3);
const repository = process.argv.slice(3, 4);	
// if user doesnt have access token in environment, take as argument.
const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN || process.argv.slice(4, 5);
if ( GITHUB_TOKEN === undefined || GITHUB_TOKEN.length < 1) {
console.error(`Error: GITHUB ACCESS TOKEN is not defined
Set one in your environment, or pass in as a thrird argument 
==> download_avatar.js [ owner, repo, TOKEN ]`);
return;
}  


function getRepoContributors(repoOwner, repoName, cb) {
	const options = {
		uri: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
		headers: { 
			"User-Agent": "GitHub Avatar Downloader - Student Project",
			Accept: "application/vnd.github.v3+json" 
		},
	};
	request(options, function(err, res, body) {
		if (err) throw err;
		let data = JSON.parse(body)
  	if( res  && res.statusCode === 404 ) {
			console.log('Repository not found!, check your paramaters');
			return;
			} // Print the response status code if a response was received 
		cb(err, data);
	});
}

function downloadImageByURL(url, filePath) {
  // request given avatar url and write the image to avatars/ 
	try {
		request.get(url).pipe(fs.createWriteStream('avatars/' + filePath + '.jpg') );
	} catch( err ) {
		console.log("Error: ", err)
	}
}

// start the download....
getRepoContributors(owner, repository, function(error, result) {
	for ( let i = 0; i < result.length; i += 1) {
		downloadImageByURL(result[i].avatar_url, result[i].login );		
	}
	if (error) throw error;
});