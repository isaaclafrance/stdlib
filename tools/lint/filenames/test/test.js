'use strict';

// MODULES //

var tape = require( 'tape' );
var lint = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof lint, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a method to synchronously lint filenames', function test( t ) {
	t.equal( typeof lint.sync, 'function', 'has sync method' );
	t.end();
});
