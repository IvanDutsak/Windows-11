// Ініціалізація AOS (Animate On Scroll) вже зроблена в HTML через <script> блок.
// Цей файл для додаткового JavaScript, якщо він потрібен.

// Приклад: Поява/зникнення кнопки "Наверх" при прокрутці
// Розкоментуйте цей блок, якщо додали кнопку в HTML/CSS

document.addEventListener('DOMContentLoaded', (event) => {
    // ===== КНОПКА "НАВЕРХ" =====
    const scrollToTopBtn = document.createElement('a'); // Використовуємо 'a' для href='#'
    scrollToTopBtn.innerHTML = '↑'; // Стрілка вгору
    scrollToTopBtn.classList.add('scroll-to-top');
    scrollToTopBtn.setAttribute('href', '#'); // Посилання на верх сторінки
    scrollToTopBtn.setAttribute('title', 'Наверх');
    document.body.appendChild(scrollToTopBtn);

    // Функція для показу/приховування кнопки
    const toggleVisibility = () => {
        if (window.pageYOffset > 300) { // Показати кнопку після прокрутки на 300px
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    };

    // Слухач прокрутки
    window.addEventListener('scroll', toggleVisibility);

    // Плавна прокрутка при кліку (вже є в html 'scroll-behavior: smooth;')
    scrollToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Перевірити стан при завантаженні сторінки
    toggleVisibility();

    // ===== ІНІЦІАЛІЗАЦІЯ PARTICLES.JS =====
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#ffffff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.3,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.8
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // ===== СЛАЙДЕР ПОРІВНЯННЯ "ДО/ПІСЛЯ" =====
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
        let isDown = false;
        const handle = slider.querySelector('.slider-handle');
        const afterImage = slider.querySelector('.after-image');
        
        const setWidth = (x) => {
            const sliderRect = slider.getBoundingClientRect();
            let percent = (x - sliderRect.left) / sliderRect.width * 100;
            percent = Math.max(0, Math.min(100, percent));
            
            afterImage.style.width = `${percent}%`;
            handle.style.left = `${percent}%`;
        };
        
        // Початкова позиція
        setWidth(slider.offsetWidth / 2);
        
        // Події для десктопу
        handle.addEventListener('mousedown', (e) => {
            isDown = true;
            e.preventDefault(); // Важливо для запобігання вибору тексту
            slider.style.cursor = 'grabbing'; // Змінюємо курсор
        });
        
        window.addEventListener('mouseup', () => {
            if (!isDown) return;
            isDown = false;
            slider.style.cursor = 'grab'; // Повертаємо курсор
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault(); // Запобігає вибору тексту при перетягуванні
            setWidth(e.clientX);
        });
        
        // Події для мобільних
        handle.addEventListener('touchstart', (e) => {
            isDown = true;
            // Запобігаємо прокрутці сторінки під час перетягування на мобільних
            e.preventDefault();
        });
        
        window.addEventListener('touchend', () => {
            isDown = false;
        });
        
        window.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            // Запобігаємо прокрутці сторінки
            e.preventDefault();
            const touch = e.touches[0];
            setWidth(touch.clientX);
        });
        
        // Клік в будь-якому місці слайдера
        slider.addEventListener('click', (e) => {
            // Клік по хендлу ми вже обробляємо в інших обробниках
            if (e.target === handle) return;
            setWidth(e.clientX);
        });
        
        // Додаємо відповідні курсори
        slider.style.cursor = 'grab';
        handle.style.cursor = 'grab';
    });

    // ===== АНІМАЦІЯ ФОНУ ХЕДЕРА =====
    const header = document.querySelector('.header');
    let hue = 220; // Початковий відтінок (темно-синій)
    let direction = 1; // Напрямок зміни кольору
    let speed = 0.1; // Швидкість зміни

    function animateBackground() {
        if (!header) return; // Перевірка, чи існує елемент

        // Змінюємо відтінок з ефектом "відскоку" на кінцях спектру
        hue += speed * direction;
        if (hue > 280 || hue < 180) {
            direction *= -1; // Змінюємо напрямок
        }

        // Створюємо красивий градієнт з використанням HSL для кращого контролю
        const gradient = `linear-gradient(135deg, 
            hsla(${hue}, 80%, 45%, 0.85), 
            hsla(${hue + 60}, 70%, 30%, 0.95))`;

        // Оновлюємо фон
        header.style.backgroundImage = gradient;

        requestAnimationFrame(animateBackground);
    }

    // Запускаємо анімацію градієнту, якщо користувач не проти анімації
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (header && !prefersReducedMotion.matches) {
        requestAnimationFrame(animateBackground);
    }

    // ===== ДОДАВАННЯ SVG-ХВИЛЬ ЯК РОЗДІЛЮВАЧІ МІЖ СЕКЦІЯМИ =====
    const addWaveSeparators = () => {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach((section, index) => {
            if (index < sections.length - 1) { // Не додаємо розділювач після останньої секції
                const waveContainer = document.createElement('div');
                waveContainer.classList.add('wave-separator');
                
                // SVG хвиля
                waveContainer.innerHTML = `
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="wave-fill"></path>
                </svg>
                `;
                
                // Визначаємо колір заливки хвилі на основі фону НАСТУПНОЇ секції
                const nextSection = sections[index + 1];
                let fillColor = 'var(--secondary-color)'; // За замовчуванням
                if (nextSection) {
                    // Проста перевірка класів для визначення фону (можна зробити складніше)
                    if (nextSection.classList.contains('intro') || nextSection.classList.contains('comparison') || nextSection.classList.contains('conclusion')) {
                        fillColor = '#ffffff';
                    } else if (nextSection.classList.contains('win11-deep-dive')) {
                        // Для win11-deep-dive фон складний, залишаємо сірий або білий
                        fillColor = 'var(--secondary-color)'; // Або '#ffffff'
                    }
                }
                waveContainer.querySelector('.wave-fill').style.fill = fillColor;
                
                // Додаємо після поточної секції
                section.after(waveContainer);
            }
        });
    };
    
    // Додаємо хвилі-розділювачі
    addWaveSeparators();

    // Анімація прогрес барів для рейтингів Windows 10 vs Windows 11
    function animateRatingBars() {
        const ratingBars = document.querySelectorAll('.rating-bar-inner');
        
        if (ratingBars.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const widthValue = bar.getAttribute('data-target-width'); // Зберігаємо цільову ширину в атрибуті
                    
                    // Перевіряємо, чи користувач не вимкнув анімації
                    const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
                    if (prefersReducedMotionQuery.matches) {
                        bar.style.width = widthValue; // Встановлюємо одразу кінцеву ширину
                    } else {
                        bar.style.transition = 'width 1s ease-in-out'; // Додаємо transition тут
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = widthValue;
                        }, 100); // Невелика затримка перед стартом анімації
                    }
                    
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.2 });
        
        ratingBars.forEach(bar => {
            // Зберігаємо цільову ширину в data-атрибуті перед анімацією
            bar.setAttribute('data-target-width', bar.style.width);
            observer.observe(bar);
        });
    }
    
    animateRatingBars();
    
    // Повторно запускаємо анімацію при зміні розміру вікна
    window.addEventListener('resize', animateRatingBars);

    // Анімація рядків таблиці порівняння функцій
    function animateComparisonTable() {
        const table = document.querySelector('.comparison-table');
        if (!table) return;
        const tableRows = table.querySelectorAll('tbody tr');
        
        if (tableRows.length === 0) return;
        
        // Перевіряємо налаштування анімації
        const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotionQuery.matches) {
             // Якщо анімації вимкнені, просто показуємо таблицю
             tableRows.forEach(row => {
                 row.style.opacity = "1";
                 row.style.transform = "translateY(0)";
             });
             return; // Виходимо, анімація не потрібна
        }
        
        // Ховаємо рядки для анімації
        tableRows.forEach((row, index) => {
            row.style.opacity = "0";
            row.style.transform = "translateY(20px)";
            row.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const rows = entry.target.querySelectorAll('tbody tr');
                    rows.forEach(row => {
                        row.style.opacity = "1";
                        row.style.transform = "translateY(0)";
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(table);
        
        // Ефект при наведенні (залишаємо, бо це не основна анімація)
        const tableCells = document.querySelectorAll('.win10-feature, .win11-feature');
        tableCells.forEach(cell => {
            cell.addEventListener('mouseenter', function() {
                this.style.transform = "scale(1.02)";
                this.style.transition = "transform 0.2s ease"; // Додаємо transition тут
                this.style.zIndex = "2";
            });
            
            cell.addEventListener('mouseleave', function() {
                this.style.transform = "scale(1)";
                this.style.zIndex = "1";
            });
        });
    }

    animateComparisonTable();
});

// Інші складні анімації (частинки, паралакс) краще реалізовувати
// за допомогою спеціалізованих бібліотек (particles.js, rellax.js, GSAP)
// для кращої продуктивності та гнучкості.

