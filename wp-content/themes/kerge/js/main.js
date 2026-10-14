/*
* Template Name: Kerge - Responsive vCard WordPress Theme
* Author: lmpixels
* Author URL: http://themeforest.net/user/lmpixels
* Version: 4.1.4
*/

(function($) {
"use strict";
    var body = $('body');

    function imageCarousel() {
        $('.portfolio-page-carousel').each(function() {
            var dir = $("html").attr("dir"),
            rtlVal = false;

            if (dir == 'rtl') {
                rtlVal = true;
            }
            else{
                rtlVal = false;
            }
            $(this).imagesLoaded(function () {
                $('.portfolio-page-carousel').owlCarousel({
                    smartSpeed:1200,
                    items: 1,
                    loop: true,
                    dots: true,
                    nav: true,
                    navText: false,
                    autoHeight: true,
                    margin: 10,
                    rtl: rtlVal,
                });
            });
        });
    }

    // Ajax Pages loader
    function ajaxLoader() {
        var ajaxLoadedContent = $('#page-ajax-loaded');
        function showContent() {
            ajaxLoadedContent.removeClass('fadeOutLeft closed');
            $('#page-ajax-loaded', window.parent.document).removeClass('fadeOutLeft closed');
            ajaxLoadedContent.show();
            $('body', window.parent.document).addClass('ajax-page-visible');
        }
        function hideContent() {
            $('#page-ajax-loaded', window.parent.document).addClass('fadeOutLeft closed');
            $('body', window.parent.document).removeClass('ajax-page-visible');
            setTimeout(function(){
                $('#page-ajax-loaded.closed').html('');
                ajaxLoadedContent.hide();
                $('.portfolioFrame', window.parent.document).html('');
                $('.portfolioFrame', window.parent.document).hide();
                $('#page-ajax-loaded.closed', window.parent.document).html('');
                $('#page-ajax-loaded', window.parent.document).hide();
            }, 500);
        }

        $(document)
            .on("click",".site-auto-menu", function (e) {
                hideContent();
            })
            .on("click","#portfolio-page-close-button", function (e) {
                e.preventDefault();
                hideContent();
            })
            .on("click",".ajax-page-load", function () {
                if ($(this).parents('.portfolio-page-wrapper-ajax').length) {
                    var toLoad =  $(this).attr('href') + '?ajax=true';

                    $('.portfolioFrame', window.parent.document).attr('src',toLoad);

                    return false;
                } else {
                    var toLoad =  $(this).attr('href') + '?ajax=true';
                    showContent();

                    $('<iframe>', {
                        src: toLoad,
                        class:  'portfolioFrame',
                        frameborder: 0,
                        scrolling: 'no'
                    }).appendTo(ajaxLoadedContent);

                    return false;
                }
            });
    }
    // /Ajax Pages loader

    // Hide Mobile menu
    function mobileMenuHide() {
        var windowWidth = $(window).width(),
            siteHeader = $('#site_header'),
            mobileHeader = $('.mobile-header');

        if (windowWidth < 992) {
            siteHeader.addClass('mobile-menu-hide');
            if (mobileHeader.hasClass('mobile-menu-hidden')) {
                mobileHeader.removeClass('mobile-menu-hidden');
            }
            setTimeout(function(){
                siteHeader.addClass('animate');
            }, 500);
        } else {
            siteHeader.removeClass('animate');
        }
    }
    // /Hide Mobile menu

    // Lazy Video Loading
    function lazyVideo() {
        var youtube = $('.embed-youtube-video'),
            vimeo = $('.embed-vimeo-video');

        youtube.each(function() {
            var video_wrap = $(this),
            id = $(this).attr('data-embed'),
            id = id.split('youtube.com/embed/')[1];

            var thumb_url = "//img.youtube.com/vi/"+id+"/0.jpg";
            $('<img width="100%" src="'+thumb_url+'" />').appendTo($(this));

            $(this).on("click", "div.play-button", function (e) {
                var $video_iframe = $('<iframe class="embed-responsive-item" src="//www.youtube.com/embed/' + id + '?rel=0&showinfo=0&autoplay=1&output=embed" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                $video_iframe.appendTo(video_wrap);
                $(this).hide();
            });
        });

        vimeo.each(function() {
            var video_wrap = $(this),
            id = $(this).attr('data-embed'),
            id = id.split('vimeo.com/video/')[1];

            $('<img class="vimeo-thumb" width="100%" src="" />').appendTo($(this));

            $.getJSON('https://www.vimeo.com/api/v2/video/' + id + '.json?callback=?', {format: "json"}, function(data) {
                video_wrap.children(".vimeo-thumb").attr('src', data[0].thumbnail_large);
            });

            $(this).on("click", "div.play-button", function (e) {
                var $video_iframe = $('<iframe class="embed-responsive-item" src="//player.vimeo.com/video/' + id + '?autoplay=1&loop=1&autopause=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
                $video_iframe.appendTo(video_wrap);
                $(this).hide();
            });
        });
    }
    // /Lazy Video Loading

    // Contact form validator
    $(function () {
        $( '.contact-form' ).each( function() {
            var contact_form_id = $(this).attr('id'),
                contact_form = $('#' + contact_form_id + '.contact-form');

            contact_form.validator();

            contact_form.on('submit', function (e) {
                if (!e.isDefaultPrevented()) {

                    $.ajax({
                        type: "POST",
                        url: ajaxurl,
                        data: $(this).serialize()+'&action=kerge_contact_action',
                        success: function (data)
                        {   
                            var result = JSON.parse(data);
                            var messageAlert = 'alert-' + result.type;
                            var messageText = result.message;

                            var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                            if (messageAlert && messageText) {
                                contact_form.find('.messages').html(alertBox);
                                if (messageAlert == "alert-success") {
                                    $('.contact-form')[0].reset();
                                }
                            }
                        },
                    });
                    return false;
                }

            });
        });
    });
    // /Contact form validator

    // Portfolio subpage filters
    function portfolio_init() {
        $( '.portfolio-content' ).each( function() {
            var portfolio_grid_container = $(this),
                portfolio_grid_container_id = $(this).attr('id'),
                portfolio_grid = $('#' + portfolio_grid_container_id + ' .portfolio-grid'),
                portfolio_filter = $('#' + portfolio_grid_container_id + ' .portfolio-filters'),
                portfolio_filter_item = $('#' + portfolio_grid_container_id + ' .portfolio-filters .filter');
                
            if (portfolio_grid) {

                portfolio_grid.shuffle({
                    speed: 450,
                    itemSelector: 'figure'
                });

                $('.site-auto-menu').on("click", "a", function (e) {
                    portfolio_grid.shuffle('update');
                });

                portfolio_filter.on("click", ".filter", function (e) {
                    portfolio_grid.shuffle('update');
                    e.preventDefault();
                    portfolio_filter_item.parent().removeClass('active');
                    $(this).parent().addClass('active');
                    portfolio_grid.shuffle('shuffle', $(this).attr('data-group') );
                });

            }
        })
    }
    // /Portfolio subpage filters

    //On Window load & Resize
    $(window)
        .on('load', function() { //Load
            // Animation on Page Loading
            $(".preloader").fadeOut( 800, "linear" );
        })
        .on('resize', function() { //Resize
            mobileMenuHide();
        });


    // On Document Load
    $(document).on('ready', function() {
        var dir = $("html").attr("dir"),
        rtlVal = false;

        if (dir == 'rtl') {
            rtlVal = true;
        }
        else{
            rtlVal = false;
        }

        // initializing page transition.
        var ptPage = $('.subpages:not(.one-page-layout)');
        if (ptPage[0]) {
            PageTransitions.init({
                menu: 'ul.site-auto-menu',
            });
        }

        body.stop().animate({ scrollTop: 0 }, 500);
        // Initialize Portfolio grid
        var $portfolio_container = $(".portfolio-grid"),
            $gallery_container = $("#portfolio-gallery-grid");

        $gallery_container.imagesLoaded(function () {
            $gallery_container.masonry();
        });

        $portfolio_container.imagesLoaded(function () {
            portfolio_init(this);
        });

        imageCarousel();

        // Blog grid init
        var $container = $(".blog-masonry");
        $container.imagesLoaded(function () {
            $container.masonry({
              itemSelector: '.item',
              resize: true
            });
        });

        // Mobile menu
        $('.menu-toggle').on("click", function () {
            $('#site_header').addClass('animate');
            $('#site_header').toggleClass('mobile-menu-hide');
            $('.mobile-header').toggleClass('mobile-menu-hidden');
        });

        // Mobile menu hide on main menu item click
        $('.site-auto-menu').on("click", ".menu-item:not('.menu-item-has-children') a", function (e) {
            mobileMenuHide();
        });

        $('.pt-wrapper, .page-content').on("click", function (e) {
            if ($('.mobile-header').hasClass('mobile-menu-hidden')) {
                mobileMenuHide();
            }
        });

        // Text rotation
        $('.text-rotation').owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 10,
            rtl: rtlVal,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn'
        });

        // Lightbox init
        if (!body.hasClass("elementor-default")) {
            var ligthtbox_item = 'a.lightbox, a.lightbox.mfp-iframe';
        } else {
            var ligthtbox_item = '.fw-page-builder-content  a.lightbox, a.lightbox.mfp-iframe';
            $(this).on("click", ligthtbox_item, function(e){
                DialogsManager.getWidgetType("lightbox").prototype.onShow = function(){
                    $.magnificPopup.close();
                }
            });
        }

        body.magnificPopup({
            fixedContentPos: false,
            delegate: ligthtbox_item,
            type: 'image',
            removalDelay: 300,

            // Class that is added to popup wrapper and background
            // make it unique to apply your CSS animations just to this exact popup
            mainClass: 'mfp-fade',
            image: {
                // options for image content type
                titleSrc: 'title',
                gallery: {
                    enabled: true
                },
            },

            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                        '<div class="mfp-title mfp-bottom-iframe-title"></div>'+
                      '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                      id: null, // String that splits URL in a two parts, second part should be %id%
                      // Or null - full URL will be returned
                      // Or a function that should return %id%, for example:
                      // id: function(url) { return 'parsed id'; }

                      src: '%id%?autoplay=1' // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                      index: 'vimeo.com/',
                      id: '/',
                      src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                      index: '//maps.google.',
                      src: '%id%&output=embed'
                    }
                },

                srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
            },

            callbacks: {
                markupParse: function(template, values, item) {
                 values.title = item.el.attr('title');
                }
            },
        });
        $('.portfolio-page-wrapper .portfolio-grid').each(function() {
            $(this).magnificPopup({
                delegate: 'a.gallery-lightbox',
                type: 'image',
                gallery: {
                  enabled:true
                }
            });
            $(this).on("click", "a.gallery-lightbox", function(e){
                DialogsManager.getWidgetType("lightbox").prototype.onShow = function(){
                    $.magnificPopup.close();
                }
            });
        });

        $('.ajax-page-load-link').magnificPopup({
            type: 'ajax',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
            },
        });

        $('.form-control').val('');

        $(".form-control").on("focusin", function(){
            $(this).parent('.form-group').addClass('form-group-focus');
        });

        $(".form-control").on("focusout", function(){
            if($(this).val().length === 0) {
                $(this).parent('.form-group').removeClass('form-group-focus');
            }
        });

        $('body').append('<div id="page-ajax-loaded" class="page-portfolio-loaded animated fadeInLeft" style="display: none"></div>');
        ajaxLoader();

        $( '.dl-menuwrapper' ).dlmenu();

        // Sidebar toggle
        $('.sidebar-toggle').on("click", function () {
            $('#blog-sidebar').toggleClass('open');
        });

        lazyVideo();

    });

})(jQuery);
