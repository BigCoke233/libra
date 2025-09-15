# ♎️ Libra.js

A lightweight, focused, vanilla JavaScript image lightbox library, only around **3.3KB** after minified.

![screenshot](https://github.com/BigCoke233/libra/blob/master/screenshot.gif)

_*GIF might appear slower than actual._

## Usage

Grab [libra.min.js](https://github.com/BigCoke233/libra/blob/master/dist/libra.min.js) and put it in your project.

Then import it as a module:

```html
<script type="module">
  import LightBox from '/dist/libra.min.js';
  const lightbox = new LightBox({
    container: '.libra' // where your images are contained
                        // e.g. if your post content is in a div with class "post-content"
                        //      then you can set container: '.post-content'
  });
</script>
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
