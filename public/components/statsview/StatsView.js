this.StatsView = (function(_, jStat){

	// StatsView constructor
	function StatsView(){
		this.queue = [];
	}

	StatsView.prototype = {

		from: function(data, success) {

			while(this.queue.length){
				data = this.queue.shift()(data);
			}
			success(new SeriesView(data));
		},

		where: function(props) {

			function f(props){

				return function(data) {

					if (_(props).isNull() || _(props).isEmpty()){
						return data;
					}
					return _(data).where(props);
				}
			}

			this.queue.push(f(props));
			return this;
		},

		filter: function(func) {

			function f(func){

				return function(data) {

					if (!_(func).isFunction()){
						return data;
					}
					return _(data).filter(func);
				}
			}

			this.queue.push(f(func));
			return this;
		},

		groupBy: function(columns) {

			if (!_(columns).isArray()) {
				columns = [columns];
			}

			function $groupBy (obj, values, context) {

				if (!values.length) {
					return obj;
				}

				var group = _.groupBy(obj, values[0], context);
				var rest = values.slice(1);

				for (var prop in group) {
					group[prop] = $groupBy(group[prop], rest, context);
				}

				var rows = [];
				var r = _(group).each(function(value, key, list) {

					var obj = {key: key, values: value};
					rows.push(obj);
				});
				return rows;
			}

			function f(columns) {

				return function(data) {

					return $groupBy(data, columns);
				}
			}

			this.queue.push(f(columns));
			return this;
		}

	};

	function SeriesView(data) {
		this.data = data;
	}

	SeriesView.prototype = {

		calculate: function(calc, func) {

			var result = [];
			_(this.data).each(function(row) {

				var vals = _(row.values).map(function(d){
					return +func(d);
				});

				if (calc === 'count'){
					// HACK
					result.push(vals.length);
				} else {
					result.push(jStat(vals)[calc]());
				}
			});

			return result;
		},

		keys: function() {

			var vals = _(this.data).map(function(d){
				return d.key;
			});

			return vals;
		}
	};

	// return the module
	return function factory() {

		return new StatsView();
	}
})(_, jStat);