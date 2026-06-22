// ========================================
// AMBE ENGINEERING - PREMIUM WEBSITE JS
// ========================================

// ========================================
// VIDEO AUTOPLAY HANDLING
// ========================================
const video = document.querySelector('.hero-video');
if (video) {
    video.play().catch(function(error) {
        console.log("Video autoplay was prevented:", error);
    });

    // Retry autoplay on user interaction
    document.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        }
    });
}

// ========================================
// HAMBURGER MENU TOGGLE
// ========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
        }
    }
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// NAVBAR — scrolls with page (not sticky)
// ========================================
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(15, 34, 61, 0.35)';
        } else {
            navbar.style.boxShadow = '0 10px 30px rgba(15, 34, 61, 0.25)';
        }
    });
}

// ========================================
// CONTACT FORM HANDLING
// ========================================
const contactForm = document.getElementById('contactForm');
const formSuccessMessage = document.getElementById('formSuccessMessage');
const btnResetForm = document.getElementById('btnResetForm');

// Form Submission logic
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = contactForm.querySelector('#name').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const phone = contactForm.querySelector('#phone').value.trim();

        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        if (!validatePhone(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }

        // Show success notification and replace form with success state
        showNotification('Message sent successfully!', 'success');

        // Populate Success screen details
        const successCustomerName = document.getElementById('successCustomerName');
        const successRefId = document.getElementById('successRefId');
        
        if (successCustomerName) successCustomerName.textContent = name;
        if (successRefId) {
            const randomId = Math.floor(1000 + Math.random() * 9000);
            successRefId.textContent = `#AMBE-2026-${randomId}`;
        }

        // Hide form and show success screen
        contactForm.style.display = 'none';
        if (formSuccessMessage) formSuccessMessage.style.display = 'block';
    });
}

// Reset form to write another message
if (btnResetForm) {
    btnResetForm.addEventListener('click', function () {
        if (contactForm) {
            contactForm.reset();
            contactForm.style.display = 'block';
        }
        if (formSuccessMessage) {
            formSuccessMessage.style.display = 'none';
        }
    });
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles if not already present
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.innerHTML = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 400px;
                padding: 20px;
                background: white;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                z-index: 9999;
                animation: slideIn 0.3s ease;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            .notification.success {
                border-left: 4px solid #27ae60;
            }

            .notification.success .notification-content {
                color: #27ae60;
            }

            .notification.error {
                border-left: 4px solid #e74c3c;
            }

            .notification.error .notification-content {
                color: #e74c3c;
            }

            .notification.info {
                border-left: 4px solid #3498db;
            }

            .notification.info .notification-content {
                color: #3498db;
            }

            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 20px;
            }

            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.7;
                transition: opacity 0.3s ease;
            }

            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// ========================================
// SCROLL ANIMATION - ENHANCED REVEAL EFFECTS
// ========================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all animated elements
const elementsToObserve = [
    '.feature-card-premium',
    '.service-card-premium',
    '.feature-card-premium-dark',
    '.service-card-premium-light',
    '.feature-card', 
    '.service-item', 
    '.value-card', 
    '.service-card-detailed', 
    '.equipment-card',
    '.stat-box',
    '.stat-box-premium',
    '.info-card'
];

elementsToObserve.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ========================================
// COUNTER ANIMATION - FOR STATS
// ========================================
function animateCounters() {
    const statBoxes = document.querySelectorAll('.stat-box-premium .stat-num-container, .stat-box h3');
    let hasAnimated = false;

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statBoxes.forEach(box => {
                    const text = box.textContent;
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        animateValue(box, 0, number, 2000);
                    }
                });
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        countObserver.observe(statsSection);
    }
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const suffix = element.textContent.replace(/[0-9]/g, '');

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

// Call counter animation
animateCounters();

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.pageYOffset || window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            if (sectionId && scrollPos >= sectionTop - 200) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                link.classList.remove('active');
                if (href.slice(1) === current) {
                    link.classList.add('active');
                }
            }
        });
    });
}

updateActiveNavLink();

