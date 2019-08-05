const assert = require('chai').assert;
const fit = require('../');
const Vinyl = require('vinyl');
const fs = require('fs');

describe('gulp-fit tests', () => {
    it('simple string replacement', done => {
        let output = new Vinyl({
            path: 'test/expected/simpleStringReplace.js',
            cwd: 'test/',
            base: 'test/expected',
            contents: fs.readFileSync('test/expected/simpleStringReplace.js')
        });
        let src = new Vinyl({
            path: 'test/fixtures/simpleStringReplace.js',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: fs.readFileSync('test/fixtures/simpleStringReplace.js')
        });
        let stream = fit({mode: 'debug'});
        stream.on('error', error => {
            assert.notEqual(error, null, 'on error, error should not be null.');
            done(error);
        });
        stream.on('data', result => {
            assert.notEqual(result, null, 'result should not be null.');
            assert.notEqual(result, undefined, 'result should not be undefined.');
            assert.notEqual(result.contents, null, 'contents should not be null.');
            assert.notEqual(result.contents, undefined, 'contents should not be undefined.');
            assert.equal(String(result.contents), String(output.contents), 'output should be as expected.');
            done();
        });
        stream.write(src);
        stream.end();
    });
    it('pass stream not supported test', done => {
        let output = new Vinyl({
            path: 'test/expected/simpleStringReplace.js',
            cwd: 'test/',
            base: 'test/expected',
            contents: fs.readFileSync('test/expected/simpleStringReplace.js')
        });
        let src = new Vinyl({
            path: 'test/fixtures/simpleStringReplace.js',
            cwd: 'test/',
            base: 'test/fixtures',
            contents: fs.createReadStream('test/fixtures/simpleStringReplace.js')
        });
        let stream = fit({mode: 'debug'}); 
        stream.on('error', error => {
            assert.equal(error.message, 'Streaming not supported.', 'passing stream should raise error.');
            done();
        });
        stream.write(src);
        stream.end();
    });
    it('invalid input shall trigger try catch', done => {
        let output = new Vinyl({
            path: 'test/expected/simpleStringReplace.js',
            cwd: 'test/',
            base: 'test/expected',
            contents: fs.readFileSync('test/expected/simpleStringReplace.js')
        });
        let src = Object.create(Object.prototype, {
            path: {value: 'test/fixtures/simpleStringReplace.js'},
            cwd: {value: 'test/'},
            base: {value: 'test/fixtures'},
            isNull: {value: () => false},
            isStream: {value: () => false},
            isBuffer: {value: () => true},
            contents: {
                get: () => {
                    throw new Error('New Error');
                }
            }
        });
        let stream = fit({mode: 'debug'});
        stream.on('error', error => {
            assert.equal(error.message, 'Error: New Error', 'fail shall reaise New Error error.');
            done();
        });
        stream.write(src);
        stream.end();
    });
});