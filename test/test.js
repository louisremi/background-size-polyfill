var urls = {
	"800x600": {
		src: "../images/algeria.jpg",
		re: /images\/algeria\.jpg/
	},
	"300x400": {
		src: "../images/jar1.jpg",
		re: /images\/jar1\.jpg/
	}
};

function isUrl( size, src ) { return urls[size].re.test( src ); }

function getUrl( size ) { return "url(" + urls[size].src + "?_=" + Math.random() + ")"; }

function setupCSSClasses() {
	var def = [ "<style id='customCSSClasses' type='text/css'>" ],
		size;

	for ( size in urls ) {
		def.push( ".background-image-", size, " { background-image: ", getUrl( size ), "; } " );
	}

	$( def.join( "" ) + "</style>" ).appendTo( "head" );
}

function teardownCSSClasses() { $( "#customCSSClasses" ).remove(); }

function onbackgroundupdate( el, callback ) {
	var timeoutId;

	if ( !callback ) {
		callback = el;
		el = $( "#bg" )[0];
	}

	timeoutId = setTimeout( callback, 1000 );

	el.onbackgroundupdate = function () {
		el.onbackgroundupdate = null;
		clearTimeout( timeoutId );
		callback();
	};
}

function polyfillReady( callback ) {
	onbackgroundupdate( callback );
	$( "#bg" ).addClass( "polyfill" );
}



module( "general", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.append( "<span></span>" )
			.css( {
				position: "static",
				width: 800,
				height: 600
			} )
			.addClass( "background-size-cover" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "setup", function() {
	expect( 5 );

	var div = $( "#bg" ), url = getUrl( "800x600" );

	div.css( "background-image", url );

	polyfillReady( function() {
		var children = div.children(),
			first = children.first(),
			grandchildren = first.children();

		equal( children.length, 2, "wrapper appended to element" );
		equal( ( first.prop( "nodeName" ) || "" ).toUpperCase(), "DIV", "wrapper inserted before element content" );
		equal( grandchildren.length, 1, "one child appended to wrapper" );
		equal( ( grandchildren.prop( "nodeName" ) || "" ).toUpperCase(), "IMG", "img appended to wrapper" );
		ok( isUrl( "800x600", grandchildren.prop( "src" ) ), "img has correct src" );

		start();
	} );
} );
asyncTest( "teardown", function() {
	expect( 7 );

	var div = $( "#bg" ),
		url = getUrl( "800x600" ),
		position = div[0].style.position,
		zIndex = div[0].style.zIndex;

	div.css( "background-image", url );

	polyfillReady( function() {
		var children = div.children(),
			first = children.first(),
			grandchildren = first.children();

		equal( children.length, 2, "verify wrapper appended to element before test" );
		ok( isUrl( "800x600", grandchildren.prop( "src" ) ), "verify img has correct src before test" );

		div.removeClass( "polyfill" );

		setTimeout( function() {
			var children = div.children();

			equal( children.length, 1, "wrapper removed" );
			equal( ( children.prop( "nodeName" ) || "" ).toUpperCase(), "SPAN", "element content unaffected" );
			equal( div[0].style.position, position, "element inline position restored" );
			strictEqual( div[0].style.zIndex, zIndex, "element (lack of) inline z-index restored" );
			equal( div[0].style.backgroundImage, url, "element inline background-image restored" );

			start();
		}, 100 );
	} );
} );



module( "size, cover, portrait", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( "background-position", "50% 50%" )
			.addClass( "background-image-300x400 background-size-cover" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "0.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 150, height: 150 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 200, "correct height" );
		deepEqual( img.position(), { left: 0, top: -25 }, "correct position" );
		start();
	} );
} );
asyncTest( "1x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 300, height: 300 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 300, "correct width" );
		equal( img.height(), 400, "correct height" );
		deepEqual( img.position(), { left: 0, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "1.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 450, height: 450 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 450, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 0, top: -75 }, "correct position" );
		start();
	} );
} );
asyncTest( "2x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 600, height: 600 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 600, "correct width" );
		equal( img.height(), 800, "correct height" );
		deepEqual( img.position(), { left: 0, top: -100 }, "correct position" );
		start();
	} );
} );



