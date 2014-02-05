/**
 * Module dependencies
 */

var fs = require('co-fs');
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

  return function* (file){
    
    var css = yield fs.readFile(file.filename, 'utf8');
    var rwk;
    var res;

    if(options.whitespace) css = whitespace(css);


    try{
      debug('Compiling css on myth: %s', file.filename);
      res = rework(css).use(myth()).toString();
    } catch (err){
      throw err;
    }

    file.extention = 'css';
    file.string = res;

  };

};
