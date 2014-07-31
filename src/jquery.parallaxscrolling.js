/*  This jquery plugin adds parallax (background) scrolling to your website. Instead of scrolling the elements itself it will copy them and fix them on the background. 
    Using this method we can achieve a way higher performance and won't have any flickering when scrolling.
    Based on the Spotify website.
    
    Copyright © 2014 - Dirk Groenen
    Version 1.0
*/
(function($){
    $.extend({
        parallax: function(useroptions){
            
            // Define options and extend with the useroptions
            var options = {
                photowrap: ".photowrap",
                speed: .75
            };
            $.extend(options, useroptions);
            
            // Save the window size
            var windowSize = {height: $(window).height(), width: $(window).width()};
                
            /*
             * Check which prefix we have to use for the CSS transforms
             * Credits: https://github.com/louisremi/jquery.transform.js/blob/master/jquery.transform3d.js
             */
            function leadingUppercase( word ) {
                return word.slice(0,1).toUpperCase() + word.slice(1);
            }

            var div = document.createElement("div"),
                divStyle = div.style,
                prefixes = [
                    "O",
                    "ms",
                    "Webkit",
                    "Moz"
                ],
                prefix,
                i = prefixes.length,
                properties = [
                    "transform",
                    "transformOrigin",
                    "transformStyle",
                    "perspective",
                    "perspectiveOrigin",
                    "backfaceVisibility"
                ],
                property,
                j = prefixes.length;

            // Find the right prefix
            while ( i-- ) {
                if ( prefixes[i] + leadingUppercase( properties[0] ) in divStyle ) {
                    prefix = prefixes[i];
                    continue;
                }
            }

            // This browser is not compatible with transforms
            if ( !prefix ) { prefix = null; }

            /* 
             * Check the viewport elements
             */
            var checkViewportElements = function(){
                var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
                var viewport = {};
                viewport.top = $(scrollElem).scrollTop();
                viewport.bottom = (viewport.top + windowSize.height);

                $(options.photowrap).each(function(){
                    var $this = $(this);
                    var index = $this.data('index');
                    
                    // define the top position of the element
                    var elem = {};
                    elem.top = Math.round( $this.offset().top );
                    elem.bottom = elem.top + ($this.height());
                    
                    var translateY = -(viewport.top - $this.offset().top);
                    
                    // Check if the elements is in the viewport. If it is, create the parallax effect and if it isn't; hide it for performance.
                    if ((elem.top < viewport.bottom) && (elem.bottom > viewport.top)){
                        if(prefix != null){
                            $(".scroll-holder[data-index='" + index + "']").css("-" + prefix + "-transform","translate3D(0, " +  translateY + "px,0)").css("visibility","visible");
                            $(".scroll-holder[data-index='" + index + "']").find('img').css("-" + prefix + "-transform","translate3D(0, " +  -(translateY) * options.speed + "px,0)");
                        }
                        else{
                            $(".scroll-holder[data-index='" + index + "']").css("top", translateY).css("visibility","visible");
                            $(".scroll-holder[data-index='" + index + "'] img").css("margin-top", -(translateY) * options.speed);
                        }
                    }
                    else{
                        $(".scroll-holder[data-index='" + index + "']").css("visibility","hidden");
                    }
                });
            }
            $(window).bind("scroll resize load", checkViewportElements);

            /* 
             * Create a copy of all the images, stretch them to fill the background and place them in the document
             */
            var calculatePhotoPosition = function()
            {        
                windowSize = {height: $(window).height(), width: $(window).width()}; // Reset the windowSize

                // Resize photo blocks
                $(options.photowrap).each(function(i){
                    var $wrap = $(this);
                    $wrap.attr("data-index",i);

                    // Clone the photowrap and prepand it to the dom, if it doesn't exist yet
                    if($(".scroll-holder[data-index='" + i + "']").length < 1)
                        $("body").prepend($wrap.clone().removeClass(options.photowrap.replace(".", "")).addClass('scroll-holder'));

                    // Catch scroll-holder object
                    var $bgimage = $(".scroll-holder[data-index='" + i + "']");
                    
                    // Hide all the photowraps, these are now replaced by the scroll-holder
                    $wrap.find('img').css('visibility','hidden');
                    
                    // (Re)set css values
                    $bgimage.css({
                        width: "",
                        height: "",
                        position: "fixed",
                        "z-index": -999 + i,
                        left: 0,
                        top: 0,
                        overflow: "hidden",
                        visibility: (i == 0) ? "visible" : "hidden"
                    });

                    // Get the image from the scrollholder
                    $bgimage = $bgimage.find("img")
        
                    // Do the calculations that will be used to stretch the image
                    var ratio = $bgimage.width() / $bgimage.height();
                    var bgWidth = windowSize.width;
                    var bgHeight = bgWidth / ratio;

                    // Check if the image is filling the whole screen
                    if(bgHeight < windowSize.height){
                        bgHeight = windowSize.height;
                        bgWidth = bgHeight * ratio;
                    }

                    // Allign the image to the center
                    $bgimage.css({
                        marginTop: -(bgHeight/2) + windowSize.height/2,
                        marginLeft: -(bgWidth/2) + windowSize.width/2,
                        width: bgWidth,
                        height: bgHeight
                    });

                });
            };
            $(window).bind("load resize", calculatePhotoPosition);
        }
    });
})(jQuery);