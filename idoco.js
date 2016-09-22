//(function(angular) {
	angular.module('idoco',['ngRoute'])
		.config(function($routeProvider){
			$routeProvider
				.when('/', {
					templateUrl: 'src/profile/profile.html'
				})
				.when('/profile',{
					templateUrl: 'src/profile/profile.html'
				})
				.when('/resume',{
					templateUrl: 'src/resume/resume.html'
				})
				.when('/contact',{
					templateUrl: 'src/contact/contact.html'
				})
				.when('/graph',{
					templateUrl: 'src/graph/graph.html'
				})
				.when('/song',{
					templateUrl: 'src/song/song.html',
					controller: 'SongCtrl'
				})
				.otherwise({
					templateUrl: '/src/profile/profile.html'
				});

		});
//})(window.angular);


