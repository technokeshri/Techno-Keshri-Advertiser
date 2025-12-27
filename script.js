:root {
            /* Dark Theme Palette */
            --bg-color: #020205; 
            --primary: #00f2ff; /* Brighter Cyan */
            --primary-glow: rgba(0, 242, 255, 0.6);
            --secondary: #4361ee;
            --accent: #ff007a; /* Neon Pink */
            --accent-glow: rgba(255, 0, 122, 0.6);
            
            --text-main: #ffffff;
            --text-muted: #e2e8f0; /* Brighter muted text for better visibility */
            
            /* Darker glass for better text contrast */
            --glass-bg: rgba(15, 15, 20, 0.85); 
            --glass-border: rgba(255, 255, 255, 0.15);
            --card-hover-bg: rgba(30, 30, 45, 0.95);
            
            --transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Outfit', sans-serif;
        }

        h1, h2, h3, .logo {
            font-family: 'Space Grotesk', sans-serif;
        }

        body {
            background-color: var(--bg-color);
            /* Subtle vignette to focus center */
            background-image: radial-gradient(circle at center, transparent 0%, #000000 100%);
            color: var(--text-main);
            line-height: 1.6;
            overflow-x: hidden;
            min-height: 100vh;
        }

        /* 3D Canvas */
        #canvas-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: -1;
        }

        /* Navbar */
        .nav {
            padding: 1.5rem 5%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--glass-border);
            position: sticky;
            top: 0;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 700;
            font-size: 1.5rem;
            color: var(--text-main);
            text-decoration: none;
            letter-spacing: -1px;
            text-transform: uppercase;
            text-shadow: 0 0 10px rgba(255,255,255,0.3);
        }

        .logo i {
            color: var(--primary);
            filter: drop-shadow(0 0 8px var(--primary));
        }

        .nav-links {
            display: flex;
            gap: 3rem;
        }

        .nav-link {
            color: #cbd5e1;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 500;
            transition: var(--transition);
            position: relative;
        }

        .nav-link:hover {
            color: var(--primary);
            text-shadow: 0 0 15px var(--primary-glow);
        }

        .menu-toggle {
            display: none;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }

        /* Hero Section */
        .hero {
            min-height: 90vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 0 5%;
            position: relative;
        }

        .hero-content {
            max-width: 1000px;
            z-index: 2;
            /* Added backdrop for extreme readability */
            background: radial-gradient(closest-side, rgba(0,0,0,0.6) 0%, transparent 100%); 
            padding: 2rem;
        }

        h1 {
            font-size: 4.5rem;
            line-height: 1.1;
            font-weight: 800;
            margin-bottom: 1.5rem;
            letter-spacing: -2px;
            text-shadow: 0 4px 20px rgba(0,0,0,0.8); /* Heavy shadow for contrast */
        }

        .gradient-text {
            background: linear-gradient(135deg, #fff 20%, var(--primary) 60%, var(--secondary) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
            filter: drop-shadow(0 0 25px rgba(0, 242, 255, 0.4));
        }

        .subtitle {
            font-size: 1.4rem;
            color: #e2e8f0; /* Very light gray */
            margin: 0 auto 3rem;
            max-width: 650px;
            font-weight: 400;
            text-shadow: 0 2px 10px rgba(0,0,0,1); /* Shadow against busy background */
        }

        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 1rem 2.8rem;
            border-radius: 50px;
            font-weight: 700;
            text-decoration: none;
            transition: var(--transition);
            font-size: 1.1rem;
            cursor: pointer;
            border: 1px solid transparent;
            letter-spacing: 0.5px;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--secondary), var(--primary));
            color: white;
            box-shadow: 0 0 20px rgba(67, 97, 238, 0.4);
            border: 1px solid rgba(255,255,255,0.2);
        }

        .btn-primary:hover {
            transform: translateY(-5px);
            box-shadow: 0 0 40px rgba(0, 242, 255, 0.6);
            border-color: white;
        }

        /* Features Grid */
        .section-header {
            text-align: center;
            margin: 8rem 0 4rem;
        }

        .section-tag {
            color: var(--primary);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 3px;
            font-size: 0.9rem;
            margin-bottom: 1rem;
            display: block;
            text-shadow: 0 0 10px var(--primary-glow);
        }

        .section-title {
            font-size: 3rem;
            font-weight: 700;
            color: white;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            padding: 0 5% 4rem;
            max-width: 1400px;
            margin: 0 auto;
        }

        .card {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            padding: 3rem 2rem;
            border-radius: 20px;
            transition: var(--transition);
            backdrop-filter: blur(12px); /* Stronger blur */
            position: relative;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }

        .card:hover {
            background: var(--card-hover-bg);
            transform: translateY(-10px);
            border-color: var(--primary);
            box-shadow: 0 0 30px rgba(0, 242, 255, 0.15);
        }

        .icon-box {
            width: 60px;
            height: 60px;
            background: rgba(255,255,255,0.05);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
            color: var(--primary);
            transition: var(--transition);
        }

        .card:hover .icon-box {
            background: var(--primary);
            color: #000;
            box-shadow: 0 0 20px var(--primary-glow);
        }

        .card h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: white;
            font-weight: 700;
        }

        .card p {
            color: var(--text-muted);
            font-size: 1.05rem;
            line-height: 1.7;
        }

        /* Stats/Pricing Strip */
        .stats-strip {
            background: rgba(10, 10, 15, 0.9);
            border-top: 1px solid var(--glass-border);
            border-bottom: 1px solid var(--glass-border);
            padding: 4rem 5%;
            margin: 4rem 0;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 4rem;
            text-align: center;
            position: relative;
            z-index: 10;
        }

        .stat-item h4 {
            font-size: 3rem;
            background: linear-gradient(to bottom, #fff, var(--primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 0.5rem;
            font-weight: 800;
        }

        .stat-item p {
            color: #cbd5e1;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-size: 0.9rem;
            font-weight: 600;
        }

        /* Contact Section */
        .contact-container {
            max-width: 800px;
            margin: 6rem auto;
            padding: 0 5%;
        }

        .form-box {
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            padding: 3.5rem;
            border-radius: 24px;
            position: relative;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.8rem;
            color: white;
            font-size: 0.95rem;
            font-weight: 600;
        }

        .form-control {
            width: 100%;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.15);
            padding: 1.2rem;
            border-radius: 12px;
            color: white;
            font-size: 1rem;
            transition: var(--transition);
            outline: none;
            font-family: 'Space Grotesk', sans-serif;
        }

        .form-control:focus {
            border-color: var(--primary);
            background: rgba(0, 0, 0, 0.5);
            box-shadow: 0 0 15px rgba(0, 242, 255, 0.2);
        }

        textarea.form-control {
            min-height: 150px;
            resize: vertical;
        }

        /* Footer */
        footer {
            text-align: center;
            padding: 4rem 5%;
            background: #000;
            color: var(--text-muted);
            font-size: 0.9rem;
            border-top: 1px solid rgba(255,255,255,0.1);
        }

        /* Responsive */
        @media (max-width: 768px) {
            h1 { font-size: 3rem; }
            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 85%;
                height: 100vh;
                background: #050505;
                flex-direction: column;
                padding: 100px 2rem;
                transition: 0.3s ease;
                border-left: 1px solid var(--glass-border);
                z-index: 999;
            }
            .nav-links.active { right: 0; }
            .menu-toggle { display: block; z-index: 1001; }
            .stats-strip { gap: 2rem; }
            .form-box { padding: 2rem; }
        }
