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
});