document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Removal
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 1000);
        }, 800);
    });

    // 2. Intersection Observer for Fade-Up animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });

    // Also observe section titles for entry effect
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        titleObserver.observe(el);
    });

    // 3. Hero Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroText = document.querySelector('.reveal-text');
        if (heroText) {
            heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroText.style.opacity = Math.max(0, 1 - scrolled / 600);
        }

        const heroMain = document.querySelector('.main-title');
        if (heroMain) {
            heroMain.style.transform = `translateY(${scrolled * -0.1}px)`;
        }
    });

    // 4. Custom Hover Interaction for Visual Blocks
    const visualBlocks = document.querySelectorAll('.visual-block');
    visualBlocks.forEach(block => {
        block.addEventListener('mousemove', (e) => {
            const rect = block.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const kanji = block.querySelector('.floating-kanji');
            if (kanji) {
                const moveX = (x / rect.width - 0.5) * 40;
                const moveY = (y / rect.height - 0.5) * 40;
                kanji.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });

        block.addEventListener('mouseleave', () => {
            const kanji = block.querySelector('.floating-kanji');
            if (kanji) {
                kanji.style.transform = `translate(0, 0)`;
            }
        });
    });

    // 5. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    console.log("Muromachi Experience Initialized.");
});
