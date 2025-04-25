// Wait for DOM to be fully loaded before running script
document.addEventListener('DOMContentLoaded', function() {
    // Load testimonials
    initTestimonials();
    
    // Initialize smooth scrolling
    initSmoothScroll();
    
    // Initialize fade-in animations
    initFadeAnimations();
});

function initTestimonials() {
    // Testimonials data
    const testimonials = [
        {
            quote: "Naasir already embodies the core responsibilities of a great manager – improving performance, supporting individual growth, and driving meaningful results. Any team would be lucky to have him.",
            author: "Ludo Fourrage, Founder of Nucamp"
        },
        {
            quote: "Naasir is a top instructor at Nucamp... his leadership, communication skills, and commitment to student success make him an outstanding candidate for any leadership role. I highly recommend him without reservation.",
            author: "Irene, Instructor Community Manager, Nucamp"
        },
        {
            quote: "When Naasir stepped into the role of Lead Developer, he immediately provided the structure and guidance we needed. His leadership allowed us, as junior developers, to focus on improving our technical skills and delivering high-quality work.",
            author: "Luna Barber, Front-End Developer (RAINC Team)"
        },
        {
            quote: "Naasir Bush is a key leader on the RAINC team – and not just for the front-end developers. I consider Naasir a mentor; he streamlines processes and holds everyone accountable to high standards.",
            author: "Shawn McDermott, Lead Content Writer (RAINC Team)"
        },
        {
            quote: "On the Northwest team, Naasir was an 'asset of assets.' He built our site's drop-down mega-menu navigation, coordinating with writers, SEO, designers, and developers to align technical solutions with business needs.",
            author: "Jeremy Toungate, Product Manager (Northwest Team)"
        },
        {
            quote: "Naas's exceptional leadership was pivotal in guiding our team through the RegisteredAgentsInc.com redesign. He has been building for the whole company, not just one website.",
            author: "Megan Adams, Product Manager (RAINC Team)"
        },
        {
            quote: "Naas brings clarity, organization, and energy to every project. His proactive communication made the high-stakes Wyoming Acquisition project seamless – he had a clear pulse on the team's status and flagged needs before they became blockers.",
            author: "Kailee, Product Team Lead"
        },
        {
            quote: "Naasir actively mentors others, creating an environment where we feel supported and empowered to grow. Thanks to his encouragement, I got the freedom to develop new plugins and custom WordPress blocks now used widely across our site.",
            author: "Vi Vo, Front-End Developer (RAINC Team)"
        },
        {
            quote: "Naasir's leadership style ensures no one works in isolation – every team member has the context, resources, and support to succeed and feel like we're winning.",
            author: "Lainy Beyers, Product Manager (Registered Agent & Address Teams)"
        },
        {
            quote: "Since I started at 2Barrels, Naasir has been an incredible inspiration and a true role model. He balances work, family, and even a master's program – which inspired me to begin pursuing my own degree.",
            author: "Camilo Espinosa, Junior Front-End Developer"
        },
        {
            quote: "Naasir has done a phenomenal job mentoring developers on the RAINC team as well as across WebOps. He often finds creative solutions before problems even arise, creating transparency and preparedness in our processes.",
            author: "Sam Obando, Project Coordinator (RAINC Ops)"
        },
        {
            quote: "I have scarcely gotten the honor to work with someone so communicative, open, and friendly. It is an absolute joy every single time. Naas is an excellent communicator... always looking for loose threads on his projects and unafraid to speak up for his team.",
            author: "Anonymous Colleague, Front-End Team"
        },
        {
            quote: "Naas has been an amazing leader on the RAINC team and has really built a spirit of collaboration with the whole team and across functional areas.",
            author: "Anonymous Peer Feedback"
        },
        {
            quote: "Naas is an amazing team lead, mentor, and developer. Watching him complete more higher education, teach others, and lead our teams is inspiring and always makes me want to work hard to achieve more.",
            author: "Anonymous Peer Feedback"
        },
        {
            quote: "Naas embraces what makes our Frontend culture great: he's flexible, knowledgeable, patient, and supportive. He balances his own work while always making himself available to help another dev troubleshoot.",
            author: "Anonymous Peer Feedback"
        }
    ];
    
    const testimonialGrid = document.querySelector('.testimonials-grid');
    
    // Clear any existing testimonials
    if (testimonialGrid) {
        testimonialGrid.innerHTML = '';
        
        // Create testimonial elements and add to grid
        testimonials.forEach(testimonial => {
            const testimonialElement = document.createElement('div');
            testimonialElement.className = 'testimonial fade-in';
            
            testimonialElement.innerHTML = `
                <p style="color: #344056; font-weight: 500;">${testimonial.quote}</p>
                <cite style="color: #1a1a2e; font-weight: 600;">${testimonial.author}</cite>
            `;
            
            testimonialGrid.appendChild(testimonialElement);
        });
    } else {
        console.error('Testimonials grid not found');
    }
}

function initSmoothScroll() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default link behavior
            e.preventDefault();
            
            // Get the target section's ID from the href attribute
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Add active class to link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Calculate the scroll position with offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - 50;
                
                // Scroll smoothly
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initFadeAnimations() {
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        // Add fade-in class to all relevant elements
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('fade-in');
        });
        
        // Add fade-in class to individual items
        const items = document.querySelectorAll('.achievements-list li, .project-card, .testimonial, .stat-item');
        
        // Create the observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once visible
                }
            });
        }, {
            threshold: 0.15, // Trigger when 15% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Slightly before the element comes into view
        });
        
        // Observe all the fade-in elements
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            element.classList.add('visible');
        });
    }
} 