module( "size, cover, landscape", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( "background-position", "50% 50%" )
			.addClass( "background-image-800x600 background-size-cover" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "0.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 300, height: 300 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 400, "correct width" );
		equal( img.height(), 300, "correct height" );
		deepEqual( img.position(), { left: -50, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "1x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 600, height: 600 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 800, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: -100, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "1.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 900, height: 900 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 1200, "correct width" );
		equal( img.height(), 900, "correct height" );
		deepEqual( img.position(), { left: -150, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "2x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 1200, height: 1200 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 1600, "correct width" );
		equal( img.height(), 1200, "correct height" );
		deepEqual( img.position(), { left: -200, top: 0 }, "correct position" );
		start();
	} );
} );



module( "size, contain, portrait", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( "background-position", "50% 50%" )
			.addClass( "background-image-300x400 background-size-contain" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "0.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 200, height: 200 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 200, "correct height" );
		deepEqual( img.position(), { left: 25, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "1x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 400, height: 400 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 300, "correct width" );
		equal( img.height(), 400, "correct height" );
		deepEqual( img.position(), { left: 50, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "1.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 600, height: 600 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 450, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 75, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "2x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 800, height: 800 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 600, "correct width" );
		equal( img.height(), 800, "correct height" );
		deepEqual( img.position(), { left: 100, top: 0 }, "correct position" );
		start();
	} );
} );



module( "size, contain, landscape", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( "background-position", "50% 50%" )
			.addClass( "background-image-800x600 background-size-contain" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "0.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 400, height: 400 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 400, "correct width" );
		equal( img.height(), 300, "correct height" );
		deepEqual( img.position(), { left: 0, top: 50 }, "correct position" );
		start();
	} );
} );
asyncTest( "1x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 800, height: 800 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 800, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 0, top: 100 }, "correct position" );
		start();
	} );
} );
asyncTest( "1.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 1200, height: 1200 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 1200, "correct width" );
		equal( img.height(), 900, "correct height" );
		deepEqual( img.position(), { left: 0, top: 150 }, "correct position" );
		start();
	} );
} );
asyncTest( "2x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 1600, height: 1600 } );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 1600, "correct width" );
		equal( img.height(), 1200, "correct height" );
		deepEqual( img.position(), { left: 0, top: 200 }, "correct position" );
		start();
	} );
} );



