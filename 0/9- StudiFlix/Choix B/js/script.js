// DOM Elements
const coursesContainer = document.getElementById('courses-container');
const categoryFilter = document.getElementById('category');
const subcategoryFilter = document.getElementById('subcategory');
const priceFilter = document.getElementById('price');
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('youtube-video');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-description');
const closeModal = document.querySelector('.close-btn');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCartBtn = document.querySelector('.close-cart');
const cartBtn = document.querySelector('.cart-btn');
const searchBtn = document.querySelector('.search-btn');

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');
    const html = document.documentElement;
    let isMenuOpen = false;

    // Vérifier si les éléments existent
    if (!mobileMenu || !navLinks) return;

    // Fonction pour ouvrir/fermer le menu
    function toggleMenu(open) {
        if (typeof open === 'boolean') {
            isMenuOpen = open;
        } else {
            isMenuOpen = !isMenuOpen;
        }
        
        mobileMenu.classList.toggle('active', isMenuOpen);
        navLinks.classList.toggle('active', isMenuOpen);
        
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            html.classList.add('menu-open');
            // Ajouter un écouteur pour fermer au clic en dehors
            document.addEventListener('click', closeMenuOnClickOutside);
        } else {
            document.body.style.overflow = '';
            html.classList.remove('menu-open');
            // Retirer l'écouteur quand le menu est fermé
            document.removeEventListener('click', closeMenuOnClickOutside);
        }
    }

    // Fermer le menu en cliquant en dehors
    function closeMenuOnClickOutside(e) {
        if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
            toggleMenu(false);
        }
    }

    // Gestion de l'ouverture/fermeture du menu mobile
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Fermer le menu quand on clique sur un lien
    const navLinksItems = document.querySelectorAll('.nav-links a, .nav-actions a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1022) {
                toggleMenu(false);
                html.classList.remove('menu-open');
            }
        });
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.menu-toggle')) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            html.classList.remove('menu-open');
        }
    });

    // Gestion du redimensionnement
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 1022) {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                html.classList.remove('menu-open');
            }
        }, 250);
    });
});

// Gestion du scroll pour la navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajout/suppression de la classe 'scrolled' en fonction du défilement
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Animation de la navbar au scroll
    if (currentScroll > 100) {
        header.style.padding = '0.5rem 0';
    } else {
        header.style.padding = '1rem 0';
    }
    
    lastScroll = currentScroll;
});

// Sample data (in a real app, this would come from an API)
const courses = [
    // AI Category
    {
        id: 1,
        title: "Introduction à l'IA pour les débutants",
        category: 'ai',
        subcategory: 'introduction',
        price: 0,
        thumbnail: 'https://img.youtube.com/vi/WSKi8HfcxEk/maxresdefault.jpg',
        videoId: 'WSKi8HfcxEk',
        description: 'Découvrez les bases de l\'intelligence artificielle et ses applications.'
    },
    // Add more courses here...
];

// Cart state
let cart = [];

// Initialize the app
function init() {
    displayCourses(courses);
    setupEventListeners();
    updateCartCount();
}

