angular.module('idoco',[])
	.controller("Ctrl", function($scope){
		$scope.state = 'profile';
        $scope.isActive = function() {
			console.log("state is: " + $scope.state);
			return $scope.state === 'song';
		};
	})
;
