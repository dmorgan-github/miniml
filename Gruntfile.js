
// Grunt.
module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		// Lint task.
		// Enforces JavaScript coding standards.
		jshint: {

			options: {
	            jshintrc: './.jshintrc'
	        },

			all: [
				'./public/js/src/**/*.js'
			]
		},

		// Uglify task.
		// Optimize & compress JavaScript library files.
		uglify: {
			options: {
				compress: true,
				mangle: false,
				preserveComments: false,
				preserveLicenseComments: true
			},
			lib: {
				files: {
					'public/js/min/require.min.js': ['public/js/components/requirejs/require.js']
				}
			}
		},

		// Require task.
		// Optimize & compress JavaScript source files.
		requirejs: {
			compile: {
				options: {
					baseUrl: './public/js/src',
					mainConfigFile: './public/js/src/main.js',
					out: './public/js/min/main.min.js',
					name: 'main',
					optimize: 'uglify',
					uglify: {
						preserveComments: false,
						preserveLicenseComments: true
					}
				}
			}
		},

        // Less task.
		// Compiles less files into css.
		less: {
			'default': {
				files: {
					'public/css/app.css': 'public/less/app.less'
				},
				options: {
					compress: true
				}
			}
		},

		// Documentation.
		yuidoc: {
			'default': {
				name: '<%= pkg.name %>',
				options: {
					paths: [
      					'./'
				    ],
				    exclude: 'public,config,test,views,node_modules',
					outdir: './docs/<%= pkg.name %>'
				}
			}
		},

		copy: {
	      build: {
	        cwd: '.',
	        src: [
	        	'public/css/**',
	        	'public/js/min/**',
	        	'public/components/**',
	        	'public/templates/**',
	        	'public/fonts/**',
	        	'public/images/**',
	        	'views/**'
	        ],
	        dest: './build/<%= pkg.name %>',
	        expand: true
	      },
	    },

	    clean: {
		  build: {
		  	options: {
		  		force: true
		  	},
		    src: [
		    	'./build/<%= pkg.name %>',
		    	'./publish/<%= pkg.name %>.zip'
		    ]
		  },
		  package: {
		  	options: {
		  		force: true
		  	},
		  	src: [
		  		'./build/<%= pkg.name %>/node_modules/grunt*'
		  	]
		  }
		},

		compress: {
		  main: {
		    options: {
		      archive: './publish/<%= pkg.name %>.zip'
		    },
		    expand: true,
		    cwd: './build/<%= pkg.name %>',
		    src: ['**']
		  }
		},

	    bump: {
		  options: {
		    files: ['package.json'],
		    commit: true,
		    commitMessage: 'Release API v%VERSION%',
		    commitFiles: ['package.json'], // '-a' for all files
		    createTag: true,
		    tagName: 'api-v%VERSION%',
		    tagMessage: 'API Version %VERSION%',
		    push: true,
		    pushTo: 'origin'/*,
		    gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'*/ // options to use with '$ git describe'
		  }
		},

	    watch: {
            files: "./public/less/**",
            tasks: ["less:default"]
        }

	});

	grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bump');

	// Default task(s).
	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('build', ['jshint','clean:build', 'requirejs', 'less']);
	grunt.registerTask('package', ['jshint', 'bump:build', 'clean:build', 'requirejs', 'less', 'copy', 'clean:package','compress']);
	//grunt.registerTask('package2', ['jshint', 'mochaTest', 'clean:build', 'requirejs', 'less', 'copy', 'clean:package','compress']);
};