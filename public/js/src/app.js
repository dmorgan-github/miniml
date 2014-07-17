define(
	[
		'log',
		'jquery',
		'underscore',
		'angular',
		'angularRoute',
		'angularGrid',
		'angularBootstrap'
	],
	function (log, $, _, angular) {
		'use strict';

		var app = {

			miniml: angular.module('miniml', ['ngRoute', 'ngGrid', 'ui.bootstrap']),

			init: function () {
				angular.bootstrap(document, ['miniml']);
			}
		};

		return app;
	}
);

