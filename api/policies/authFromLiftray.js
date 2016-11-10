module.exports = function(req, res, next) {
    let assert = require('assert');
    let moment = require('moment');
    let md5    = require('md5');
    try {
        // validation
        assert(req.get('token'), "unexpected token");
        let token = req.get('token');
        // get hash (md5) from token
        let md5_hash = md5(token);
        // get(char from 5 to 10 of MD5 string) md5 transform
        let part_md5 = md5_hash.substring(5, 10);
        // TOKEN+MD5
        let combination = token + part_md5;
        // verify token
        let session = 'session_token.' + combination;
        console.log(token, md5_hash, part_md5, combination);
        let query = {};
        query[session] = {
            $exists: true
        };
        query = Users.findOne(query).populate('role');
        query.exec(function(err, user) {
            try {
                // current timestamp
                let current = moment().utc().valueOf();
                // get the time of the token
                let expired_time = user.session_token[combination];
                // check token expired
                let message = null;
                if (current > expired_time) {
                  	HelperService.error(res,{message : 'user unauthorized'});
                }else{
                	req.authorizedUser = user;
					next();
                }
            } catch (e) {
                HelperService.exception(res, e, 400);
            }

        })
    } catch (e) {
        HelperService.exception(res, e, 400);
    }



};