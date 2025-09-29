// Wait for DOM to be fully loaded before running script
document.addEventListener('DOMContentLoaded', function () {
    initTestimonials();
    initSmoothScroll();
    initFadeAnimations();
});

/* ---------- Testimonials ---------- */
function initTestimonials() {
    const testimonials = [
        { quote: "Naasir already embodies the core responsibilities of a great manager – improving performance, supporting individual growth, and driving meaningful results. Any team would be lucky to have him.", author: "Ludo Fourrage, Founder of Nucamp" },
        { quote: "Naasir is a top instructor at Nucamp... his leadership, communication skills, and commitment to student success make him an outstanding candidate for any leadership role. I highly recommend him without reservation.", author: "Irene, Instructor Community Manager, Nucamp" },
        { quote: "When Naasir stepped into the role of Lead Developer, he immediately provided the structure and guidance we needed. His leadership allowed us, as junior developers, to focus on improving our technical skills and delivering high-quality work.", author: "Luna Barber, Front-End Developer (RAINC Team)" },
        { quote: "Naasir Bush is a key leader on the RAINC team – and not just for the front-end developers. I consider Naasir a mentor; he streamlines processes and holds everyone accountable to high standards.", author: "Shawn McDermott, Lead Content Writer (RAINC Team)" },
        { quote: "On the Northwest team, Naasir was an 'asset of assets.' He built our site's drop-down mega-menu navigation, coordinating with writers, SEO, designers, and developers to align technical solutions with business needs.", author: "Jeremy Toungate, Product Manager (Northwest Team)" },
        { quote: "Naas's exceptional leadership was pivotal in guiding our team through the RegisteredAgentsInc.com redesign. He has been building for the whole company, not just one website.", author: "Megan Adams, Product Manager (RAINC Team)" },
        { quote: "Naas brings clarity, organization, and energy to every project. His proactive communication made the high-stakes Wyoming Acquisition project seamless – he had a clear pulse on the team's status and flagged needs before they became blockers.", author: "Kailee, Product Team Lead" },
        { quote: "Naasir actively mentors others, creating an environment where we feel supported and empowered to grow. Thanks to his encouragement, I got the freedom to develop new plugins and custom WordPress blocks now used widely across our site.", author: "Vi Vo, Front-End Developer (RAINC Team)" },
        { quote: "Naasir's leadership style ensures no one works in isolation – every team member has the context, resources, and support to succeed and feel like we're winning.", author: "Lainy Beyers, Product Manager (Registered Agent & Address Teams)" },
        { quote: "Since I started at 2Barrels, Naasir has been an incredible inspiration and a true role model. He balances work, family, and even a master's program – which inspired me to begin pursuing my own degree.", author: "Camilo Espinosa, Junior Front-End Developer" },
        { quote: "Naasir has done a phenomenal job mentoring developers on the RAINC team as well as across WebOps. He often finds creative solutions before problems even arise, creating transparency and preparedness in our processes.", author: "Sam Obando, Project Coordinator (RAINC Ops)" },
        { quote: "I have scarcely gotten the honor to work with someone so communicative, open, and friendly. It is an absolute joy every single time. Naas is an excellent communicator... always looking for loose threads on his projects and unafraid to speak up for his team.", author: "Anonymous Colleague, Front-End Team" },
        { quote: "Naas has been an amazing leader on the RAINC team and has really built a spirit of collaboration with the whole team and across functional areas.", author: "Anonymous Peer Feedback" },
        { quote: "Naas is an amazing team lead, mentor, and developer. Watching him complete more higher education, teach others, and lead our teams is inspiring and always makes me want to work hard to achieve more.", author: "Anonymous Peer Feedback" },
        { quote: "Naas embraces what makes our Frontend culture great: he's flexible, knowledgeable, patient, and supportive. He balances his own work while always making himself available to help another dev troubleshoot.", author: "Anonymous Peer Feedback" }
    ];

    const grid = document.querySelector('.testimonials-grid');
    if (!grid) return;

    grid.innerHTML = '';
    testimonials.forEach(t => {
        const el = document.createElement('div');
        el.className = 'testimonial fade-in';
        // no inline colors — let CSS theme handle it
        el.innerHTML = `
      <p>${t.quote}</p>
      <cite>${t.author}</cite>
    `;
        grid.appendChild(el);
    });
}

/* ---------- Smooth scroll ---------- */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (target) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                const y = target.getBoundingClientRect().top + window.scrollY - 50;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });
}

/* ---------- Fade-in ---------- */
function initFadeAnimations() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('section, .achievements-list li, .project-card, .testimonial, .stat-item')
        .forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
}

/* ---------- Dark mode: init + toggle (persist) ---------- */
(function () {
    const STORAGE_KEY = 'theme';
    const root = document.documentElement;
    const saved = localStorage.getItem(STORAGE_KEY);

    // Respect saved choice, otherwise follow system
    if (saved) {
        root.setAttribute('data-theme', saved);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.setAttribute('data-theme', 'dark');
    }

    // Watch system if no manual choice
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener?.('change', e => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            setToggleIcon(e.matches ? 'dark' : 'light');
        }
    });

    // Toggle button + icon
    const btn = document.getElementById('theme-toggle');
    function setToggleIcon(theme) {
        if (!btn) return;
        btn.innerHTML = theme === 'dark'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
    setToggleIcon(root.getAttribute('data-theme') || 'light');

    btn?.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem(STORAGE_KEY, next);
        setToggleIcon(next);
    });
})();
