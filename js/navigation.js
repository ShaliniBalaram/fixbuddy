document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        const isExpanded = mainNav.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mainNav.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', false);
        }
    });

    // Add keyboard navigation for accessibility
    const dropdownButtons = document.querySelectorAll('.category-btn');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                const isExpanded = dropdown.style.display === 'block';
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    content.style.display = 'none';
                });
                
                dropdown.style.display = isExpanded ? 'none' : 'block';
                this.setAttribute('aria-expanded', !isExpanded);
            }
        });
    });
});
