const ThemeManager = {
    STORAGE_KEY: 'darkModeEnabled',
    DARK_CLASS: 'dark-mode',
    TRANSITION_CLASS: 'theme-transition',

    initialize: function() {
        const isDarkMode = localStorage.getItem(this.STORAGE_KEY) === 'true';
        
        if (localStorage.getItem(this.STORAGE_KEY) === null) {
            this.setTheme(false, false);
        } else {
            this.setTheme(isDarkMode, false);
        }
    },

    setTheme: function(isDark, withTransition = true) {
        if (withTransition) {
            document.body.classList.add(this.TRANSITION_CLASS);
        }

        document.documentElement.classList.toggle(this.DARK_CLASS, isDark);
        localStorage.setItem(this.STORAGE_KEY, isDark);

        if (withTransition) {
            // Remove transition class after animation completes
            setTimeout(() => {
                document.body.classList.remove(this.TRANSITION_CLASS);
            }, 300);
        }
    },

    toggle: function() {
        const isDark = document.documentElement.classList.contains(this.DARK_CLASS);
        this.setTheme(!isDark, true);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    // Initialize the ThemeManager object
    ThemeManager.initialize();
    
    // Handle main toggle
    const mainToggleBtn = document.getElementById('toggleSwitch');
    if (mainToggleBtn) {
        mainToggleBtn.addEventListener('click', () => ThemeManager.toggle());
    }
    
    // Handle sidebar toggle
    const sidebarToggleBtn = document.getElementById('sidebarToggleSwitch');
    if (sidebarToggleBtn) {
        sidebarToggleBtn.addEventListener('click', () => ThemeManager.toggle());
    }
});

function updateActiveNavItem() {
    const navItems = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname;

    // Remove active class from all items
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Add active class to matching item
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        
        // Handle root path
        if (currentPath === '/' && href === '/') {
            item.classList.add('active');
            console.log("root path active");
            return;
        }
        
        // Handle other paths - exact match or direct child
        if (href !== '/') {
            const hrefPattern = new RegExp(`^${href}/?$|^${href}/[^/]+$`);
            if (hrefPattern.test(currentPath)) {
                item.classList.add('active');
                console.log("other path active");
            }
        }
    });
}

// Initialize
window.addEventListener('load', updateActiveNavItem);

// Add click event listeners to nav links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(updateActiveNavItem, 100); 
            
        });
    });

    //hamburger checkbox -- uncheck when link is clicked
    const hamburgerCheckbox = document.getElementById('hamburger-toggle');

    const sideNav = document.querySelector('.side-nav-container');

    if (sideNav) {
        sideNav.addEventListener('click', (event) => {
            if (event.target.tagName.toLowerCase() === 'a') {
                hamburgerCheckbox.checked = false;
            }
        });
    }
});

// Image Modal Functions
function openModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImg.src = src;
    modalCaption.textContent = alt;
    modal.classList.add('show');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

