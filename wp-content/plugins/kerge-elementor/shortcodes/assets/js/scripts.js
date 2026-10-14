/*
* Template Name: Kerge - Responsive vCard WordPress Theme
* Author: lmpixels
* Author URL: http://themeforest.net/user/lmpixels
* Version: 1.0.0
*/

(function($, fnFrontend) { 
"use strict";

    var Kerge = {

        init: function() {

            var widgets = {
                'kerge-testimonials.default' : Kerge.testimonials,
                'kerge-clients.default' : Kerge.clients,
                'kerge-home-page-first.default' : Kerge.textRotation,
                'kerge-home-page-first.default' : Kerge.bgslider,
                'kerge-home-page-third.default' : Kerge.textRotation,
                'kerge-timeline.default' : Kerge.timeline,
            };

            $.each( widgets, function( widget, callback ) {
                fnFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
            });
        },

        testimonials: function() {
            setTimeout(function(){
                var mobile_mode_items = "",
                    tablet_mode_items = "",
                    items = "";
                
                $( '.testimonials' ).each( function() {
                    var mobile_mode_items = $(this).attr('data-mobile-items'),
                        tablet_mode_items = $(this).attr('data-tablet-items'),
                        items = $(this).attr('data-items'),
                        id = $(this).attr('id'),
                        loop = false,
                        windowWidth = $(window).width(),
                        autoplayTablet = '',
                        autoplayValue = '';
                    if ($(this).hasClass('autoplay-on')) {
                        autoplayValue = true;
                        if ($(this).hasClass('autoplay-mobile')) {
                            if (windowWidth > 768) {
                                autoplayValue = false;
                            } else {
                                autoplayValue = true;
                            }
                        }
                    } else {
                        autoplayValue = false;
                    }

                    if ($(this).hasClass('loop-on')) {
                        loop = true;
                    } else {
                        loop = false;
                    }

                    $("#" + id + ".testimonials.owl-carousel").imagesLoaded().owlCarousel({
                        nav: true,
                        dots: false,
                        items: 1,
                        loop: loop,
                        autoplay: autoplayValue,
                        navText: false,
                        autoHeight: false,
                        margin: 10,
                        autoplayTimeout: 5000,
                        smartSpeed: 5000,
                        responsive : {
                            0 : {
                                items: mobile_mode_items,
                            },
                            768 : {
                                items: tablet_mode_items,
                            },
                            1200 : {
                                items: items,
                            }
                        }
                    });
                });
            },500);
        },

        clients: function() {
            setTimeout(function(){
                // Clients Slider
                var mobile_mode_items = "",
                    tablet_mode_items = "",
                    items = "";
                
                $( '.clients' ).each( function() {
                    var mobile_mode_items = $(this).attr('data-mobile-items'),
                        tablet_mode_items = $(this).attr('data-tablet-items'),
                        items = $(this).attr('data-items'),
                        id = $(this).attr('id'),
                        loop = false,
                        windowWidth = $(window).width(),
                        autoplayTablet = '',
                        autoplayValue = '';
                    if ($(this).hasClass('autoplay-on')) {
                        autoplayValue = true;
                        if ($(this).hasClass('autoplay-mobile')) {
                            if (windowWidth > 768) {
                                autoplayValue = false;
                            } else {
                                autoplayValue = true;
                            }
                        }
                    } else {
                        autoplayValue = false;
                    }

                    if ($(this).hasClass('loop-on')) {
                        loop = true;
                    } else {
                        loop = false;
                    }

                    $("#" + id + ".clients.owl-carousel").imagesLoaded().owlCarousel({
                        nav: true, // Show next/prev buttons.
                        items: 2, // The number of items you want to see on the screen.
                        loop: loop,
                        autoplay: autoplayValue,
                        navText: false,
                        margin: 10,
                        autoHeight: false,
                        smartSpeed: 1,
                        responsive : {
                            // breakpoint from 0 up
                            0 : {
                                items: mobile_mode_items,
                            },
                            // breakpoint from 768 up
                            768 : {
                                items: tablet_mode_items,
                            },
                            1200 : {
                                items: items,
                            }
                        }
                    });
                });
            },500);
        },

        timeline: function() {
            var $custom_styles = "",
                $custom_style = "";
            
            function timelineStyles() {
                $( '.timeline-item' ).each( function() {
                    var color_value = $(this).attr('data-color'),
                        $id = $(this).attr('id');

                    if ($(this).parents('.timeline-first-style').length) {
                        $custom_style = '#' + $id + ' .item-period { background-color: ' + color_value + '; } ' + '#' + $id + ' .item-period:before { border-right-color: ' + color_value + '; } ';
                    }

                    if ($(this).parents('.timeline-second-style').length) {
                        $custom_style = '#' + $id + ' .divider:after { border-color: ' + color_value + '; } ';
                    }

                    $custom_styles += $custom_style;
                });
                $('head').append('<style data-styles="kerge-theme-timeline-css" type="text/css">' + $custom_styles + '</style>');
            }

            timelineStyles();

            $(this).ajaxComplete(function() {
                $('style[data-styles="kerge-theme-timeline-css"]').remove().detach();
                timelineStyles();
            });
        },

        bgslider: function() {
            var $custom_styles = "",
                $custom_style = "";
            
            function imgbgslider() {
                $( '.bg-slider' ).each( function() {
                    var speed = $(this).attr('data-speed');

                    $(this).owlCarousel({
                        loop: true,
                        dots: false,
                        nav: false,
                        margin: 10,
                        items: 1,
                        autoplay: true,
                        autoplayHoverPause: false,
                        autoplayTimeout: speed,
                        smartSpeed: speed,
                        animateOut: 'fadeOut',
                        animateIn: 'fadeIn'
                    });
                });

            }

            imgbgslider();

            $(this).ajaxComplete(function() {
                imgbgslider();
            });
        },

        textRotation: function() {
            $( '.text-rotation' ).each( function() {
                $(this).owlCarousel({
                    loop: true,
                    dots: false,
                    nav: false,
                    margin: 10,
                    items: 1,
                    autoplay: true,
                    autoplayHoverPause: false,
                    autoplayTimeout: 5000,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn'
                });
            });
        },

    }
    $( window ).on( 'elementor/frontend/init', Kerge.init );
    $( window ).on('resize',function(){
        Kerge.testimonials();
        Kerge.clients();
        Kerge.textRotation();
    });
    $( window ).on('load',function(){
        Kerge.textRotation();
    });
})(jQuery, window.elementorFrontend);