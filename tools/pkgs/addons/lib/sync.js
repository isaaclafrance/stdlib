'use strict';

// MODULES //

var glob = require( 'glob' ).sync;
var resolve = require( 'path' ).resolve;
var cwd = require( '@stdlib/utils/cwd' );
var copy = require( '@stdlib/utils/copy' );
var exists = require( '@stdlib/fs/exists' ).sync;
var dirname = require( '@stdlib/utils/dirname' );
var config = require( './config.json' );
var validate = require( './validate.js' );


// MAIN //

/**
* Synchronously finds add-ons.
*
* @param {Options} [options] - function options
* @param {string} [options.dir] - root directory from which to search for add-ons
* @param {string} [options.pattern='**\/package.json'] - glob pattern
* @param {StringArray} [options.ignore] - glob pattern(s) to exclude matches
* @throws {TypeError} options argument must be an object
* @throws {TypeError} must provide valid options
* @throws {Error} `pattern` option must end with `package.json`
* @throws {Error} unable to parse `package.json` as JSON
* @returns {(Array|StringArray)} list of add-ons
*
* @example
* var pkgs = findAddons();
* // returns [...]
*/
function findAddons( options ) {
	var fpath;
	var gopts;
	var files;
	var opts;
	var err;
	var dir;
	var out;
	var i;

	opts = copy( config );
	if ( arguments.length ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( opts.dir ) {
		dir = resolve( cwd(), opts.dir );
	} else {
		dir = cwd();
	}
	// Find `package.json` files...
	gopts = {
		'cwd': dir,
		'ignore': opts.ignore,
		'realpath': true // return absolute file paths
	};
	files = glob( opts.pattern, gopts );

	// Check for add-ons...
	out = [];
	for ( i = 0; i < files.length; i++ ) {
		dir = dirname( files[ i ] );
		fpath = resolve( dir, 'src', 'Makefile' );
		if ( exists( fpath ) ) {
			out.push( dir );
		}
	}
	return out;
} // end FUNCTION findAddons()


// EXPORTS //

module.exports = findAddons;
