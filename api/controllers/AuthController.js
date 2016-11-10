let assert = require('assert');
let moment = require('moment');
let uuid = require('node-uuid');
let base64 = require('js-base64').Base64;
let md5 = require('md5');

module.exports = {

    login: function(req, res) {
        try {
            // validation
            assert(req.body.email, "unexpected email");
            assert(req.body.password, "unexpected password");
            // login 
            let query = Users.findOne({
                where: {
                    'email': req.body.email,
                    'password': req.body.password
                }
            }).populate('role');
            // generate token
            let token = base64.encode(uuid.v4());
            // set expiration time
            let expired_date = moment().add(20, 'minutes').valueOf();


            // console.log(expired_date);
            query.exec(function(err, user) {
                if (err) return handleError(err);
                //console.log(user,req.body.email,req.body.password);
                try {
                    // console.log('name = %s email = %s', user.name, user.email) ;
                    assert(user, "incorrect email or password");

                    if (!user.session_token) {
                        console.log("enter here why");
                        user.session_token = {};
                    }
                    let session = user.session_token;
                    session[token] = expired_date;


                    Users.update({
                        id: user.id
                    }, {
                        session_token: session
                    }).exec(function(err, updated) {
                        if (err) return handleError(err);
                    });

                    user.session_token = {};
                    user.session_token[token] = expired_date;
                    user.token = token;
                    HelperService.success(res, user);
                } catch (e) {
                    HelperService.exception(res, e, 400);
                }
            })

        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },
    // check validation from liftray
    auth: function(req, res) {
        try {
            console.log("token", req.get('token'));
            // validation
            assert(req.get('token'), "Unexpected token");
            assert(TokenValidation.tokenValidation(req.get('token')), "Invalid token");

            // current timestamp
            let current = moment().utc().valueOf();
            // get token and expiration
            let session = 'session_token.' + req.get('token');
            console.log(session);
            let query = {};
            query[session] = {
                $exists: true
            };
            query = Users.findOne(query).populate('role');
            query.exec(function(err, user) {
                console.log("user", user);
                // get the time of the token
                let expired_time = user.session_token[req.get('token')];
                // check token expired
                let message = null;
                let code = null;
                if (current > expired_time) {
                    message = 'user unauthorized';
                    code = 401;
                }

                let session_token = {};
                session_token[req.get('token')] = expired_time;

                HelperService.success(res, {
                    _id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    session_token: session_token,
                    message: message ? message : 'user authorized'
                }, code ? code : 200);
            })


        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },
    // check validation from liftray
    /*
    authOld: function(req, res) {
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
                    console.log(current);
                    // get the time of the token
                    let expired_time = user.session_token[combination];
                    // check token expired
                    let message = null;
                    let code = null;
                    if (current > expired_time) {
                        message = 'user unauthorized';
                        code = 401;
                    }

                    let session_token = {};
                    session_token[combination] = expired_time;

                    HelperService.success(res, {
                        _id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        session_token: session_token,
                        message: message ? message : 'user authorized'
                    }, code ? code : 200);
                } catch (e) {
                    HelperService.exception(res, e, 400);
                }

            })

        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },*/

};