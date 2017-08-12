import {fsProps, fsAsyncMethods, fsSyncMethods} from './util/lists';


export default function patchFs(vol, fs = require('fs')) {

    // General properties
    for(let prop of fsProps)
        if(typeof vol[prop] !== 'undefined')
            fs[prop] = vol[prop];


    // Bind the first argument of some constructors, this is relevant for `memfs`.
    // TODO: Maybe in the future extend this function such that it internally creates
    // TODO: the below four constructor functions.
    if(typeof vol.StatWatcher === 'function') {
        fs.StatWatcher = vol.StatWatcher.bind(null, vol);
    }
    if(typeof vol.FSWatcher === 'function') {
        fs.FSWatcher = vol.FSWatcher.bind(null, vol);
    }
    if(typeof vol.ReadStream === 'function') {
        fs.ReadStream = vol.ReadStream.bind(null, vol);
    }
    if(typeof vol.WriteStream === 'function') {
        fs.WriteStream = vol.WriteStream.bind(null, vol);
    }


    // Extra hidden function
    if(typeof vol._toUnixTimestamp === 'function')
        fs._toUnixTimestamp = vol._toUnixTimestamp.bind(vol);


    // Main API
    for(let method of fsAsyncMethods)
        if(typeof vol[method] === 'function')
            fs[method] = vol[method].bind(vol);

    for(let method of fsSyncMethods)
        if(typeof vol[method] === 'function')
            fs[method] = vol[method].bind(vol);
};
