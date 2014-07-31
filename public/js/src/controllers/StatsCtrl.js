define(
	[
		'app',
		'angular',
		'underscore',
		'jquery'
	],
	function (app, angular, _, $) {
		'use strict';

		/**
		* Represents a Stats Controller
		* @class StatsCtrl
		* @constructor
		**/
		app.miniml.controller(
			'StatsCtrl',
			[
				'$scope',
				'$routeParams',
				function ($scope, $routeParams) {

					/**
					* Initializes the controller
					* @method initialize
					**/
					function initialize() {


					}

					initialize();
				}
			]
		);
	}
);