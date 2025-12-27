# Techno Keshri - Premium Ad Network Landing Page

![Project Status](https://img.shields.io/badge/Status-Live-success) ![License](https://img.shields.io/badge/License-MIT-blue) ![Three.js](https://img.shields.io/badge/3D-Three.js-black) ![GSAP](https://img.shields.io/badge/Animations-GSAP-green)

A high-performance, futuristic landing page designed for **Techno Keshri**, a premium advertising network. This project features a cyberpunk aesthetic with a 3D interactive background, glassmorphism UI elements, and smooth scroll-triggered animations.

## 🌟 Key Features

* **3D Interactive Background:** Built with **Three.js**, featuring a "Cyber-Grid" of wireframe cubes that ripple and rise based on mouse interaction (Raycasting).
* **Advanced Animations:** Powered by **GSAP (GreenSock)** with ScrollTrigger to animate elements as they enter the viewport.
* **Glassmorphism Design:** Modern UI with translucent cards, blurs, and neon glow effects.
* **Fully Responsive:** Optimized for desktops, tablets, and mobile devices with a custom hamburger menu.
* **Performance:** Optimized rendering using `requestAnimationFrame` and lightweight CSS variables.
* **Contact Integration:** Functional contact form that formats user input into a `mailto` link for immediate inquiry generation.

## 🛠️ Tech Stack

* **Core:** HTML5, CSS3, JavaScript (ES6+)
* **3D Engine:** [Three.js (r128)](https://threejs.org/)
* **Animation:** [GSAP 3.12.2](https://greensock.com/gsap/) (Core + ScrollTrigger + ScrollToPlugin)
* **Icons:** [FontAwesome 6.4.0](https://fontawesome.com/)
* **Typography:** Google Fonts (Outfit & Space Grotesk)

## 📂 File Structure

Since this is a single-file template for ease of deployment, the structure is contained within `index.html`:

```text
index.html
├── <head> (Meta tags, Google Fonts, CDN Links, CSS Styles)
├── <body>
│   ├── #canvas-container (Three.js WebGL Renderer)
│   ├── .nav (Navigation Bar)
│   ├── .hero (Main Landing Area)
│   ├── .stats-strip (Key Performance Indicators)
│   ├── .features (Service Grid)
│   ├── .contact-container (Inquiry Form)
│   └── <script> (Three.js Logic, GSAP Timelines, Event Listeners)
