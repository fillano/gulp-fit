const fit = require('fit-template');
const through = require('through2');
const PluginError = require('plugin-error');
const PLUGIN_NAME = 'gulp-fit';

module.exports = function(data) {
    return through.obj(function(file, enc, cb) {
        if(file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streaming not supported.'));
        }

        if(file.isBuffer()) {
            try {
                file.contents = Buffer.from(fit(file.contents.toString())(data), enc);
            } catch(e) {
                this.emit('error', new PluginError(PLUGIN_NAME, e.toString()));
            }
        }

        this.push(file);
        return cb();
    });
};
