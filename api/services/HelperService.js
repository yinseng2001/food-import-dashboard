// ResponseService.js
// Return response for API as okay or error as json to request
exports.success = function (res, message, code, options){
   res.status(code || 200).json({ 
       success: true,
       result: message,
       code: code || 200,
       options: options,
       error: null
   });
};

exports.error = function (res, message, code, options){
   res.status(code || 400).json({ 
       success: false,
       result: null,
       code: code || 400,
       options: options,
       error: message
   });
};

exports.exception = function (res, exception, code, options){
 	let logicError = exception.name === 'AssertionError';

    let messageObject = _.isObject(exception.message) ? exception.message : {
        text: exception.message,
        status: code || 500
    };

    let displayMessage = '';
    displayMessage = messageObject.text || exception.message || options.defaultText || 'Sorry, there was an internal server error';
  	res.status(code).json({
        'status': 'error',
        'result': displayMessage,
        'code': code,
        // 'options': stack
    });
};
// when clal
// ResponseService.success(...
// or ResponseService.error ...
// SERVICE_NAME.method()
