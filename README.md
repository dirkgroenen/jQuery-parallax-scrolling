Parallax scrolling
==================

A jQuery plugin that adds parallax background scrolling to your website. The technique to achive the highest performance is inspired from the [Spotify](http://spotify.com) website, where elements get copied and fixed in the document. Thanks to this technique you won't have flickering images when you scroll.

Installation
------------
Include jQuery en the ```jquery.parallaxscrolling.js``` script in your ```<head>``` and call the plugin when the document is ready.
```
<head>
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="jquery.parallaxscrolling.js"></script>

    <script>
        $(document).ready(function(){
            $.parallax();
        });
    </script>
</head>
```

Options
-------
The currently available options are:
```
$.parallax({
    photowrap: ".scrollholder", // The class of the elements that contain the image
    speed: .75 // The speed of the parallax effect. This has to be a number from 0 to 1.
});
```

Demo
-----
If you download the .zip you can check the ```index.html``` for a demo.