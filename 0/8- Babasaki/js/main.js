// JavaScript pour le site Babasaki
// Commentaires en français comme demandé

document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const phoneIcon = document.getElementById('phone-icon');
    const faxIcon = document.getElementById('fax-icon');
    const phoneIconContact = document.getElementById('phone-icon-contact');
    const faxIconContact = document.getElementById('fax-icon-contact');
    const contactNumbers = document.getElementById('contact-numbers');
    const logo = document.getElementById('logo');

    // Ouvrir/fermer le menu mobile et animer le bouton burger
    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation(); // Empêcher la propagation pour éviter la fermeture immédiate
        console.log("Menu toggle clicked");
        // Basculer la classe 'open' sur le menu mobile
        mobileMenu.classList.toggle('open');
        // Basculer la classe 'open' sur le bouton burger pour l'animation
        menuToggle.classList.toggle('open');
    });

    // Fermer le menu en cliquant sur n'importe quelle partie du menu (y compris l'arrière-plan)
    mobileMenu.addEventListener('click', function(event) {
        // Si on clique directement sur le menu ou sur l'arrière-plan
        if (event.target === mobileMenu || event.target.classList.contains('mobile-menu-bg')) {
            mobileMenu.classList.remove('open');
            menuToggle.classList.remove('open');
        }
    });

    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('open') &&
            !mobileMenu.contains(event.target) &&
            !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove('open');
            menuToggle.classList.remove('open');
        }
    });

    // Fonction pour afficher les numéros de contact
    function showContactNumbers() {
        logo.classList.add('slide-left');
        contactNumbers.classList.add('show');
        // Masquer les icônes de contact
        phoneIcon.style.visibility = "hidden";
        faxIcon.style.visibility = "hidden";
    }

    // Fonction pour masquer les numéros de contact
    function hideContactNumbers() {
        logo.classList.remove('slide-left');
        contactNumbers.classList.remove('show');
        // Réafficher les icônes de contact
        phoneIcon.style.visibility = "visible";
        faxIcon.style.visibility = "visible";
    }

    // Événements pour les icônes de contact
    phoneIcon.addEventListener('click', showContactNumbers);
    faxIcon.addEventListener('click', showContactNumbers);

    // Événements pour les icônes de contact dans la vue des numéros
    phoneIconContact.addEventListener('click', hideContactNumbers);
    faxIconContact.addEventListener('click', hideContactNumbers);

    // Fermer le menu mobile en cliquant à l'extérieur
    document.addEventListener('click', function(event) {
        if (mobileMenu.classList.contains('open') &&
            !mobileMenu.contains(event.target) &&
            !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove('open');
            menuToggle.classList.remove('active');
        }
    });

    // Fermer les numéros de contact en cliquant n'importe où sur l'élément
    contactNumbers.addEventListener('click', function(event) {
        console.log("Contact numbers clicked");
        // Fermer les numéros de contact quel que soit l'endroit où l'on clique
        hideContactNumbers();
    });

    // Ajouter un gestionnaire d'événements pour les boutons à l'intérieur de contact-numbers
    // pour éviter que le clic sur les boutons ne ferme immédiatement les numéros
    document.querySelectorAll('#contact-numbers button').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
});
