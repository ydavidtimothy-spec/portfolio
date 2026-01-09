document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // THEME TOGGLE FUNCTIONALITY
    // ========================================
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    
    // Get saved theme from localStorage or default to 'dark'
    const getSavedTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Default to dark theme (as requested)
        return 'dark';
    };
    
    // Apply theme to document
    const applyTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };
    
    // Initialize theme on page load
    const initTheme = () => {
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);
    };
    
    // Toggle between light and dark
    const toggleTheme = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    };
    
    // Initialize theme immediately
    initTheme();
    
    // Add click event to theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // ========================================
    // Loading Screen with Typewriter Effect
    // ========================================
    const loaderScreen = document.querySelector('.loader-screen');
    const typewriter = document.querySelector('.typewriter');
    
    if (loaderScreen && typewriter) {
        const brandName = 'david.yoro';
        const accentStart = 5; // Index where ".yoro" starts
        let charIndex = 0;

        const typeInterval = setInterval(() => {
            if (charIndex < brandName.length) {
                const char = brandName[charIndex];
                if (charIndex >= accentStart) {
                    // Add accent color for ".yoro"
                    if (charIndex === accentStart) {
                        typewriter.innerHTML += '<span class="accent">';
                    }
                    typewriter.innerHTML += char;
                    if (charIndex === brandName.length - 1) {
                        typewriter.innerHTML += '</span>';
                    }
                } else {
                    typewriter.innerHTML += char;
                }
                charIndex++;
            } else {
                clearInterval(typeInterval);
                // Hide cursor after typing completes
                const cursor = document.querySelector('.cursor');
                if (cursor) cursor.style.display = 'none';
                
                // Fade out loader after a brief pause
                setTimeout(() => {
                    loaderScreen.classList.add('hidden');
                }, 600);
            }
        }, 120); // Typing speed: 120ms per character
    }

    // Scroll Animations using Intersection Observer with Staggering
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        // Group entries by parent to handle staggering
        const parentGroups = new Map();

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                if (!parentGroups.has(parent)) {
                    parentGroups.set(parent, []);
                }
                parentGroups.get(parent).push(entry.target);
                observer.unobserve(entry.target);
            }
        });

        // Apply animations with delay for each group
        parentGroups.forEach((targets) => {
            // Sort targets by DOM order to ensure sequential animation
            targets.sort((a, b) => {
                return Array.from(a.parentElement.children).indexOf(a) - Array.from(b.parentElement.children).indexOf(b);
            });

            targets.forEach((target, index) => {
                setTimeout(() => {
                    target.classList.add('visible');
                }, index * 100); // 100ms stagger delay
            });
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-active');

            // Hamburger animation transform
            const spans = menuToggle.querySelectorAll('span');
            if (nav.classList.contains('nav-active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.transform = 'rotate(-45deg) translate(5px, -6px)';
                spans[1].style.width = '24px'; // Ensure same width
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });
    }

    // Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    function filterProjects(category) {
        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.classList.add('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }

    // Initialize with active filter (n8n by default)
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        filterProjects(activeBtn.getAttribute('data-filter'));
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            filterProjects(filterValue);
        });
    });

    // Smooth scroll for anchor links (handling offsetting for fixed header)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            nav.classList.remove('nav-active'); // Close mobile menu on click

            // Reset hamburger if closing
            if (menuToggle) {
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Rotating Words Animation
    const rotatingWords = document.querySelector('.rotating-words');
    if (rotatingWords) {
        const words = rotatingWords.querySelectorAll('.word');
        let currentIndex = 0;

        setInterval(() => {
            words[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % words.length;
            words[currentIndex].classList.add('active');
        }, 3000); // Change word every 3 seconds
    }

    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });

        // Show glow on interactive elements
        const interactiveElements = document.querySelectorAll('.card, .project-card, .btn-cta, .contact-pill');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));
            el.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
        });
    }

    // Magnetic Button Effect
    const magneticButtons = document.querySelectorAll('.btn-cta, .btn-primary');
    magneticButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Scroll Progress Bar
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }

    // Parallax Effect on Hero Background
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Subtle parallax on hero - moves slower than scroll
            heroSection.style.backgroundPositionY = scrollY * 0.3 + 'px';
        });
    }

    // Floating CTA Button - Show after scrolling past hero
    const floatingCta = document.querySelector('.floating-cta');
    if (floatingCta && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            if (window.scrollY > heroBottom) {
                floatingCta.classList.add('visible');
            } else {
                floatingCta.classList.remove('visible');
            }
        });
    }

    // Exit Intent Popup
    const exitPopup = document.getElementById('exitPopup');
    const exitClose = document.querySelector('.exit-popup-close');
    let hasShownPopup = false;

    if (exitPopup) {
        // Show on mouse leaving viewport (desktop only)
        document.addEventListener('mouseout', (e) => {
            if (!hasShownPopup && e.clientY < 10 && !e.relatedTarget) {
                exitPopup.classList.add('active');
                hasShownPopup = true;
            }
        });

        // Close button
        if (exitClose) {
            exitClose.addEventListener('click', () => {
                exitPopup.classList.remove('active');
            });
        }

        // Close on backdrop click
        exitPopup.addEventListener('click', (e) => {
            if (e.target === exitPopup) {
                exitPopup.classList.remove('active');
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                exitPopup.classList.remove('active');
            }
        });
    }

    // ========================================
    // EXIT INTENT FORM - GHL WEBHOOK INTEGRATION
    // ========================================
    // IMPORTANT: Replace the URL below with your GoHighLevel webhook URL
    const GHL_WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/EAtoIMKLPmk5lNFYiA3n/webhook-trigger/5259cc05-45a2-4cf3-b8bc-5ca8c5554f5c'; // <-- LINE 294: PUT YOUR GHL WEBHOOK HERE
    
    const exitForm = document.getElementById('exitForm');
    const exitEmailInput = document.getElementById('exitEmail');
    
    if (exitForm && exitEmailInput) {
        exitForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = exitEmailInput.value.trim();
            if (!email) return;
            
            // Disable form while submitting
            const submitBtn = exitForm.querySelector('.exit-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Send to GHL Webhook
                await fetch(GHL_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        source: 'Portfolio Exit Intent',
                        lead_magnet: 'Automation Checklist',
                        timestamp: new Date().toISOString()
                    })
                });
                
                // Success - show thank you message
                exitForm.innerHTML = '<p style="color: #38bdf8; font-weight: 600;">✓ Check your email for the checklist!</p>';
                
                // Close popup after 2 seconds
                setTimeout(() => {
                    exitPopup.classList.remove('active');
                }, 2000);
                
            } catch (error) {
                console.error('Webhook error:', error);
                submitBtn.textContent = 'Error - Try Again';
                submitBtn.disabled = false;
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                }, 2000);
            }
        });
    }
});
