app.controller('index', ['$scope','$location', function ($scope,$location) {

	$scope.login = function(){
		methods.login();
	}

	$scope.register = function(){
		methods.register();
	}

	$scope.click = function(){
		alert(0);
		$location.path('/test1');
	}


	var methods = {
		login:function(){
			alert("login");
			window.location = "/register";
		},
		register:function(){

		}
	}
	
}])