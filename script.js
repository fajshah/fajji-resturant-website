document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Set minimum date for reservation to today
    const dateInput = document.getElementById('date');
    if(dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Reservation Form Handling
    const reservationForm = document.getElementById('reservation-form');
    const formMessage = document.getElementById('form-message');

    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values (could be used to send to a backend)
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;

            // Simulate form submission process
            const submitBtn = reservationForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Confirming...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Show success message
                reservationForm.reset();
                formMessage.classList.remove('hidden');
                formMessage.classList.add('success');
                formMessage.innerText = `Grazie, ${name}! Your table for ${guests} on ${date} at ${time} has been successfully reserved. We look forward to seeing you.`;
                
                // Reset button
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;

                // Hide message after 8 seconds
                setTimeout(() => {
                    formMessage.classList.add('hidden');
                    formMessage.classList.remove('success');
                }, 8000);
            }, 1500);
        });
    }
});
