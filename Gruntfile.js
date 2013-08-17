module.exports = function( grunt ) {

	'use strict';

	// Project configuration
	grunt.initConfig( {
		pkg: grunt.file.readJSON( "package.json" ),
		jshint: {
			build: {
				files: {
					src: [ "src/script.js" ]
				},
				options: {
					jshintrc: "src/.jshintrc"
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
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-git-authors" );

	grunt.registerTask( "build", [ "jshint:build", "concat:build" ] );

	// Default task(s)
	grunt.registerTask( "default", [ "build", "uglify:dist", "concat:dist" ] );

};
