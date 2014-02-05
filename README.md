# builder-myth

[myth](http://myth.io) plugin for [component-builder2](https://github.com/component/builder2.js).


### API

- `myth(options)`

Currently `options` can take only `whitespace` boolean.

If `whitespace` is set to `true`, it will accept css with [significant whitespace](https://github.com/reworkcss/css-whitespace).


### Usage

```javascript
var Builder = require('component-builder2');
var Resolver = require('component-resolver');
var co = require('co');
var myth = require('builder-myth');

co(function* build() {
    var resolver = new Resolver(process.cwd(), {
        install: true
    });

    // resolve the dependency tree
    var tree = yield* resolver.tree();
    // lists the components in the proper build order
    var nodes = resolver.flatten(tree);

    // only include `.js` files from components' `.scripts` field
    var script = new Builder.scripts(nodes);
    script.use('scripts', Builder.plugins.js());

    // only include `.css` files from components' `.styles` field
    var style = new Builder.styles(nodes);
    style.use('styles', Builder.plugins.css());
    style.use('styles', myth());

    // Or with whitespace option
    // style.use('styles', myth({whitespace: true}));

    // write the builds to the following files in parallel
    yield [
        script.toFile('build.js'),
        style.toFile('build.css')
    ];
})();

```

### License
  MIT
