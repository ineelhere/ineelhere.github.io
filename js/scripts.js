/**
 * Minimal Modern Enhancements
 * Clean, performant, unobtrusive interactions
 */

(function() {
    'use strict';

    // ==================== Auto-update Year ====================
    function updateYear() {
        const year = new Date().getFullYear();
        document.querySelectorAll('footer').forEach(footer => {
            footer.innerHTML = footer.innerHTML.replace(/© \d{4}/, `© ${year}`);
        });
    }
    
    // Run on load and when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateYear);
    } else {
        updateYear();
    }

    // ==================== Scroll Progress ====================
    const progress = document.createElement('div');
    progress.id = 'scroll-progress';
    document.body.prepend(progress);

    let ticking = false;
    function updateProgress() {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        progress.style.width = scrolled + '%';
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });

    // ==================== Smooth Anchor Scrolling ====================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, '', href);
            }
        });
    });

    // ==================== External Links ====================
    document.querySelectorAll('a[href^="http"]').forEach(function(link) {
        if (!link.hostname.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });

    // ==================== Copy Code Blocks ====================
    document.querySelectorAll('pre').forEach(function(pre) {
        const code = pre.querySelector('code');
        if (!code) return;

        const btn = document.createElement('button');
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code to clipboard');
        btn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 10px;
            font-size: 12px;
            font-weight: 500;
            background: rgba(255,255,255,0.1);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 4px;
            color: inherit;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s;
        `;

        pre.style.position = 'relative';
        pre.appendChild(btn);

        pre.addEventListener('mouseenter', function() { btn.style.opacity = '1'; });
        pre.addEventListener('mouseleave', function() { btn.style.opacity = '0'; });

        btn.addEventListener('click', function() {
            navigator.clipboard.writeText(code.textContent).then(function() {
                btn.textContent = 'Copied!';
                setTimeout(function() { btn.textContent = 'Copy'; }, 1500);
            });
        });
    });

    // ==================== Lazy Image Loading ====================
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img').forEach(function(img) {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    // ==================== Current Year in Footer ====================
    document.querySelectorAll('.page-footer').forEach(function(footer) {
        const text = footer.textContent;
        if (text.includes('2026')) {
            footer.textContent = text.replace('2026', new Date().getFullYear());
        }
    });

})();