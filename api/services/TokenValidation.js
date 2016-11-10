let md5 = require('md5');

exports.tokenValidation = function (token){
	let result = false;
 	// seperate original token
 	let original_token = token.substring(0,token.length - 5);
 	// get hash (md5) from token
    let md5_hash = md5(original_token);
    // get(char from 5 to 10 of MD5 string) md5 transform
    let part_md5 = md5_hash.substring(5,10);
    // TOKEN+MD5
    let combination_token = original_token + part_md5;
 	// verify signature
 	if(combination_token == token){
 		result = true;
 	}
 	return result;
};