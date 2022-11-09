const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
gulp.task('server', function() {

	browserSync({
		server: {
			baseDir: "src/pages/main/"
		}
	});

	gulp.watch("src/pages/*.html").on('change', browserSync.reload);
});
gulp.task('sass', function() {
    return gulp.src('src/pages/main/sass/*.scss') 
        .pipe(sass())
        .pipe(gulp.dest('src/pages/main/css/'))
        .pipe(browserSync.stream());
})

    
gulp.task('watch', function(){
    gulp.watch("src/pages/main/sass/*.+(scss|sass)", gulp.parallel('sass'));
});
gulp.task('default', gulp.parallel('watch', 'server', 'sass'));