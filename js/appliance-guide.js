document.addEventListener('DOMContentLoaded', function() {
    initializeModelSearch();
    loadReviews();
    setupVideoPlaylists();
});

function initializeModelSearch() {
    const searchInput = document.getElementById('model-search');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            // Here we would integrate with an API to fetch model-specific information
            // For now, we'll just show a placeholder message
            const value = e.target.value.trim();
            if (value) {
                searchModelInfo(value);
            }
        });
    }

    // Add collapsible functionality to alternatives
    const tasks = document.querySelectorAll('.task');
    tasks.forEach(task => {
        task.addEventListener('click', function() {
            const alternatives = this.nextElementSibling;
            alternatives.style.display = alternatives.style.display === 'none' ? 'block' : 'none';
        });
    });

    // Initialize tooltips for household alternatives
    const alternativeTips = document.querySelectorAll('.household-alternatives li');
    alternativeTips.forEach(tip => {
        tip.setAttribute('title', 'Click for more details');
        tip.addEventListener('click', function() {
            showDetailedTip(this.textContent);
        });
    });
}

function searchModelInfo(model) {
    // This would connect to a database of appliance models
    // For now, just console log the search
    console.log(`Searching for model: ${model}`);
}

function loadReviews() {
    // This would fetch real reviews from an API
    const reviews = [
        {
            rating: 4,
            title: "Great stove, but watch for igniter issues",
            content: "The igniter tends to get dirty quickly. Clean it monthly for best performance.",
            date: "2024-12-15"
        },
        {
            rating: 5,
            title: "Perfect with proper maintenance",
            content: "Follow the cleaning schedule and it works like new for years.",
            date: "2024-12-10"
        }
    ];

    const reviewsContainer = document.querySelector('.reviews-container');
    if (reviewsContainer) {
        reviews.forEach(review => {
            const reviewElement = createReviewElement(review);
            reviewsContainer.appendChild(reviewElement);
        });
    }
}

function createReviewElement(review) {
    const div = document.createElement('div');
    div.className = 'review-card';
    
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    div.innerHTML = `
        <div class="review-header">
            <span class="stars">${stars}</span>
            <span class="date">${review.date}</span>
        </div>
        <h3>${review.title}</h3>
        <p>${review.content}</p>
    `;
    
    return div;
}

function setupVideoPlaylists() {
    // This would organize videos by category and allow easy navigation
    const categories = {
        cleaning: [
            { title: "Daily Cleaning Guide", url: "example1" },
            { title: "Deep Cleaning Tutorial", url: "example2" }
        ],
        maintenance: [
            { title: "Monthly Maintenance Checklist", url: "example3" },
            { title: "Seasonal Care Tips", url: "example4" }
        ],
        repairs: [
            { title: "Fix Common Igniter Problems", url: "example5" },
            { title: "Burner Repair Guide", url: "example6" }
        ]
    };

    // Initialize video playlists
    Object.keys(categories).forEach(category => {
        const playlist = document.querySelector(`.${category}-playlist`);
        if (playlist) {
            categories[category].forEach(video => {
                const videoLink = createVideoLink(video);
                playlist.appendChild(videoLink);
            });
        }
    });
}

function createVideoLink(video) {
    const link = document.createElement('a');
    link.href = `#${video.url}`;
    link.className = 'video-link';
    link.innerHTML = `
        <i class="fas fa-play-circle"></i>
        <span>${video.title}</span>
    `;
    link.addEventListener('click', (e) => {
        e.preventDefault();
        loadVideo(video.url);
    });
    return link;
}

function loadVideo(videoId) {
    // This would load the selected video into the main player
    const player = document.querySelector('.main-video-player');
    if (player) {
        player.src = `https://www.youtube.com/embed/${videoId}`;
    }
}

function showDetailedTip(tipContent) {
    const modal = document.createElement('div');
    modal.className = 'tip-modal';
    modal.innerHTML = `
        <div class="tip-content">
            <h3>Detailed Guide</h3>
            <p>${getDetailedTipContent(tipContent)}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function getDetailedTipContent(tip) {
    // This would ideally come from a database, but for now we'll use a simple switch
    const tipDetails = {
        'Safety pin or toothpick for cleaning ports': 'Gently insert the pin into each port, being careful not to damage the metal. Twist slightly to remove debris. Always ensure the burner is cool and the gas is off.',
        'Old toothbrush for scrubbing': 'Use gentle circular motions to clean around the burner. The bristles are perfect for reaching tight spaces. Rinse thoroughly after cleaning.',
        'Vinegar solution for dissolving grease': 'Mix equal parts white vinegar and water. Apply with a spray bottle or cloth. Let sit for 5-10 minutes before wiping clean.'
    };
    
    return tipDetails[tip.trim()] || 'Detailed information coming soon!';
}
