// Variables globales pour la navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Gestion du header au scroll
const header = document.querySelector('.navbar');
let lastScroll = 0;

// Animation du menu burger
const handleBurgerClick = () => {
    // Toggle nav
    nav.classList.toggle('nav-active');
    
    // Animation des liens
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index * 0.1 + 0.3}s`;
        }
    });
    
    // Burger animation
    burger.classList.toggle('toggle');
    
    // Prevent scrolling when menu is open
    document.body.style.overflow = nav.classList.contains('nav-active') ? 'hidden' : '';
};

burger.addEventListener('click', handleBurgerClick);

// Fermer le menu mobile lors du clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.body.style.overflow = '';
        }
    });
});

// Smooth scrolling pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Gestion du scroll
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Ajoute/enlève la classe scrolled
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Gestion du menu actif
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(li => {
        li.classList.remove('active');
        if (li.querySelector('a').getAttribute('href').slice(1) === current) {
            li.classList.add('active');
        }
    });
    
    // Effet parallaxe sur le hero
    const hero = document.querySelector('.hero');
    hero.style.backgroundPositionY = currentScroll * 0.5 + 'px';
    
    lastScroll = currentScroll;
});

// Projets du portfolio
const projects = [
    {
        title: "E-commerce Modern",
        description: "Site e-commerce responsive avec panier d'achat et paiement en ligne",
        image: "https://source.unsplash.com/random/800x600/?ecommerce",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        demoLink: "#",
        githubLink: "#",
        category: "web"
    },
    {
        title: "Application Fitness",
        description: "Application mobile de suivi d'entraînement et de nutrition",
        image: "https://source.unsplash.com/random/800x600/?fitness",
        tags: ["React Native", "Firebase", "Redux"],
        demoLink: "#",
        githubLink: "#",
        category: "mobile"
    },
    {
        title: "Dashboard Analytics",
        description: "Interface d'administration avec visualisation de données",
        image: "https://source.unsplash.com/random/800x600/?dashboard",
        tags: ["Vue.js", "D3.js", "Node.js"],
        demoLink: "#",
        githubLink: "#",
        category: "web"
    },
    {
        title: "Portfolio Photographe",
        description: "Site vitrine pour photographe professionnel",
        image: "https://source.unsplash.com/random/800x600/?photography",
        tags: ["HTML", "CSS", "JavaScript"],
        demoLink: "#",
        githubLink: "#",
        category: "design"
    },
    {
        title: "Application Météo",
        description: "Application météo en temps réel avec géolocalisation",
        image: "https://source.unsplash.com/random/800x600/?weather",
        tags: ["React", "API", "Sass"],
        demoLink: "#",
        githubLink: "#",
        category: "web"
    },
    {
        title: "Réseau Social",
        description: "Plateforme sociale avec messagerie instantanée",
        image: "https://source.unsplash.com/random/800x600/?social",
        tags: ["React", "Socket.io", "MongoDB"],
        demoLink: "#",
        githubLink: "#",
        category: "web"
    }
];

// Fonction pour créer une carte de projet
function createProjectCard(project) {
    return `
        <div class="project-card" data-category="${project.category}">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay"></div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" class="project-link demo" target="_blank">Voir le projet</a>
                    <a href="${project.githubLink}" class="project-link github" target="_blank">
                        <i class="fab fa-github"></i> Code
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Initialisation du portfolio
function initPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    const categories = ['all', ...new Set(projects.map(project => project.category))];
    
    // Création des filtres
    const filtersHTML = categories.map(category => `
        <button class="filter-btn ${category === 'all' ? 'active' : ''}" 
                data-category="${category}">
            ${category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
    `).join('');
    
    // Insertion des filtres
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'portfolio-filters';
    filtersContainer.innerHTML = filtersHTML;
    portfolioGrid.parentNode.insertBefore(filtersContainer, portfolioGrid);
    
    // Affichage initial des projets
    portfolioGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');
    
    // Gestion des filtres
    filtersContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            // Mise à jour des boutons actifs
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            const category = e.target.dataset.category;
            const filteredProjects = category === 'all' 
                ? projects 
                : projects.filter(project => project.category === category);
            
            // Animation des projets
            portfolioGrid.style.opacity = '0';
            setTimeout(() => {
                portfolioGrid.innerHTML = filteredProjects.map(project => createProjectCard(project)).join('');
                portfolioGrid.style.opacity = '1';
            }, 300);
        }
    });
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', initPortfolio);

// Gestion des services
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        // Si la carte est déjà active, on la désactive
        if (card.classList.contains('active')) {
            card.classList.remove('active');
            return;
        }

        // On désactive toutes les autres cartes
        serviceCards.forEach(c => c.classList.remove('active'));
        
        // On active la carte cliquée
        card.classList.add('active');
    });
});

// Fermer la carte active si on clique en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card')) {
        serviceCards.forEach(card => card.classList.remove('active'));
    }
});
