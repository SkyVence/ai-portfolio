/**
 * ==========================================
 * PORTFOLIO MAIN JAVASCRIPT
 * Handles animations and interactivity
 * ==========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScrollingWithFade();
    initActiveNavigation();
    initTimelineLines();
    initContactForm();
    initProjectFilters();
    initMobileMenu();
    initThemeToggle();
    initViewCounter();
});

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after animation (uncomment to animate only once)
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    });

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Smooth scrolling with fade transition for navigation links
 */
function initSmoothScrollingWithFade() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const overlay = document.getElementById('page-transition');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fade out
                overlay.classList.add('active');
                
                setTimeout(() => {
                    // Scroll to target
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'instant' // Use instant since we're doing a fade
                    });
                    
                    // Fade in
                    setTimeout(() => {
                        overlay.classList.remove('active');
                    }, 100);
                }, 300); // Wait for fade out
            }
        });
    });
}

/**
 * Update active navigation link based on scroll position
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        root: null,
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

/**
 * Initialize timeline lines with gaps around dates
 */
function initTimelineLines() {
    const projectItems = document.querySelectorAll('.project-item:not(.filtered-out)');
    const allProjectItems = document.querySelectorAll('.project-item');
    
    // Hide all timeline lines first
    allProjectItems.forEach(item => {
        const topLine = item.querySelector('.timeline-line-top');
        const bottomLine = item.querySelector('.timeline-line-bottom');
        if (topLine) topLine.style.display = 'none';
        if (bottomLine) bottomLine.style.display = 'none';
    });
    
    // Wait for layout to settle
    requestAnimationFrame(() => {
        projectItems.forEach((item, index) => {
            const dateEl = item.querySelector('.project-date');
            const topLine = item.querySelector('.timeline-line-top');
            const bottomLine = item.querySelector('.timeline-line-bottom');
            
            if (!dateEl) return;
            
            const itemRect = item.getBoundingClientRect();
            const dateRect = dateEl.getBoundingClientRect();
            
            // Calculate date position relative to item
            const dateTop = dateRect.top - itemRect.top;
            const dateBottom = dateRect.bottom - itemRect.top;
            const dateHeight = dateRect.height;
            const gap = 6; // Gap around the date
            
            // Top line: from top of item to just above date (not for first visible item)
            if (topLine && index > 0) {
                topLine.style.display = 'block';
                topLine.style.top = '0';
                topLine.style.height = `${dateTop - gap}px`;
            }
            
            // Bottom line: from just below date to bottom of item (not for last visible item)
            if (bottomLine && index < projectItems.length - 1) {
                const bottomStart = dateBottom + gap;
                const bottomHeight = itemRect.height - bottomStart;
                bottomLine.style.display = 'block';
                bottomLine.style.top = `${bottomStart}px`;
                bottomLine.style.height = `${bottomHeight}px`;
            }
        });
    });
    
    // Recalculate on resize
    window.addEventListener('resize', debounce(() => {
        initTimelineLines();
    }, 100));
}

/**
 * ==========================================
 * UTILITY FUNCTIONS
 * Add more functionality as needed
 * ==========================================
 */

/**
 * Contact form handler - opens email client with prefilled data
 * EDIT: Change the email address below to your own
 */
const CONTACT_EMAIL = 'your.email@example.com';

/**
 * Initialize project filters for the timeline
 */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (!filterBtns.length || !projectItems.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('filtered-out');
                } else {
                    item.classList.add('filtered-out');
                }
            });
            
            // Recalculate timeline lines after filter
            setTimeout(() => {
                initTimelineLines();
            }, 350); // Wait for transition to complete
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Build the mailto link with prefilled data
        const body = `Hi,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`;
        
        const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Create a temporary link and click it
        const link = document.createElement('a');
        link.href = mailtoLink;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 */
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 * @param {Element} el - Element to check
 * @returns {boolean}
 */
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;
    
    const hamburgerIcon = mobileMenuBtn.querySelector('.hamburger-icon');
    const closeIcon = mobileMenuBtn.querySelector('.close-icon');
    
    function openMenu() {
        mobileMenu.style.display = 'block';
        if (hamburgerIcon) hamburgerIcon.style.display = 'none';
        if (closeIcon) closeIcon.style.display = 'block';
    }
    
    function closeMenu() {
        mobileMenu.style.display = 'none';
        if (hamburgerIcon) hamburgerIcon.style.display = 'block';
        if (closeIcon) closeIcon.style.display = 'none';
    }
    
    // Initialize closed state
    closeMenu();
    
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = mobileMenu.style.display === 'block';
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMenu();
        }
    });
}

/**
 * Initialize theme toggle functionality (default: dark)
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const body = document.body;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    // Apply saved theme on load
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
    }
    
    // Update icons based on current theme
    updateThemeIcons(savedTheme === 'light');
    
    // Toggle function
    function toggleTheme(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isLight = body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeIcons(isLight);
    }
    
    // Update icons based on theme
    function updateThemeIcons(isLight) {
        const sunIcons = document.querySelectorAll('.sun-icon');
        const moonIcons = document.querySelectorAll('.moon-icon');
        
        sunIcons.forEach(icon => {
            icon.style.display = isLight ? 'none' : 'block';
        });
        
        moonIcons.forEach(icon => {
            icon.style.display = isLight ? 'block' : 'none';
        });
    }
    
    // Add event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }
}

/**
 * Initialize view counter using localStorage
 * For a real production site, use a backend service
 */
function initViewCounter() {
    const viewCounterEl = document.getElementById('view-counter');
    if (!viewCounterEl) return;
    
    // Get current view count from localStorage
    let viewCount = parseInt(localStorage.getItem('portfolio_views') || '0', 10);
    
    // Check if this is a new session (using sessionStorage)
    const hasVisited = sessionStorage.getItem('portfolio_visited');
    
    if (!hasVisited) {
        // Increment view count for new sessions
        viewCount++;
        localStorage.setItem('portfolio_views', viewCount.toString());
        sessionStorage.setItem('portfolio_visited', 'true');
    }
    
    // Animate the counter
    animateCounter(viewCounterEl, viewCount);
}

/**
 * Animate counter from 0 to target value
 * @param {Element} element - Counter element
 * @param {number} target - Target number
 */
function animateCounter(element, target) {
    const duration = 1000; // 1 second
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(update);
}
