// Set current year based on Indian Time Zone (IST)
const date = new Date();
const options = { timeZone: 'Asia/Kolkata', year: 'numeric' };
document.getElementById('year').textContent = new Intl.DateTimeFormat('en-US', options).format(date);

// Auto-detect Currency based on Region selection and User Timezone
const regionSelect = document.getElementById('region');
const currencySelect = document.getElementById('currency');

// 1. Initial check: If user is in India (via timezone), default to India/INR
if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Kolkata') {
    regionSelect.value = 'India';
    currencySelect.value = 'INR';
}

// 2. Listener: Auto-switch currency when Region changes
regionSelect.addEventListener('change', function() {
    if (this.value === 'India') {
        currencySelect.value = 'INR';
    } else {
        currencySelect.value = 'USD';
    }
});

// ============================================
// SMOOTH SCROLL REVEAL ANIMATION
// ============================================
const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Throttled scroll listener for better performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                revealOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
};

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const initNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        lastScrollY = currentScrollY;
    };
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
};

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                const menuBtn = document.getElementById('mobile-menu-btn');
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    menuBtn.classList.remove('active');
                }
            }
        });
    });
};

// Mobile Menu Toggle with animation
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    btn.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
        if (!menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            btn.classList.remove('active');
        }
    }
});

// Form Handling
function handleFormSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const company = document.getElementById('company').value;
    const budget = document.getElementById('budget').value;
    const currency = document.getElementById('currency').value;
    const region = document.getElementById('region').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const essentials = document.getElementById('essentials').value;
    
    const subject = encodeURIComponent(`Advertiser Inquiry: ${company}`);
    const body = encodeURIComponent(
        `Name: ${name}\n` +
        `Company: ${company}\n` +
        `Estimated Budget: ${currency} ${budget}\n` +
        `Target Region: ${region}\n` +
        (email ? `Email: ${email}\n` : '') +
        (phone ? `Phone: ${phone}\n` : '') +
        `\nCampaign Essentials:\n${essentials}`
    );
    
    window.location.href = `mailto:business@technokeshri.in?subject=${subject}&body=${body}`;
}

// --- WATER RIPPLE EFFECT ---
const initRipples = () => {
    // Skip on touch devices for performance
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }
    
    const canvas = document.getElementById('ripple-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let ripples = [];

    // Resize
    const resize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    
    // Debounced resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(resize, 100);
    });
    resize();

    // Ripple Class
    class Ripple {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.radius = 0;
            this.maxRadius = 50;
            this.alpha = 0.8;
            this.speed = 2;
        }

        update() {
            this.radius += this.speed;
            this.alpha -= 0.016;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(59, 130, 246, ${this.alpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }
    }

    // Create ripple on mouse move (throttled)
    let lastX = 0;
    let lastY = 0;
    const distanceThreshold = 25;
    let lastRippleTime = 0;
    const rippleInterval = 50; // Minimum ms between ripples

    window.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastRippleTime < rippleInterval) return;
        
        const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
        if (dist > distanceThreshold) {
            ripples.push(new Ripple(e.clientX, e.clientY));
            lastX = e.clientX;
            lastY = e.clientY;
            lastRippleTime = now;
        }
    }, { passive: true });

    // Optimized animation loop
    const animateRipples = () => {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = ripples.length - 1; i >= 0; i--) {
            ripples[i].update();
            ripples[i].draw(ctx);
            
            if (ripples[i].alpha <= 0) {
                ripples.splice(i, 1);
            }
        }
        requestAnimationFrame(animateRipples);
    };
    animateRipples();
};

// --- THREE.JS ANIMATION ---
const initThreeJS = () => {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    
    // Reduce particles on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const particlesCount = isMobile ? 150 : 400;
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    container.appendChild(renderer.domElement);

    // Particles
    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 160;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const material = new THREE.PointsMaterial({
        size: isMobile ? 0.8 : 0.5,
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(geometry, material);
    scene.add(particlesMesh);

    // Global Mesh
    const sphereGeo = new THREE.IcosahedronGeometry(25, 1);
    const sphereMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.03
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(sphere);

    // Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    }, { passive: true });

    const clock = new THREE.Clock();

    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        const targetX = mouseX * 0.001;
        const targetY = mouseY * 0.001;

        // Smooth rotation with lerp
        particlesMesh.rotation.y += 0.0008;
        particlesMesh.rotation.x += 0.0004;
        particlesMesh.rotation.y += 0.02 * (targetX - particlesMesh.rotation.y);
        particlesMesh.rotation.x += 0.02 * (targetY - particlesMesh.rotation.x);

        // Wave motion (only on desktop for performance)
        if (!isMobile) {
            const positions = particlesMesh.geometry.attributes.position.array;
            for(let i = 0; i < particlesCount; i++) {
                const i3 = i * 3;
                positions[i3 + 1] += Math.sin(elapsedTime + positions[i3]) * 0.02;
            }
            particlesMesh.geometry.attributes.position.needsUpdate = true;
        }

        // Sphere rotation
        sphere.rotation.y -= 0.002;
        sphere.rotation.x += 0.001;

        renderer.render(scene, camera);
    };

    animate();

    // Debounced resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }, 100);
    });
};

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core features
    initScrollReveal();
    initNavbarScroll();
    initSmoothScroll();
    
    // Initialize visual effects
    initThreeJS();
    initRipples();
    
    // Remove any page loader after everything loads
    const loader = document.querySelector('.page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loaded');
        }, 300);
    }
});
