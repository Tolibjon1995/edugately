import React from 'react';
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
import  Carousel  from '3d-react-carousal';
// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// import './styles.css';

// import required modules
// import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
const Carusel = () => {
    return (
        <div className='container-fluid max-width px-6 carus'>
            <div className='row'>
                <div className="col-12">
                    <h1 className='text-pr section_title'>
                        Our goals in numbers
                    </h1>
                </div>
                <div className="col-12">
                    <App />
                </div>
            </div>
        </div>
    )
}

export default Carusel


function App() {
    let slides = [
        <img src="https://picsum.photos/800/300/?random" alt="1" />,
        <img src="https://picsum.photos/800/301/?random" alt="2" />,
        <img src="https://picsum.photos/800/302/?random" alt="3" />,
        <img src="https://picsum.photos/800/303/?random" alt="4" />,
        <img src="https://picsum.photos/800/304/?random" alt="5" />];
    return (
        <>
            <Carousel slides={slides} autoplay={true} interval={3000} />
        </>
    );
}
