// EmailJS Initialization
(function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("PVmfT25MviD-HoPcE"); // Replace with your actual Public Key
})();

// Tab Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab Switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to current button and panel
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Contact Form Handling with EmailJS
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Send email using EmailJS
            sendEmailWithEmailJS(name, email, message);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form message
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message for mobile users
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
    
    // Send email using EmailJS
    function sendEmailWithEmailJS(name, email, message) {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Prepare template parameters
        const templateParams = {
            name: name,
            email: email,
            message: message,
            to_email: 'abdurbc@gmail.com' // Your receiving email
        };
        
        // Send email using EmailJS
        emailjs.send('service_hz3hcfg', 'template_j7680ik', templateParams)
            .then(function(response) {
                console.log('Email sent successfully!', response.status, response.text);
                showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('Failed to send email:', error);
                showFormMessage('Sorry, there was an error sending your message. Please try again later.', 'error');
            })
            .finally(function() {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    }
    
    // Add animation on scroll for timeline items
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(item);
        });
        
        // Observe project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
    }
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Add some additional interactivity for the profile card
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle hover effect to profile picture
    const profilePicture = document.querySelector('.profile-picture');
    if (profilePicture) {
        profilePicture.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        profilePicture.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add click effect to social links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a small visual feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Public key: PVmfT25MviD-HoPcE
// service id: service_hz3hcfg
// template id: template_j7680ik
// 