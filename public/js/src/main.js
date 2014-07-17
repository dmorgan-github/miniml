// Require Configuration.
requirejs.config({
	paths: {
		log: '../../components/log/log',
		jquery: '../../components/jquery/dist/jquery',
		angular: '../../components/angular/angular',
		angularRoute: '../../components/angular-route/angular-route',
		angularGrid: '../../components/angular-grid/ng-grid-2.0.7.debug',
		angularBootstrap: '../../components/angular-bootstrap/ui-bootstrap-tpls',
		bootstrap: '../../components/bootstrap/dist/js/bootstrap',
		underscore: '../../components/underscore/underscore',
		moment: '../../components/momentjs/moment'
	},
	shim: {
		'jquery': {
			deps: [],
			exports: 'jquery',
			init: function () {
				'use strict';
				return this.$.noConflict();
			}
		},
		'log': {
			deps: [],
			exports: 'log'
		},
		'underscore': {
			deps: [

			],
			exports: '_',
			init: function () {
				'use strict';
				return this._.noConflict();
			}
		},
		'angular': {
			deps: ['jquery'],
			exports: 'angular'
		},
		'angularRoute': {
			deps: ['angular'],
			exports: 'angularRoute'
		},
		'angularGrid': {
			deps: ['angular'],
			exports: 'angularGrid'
		},
		'angularBootstrap': {
			deps: ['angular'],
			exports: 'angularBootstrap'
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: 'bootstrap'
		},
		'moment': {
			exports: 'moment'
		}
	}
});



require(
	[
		'app',
		'log',
		'router'
	],
	function (app, log) {
		'use strict';

		/**
		Initializes the application
		**/
		app.init();
	}
);