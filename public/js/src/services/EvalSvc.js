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
									var header = {height: (square/4), width: square};
									var rowHeader = {height: square, width: (square/4)};
									var colTitleHeight = header.height;
									var rowTitleWidth = rowHeader.width + (0.5 * rowHeader.width);
									var footerRowHeight = colTitleHeight;
									var footerHeight = footerRowHeight * 3;
									var classes = cm.length;

									var matrixWidth = (square + cellpadding) * classes;
									var matrixHeight = matrixWidth;
									var matrixX = (rowHeader.width + rowTitleWidth);
									var matrixY = (colTitleHeight + header.height);
									var matrixBottom = matrixY + matrixHeight;

									var height = matrixHeight;
									height += header.height;
									height += colTitleHeight;
									height += footerHeight;

									var width = matrixWidth;
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

									////////////////////
									// Rows title
									////////////////////
									var x = (matrixWidth/2) + matrixX;
									viz.append('g')
										.attr('transform', 'translate(' + x + ',0)')
										.append('text')
										.text('Predicted')
										.attr("text-anchor", "middle")
										.attr('y', colTitleHeight/2);

									////////////////////
									// Columns title
									////////////////////
									var y = (matrixHeight/2) + matrixY;
									viz.append('g')
										.attr('transform', 'translate(0,' + y + '),rotate(-90)')
										.append('text')
										.text('Actual')
										.attr("text-anchor", "middle")
										.attr('x', 0)
										.attr('y', rowTitleWidth/2);

									////////////////////
									// classes
									////////////////////
									var ch = viz.append('g')
										.attr('transform', 'translate(' + matrixX + ',' + colTitleHeight + ')');

									var rh = viz.append('g')
										.attr('transform', 'translate(' + rowTitleWidth + ',' + matrixY + ')');
									for (var i = 0; i < classes; i ++){

										ch.append('g')
											.attr('transform', 'translate(' + (header.width * i) + ',0)')
											.append('text')
											.text(i)
											.attr("text-anchor", "middle")
											.attr('x', header.width/2)
											.attr('y', header.height/2);

										rh.append('g')
											.attr('transform', 'translate(0,' + (rowHeader.height * i) + ')')
											.append('text')
											.text(i)
											.attr("text-anchor", "middle")
											.attr('x', rowHeader.width/2)
											.attr('y', rowHeader.height/2);
									}

									////////////////////
									// matrix
									////////////////////
									var table = viz.append('g')
										.attr('transform', 'translate(' + matrixX + ',' + matrixY + ')');

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
									// f1 footer
									////////////////////
									y = matrixBottom + footerRowHeight;
									viz.append('g')
										.attr('transform', 'translate(0,' + y + ')')
										.append('text')
										.text('F1:')
										.attr("text-anchor", "start");

									viz.append('g')
										.attr('transform', 'translate(' + matrixX + ',' + y + ')')
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

									////////////////////
									// recall footer
									////////////////////
									y += footerRowHeight;
									viz.append('g')
										.attr('transform', 'translate(0,' + y + ')')
										.append('text')
										.text('Recall:')
										.attr("text-anchor", "start");

									viz.append('g')
										.attr('transform', 'translate(' + matrixX + ',' + y + ')')
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

									////////////////////
									// precision footer
									////////////////////
									y += footerRowHeight;
									viz.append('g')
										.attr('transform', 'translate(0,' + y + ')')
										.append('text')
										.text('Precision:')
										.attr("text-anchor", "start");

									viz.append('g')
										.attr('transform', 'translate(' + matrixX + ',' + y + ')')
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