module( "size, length / percentage", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( { width: 500, height: 350, padding: "25px 50px", "background-position": "50% 50%", "font-size": 15 } )
			.addClass( "background-image-300x400" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "150px", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-150px" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 200, "correct height" );
		deepEqual( img.position(), { left: 225, top: 100 }, "correct position" );
		start();
	} );
} );
asyncTest( "10em", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-10em" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 200, "correct height" );
		deepEqual( img.position(), { left: 225, top: 100 }, "correct position" );
		start();
	} );
} );
asyncTest( "50%", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-25percent" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 200, "correct height" );
		deepEqual( img.position(), { left: 225, top: 100 }, "correct position" );
		start();
	} );
} );
asyncTest( "150px auto", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-150px-auto" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 200, "correct height" );
		deepEqual( img.position(), { left: 225, top: 100 }, "correct position" );
		start();
	} );
} );
asyncTest( "10em auto", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-10em-auto" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 200, "correct height" );
		deepEqual( img.position(), { left: 225, top: 100 }, "correct position" );
		start();
	} );
} );
asyncTest( "50% auto", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-25percent-auto" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 200, "correct height" );
		deepEqual( img.position(), { left: 225, top: 100 }, "correct position" );
		start();
	} );
} );
asyncTest( "auto 600px", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-auto-600px" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 450, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 75, top: -100 }, "correct position" );
		start();
	} );
} );
asyncTest( "auto 40em", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-auto-40em" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 450, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 75, top: -100 }, "correct position" );
		start();
	} );
} );
asyncTest( "auto 150%", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-auto-150percent" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 450, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 75, top: -100 }, "correct position" );
		start();
	} );
} );
asyncTest( "150px 150%", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-150px-150percent" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 225, top: -100 }, "correct position" );
		start();
	} );
} );
asyncTest( "10em 600px", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-10em-600px" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 225, top: -100 }, "correct position" );
		start();
	} );
} );
asyncTest( "25percent 40em", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-25percent-40em" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 225, top: -100 }, "correct position" );
		start();
	} );
} );
asyncTest( "-150px (invalid)", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size--150px" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 300, "correct width" );
		equal( img.height(), 400, "correct height" );
		deepEqual( img.position(), { left: 150, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "-10em auto (invalid)", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size--10em-auto" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 300, "correct width" );
		equal( img.height(), 400, "correct height" );
		deepEqual( img.position(), { left: 150, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "auto -150% (invalid)", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-auto--150percent" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 300, "correct width" );
		equal( img.height(), 400, "correct height" );
		deepEqual( img.position(), { left: 150, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "-150px 150% (invalid)", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size--150px-150percent" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 300, "correct width" );
		equal( img.height(), 400, "correct height" );
		deepEqual( img.position(), { left: 150, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "10em -600px (invalid)", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-10em--600px" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 300, "correct width" );
		equal( img.height(), 400, "correct height" );
		deepEqual( img.position(), { left: 150, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "green (invalid)", function() {
	expect( 3 );
	$( "#bg" ).addClass( "background-size-green" );
	polyfillReady( function() {
		var img = $( "#bg img" );
		equal( img.width(), 300, "correct width" );
		equal( img.height(), 400, "correct height" );
		deepEqual( img.position(), { left: 150, top: 0 }, "correct position" );
		start();
	} );
} );



module( "position, cover, portrait", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( { width: 600, height: 600, "font-size": 25 } )
			.addClass( "background-image-300x400 background-size-cover" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "0 -2em", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "0 -2em" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "25% 0", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "25% 0" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "100% 25%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% 25%" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "left 100%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "left 100%" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: -200 }, "correct position" );
		start();
	} );
} );
asyncTest( "center top", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "center top" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "right center", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "right center" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: -100 }, "correct position" );
		start();
	} );
} );
asyncTest( "50px bottom", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "50px bottom" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: -200 }, "correct position" );
		start();
	} );
} );
asyncTest( "-50px 50px", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "-50px 50px" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 50 }, "correct position" );
		start();
	} );
} );
asyncTest( "2em -50px", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "2em -50px" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "-2em 2em", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "-2em 2em" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 50 }, "correct position" );
		start();
	} );
} );



module( "position, cover, landscape", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( { width: 1200, height: 1200, "font-size": 25 } )
			.addClass( "background-image-800x600 background-size-cover" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "0 -2em", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "0 -2em" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "25% 0", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "25% 0" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -100, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "100% 25%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% 25%" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -400, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "left 100%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "left 100%" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "center top", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "center top" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -200, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "right center", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "right center" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -400, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "50px bottom", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "50px bottom" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "-50px 50px", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "-50px 50px" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 50 }, "correct position" );
		start();
	} );
} );
asyncTest( "2em -50px", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "2em -50px" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "-2em 2em", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "-2em 2em" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 50 }, "correct position" );
		start();
	} );
} );



module( "position, contain, portrait", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( { width: 800, height: 800, "font-size": 25 } )
			.addClass( "background-image-300x400 background-size-contain" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "0 -2em", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "0 -2em" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "25% 0", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "25% 0" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "100% 25%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% 25%" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 200, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "left 100%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "left 100%" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "center top", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "center top" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 100, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "right center", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "right center" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 200, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "50px bottom", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "50px bottom" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "-50px 50px", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "-50px 50px" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 50 }, "correct position" );
		start();
	} );
} );
asyncTest( "2em -50px", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "2em -50px" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "-2em 2em", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "-2em 2em" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 50 }, "correct position" );
		start();
	} );
} );



module( "position, contain, landscape", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( { width: 1600, height: 1600, "font-size": 25 } )
			.addClass( "background-image-800x600 background-size-contain" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "0 -2em", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "0 -2em" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "25% 0", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "25% 0" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "100% 25%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% 25%" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 100 }, "correct position" );
		start();
	} );
} );
asyncTest( "left 100%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "left 100%" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 400 }, "correct position" );
		start();
	} );
} );
asyncTest( "center top", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "center top" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "right center", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "right center" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 200 }, "correct position" );
		start();
	} );
} );
asyncTest( "50px bottom", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "50px bottom" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: 400 }, "correct position" );
		start();
	} );
} );
asyncTest( "-50px 50px", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "-50px 50px" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 50 }, "correct position" );
		start();
	} );
} );
asyncTest( "2em -50px", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "2em -50px" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "-2em 2em", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "-2em 2em" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 50 }, "correct position" );
		start();
	} );
} );



