// make a command line HTTP client that will request the avatars for all contributers 
//  to a given project on GitHub, and download them to disk.
const fs = require('fs');
// * uses 'request' library to make the HTTP requests
const request = require('request');
const token = '3abe54573af9239c88f7c3876e735e23ca825800';

// should be executed from the command line in the following manner,
// `node download_avatars.js nodejs node`
const user = process.argv.slice(2, 3);
const repo = process.argv.slice(3, 4);
const contributorsURL = 'https://api.github.com/repos/infernojs/inferno/contributors';
const host = 'https://api.github.com';
const path = `/repos/${user}/${repo}/contributors`;
const options = {
	url: host + path,
	headers: {
		"Accept": 'application/vnd.github.v3+json',
		"User-Agent": "gitmihalis",
		"Authorization": `gitmihalis ${token}`,
	}
}

function cb(err, res, body) {
	if ( err) { throw err }
	console.log(res.statusCode);
	console.log(res.statusMessage)
}

request(options, function(err, res, callback) {
	console.log(res.statusCode);
})

// get the data 
// save to disk

// find a folder called avatars in my current directory
	// name of each image file is the contributor's name and the file extension(type) (ex. johnny.png)