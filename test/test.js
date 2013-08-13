var r800x600 = /images\/algeria\.jpg$/,
	r300x400 = /images\/jar1\.jpg$/,
	url800x600 = "url(../images/algeria.jpg)",
	url300x400 = "url(../images/jar1.jpg)";

function testPolyfill( test ) {
	$( "#bg" ).addClass( "polyfill" );
	setTimeout( function() {
		( test || $.noop )();
		start();
	}, 100 );
}

window.bgsSpacerGif = "../spacer.gif";



module( "general" );

asyncTest( "setup and teardown", function() {
	expect( 10 );

	var div = $( "#bg" );

	div
		.append( "<span></span>" )
		.css( {
			position: "static",
			"background-image": url800x600,
			width: 800,
			height: 600
		} )
		.addClass( "background-size-cover polyfill" );

	setTimeout( function() {
		var children = div.children(),
			first = children.first(),
			grandchildren = first.children();

		equal( children.length, 2, "wrapper appended to element" );
		equal( ( first.prop( "nodeName" ) || "" ).toUpperCase(), "DIV", "wrapper inserted before element content" );
		equal( grandchildren.length, 1, "one child appended to wrapper" );
		equal( ( grandchildren.prop( "nodeName" ) || "" ).toUpperCase(), "IMG", "img appended to wrapper" );
		ok( r800x600.test( grandchildren.prop( "src" ) ), "img has correct src" );

		div.removeClass( "polyfill" );

		setTimeout( function() {
			var children = div.children();

			equal( children.length, 1, "wrapper removed" );
			equal( ( children.prop( "nodeName" ) || "" ).toUpperCase(), "SPAN", "element content unaffected" );
			equal( div[0].style.position, "static", "element inline position restored" );
			strictEqual( div[0].style.zIndex, "", "element (lack of) inline z-index restored" );
			equal( div[0].style.backgroundImage, url800x600, "element inline background-image restored" );

			start();
		}, 100 );
	}, 100 );
} );



module( "cover, portrait", {
	setup: function() {
		$( "#bg" )
			.css( "background-position", "50% 50%" )
			.addClass( "background-image-300x400 background-size-cover" );
	}
} );
asyncTest( "0.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 150, height: 150 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 200, "correct height" );
		deepEqual( img.position(), { left: 0, top: -25 }, "correct position" );
	} );
} );
asyncTest( "1x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 300, height: 300 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 300, "correct width" );
		equal( img.height(), 400, "correct height" );
		deepEqual( img.position(), { left: 0, top: -50 }, "correct position" );
	} );
} );
asyncTest( "1.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 450, height: 450 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 450, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 0, top: -75 }, "correct position" );
	} );
} );
asyncTest( "2x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 600, height: 600 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 600, "correct width" );
		equal( img.height(), 800, "correct height" );
		deepEqual( img.position(), { left: 0, top: -100 }, "correct position" );
	} );
} );



module( "cover, landscape", {
	setup: function() {
		$( "#bg" )
			.css( "background-position", "50% 50%" )
			.addClass( "background-image-800x600 background-size-cover" );
	}
} );
asyncTest( "0.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 300, height: 300 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 400, "correct width" );
		equal( img.height(), 300, "correct height" );
		deepEqual( img.position(), { left: -50, top: 0 }, "correct position" );
	} );
} );
asyncTest( "1x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 600, height: 600 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 800, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: -100, top: 0 }, "correct position" );
	} );
} );
asyncTest( "1.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 900, height: 900 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 1200, "correct width" );
		equal( img.height(), 900, "correct height" );
		deepEqual( img.position(), { left: -150, top: 0 }, "correct position" );
	} );
} );
asyncTest( "2x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 1200, height: 1200 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 1600, "correct width" );
		equal( img.height(), 1200, "correct height" );
		deepEqual( img.position(), { left: -200, top: 0 }, "correct position" );
	} );
} );



module( "contain, portrait", {
	setup: function() {
		$( "#bg" )
			.css( "background-position", "50% 50%" )
			.addClass( "background-image-300x400 background-size-contain" );
	}
} );
asyncTest( "0.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 200, height: 200 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 150, "correct width" );
		equal( img.height(), 200, "correct height" );
		deepEqual( img.position(), { left: 25, top: 0 }, "correct position" );
	} );
} );
asyncTest( "1x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 400, height: 400 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 300, "correct width" );
		equal( img.height(), 400, "correct height" );
		deepEqual( img.position(), { left: 50, top: 0 }, "correct position" );
	} );
} );
asyncTest( "1.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 600, height: 600 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 450, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 75, top: 0 }, "correct position" );
	} );
} );
asyncTest( "2x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 800, height: 800 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 600, "correct width" );
		equal( img.height(), 800, "correct height" );
		deepEqual( img.position(), { left: 100, top: 0 }, "correct position" );
	} );
} );



