
module.exports = function(req, res, next) {
	let assert = require('assert');
	let moment = require('moment');

	try{
		// check role
		let role = req.authorizedUser.role.role ;
		assert(role == 'write' || role == 'both',"Permission Denied");
		next();
	}catch(e){
		HelperService.exception(res, e, 400);
	}



};
