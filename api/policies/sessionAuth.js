
module.exports = function(req, res, next) {
	let assert = require('assert');
	let moment = require('moment');
	try{
		// validation
		assert(req.get('token'),"unexpected token");
		assert(TokenValidation.tokenValidation(req.get('token')), "Invalid token");
		// current timestamp
		let current = moment().utc().valueOf();
		// get token and expiration
		let session = 'session_token.' + req.get('token') ;
		// console.log(session);
		let query = {};
		query[session] = { $exists : true};
		query = Users.findOne(query).populate('role');
		query.exec(function (err, user) {
			// console.log(user);
			try{
				// get the time of the token
				let expired_time = user.session_token[req.get('token')]; 
				// compare time
				if(current>expired_time){
					HelperService.error(res,{message : 'user unauthorized'});
				}else{
					req.authorizedUser = user;
					next();
				}
			}catch(e){
				HelperService.exception(res, e, 400);
			}
			
		})
	}catch(e){
		HelperService.exception(res, e, 400);
	}



};
