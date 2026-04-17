/* ===================== NAVBAR SCROLL EFFECT ===================== */
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '1rem 5%';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
    } else {
        navbar.style.padding = '1.5rem 5%';
        navbar.style.boxShadow = 'none';
    }
});

/* ===================== SMOOTH SCROLL FOR NAV LINKS ===================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ===================== ACTIVE NAV LINK ON SCROLL ===================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--accent)';
        }
    });
});

/* ===================== SCROLL REVEAL ANIMATIONS ===================== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

// Add reveal class to animatable elements
const animatables = document.querySelectorAll('.skill-card, .project-card, .contact-item');
animatables.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Also observe section headers
document.querySelectorAll('.section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Add CSS class to trigger visibility
const style = document.createElement('style');
style.textContent = `.reveal.visible, .section-header.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

/* ===================== TYPING EFFECT FOR HERO ===================== */
const heroTitle = document.querySelector('.hero-content h1');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;

    // Add blinking cursor effect to name
    heroTitle.innerHTML = originalText.replace(
        "Prateek Verma",
        `<span class="typed-name">Prateek Verma</span>`
    );

    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .typed-name::after {
            content: '|';
            animation: blink 1s step-end infinite;
            color: var(--accent);
            margin-left: 2px;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    `;
    document.head.appendChild(cursorStyle);

    // Stop cursor after 3 seconds
    setTimeout(() => {
        const typedName = document.querySelector('.typed-name');
        if (typedName) typedName.style.setProperty('--show-cursor', 'none');
        cursorStyle.textContent = `.typed-name::after { display: none; }`;
    }, 3500);
}

/* ===================== SKILL CARD TILT EFFECT ===================== */
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (-y / rect.height) * 10;
        const rotateY = (x / rect.width) * 10;
        card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease';
    });
});

/* ===================== PROJECT CARD GLOW EFFECT ===================== */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(46,204,113,0.1), rgba(255,255,255,0.04))`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255, 255, 255, 0.05)';
    });
});

/* ===================== DOWNLOAD RESUME BUTTON FEEDBACK ===================== */
const resumeBtn = document.querySelector('.button button');
if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
        const original = resumeBtn.innerHTML;
        resumeBtn.innerHTML = '<i class="fa-solid fa-check" style="margin-right:0.5rem;"></i>Downloading...';
        resumeBtn.style.background = 'linear-gradient(45deg, #27ae60, #2ecc71)';
        setTimeout(() => {
            resumeBtn.innerHTML = original;
            resumeBtn.style.background = '';
        }, 2500);
    });
}

/* ===================== SCROLL TO TOP ON LOGO CLICK ===================== */
document.querySelector('.logo')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===================== MOBILE NAV TOGGLE (Hamburger) ===================== */
const navLinksEl = document.querySelector('.nav-links');

// Create hamburger button
const hamburger = document.createElement('button');
hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
hamburger.style.cssText = `
    display: none;
    background: none;
    border: none;
    color: var(--accent);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.3rem;
`;
hamburger.setAttribute('aria-label', 'Toggle menu');
navbar.appendChild(hamburger);

const hamburgerStyle = document.createElement('style');
hamburgerStyle.textContent = `
    @media (max-width: 768px) {
        .navbar button { display: block !important; }
        .nav-links {
            position: fixed;
            top: 70px; right: 0;
            background: rgba(10,10,10,0.97);
            flex-direction: column;
            width: 200px;
            padding: 1.5rem;
            gap: 1.5rem;
            border-left: 1px solid rgba(255,255,255,0.1);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-radius: 0 0 0 12px;
        }
        .nav-links.open { transform: translateX(0); }
    }
`;
document.head.appendChild(hamburgerStyle);

hamburger.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
    hamburger.innerHTML = navLinksEl.classList.contains('open')
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// Close menu on nav link click
navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        hamburger.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

/* ===================== PARTICLE CURSOR TRAIL ===================== */
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.6) return; // Throttle particles

    const dot = document.createElement('span');
    dot.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 5px; height: 5px;
        border-radius: 50%;
        background: var(--accent);
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transform: translate(-50%, -50%);
        transition: opacity 0.6s ease, transform 0.6s ease;
    `;
    document.body.appendChild(dot);

    requestAnimationFrame(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'translate(-50%, -50%) scale(0)';
    });

    setTimeout(() => dot.remove(), 700);
});

/* ===================== FOOTER YEAR AUTO-UPDATE ===================== */
const footerP = document.querySelector('footer p');
if (footerP) {
    footerP.textContent = `© ${new Date().getFullYear()} Prateek Verma. All rights reserved.`;
}

console.log('%c Portfolio Loaded ✅', 'color: #2ecc71; font-size: 14px; font-weight: bold;');
