// window.scroll(0, 0);

// const header = document.getElementById('header-student')
// const sub_header = document.getElementById('sub-header')
// const imgDiv = header.querySelector('.img')
// const h1 = imgDiv.querySelector('.student-name')
// const imgport_btn = imgDiv.querySelector('.imgport-btn')
// const handleScroll = () => {
//     if (window.scrollY > 0) {
//         header.classList.add('fixed')
//         sub_header.classList.add('fixed-header')

//         h1.style.display = 'none';
//         imgport_btn && (imgport_btn.style.display = 'none')

//     } else {
//         header.classList.remove('fixed')
//         sub_header.classList.remove('fixed-header')
//         // const imgDiv = header.querySelector('.img')
//         // const h1 = imgDiv.querySelector('.student-name')
//         // const imgport_btn = imgDiv.querySelector('.imgport-btn')
//         h1.style.display = 'block';
//         imgport_btn && (imgport_btn.style.display = 'flex')
//     }
// };

// window.addEventListener("scroll", handleScroll);

// const sidebar = document.querySelector('.sidebar');
// if (window.innerWidth > 600) {
//     sidebar.classList.remove('d-none')
// }
// function showSidebar() {
//     sidebar.classList.toggle('d-block')
// }






// const change_lang = document.getElementById('change-lang')
// change_lang.addEventListener('click', () => {
//     change_lang.classList.toggle('changing')
// })









// const target = document.querySelector('#search-universities');
// const searchDiv = document.querySelector('#searchDiv');

// function handleIntersection(entries, observer) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             // console.log('Element is in the viewport!');
//             searchDiv.style.top = '113px'
//         }
//     });
// }

// const options = {
//     root: null,
//     rootMargin: '0px',
//     threshold: 0.5,
// };

// const observer = new IntersectionObserver(handleIntersection, options);
// target && observer.observe(target);
