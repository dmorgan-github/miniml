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
		The resource for model evaluation metrics
		@class MetricsRsc
		@return {Object} Returns the current instance
		**/
		app.miniml.factory(
			'MetricsRsc',
			[
				'$http',
				function ($http) {

					var resource = {

						/**
						@method get fetches metrics from endpoint
						@return {Object} Returns an async callback
						**/
						get: function () {

							return $http.get('/api/ml/metrics/report');
						}
					};

					return resource;
				}
			]
		);
	}
);