module( "position, length / percentage", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( { width: 550, height: 800, "font-size": 25 } )
			.addClass( "background-image-300x400 background-size-150px-150percent" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "0 -2em", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "0 -2em" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "25% 0", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "25% 0" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 100, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "100% 25%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% 25%" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 400, top: -100 }, "correct position" );
		start();
	} );
} );
asyncTest( "left 100%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "left 100%" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: -400 }, "correct position" );
		start();
	} );
} );
asyncTest( "center top", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "center top" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 200, top: 0 }, "correct position" );
		start();
	} );
} );
asyncTest( "right center", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "right center" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 400, top: -200 }, "correct position" );
		start();
	} );
} );
asyncTest( "50px bottom", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "50px bottom" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: -400 }, "correct position" );
		start();
	} );
} );
asyncTest( "-50px 50px", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "-50px 50px" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 50 }, "correct position" );
		start();
	} );
} );
asyncTest( "2em -50px", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "2em -50px" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: 50, top: -50 }, "correct position" );
		start();
	} );
} );
asyncTest( "-2em 2em", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "-2em 2em" );
	polyfillReady( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 50 }, "correct position" );
		start();
	} );
} );



module( "property change", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( { width: 300, height: 300, "background-position": "50% 50%" } )
			.addClass( "background-size-cover" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "background-size", function() {
	expect( 6 );

	var div = $( "#bg" );
	div.addClass( "background-image-300x400" );

	polyfillReady( function() {
		var img = div.find( "img" );
		equal( img.width(), 300, "verify width before test" );
		equal( img.height(), 400, "verify height before test" );
		deepEqual( img.position(), { left: 0, top: -50 }, "verify position before test" );

		onbackgroundupdate( function() {
			var img = div.find( "img" );
			equal( img.width(), 225, "correct width" );
			equal( img.height(), 300, "correct height" );
			deepEqual( img.position(), { left: 37, top: 0 }, "correct position" );

			start();
		} );

		div.addClass( "background-size-contain" ).removeClass( "background-size-cover" );
	} );
} );
asyncTest( "background-position", function() {
	expect( 2 );

	var div = $( "#bg" );
	div.addClass( "background-image-300x400" );

	polyfillReady( function() {
		deepEqual( div.find( "img" ).position(), { left: 0, top: -50 }, "verify position before test" );

		// 3 propertychange events will be triggered
		//     backgroundPositionX
		//     backgroundPositionY
		//     backgroundPosition
		// only the first two will trigger a background update event
		// so skip one update event
		onbackgroundupdate( function() {
			deepEqual( div.find( "img" ).position(), { left: 0, top: -100 }, "correct position" );

			start();
		} );

		div.css( "background-position", "0 100%" );
	} );
} );
asyncTest( "background-image, no background, inline image", function() {
	expect( 6 );

	var div = $( "#bg" );

	polyfillReady( function() {
		equal( div.find( "img" ).css( "display" ), "none", "verify img is hidden before test" );

		onbackgroundupdate( function() {
			var img = div.find( "img" );
			equal( img.css( "display" ), "block", "img is visible" );
			equal( img.width(), 400, "correct width" );
			equal( img.height(), 300, "correct height" );
			deepEqual( img.position(), { left: -50, top: 0 }, "correct position" );
			ok( isUrl( "800x600", img.prop( "src" ) ), "correct img src" );

			start();
		} );

		div.css( "background-image", getUrl( "800x600" ) );
	} );
} );
asyncTest( "background-image, class background, inline none", function() {
	expect( 3 );

	var div = $( "#bg" );
	div.addClass( "background-image-300x400" );

	polyfillReady( function() {
		var img = div.find( "img" );
		equal( img.width(), 300, "verify width before test" );
		equal( img.height(), 400, "verify height before test" );

		onbackgroundupdate( function() {
			equal( div.find( "img" ).css( "display" ), "none", "img is hidden" );

			start();
		} );

		div.css( "background-image", "none" );
	} );
} );
asyncTest( "background-image, class background, inline different image", function() {
	expect( 8 );

	var div = $( "#bg" );
	div.addClass( "background-image-300x400" );

	polyfillReady( function() {
		var img = div.find( "img" );
		equal( img.width(), 300, "verify width before test" );
		equal( img.height(), 400, "verify height before test" );
		deepEqual( img.position(), { left: 0, top: -50 }, "verify position before test" );
		ok( isUrl( "300x400", img.prop( "src" ) ), "verify img src before test '" + img.prop( "src" ) + "'" );

		onbackgroundupdate( function() {
			var img = div.find( "img" );
			equal( img.width(), 400, "correct width" );
			equal( img.height(), 300, "correct height" );
			deepEqual( img.position(), { left: -50, top: 0 }, "correct position" );
			ok( isUrl( "800x600", img.prop( "src" ) ), "correct img src '" + img.prop( "src" ) + "'" );

			start();
		} );

		div.css( "background-image", getUrl( "800x600" ) );
	} );
} );
asyncTest( "background-image, class background, inline blank", function() {
	expect( 8 );

	var div = $( "#bg" );
	div
		.css( "background-image", getUrl( "300x400" ) )
		.addClass( "background-image-800x600" );

	polyfillReady( function() {
		var img = div.find( "img" );
		equal( img.width(), 300, "verify width before test" );
		equal( img.height(), 400, "verify height before test" );
		deepEqual( img.position(), { left: 0, top: -50 }, "verify position before test" );
		ok( isUrl( "300x400", img.prop( "src" ) ), "verify img src before test" );

		onbackgroundupdate( function() {
			var img = div.find( "img" );
			equal( img.width(), 400, "correct width" );
			equal( img.height(), 300, "correct height" );
			deepEqual( img.position(), { left: -50, top: 0 }, "correct position" );
			ok( isUrl( "800x600", img.prop( "src" ) ), "correct img src" );

			start();
		} );

		div.css( "background-image", "" );
	} );
} );
asyncTest( "background-image, add class", function() {
	expect( 6 );

	var div = $( "#bg" );

	polyfillReady( function() {
		equal( div.find( "img" ).css( "display" ), "none", "verify img is hidden before test" );

		onbackgroundupdate( function() {
			var img = div.find( "img" );
			equal( img.css( "display" ), "block", "img is visible" );
			equal( img.width(), 400, "correct width" );
			equal( img.height(), 300, "correct height" );
			deepEqual( img.position(), { left: -50, top: 0 }, "correct position" );
			ok( isUrl( "800x600", img.prop( "src" ) ), "correct img src" );

			start();
		} );

		div.addClass( "background-image-800x600" );
	} );
} );
asyncTest( "background-image, remove class", function() {
	expect( 3 );

	var div = $( "#bg" );
	div.addClass( "background-image-300x400" );

	polyfillReady( function() {
		var img = div.find( "img" );
		equal( img.width(), 300, "verify width before test" );
		equal( img.height(), 400, "verify height before test" );

		onbackgroundupdate( function() {
			equal( div.find( "img" ).css( "display" ), "none", "img is hidden" );

			start();
		} );

		div.removeClass( "background-image-300x400" );
	} );
} );
asyncTest( "background-image, change class", function() {
	expect( 8 );

	var div = $( "#bg" );
	div.addClass( "background-image-800x600 background-image-300x400" );

	polyfillReady( function() {
		var img = div.find( "img" );
		equal( img.width(), 300, "verify width before test" );
		equal( img.height(), 400, "verify height before test" );
		deepEqual( img.position(), { left: 0, top: -50 }, "verify position before test" );
		ok( isUrl( "300x400", img.prop( "src" ) ), "verify img src before test" );

		onbackgroundupdate( function() {
			var img = div.find( "img" );
			equal( img.width(), 400, "correct width" );
			equal( img.height(), 300, "correct height" );
			deepEqual( img.position(), { left: -50, top: 0 }, "correct position" );
			ok( isUrl( "800x600", img.prop( "src" ) ), "correct img src" );

			start();
		} );

		div.removeClass( "background-image-300x400" );
	} );
} );



module( "element not visible", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( { width: 300, height: 300, "background-position": "50% 50%" } )
			.addClass( "background-image-300x400 background-size-cover" );
	},
	teardown: teardownCSSClasses
} );
asyncTest( "visibility: hidden", function() {
	expect( 2 );
	$( "#bg" ).css( "visibility", "hidden" );
	polyfillReady( function() {
		notEqual( $( "#bg img" ).parent().css( "visibility" ), "visible", "wrapper is hidden" );
		notEqual( $( "#bg img" ).css( "visibility" ), "visible", "img is hidden" );
		start();
	} );
} );
asyncTest( "zero width", function() {
	expect( 1 );
	$( "#bg" ).css( "width", 0 );
	polyfillReady( function() {
		equal( $( "#bg img" ).css( "display" ), "none", "img is hidden" );
		start();
	} );
} );
asyncTest( "zero height", function() {
	expect( 1 );
	$( "#bg" ).css( "height", 0 );
	polyfillReady( function() {
		equal( $( "#bg img" ).css( "display" ), "none", "img is hidden" );
		start();
	} );
} );
asyncTest( "no background image", function() {
	expect( 1 );
	$( "#bg" ).removeClass( "background-image-300x400" );
	polyfillReady( function() {
		equal( $( "#bg img" ).css( "display" ), "none", "img is hidden" );
		start();
	} );
} );
asyncTest( "background image missing", function() {
	expect( 1 );
	$( "#bg" ).css( "background-image", "url(i-dont-exist.jpg)" );
	polyfillReady( function() {
		equal( $( "#bg img" ).css( "display" ), "none", "img is hidden" );
		start();
	} );
} );



