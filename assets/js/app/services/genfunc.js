/*
* @Author: yinseng
* @Date:   2016-10-17 09:04:22
* @Last Modified by:   yinseng
* @Last Modified time: 2016-10-26 11:48:22
*/

(function() {

    app.service('genfunc', ['$http', '$rootScope', '$window', function($http, $rootScope, $window) {

        var public_method = {
            // header path
            getSessionId : function(){
                var session = $('meta[name="api:session"]');
                session = session ? session.attr('content') : '';
                return session;
            },
            getToken : function(){
                if(localStorage.userData){
                    var obj = JSON.parse(localStorage.userData);
                    return obj.result.access_token;
                }
            },
            getApplicationId : function(){
                if(localStorage.selectedApplication){
                    var obj = JSON.parse(localStorage.selectedApplication);
                    return obj._id;
                }
            },
            getSenderCode : function(){
                if(localStorage.selectedApplication){
                    var obj = JSON.parse(localStorage.selectedApplication);
                    return obj.sender_id;
                }
            },
            //  local storage
            addLocalstorage : function(storage,scope,data){
                var obj = JSON.parse(localStorage.getItem(storage));
                obj.result.push(data.result);
                localStorage.setItem(storage,JSON.stringify(obj)); 
                scope.push(data.result);
            },
            updateLocalstorage : function(storage,scope,data){
            },
            deleteLocalstorage : function(storage,scope,_id){
                scope = _.filter(scope,function(v){
                    return v._id != _id;
                });
                public_method.modifyLocalstorage(storage,scope);
                return scope;
            },
            modifyLocalstorage : function(storage,scope){
                localStorage.setItem(storage,JSON.stringify(scope)); 
            },
            setNavPath : function(_path){
                localStorage.navPath = _path;
            },
            getNavPath : function(){
                $rootScope.path = localStorage.navPath;
            },
            // date functions
            convertLocalDate : function(_date){
                return _date? moment.utc(_date).local().format('DD MMM YYYY'):null;
            },
            // handle error
            onError : function(data, status, headers, config){
                if(data.code == 500){
                    console.dir(data);
                    alert(data.result);
                }

                if(status == 401){
                    $rootScope.isSessionLoggedIn = false;
                    localStorage.isSessionLoggedIn = null;
                    delete localStorage.isSessionLoggedIn;
                }
            },
            callLayzr: function (time){
                setTimeout(function() {
	                var layzr = new Layzr({
                        container: "category-item-listing",
                        selector: '[data-layzr]',
                        attr: 'data-layzr',
                        retinaAttr: 'data-layzr-retina',
                        bgAttr: 'data-layzr-bg',
                        hiddenAttr: 'data-layzr-hidden',
                        threshold: 50,
                        callback: null
	                });
		        }, time);
           
            },
            notify: function (status, message, duration){
                console.log('duration',duration);
                UIkit.notify(message, {
                    status: status,
                    pos: 'top-center',
                    timeout: duration || 2000
                });
            },
            closeSpinner: function (uri, data, headers, query){
                $('.spinner-container').addClass('spinner-close');
            },
            openSpinner: function (uri, data, headers, query){
                $('.spinner-container').removeClass('spinner-close');
                
            },
            hideElement:function(selector){
                $(selector).addClass('disable-display');
            },
            showElement:function(selector){
                $(selector).removeClass('disable-display');
            }
          
        };

        return public_method;
    }]);

}());