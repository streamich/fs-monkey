import {vol} from 'memfs';
import {patchRequire} from 'fs-monkey';


vol.fromJSON({'/foo/bar.js': 'console.log("obi trice");'});
patchRequire(vol);


require('/foo/bar');
