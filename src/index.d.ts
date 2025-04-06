import Module from "module"

declare module "fs-monkey" {
	/**
	 * fs-like object
	 *
	 * @export
	 * @interface Volume
	 */
	export interface Volume {
		// Recongized sync methods
		renameSync?: Function
		ftruncateSync?: Function
		truncateSync?: Function
		chownSync?: Function
		fchownSync?: Function
		lchownSync?: Function
		chmodSync?: Function
		fchmodSync?: Function
		lchmodSync?: Function
		statSync?: Function
		lstatSync?: Function
		fstatSync?: Function
		linkSync?: Function
		symlinkSync?: Function
		readlinkSync?: Function
		realpathSync?: Function
		unlinkSync?: Function
		rmdirSync?: Function
		mkdirSync?: Function
		mkdirpSync?: Function
		readdirSync?: Function
		closeSync?: Function
		openSync?: Function
		utimesSync?: Function
		futimesSync?: Function
		fsyncSync?: Function
		writeSync?: Function
		readSync?: Function
		readFileSync?: Function
		writeFileSync?: Function
		appendFileSync?: Function
		existsSync?: Function
		accessSync?: Function
		fdatasyncSync?: Function
		mkdtempSync?: Function
		copyFileSync?: Function
		rmSync?: Function
		createReadStream?: Function
		createWriteStream?: Function
		// Recongized async methods
		rename?: Function
		ftruncate?: Function
		truncate?: Function
		chown?: Function
		fchown?: Function
		lchown?: Function
		chmod?: Function
		fchmod?: Function
		lchmod?: Function
		stat?: Function
		lstat?: Function
		fstat?: Function
		link?: Function
		symlink?: Function
		readlink?: Function
		realpath?: Function
		unlink?: Function
		rmdir?: Function
		mkdir?: Function
		mkdirp?: Function
		readdir?: Function
		close?: Function
		open?: Function
		utimes?: Function
		futimes?: Function
		fsync?: Function
		write?: Function
		read?: Function
		readFile?: Function
		writeFile?: Function
		appendFile?: Function
		exists?: Function
		access?: Function
		fdatasync?: Function
		mkdtemp?: Function
		copyFile?: Function
		rm?: Function
		watchFile?: Function
		unwatchFile?: Function
		watch?: Function
	}

	/**
	 * Rewrites Node's filesystem module `fs` with fs-like object.
	 *
	 * @export
	 * @param {Volume} vol fs-like object
	 * @param {*} [fs] a filesystem to patch, defaults to `require('fs')`
	 * @return {*}  {() => void} function to reset fs state
	 */
	export function patchFs(vol: Volume, fs?: Module): () => void

	/**
	 * Patches Node's `module` module to use a given fs-like object `vol` for module loading.
	 *
	 * @export
	 * @param {Volume} vol fs-like object
	 * @param {boolean} [unixifyPaths] whether to convert Windows paths to unix style paths, defaults to `false`
	 * @param {Module} [module] a module to patch, defaults to `require('module')`
	 */
	export function patchRequire(vol: Volume, unixifyPaths?: boolean, module?: Module): void
}
