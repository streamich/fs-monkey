import {vol} from 'memfs';
import {patchRequire} from 'fs-monkey';
import {ufs} from 'unionfs';
import * as fs from 'fs';


vol.fromJSON({'/foo/bar.js': 'console.log("obi trice");'});
ufs
    .use(vol)
    .use(fs);


patchRequire(ufs);
require('/foo/bar.js');
