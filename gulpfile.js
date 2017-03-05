/**
 * Created by Jennifer on 2017/3/5.
 */
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
  return gulp.src('src/app.js') //该任务针对的文件
    .pipe(babel({
      presets: ['es2015']
    })) //该任务调用的模块
    .pipe(gulp.dest('dist')); //将会在dist文件下生成app.js文件
});
