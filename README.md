# `fs-monkey`

[![][npm-img]][npm-url]

Monkey-patches for filesystem related things. Rewrite `require` function,
load Node's modules from memory. Or rewrite the whole `fs` filesystem module.

**Terms**

An *fs-like* object is an object that implements methods of Node's
[filesystem API](https://nodejs.org/api/fs.html).
It is denoted as `vol`:

```js
let vol = {
    readFile: () => { /* ... */ },
    readFileSync: () => { /* ... */ },
    // etc...
}
```


`fs-monkey` **API**

 - [`patchFs(vol[, fs])`](#patchfsvol-fs) - rewrites Node's filesystem module `fs` with *fs-like* object `vol`
 - [`patchRequire(vol[, Module])`](#patchrequirevol-module) - rewrites `require` function, patches Node's `module` module to use a give *fs-like* object `vol` for module loading


# `patchFs(vol[, fs])`

Rewrites Node's filesystem module `fs` with *fs-like* object.

 - `vol` - fs-like object
 - `fs` *(optional)* - a filesystem to patch, defaults to `require('fs')`

```js
import {patchFs} from 'fs-monkey';

const myfs = {
    readFileSync: () => 'hello world',
};

patchFs(myfs);
console.log(require('fs').readFileSync('/foo/bar')); // hello world
```

You don't need to create *fs-like* objects yourself, use [`memfs`](https://github.com/streamich/memfs)
to create a virtual filesystem for you:

```js
import {vol} from 'memfs';
import {patchFs} from 'fs-monkey';

vol.fromJSON({'/dir/foo': 'bar'});
patchFs(vol);
console.log(require('fs').readdirSync('/')); // [ 'dir' ]
```


# `patchRequire(vol[, Module])`

Patches Node's `module` module to use a given *fs-like* object `vol` for module loading.

 - `vol` - fs-like object
 - `Module` *(optional)* - a module to patch, defaults to `require('module')`

Monkey-patches the `require` function in Node, this way you can make
Node.js to *require* modules from your custom filesystem.

It expects an object with three filesystem methods implemented that are
needed for the `require` function to work.

```js
let vol = {
    readFileSync: () => {},
    realpathSync: () => {},
    statSync: () => {},
};
```

If you want to make Node.js to *require* your files from memory, you
don't need to implement those functions yourself, just use the
[`memfs`](https://github.com/streamich/memfs) package:

```js
import {vol} from 'memfs';
import {patchRequire} from 'fs-monkey';

vol.fromJSON({'/foo/bar.js': 'console.log("obi trice");'});
patchRequire(vol);
require('/foo/bar'); // obi trice
```

Now the `require` function will only load the files from the `vol` file
system, but not from the actual filesystem on the disk.

If you want the `require` function to load modules from both file
systems, use the [`unionfs`](https://github.com/streamich/unionfs) package
to combine both filesystems into a union:

```js
import {vol} from 'memfs';
import {patchRequire} from 'fs-monkey';
import {ufs} from 'unionfs';
import * as fs from 'fs';

vol.fromJSON({'/foo/bar.js': 'console.log("obi trice");'});
ufs
    .use(vol)
    .use(fs);
patchRequire(ufs);
require('/foo/bar.js'); // obi trice
```

[npm-img]: https://img.shields.io/npm/v/fs-monkey.svg
[npm-url]: https://www.npmjs.com/package/fs-monkey


# License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
