import {vol} from 'memfs';
import {patchFs} from 'fs-monkey';

vol.fromJSON({'/dir/foo': 'bar'});
patchFs(vol);
console.log(require('fs').readdirSync('/'));
