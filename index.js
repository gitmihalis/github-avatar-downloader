// make a command line HTTP client that will request the avatars for all contributers 
const fs = require('fs');
//  to a given project on GitHub, and download them to disk.

// * uses 'request' library to make the HTTP requests
const request = require('request');

// Your program should be executed from the command line in the following manner,
// `node download_avatars.js nodejs node`
const args = process.argv.slice(2, 3);

const options = {
	host: 'https://api.github.com',
}

// get the data 
function api(options) {
	
}

// save to disk
function save() {

}

request.get()
// find a folder called avatars in my current directory
	// name of each image file is the contributor's name and the file extension(type) (ex. johnny.png)