# ♎️ Libra.js

A lightweight, focused, vanilla JavaScript image lightbox library, only ✨**3~4KB** after minified.

![screenshot](https://github.com/BigCoke233/libra/blob/master/screenshot.gif)

_*GIF might appear slower than actual._

## Usage

Grab [libra.min.js](https://github.com/BigCoke233/libra/blob/master/dist/libra.min.js) and put it in your project.

Then import it as a module:

```html
<script type="module">
    import LightBox from '/dist/libra.min.js';
    new LightBox();
</script>
```

Make sure your images all have their `data-libra` attribute, or any other selector you may specify in configuration.

```html
<div class="libra">
  <img data-libra src="1.jpg" />
  <img data-libra src="2.jpg" />
  <!-- ... -->
</div>
```

Also, include [libra.css](https://github.com/BigCoke233/libra/blob/master/src/libra.css).

```html
<link rel="stylesheet" href="/src/libra.css" />
```

## Configuration

You can configure Libra.js by passing an object to the constructor. The defaults are:

```js
new LightBox({
  selector: "[data-libra]", // Selector for images to be lightboxed
  margin: 50, // Margin around the lightbox
  zeroMarginBreakpoint: 786, // When to not use margin (screen width)
  offset: { x: 0, y: 0 }, // Offset for the lightbox position
  transitionDuration: 200, // Animation duration in milliseconds
  imageCursor: "zoom-in", // Cursor style for hoverable images
});
```

### Z-index Configuration

Z-index values are managed through CSS classes:

- `.libra-overlay.libra-visible`: z-index 900 (overlay when visible)
- `.libra-overlay.libra-hidden`: z-index -100 (overlay when hidden)
- `.libra-shadow`: z-index 1000 (shadow image)

You can customize these values by overriding the CSS classes in your own stylesheet.

## Development

```shell
pnpm install
pnpm build
```

There is no `dev` command. To develop, simply start a HTTP server at root directory, for example, with Python.

```shell
python -m http.server 8080
```

Then open `localhost:8080/test` in your browser.

## Philosophy

### Why I made Libra.js

I've been using [Fancybox](https://fancyapps.com/fancybox/) on my blog for a long time. While it is an excellent library, it also includes lots of features I don't need, which can slow down performance and increase the bundle size. After searching available alternatives, I found most of them either not well maintained or just as heavy. So I developed Libra.js for my own use, and I hope you find it useful, too!

### Things I won't do with Libra.js

- I won't support IE or older browsers. Please use a modern browser and make sure it's up to date.
- I won't add too many features or configurations for customization. You just click on an image and see the zoomed-in and centered version. That's all.

### Why it's called Libra.js

It's a light-box plugin that focuses on simplicity, so I called it "libo" at first, which is a combination of the first 2 letters of "light" and "box". Then I realized that "libo" sounds a lot like "libra", which is a zodiac sign. I decided to keep the name "libra" because it's a more recognizable and memorable name.

## License

MIT
