'use strict';
// The set of parrots registered in our app.
module.exports = {

    attributes: {
        username: {
            type: 'string'
        },
        email: {
            type: 'string',
            unique: true,
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
        role: {
            model: 'Roles'
        },
        session_token: {
            type: 'json'
        }


        // e.g., [{...}, {...}, ...]
        // knownDialects: {
        //   collection: 'Dialect'
        // }
    }
}