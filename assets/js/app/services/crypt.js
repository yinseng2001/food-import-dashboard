/*
* @Author: yinseng
* @Date:   2016-10-11 11:51:00
* @Last Modified by:   yinseng
* @Last Modified time: 2016-11-11 16:57:11
*/


(function (){
    app
        .service('CryptService', ['$http', function ($http) {
            var public_key = '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhfy3dB2DwHxGwpDET8J/\n9MLTxTRJyQ5fWLM/A2qsR3RuZo1/ZqrgdN9Uq477iZ+xKqWYVsaRFprOfrXa1WS/\n8I3U3KOeyEtt+WNZrrjj2klLjuHaWLa3SZgT22z+hvjtF4GNCO3lz5P2VVvRbWjG\nuv6+xFhh2pBrpMpAyk4G/ZQO0Q6AhooCAy2LbqUNn++416hdbcTndGQqqEfm3cvk\ngtVN1uNh0nmomB7xckvwFB+tnFWvegCkD93YFosALGHqzoOwbm7zszTi74fAhgc5\n5EEtOPXNWbhXVUKJ0qJViOv1HjVjoBfa+QZvfHMd+md5ysofFpajmVup6GDq7rI9\nvwIDAQAB\n-----END PUBLIC KEY-----';
            var public_method = {
                encryptKey: function (pass) {
                    var encrypt = new JSEncrypt();
                    encrypt.setPublicKey(public_key);
                    var encrypted = encrypt.encrypt(pass);

                    return encrypted;

                },
                generatePassword: function (length) {
                    length = length || 8;
                    var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!&%$#0123456789";
                    var retVal = "";
                    for (var i = 0, n = charset.length; i < length; ++i) {
                        retVal += charset.charAt(Math.floor(Math.random() * n));
                    }
                    return retVal;
                },
                encryptV2: function (text, pass) {
                    var encrypted = CryptoJS.AES.encrypt(text, pass);
                    return encrypted.toString();
                },

                decryptV2: function (text, pass) {
                    var decrypted = CryptoJS.AES.decrypt(text, pass);
                    return decrypted.toString(CryptoJS.enc.Utf8);
                },

                create: function (text, expired_in) {
                    var date = new Date();
                    var signature = date.getTime() + (expired_in * 1000 || (1000 * 60 * 10));
                    var pass = public_method.generatePassword(16);
                    text.signature = signature;
                    text = angular.isObject(text) ? angular.toJson(text) : text;
                    var en = public_method.encryptV2(text, pass);
                    var de = public_method.decryptV2(en, pass);
                    return {
                        pass: pass,
                        text: text,
                        encrypted: en,
                        decrypted: de,
                        encrypted_pass: public_method.encryptKey(pass)
                    };
                }
            };
            return public_method;
        }]);
}());