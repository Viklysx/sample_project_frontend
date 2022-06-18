const {src, dest, parallel, watch, series} = require('gulp');
const {join} = require('path');
const less = require('gulp-less');
const imagemin = require('gulp-imagemin');
const minifyCSS = require('gulp-csso');
const browserSync = require('browser-sync').create();
const rimraf = require('rimraf');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const jsOrder = require('./src/scripts/order.js');
const nunjucks = require('gulp-nunjucks');
const _nunjucks = require('nunjucks');
const gulp = require('gulp');
const webpack = require('webpack-stream');

let isProd = false;

function htmlTask() {
    const compileOptions = {
        
    }
    return src(['index.html', 'login.html'].map(s => join('src', s)))
        .pipe(nunjucks.compile(undefined, {
            env: new _nunjucks.Environment(new _nunjucks.FileSystemLoader(join(__dirname, 'src')), compileOptions),
            ...compileOptions
        }))
        .pipe(rename(path => path.dirname = ''))
        .pipe(dest('dist'));
}

function cssTask() {
    return src(['index.less'].map(s => join('src/styles', s)))
        .pipe(less())
        .pipe(gulpif(() => isProd, minifyCSS()))
        .pipe(rename(path => path.dirname = ''))
        .pipe(dest('dist/css'));
}

function imgTask() {
    return src('src/img/*')
        .pipe(gulpif(() => isProd, imagemin()))
        .pipe(dest('dist/img'));
}

function webpackTask() {
    return gulp.src('src/scripts/index.js')
        .pipe(webpack({
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ],
            },
        }))
        .pipe(gulp.dest('dist/'));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch('src/img/*', imgTask);
    watch('src/styles/**/*.less', cssTask);
    watch('src/**/*.html', htmlTask);
    watch('src/scripts/**/*.js', webpackTask);

    watch("dist/**/*")
        .on('change', browserSync.reload);
}

function clean(cb) {
    rimraf('./dist', cb);
}

function enableProd(cb) {
    isProd = true;
    cb();
}

module.exports = {
    serve: series(
        clean,
        parallel(
            htmlTask,
            cssTask,
            imgTask,
            webpackTask
        ),
        serve
    ),
    default: series(
        enableProd,
        clean,
        parallel(
            htmlTask,
            cssTask,
            imgTask,
            webpackTask
        )
    )
};