module( "contain, landscape", {
	setup: function() {
		$( "#bg" )
			.css( "background-position", "50% 50%" )
			.addClass( "background-image-800x600 background-size-contain" );
	}
} );
asyncTest( "0.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 400, height: 400 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 400, "correct width" );
		equal( img.height(), 300, "correct height" );
		deepEqual( img.position(), { left: 0, top: 50 }, "correct position" );
	} );
} );
asyncTest( "1x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 800, height: 800 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 800, "correct width" );
		equal( img.height(), 600, "correct height" );
		deepEqual( img.position(), { left: 0, top: 100 }, "correct position" );
	} );
} );
asyncTest( "1.5x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 1200, height: 1200 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 1200, "correct width" );
		equal( img.height(), 900, "correct height" );
		deepEqual( img.position(), { left: 0, top: 150 }, "correct position" );
	} );
} );
asyncTest( "2x", function() {
	expect( 3 );
	$( "#bg" ).css( { width: 1600, height: 1600 } );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 1600, "correct width" );
		equal( img.height(), 1200, "correct height" );
		deepEqual( img.position(), { left: 0, top: 200 }, "correct position" );
	} );
} );



module( "position, percent, horizontal", {
	setup: function() {
		$( "#bg" )
			.css( { width: 600, height: 600 } )
			.addClass( "background-image-800x600 background-size-cover" );
	}
} );
asyncTest( "0", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "0 100%" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 0 }, "correct position" );
	} );
} );
asyncTest( "25%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "25% 100%" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: -50, top: 0 }, "correct position" );
	} );
} );
asyncTest( "50%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "50% 100%" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: -100, top: 0 }, "correct position" );
	} );
} );
asyncTest( "75%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "75% 100%" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: -150, top: 0 }, "correct position" );
	} );
} );
asyncTest( "100%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% 0" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: -200, top: 0 }, "correct position" );
	} );
} );



module( "position, percent, vertical", {
	setup: function() {
		$( "#bg" )
			.css( { width: 800, height: 800 } )
			.addClass( "background-image-800x600 background-size-contain" );
	}
} );
asyncTest( "0", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% 0" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 0 }, "correct position" );
	} );
} );
asyncTest( "25%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% 25%" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 50 }, "correct position" );
	} );
} );
asyncTest( "50%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% 50%" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 100 }, "correct position" );
	} );
} );
asyncTest( "75%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% 75%" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 150 }, "correct position" );
	} );
} );
asyncTest( "100%", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "0 100%" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 200 }, "correct position" );
	} );
} );



module( "position, keyword, horizontal", {
	setup: function() {
		$( "#bg" )
			.css( { width: 600, height: 600 } )
			.addClass( "background-image-800x600 background-size-cover" );
	}
} );
asyncTest( "left", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "left 100%" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 0 }, "correct position" );
	} );
} );
asyncTest( "center", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "center 100%" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: -100, top: 0 }, "correct position" );
	} );
} );
asyncTest( "right", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "right 0" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: -200, top: 0 }, "correct position" );
	} );
} );



module( "position, keyword, vertical", {
	setup: function() {
		$( "#bg" )
			.css( { width: 800, height: 800 } )
			.addClass( "background-image-800x600 background-size-contain" );
	}
} );
asyncTest( "top", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% top" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 0 }, "correct position" );
	} );
} );
asyncTest( "center", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "100% center" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 100 }, "correct position" );
	} );
} );
asyncTest( "bottom", function() {
	expect( 1 );
	$( "#bg" ).css( "background-position", "0 bottom" );
	testPolyfill( function() {
		deepEqual( $( "#bg img" ).position(), { left: 0, top: 200 }, "correct position" );
	} );
} );



module( "property change", {
	setup: function() {
		$( "#bg" )
			.css( { width: 300, height: 300, "background-position": "50% 50%" } )
			.addClass( "background-image-300x400 background-size-cover" );
		stop();
		testPolyfill( function() {
			var img = $( "#bg img" );
			equal( img.width(), 300, "verify width before test" );
			equal( img.height(), 400, "verify height before test" );
			deepEqual( img.position(), { left: 0, top: -50 }, "verify position before test" );
			ok( r300x400.test( img.prop( "src" ) ), "verify img src before test" );
		} );
	}
} );
asyncTest( "background-size", function() {
	expect( 7 );
	$( "#bg" ).addClass( "background-size-contain" ).removeClass( "background-size-cover" );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 225, "correct width" );
		equal( img.height(), 300, "correct height" );
		deepEqual( img.position(), { left: 37, top: 0 }, "correct position" );
	} );
} );
asyncTest( "background-position", function() {
	expect( 5 );
	$( "#bg" ).css( "background-position", "0 100%" );
	testPolyfill( function() {
		var img = $( "#bg img" );
		deepEqual( img.position(), { left: 0, top: -100 }, "correct position" );
	} );
} );
asyncTest( "background-image (DOM)", function() {
	expect( 8 );
	$( "#bg" ).css( "background-image", url800x600 );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 400, "correct width" );
		equal( img.height(), 300, "correct height" );
		deepEqual( img.position(), { left: -50, top: 0 }, "correct position" );
		ok( r800x600.test( img.prop( "src" ) ), "correct img src" );
	} );
} );
asyncTest( "background-image (CSS class)", function() {
	expect( 8 );
	$( "#bg" ).addClass( "background-image-800x600" ).removeClass( "background-image-300x400" );
	testPolyfill( function() {
		var img = $( "#bg img" );
		equal( img.width(), 400, "correct width" );
		equal( img.height(), 300, "correct height" );
		deepEqual( img.position(), { left: -50, top: 0 }, "correct position" );
		ok( r800x600.test( img.prop( "src" ) ), "correct img src" );
	} );
} );
