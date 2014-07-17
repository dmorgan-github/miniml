define(
	[
		'app',
		'log',
		'angular',
		'controllers/HomeCtrl'
	],
	function (app, log) {
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
						.otherwise({
							redirectTo: '/home'
						}
					);
				}
			]);

		return router;
	}
);