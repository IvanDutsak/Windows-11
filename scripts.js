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
                    value: 80,
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
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#ffffff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
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
                            opacity: 1
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
        handle.addEventListener('mousedown', () => isDown = true);
        window.addEventListener('mouseup', () => isDown = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            setWidth(e.clientX);
        });
        
        // Події для мобільних
        handle.addEventListener('touchstart', () => isDown = true);
        window.addEventListener('touchend', () => isDown = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            setWidth(e.touches[0].clientX);
        });
        
        // Клік в будь-якому місці слайдера
        slider.addEventListener('click', (e) => setWidth(e.clientX));
    });

    // ===== АНІМАЦІЯ ФОНУ ХЕДЕРА =====
    const header = document.querySelector('.header');
    let hue = 195; // Початковий відтінок (близько синього)

    function animateBackground() {
        if (!header) return; // Перевірка, чи існує елемент

        hue = (hue + 0.05) % 360; // Дуже повільно змінюємо відтінок

        // Оновлюємо лише частину стилю, що стосується градієнту
        const gradient = `linear-gradient(135deg, hsla(${hue}, 70%, 50%, 0.8), hsla(${hue + 40}, 70%, 30%, 0.9))`;

        // Перевіряємо, чи є фонове зображення, щоб не перезаписати його
        const currentBg = window.getComputedStyle(header).backgroundImage;
        if (currentBg && currentBg !== 'none' && currentBg.includes('url')) {
            // Якщо є зображення, додаємо градієнт перед ним
            header.style.backgroundImage = `${gradient}, ${currentBg.substring(currentBg.indexOf('url'))}`;
        } else {
            // Якщо немає зображення, просто встановлюємо градієнт
            header.style.backgroundImage = gradient;
        }

        requestAnimationFrame(animateBackground);
    }

    // Запускаємо анімацію градієнту, якщо користувач не проти анімації
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (header && !prefersReducedMotion.matches) {
        requestAnimationFrame(animateBackground);
    }

    // ===== АНІМАЦІЯ КРУГОВОЙ ДІАГРАМИ ДЛЯ СИСТЕМНИХ ВИМОГ =====
    const animateCircleCharts = () => {
        const charts = document.querySelectorAll('.circle-chart');
        
        charts.forEach(chart => {
            const percentage = chart.getAttribute('data-percentage');
            const circle = chart.querySelector('.circle-chart-circle');
            
            // Встановлюємо CSS-змінну для conic-gradient
            circle.style.setProperty('--chart-percentage', `${percentage}%`);
        });
    };
    
    // Запускаємо анімацію кругових діаграм
    animateCircleCharts();

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
        
        // Перевіряємо чи елементи прогрес-барів існують на сторінці
        if (ratingBars.length === 0) return;
        
        // Коли прогрес-бари стають видимими, запускаємо анімацію
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    // Отримуємо ширину з inline стилю (width: XX%)
                    const widthValue = bar.style.width;
                    
                    // Спочатку встановлюємо ширину 0 для запуску анімації
                    bar.style.width = '0%';
                    
                    // Додаємо невелику затримку для кращого візуального ефекту
                    setTimeout(() => {
                        // Відновлюємо оригінальну ширину для анімації
                        bar.style.width = widthValue;
                    }, 300);
                    
                    // Припиняємо спостереження після першої анімації
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.2 }); // Запускаємо коли 20% елемента видно
        
        // Спостерігаємо за всіма прогрес-барами
        ratingBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Запускаємо анімацію прогрес-барів
    animateRatingBars();
    
    // Повторно запускаємо анімацію при зміні розміру вікна
    window.addEventListener('resize', animateRatingBars);

    // Анімація рядків таблиці порівняння функцій
    function animateComparisonTable() {
        const tableRows = document.querySelectorAll('.comparison-table tbody tr');
        
        // Перевіряємо чи елементи таблиці існують на сторінці
        if (tableRows.length === 0) return;
        
        // Ховаємо всі рядки на початку
        tableRows.forEach((row, index) => {
            row.style.opacity = "0";
            row.style.transform = "translateY(20px)";
            row.style.transition = `all 0.5s ease ${index * 0.1}s`;
        });
        
        // Коли таблиця стає видимою, запускаємо анімацію рядків
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const table = entry.target;
                    const rows = table.querySelectorAll('tbody tr');
                    
                    rows.forEach(row => {
                        row.style.opacity = "1";
                        row.style.transform = "translateY(0)";
                    });
                    
                    // Припиняємо спостереження після анімації
                    observer.unobserve(table);
                }
            });
        }, { threshold: 0.1 }); // Запускаємо коли 10% таблиці видно
        
        // Спостерігаємо за таблицею
        const table = document.querySelector('.comparison-table');
        if (table) {
            observer.observe(table);
        }
        
        // Додаємо ефект при наведенні на клітинки таблиці
        const tableCells = document.querySelectorAll('.win10-feature, .win11-feature');
        tableCells.forEach(cell => {
            cell.addEventListener('mouseenter', function() {
                this.style.transform = "scale(1.02)";
                this.style.transition = "transform 0.2s ease";
                this.style.zIndex = "2";
            });
            
            cell.addEventListener('mouseleave', function() {
                this.style.transform = "scale(1)";
                this.style.zIndex = "1";
            });
        });
    }

    // Запускаємо анімацію таблиці порівняння
    animateComparisonTable();
});



// Приклад: Проста анімація фону (зміна градієнту) - може бути ресурсомісткою

const header = document.querySelector('.header');
let hue = 195; // Початковий відтінок (близько синього)

function animateBackground() {
    if (!header) return; // Перевірка, чи існує елемент

    hue = (hue + 0.05) % 360; // Дуже повільно змінюємо відтінок

    // Оновлюємо лише частину стилю, що стосується градієнту
    const gradient = `linear-gradient(135deg, hsla(${hue}, 70%, 50%, 0.8), hsla(${hue + 40}, 70%, 30%, 0.9))`;

    // Перевіряємо, чи є фонове зображення, щоб не перезаписати його
    const currentBg = window.getComputedStyle(header).backgroundImage;
    if (currentBg && currentBg !== 'none' && currentBg.includes('url')) {
         // Якщо є зображення, додаємо градієнт перед ним
        header.style.backgroundImage = `${gradient}, ${currentBg.substring(currentBg.indexOf('url'))}`;
    } else {
        // Якщо немає зображення, просто встановлюємо градієнт
        header.style.backgroundImage = gradient;
    }

    requestAnimationFrame(animateBackground);
}

// Запускати тільки якщо користувач не проти анімації і є фон
// Перевірка на налаштування доступності користувача
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (header && !prefersReducedMotion.matches) {
    // requestAnimationFrame(animateBackground); // Розкоментуйте для запуску анімації градієнту
}


// Інші складні анімації (частинки, паралакс) краще реалізовувати
// за допомогою спеціалізованих бібліотек (particles.js, rellax.js, GSAP)
// для кращої продуктивності та гнучкості.

