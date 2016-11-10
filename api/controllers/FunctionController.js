let assert 	= require('assert');
let moment 	= require('moment');
let uuid 	= require('node-uuid');
let base64 	= require('js-base64').Base64;

module.exports = {

    index: function(req, res) {
        try {
            let query = Users.findOne({id:'5818615813845cee86d7c282'});
            query.exec(function(err, user) {
                if (err) return handleError(err);
                console.log(user);
                // set expiration time
            	let expired_date = moment().add(20, 'minutes').valueOf();
                user.session_token['OGQ2NDM5ZTEtMDdjZC00MWMxLWFmZDAtNGYyODQ4ZTlhMDlka5f3d'] = expired_date;
                user.save(function(err){
                	HelperService.success(res, user);
                });
            })
        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },

    store: function(req, res) {
       
    },

};