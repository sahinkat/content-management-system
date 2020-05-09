const sass = require('node-sass');
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: { livereload: true },
			scss: {
				files: ['views/sass/**/*.sass', 'views/sass/**/*.scss'],
				tasks: ['sass', 'postcss'],
				options: {
					interrupt: true
				}
			},
			pug: {
				files: ['views/pug/**/*.pug'],
				tasks: ['pug'],
				options: {
					interrupt: true
				}
			}
		},
		pug: {
			compile: {
				options: {
					pretty: true
				}
			}
		},
		sass: {
			dist: {
				options: {
					implementation: sass,
					outputStyle: 'expanded',
					sourceMap: false
				},
				files: [{
					expand: true,
					cwd: 'views/sass/',
					src: ['*.scss'],
					dest: 'public/css/',
					ext: '.css'
				}]
			}
		},
		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')
				]
			},
			dist: {
				src: ['public/css/*.css']
			}
		}
	});

	// Load the Grunt plugins.
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Set task aliases
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['pug','sass','postcss']);
};
