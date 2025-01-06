document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchDropdown = document.getElementById('search-dropdown');
    
    // List of all repair guides
    const repairGuides = [
        { title: 'Fix Leaky Faucet', url: '/pages/fix-leaky-faucet.html' },
        { title: 'Fix Wobbly Chair', url: '/pages/fix-wobbly-chair.html' },
        { title: 'Unclog Drain', url: '/pages/unclog-drain.html' },
        { title: 'Fix Squeaky Door', url: '/pages/fix-squeaky-door.html' },
        { title: 'Fix Running Toilet', url: '/pages/fix-running-toilet.html' },
        { title: 'Fix Loose Outlet', url: '/pages/fix-loose-outlet.html' },
        { title: 'Repair Ceiling Fan', url: '/pages/repair-ceiling-fan.html' },
        { title: 'Fix Stuck Window', url: '/pages/fix-stuck-window.html' },
        { title: 'Repair Tile Grout', url: '/pages/repair-tile-grout.html' },
        { title: 'Fix Carpet Stains', url: '/pages/fix-carpet-stains.html' }
    ];

    // Function to show dropdown with filtered results
    function showDropdown(filterText) {
        searchDropdown.innerHTML = '';
        const filteredGuides = repairGuides.filter(guide => 
            guide.title.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filteredGuides.length > 0) {
            filteredGuides.forEach(guide => {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.textContent = guide.title;
                item.addEventListener('click', () => {
                    window.location.href = guide.url;
                });
                searchDropdown.appendChild(item);
            });
            searchDropdown.classList.add('show');
        } else {
            searchDropdown.classList.remove('show');
        }
    }

    // Event listeners
    searchInput.addEventListener('input', (e) => {
        const value = e.target.value.trim();
        if (value.length > 0) {
            showDropdown(value);
        } else {
            searchDropdown.classList.remove('show');
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.classList.remove('show');
        }
    });

    // Show all guides when focusing on empty input
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim() === '') {
            showDropdown('');
        }
    });
});
