jQuery(window).on('load', function () {
    "use strict";

    $.fn.percentageLoader = function (options) {

        this.each(function () {
            var $this = $(this);
            //配置项
            var config = $.extend({}, $.fn.percentageLoader.defaultConfig, options);

            var val = parseInt($this.children(config.valElement).text()),
                init = true,
                speed = 200,
                w = parseInt($this.css('width'));
            h = parseInt($this.css('height'));
            rx = w / 2,
                ry = h / 2,
                r = rx - config.strokeWidth / 2,
                z = null,
                txt = null,
                dstop = null;

            var paper = Raphael(this, w, h);

            function minit() {
                //构造圆环
                //自定义arc属性，传入进度值80%，总份数100%，半径80
                paper.customAttributes.arc = function (value, total, R) {
                    var alpha = 360 / total * value, //角度
                        a = (90 - alpha) * Math.PI / 180, //弧度
                        x = rx + R * Math.cos(a),
                        y = ry - R * Math.sin(a),
                        path;
                    if (total == value) {
                        path = [
                            ["M", rx, ry - R],
                            ["A", R, R, 0, 1, 1, rx - 0.01, ry - R]
                            //半长轴，
                            //半短轴，
                            //x轴与水平线夹角
                            //1代表大角度弧线，0代表小角度弧线
                            //1代表顺时针画弧，0代表逆时针
                            //结束点的x，y坐标
                        ];
                    } else {
                        path = [
                            ["M", rx, ry - R],
                            ["A", R, R, 0, +(alpha > 180), 1, x, y]
                        ];
                    };

                    return {
                        path: path
                    };
                };
                //绘制背景圆环
                paper.path().attr({
                    arc: [100, 100, r],
                    'stroke-width': config.strokeWidth,
                    'stroke': config.bgColor
                });
                if (!!val) {
                    z = paper.path().attr({
                        arc: [0.01, 100, r],
                        'stroke-width': config.strokeWidth,
                        'stroke': config.ringColor,
                        'cursor': "pointer"
                    });
                    updateVal(val, 100, r, z, 2);
                }

                txt = paper.text(rx, ry, val + "%").attr({
                    //font: config.fontWeight + " " + config.fontSize + "Montserrat",
                    fill: config.textColor
                });
            };
            minit();
            // //色谱
            // function getColor(size) {
            //  var arr = [];
            //  for (var i = 0; i <= 255; i++) {
            //      arr.push("rgb(" + i + "," + (255 - i) + "," + 0 + ")");
            //  }
            //  console.log(arr);
            //  return arr[parseInt(size * 2.55)];
            // };
            //环形动起来和事件绑定
            function updateVal(value, total, R, hand, id) {
                if (init) {
                    hand.animate({
                        arc: [value, total, R]
                    }, 900, ">");
                } else {
                    if (!value || value == total) {
                        value = total;
                        hand.animate({
                            arc: [value, total, R]
                        }, 750, "bounce", function () {
                            hand.attr({
                                arc: [0, total, R]
                            });
                        });
                    } else {
                        hand.animate({
                            arc: [value, total, R]
                        }, 750, "elastic");
                    }
                }
            };

        });

    };
    //默认值
    $.fn.percentageLoader.defaultConfig = {
        valElement: 'p',
        strokeWidth: 20,
        bgColor: '#d9d9d9',
        ringColor: '#d53f3f',
        textColor: '#9a9a9a',
        fontSize: '12px',
        fontWeight: 'normal',
    };

    function loadResumePage() {

        particlesJS('particles-js',
            {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "img/github.svg",
                            "width": 100,
                            "height": 100
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 5,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true,
                "config_demo": {
                    "hide_card": false,
                    "background_color": "#b61924",
                    "background_image": "",
                    "background_position": "50% 50%",
                    "background_repeat": "no-repeat",
                    "background_size": "cover"
                }
            }
        );

        /**
     * Author: Heather Corey
     * jQuery Simple Parallax Plugin
     *
     */
        $.fn.parallax = function (options) {
            var windowHeight = $(window).height();
            // Establish default settings
            var settings = $.extend({
                speed: 0.15
            }, options);
            // Iterate over each object in collection
            return this.each(function () {
                // Save a reference to the element
                var $this = $(this);
                // Set up Scroll Handler
                $(document).scroll(function () {
                    var scrollTop = $(window).scrollTop();
                    var offset = $this.offset().top;
                    var height = $this.outerHeight();
                    // Check if above or below viewport
                    if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
                        return;
                    }
                    var yBgPosition = Math.round((offset - scrollTop) * settings.speed);
                    // Apply the Y Background Position to Set the Parallax Effect
                    $this.css('background-position', 'center ' + yBgPosition + 'px');
                });
            });
        }

        /* Parallax Background */
        /*------------------------------------------------------------------>*/
        if ($(window).width() > 1280) {
            $(".parallax").parallax({
                speed: 0.80
            });
        }

        var origNavOffsetY = $('.navbar').offset().top;

        /* Welcome Text Fade on Scrolling */
        /*------------------------------------------------------------------>*/
        $(window).on("scroll", function () {
            $(".welcome-content").css({ "opacity": 1 - $(window).scrollTop() / 640, "top": 1 + $(window).scrollTop() / 10 * 5 });

            if ($(window).scrollTop() >= origNavOffsetY) {
                $('.navbar').addClass('fixed-top');
                $('.page-content').addClass('navbar-padding');
            } else {
                $('.navbar').removeClass('fixed-top');
                $('.page-content').removeClass('navbar-padding');
            }

        });

        /* Collapse navigation on click on nav anchor*/
        /*------------------------------------------------------------------>*/
        $('.nav-link').on('click', function () {            
            $('.navbar-collapse').collapse('hide');
        });

        /*  Typewritter Text */
        /*------------------------------------------------------------------>*/
        $(".type").typed({
            strings: ["IT SOLUTIONS EXPERT", "DELIVER OFTEN, FAIL FAST", "LEADER OF HAPPY TEAMS", "LOVER OF ACCOMPLISHMENTS", "HAN SHOT FIRST"],
            loop: true,
            startDelay: 20,
            typeSpeed: 0.5,
            backDelay: 3e3,
            loopCount: !1
        });

        /* Intro Box Flip Effect   */
        /*------------------------------------------------------------------>*/
        $("#intro").on('mouseenter', '.counter-box', function () {
            $(this).addClass('flip');
        });

        $("#intro").on('mouseleave', '.counter-box', function () {
            $(this).removeClass('flip');
        });

        /* Counters */
        /*------------------------------------------------------------------>*/
        $('.text-counter').counterUp({
            delay: 10,
            time: 3000
        });

        /* Skill Progress & Circular Bars */
        /*------------------------------------------------------------------>*/
        $('.progress .progress-bar').progressbar();

        /* Circular Bars */
        /*------------------------------------------------------------------>*/
        $('.circular-bar').percentageLoader({
            valElement: 'span',
            strokeWidth: 8,
            bgColor: '#ffffff',
            ringColor: '#e23a22',
            textColor: '#333',
        });

        /* Certifications Box Flip Effect   */
        /*------------------------------------------------------------------>*/
        $("#certifications").on('mouseenter', '.certifications-box', function () {
            $(this).addClass('flip');
        });

        $("#certifications").on('mouseleave', '.certifications-box', function () {
            $(this).removeClass('flip');
        });

        /* Panel Toggle on Plus/Minus Button */
        /*------------------------------------------------------------------>*/
        // $('.panel-button').on('click', function () {
        //     var collapsePanel = $(this).parent().next().find('.panel-collapse');
        //     if (collapsePanel.hasClass('in')) {
        //         $(this).text('+');
        //     } else {
        //         $(this).text('-');
        //     }
        // });

        /* Portfolio - Layout Isotope after each image loads  */
        /*------------------------------------------------------------------>*/
        $('.grid').imagesLoaded().progress(function () {
            $('.grid').isotope('layout');
        });

        /*  Portfolio - Full Width  */
        /*------------------------------------------------------------------>*/
        $('.grid').isotope({
            itemSelector: '.item'
        });

        /*  Portfolio - Filter Items on anchor click*/
        /*------------------------------------------------------------------>*/
        $('.filters li').on('click', 'a', function (e) {
            e.preventDefault();
            var filterValue = $(this).attr('data-filter');
            $('.grid').isotope({
                filter: filterValue
            });
        });

        /*  Portfolio - Toggle Active Class*/
        /*------------------------------------------------------------------>*/
        $('.filters').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', 'a', function () {
                $buttonGroup.find('.active').removeClass('active');
                $(this).addClass('active');
            });
        });

        /*  Portfolio Gallery Popup*/
        /*------------------------------------------------------------------>*/
        $("a[data-rel^=lightcase]").lightcase({ showSequenceInfo: false });

        /*  Testimonial Owl Carousel */
        /*------------------------------------------------------------------>*/
        $(".testimonials-carousel").owlCarousel({
            margin: 30,
            loop: true,
            nav: false,
            dots: true,
            autoplay: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            responsive: {
                0: { items: 1 },
                768: { items: 2 }
            }
        });

    }

    if (window.location.pathname == '/') {
        loadResumePage();
    }

    if (window.location.pathname == '/icons') {
    }
    /*  PreLoader  */
    /*------------------------------------------------------------------>*/
    $("#preloader").fadeOut(450);
});