/* ============================================
   UCHA WEBSITE — SCRIPT.JS
   Digital Love Experience
   All Interactive Features
   ============================================ */

(function () {
    'use strict';

    // ==================== CONFIG ====================
    const LOVE_START_DATE = new Date('2026-02-22T00:00:00');
    const CIRCLE_CIRCUMFERENCE = 339.292; // 2 * PI * 54

    // ==================== DOM READY ====================
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initPreloader();
        initNavbar();
        initScrollProgress();
        initActiveNav();
        initSmoothScroll();
        initLoveCounter();
        initScrollReveal();
        initFloatingHearts();
        initSparkles();
        initGallery();
        initGalleryFilters();
        initSurpriseGenerator();
        initMusicPlayer();
        initLetterModal();
    }

    // ==================== A. PRELOADER ====================
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        // Hide preloader after animation completes
        setTimeout(function () {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 3000);

        // Prevent scroll during preloader
        document.body.style.overflow = 'hidden';
    }

    // ==================== B. NAVBAR ====================
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');

        if (!navbar) return;

        // Scroll effect
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Hamburger toggle
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', function () {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            // Close menu on link click
            navLinks.querySelectorAll('.nav-link').forEach(function (link) {
                link.addEventListener('click', function () {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                });
            });

            // Close menu on outside click
            document.addEventListener('click', function (e) {
                if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        }
    }

    // ==================== SCROLL PROGRESS ====================
    function initScrollProgress() {
        const progressBar = document.getElementById('scroll-progress');
        if (!progressBar) return;

        window.addEventListener('scroll', function () {
            var scrollTop = window.scrollY;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        });
    }

    // ==================== ACTIVE NAV SECTION ====================
    function initActiveNav() {
        var sections = document.querySelectorAll('.section, .hero-section');
        var navLinks = document.querySelectorAll('.nav-link');

        if (!sections.length || !navLinks.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('data-section') === id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            rootMargin: '-30% 0px -60% 0px',
            threshold: 0
        });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    // ==================== SMOOTH SCROLL ====================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                var targetId = this.getAttribute('href');
                var target = document.querySelector(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ==================== E. LOVE COUNTER ====================
    function initLoveCounter() {
        updateCounter();
        setInterval(updateCounter, 1000);
    }

    function updateCounter() {
        var now = new Date();
        var diff = now - LOVE_START_DATE;

        var daysEl = document.getElementById('counter-days');
        var hoursEl = document.getElementById('counter-hours');
        var minutesEl = document.getElementById('counter-minutes');
        var secondsEl = document.getElementById('counter-seconds');
        var statusEl = document.getElementById('counter-status');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        if (diff < 0) {
            // Countdown mode
            if (statusEl) statusEl.textContent = 'Menuju hari pertama cerita kita...';
            diff = Math.abs(diff);
        } else {
            if (statusEl) statusEl.textContent = 'Kita sudah bersama selama...';
        }

        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = padZero(days);
        hoursEl.textContent = padZero(hours);
        minutesEl.textContent = padZero(minutes);
        secondsEl.textContent = padZero(seconds);

        // Update rings
        updateRing('ring-days', days, 365);
        updateRing('ring-hours', hours, 24);
        updateRing('ring-minutes', minutes, 60);
        updateRing('ring-seconds', seconds, 60);
    }

    function padZero(num) {
        return num < 10 ? '0' + num : String(num);
    }

    function updateRing(id, value, max) {
        var ring = document.getElementById(id);
        if (!ring) return;
        var progress = (value % max) / max;
        var offset = CIRCLE_CIRCUMFERENCE * (1 - progress);
        ring.style.strokeDashoffset = offset;
    }

    // ==================== SCROLL REVEAL ====================
    function initScrollReveal() {
        var reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(function () {
                        entry.target.classList.add('revealed');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(function (el) {
            observer.observe(el);
        });
    }

    // ==================== FLOATING HEARTS ====================
    function initFloatingHearts() {
        var container = document.getElementById('floating-hearts');
        if (!container) return;

        function createHeart() {
            var heart = document.createElement('div');
            heart.className = 'floating-heart';
            var size = Math.random() * 16 + 8;
            heart.style.width = size + 'px';
            heart.style.height = size + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.bottom = '-20px';
            heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
            heart.style.animationDelay = (Math.random() * 2) + 's';
            heart.style.opacity = Math.random() * 0.3 + 0.1;

            heart.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';

            container.appendChild(heart);

            setTimeout(function () {
                heart.remove();
            }, 16000);
        }

        // Create hearts periodically
        setInterval(createHeart, 3000);

        // Initial batch
        for (var i = 0; i < 3; i++) {
            setTimeout(createHeart, i * 1000);
        }
    }

    // ==================== SPARKLES ====================
    function initSparkles() {
        var container = document.getElementById('sparkle-container');
        if (!container) return;

        function createSparkle() {
            var sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            sparkle.style.animationDelay = (Math.random() * 2) + 's';
            sparkle.style.width = (Math.random() * 4 + 2) + 'px';
            sparkle.style.height = sparkle.style.width;
            container.appendChild(sparkle);

            setTimeout(function () {
                sparkle.remove();
            }, 6000);
        }

        setInterval(createSparkle, 800);
        for (var i = 0; i < 15; i++) {
            setTimeout(createSparkle, i * 200);
        }
    }

    // ==================== GALLERY ====================
    function initGallery() {
        var items = document.querySelectorAll('.gallery-item');
        items.forEach(function (item) {
            item.addEventListener('click', function () {
                openLightbox(this);
            });
        });
    }

    function openLightbox(item) {
        var lightbox = document.getElementById('lightbox');
        var content = document.getElementById('lightbox-content');
        if (!lightbox || !content) return;

        var placeholder = item.querySelector('.gallery-placeholder');
        var caption = item.querySelector('.gallery-caption');

        content.innerHTML = '';
        if (placeholder) {
            var clone = placeholder.cloneNode(true);
            clone.style.width = '400px';
            clone.style.height = '300px';
            clone.style.borderRadius = '16px';
            clone.style.fontSize = '1.2rem';
            content.appendChild(clone);
        }
        if (caption) {
            var cap = document.createElement('p');
            cap.textContent = caption.textContent;
            cap.style.marginTop = '16px';
            cap.style.color = 'rgba(255,255,255,0.7)';
            cap.style.fontSize = '1rem';
            content.appendChild(cap);
        }

        lightbox.classList.add('active');
        document.body.classList.add('modal-open');
    }

    window.closeLightbox = function () {
        var lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    };

    // Close lightbox on overlay click
    document.addEventListener('click', function (e) {
        if (e.target.id === 'lightbox') {
            closeLightbox();
        }
    });

    // ==================== GALLERY FILTERS ====================
    function initGalleryFilters() {
        var filterBtns = document.querySelectorAll('.filter-btn');
        var items = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var filter = this.getAttribute('data-filter');

                filterBtns.forEach(function (b) { b.classList.remove('active'); });
                this.classList.add('active');

                items.forEach(function (item) {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ==================== K. SURPRISE MESSAGE GENERATOR ====================
    function initSurpriseGenerator() {
        var btn = document.getElementById('surprise-btn');
        var messageEl = document.getElementById('surprise-message');
        var sparklesEl = document.getElementById('surprise-sparkles');

        if (!btn || !messageEl) return;

        var messages = [
            'Ucha, kamu itu rumah yang ingin Rio jaga. 💕',
            'Senyummu adalah bagian favorit dari hari Rio. ✨',
            'Kalau dunia terasa berat, semoga kamu ingat Rio selalu ada. 🌸',
            'Uswatun Hasanah, namamu indah, tapi hadirmu jauh lebih indah. 💖',
            'Rio mungkin tidak sempurna, tapi rasa sayang Rio untuk Ucha sungguh-sungguh. 🌹',
            'Setiap kali kamu tersenyum, Rio merasa dunia ini layak untuk dijalani. 💫',
            'Kamu adalah alasan Rio percaya pada keajaiban. 🦋',
            'Ucha, terima kasih sudah menjadi versi terbaik dari segalanya. 🌷',
            'Di hari yang sulit, ingatlah bahwa Rio selalu berdoa untuk kebahagiaanmu. 🙏',
            'Kamu bukan hanya dicintai, kamu adalah definisi dari cinta itu sendiri. 💝',
            'Rio ingin menjadi alasan kenapa kamu tersenyum hari ini. 😊',
            'Uswatun Hasanah, kamu adalah jawaban atas doa-doa Rio. 🌟'
        ];

        var lastIndex = -1;

        btn.addEventListener('click', function () {
            var index;
            do {
                index = Math.floor(Math.random() * messages.length);
            } while (index === lastIndex && messages.length > 1);
            lastIndex = index;

            messageEl.innerHTML = '<p>' + messages[index] + '</p>';

            // Create sparkles
            if (sparklesEl) {
                for (var i = 0; i < 20; i++) {
                    createSurpriseSparkle(sparklesEl);
                }
            }
        });
    }

    function createSurpriseSparkle(container) {
        var sparkle = document.createElement('div');
        sparkle.className = 'surprise-sparkle';
        var colors = ['#e8a0b4', '#d4a574', '#c9b3d4', '#f5dde6', '#e8c9a0'];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.left = '50%';
        sparkle.style.top = '50%';

        var angle = Math.random() * Math.PI * 2;
        var distance = Math.random() * 120 + 40;
        sparkle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        sparkle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');

        container.appendChild(sparkle);

        setTimeout(function () {
            sparkle.remove();
        }, 1200);
    }

    // ==================== L. MUSIC PLAYER ====================
    function initMusicPlayer() {
        var playBtn = document.getElementById('music-play-btn');
        var musicToggle = document.getElementById('music-toggle');
        var audio = document.getElementById('bg-music');
        var statusEl = document.getElementById('music-status');
        var musicEq = document.querySelector('.music-eq');
        var playIcon = playBtn ? playBtn.querySelector('.play-icon') : null;
        var pauseIcon = playBtn ? playBtn.querySelector('.pause-icon') : null;

        if (!playBtn || !audio) return;

        var isPlaying = false;

        playBtn.addEventListener('click', function () {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play().catch(function () {
                    // Autoplay blocked — user interaction required
                    if (statusEl) statusEl.textContent = 'Klik untuk memutar musik';
                });
            }
        });

        audio.addEventListener('play', function () {
            isPlaying = true;
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
            if (statusEl) statusEl.textContent = 'Musik sedang menemani cerita kita';
            if (musicEq) musicEq.classList.add('playing');
            if (musicToggle) musicToggle.classList.add('playing');
        });

        audio.addEventListener('pause', function () {
            isPlaying = false;
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
            if (statusEl) statusEl.textContent = 'Musik siap dinyalakan';
            if (musicEq) musicEq.classList.remove('playing');
            if (musicToggle) musicToggle.classList.remove('playing');
        });

        // Nav music toggle
        if (musicToggle) {
            musicToggle.addEventListener('click', function () {
                if (isPlaying) {
                    audio.pause();
                } else {
                    audio.play().catch(function () { });
                }
            });
        }
    }

    // ==================== I. LETTER MODAL ====================
    function initLetterModal() {
        var modal = document.getElementById('letter-modal');
        if (!modal) return;

        // Close on overlay click
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeLetterModal();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeLetterModal();
                closeLightbox();
            }
        });
    }

    window.openLetterModal = function () {
        var modal = document.getElementById('letter-modal');
        if (modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
        }
    };

    window.closeLetterModal = function () {
        var modal = document.getElementById('letter-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    };

})();
