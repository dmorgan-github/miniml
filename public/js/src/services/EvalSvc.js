define(
	[
		'app',
		'angular',
		'underscore',
		'jquery',
		'resources/MetricsRsc',
		'd3'
	],
	function (app, angular, _, $) {
		'use strict';

		/**
		The service for model evaluation metrics
		@class EvalSvc
		@return {Object} Returns the current instance
		**/
		app.miniml.factory(
			'EvalSvc',
			[
				'$http',
				'MetricsRsc',
				function ($http, MetricsRsc) {

					var resource = {

						/**
						@method get fetches metrics from endpoint
						@return {Object} Returns an async callback
						**/
						report: function (elem) {

							MetricsRsc.get()
								.then(function (result) {

									var data = result.data;
									var matrix = data.confusion_matrix;
									var f1 = data.f1;
									var precision = data.precision;
									var recall = data.recall;
									var support = data.support;

									var cm = [];
									for (var i = 0; i < matrix.length; i ++) {
										var cells = matrix[i]
										var row = [];
										for (var k = 0; k < cells.length; k ++) {

											var positive = i == k;
											var obj = {val:cells[k], positive:positive};
											row.push(obj);
										}
										cm.push(row);
									}

									var cellpadding = 1;
									var square = 100;
									var header = {height:50, width:square};
									var rowHeader = {height:square, width:25};
									var colTitleHeight = 25;
									var rowTitleWidth = 45;
									var footerRowHeight = 30;
									var footerHeight = footerRowHeight * 3;
									var rows = cm.length;
									var cols = cm[0].length;

									var width = (square + cellpadding) * cols;
									var height = (square + cellpadding) * rows;
									height += header.height;
									height += colTitleHeight;
									height += footerHeight;
									width += rowHeader.width;
									width += rowTitleWidth;

									var svg = d3.select(elem)
										.style('width', width + 'px')
										.style('height', height + 'px')
										.append('svg:svg')
										.attr('width', width)
										.attr('height', height);

									//visualization container
									var viz = svg.append('g');

									viz.append('g')
										.append('text')
										.text('Predicted')
										.attr("text-anchor", "middle")
										.attr('x', (width + rowHeader.width)/2)
										.attr('y', colTitleHeight/2);

									viz.append('g')
										.attr('transform', 'translate(0,' + (height + colTitleHeight)/2 + '),rotate(-90)')
										.append('text')
										.text('Actual')
										.attr("text-anchor", "middle")
										.attr('x', 0)
										.attr('y', rowTitleWidth/2);

									var y = colTitleHeight;
									var x = rowTitleWidth + rowHeader.width;

									var ch = viz.append('g')
										.attr('transform', 'translate(' + x + ',' + y + ')');
									for (var i = 0; i < cols; i ++){

										ch.append('g')
											.attr('transform', 'translate(' + (header.width * i) + ',0)')
											.append('text')
											.text(i)
											.attr("text-anchor", "middle")
											.attr('x', header.width/2)
											.attr('y', header.height/2);
									}

									x = rowTitleWidth;
									y += header.height;
									var rh = viz.append('g')
										.attr('transform', 'translate(' + x + ',' + y + ')');
									for (var i = 0; i < rows; i ++){

										rh.append('g')
											.attr('transform', 'translate(0,' + (rowHeader.height * i) + ')')
											.append('text')
											.text(i)
											.attr("text-anchor", "middle")
											.attr('x', rowHeader.width/2)
											.attr('y', rowHeader.height/2);
									}

									x += rowHeader.width;
									var table = viz.append('g')
										.attr('transform', 'translate(' + x + ',' + y + ')');

									var row = table.selectAll('g.row')
										.data(cm)
										.enter()
										.append('g')
										.attr('class', 'row')
										.attr('transform', function (d, i) {
											return 'translate(0,' + (square * i) + ')';
										});

									var cell = row.selectAll('g.cell')
										.data(function(d){return d;})
										.enter()
										.append('g')
										.attr('class', 'cell')
										.style('opacity', 1)
										.attr('transform', function(d,i) {
											return 'translate('+ (square * i) +',0)';
										});

									cell.append('svg:rect')
										.attr('class', 'cell')
										.attr('width', (square - cellpadding))
										.attr('height', (square - cellpadding))
										.style('fill', function (d) {
											if (d.positive) {
												return '#0f0';
											} else {
												return '#f00';
											}
										});

									cell.append('text')
										.text(function (d) {
											return d.val;
										})
										.attr("text-anchor", "middle")
										.attr('x', square/2)
										.attr('y', square/2);

									////////////////////

									y = height - footerHeight;
									y += footerRowHeight;
									viz.append('g')
										.attr('transform', 'translate(0,' +  y + ')')
										.append('text')
										.text('F1:')
										.attr("text-anchor", "start");

									viz.append('g')
										.attr('transform', 'translate(' + x + ',' +  y + ')')
										.selectAll('g.footer')
										.data(f1)
										.enter()
										.append('g')
											.attr('class', 'footer')
											.attr('transform', function (d,i) {
												return 'translate(' +  (square * i) + ',0)';
											})
											.append('text')
											.text(function (d) {
												return parseFloat(d).toFixed(3);
											})
											.attr('x', square/2)
											.attr("text-anchor", "middle");

									y += footerRowHeight;
									viz.append('g')
										.attr('transform', 'translate(0,' +  y + ')')
										.append('text')
										.text('Recall:')
										.attr("text-anchor", "start");

									viz.append('g')
										.attr('transform', 'translate(' + x + ',' +  y + ')')
										.selectAll('g.footer')
										.data(recall)
										.enter()
										.append('g')
											.attr('class', 'footer')
											.attr('transform', function (d,i) {
												return 'translate(' +  (square * i) + ',0)';
											})
											.append('text')
											.text(function (d) {
												return parseFloat(d).toFixed(3);
											})
											.attr('x', square/2)
											.attr("text-anchor", "middle");

									y += footerRowHeight;
									viz.append('g')
										.attr('transform', 'translate(0,' +  y + ')')
										.append('text')
										.text('Precision:')
										.attr("text-anchor", "start");

									viz.append('g')
										.attr('transform', 'translate(' + x + ',' +  y + ')')
										.selectAll('g.footer')
										.data(precision)
										.enter()
										.append('g')
											.attr('class', 'footer')
											.attr('transform', function (d,i) {
												return 'translate(' +  (square * i) + ',0)';
											})
											.append('text')
											.text(function (d) {
												return parseFloat(d).toFixed(3);
											})
											.attr('x', square/2)
											.attr("text-anchor", "middle");

								});

						}
					};

					return resource;
				}
			]
		);
	}
);
