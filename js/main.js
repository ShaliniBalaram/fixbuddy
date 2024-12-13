// Main JavaScript for FixBuddy

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeSearch();
    initializeAnimations();
    initializeTooltips();
    initializeTimeEstimates();
    setupMobileMenu();
    setupBackToTop();
});

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.category-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    // Add highlight animation
                    card.classList.add('highlight');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('highlight');
                }
            });
        });
    }
}

// Smooth scroll animation
function initializeAnimations() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate cards on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', e => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = element.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);

            const rect = element.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width - tooltip.offsetWidth) / 2 + 'px';
        });

        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Filter repairs by difficulty
function initializeDifficultyFilters() {
    const filterButtons = document.querySelectorAll('.difficulty-filter');
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const difficulty = this.getAttribute('data-difficulty');
                const cards = document.querySelectorAll('.category-card');

                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                cards.forEach(card => {
                    const cardDifficulty = card.querySelector('.nav-link i[class*="difficulty"]')
                        ?.parentElement?.textContent.toLowerCase();
                    
                    if (difficulty === 'all' || cardDifficulty?.includes(difficulty.toLowerCase())) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Time estimate calculator
function initializeTimeEstimates() {
    const timeElements = document.querySelectorAll('.time-estimate');
    timeElements.forEach(element => {
        const minutes = parseInt(element.getAttribute('data-minutes'));
        if (!isNaN(minutes)) {
            let timeText = '';
            if (minutes < 60) {
                timeText = `${minutes} minutes`;
            } else {
                const hours = Math.floor(minutes / 60);
                const remainingMinutes = minutes % 60;
                timeText = `${hours} hour${hours > 1 ? 's' : ''}`;
                if (remainingMinutes > 0) {
                    timeText += ` ${remainingMinutes} minutes`;
                }
            }
            element.textContent = timeText;
        }
    });
}

// Mobile menu handling
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            
            // Toggle aria-expanded
            const isExpanded = menuBtn.classList.contains('active');
            menuBtn.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Add to favorites functionality
function addToFavorites(repairId) {
    let favorites = JSON.parse(localStorage.getItem('fixbuddy-favorites') || '[]');
    
    if (!favorites.includes(repairId)) {
        favorites.push(repairId);
        localStorage.setItem('fixbuddy-favorites', JSON.stringify(favorites));
        updateFavoriteButton(repairId, true);
    }
}

// Remove from favorites
function removeFromFavorites(repairId) {
    let favorites = JSON.parse(localStorage.getItem('fixbuddy-favorites') || '[]');
    
    favorites = favorites.filter(id => id !== repairId);
    localStorage.setItem('fixbuddy-favorites', JSON.stringify(favorites));
    updateFavoriteButton(repairId, false);
}

// Update favorite button appearance
function updateFavoriteButton(repairId, isFavorite) {
    const button = document.querySelector(`[data-repair-id="${repairId}"] .favorite-button`);
    if (button) {
        button.innerHTML = isFavorite ? 
            '<i class="fas fa-heart"></i>' : 
            '<i class="far fa-heart"></i>';
        button.setAttribute('aria-label', 
            isFavorite ? 'Remove from favorites' : 'Add to favorites');
    }
}

// Print repair guide
function printRepairGuide() {
    window.print();
}

// Share repair guide
function shareRepairGuide(title, url) {
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = url;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        
        alert('Link copied to clipboard!');
    }
}

// Back to Top functionality
function setupBackToTop() {
    const backToTopButton = document.querySelector('.footer .btn');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Add CSS class for animations
const styles = `
    .highlight {
        animation: highlightAnimation 1s ease-in-out;
    }

    @keyframes highlightAnimation {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }

    .tooltip {
        position: fixed;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 14px;
        z-index: 1000;
        pointer-events: none;
    }

    .category-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .category-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
