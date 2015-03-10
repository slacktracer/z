'use strict';
(function (
    eslint,
    gulp,
    jscs
) {
    let pathTo = {
        self: [
            'gulpfile.js'
        ],
        client: {
            html: [
                'public/**/*.html',
                '!public/3rd-party{,/**}'
            ],
            css: [
                'public/**/*.css',
                '!public/3rd-party{,/**}'
            ],
            js: [
                'public/**/*.js',
                '!public/3rd-party{,/**}'
            ]
        },
        server: {
            js: [
                'main.js',
                'controllers/**/*.js',
                'models/**/*.js',
                'modules/**/*.js',
                'routes/**/*.js'
            ]
        }
    };
    gulp.task(
        'self',
        function () {
            return gulp
                .src(pathTo.self)
                .pipe(eslint())
                .pipe(eslint.format())
                .pipe(eslint.failOnError());
        }
    );
    gulp.task(
        'eslint-server',
        function () {
            return gulp
                .src(pathTo.server.js)
                .pipe(eslint())
                .pipe(eslint.format())
                .pipe(eslint.failOnError());
        }
    );
    gulp.task(
        'jscs-server',
        function () {
            return gulp
                .src(pathTo.server.js)
                .pipe(jscs());
        }
    );
    gulp.task(
        'eslint-client',
        function () {
            return gulp
                .src(pathTo.client.js)
                .pipe(eslint())
                .pipe(eslint.format())
                .pipe(eslint.failOnError());
        }
    );
    gulp.task(
        'jscs-client',
        function () {
            return gulp
                .src(pathTo.client.js)
                .pipe(jscs());
        }
    );
    gulp.task(
        'default',
        [
            'self',
            'eslint-server',
            // 'jscs-server',
            'eslint-client',
            'jscs-client'
        ],
        function () {
        }
    );
}(
    require('gulp-eslint'),
    require('gulp'),
    require('gulp-jscs')
));
