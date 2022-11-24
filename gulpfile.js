const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
gulp.task('server', function() {

	browserSync({
		server: {
			baseDir: "src/pages/main/"
		}
	});

	// gulp.watch("src/pages/*.html").on('change', browserSync.reload);
});
gulp.task('sassMain', function() {
    return gulp.src('src/pages/main/sass/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('src/pages/main/css/'))
        .pipe(browserSync.stream());
})
gulp.task('sassPets', function() {
    return gulp.src('src/pages/pets/sass/*.scss') // Gets all files ending with .scss in app/scss and children dirs
        .pipe(sass())
        .pipe(gulp.dest('src/pages/pets/css/'))
        .pipe(browserSync.stream());
})

    
gulp.task('watch', function(){
    gulp.watch("src/pages/main/sass/*.+(scss|sass)", gulp.parallel('sassMain'));
    gulp.watch("src/pages/pets/sass/*.+(scss|sass)", gulp.parallel('sassPets'));
});
gulp.task('default', gulp.parallel('watch', 'server', 'sassMain', 'sassPets'));