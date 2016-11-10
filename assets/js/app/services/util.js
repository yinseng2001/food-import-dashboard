/*
* @Author: yinseng
* @Date:   2016-10-18 09:21:04
* @Last Modified by:   yinseng
* @Last Modified time: 2016-10-26 10:18:16
*/


(function() {

    app.service('util', ['$http', '$rootScope', '$window', function($http, $rootScope, $window) {
     
        var public_method = {
            countMessage: function (message, options){
                options = options || {};

                let cutStrLength = 0;

                options = _.extend({

                    cut: true,
                    maxSmsNum: 3,
                    interval: 400,

                    counters: {
                        message: 0,
                        character: 0
                    },

                    lengths: {
                        ascii: [160, 306, 459],
                        unicode: [70, 134, 201]
                    }
                }, options);

                let
                    smsType,
                    smsLength = 0,
                    smsCount = -1,
                    charsLeft = 0,
                    text = message,
                    isUnicode = false;

                for (let charPos = 0; charPos < text.length; charPos++) {
                    switch (text[charPos]) {
                        case "\n":
                        case "[":
                        case "]":
                        case "\\":
                        case "^":
                        case "{":
                        case "}":
                        case "|":
                        case "€":
                            smsLength += 2;
                            break;

                        default:
                            smsLength += 1;
                    }

                    //!isUnicode && text.charCodeAt(charPos) > 127 && text[charPos] != "€" && (isUnicode = true)
                    if (text.charCodeAt(charPos) > 127 && text[charPos] != "€")
                        isUnicode = true;
                }

                if (isUnicode) smsType = options.lengths.unicode;
                else smsType = options.lengths.ascii;

                for (let sCount = 0; sCount < options.maxSmsNum; sCount++) {

                    cutStrLength = smsType[sCount];
                    if (smsLength <= smsType[sCount]) {

                        smsCount = sCount + 1;
                        charsLeft = smsType[sCount] - smsLength;
                        break
                    }
                }

                if (options.cut) {
                    text = text.substring(0, cutStrLength);
                }

                smsCount == -1 && (smsCount = options.maxSmsNum, charsLeft = 0);

                return {
                    sms: smsCount,
                    chars_left: charsLeft
                }
            },
            mapTemplate: function (message, options){
                for (let key in parameters) {
                    let val = parameters[key];
                    let reg = new RegExp('{' + key + '}', 'gi');
                    message = message.replace(reg, val);
                }
                return message;
            }
        };

        return public_method;
    }]);

}());


