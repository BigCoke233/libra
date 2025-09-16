# ♎️ Libra.js

A lightweight, focused, vanilla JavaScript image lightbox library, only around ✨**3KB** after minified.

![screenshot](https://github.com/BigCoke233/libra/blob/master/screenshot.gif)

_*GIF might appear slower than actual._

## Usage

Grab [libra.min.js](https://github.com/BigCoke233/libra/blob/master/dist/libra.min.js) and put it in your project.

Then import it as a module:

```html
<script type="module">
    import LightBox from '/dist/libra.min.js';
    new LightBox({ selector: 'img[data-libra]' });
    // specify your own selector if needed
</script>
```

Make sure your images all have their `data-libra` attribute, or any other selector you've just specified.

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

## Development

```
npm install
npm run test
```

The `test` command runs Parcel in watch mode.

## Why?

I've been using [Fancybox](https://fancyapps.com/fancybox/) for a long time. While it is an excellent library, it also includes lots of features I don't need. After searching available alternatives, I found most of them either not well maintained or just as heavy. So I developed Libra.js for my own use, and I hope you find it useful, too!
