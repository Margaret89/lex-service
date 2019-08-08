var gulp = require('gulp'); //Подключаем Gulp
var sass = require('gulp-sass'); //Подключаем Sass пакет
var spritesmith = require('gulp-spritesmith');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rigger = require('gulp-rigger');
var svgSprite = require('gulp-svg-sprite');
var svgmin = require('gulp-svgmin');
var cheerio = require('gulp-cheerio');
var replace = require('gulp-replace');


var paths = {
	sass_src: './app/sass/*.scss',
	sass_watch: ['./app/sass/*', './app/sass/*/*'],
	sass_res: './public/css',

	html_src: './app/template/content/*.html',
	html_res: './public',

	assetsDir: './app/',
};

// HTML
gulp.task('html', done => {
    gulp.src(paths.html_src)
        .pipe(rigger())
        .pipe(gulp.dest(paths.html_res))
        done();
});

// Sass
gulp.task('sass', done => {
	gulp.src(paths.sass_src)
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(autoprefixer({}))
		// .pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest(paths.sass_res));
		done();
});

// Svg
gulp.task('svgSpriteBuild', done => {
	return gulp.src(paths.assetsDir + 'i/icons/*.svg')
	// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			}
		}))
		// remove all fill, style and stroke declarations in out shapes
		.pipe(cheerio({
			run: function ($) {
				$('[fill]').removeAttr('fill');
				$('[stroke]').removeAttr('stroke');
				$('[style]').removeAttr('style');
			},
			parserOptions: {xmlMode: true}
		}))
		// cheerio plugin create unnecessary string '&gt;', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
			mode: {
				symbol: {
					sprite: "../sprite.svg",
					render: {
						scss: {
							dest:'../../../sass/_sprite.scss',
							template: paths.assetsDir + "sass/templates/_sprite_template.scss"
						}
					}
				}
			}
		}))
		.pipe(gulp.dest(paths.assetsDir + 'i/sprite/'));
});

// js
// gulp.task('js', function() {
// 	gulp.src(paths.js_src)
// 		.pipe(concat(paths.js_name))
// 		.pipe(uglify())
// 		.pipe(gulp.dest(paths.js_folder));
// });


// watch
gulp.task('watch',  done => {
	gulp.watch(paths.sass_watch, gulp.series('sass'));
	// gulp.watch(paths.js_src, ['js']);
	gulp.watch(paths.html_src,  gulp.series('html'));
	done();
});


// Default
gulp.task('default', done => {
	gulp.run('html', 'sass');
	done();
});