let assert = require('assert');
let moment = require('moment');
let uuid = require('node-uuid');
let base64 = require('js-base64').Base64;

module.exports = {

    index: function(req, res) {
        try {
            let query = Histories.find({
                'user': req.authorizedUser.id
            });
            query.exec(function(err, histories) {
                if (err) return handleError(err);
                HelperService.success(res, histories);
            })

        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },

    store: function(req, res) {
        try {
        	Histories.create({ 
				token: req.body.token,
				user: req.authorizedUser.id,
				actionNum:req.body.actionNum || {} ,
				url:req.body.url || {},
				actionUrl: req.body.actionUrl || {},
			}).exec(function(err,history){
				if (err) return console.error(err);
				HelperService.success(res,history);
			});

        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },

    back : function(req, res) {
        try {
        	console.log(req.authorizedUser.id);
        	let index =	req.query.index || 0;
			let query = Histories.findOne({ 'user': req.authorizedUser.id }).sort('id DESC');
			if(	req.query.index ){
				query.skip(index*1);
			}
			query.exec(function(err, histories) {
				if (err){return console.error(err);}
				HelperService.success(res,histories);
			});

        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },

    mostViewedByUser : function(req, res) {
        try {
            let user = req.authorizedUser;
        	let index =	req.query.index || 0;
			// let query = Histories.find({ 'user': req.authorizedUser.id }).sort('id ASC');
			if(	req.query.index ){
				query.skip(index*1);
			}
			// query.exec(function (err, histories) {
			// 	if (err) return console.error(err);
			// 	HelperService.success(res,histories);
			// });

            Histories.native(function(err,collection) {
                if(err){
                    console.log(err);
                }
                collection.aggregate ([
                    {$match :{'user':user.id} },
                    {$group :{ 
                        _id : '$url',
                        count : {$sum:1}
                    }},
                    {$sort : {count:-1}}
                ],function(err,histories){
                    console.log(histories);
                    HelperService.success(res, histories);
                });
            })
            
        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },

    mostViewed : function(req, res) {
        try {
        	// check user role 
			let user = req.authorizedUser;
			// app.assert(user.role.role == 'read' || user.role.role == 'both',"user has no permission to read");
			// get most view 
			Histories.native(function(err,collection) {
                if(err){
                    console.log(err);
                }
                collection.aggregate ([
                    {$group :{ 
                        _id : '$url',
                        count : {$sum:1}
                    }},
                    {$sort : {count:-1}}
                ],function(err,histories){
                    console.log(histories);
                    HelperService.success(res, histories);
                });
            })

        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },


    


};