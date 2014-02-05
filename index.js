/**
 * Module dependencies
 */
var fs = require('fs');
var myth = require('myth');
var rework = require('rework');
var debug = require('debug')('builder:myth');
var whitespace = require('css-whitespace');

/**
 * [myth](http://myth.io) plugin for builder2
 * Currently it will only take `whitespace` as option.
 *
 * @param {Object} options 
 * @return {GeneratorFunction}
 * @api public
 */

exports = module.exports = function (options) {

  options = options || {};

  return function (file, done){
    
    var css = fs.readFileSync(file.filename, 'utf8');
    var rwk;
    var res;

    if(options.whitespace) css = whitespace(css);

    try{
      debug('Compiling css on myth: %s', file.filename);
      res = rework(css).use(myth()).toString();
    } catch (err){
      done(err);
    }

    file.extention = 'css';
    file.string = res;

    done();
  };

};
