// $(document).ready(function(){
//     $('.carousel__inner').slick({
//         speed: 1000,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left_arrow.png"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right_arrow.png"></button>',
//         adaptiveHeight: true,
//         responsive: [
//             {
//               breakpoint: 992,
//               settings: {
//                 arrows: false,
//                 dots: true
//               }
//             }
//         ]
//     });
//   });

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