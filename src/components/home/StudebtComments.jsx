import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Slider from "react-slick";
import { Link, animateScroll as scroll } from "react-scroll";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';



const StudebtComments = () => {
    const [getCard, setGetCard] = useState([])
    const lang = localStorage.getItem('i18nextLng');
    const { t } = useTranslation();

    const fetchCard = async () => {
        try {
            const res = await axios.get("https://backend.edugately.com/api/v1/company/review/", {
                headers: {
                    "Accept-Language": lang
                }
            });
            const { status, data } = res;
            if (status === 200) {
                const { results } = data;
                setGetCard(results);
            }
        } catch (error) {
            ;
        }
    };

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        responsive: [
            {
                breakpoint: 2520,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1450,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            //   {
            //     breakpoint: 1200,
            //     settings: {
            //       slidesToShow: 2,
            //       slidesToScroll: 1
            //     }
            //   },
            // {
            //   breakpoint: 776,
            //   settings: {
            //     slidesToShow: 1,
            //     slidesToScroll: 1,
            //     infinite: true,
            //     dots: true
            //   }
            // }
        ]

    };

    useEffect(() => {
        fetchCard()
    }, [])
    useEffect(() => {
        fetchCard()
    }, [lang])

    return (
        <div className='container-fluid max-width px-6 oldd'>
            <div className='row'>
                <div className="col-12">
                    <h1 className='text-pr section_title'>
                        {t("part29")}
                    </h1>
                </div>
            </div>
            <div className="row stdComment">
                <Slider {...settings}>
                    {
                        getCard?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="col  px-lg-4 mb-5 cardbox">
                                        <BlogCard item={item} lang={lang} />
                                        {/* <div className="card1 border-0">
                                            <div className="card-front w-100 h-100">
                                                <div className="card border-0">
                                                    <div className="card-header border-0 p-0">
                                                        <img className='comment_img' src={item?.image} alt="" />
                                                    </div>
                                                    <div className="card-body">
                                                        <p>{lang === 'uz' ? item?.applicant_name_uz : lang === 'ru' ? item?.applicant_name_ru : lang === 'en' ? item?.applicant_name_en : item?.applicant_name}</p>
                                                        <h2>{lang === 'uz' ? item?.university_uz : lang === 'ru' ? item?.university_ru : lang === 'en' ? item?.university_en : item?.university}</h2>


                                                    </div>
                                                    <div className="card-footer border-0 pb-lg-4">
                                                        <p className='mt-lg-4'>
                                                            <svg className='me-2' width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M20.2883 2.33443C19.6013 2.21611 18.9057 2.1552 18.2087 2.15235C15.8304 2.1504 13.5018 2.83236 11.5003 4.11693C9.49374 2.84922 7.16547 2.184 4.79201 2.20026C4.09497 2.20312 3.39937 2.26403 2.71243 2.38235C2.48742 2.42114 2.28365 2.539 2.13782 2.71469C1.992 2.89039 1.91369 3.11238 1.91701 3.34068V14.8407C1.91496 14.9815 1.94397 15.121 2.00197 15.2494C2.05997 15.3777 2.14554 15.4916 2.25259 15.5831C2.35965 15.6746 2.48555 15.7414 2.62134 15.7787C2.75714 15.816 2.89949 15.823 3.03826 15.799C4.41157 15.5612 5.81858 15.6007 7.17641 15.915C8.53424 16.2294 9.81543 16.8123 10.9445 17.6294L11.0595 17.6965H11.1649C11.2712 17.7408 11.3852 17.7636 11.5003 17.7636C11.6155 17.7636 11.7295 17.7408 11.8358 17.6965H11.9412L12.0562 17.6294C13.1774 16.794 14.4549 16.1923 15.813 15.8597C17.1711 15.5272 18.5821 15.4707 19.9624 15.6936C20.1012 15.7176 20.2436 15.7106 20.3793 15.6733C20.5151 15.636 20.641 15.5692 20.7481 15.4777C20.8551 15.3862 20.9407 15.2723 20.9987 15.1439C21.0567 15.0156 21.0857 14.8761 21.0837 14.7353V3.23526C21.0737 3.01691 20.9894 2.80853 20.8447 2.64468C20.7 2.48083 20.5037 2.37136 20.2883 2.33443ZM10.542 15.0707C8.76898 14.1379 6.79543 13.6511 4.79201 13.6523C4.47576 13.6523 4.15951 13.6523 3.83368 13.6523V4.06901C4.15286 4.05062 4.47283 4.05062 4.79201 4.06901C6.83651 4.06676 8.83638 4.66672 10.542 5.79401V15.0707ZM19.167 13.6907C18.8412 13.6907 18.5249 13.6907 18.2087 13.6907C16.2053 13.6894 14.2317 14.1763 12.4587 15.109V5.79401C14.1643 4.66672 16.1642 4.06676 18.2087 4.06901C18.5279 4.05062 18.8478 4.05062 19.167 4.06901V13.6907ZM20.2883 17.6678C19.6013 17.5494 18.9057 17.4885 18.2087 17.4857C15.8304 17.4837 13.5018 18.1657 11.5003 19.4503C9.49888 18.1657 7.17025 17.4837 4.79201 17.4857C4.09497 17.4885 3.39937 17.5494 2.71243 17.6678C2.58768 17.6876 2.46808 17.7318 2.36049 17.798C2.25291 17.8642 2.15947 17.951 2.08555 18.0534C2.01163 18.1558 1.95869 18.2718 1.92976 18.3948C1.90084 18.5178 1.8965 18.6452 1.91701 18.7698C1.96571 19.0187 2.11107 19.2381 2.32123 19.38C2.53139 19.5219 2.78923 19.5748 3.03826 19.5269C4.41157 19.2892 5.81858 19.3286 7.17641 19.643C8.53424 19.9573 9.81543 20.5402 10.9445 21.3573C11.1068 21.4729 11.3011 21.535 11.5003 21.535C11.6996 21.535 11.8939 21.4729 12.0562 21.3573C13.1853 20.5402 14.4665 19.9573 15.8243 19.643C17.1821 19.3286 18.5891 19.2892 19.9624 19.5269C20.2115 19.5748 20.4693 19.5219 20.6795 19.38C20.8896 19.2381 21.035 19.0187 21.0837 18.7698C21.1042 18.6452 21.0999 18.5178 21.0709 18.3948C21.042 18.2718 20.9891 18.1558 20.9151 18.0534C20.8412 17.951 20.7478 17.8642 20.6402 17.798C20.5326 17.7318 20.413 17.6876 20.2883 17.6678V17.6678Z" fill="#3772FF" />
                                                            </svg>
                                                            {lang === 'uz' ? item?.major_uz : lang === 'ru' ? item?.major_ru : lang === 'en' ? item?.major_en : item?.major}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-back px-2 w-100 h-100">
                                                <div className="card border-0">
                                                    <h2 className=''>
                                                        {
                                                            lang === 'uz' ? item?.comment_uz : lang === 'ru' ? item?.comment_ru : lang === 'en' ? item?.comment_en : item?.comment
                                                        }
                                                    </h2>
                                                    <p className='mt-4 text-start'>
                                                        Faculty: {lang === 'uz' ? item?.major_uz : lang === 'ru' ? item?.major_ru : lang === 'en' ? item?.major_en : item?.major}
                                                    </p>
                                                    <p className=' text-start'>University: {lang === 'uz' ? item?.university_uz : lang === 'ru' ? item?.university_ru : lang === 'en' ? item?.university_en : item?.university}</p>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
            <div className="row">
                <NavLink to={'login'} className="btn-header">
                    {t('header3')}
                </NavLink>
            </div>
        </div>
    )
}

export default StudebtComments

class BlogCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { flipped: false };
        this.flip = this.flip.bind(this);
    }

    flip = () => {
        this.setState({ flipped: !this.state.flipped });
    }
    render() {

        return (

            <div className="page-container">
                <div onMouseEnter={this.flip} onMouseLeave={this.flip} className={"card-container" + (this.state.flipped ? " flipped" : "")}>

                    <div className="front">
                        <div className="card h-100 border-0">
                            <div className="card-header bg-white border-0 p-0">
                                <img className='comment_img' src={this.props.item?.image} alt="" />
                            </div>
                            <div className="card-body  p-0">
                                <p>{this.props.lang === 'uz' ? this.props.item?.applicant_name_uz : this.props.lang === 'ru' ? this.props.item?.applicant_name_ru : this.props.lang === 'en' ? this.props.item?.applicant_name_en : this.props.item?.applicant_name}</p>
                                <h2>{this.props.lang === 'uz' ? this.props.item?.university_uz : this.props.lang === 'ru' ? this.props.item?.university_ru : this.props.lang === 'en' ? this.props.item?.university_en : this.props.item?.university}</h2>


                            </div>
                            <div className="card-footer p-0 bg-white border-0">
                                <p className='mt-lg-4 pb-3'>
                                    <svg className='me-2' width="23" height="24" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.2883 2.33443C19.6013 2.21611 18.9057 2.1552 18.2087 2.15235C15.8304 2.1504 13.5018 2.83236 11.5003 4.11693C9.49374 2.84922 7.16547 2.184 4.79201 2.20026C4.09497 2.20312 3.39937 2.26403 2.71243 2.38235C2.48742 2.42114 2.28365 2.539 2.13782 2.71469C1.992 2.89039 1.91369 3.11238 1.91701 3.34068V14.8407C1.91496 14.9815 1.94397 15.121 2.00197 15.2494C2.05997 15.3777 2.14554 15.4916 2.25259 15.5831C2.35965 15.6746 2.48555 15.7414 2.62134 15.7787C2.75714 15.816 2.89949 15.823 3.03826 15.799C4.41157 15.5612 5.81858 15.6007 7.17641 15.915C8.53424 16.2294 9.81543 16.8123 10.9445 17.6294L11.0595 17.6965H11.1649C11.2712 17.7408 11.3852 17.7636 11.5003 17.7636C11.6155 17.7636 11.7295 17.7408 11.8358 17.6965H11.9412L12.0562 17.6294C13.1774 16.794 14.4549 16.1923 15.813 15.8597C17.1711 15.5272 18.5821 15.4707 19.9624 15.6936C20.1012 15.7176 20.2436 15.7106 20.3793 15.6733C20.5151 15.636 20.641 15.5692 20.7481 15.4777C20.8551 15.3862 20.9407 15.2723 20.9987 15.1439C21.0567 15.0156 21.0857 14.8761 21.0837 14.7353V3.23526C21.0737 3.01691 20.9894 2.80853 20.8447 2.64468C20.7 2.48083 20.5037 2.37136 20.2883 2.33443ZM10.542 15.0707C8.76898 14.1379 6.79543 13.6511 4.79201 13.6523C4.47576 13.6523 4.15951 13.6523 3.83368 13.6523V4.06901C4.15286 4.05062 4.47283 4.05062 4.79201 4.06901C6.83651 4.06676 8.83638 4.66672 10.542 5.79401V15.0707ZM19.167 13.6907C18.8412 13.6907 18.5249 13.6907 18.2087 13.6907C16.2053 13.6894 14.2317 14.1763 12.4587 15.109V5.79401C14.1643 4.66672 16.1642 4.06676 18.2087 4.06901C18.5279 4.05062 18.8478 4.05062 19.167 4.06901V13.6907ZM20.2883 17.6678C19.6013 17.5494 18.9057 17.4885 18.2087 17.4857C15.8304 17.4837 13.5018 18.1657 11.5003 19.4503C9.49888 18.1657 7.17025 17.4837 4.79201 17.4857C4.09497 17.4885 3.39937 17.5494 2.71243 17.6678C2.58768 17.6876 2.46808 17.7318 2.36049 17.798C2.25291 17.8642 2.15947 17.951 2.08555 18.0534C2.01163 18.1558 1.95869 18.2718 1.92976 18.3948C1.90084 18.5178 1.8965 18.6452 1.91701 18.7698C1.96571 19.0187 2.11107 19.2381 2.32123 19.38C2.53139 19.5219 2.78923 19.5748 3.03826 19.5269C4.41157 19.2892 5.81858 19.3286 7.17641 19.643C8.53424 19.9573 9.81543 20.5402 10.9445 21.3573C11.1068 21.4729 11.3011 21.535 11.5003 21.535C11.6996 21.535 11.8939 21.4729 12.0562 21.3573C13.1853 20.5402 14.4665 19.9573 15.8243 19.643C17.1821 19.3286 18.5891 19.2892 19.9624 19.5269C20.2115 19.5748 20.4693 19.5219 20.6795 19.38C20.8896 19.2381 21.035 19.0187 21.0837 18.7698C21.1042 18.6452 21.0999 18.5178 21.0709 18.3948C21.042 18.2718 20.9891 18.1558 20.9151 18.0534C20.8412 17.951 20.7478 17.8642 20.6402 17.798C20.5326 17.7318 20.413 17.6876 20.2883 17.6678V17.6678Z" fill="#3772FF" />
                                    </svg>
                                    {this.props.lang === 'uz' ? this.props.item?.major_uz : this.props.lang === 'ru' ? this.props.item?.major_ru : this.props.lang === 'en' ? this.props.item?.major_en : this.props.item?.major}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="back">
                        <div className="card p-0 border-0">
                            <h2 className='commentss'>
                                {
                                    this.props.lang === 'uz' ? this.props.item?.comment_uz : this.props.lang === 'ru' ? this.props.item?.comment_ru : this.props.lang === 'en' ? this.props.item?.comment_en : this.props.item?.comment
                                }
                            </h2>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class Front extends React.Component {
    render() {
        return (
            <div className="front">
                <ImageArea />
                <MainArea />
            </div>
        )
    }
}

class Back extends React.Component {
    render() {
        return (
            <div className="back">
                <p>Some sample text to demonstrate how these cards will work, including how they truncate long sentences. This section displays the full-length blog post.</p>
                <p>Bloggity bloggity bloggity blog. This would be the full text of the abbreviated blog post.</p>
            </div>
        )
    }
}

class ImageArea extends React.Component {
    render() {
        return (
            <div className="image-container">
                <img className="card-image" src="https://78.media.tumblr.com/d98fb931adb117c70f0dbced9e947520/tumblr_pe582mbWip1tlgv32o1_1280.png"></img>
                <h1 className="title">An example blog post</h1>
            </div>
        )
    }

}

class MainArea extends React.Component {
    render() {
        return (
            <div className="main-area">
                <div className="blog-post">
                    <p className="date">{new Date().toLocaleDateString()}</p>
                    <p className="blog-content">
                        Some sample text to demonstrate how these cards will work, including how they truncate long sentences.
                    </p>
                    <p className="read-more">Hover to read more...</p>

                </div>

            </div>
        )
    }
}