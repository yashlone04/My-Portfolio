/* ==================== MENU SHOW Y HIDDEN ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/* ==================== REMOVE MENU MOBILE ==================== */
const navLink = document.querySelectorAll('.nav-link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav-link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== CHANGE BACKGROUND HEADER ==================== */
function scrollHeader(){
    const header = document.querySelector('.header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* ==================== SCROLL UP SHOW ==================== */
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-up class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/* ==================== LIGHT/DARK THEME CONTROLLER ==================== */
const themeButton = document.getElementById('theme-toggle');
const darkTheme = 'dark-theme';
const lightTheme = 'light-theme';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'light' : 'dark';

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light theme
  if (selectedTheme === 'light') {
    document.body.classList.add(lightTheme);
    document.body.classList.remove(darkTheme);
  } else {
    document.body.classList.add(darkTheme);
    document.body.classList.remove(lightTheme);
  }
} else {
  // Default is dark theme
  document.body.classList.add(darkTheme);
  document.body.classList.remove(lightTheme);
}

// Update Github Widget Images depending on theme
function updateGithubWidgets(theme) {
    const ghStatsImg = document.getElementById('gh-stats-img');
    const ghLangsImg = document.getElementById('gh-langs-img');
    const ghStreakImg = document.getElementById('gh-streak-img');
    
    if (!ghStatsImg || !ghLangsImg || !ghStreakImg) return;
    
    if (theme === 'light') {
        ghStatsImg.src = "https://github-readme-stats.vercel.app/api?username=yashlone04&show_icons=true&theme=default&hide_border=true&bg_color=ffffff&title_color=4f46e5&icon_color=9333ea&text_color=334155";
        ghLangsImg.src = "https://github-readme-stats.vercel.app/api/top-langs/?username=yashlone04&layout=compact&theme=default&hide_border=true&bg_color=ffffff&title_color=4f46e5&text_color=334155";
        ghStreakImg.src = "https://github-readme-streak-stats.herokuapp.com/?user=yashlone04&theme=default&hide_border=true&background=ffffff&ring=4f46e5&fire=9333ea&currStreakNum=334155&sideLabels=334155";
    } else {
        ghStatsImg.src = "https://github-readme-stats.vercel.app/api?username=yashlone04&show_icons=true&theme=dark&hide_border=true&bg_color=111827&title_color=6366f1&icon_color=a855f7&text_color=9ca3af";
        ghLangsImg.src = "https://github-readme-stats.vercel.app/api/top-langs/?username=yashlone04&layout=compact&theme=dark&hide_border=true&bg_color=111827&title_color=6366f1&text_color=9ca3af";
        ghStreakImg.src = "https://github-readme-streak-stats.herokuapp.com/?user=yashlone04&theme=dark&hide_border=true&background=111827&ring=6366f1&fire=a855f7&currStreakNum=9ca3af&sideLabels=9ca3af";
    }
}

// Initial widget load configuration
updateGithubWidgets(getCurrentTheme());

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / dark theme
    if (document.body.classList.contains(lightTheme)) {
        document.body.classList.remove(lightTheme);
        document.body.classList.add(darkTheme);
    } else {
        document.body.classList.add(lightTheme);
        document.body.classList.remove(darkTheme);
    }
    
    const currentTheme = getCurrentTheme();
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', currentTheme);
    
    // Update github stats widgets
    updateGithubWidgets(currentTheme);
});

