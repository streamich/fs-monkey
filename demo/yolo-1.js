import {patchFs} from 'fs-monkey';

const myfs = {
    readFileSync: () => 'hello world',
};

patchFs(myfs);
console.log(require('fs').readFileSync('/foo/bar')); // hello world
