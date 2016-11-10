
'use strict';// Parrot.js
// The set of parrots registered in our app.
module.exports = {
    
  attributes: {
    session_token: {
        type: 'string'
    },
  
    session_token: {
        model: 'Users'
    },

    action_num : {
    	type: 'integer'
    },
    url: {
        type: 'string'
    },
  	actionUrl : {
  		type: 'json'
	},

  }
}