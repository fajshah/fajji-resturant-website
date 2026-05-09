document.addEventListener('DOMContentLoaded', () => {
    // 2. 3D Tilt Effect on Menu Cards
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 15 degrees)
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            // Apply transform: add translateY(-16px) because this event fires during hover
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-16px) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            // Reset transform
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease, box-shadow 0.3s ease';
        });
    });

    // 3. Form submission prevention & button animation
    const form = document.getElementById('reservation-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const msg = document.getElementById('success-msg');
            const originalText = btn.innerText;
            
            btn.innerText = 'Processing...';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
                if(msg) msg.style.display = 'block';
                form.reset();
                
                setTimeout(() => {
                    if(msg) msg.style.display = 'none';
                }, 4000);
            }, 1000);
        });
    }

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-3d');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Slightly offset so it triggers right before view
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const navLinks = navbar.querySelectorAll('a:not(.btn-primary-red)');
    const logo = navbar.querySelector('.logo');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(35, 107, 67, 0.95)'; /* Dark seagreen */
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            navLinks.forEach(a => a.style.color = '#ffffff');
            logo.style.color = '#ffffff';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
            navLinks.forEach(a => a.style.color = '#ffffff');
            logo.style.color = '#ffffff';
        }
    });
});
