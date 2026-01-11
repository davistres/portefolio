// Diaporama JavaScript - Gestion complète du diaporama avec header adaptatif
class Slideshow {
    constructor() {
        // Éléments DOM
        this.container = document.querySelector('.slideshow-container');
        this.slides = document.querySelectorAll('.slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.playPauseBtn = document.querySelector('.play-pause-btn');
        this.fullscreenBtn = document.querySelector('.fullscreen-btn');
        this.currentSlideSpan = document.querySelector('.current-slide');
        this.totalSlidesSpan = document.querySelector('.total-slides');
        this.header = document.querySelector('header');

        // Variables d'état
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.isPlaying = false;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 4000; // 4 secondes
        this.isFullscreen = false;
        this.isMobile = window.innerWidth <= 768;

        // Vérification qu'il y a des images
        if (this.totalSlides === 0) {
            console.warn('Aucune image trouvée dans le diaporama');
            return;
        }

        // Variables pour le swipe mobile
        this.startX = 0;
        this.endX = 0;
        this.minSwipeDistance = 50;

        // Variables pour la détection d'interaction
        this.interactionTimeout = null;
        this.hasInteracted = false;

        this.init();
    }

    init() {
        // Initialisation de l'état selon l'écran
        this.initializeDisplayMode();

        // Initialisation des événements
        this.setupEventListeners();

        // Mise à jour de l'affichage initial
        this.updateSlideCounter();

        // Préchargement des images
        this.preloadImages();

        console.log('Diaporama initialisé avec', this.totalSlides, 'images');
    }

    // Initialisation du mode d'affichage selon la taille d'écran
    initializeDisplayMode() {
        if (this.isMobile) {
            // Mobile : header toujours visible
            this.showHeader();
            this.hasInteracted = true;
        } else {
            // Desktop : démarrer en fullscreen
            this.hideHeader();
            this.setFullscreenMode(true);
        }
    }

    // Afficher le header et adapter le diaporama
    showHeader() {
        if (this.header) {
            this.header.style.transform = 'translateY(0)';
            this.header.style.opacity = '1';
        }
        this.container.classList.remove('fullscreen');
        this.container.classList.add('with-header');
        this.isFullscreen = false;

        // Permettre le scroll pour voir le footer
        document.body.style.overflow = 'auto';
    }

    // Masquer le header et passer en fullscreen
    hideHeader() {
        if (this.header && !this.isMobile) {
            this.header.style.transform = 'translateY(-100%)';
            this.header.style.opacity = '0';
        }

        // Empêcher le scroll en mode fullscreen (desktop uniquement)
        // Mais seulement si on n'a pas encore interagi
        if (!this.isMobile && !this.hasInteracted) {
            document.body.style.overflow = 'hidden';
        }
    }

    // Définir le mode fullscreen
    setFullscreenMode(enabled) {
        if (enabled && !this.isMobile) {
            this.container.classList.add('fullscreen');
            this.container.classList.remove('with-header');
            this.isFullscreen = true;
        } else {
            this.container.classList.remove('fullscreen');
            this.container.classList.add('with-header');
            this.isFullscreen = false;
        }
    }

    // Gérer l'interaction utilisateur (afficher le header)
    handleUserInteraction() {
        if (!this.hasInteracted && !this.isMobile) {
            this.hasInteracted = true;
            this.showHeader();
            this.setFullscreenMode(false);
            console.log('Interaction détectée - Header affiché');
        }
    }

    setupEventListeners() {
        // Boutons de navigation avec détection d'interaction
        this.prevBtn.addEventListener('click', () => {
            this.handleUserInteraction();
            this.previousSlide();
        });
        this.nextBtn.addEventListener('click', () => {
            this.handleUserInteraction();
            this.nextSlide();
        });

        // Bouton play/pause avec détection d'interaction
        this.playPauseBtn.addEventListener('click', () => {
            this.handleUserInteraction();
            this.toggleAutoPlay();
        });

        // Bouton plein écran avec détection d'interaction
        this.fullscreenBtn.addEventListener('click', () => {
            this.handleUserInteraction();
            this.toggleFullscreen();
        });

        // Indicateurs avec détection d'interaction
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.handleUserInteraction();
                this.goToSlide(index);
            });
        });

        // Événements clavier avec détection d'interaction
        document.addEventListener('keydown', (e) => {
            this.handleUserInteraction();
            this.handleKeyboard(e);
        });

        // Événements tactiles pour mobile avec détection d'interaction
        this.container.addEventListener('touchstart', (e) => {
            this.handleUserInteraction();
            this.handleTouchStart(e);
        });
        this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Détection du mouvement de souris (desktop uniquement)
        if (!this.isMobile) {
            document.addEventListener('mousemove', () => this.handleUserInteraction());
            document.addEventListener('click', () => this.handleUserInteraction());
            document.addEventListener('scroll', () => this.handleUserInteraction());
        }

        // Gestion du redimensionnement
        window.addEventListener('resize', () => this.handleResize());
    }

    // Navigation vers la slide suivante
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlide();
    }

    // Navigation vers la slide précédente
    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlide();
    }

    // Aller à une slide spécifique
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }

    // Mise à jour de l'affichage de la slide
    updateSlide() {
        // Masquer toutes les slides
        this.slides.forEach(slide => slide.classList.remove('active'));

        // Afficher la slide courante
        this.slides[this.currentSlide].classList.add('active');

        // Mettre à jour les indicateurs
        this.indicators.forEach(indicator => indicator.classList.remove('active'));
        this.indicators[this.currentSlide].classList.add('active');

        // Mettre à jour le compteur
        this.updateSlideCounter();
    }

    // Mise à jour du compteur de slides
    updateSlideCounter() {
        this.currentSlideSpan.textContent = this.currentSlide + 1;
        this.totalSlidesSpan.textContent = this.totalSlides;
    }

    // Gestion de l'auto-play
    toggleAutoPlay() {
        if (this.isPlaying) {
            this.stopAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }

    startAutoPlay() {
        this.isPlaying = true;
        this.playPauseBtn.classList.add('playing');
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        this.isPlaying = false;
        this.playPauseBtn.classList.remove('playing');
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Gestion du plein écran
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            this.container.requestFullscreen().catch(err => {
                console.log('Erreur plein écran:', err);
            });
        } else {
            document.exitFullscreen();
        }
    }

    // Gestion des événements clavier
    handleKeyboard(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case ' ':
                e.preventDefault();
                this.toggleAutoPlay();
                break;
            case 'Escape':
                this.stopAutoPlay();
                break;
            case 'f':
            case 'F':
                this.toggleFullscreen();
                break;
        }
    }

    // Gestion des événements tactiles
    handleTouchStart(e) {
        this.startX = e.touches[0].clientX;
    }

    handleTouchEnd(e) {
        this.endX = e.changedTouches[0].clientX;
        this.handleSwipe();
    }

    handleSwipe() {
        const distance = this.startX - this.endX;

        if (Math.abs(distance) > this.minSwipeDistance) {
            if (distance > 0) {
                // Swipe vers la gauche - slide suivante
                this.nextSlide();
            } else {
                // Swipe vers la droite - slide précédente
                this.previousSlide();
            }
        }
    }

    // Gestion du redimensionnement
    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 768;

        // Si on passe de desktop à mobile ou vice versa
        if (wasMobile !== this.isMobile) {
            // Toujours afficher le header et permettre le scroll lors du changement de taille
            this.showHeader();
            this.setFullscreenMode(false);
            this.hasInteracted = true; // Marquer comme ayant interagi pour éviter le blocage

            // S'assurer que le scroll est toujours possible
            document.body.style.overflow = 'auto';

            console.log('Changement de mode:', this.isMobile ? 'Mobile' : 'Desktop');
        }
    }

    // Préchargement des images pour une meilleure performance
    preloadImages() {
        this.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img && !img.complete) {
                img.addEventListener('load', () => {
                    console.log(`Image ${index + 1} chargée`);
                });
            }
        });
    }
}

// Initialisation du diaporama quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier qu'il y a des slides avant d'initialiser
    const slides = document.querySelectorAll('.slide');

    if (slides.length > 0) {
        const slideshow = new Slideshow();

        // Exposition globale pour le débogage
        window.slideshow = slideshow;

        console.log(`Diaporama initialisé avec ${slides.length} images détectées automatiquement`);
    } else {
        console.log('Aucune image détectée - Diaporama non initialisé');
    }
});
