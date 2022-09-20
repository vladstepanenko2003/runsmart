const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    nav: false, 
    controls: false
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});

$(document).ready(function(){

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {  //функция будет выполняться для каждого элемента с классом catalog-item__link
            $(this).on('click', function(e) {  //при клике на один из элементов с классом catalog-item__link будет выполняться функция
                e.preventDefault();  //говорим браузеру, что мы изменяем его дефолтное поведение
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');  //если у элемента есть данный класс, то он убирается,
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');        //а если нету, то, наоборот, добавляется
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__list');

    $('[data-modal="consultation"]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

    $('.catalog-item__btn').each(function(i){
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__title').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                tel: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа")
                },
                tel: "Пожалуйста, введите ваш номер телефона",
                email: {
                    required: "Пожалуйста введите вашу почту",
                    email: "Неправильно набран адрес почты"
                }
            }
        });
    };

    validateForms('#consultation form');
    validateForms('#order form');
    validateForms('#main-form');

    $("input[name=tel]").mask("+7 (999) 999-9999");

    $('form').submit(function(e) {  //для всех форм вызываем функцию
        e.preventDefault(); //предупреждаем браузер о том, что будем менять его поведение
        if (!$(this).valid()) {
            return;  //если форма не прошла валидацию, то функция не будет выполняться дальше
        };
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()  //с помощью ajax отправляем форму
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset'); //сбрасываем форму
        });
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1300) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    // $("a[href^='#']").click(function() { //мы получаем ссылку, у которой есть атрибут href и он начинается с #
    //     var _href = $(this).attr('href');
    //     $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    //     return false;
    // });

    // $(".pageup").on('click', function(event) {

    //     // Make sure this.hash has a value before overriding default behavior
    //     if (this.hash !== "") {
    //       // Prevent default anchor click behavior
    //       event.preventDefault();
    
    //       // Store hash
    //       var hash = this.hash;
    
    //       // Using jQuery's animate() method to add smooth page scroll
    //       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    //       $('html, body').animate({
    //         scrollTop: $(hash).offset().top
    //       }, 10, function(){
    
    //         // Add hash (#) to URL when done scrolling (default click behavior)
    //         window.location.hash = hash;
    //       });
    //     } // End if
    // });

});