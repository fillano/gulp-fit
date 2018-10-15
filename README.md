[![Build Status](https://travis-ci.org/fillano/gulp-fit.svg?branch=master)](https://travis-ci.org/fillano/gulp-fit)
[![Coverage Status](https://coveralls.io/repos/github/fillano/gulp-fit/badge.svg?branch=master)](https://coveralls.io/github/fillano/gulp-fit?branch=master)

# gulp-fit

A simple gulp plugin for applying fit-template engine with gulp.

# usage

with a *fit-template* source like this (test.js):

```
var mode = '{{=$mode}}';
```

then a *gulpfile.js* file like this:

```
const fit = require('gulp-fit');
const gulp = require('gulp');

gulp.task('set_mode_debug', () => {
    return gulp.src('src/test.js')
        .pipe(fit({mode:'debug'}))
        .pipe(gulp.dest('build'));
});
```

then the *set_mode_debug* task will create a *test.js* file in the *build* directory with contents like this:

```
var mode = 'debug';
```

# fit-template

For more information about fit-template, please check it's github:

[https://github.com/fillano/fit](https://github.com/fillano/fit)