// Display courses in the grid
function displayCourses(coursesToShow) {
    coursesContainer.innerHTML = coursesToShow.map(course => `
        <div class="course-card" data-category="${course.category}" data-subcategory="${course.subcategory}" data-price="${course.price === 0 ? 'free' : 'paid'}">
            <div class="course-thumbnail" data-video-id="${course.videoId}">
                <img src="${course.thumbnail}" alt="${course.title}">
                <div class="play-overlay">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="course-info">
                <h3 class="course-title">${course.title}</h3>
                <div class="course-price">${course.price === 0 ? 'Gratuit' : `$${course.price}`}</div>
                <div class="course-actions">
                    <button class="btn btn-primary view-details" data-video-id="${course.videoId}">Détails</button>
                    <button class="btn btn-secondary add-to-cart" data-course-id="${course.id}">Ajouter</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Setup event listeners
function setupEventListeners() {
    // Filter change events
    categoryFilter.addEventListener('change', updateSubcategories);
    categoryFilter.addEventListener('change', filterCourses);
    subcategoryFilter.addEventListener('change', filterCourses);
    priceFilter.addEventListener('change', filterCourses);
    
    // Modal events
    closeModal.addEventListener('click', () => videoModal.style.display = 'none');
    closeCartBtn.addEventListener('click', () => cartSidebar.style.right = '-400px');
    cartBtn.addEventListener('click', () => cartSidebar.style.right = '0');
    searchBtn.addEventListener('click', () => alert('Fonctionnalité de recherche à venir !'));
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
        }
    });
    
    // Delegated events for dynamic content
    document.addEventListener('click', (e) => {
        // Handle video thumbnail click
        if (e.target.closest('.course-thumbnail')) {
            const thumbnail = e.target.closest('.course-thumbnail');
            const videoId = thumbnail.dataset.videoId;
            openVideoModal(videoId);
        }
        
        // Handle view details button click
        if (e.target.closest('.view-details')) {
            const button = e.target.closest('.view-details');
            const videoId = button.dataset.videoId;
            openVideoModal(videoId);
        }
        
        // Handle add to cart button click
        if (e.target.closest('.add-to-cart')) {
            const button = e.target.closest('.add-to-cart');
            const courseId = parseInt(button.dataset.courseId);
            addToCart(courseId);
        }
    });
}

// Update subcategories based on selected category
function updateSubcategories() {
    try {
        const category = categoryFilter?.value;
        const subcategorySelect = document.getElementById('subcategory');
        
        if (!subcategorySelect) {
            console.error('Subcategory select element not found');
            return;
        }
        
        // Clear existing options
        subcategorySelect.innerHTML = '<option value="all">Toutes les sous-catégories</option>';
        
        if (!category || category === 'all') {
            subcategorySelect.disabled = true;
            return;
        }
        
        // Enable subcategory select
        subcategorySelect.disabled = false;
        
        // Get unique subcategories for the selected category
        const subcategories = [];
        const seen = new Set();
        
        courses.forEach(course => {
            if (course.category === category && course.subcategory && !seen.has(course.subcategory)) {
                seen.add(course.subcategory);
                subcategories.push(course.subcategory);
            }
        });
        
        // Sort subcategories alphabetically
        subcategories.sort((a, b) => a.localeCompare(b));
        
        // Add subcategory options
        subcategories.forEach(subcategory => {
            try {
                const option = document.createElement('option');
                option.value = subcategory;
                // Format the subcategory name for display
                const displayName = subcategory
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                option.textContent = displayName;
                subcategorySelect.appendChild(option);
            } catch (error) {
                console.error('Error creating subcategory option:', error, { subcategory });
            }
        });
        
        // Trigger filter update after subcategories are loaded
        filterCourses();
    } catch (error) {
        console.error('Error updating subcategories:', error);
    }
}

// Show loading state
function showLoadingState() {
    coursesContainer.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Chargement des cours...</p>
        </div>
    `;
}

// Filter courses based on selected filters
function filterCourses() {
    // Show loading state
    showLoadingState();
    
    // Use setTimeout to allow the UI to update with loading state
    setTimeout(() => {
        const category = categoryFilter.value;
        const subcategory = subcategoryFilter.value;
        const price = priceFilter.value;
        
        let filteredCourses = [...courses];
        
        try {
            // Apply category filter
            if (category && category !== 'all') {
                filteredCourses = filteredCourses.filter(course => course.category === category);
                
                // Apply subcategory filter if a category is selected
                if (subcategory && subcategory !== 'all') {
                    filteredCourses = filteredCourses.filter(course => course.subcategory === subcategory);
                }
            }
            
            // Apply price filter
            if (price && price !== 'all') {
                filteredCourses = filteredCourses.filter(course => {
                    if (price === 'free') {
                        return course.price === 0 || course.price === '0' || !course.price;
                    } else if (price === 'paid') {
                        return course.price > 0;
                    }
                    return true;
                });
            }
            
            // Small delay to show loading state (for demo purposes)
            setTimeout(() => {
                // If no courses match the filters, show a message
                if (filteredCourses.length === 0) {
                    coursesContainer.innerHTML = `
                        <div class="no-results">
                            <i class="fas fa-search"></i>
                            <h3>Aucun cours ne correspond à vos critères de recherche</h3>
                            <p>Essayez de modifier vos filtres ou de réinitialiser la recherche.</p>
                            <button class="btn btn-primary" id="resetFiltersBtn">Réinitialiser les filtres</button>
                        </div>
                    `;
                    
                    // Add event listener to reset filters button
                    document.getElementById('resetFiltersBtn')?.addEventListener('click', resetFilters);
                } else {
                    displayCourses(filteredCourses);
                }
            }, 300); // Short delay to show loading state
            
        } catch (error) {
            console.error('Error filtering courses:', error);
            // En cas d'erreur, afficher tous les cours
            displayCourses(courses);
        }
    }, 10); // Small delay to allow UI to update
}

// Reset all filters
function resetFilters() {
    categoryFilter.value = 'all';
    subcategoryFilter.innerHTML = '<option value="all">Toutes les sous-catégories</option>';
    subcategoryFilter.disabled = true;
    priceFilter.value = 'all';
    
    // Afficher tous les cours
    displayCourses(courses);
}

// Open video modal with selected video
function openVideoModal(videoId) {
    const course = courses.find(c => c.videoId === videoId);
    if (!course) return;
    
    videoTitle.textContent = course.title;
    videoDescription.textContent = course.description;
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    videoModal.style.display = 'block';
    
    // Update add to cart button in modal
    const modalAddToCart = document.querySelector('.modal .add-to-cart');
    modalAddToCart.dataset.courseId = course.id;
    
    // Scroll to top of modal
    videoModal.scrollTo(0, 0);
}

// Add course to cart
function addToCart(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;
    
    // Check if course is already in cart
    const existingItem = cart.find(item => item.id === courseId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...course,
            quantity: 1
        });
    }
    
    updateCartCount();
    updateCartDisplay();
    
    // Show feedback
    alert(`${course.title} a été ajouté à votre panier !`);
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

