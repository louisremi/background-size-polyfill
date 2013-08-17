module.exports = function( grunt ) {

	"use strict";

	var gzip = require( "gzip-js" );

	// Project configuration
	grunt.initConfig( {
		pkg: grunt.file.readJSON( "package.json" ),
		jsonlint: {
			pkg: {
				src: [ "package.json" ]
			}
		},
		jshint: {
			grunt: {
				src: [ "Gruntfile.js" ],
				options: {
					jshintrc: ".jshintrc"
				}
			},
			build: {
				src: [ "src/script.js" ],
				options: {
					jshintrc: "src/.jshintrc"
				}
			},
			test: {
				src: [ "test/test.js" ],
				options: {
					jshintrc: "test/.jshintrc"
				}
			}
		},
		concat: {
			options: {
				banner: "<!-- <%= pkg.name %> v<%= pkg.version %> | " +
					"(c) 2012-2013 <%= pkg.author.name %> | " +
					"MIT License -->\n"
			},
			build: {
				files: {
					"backgroundsize.htc": [
						"src/intro.htc",
						"src/script.js",
						"src/outro.htc"
					]
				}
			},
			dist: {
				files: {
					"backgroundsize.min.htc": [
						"src/intro.htc",
						"build/script.min.js",
						"src/outro.min.htc"
					]
				},
				options: {
					separator: ""
				}
			}
		},
		uglify: {
			dist: {
				files: {
					"build/script.min.js": [ "src/script.js" ]
				},
				options: {
					report: "min",
					beautify: {
						ascii_only: true
					},
					compress: {
						hoist_funs: false,
						join_vars: false,
						loops: false,
						unused: false
					}
				},
			}
		},
		compare_size: {
			files: [
				"backgroundsize.htc",
				"backgroundsize.min.htc"
			],
			options: {
				compress: {
					gz: function( contents ) {
						return gzip.zip( contents, {} ).length;
					}
				},
				cache: "build/.sizecache.json"
			}
		},
		watch: {
			files: [
				"<%= jshint.grunt.src %>",
				"<%= jshint.build.src %>",
				"src/*.htc",
				"<%= jshint.test.src %>"
			],
			tasks: "build"
		}
	} );

	// Load tasks from NPM packages
	grunt.loadNpmTasks( "grunt-jsonlint" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-compare-size" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-git-authors" );

	grunt.registerTask( "build", [
		"jshint",
		"concat:build"
	] );

	// Default task(s)
	grunt.registerTask( "default", [
		"jsonlint",
		"build",
		"uglify:dist",
		"concat:dist",
		"compare_size"
	] );

};
