import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateLanguageAction } from "../../../store/actions/langAction";



export default function Headerst({first_name}) {

    const { t, i18n } = useTranslation();
    window.scroll(0, 0);

    // State variables
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isLangChanging, setIsLangChanging] = useState(false);

    // Effect for handling scroll
    useEffect(() => {
        const handleScroll = () => {
            const header = document.getElementById('header-student');
            const sub_header = document.getElementById('sub-header');
            const imgDiv = header.querySelector('.img');
            const h1 = imgDiv.querySelector('.student-name');
            const imgport_btn = imgDiv.querySelector('.imgport-btn');

            if (window.scrollY > 0) {
                header.classList.add('fixed');
                sub_header.classList.add('fixed-header');
                h1.style.display = 'none';
                imgport_btn && (imgport_btn.style.display = 'none');
            } else {
                header.classList.remove('fixed');
                sub_header.classList.remove('fixed-header');
                h1.style.display = 'block';
                imgport_btn && (imgport_btn.style.display = 'flex');
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Effect for showing sidebar
    useEffect(() => {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth > 600) {
            sidebar.classList.remove('d-none');
        }
    }, []);

    // Function to toggle sidebar
    const showSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Function to toggle language change
    const handleLangChange = () => {
        setIsLangChanging(!isLangChanging);
    };

    // Effect for handling intersection
    useEffect(() => {
        const target = document.querySelector('#search-universities');
        const searchDiv = document.querySelector('#searchDiv');

        const handleIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    searchDiv.style.top = '113px';
                }
            });
        };

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver(handleIntersection, options);
        target && observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, []);

    const dispatch = useDispatch()

    const changeLanguage = (e) => {
        const languageValue = e;
        dispatch(updateLanguageAction({ languageValue }))
        i18n.changeLanguage(languageValue);
    };


    return (
        
            <div className="header" id="header-student">
                <div className="text">
                    <h1>{t("part6")}</h1>
                </div>
                <div className="img">
                    <img src={process.env.PUBLIC_URL + '/assets/studenticon.jpg'} alt="studentImg" />
                    <h1 className="student-name">{first_name}</h1>
                </div>
                <div className="change-lang">
                    <button className="language" onClick={() => changeLanguage('uz')} value="uz">
                        <span >Uz</span>
                        <div className="ms-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width={7} height={12} viewBox="0 0 7 12" fill="none">
                                <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>
                    <button className="language" onClick={() => changeLanguage('ru')} value="ru">
                        <span>Ru</span>
                        <div className="ms-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width={7} height={12} viewBox="0 0 7 12" fill="none">
                                <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>
                    <button className="language" onClick={() => changeLanguage('en')} value="en">
                        <span>En</span>
                        <div className="ms-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width={7} height={12} viewBox="0 0 7 12" fill="none">
                                <path d="M1 1L6 6L1 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </button>
                </div>
            </div>
      
    );
}

