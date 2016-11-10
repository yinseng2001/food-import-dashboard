let assert 	= require('assert');
let moment 	= require('moment');
let uuid 	= require('node-uuid');
let base64 	= require('js-base64').Base64;

module.exports = {

    index: function(req, res) {
        try {
            let query = Favorites.find({user:req.authorizedUser.id});
            query.exec(function(err, favorites) {
                if (err) return handleError(err);
                HelperService.success(res, favorites);
            })
        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },

    store: function(req, res) {
        try {
            Favorites.create({
                document: req.body.id,
                user: req.authorizedUser.id,
                type : req.body.type
            }).exec(function(err, favorite) {
                if (err) return console.error(err);
                HelperService.success(res, favorite);
            });

        } catch (e) {
            HelperService.exception(res, e, 400);
        }
    },

};