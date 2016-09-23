angular.module('idoco',[])
	.controller("Ctrl", function($scope, $timeout, $location){

        //initial state
        $timeout( function() {
            $scope.state = 'profile';
            $location.path('/profile')
        },1000);
        $scope.isActive = function() {
			console.log("state is: " + $scope.state);
			return $scope.state === 'song';
		};
	})
;
