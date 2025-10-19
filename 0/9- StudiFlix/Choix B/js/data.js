// Course data with YouTube video information
const courses = [
    // ========================
    // INTELLIGENCE ARTIFICIELLE
    // ========================
    
    // Introduction à l'IA
    {
        id: 1,
        title: "L'IA expliquée en 5 minutes - TEDxParis",
        category: 'ia',
        subcategory: 'introduction',
        price: 0,
        thumbnail: 'https://img.youtube.com/vi/WSKi8HfcxEk/maxresdefault.jpg',
        videoId: 'WSKi8HfcxEk',
        description: 'Une introduction claire et concise au concept d\'intelligence artificielle et son impact sur notre quotidien.'
    },
    {
        id: 2,
        title: "Qu'est-ce que l'IA ? Mythe vs Réalité",
        category: 'ia',
        subcategory: 'introduction',
        price: 0,
        thumbnail: 'https://img.youtube.com/vi/9g0H41FI_PQ/maxresdefault.jpg',
        videoId: '9g0H41FI_PQ',
        description: 'Décryptage des idées reçues sur l\'IA et explication de la réalité technologique actuelle.'
    },
    
    // Machine Learning
    {
        id: 3,
        title: "Machine Learning avec Python - OpenClassrooms",
        category: 'ia',
        subcategory: 'machine-learning',
        price: 29.99,
        thumbnail: 'https://img.youtube.com/vi/3nLpr1h2A8M/maxresdefault.jpg',
        videoId: '3nLpr1h2A8M',
        description: 'Cours complet pour maîtriser les algorithmes de Machine Learning avec Python.'
    },
    
    // Deep Learning
    {
        id: 4,
        title: "Introduction au Deep Learning",
        category: 'ia',
        subcategory: 'deep-learning',
        price: 34.99,
        thumbnail: 'https://img.youtube.com/vi/Y4OmMfUHjoc/maxresdefault.jpg',
        videoId: 'Y4OmMfUHjoc',
        description: 'Découvrez les réseaux de neurones et les architectures de Deep Learning.'
    },
    
    // ========================
    // DÉVELOPPEMENT WEB
    // ========================
    
    // HTML & CSS
    {
        id: 5,
        title: "HTML5 & CSS3 - Cours Complet",
        category: 'developpement',
        subcategory: 'html-css',
        price: 0,
        thumbnail: 'https://img.youtube.com/vi/cZesW_I-nDo/maxresdefault.jpg',
        videoId: 'cZesW_I-nDo',
        description: 'Apprenez à créer des sites web modernes avec HTML5 et CSS3.'
    },
    
    // JavaScript
    {
        id: 6,
        title: "JavaScript - Formation Complète",
        category: 'developpement',
        subcategory: 'javascript',
        price: 24.99,
        thumbnail: 'https://img.youtube.com/vi/gBoS2n1t5Wk/maxresdefault.jpg',
        videoId: 'gBoS2n1t5Wk',
        description: 'Maîtrisez JavaScript pour créer des sites web interactifs.'
    },
    
    // PHP
    {
        id: 7,
        title: "PHP & MySQL - Site Dynamique",
        category: 'developpement',
        subcategory: 'php',
        price: 27.99,
        thumbnail: 'https://img.youtube.com/vi/E5W-u7tjS2Y/maxresdefault.jpg',
        videoId: 'E5W-u7tjS2Y',
        description: 'Créez des sites web dynamiques avec PHP et MySQL.'
    },
    
    // Python
    {
        id: 8,
        title: "Python - De Débutant à Expert",
        category: 'developpement',
        subcategory: 'python',
        price: 29.99,
        thumbnail: 'https://img.youtube.com/vi/HWxwY_GoH9M/maxresdefault.jpg',
        videoId: 'HWxwY_GoH9M',
        description: 'Apprenez Python, un langage puissant et polyvalent.'
    },
    
    // ========================
    // MARKETING DIGITAL
    // ========================
    
    // SEO
    {
        id: 9,
        title: "SEO - Première Page Google 2024",
        category: 'marketing',
        subcategory: 'seo',
        price: 32.99,
        thumbnail: 'https://img.youtube.com/vi/wX-yA_Q0D4A/maxresdefault.jpg',
        videoId: 'wX-yA_Q0D4A',
        description: 'Techniques avancées de référencement naturel pour 2024.'
    },
    
    // Marketing de Contenu
    {
        id: 10,
        title: "Stratégie de Contenu Efficace",
        category: 'marketing',
        subcategory: 'contenu',
        price: 24.99,
        thumbnail: 'https://img.youtube.com/vi/j_222NswYkE/maxresdefault.jpg',
        videoId: 'j_222NswYkE',
        description: 'Créez une stratégie de contenu qui convertit.'
    },
    
    // Réseaux Sociaux
    {
        id: 11,
        title: "Marketing Instagram Complet",
        category: 'marketing',
        subcategory: 'reseaux-sociaux',
        price: 27.99,
        thumbnail: 'https://img.youtube.com/vi/p43_h3s3yCc/maxresdefault.jpg',
        videoId: 'p43_h3s3yCc',
        description: 'Maîtrisez Instagram pour développer votre marque.'
    },
    
    // Publicité en Ligne
    {
        id: 12,
        title: "Google Ads - Formation Complète",
        category: 'marketing',
        subcategory: 'publicite',
        price: 34.99,
        thumbnail: 'https://img.youtube.com/vi/W0-dDw_x8fA/maxresdefault.jpg',
        videoId: 'W0-dDw_x8fA',
        description: 'Créez des campagnes publicitaires performantes.'
    },
    
    // ========================
    // BIEN-ÊTRE
    // ========================
    
    // Méditation
    {
        id: 13,
        title: "Méditation Guidée - 10 min",
        category: 'bien-etre',
        subcategory: 'meditation',
        price: 0,
        thumbnail: 'https://img.youtube.com/vi/6h4494l82s4/maxresdefault.jpg',
        videoId: '6h4494l82s4',
        description: 'Séance de méditation pour apaiser l\'esprit.'
    },
    
    // Gestion du Stress
    {
        id: 14,
        title: "Gestion du Stress - Techniques Scientifiques",
        category: 'bien-etre',
        subcategory: 'stress',
        price: 19.99,
        thumbnail: 'https://img.youtube.com/vi/L2t4-aY-bI8/maxresdefault.jpg',
        videoId: 'L2t4-aY-bI8',
        description: 'Méthodes prouvées pour réduire le stress.'
    },
    
    // Productivité
    {
        id: 15,
        title: "Méthode Pomodoro - Guide Complet",
        category: 'bien-etre',
        subcategory: 'productivite',
        price: 0,
        thumbnail: 'https://img.youtube.com/vi/g_jT-gDPa2k/maxresdefault.jpg',
        videoId: 'g_jT-gDPa2k',
        description: 'Augmentez votre productivité avec cette technique simple.'
    },
    
    // ========================
    // LANGUES
    // ========================
    
    // Français
    {
        id: 16,
        title: "Français - Bases de la Conversation",
        category: 'langues',
        subcategory: 'francais',
        price: 0,
        thumbnail: 'https://img.youtube.com/vi/LKP0hL4a9rU/maxresdefault.jpg',
        videoId: 'LKP0hL4a9rU',
        description: 'Apprenez les bases du français conversationnel.'
    },
    
    // Anglais
    {
        id: 17,
        title: "English Grammar in 100 Minutes",
        category: 'langues',
        subcategory: 'anglais',
        price: 24.99,
        thumbnail: 'https://img.youtube.com/vi/b09-k9v4GvI/maxresdefault.jpg',
        videoId: 'b09-k9v4GvI',
        description: 'Maîtrisez la grammaire anglaise rapidement.'
    },
    
    // Japonais
    {
        id: 18,
        title: "Japonais - Les Bases du Kanji",
        category: 'langues',
        subcategory: 'japonais',
        price: 29.99,
        thumbnail: 'https://img.youtube.com/vi/Yf1RTVvYxzA/maxresdefault.jpg',
        videoId: 'Yf1RTVvYxzA',
        description: 'Initiation aux caractères japonais Kanji.'
    }
];

// Export the courses array for use in other files
// Note: In a real application, this would be an API call
try {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { courses };
    }
} catch (e) {
    // This is a browser environment, no need to export
}
