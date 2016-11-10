

app.controller('AppCtrl', ['$scope','$rootScope','$localStorage','Request','genfunc', function ($scope,$rootScope,$localStorage,Request,genfunc) {

    // visit 
    $scope.visitProduct = function(){
        alert("visitProduct");
        Request.post('/history', {
            "actionNum": "2",
            "url": "/product",
            "actionUrl": {
                "p1": "22",
                "p2": "22"
            }
        }, {
            'token' :  $rootScope.loginUser.token
        })
        .success(function(data, status, headers, config) {
            if (data.code == 200) {
                console.log("visitProduct===");
                console.dir(data);
            }
        })
        .error(function(data, status, headers, config) {
               console.dir(data);
        });
    }

    $scope.visitPort = function(){
        
    }
    $scope.visitCountry = function(){
        
    }
    $scope.visitSean = function(){
        
    }





	
}])