// ========================================
// RIPPLE EFFECT ON BUTTONS
// ========================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';

        // Add ripple styles if not present
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.innerHTML = `
                .btn {
                    position: relative;
                    overflow: hidden;
                }

                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: rippleAnimation 0.6s ease-out;
                    pointer-events: none;
                }

                @keyframes rippleAnimation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.appendChild(ripple);
    });
});

// ========================================
// PARALLAX EFFECT
// ========================================
const parallaxElements = document.querySelectorAll('.shape');
window.addEventListener('scroll', () => {
    parallaxElements.forEach((element, index) => {
        const scrollPosition = window.pageYOffset;
        element.style.transform = `translateY(${scrollPosition * (0.3 + index * 0.1)}px)`;
    });
});

// ========================================
// IMAGE LAZY LOADING
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// DARK MODE TOGGLE (Optional)
// ========================================
const darkModeToggle = () => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
};

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================
// Debounce function for scroll events
function debounce(func, wait) {
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

// ========================================
// PAGE LOAD ANIMATION
// ========================================
window.addEventListener('load', () => {
    document.body.style.animation = 'pageLoad 0.6s ease';

    if (!document.querySelector('style[data-pageload]')) {
        const style = document.createElement('style');
        style.setAttribute('data-pageload', 'true');
        style.innerHTML = `
            @keyframes pageLoad {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// ========================================
// MOUSE FOLLOW EFFECT ON HOVER
// ========================================
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        const moveX = (e.clientX / window.innerWidth) * 20;
        const moveY = (e.clientY / window.innerHeight) * 20;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// ========================================
// FORM VALIDATION
// ========================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) || phone === '';
}

// Redundant submit listener removed (validation is merged with submission above)

// ========================================
// PRINT FUNCTION
// ========================================
window.printPage = function() {
    window.print();
};

