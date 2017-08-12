import {expect} from 'chai';
import patchFs from './patchFs';


describe('patchFs', () => {
    it('should overwrite the .readFileSync method', () => {
        const vol = {
            readFileSync: () => 'foo',
        };
        const fs = {};
        patchFs(vol, fs);
        expect(typeof fs.readFileSync).to.equal('function');
        expect(fs.readFileSync()).to.equal('foo');
    });
    it('should copy constants', () => {
        const vol = {
            F_OK: 123,
        };
        const fs = {};
        patchFs(vol, fs);
        expect(fs.F_OK).to.equal(vol.F_OK);
    });
});
