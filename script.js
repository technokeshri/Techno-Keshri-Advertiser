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

        // Mobile Menu Toggle
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // Form Handling
        function handleFormSubmit(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const company = document.getElementById('company').value;
            const budget = document.getElementById('budget').value;
            const currency = document.getElementById('currency').value; // Get currency
            const region = document.getElementById('region').value;
            // New fields
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            const essentials = document.getElementById('essentials').value;
            
            const subject = encodeURIComponent(`Advertiser Inquiry: ${company}`);
            const body = encodeURIComponent(
                `Name: ${name}\n` +
                `Company: ${company}\n` +
                `Estimated Budget: ${currency} ${budget}\n` + // Format: USD 5000
                `Target Region: ${region}\n` +
                (email ? `Email: ${email}\n` : '') +
                (phone ? `Phone: ${phone}\n` : '') +
                `\nCampaign Essentials:\n${essentials}`
            );
            
            window.location.href = `mailto:business@technokeshri.in?subject=${subject}&body=${body}`;
        }

        // --- WATER RIPPLE EFFECT ---
        const initRipples = () => {
            const canvas = document.getElementById('ripple-canvas');
            const ctx = canvas.getContext('2d');
            let width, height;
            let ripples = [];

            // Resize
            const resize = () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            };
            window.addEventListener('resize', resize);
            resize();

            // Ripple Class
            class Ripple {
                constructor(x, y) {
                    this.x = x;
                    this.y = y;
                    this.radius = 0;
                    this.maxRadius = 50; // Max size of ripple
                    this.alpha = 1;
                    this.speed = 1.5;
                }

                update() {
                    this.radius += this.speed;
                    this.alpha -= 0.02; // Fade out speed
                }

                draw(ctx) {
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    // Blue-ish ripple
                    ctx.strokeStyle = `rgba(59, 130, 246, ${this.alpha})`; 
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            }

            // Create ripple on mouse move
            let lastX = 0;
            let lastY = 0;
            const distanceThreshold = 20; // Only create ripple if mouse moved enough

            window.addEventListener('mousemove', (e) => {
                const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
                if (dist > distanceThreshold) {
                    ripples.push(new Ripple(e.clientX, e.clientY));
                    lastX = e.clientX;
                    lastY = e.clientY;
                }
            });

            // Animate
            const animateRipples = () => {
                ctx.clearRect(0, 0, width, height);
                
                for (let i = 0; i < ripples.length; i++) {
                    ripples[i].update();
                    ripples[i].draw(ctx);
                    
                    // Remove dead ripples
                    if (ripples[i].alpha <= 0) {
                        ripples.splice(i, 1);
                        i--;
                    }
                }
                requestAnimationFrame(animateRipples);
            };
            animateRipples();
        };

        // --- THREE.JS ANIMATION ---
        const initThreeJS = () => {
            const container = document.getElementById('canvas-container');
            
            const scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x020617, 0.002); // Matched new bg color

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 50;

            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // Particles
            const geometry = new THREE.BufferGeometry();
            const particlesCount = 400; // Increased count
            const posArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount * 3; i++) {
                posArray[i] = (Math.random() - 0.5) * 160; 
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const material = new THREE.PointsMaterial({
                size: 0.5,
                color: 0x3b82f6,
                transparent: true,
                opacity: 0.8,
                blending: THREE.AdditiveBlending
            });

            const particlesMesh = new THREE.Points(geometry, material);
            scene.add(particlesMesh);

            // Connected Lines
            const linesMaterial = new THREE.LineBasicMaterial({
                color: 0x3b82f6,
                transparent: true,
                opacity: 0.1
            });
            const linesGeometry = new THREE.BufferGeometry(); // Dynamic
            const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
            scene.add(linesMesh);

            // Animation Loop
            let mouseX = 0;
            let mouseY = 0;
            let targetX = 0;
            let targetY = 0;
            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;

            document.addEventListener('mousemove', (event) => {
                mouseX = (event.clientX - windowHalfX);
                mouseY = (event.clientY - windowHalfY);
            });

            const clock = new THREE.Clock();

            const animate = () => {
                requestAnimationFrame(animate);
                const elapsedTime = clock.getElapsedTime();

                targetX = mouseX * 0.001;
                targetY = mouseY * 0.001;

                particlesMesh.rotation.y += 0.001;
                particlesMesh.rotation.x += 0.0005;
                particlesMesh.rotation.y += 0.03 * (targetX - particlesMesh.rotation.y);
                particlesMesh.rotation.x += 0.03 * (targetY - particlesMesh.rotation.x);

                // Wave motion
                const positions = particlesMesh.geometry.attributes.position.array;
                for(let i = 0; i < particlesCount; i++) {
                    const i3 = i * 3;
                    // Complex wave
                    positions[i3 + 1] += Math.sin(elapsedTime + positions[i3]) * 0.03;
                }
                particlesMesh.geometry.attributes.position.needsUpdate = true;
                
                renderer.render(scene, camera);
            };

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

            // Hook sphere into animation
            const originalAnimate = animate;
            const newAnimate = () => {
                sphere.rotation.y -= 0.003;
                sphere.rotation.x += 0.002;
                originalAnimate();
            }
            
            newAnimate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        };

        // Initialize Everything
        document.addEventListener('DOMContentLoaded', () => {
            initThreeJS();
            initRipples();
        });