// ========================================
// SHARE FUNCTION
// ========================================
window.shareOnSocial = function(platform) {
    const pageUrl = window.location.href;
    const pageTitle = document.title;
    let shareUrl = '';

    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${pageTitle}%20${pageUrl}`;
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
};

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--secondary-color, #2563eb);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: all 0.3s ease;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.background = 'var(--primary-color, #0b132b)';
    scrollTopBtn.style.transform = 'scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.background = 'var(--secondary-color, #2563eb)';
    scrollTopBtn.style.transform = 'scale(1)';
});

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Ambe Engineering Website Loaded Successfully');

    // ========================================
    // FLOATING WHATSAPP BUTTON INJECTION
    // ========================================
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/917046238967';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    
    // Inline styling for instant rendering, bypassing any CSS caching
    whatsappBtn.style.position = 'fixed';
    whatsappBtn.style.bottom = '100px';
    whatsappBtn.style.right = '30px';
    whatsappBtn.style.width = '55px';
    whatsappBtn.style.height = '55px';
    whatsappBtn.style.backgroundColor = '#25d366';
    whatsappBtn.style.color = '#ffffff';
    whatsappBtn.style.borderRadius = '50%';
    whatsappBtn.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
    whatsappBtn.style.zIndex = '998';
    whatsappBtn.style.display = 'flex';
    whatsappBtn.style.alignItems = 'center';
    whatsappBtn.style.justifyContent = 'center';
    whatsappBtn.style.textDecoration = 'none';
    whatsappBtn.style.transition = 'all 0.3s ease';

    // Set styling for the inner icon
    const icon = whatsappBtn.querySelector('i');
    if (icon) {
        icon.style.fontSize = '28px';
        icon.style.color = '#ffffff';
        icon.style.lineHeight = '1';
    }

    // Add JS hover listeners for the scaling animation
    whatsappBtn.addEventListener('mouseenter', () => {
        whatsappBtn.style.backgroundColor = '#20ba5a';
        whatsappBtn.style.transform = 'scale(1.1)';
        whatsappBtn.style.boxShadow = '0 8px 25px rgba(37, 211, 102, 0.45)';
    });
    whatsappBtn.addEventListener('mouseleave', () => {
        whatsappBtn.style.backgroundColor = '#25d366';
        whatsappBtn.style.transform = 'scale(1)';
        whatsappBtn.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.25)';
    });

    document.body.appendChild(whatsappBtn);
    
    // ========================================
    // CUSTOM PREMIUM CURSOR ANIMATION
    // ========================================
    const cursorDot = document.querySelector('.custom-cursor-dot');
    const cursorOutline = document.querySelector('.custom-cursor-outline');

    if (cursorDot && cursorOutline) {
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Position dot instantly
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smoothly animate outline with lag/easing
        function animateCursor() {
            const ease = 0.15;
            outlineX += (mouseX - outlineX) * ease;
            outlineY += (mouseY - outlineY) * ease;
            
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        requestAnimationFrame(animateCursor);

        // Add hovered class when mouse enters interactive elements
        const hoverables = document.querySelectorAll('a, button, .btn, .btn-inquiry, .hamburger, .timeline-card, .machine-card-premium-dark, .service-card-premium-light, .service-nav-btn, .service-check-item, .testimonial-list-item, .collage-circle, .partner-navy-card, .partner-stat-item, .spec-badge-box, .nav-links a, .social-links a, .about-mini-feature, .mv-card, .service-card-premium-row');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovered');
                cursorOutline.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovered');
                cursorOutline.classList.remove('hovered');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    }

    // ========================================
    // SECTION ENTRANCE REVEAL ON SCROLL
    // ========================================
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                sectionObserver.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -80px 0px'
    });

    document.querySelectorAll('section, footer').forEach(section => {
        if (!section.classList.contains('hero')) {
            section.classList.add('reveal-section');
            sectionObserver.observe(section);
        }
    });

    // ========================================
    // SCROLL-TRIGGERED ANIMATE-ON-SCROLL
    // ========================================
    const scrollAnimObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 150);
                scrollAnimObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollAnimObserver.observe(el);
    });

    // Observe why-partner left children individually
    document.querySelectorAll('.why-partner-left .animate-on-scroll').forEach(el => {
        scrollAnimObserver.observe(el);
    });

    // ========================================
    // PARTNER STATS COUNTER
    // ========================================
    const partnerSection = document.querySelector('.why-partner-section');
    if (partnerSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('connectors-drawn');

                    entry.target.querySelectorAll('.partner-stat-num[data-count]').forEach(stat => {
                        const target = parseInt(stat.dataset.count, 10);
                        const suffix = stat.dataset.suffix || '';
                        let current = 0;
                        const step = Math.ceil(target / 40);
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            stat.textContent = current + suffix;
                        }, 40);
                    });

                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(partnerSection);
    }

    // ========================================
    // MISSION & VISION — dynamic connector lines
    // ========================================
    const missionSection = document.querySelector('.mission-vision-section');
    if (missionSection) {
        const mvConnectorStem = 14;
        const mvVisual = missionSection.querySelector('.mv-visual');
        const mvHub = missionSection.querySelector('.mv-hub');
        const mvVisionCard = missionSection.querySelector('.mv-card-vision');
        const mvMissionCard = missionSection.querySelector('.mv-card-mission');
        const mvLinesArea = missionSection.querySelector('.mv-lines-area');
        const mvSvg = missionSection.querySelector('.mv-connectors-svg');
        const mvPathLeft = missionSection.querySelector('.mv-path-left');
        const mvPathRight = missionSection.querySelector('.mv-path-right');
        const mvVisionConnector = missionSection.querySelector('.mv-card-vision .mv-card-connector');
        const mvMissionConnector = missionSection.querySelector('.mv-card-mission .mv-card-connector');

        let pathMeta = [];
        let linesDrawn = false;
        let linesFlowing = false;

        const mvConnectorMinWidth = 993;

        function buildCurvePath(start, end) {
            const drop = Math.max(18, (end.y - start.y) * 0.18);
            const midY = start.y + drop + (end.y - start.y - drop) * 0.42;
            return `M ${start.x} ${start.y} L ${start.x} ${start.y + drop} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`;
        }

        function getConnectorPoint(connectorEl, visualRect) {
            const rect = connectorEl.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2 - visualRect.left,
                y: rect.top - mvConnectorStem - visualRect.top
            };
        }

        function resetPathAnimation() {
            pathMeta.forEach(({ path, length }) => {
                if (linesFlowing) {
                    path.style.strokeDasharray = '8 8';
                    path.style.strokeDashoffset = '0';
                    path.style.transition = 'none';
                } else if (linesDrawn) {
                    path.style.strokeDasharray = `${length} ${length}`;
                    path.style.strokeDashoffset = '0';
                } else {
                    path.style.strokeDasharray = `${length} ${length}`;
                    path.style.strokeDashoffset = `${length}`;
                    path.style.transition = 'none';
                }
            });
        }

        function layoutMissionConnectors() {
            if (!mvVisual || !mvHub || !mvVisionCard || !mvMissionCard || !mvSvg || !mvVisionConnector || !mvMissionConnector) return false;

            const showConnectors = window.innerWidth >= mvConnectorMinWidth;
            if (mvLinesArea) {
                mvLinesArea.style.display = showConnectors ? 'block' : 'none';
            }
            if (!showConnectors) return false;

            const visualRect = mvVisual.getBoundingClientRect();
            const hubRect = mvHub.getBoundingClientRect();

            const width = Math.max(visualRect.width, 1);
            const height = Math.max(visualRect.height, 1);

            mvSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);

            const start = {
                x: hubRect.left + hubRect.width / 2 - visualRect.left,
                y: hubRect.bottom - visualRect.top - 2
            };

            const endLeft = getConnectorPoint(mvVisionConnector, visualRect);
            const endRight = getConnectorPoint(mvMissionConnector, visualRect);

            mvPathLeft.setAttribute('d', buildCurvePath(start, endLeft));
            mvPathRight.setAttribute('d', buildCurvePath(start, endRight));

            pathMeta = [
                { path: mvPathLeft, length: mvPathLeft.getTotalLength(), delay: 150 },
                { path: mvPathRight, length: mvPathRight.getTotalLength(), delay: 450 }
            ];

            resetPathAnimation();
            return true;
        }

        function drawMissionLines() {
            if (linesDrawn) return;
            if (!layoutMissionConnectors()) return;

            linesDrawn = true;
            missionSection.classList.add('mv-lines-drawn');

            pathMeta.forEach(({ path, length, delay }) => {
                path.style.strokeDasharray = `${length} ${length}`;
                path.style.strokeDashoffset = `${length}`;
                path.style.transition = 'none';

                setTimeout(() => {
                    path.style.transition = 'stroke-dashoffset 1.4s ease-out';
                    path.style.strokeDashoffset = '0';
                }, delay);
            });

            setTimeout(() => {
                linesFlowing = true;
                missionSection.classList.add('mv-lines-flow');
                mvPathLeft.style.transition = 'none';
                mvPathRight.style.transition = 'none';
                mvPathLeft.style.strokeDasharray = '8 8';
                mvPathRight.style.strokeDasharray = '8 8';
                mvPathLeft.style.strokeDashoffset = '0';
                mvPathRight.style.strokeDashoffset = '0';
            }, 2000);
        }

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                layoutMissionConnectors();
            }, 120);
        });

        window.addEventListener('load', () => {
            layoutMissionConnectors();
            setTimeout(layoutMissionConnectors, 400);
        });

        if (mvVisual && typeof ResizeObserver !== 'undefined') {
            const mvResizeObserver = new ResizeObserver(() => layoutMissionConnectors());
            mvResizeObserver.observe(mvVisual);
        }

        layoutMissionConnectors();

        const mvObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    drawMissionLines();
                    mvObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        mvObserver.observe(missionSection);
    }

    // ========================================
    // COLLAGE CIRCLE POP-IN ON SCROLL
    // ========================================
    const collage = document.querySelector('.about-image-collage');
    if (collage) {
        const circles = collage.querySelectorAll('.collage-circle');
        circles.forEach((circle, i) => {
            circle.style.opacity = '0';
            circle.style.transform = circle.classList.contains('circle-main')
                ? 'translate(-50%, -50%) scale(0.5)'
                : 'scale(0.5)';
        });

        const collageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    circles.forEach((circle, i) => {
                        setTimeout(() => {
                            circle.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                            circle.style.opacity = '1';
                            if (circle.classList.contains('circle-main')) {
                                circle.style.transform = 'translate(-50%, -50%) scale(1)';
                            } else {
                                circle.style.transform = 'scale(1)';
                            }
                            if (i === circles.length - 1) {
                                setTimeout(() => collage.classList.add('collage-revealed'), 600);
                            }
                        }, i * 120);
                    });
                    collageObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        collageObserver.observe(collage);
    }

    // ========================================
    // STAGGER SERVICE CHECK ITEMS
    // ========================================
    document.querySelectorAll('.service-showcase-card, .service-check-item').forEach((item, i) => {
        if (!item.dataset.delay) {
            item.dataset.delay = i % 3;
        }
    });

    // ========================================
    // TESTIMONIALS SWITCHER
    // ========================================
    const testimonialItems = document.querySelectorAll('.testimonial-list-item');
    const featuredCard = document.querySelector('.testimonial-featured');
    const quoteEl = document.getElementById('testimonialQuote');
    const categoryEl = document.getElementById('testimonialCategory');
    const nameEl = document.getElementById('testimonialName');
    const roleEl = document.getElementById('testimonialRole');
    const avatarEl = document.getElementById('testimonialAvatar');

    if (testimonialItems.length && featuredCard && quoteEl) {
        let testimonialIndex = 0;

        testimonialItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (item.classList.contains('active')) return;

                testimonialIndex = index;
                testimonialItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                featuredCard.classList.add('is-switching');
                quoteEl.style.opacity = '0';

                setTimeout(() => {
                    quoteEl.textContent = item.dataset.quote;
                    categoryEl.textContent = item.dataset.category;
                    nameEl.textContent = item.dataset.name;
                    roleEl.textContent = item.dataset.role;
                    avatarEl.textContent = item.dataset.initials;

                    quoteEl.style.opacity = '1';
                    featuredCard.classList.remove('is-switching');
                }, 250);
            });
        });

        setInterval(() => {
            testimonialIndex = (testimonialIndex + 1) % testimonialItems.length;
            testimonialItems[testimonialIndex].click();
        }, 6000);
    }

    // ========================================
    // SERVICES — interactive panel switcher
    // ========================================
    const serviceNavBtns = document.querySelectorAll('.service-nav-btn');
    const serviceSlides = document.querySelectorAll('.service-display-slide');

    if (serviceNavBtns.length && serviceSlides.length) {
        let serviceIndex = 0;
        let serviceAutoTimer;

        const showService = (index) => {
            serviceIndex = index;
            serviceNavBtns.forEach(btn => btn.classList.remove('active'));
            serviceSlides.forEach(slide => slide.classList.remove('active'));
            serviceNavBtns[index].classList.add('active');
            serviceSlides[index].classList.add('active');
        };

        serviceNavBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                showService(index);
                clearInterval(serviceAutoTimer);
                serviceAutoTimer = setInterval(() => {
                    showService((serviceIndex + 1) % serviceNavBtns.length);
                }, 5000);
            });
        });

        serviceAutoTimer = setInterval(() => {
            showService((serviceIndex + 1) % serviceNavBtns.length);
        }, 5000);
    }

    // ========================================
    // CERTIFICATE MODAL LIGHTBOX
    // ========================================
    const certCards = document.querySelectorAll('.qa-cert-card');
    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'cert-lightbox-modal';
            modal.style.cssText = `
                position: fixed;
                inset: 0;
                background: rgba(15, 34, 61, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                opacity: 0;
                transition: opacity 0.3s ease;
                cursor: zoom-out;
            `;
            
            const content = document.createElement('div');
            content.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90vh;
                transform: scale(0.9);
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            `;
            
            const img = document.createElement('img');
            img.src = 'image&video/certificate.png';
            img.alt = 'Ambe Engineering ISO Certificate';
            img.style.cssText = `
                max-width: 100%;
                max-height: 85vh;
                border-radius: 12px;
                box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
                border: 2px solid rgba(255, 255, 255, 0.1);
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '&times;';
            closeBtn.style.cssText = `
                position: absolute;
                top: -45px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2.5rem;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.3s;
            `;
            closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
            closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.8');

            content.appendChild(img);
            content.appendChild(closeBtn);
            modal.appendChild(content);
            document.body.appendChild(modal);
            
            // Trigger animation
            setTimeout(() => {
                modal.style.opacity = '1';
                content.style.transform = 'scale(1)';
            }, 10);
            
            // Close actions
            const closeModal = () => {
                modal.style.opacity = '0';
                content.style.transform = 'scale(0.9)';
                setTimeout(() => modal.remove(), 300);
            };
            
            modal.addEventListener('click', closeModal);
            closeBtn.addEventListener('click', closeModal);
        });
    });

    // ========================================
    // INTERACTIVE SUPPORTING EQUIPMENT CIRCLE
    // ========================================
    const orbitPoints = document.querySelectorAll('.orbit-point');
    const defaultState = document.querySelector('.center-circle .default-state');
    const detailStates = document.querySelectorAll('.center-circle .detail-state');

    if (orbitPoints.length > 0 && defaultState && detailStates.length > 0) {
        orbitPoints.forEach(point => {
            point.addEventListener('mouseenter', () => {
                const targetPointNum = point.getAttribute('data-point');

                // Set current point active
                orbitPoints.forEach(p => p.classList.remove('active'));
                point.classList.add('active');

                // Hide default state
                defaultState.classList.remove('active');

                // Show corresponding detail state
                detailStates.forEach(detail => {
                    const detailNum = detail.getAttribute('data-detail');
                    if (detailNum === targetPointNum) {
                        detail.classList.add('active');
                    } else {
                        detail.classList.remove('active');
                    }
                });
            });

            point.addEventListener('mouseleave', () => {
                // Remove active states
                orbitPoints.forEach(p => p.classList.remove('active'));
                detailStates.forEach(detail => detail.classList.remove('active'));

                // Revert to default state
                defaultState.classList.add('active');
            });
        });
    }
});

// ========================================
// ERROR HANDLING
// ========================================
window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    // You can log errors to a server here
});

// ========================================
// PERFORMANCE MONITORING
// ========================================
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}
