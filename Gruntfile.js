module.exports = function( grunt ) {

	"use strict";

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
			build: {
				files: {
					"backgroundsize.htc": [ "src/intro.htc", "src/script.js", "src/outro.htc" ]
				}
			},
			dist: {
				files: {
					"backgroundsize.min.htc": [ "src/intro.htc", "build/script.min.js", "src/outro.min.htc" ]
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
		}
	} );

	// Load tasks from NPM packages
	grunt.loadNpmTasks( "grunt-jsonlint" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-git-authors" );

	grunt.registerTask( "build", [ "jshint", "concat:build" ] );

	// Default task(s)
	grunt.registerTask( "default", [ "jsonlint", "build", "uglify:dist", "concat:dist" ] );

};