module( "clone element", {
	setup: function() {
		setupCSSClasses();
		$( "#bg" )
			.css( { width: 300, height: 300, "background-position": "50% 50%" } )
			.addClass( "background-image-300x400 background-size-cover" );
		stop();
		polyfillReady(start);
	},
	teardown: teardownCSSClasses
} );
asyncTest( "cloneNode( false )", function() {
	expect( 4 );
	var div = $( "#bg" ),
		clone = $( div[0].cloneNode( false ) );
	clone.prop( "id", "clone" );

	onbackgroundupdate( clone[0], function() {
		var img = div.find( "img" ),
			cloneimg = clone.find( "img" );

		equal( cloneimg.width(), img.width(), "correct width" );
		equal( cloneimg.height(), img.height(), "correct height" );
		deepEqual( cloneimg.position(), img.position(), "correct position" );
		equal( cloneimg.prop( "src" ), img.prop( "src" ), "correct img src" );
		start();
	} );
	clone.insertAfter( div );
} );
asyncTest( "cloneNode( true )", function() {
	expect( 4 );
	var div = $( "#bg" ),
		clone = $( div[0].cloneNode( true ) );
	clone.prop( "id", "clone" );

	onbackgroundupdate( clone[0], function() {
		var img = div.find( "img" ),
			cloneimg = clone.find( "img" );

		equal( cloneimg.width(), img.width(), "correct width" );
		equal( cloneimg.height(), img.height(), "correct height" );
		deepEqual( cloneimg.position(), img.position(), "correct position" );
		equal( cloneimg.prop( "src" ), img.prop( "src" ), "correct img src" );
		start();
	} );
	clone.insertAfter( div );
} );
asyncTest( "jQuery.clone()", function() {
	expect( 4 );
	var div = $( "#bg" ),
		clone = div.clone();
	clone.prop( "id", "clone" );

	onbackgroundupdate( clone[0], function() {
		var img = div.find( "img" ),
			cloneimg = clone.find( "img" );

		equal( cloneimg.width(), img.width(), "correct width" );
		equal( cloneimg.height(), img.height(), "correct height" );
		deepEqual( cloneimg.position(), img.position(), "correct position" );
		equal( cloneimg.prop( "src" ), img.prop( "src" ), "correct img src" );
		start();
	} );
	clone.insertAfter( div );
} );
asyncTest( "jQuery.clone( true )", function() {
	expect( 4 );
	var div = $( "#bg" ),
		clone = div.clone( true );
	clone.prop( "id", "clone" );

	onbackgroundupdate( clone[0], function() {
		var img = div.find( "img" ),
			cloneimg = clone.find( "img" );

		equal( cloneimg.width(), img.width(), "correct width" );
		equal( cloneimg.height(), img.height(), "correct height" );
		deepEqual( cloneimg.position(), img.position(), "correct position" );
		equal( cloneimg.prop( "src" ), img.prop( "src" ), "correct img src" );
		start();
	} );
	clone.insertAfter( div );
} );
