// Mobile menu functionality
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Collaboration form functionality
const collaborationForm = document.getElementById('collaborationForm');
const showFormBtns = document.querySelectorAll('#showCollaborationForm, #showCollaborationForm2');
const emailForm = document.getElementById('emailForm');

// Show collaboration form when "Get Started Now" is clicked
showFormBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        collaborationForm.classList.add('active');
        collaborationForm.scrollIntoView({ behavior: 'smooth' });
    });
});

// Form submission
emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const business = document.getElementById('business').value;
    const budget = document.getElementById('budget').value;
    const message = document.getElementById('message').value;
    
    const subject = "Advertising Collaboration Request";
    
    // Create a clean email body
    const emailBody = `Hello Techno Keshri Team,\n\n` +
                      `I want to collaborate or promote my business.\n\n` +
                      `Name: ${name}\n` +
                      `Email: ${email}\n` +
                      `Business: ${business}\n` +
                      `Budget: ${budget}\n\n` +
                      `${message}\n\n` +
                      `Thank you.`;
    
    // Encode the subject and body for mailto link
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(emailBody);
    
    // Create mailto link
    window.location.href = `mailto:business@technokeshri.in?subject=${encodedSubject}&body=${encodedBody}`;
});

// Initialize animations using Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach(el => {
        observer.observe(el);
    });
});
