define(
	[
		'app',
		'angular',
		'underscore',
		'jquery',
		'services/EvalSvc'
	],
	function (app, angular, _, $) {
		'use strict';

		/**
		* Represents a Home Controller
		* @class HomeCtrl
		* @constructor
		**/
		app.miniml.controller(
			'HomeCtrl',
			[
				'$scope',
				'$routeParams',
				'EvalSvc',
				function ($scope, $routeParams, EvalSvc) {

					/**
					* Initializes the controller
					* @method initialize
					**/
					function initialize() {

						EvalSvc.report('#vizMetrics');
					}

					initialize();
				}
			]
		);
	}
);