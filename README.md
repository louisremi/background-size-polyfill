background-size polyfill
========================

An IE behavior adding support for `background-size` to IE8.

**[Demo](http://louisremi.github.com/background-size-polyfill/)**

Introduction
------------

**Progressive Enhancement** is the mantra I live by. It means *"Have fun with CSS3 and don't worry about IE8 users; they'll never notice they're missing out on your gorgeous text-shadows and gradients, anyway"*.

All was well until I discovered the elegance of `background-size: cover;` and `background-size: contain;`.
The first one, for instance, allows an image to completely cover a background, 
**without** having to send a 1920x1080 background image down the pipes.

Unfortunately, they don't degrade gracefully: websites would likely appear broken to IE8 users :-( 
...unless you use this behavior!

How to use it?
--------------

Upload `backgroundsize.min.htc` to your website, along with the `.htaccess` that will send the mime-type required by IE (Apache only — it's built in nginx, node and IIS).

Everywhere you use `background-size` in your CSS, add a reference to this file.

```css
.selector { 
	background-size: cover;
	/* The url is relative to the document, not to the css file! */
	/* Prefer absolute urls to avoid confusion. */
	-ms-behavior: url(/backgroundsize.min.htc);
}
```
The elements styled this way should have a `position: relative;` or `position: fixed;` and a z-index. 
If not, they will be given a `position: relative;` and `z-index: 0;`.

Limitations
-----------

This polyfill inserts an `<img/>` in the background of all elements matched in the css to emulate the `background-size` value.
Calculating the displayed position and size of this image is quite complex and function of numerous parameters:  
- the size of the element itself  
- the size of the image  
- the values of background-[size/position/clip/origin/attachment/scroll]

It is thus impossible to emulate `background-size` completely and perfectly. But it's still possible to enjoy the main features:  
- correct position and size of the background image  
- updated position and size on browser resize  
- updated image, position and size when the background-image is modified

The following style properties, values or behavior aren't supported:  
- multiple backgrounds (although the :after trick can still be used)  
- 4 values syntax of `background-position`  
- any `repeat` value in `background-repeat`  
- non-default values of background-[clip/origin/attachment/scroll]  
- resizing the background when the dimensions of the element change

Removing any of these limitations is probably just one fork away...

License
-------

MIT Licensed http://louisremi.mit-license.org/
Early versions by [@louis_remi](http://twitter.com/louis_remi), now maintained by [@jefferyto](http://twitter.com/jefferyto)

Are you using this in a paid work?  
Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON

Changelog
---------

### 0.2.0 (2013-08-27)

- Added support for:  
  - Dynamically changing position and size of the background image (partial reimplementation of #8)  
  - Dynamically changing background image with CSS classes  
  - Dynamically setting background image to `none` (#13)  
  - Lengths and percentages for background size (partial reimplementation of #8, #19)  
  - Lengths for background position  
  - Debouncing window resize events (alternative implementation of #17)  
  - Cloning polyfilled elements (#2)  
  - `background-attachment: fixed` for `body` (#22)  
- Fixed:  
  - JS error when using `left` or `top` for `background-position` (#14, #21, #24)  
  - Other "Invalid argument" / `NaN` JS errors (#11, #16, #23)  
  - JS error when printing  
- Use standard HTC XML tags (#10)  
- Work around IE hang on unload when the JScript portion is greater than 512 bytes  
- Added unit tests, grunt build process  
- Misc fixes and code cleanup

### 0.1.0 (2012-11-23)

- Initial release
