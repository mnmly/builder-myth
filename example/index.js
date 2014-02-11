/**
 * Module dependencies
 */

var co = require('co');
var fs = require('co-fs');
var mkdir = require('mkdirp');
var Builder = require('component-builder2');
var Resolver = require('component-resolver');
var myth = require('./../');

/**
 * Bundled Build
 */

co(function* build() {

  var resolver = new Resolver(process.cwd(), {
    install: true
  });
  
  // resolve the dependency tree
  var tree = yield* resolver.tree();

  for(var k in tree.locals){

    var bundle = k;

    // lists the components in the proper build order
    var nodes = resolver.flatten(tree.locals[k]);

    // mkdir -p
    mkdir.sync('build/' + bundle);

    // only include `.js` files from components' `.scripts` field
    var script = new Builder.scripts(nodes);
    script.use('scripts', Builder.plugins.js());

    // only include `.css` files from components' `.styles` field
    var style = new Builder.styles(nodes);
    style.use('styles', Builder.plugins.css());
    style.use('styles', myth({whitespace: true, sourcemap: true}));

    // write the builds to the following files in parallel
    yield [
      script.toFile('build/' + bundle + '/build.js'),
      style.toFile('build/' + bundle + '/build.css')
    ];

  }

})();
