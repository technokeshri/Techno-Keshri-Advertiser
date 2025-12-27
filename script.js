// --- THREE.JS CYBER-GRID BACKGROUND ---
        const initThreeJS = () => {
            const container = document.getElementById('canvas-container');
            const scene = new THREE.Scene();
            
            // 1. Dark Fog for depth (matches background)
            scene.fog = new THREE.FogExp2(0x020205, 0.035);

            // 2. Camera
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 8;
            camera.position.y = 3;
            camera.rotation.x = -0.3;

            // 3. Renderer
            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);

            // --- 4. ENHANCED BLOCKS: WIREFRAME + MESH ---
            const blockGroup = new THREE.Group();
            scene.add(blockGroup);

            // Base Geometry
            const geometry = new THREE.BoxGeometry(0.85, 0.85, 0.85);
            const edges = new THREE.EdgesGeometry(geometry); // Create wireframe edges

            // Materials
            // Inner core material (Solid Dark)
            const coreMaterial = new THREE.MeshStandardMaterial({
                color: 0x050510,
                roughness: 0.1,
                metalness: 0.9,
            });

            // Wireframe Edge Material (Glowing Cyan)
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0x00f2ff, // Cyan
                transparent: true,
                opacity: 0.3 // Subtle by default
            });

            const rows = 20;
            const cols = 30;
            const blocks = [];

            // Generate Grid
            for(let i = 0; i < rows; i++) {
                for(let j = 0; j < cols; j++) {
                    // Create Group for specific block unit
                    const unit = new THREE.Group();

                    // 1. Solid Inner Cube
                    const mesh = new THREE.Mesh(geometry, coreMaterial.clone());
                    unit.add(mesh);

                    // 2. Glowing Wireframe
                    const lines = new THREE.LineSegments(edges, lineMaterial.clone());
                    unit.add(lines);

                    // Position
                    const x = (j - cols/2) * 1.1;
                    const z = (i - rows/2) * 1.1;
                    
                    // Initial wavy position
                    const y = Math.sin(x * 0.2) * Math.cos(z * 0.2);

                    unit.position.set(x, -3 + y, z - 5);
                    
                    // Store data for animation
                    unit.userData = {
                        initialY: -3 + y,
                        x: x,
                        z: z - 5,
                        timer: 0,
                        mesh: mesh,
                        lines: lines
                    };

                    blockGroup.add(unit);
                    blocks.push(unit);
                }
            }

            // 5. Lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
            scene.add(ambientLight);

            // Dynamic Point Lights
            const blueLight = new THREE.PointLight(0x00f2ff, 1.5, 60);
            blueLight.position.set(10, 10, 0);
            scene.add(blueLight);

            const pinkLight = new THREE.PointLight(0xff007a, 1.5, 60);
            pinkLight.position.set(-10, 5, 0);
            scene.add(pinkLight);

            // 6. Raycaster
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2(-999, -999);
            const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 3);

            window.addEventListener('mousemove', (e) => {
                mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            });

            // 7. Animation Loop
            const clock = new THREE.Clock();

            const animate = () => {
                requestAnimationFrame(animate);
                const time = clock.getElapsedTime();

                // Gentle block movement
                blocks.forEach(unit => {
                    const data = unit.userData;
                    
                    // Wave calculation
                    const waveY = Math.sin(data.x * 0.3 + time * 0.5) * Math.cos(data.z * 0.3 + time * 0.3) * 0.3;
                    
                    // Interactive Rise Logic
                    let interactY = 0;
                    if(data.timer > 0) {
                        data.timer -= 0.02; // Fade out
                        interactY = Math.sin(data.timer * Math.PI) * 1.2; // Bump up
                        
                        // GLOW EFFECT ON ACTIVE
                        // Make wireframe bright
                        data.lines.material.opacity = 0.3 + (data.timer * 0.7); 
                        data.lines.material.color.setHex(0x00f2ff);
                        
                        // Make core slightly emissive
                        data.mesh.material.emissive.setHex(0x00f2ff);
                        data.mesh.material.emissiveIntensity = data.timer * 0.5;

                    } else {
                        // Return to idle state
                        data.lines.material.opacity = 0.15; // Dim wireframe
                        data.lines.material.color.setHex(0x4361ee); // Darker blue idle
                        data.mesh.material.emissiveIntensity = 0;
                    }

                    unit.position.y = data.initialY + waveY + interactY;
                    unit.rotation.x = interactY * 0.1;
                    unit.rotation.z = interactY * 0.05;
                });

                // Raycasting
                raycaster.setFromCamera(mouse, camera);
                const target = new THREE.Vector3(); 
                raycaster.ray.intersectPlane(plane, target);

                if(target) {
                    blocks.forEach(unit => {
                        const dx = unit.position.x - target.x;
                        const dz = unit.position.z - target.z;
                        const dist = Math.sqrt(dx*dx + dz*dz);
                        
                        if(dist < 3.0) {
                            unit.userData.timer = 1.0;
                        }
                    });
                    
                    // Light follows mouse
                    blueLight.position.x += (target.x - blueLight.position.x) * 0.1;
                    blueLight.position.z += ((target.z + 5) - blueLight.position.z) * 0.1;
                }

                renderer.render(scene, camera);
            };

            animate();

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        };

        // --- GSAP ANIMATIONS ---
        const initGSAP = () => {
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline();
            tl.from("h1", { y: 50, opacity: 0, duration: 1, ease: "power4.out" })
              .from(".subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
              .from(".hero .btn", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4");

            gsap.from(".stat-item", {
                scrollTrigger: { trigger: ".stats-strip", start: "top 85%" },
                y: 30, opacity: 0, duration: 0.8, stagger: 0.1
            });

            gsap.utils.toArray(".card").forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: { trigger: ".features", start: "top 80%" },
                    y: 50, opacity: 0, duration: 0.6, delay: i * 0.1
                });
            });

            gsap.from(".form-box", {
                scrollTrigger: { trigger: ".form-box", start: "top 80%" },
                scale: 0.95, opacity: 0, duration: 0.8
            });
        };

        document.addEventListener('DOMContentLoaded', () => {
            initThreeJS();
            initGSAP();

            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');
            menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    navLinks.classList.remove('active');
                    const target = document.querySelector(this.getAttribute('href'));
                    if(target) {
                        gsap.to(window, {duration: 1, scrollTo: target, ease: "power3.inOut"});
                    }
                });
            });

            const form = document.getElementById('emailForm');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const business = document.getElementById('business').value;
                const budget = document.getElementById('budget').value;
                const message = document.getElementById('message').value;

                const subject = `Campaign Inquiry: ${business}`;
                const body = `Name: ${name}\nEmail: ${email}\nBusiness: ${business}\nBudget: ${budget}\n\nMessage:\n${message}`;
                
                window.location.href = `mailto:business@technokeshri.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            });
        });
