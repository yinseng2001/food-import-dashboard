'use strict'; // Parrot.js
// The set of parrots registered in our app.
module.exports = {

    attributes: {
        document: {
            type: 'objectid'
        },
        type: {
            type: 'string',
            defaultsTo: 'product'
        },
        user: {
            model: 'Users'
        }
    }
}