// Update cart display in sidebar
function updateCartDisplay() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        cartTotal.textContent = '0 €';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.thumbnail}" alt="${item.title}" class="cart-item-thumbnail">
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <div class="cart-item-price">${item.price === 0 ? 'Gratuit' : `$${item.price}`}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">&times;</button>
        </div>
    `).join('');
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total.toFixed(2)} €`;
    
    // Add event listeners for quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const action = button.dataset.action;
            const id = parseInt(button.dataset.id);
            updateCartItemQuantity(id, action);
        });
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(button.dataset.id);
            removeFromCart(id);
        });
    });
}

// Update item quantity in cart
function updateCartItemQuantity(courseId, action) {
    const item = cart.find(item => item.id === courseId);
    if (!item) return;
    
    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease' && item.quantity > 1) {
        item.quantity -= 1;
    }
    
    updateCartCount();
    updateCartDisplay();
}

// Remove item from cart
function removeFromCart(courseId) {
    cart = cart.filter(item => item.id !== courseId);
    updateCartCount();
    updateCartDisplay();
}

// Handle scroll event for filters
function handleScroll() {
    const filters = document.querySelector('.filters');
    if (!filters) return;
    
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        filters.classList.add('scrolled');
    } else {
        filters.classList.remove('scrolled');
    }
}

// Debounce function to limit how often a function can run
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    init();
    
    // Initialize scroll event with debounce for better performance
    window.addEventListener('scroll', debounce(handleScroll, 10));
    
    // Initial check in case page is loaded with scroll position
    handleScroll();
    
    // Add animation order to course cards for staggered animations
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
});
