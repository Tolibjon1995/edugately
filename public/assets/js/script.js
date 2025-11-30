var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 2
        },
        500: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 3
        },
        1124: {
            slidesPerView: 4
        }
    },
    initialSlide: 0,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },
});



var swiper = new Swiper(".mySwiper2", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 4,
        slideShadows: true
    },
    initialSlide: 0,
    loop: true,
    autoplay: {
        delay: 1500,
        disableOnInteraction: false,
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    keyboard: {
        enabled: true
    },
    // mousewheel: {
    //     thresholdDelta: 70
    // },
    breakpoints: {
        0: {
            slidesPerView: 1.2
        },
        768: {
            slidesPerView: 1.2
        },
        1024: {
            slidesPerView: 1.2
        }
    }
});

// window.scroll(0, 0);


window.onload = () => {
    window.scroll(0, 0);
};
// window.onload = () => {
//     window.scroll(0, document.documentElement.scrollHeight);
// };

// const sticky_bar = document.querySelector('.sticky-bar')
const go_top = document.querySelector('.go-top')
const handleScroll = () => {
    // window.scrollY > 0 ? sticky_bar.classList.add('stick') : sticky_bar.classList.remove('stick')
    window.scrollY > window.innerHeight ? go_top.classList.add('d-block') : go_top.classList.remove('d-block')
    // console.log(window.innerHeight);
    // console.log(window.scrollY);
};

window.addEventListener("scroll", handleScroll);



// const offcanvas_mobile_menu = document.getElementById('offcanvas-mobile-menu')

// function showSideBar() {
//     offcanvas_mobile_menu.classList.toggle('active')
// }
function goTop() {
    window.scroll(0, 0);

}