/* ==================== ACTIVE NAV LINK ON SCROLL ==================== */
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const navLinkElement = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if(navLinkElement) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                navLinkElement.classList.add('active-link');
            }else{
                navLinkElement.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ==================== CANVAS PARTICLE BACKGROUND ==================== */
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let numberOfParticles = 60;
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Adjust density based on screen width
        if (window.innerWidth < 768) {
            numberOfParticles = 25;
        } else {
            numberOfParticles = 65;
        }
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            // Pick color based on light/dark mode
            const isLight = document.body.classList.contains('light-theme');
            ctx.fillStyle = isLight ? 'rgba(79, 70, 229, 0.15)' : 'rgba(99, 102, 241, 0.25)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }
    
    function connectParticles() {
        const maxDistance = 120;
        const isLight = document.body.classList.contains('light-theme');
        const lineColor = isLight ? 'rgba(79, 70, 229, 0.05)' : 'rgba(99, 102, 241, 0.07)';
        
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let dx = particlesArray[a].x - particlesArray[b].x;
                let dy = particlesArray[a].y - particlesArray[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.strokeStyle = lineColor;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    let animationFrameId;
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        connectParticles();
        animationFrameId = requestAnimationFrame(animateParticles);
    }
    
    // Performance optimization: Stop animation when tab is not active
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animateParticles();
        }
    });
    
    initParticles();
    animateParticles();
}

/* ==================== SCROLL TRIGGERED ANIMATIONS ==================== */
// Add class to reveal elements on scroll
const revealElements = document.querySelectorAll('.about-objective, .highlight-card, .skills-content, .project-card, .timeline-item, .cert-card, .achievement-item, .github-card, .contact-card');

revealElements.forEach(el => el.classList.add('fade-in-scroll'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // If it's the skills container, trigger progress bar animation
            if (entry.target.classList.contains('skills-content')) {
                const skillsContainer = document.querySelector('.skills-container');
                if (skillsContainer) skillsContainer.classList.add('visible');
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => observer.observe(el));

/* ==================== PROJECT FILTERING ==================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Remove active class from buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filterValue = e.target.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || cardCategory === filterValue) {
                card.classList.remove('hidden');
                // Give dynamic slide-up effect
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                // Wait for animation to finish before adding hidden class
                setTimeout(() => {
                    card.classList.add('hidden');
                }, 300);
            }
        });
    });
});

/* ==================== CONTACT FORM VALIDATION ==================== */
const contactForm = document.getElementById('contact-form');
const successBox = document.getElementById('form-success-box');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        // Name Validation
        if (!nameInput.value.trim()) {
            showError(nameInput);
            isValid = false;
        } else {
            removeError(nameInput);
        }
        
        // Email Validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
            showError(emailInput);
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        // Subject Validation
        if (!subjectInput.value.trim()) {
            showError(subjectInput);
            isValid = false;
        } else {
            removeError(subjectInput);
        }
        
        // Message Validation
        if (!messageInput.value.trim()) {
            showError(messageInput);
            isValid = false;
        } else {
            removeError(messageInput);
        }
        
        if (isValid) {
            // Mock submission success
            successBox.classList.add('visible');
            contactForm.reset();
            
            // Auto hide success box after 5 seconds
            setTimeout(() => {
                successBox.classList.remove('visible');
            }, 5000);
        }
    });
}

function showError(input) {
    const parent = input.parentElement;
    parent.classList.add('invalid');
}

function removeError(input) {
    const parent = input.parentElement;
    parent.classList.remove('invalid');
}

// Remove invalid class on input typing
const inputs = document.querySelectorAll('.form-input');
inputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim()) {
            removeError(input);
        }
    });
});

/* ==================== RESUME MODAL & DOWNLOAD ==================== */
const downloadBtn = document.getElementById('download-resume-btn');
const resumeModal = document.getElementById('resume-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCloseAction = document.getElementById('modal-close-action');
const modalDownloadAction = document.getElementById('modal-download-action');

function openModal() {
    resumeModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Stop background scrolling
}

function closeModal() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = ''; // Resume background scrolling
}

if (downloadBtn) {
    downloadBtn.addEventListener('click', openModal);
}

if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
if (modalCloseAction) modalCloseAction.addEventListener('click', closeModal);

// Close when clicking outside modal-content
window.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        closeModal();
    }
});

// Download resume trigger
if (modalDownloadAction) {
    modalDownloadAction.addEventListener('click', () => {
        // Trigger a download of the text version of the resume
        const resumeUrl = 'Yash_Lone_Resume.txt';
        const link = document.createElement('a');
        link.href = resumeUrl;
        link.download = 'Yash_Lone_Resume.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        closeModal();
    });
}
