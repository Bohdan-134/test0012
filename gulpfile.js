const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const webp = require('gulp-webp');
const svgSprite = require('gulp-svg-sprite');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const fontmin = require('gulp-fontmin');
const del = require('del');

// Задача для Pug
gulp.task('pug', function() {
  return gulp.src(['src/**/*.pug', '!src/components/**'])
    .pipe(pug())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({ once: true }));
});

// Задача для SCSS
gulp.task('scss', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Задача для шрифтов
gulp.task('fonts', function() {
  return gulp.src('src/fonts/*.{ttf,otf,woff,woff2,eot,svg}')
    .pipe(fontmin())
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.stream());
});

// Задача для JS
gulp.task('js', function() {
  return gulp.src(['src/js/**/*.js', 'src/js/components/**/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});

// Задача для WebP
gulp.task('webp', function() {
  return gulp.src('src/images/**/*.{png, jpg}')
    .pipe(webp())
    .pipe(gulp.dest('dist/images'))
    .pipe(browserSync.stream());
});

// Задача для SVG спрайтов
gulp.task('sprite', function() {
  return gulp.src('src/svg/*.svg')
    .pipe(svgSprite())
    .pipe(gulp.dest('dist/svg'))
    .pipe(browserSync.stream());
});

// Задача для favicon.ico
gulp.task('favicon', function() {
  return gulp.src('src/favicon.ico')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

// Задача для сервера
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  // Наблюдение за файлами
  gulp.watch('src/**/*.pug', gulp.series('pug'));
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/fonts/*.{ttf,otf,woff,woff2,eot,svg}', gulp.series('fonts'));
  gulp.watch('src/js/*.js', gulp.series('js'));
  gulp.watch('src/img/*', gulp.series('webp'));
  gulp.watch('src/svg/*.svg', gulp.series('sprite'));
  gulp.watch('src/favicon.ico', gulp.series('favicon'));
});

// Задача для удаления всего в dist при изменении файлов
gulp.task('clean', function() {
  return del(['dist']);
});

// Задача по умолчанию
gulp.task('default', gulp.series('clean', 'pug', 'scss', 'fonts', 'js', 'webp', 'sprite', 'favicon', 'serve'));