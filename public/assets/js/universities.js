// window.scroll(0, 0);
// const sticky_bar = document.querySelector('.sticky-bar')
const go_top = document.querySelector('.go-top')

// window.scrollY > 0 ? sticky_bar.classList.add('stick') : sticky_bar.classList.remove('stick')
const handleScroll = () => {
    // window.scrollY > 0 ? sticky_bar.classList.add('stick') : sticky_bar.classList.remove('stick')
    if (go_top) window.scrollY > 500 ? go_top.classList.add('d-block') : go_top.classList.remove('d-block')

};

window.addEventListener("scroll", handleScroll);



const offcanvas_mobile_menu = document.getElementById('offcanvas-mobile-menu')
function showSideBar() {
    offcanvas_mobile_menu.classList.toggle('active')
}

function goTop() {
    window.scroll(0, 0);
}




const target = document.querySelector('#search-universities');
const searchDiv = document.querySelector('#searchDiv');

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // console.log('Element is in the viewport!');
            searchDiv.style.top = '0'
        }
    });
}

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
};

const observer = new IntersectionObserver(handleIntersection, options);
target && observer.observe(target);
