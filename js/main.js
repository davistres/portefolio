(function($) {
"use strict";
    
    // Filtre de la page portfolio
    function portfolio_init() {
        var portfolio_grid = $('#portfolio_grid'),
            portfolio_filter = $('#portfolio_filters');
            
        if (portfolio_grid) {

            portfolio_grid.shuffle({
                speed: 450,
                itemSelector: 'figure'
            });

            $('.site-main-menu').on("click", "a", function (e) {
                portfolio_grid.shuffle('update');
            });


            portfolio_filter.on("click", ".filter", function (e) {
                portfolio_grid.shuffle('update');
                e.preventDefault();
                $('#portfolio_filters .filter').parent().removeClass('active');
                $(this).parent().addClass('active');
                portfolio_grid.shuffle('shuffle', $(this).attr('data-group') );
            });

        }
    }

    // Validation du formulaire de contact
    $(function () {

        $('#contact-form').validator();

        $('#contact-form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var url = "contact_form/contact_form.php";

                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data)
                    {
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;

                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                        if (messageAlert && messageText) {
                            $('#contact-form').find('.messages').html(alertBox);
                            $('#contact-form')[0].reset();
                        }
                    }
                });
                return false;
            }
        });
    });

    // Cacher le menu mobile
    function mobileMenuHide() {
        var windowWidth = $(window).width();
        if (windowWidth < 1024) {
            $('#site_header').addClass('mobile-menu-hide');
        }
    }

    // Rendre la scrollbar responsive. Elle applique une barre de défilement personnalisée (=> via le plugin mCustomScrollbar) sur les grands écrans et laisse la barre native du navigateur pour les petits écrans (plus adaptée au tactile).
    function customScroll() {
        var windowWidth = $(window).width();
        if (windowWidth > 991) {
            $(".pt-page").mCustomScrollbar({
                scrollInertia: 8,
                documentTouchScroll: false
            });

            $("#site_header").mCustomScrollbar({
                scrollInertia: 8,
                documentTouchScroll: false
            });
        } else {
            $(".pt-page").mCustomScrollbar('destroy');

            $("#site_header").mCustomScrollbar('destroy');
        }
    }

    // Chargement complet de la page et le redimensionnement de la fenêtre du navigateur
    $(window)
        .on('load', function() {
            // Animation au chargement de la page
            $(".preloader").fadeOut("slow");

            // Initialisation de la transition des pages
            var ptPage = $('.subpages');
            if (ptPage[0]) {
                PageTransitions.init({
                    menu: 'ul.site-main-menu',
                });
            }
            customScroll();
        })
        .on('resize', function() {
             mobileMenuHide();
             customScroll();
        });


    // Tout le code ne s'exécutera que quand la page sera totalement chargée
    $(document).on('ready', function() {
        // Init de la grille du Portfolio
        var $portfolio_container = $("#portfolio-grid");

        $portfolio_container.imagesLoaded(function () {
            setTimeout(function(){
                portfolio_init(this);
            }, 500);
        });

        // Init de l'effet au survol des images du portfolio
        $(' #portfolio_grid > figure > a ').each( function() { $(this).hoverdir(); } );

        // Menu mobile
        $('.menu-toggle').on("click", function () {
            $('#site_header').toggleClass('mobile-menu-hide');
        });

        // Ferme (hide=cache) le menu mobile quand on clique sur un lien du menu
        $('.site-main-menu').on("click", "a", function (e) {
            mobileMenuHide();
        });


        // Init du plugin Owl Carousel pour transformer le texte de la page d'accueil en un diaporama
        $('.text-rotation').owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 10,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateOut: 'zoomOut',
            animateIn: 'zoomIn'
        });

        // Init lightbox
        $('.lightbox').magnificPopup({
            type: 'image',
            removalDelay: 300,

            // Class que l'on applique au popup pour appliquer un fondu (=fade)
            mainClass: 'mfp-fade',
            image: {
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
                      '</div>', // SYSTEME DE GABARIT => Structure HTML de la popup : mfp-close sera remplacé par le bouton de fermeture.

                patterns: {
                    youtube: {
                      index: 'youtube.com/', // Text (chaine de carctère) permettant de détecter le type de vidéo (ici, YouTube). La détection se fait via la fonction url.indexOf(index).

                      id: 'v=', // Chaîne de caractères qui sépare l'URL en deux parties
                      // La première partie de l'URL est la chaîne de caractères avant l'identifiant (%id%). Exemple : https://www.youtube.com/watch?v=VIDEO_ID => la première partie est 'https://www.youtube.com/watch?' et l'identifiant est 'VIDEO_ID'.
                      // la seconde partie étant soit l'identifiant (%id%), soit null : dans ce cas, l'URL complète est utilisée comme identifiant. Ou une fonction qui doit retourner l'identifiant (%id%), par exemple : id: function(url) { return 'parsed id'; }

                      src: '//www.youtube.com/embed/%id%?autoplay=1' // URL qui sera assignée à l'attribut src de l'iframe.
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

                srcAction: 'iframe_src', // Clé pour le système de gabarit. La première partie définit le sélecteur CSS, la seconde l'attribut.
                // Par exemple, "iframe_src" signifie : trouve l'élément <iframe> et définit son attribut src.
            },

            callbacks: {
                markupParse: function(template, values, item) {
                 values.title = item.el.attr('title');
                }
            },
        });

        $('.ajax-page-load-link').magnificPopup({
            type: 'ajax',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
            },
        });

        $('.tilt-effect').tilt({

        });

    });

})(jQuery);
