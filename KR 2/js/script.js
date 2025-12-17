$(document).ready(function() {
    
    // 1. Плавний перехід сторінок
    $('body').removeClass('fade-out');
    $('a').on('click', function(e) {
        if (this.hash !== "" && this.getAttribute('href').startsWith('#')) return;
        if (this.getAttribute('href').indexOf('.html') !== -1) {
            e.preventDefault();
            var newLocation = this.getAttribute('href');
            $('body').addClass('fade-out');
            setTimeout(function() { window.location = newLocation; }, 400);
        }
    });

    // 2. Темна тема (ЗА ЗАМОВЧУВАННЯМ)
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    // Перевіряємо пам'ять: якщо там пусто, ставимо 'dark', інакше беремо те, що збережено
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';

    // Застосовуємо тему одразу при завантаженні
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Якщо тема темна - вмикаємо перемикач (ставимо галочку)
    if (currentTheme === 'dark' && toggleSwitch) {
        toggleSwitch.checked = true;
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }
    if(toggleSwitch) toggleSwitch.addEventListener('change', switchTheme, false);

    // 3. Мобільне меню
    $('.mobile-menu-btn').click(function() { $('.main-nav').slideToggle(); });

    // 4. Модальні вікна (КЛІК ПО ВСІЙ КАРТЦІ)
    $('.plant-card').click(function() {
        let title = $(this).find('h3').text();
        let desc = $(this).data('desc');
        // Отримуємо дані
        let engine = $(this).data('engine'); 
        let transmission = $(this).data('transmission'); 
        
        $('#modalTitle').text(title);
        $('#modalDesc').text(desc);
        $('#modalEngine').text(engine);
        $('#modalTransmission').text(transmission);
        
        $('#plantModal').fadeIn().css('display', 'flex');
    });

    // Закриття на хрестик
    $('.close-modal').click(function() { $('#plantModal').fadeOut(); });

    // Закриття при кліку на темний фон
    $('#plantModal').click(function(e) {
        if (e.target === this) {
            $(this).fadeOut();
        }
    });

    // 5. Фільтрація
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        const category = $(this).data('filter');
        if (category === 'all') $('.plant-card').fadeIn();
        else {
            $('.plant-card').hide();
            $('.plant-card[data-category="' + category + '"]').fadeIn();
        }
    });

    // 6. FAQ
    $('.faq-question').click(function() {
        $(this).next('.faq-answer').slideToggle();
        $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
    });

    // 7. Слайдери
    let mainIndex = 0;
    const mainSlides = $('.main-slide');
    function showMainSlides() {
        if (mainSlides.length === 0) return;
        mainSlides.removeClass('active');
        mainIndex++;
        if (mainIndex > mainSlides.length) {mainIndex = 1}
        $(mainSlides[mainIndex-1]).addClass('active');
        setTimeout(showMainSlides, 4000);
    }
    showMainSlides();

    let miniIndex = 1;
    const miniSlides = $('.mini-slide');
    function showMiniSlide(n) {
        if (miniSlides.length === 0) return;
        if (n > miniSlides.length) miniIndex = 1;
        if (n < 1) miniIndex = miniSlides.length;
        
        miniSlides.removeClass('active');
        $(miniSlides[miniIndex-1]).addClass('active');
    }
    $('.next-btn').click(function() { showMiniSlide(miniIndex += 1); });
    $('.prev-btn').click(function() { showMiniSlide(miniIndex -= 1); });
    showMiniSlide(miniIndex);

    // 8. Lightbox
    $('.main-slide, .mini-slide').click(function() {
        var src = $(this).attr('src');
        $('#lightbox-img').attr('src', src);
        $('#lightbox').fadeIn();
    });
    $('.close-lightbox, #lightbox').click(function(e) {
        if (e.target.id === 'lightbox' || e.target.classList.contains('close-lightbox')) {
            $('#lightbox').fadeOut();
        }
    });

    // 9. Scroll Effects
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        $('.reveal').each(function() {
            var top = $(this).offset().top;
            if (scroll + $(window).height() > top + 50) {
                $(this).addClass('active');
            }
        });
        if (scroll > 300) { $('#scrollToTop').fadeIn(); } else { $('#scrollToTop').fadeOut(); }
    });
    
    $(window).trigger('scroll');
    $('#scrollToTop').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });
});