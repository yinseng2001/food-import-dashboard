let assert 	= require('assert');
let moment 	= require('moment');
let uuid 	= require('node-uuid');
let base64 	= require('js-base64').Base64;

module.exports = {

  index: function (req, res) {
  	try{	
		let query = Roles.find({});
		query.exec(function (err, roles) {
			if (err) return handleError(err);
			HelperService.success(res,roles);
		})
	}catch (e){
		HelperService.exception(res, e, 400);
	}
  },

  store: function (req, res) {
  	try{
  		console.log("role store");
		Roles.create({ 
			role 		: req.body.role
		}).exec(function(err,role){
			if (err) return console.error(err);
			HelperService.success(res,role);
		});
	
	}catch(e){
		HelperService.exception(res, e, 400);
	}
},

};

