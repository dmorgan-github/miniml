define(
	[
		'app',
		'angular',
		'controllers/HomeCtrl',
		'controllers/StatsCtrl'
	],
	function (app) {
		'use strict';

		var router = app.miniml.config(
			[
				'$routeProvider',
				'$locationProvider',
				function ($routeProvider, $locationProvider) {

					$locationProvider.hashPrefix('!');

					// Routes.
					$routeProvider
						// home.
						.when('/home', {
							templateUrl: 'templates/home.html',
							controller: 'HomeCtrl'
						})
						.when('/stats', {
							templateUrl: 'templates/stats.html',
							controller: 'StatsCtrl'
						})
						.otherwise({
							redirectTo: '/home'
						}
					);
				}
			]);

		return router;
	}
);