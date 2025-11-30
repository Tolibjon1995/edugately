import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import "../../../i18n";
import { NavLink } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
// import css
import "../../../style/css/Navbar.css";
import "../../../assets/scss/style.css";
// import Icon
import search_icon from "../../../assets/icon/searchIcon.svg";
// import { updateLanguageAction } from "../../../store/actions/langAction";
import ru from "../../lang/ru";
import us from "../../lang/en";
import uz from "../../lang/uz";
import { UPDATE_LANGUAGE } from "../../../store/actionTypes";
import { updateLanguageAction } from "../../../store/actions/langAction";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import img33 from '../../../assets/studentImgs/Education(1).png'


const Navbar = ({ status }) => {
    const { t, i18n } = useTranslation();

    const { pathname } = useLocation();

    const dispatch = useDispatch()

    const changeLanguage = (e) => {
        const languageValue = e;
        dispatch(updateLanguageAction({ languageValue }))
        i18n.changeLanguage(languageValue);
    };

    const selector = useSelector((state) => state);
    const { payload } = selector.payload;
    const currentRole = payload?.role;
    const currentPath = window.location.pathname;
    const [burger, setBurger] = useState(false);
    const [scrollTop, setScrollTop] = useState(0);
    const [navActive, setnavActive] = useState(false);

    useEffect(() => {
        const onScroll = (e) => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);

    const handleout = () => {
        setnavActive(true);
        setBurger(false);
    };

    let button;
    if (currentPath === "/") {
        button = (
            // <Link
            //   to="/"
            //   spy={true}
            //   offset={0}
            //   duration={700}
            //   style={{ cursor: "pointer" }}
            // >
            //   {t("part1")}
            // </Link>
            <NavLink
                onClick={handleout}
                activeClass={navActive ? "active" : null}
                to="/"
            >
                {t("part1")}
            </NavLink>
        );
    } else {
        button = (
            <NavLink
                onClick={handleout}
                activeClass={navActive ? "active" : null}
                to="/"
            >
                {t("part1")}
            </NavLink>
        );
    }

    let howItWork;
    if (pathname === "/") {
        howItWork = (
            <Link
                onClick={handleout}
                to="unversity"
                spy={true}
                offset={-60}
                duration={700}
                style={{ cursor: "pointer" }}
            >
                {t("part28")}
            </Link>
        );
    } else {
        howItWork = (
            <NavLink
                onClick={handleout}
                to="/"
                spy={true}
                offset={-60}
                duration={700}
                style={{ cursor: "pointer" }}
            >
                {t("part28")}
            </NavLink>
        );
    }
    let universitet;
    if (currentPath === "/") {
        universitet = (
            <NavLink
                onClick={handleout}
                activeClass={navActive ? "active" : null}
                to="unverlist"
                spy={true}
                offset={-60}
                duration={700}
            >
                {t("part3")}
            </NavLink>
        );
    } else {
        universitet = null;
    }

    const goTop = () => {
        window.scrollTo(0, 0);
        console.log('top');
    };

    const handleScroll = () => {
        const goTopButton = document.querySelector('.go-top');
        if (window.scrollY > window.innerHeight) {
            goTopButton.classList.add('d-block');
        } else {
            goTopButton.classList.remove('d-block');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        window.scrollTo(0, 0); // Scroll to top on page load
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const showSideBar = () => {
        const offcanvasMobileMenu = document.getElementById('offcanvas-mobile-menu');
        console.log('salom');
        if (offcanvasMobileMenu) {
            console.log(offcanvasMobileMenu);
            offcanvasMobileMenu.classList.toggle('active');
        }
    };

    return (
        <>



            <div className="go-top oldd" onClick={() => goTop()}>
                <svg xmlns="http://www.w3.org/2000/svg" width={47} height={48} viewBox="0 0 47 48" fill="none">
                    <ellipse cx="23.5" cy="23.5323" rx="23.5" ry="23.5323" fill="#015EDF" />
                    <path d="M16 24.0605L23.05 17.0009L30.1 24.0605" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <header className="header-area clearfix oldd">
                <div className="header-top-area d-none d-lg-block">
                    <div className="container-fluid px-6 max-width">
                        <div className="header-top-wap">
                            <div className="d-flex align-items-center">
                                <div className="header-offer">
                                    <a href="tel:+998555061011" className="nav-link">
                                        <span className="me-3">
                                            <svg width={36} height={36} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 3C21 3 24.3 3.3 28.5 7.5C32.7 11.7 33 15 33 15" stroke="#3772FF" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M21.3105 8.30347C21.3105 8.30347 22.7955 8.72773 25.0229 10.9551C27.2502 13.1825 27.6745 14.6674 27.6745 14.6674" stroke="#3772FF" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M15.0564 7.97426L16.0299 9.71865C16.9085 11.2929 16.5558 13.358 15.1721 14.7417C15.1721 14.7417 15.1721 14.7417 15.1721 14.7417C15.1719 14.7418 13.4938 16.4202 16.5368 19.4632C19.5791 22.5056 21.2575 20.8287 21.2583 20.8279C21.2583 20.8279 21.2583 20.8279 21.2583 20.8279C22.642 19.4442 24.7071 19.0915 26.2814 19.9701L28.0257 20.9436C30.4028 22.2702 30.6836 25.6039 28.5942 27.6933C27.3387 28.9488 25.8006 29.9257 24.1004 29.9902C21.2382 30.0987 16.3774 29.3743 11.5016 24.4984C6.62569 19.6226 5.90132 14.7618 6.00983 11.8996C6.07428 10.1994 7.0512 8.66135 8.30671 7.40585C10.3961 5.31642 13.7298 5.59716 15.0564 7.97426Z" stroke="#3772FF" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg></span>+998 (55) 506 1011</a>
                                </div><span className="mx-4"><svg width={2} height={39} viewBox="0 0 2 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <line x1={1} y1="4.37115e-08" x2="0.999998" y2={39} stroke="#3772FF" strokeWidth={2}>
                                    </line>
                                </svg></span>
                                <div className="header-offer">
                                    <div className="main-menu ">
                                        <nav>
                                            <ul>
                                                <li>
                                                    <NavLink className="fs-7"
                                                        to={
                                                            currentRole
                                                                ? currentRole === "applicant"
                                                                    ? "/my-account"
                                                                    : currentRole === "notary"
                                                                        ? "/n-glavny"
                                                                        : currentRole === "accountant"
                                                                            ? "/accountant-analytics"
                                                                            : currentRole === "director"
                                                                                ? "/home/main"
                                                                                : currentRole === "supermanager"
                                                                                    ? "superManager-analitika"
                                                                                    : currentRole === "university"
                                                                                        ? "/univer-backoffice-page"
                                                                                        : "/login"
                                                                : "/login"
                                                        }
                                                    >{t("part6")}
                                                        <i className="fa fa-angle-down" />
                                                    </NavLink>
                                                    <ul className="mega-menu mega-menu-padding">
                                                        <li>
                                                            <ul>
                                                                <li className="mega-menu-title">
                                                                    <NavLink
                                                                        to={
                                                                            currentRole
                                                                                ? currentRole === "applicant"
                                                                                    ? "/my-account"
                                                                                    : currentRole === "notary"
                                                                                        ? "/n-glavny"
                                                                                        : currentRole === "accountant"
                                                                                            ? "/accountant-analytics"
                                                                                            : currentRole === "director"
                                                                                                ? "/home/main"
                                                                                                : currentRole === "supermanager"
                                                                                                    ? "superManager-analitika"
                                                                                                    : currentRole === "university"
                                                                                                        ? "/univer-backoffice-page"
                                                                                                        : "/login"
                                                                                : "/login"
                                                                        }
                                                                    >
                                                                        {t("part6")}
                                                                    </NavLink>
                                                                </li>
                                                                <li className="mega-menu-title">
                                                                    <NavLink onClick={handleout} to="/registration">
                                                                        {t("part5")}
                                                                    </NavLink>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="language-currency-wrap">
                                <NavLink to="/login" className="btn btn-primary mr-10">{t("p390")}</NavLink>
                                <div className="same-language-currency language-style">
                                    <span className="fs-7 text-dark">{localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'lang'}<i className="fa fa-angle-down" /></span>
                                    <div className="lang-car-dropdown">
                                        <ul>
                                            <li><button onClick={() => changeLanguage('uz')} value="uz">Uz</button></li>
                                            <li><button onClick={() => changeLanguage('ru')} value="ru">Ru</button></li>
                                            <li><button onClick={() => changeLanguage('en')} value="en">En</button></li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky-bar header-res-padding clearfix">
                    <div className="container-fluid px-6 max-width">
                        <div className="row align-items-center d-none d-lg-flex">
                            <div className="col-xl-2 col-lg-2 col-md-6 col-4 mb-4 d-flex align-items-center">
                                <div className="logo"><a href="/"><img alt src="/assets/logo.png" /></a></div><a className="logo" href="/">EDUGATELY</a>
                            </div>
                            <div className="col-xl-8 col-lg-8 d-none d-lg-block header-offer">
                                <div className="main-menu ">
                                    <nav>
                                        <ul>
                                            <li>
                                                <NavLink onClick={handleout} to="/about">
                                                    {t("part24")}
                                                </NavLink>
                                            </li>
                                            <li>{universitet}</li>

                                            {
                                                pathname !== "/" ?
                                                    <li >
                                                        <NavLink onClick={handleout} to="/partners">
                                                            {t("part4")}
                                                        </NavLink>
                                                    </li>
                                                    :
                                                    <li >
                                                        {howItWork}
                                                        <ul className="mega-menu mega-menu-padding lang-car-dropdown">
                                                            <li>
                                                                <ul>
                                                                    <li className="mega-menu-title">
                                                                        {howItWork}
                                                                    </li>
                                                                    <li className="mega-menu-title">
                                                                        <NavLink onClick={handleout} to="/partners">
                                                                            {t("part4")}
                                                                        </NavLink>
                                                                    </li>
                                                                </ul>
                                                            </li>
                                                        </ul>
                                                    </li>
                                            }

                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-6 col-8 mb-4">
                                <div className="header-right-wrap">
                                    <div className="same-style header-search d-none d-lg-block">
                                        <div className="d-flex align-items-center">
                                            {/* <label htmlFor="search" className="search-btn"><svg width={36} height={36} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="17.25" cy="17.25" r="14.25" stroke="#3772FF" strokeWidth="1.5">
                                                </circle>
                                                <path d="M27.75 27.75L33 33" stroke="#3772FF" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            </label>
                                            <input id="search" className="search ms-3" type="text" placeholder="Qidiruv..." /> */}
                                        </div>
                                    </div>
                                    <div className="same-style mobile-off-canvas d-block d-lg-none">
                                        <button className="mobile-aside-button" onClick={() => showSideBar}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={30} height={30} viewBox="0 0 24 24">
                                                <path d="M 0 2 L 0 4 L 24 4 L 24 2 Z M 0 11 L 0 13 L 24 13 L 24 11 Z M 0 20 L 0 22 L 24 22 L 24 20 Z">
                                                </path>
                                            </svg></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center d-flex d-lg-none mobile-header">
                            <div className="col-xl-2 col-lg-2 col-md-4 col-4 mb-3 d-flex align-items-center justify-content-start">
                                <div className="header-right-wrap">
                                    <div className="same-style mobile-off-canvas d-block d-lg-none">
                                        <button type="button" className="mobile-aside-button" onClick={() => { showSideBar() }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 34 34" fill="none">
                                                <path d="M28.3335 9.9165L5.66683 9.9165" stroke="blue" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M28.3335 17L5.66683 17" stroke="blue" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M28.3335 24.0835L5.66683 24.0835" stroke="blue" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-4 col-4 mb-3 d-flex align-items-center justify-content-center">
                                <div>
                                    <a href="#">
                                        <img className="logo-img" alt="logo-img" src={img33} style={{ width: '50px' }} />
                                    </a>
                                </div>
                                <a className="logo" href="#">EDUGATELY</a>
                            </div>
                            <div className="col-xl-2 col-lg-2 col-md-4 col-4 mb-3 d-flex align-items-center justify-content-end">
                                <div className="header-right-wrap">
                                    <div className="same-style mobile-off-canvas d-block d-lg-none">
                                        <a href="tel:+998555061011" className="mobile-aside-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 34 34" fill="none">
                                                <path d="M19.8335 2.8335C19.8335 2.8335 22.9502 3.11683 26.9168 7.0835C30.8835 11.0502 31.1668 14.1668 31.1668 14.1668" stroke="blue" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M20.1265 7.84229C20.1265 7.84229 21.5289 8.24298 23.6325 10.3466C25.7362 12.4503 26.1369 13.8527 26.1369 13.8527" stroke="blue" strokeWidth="1.5" strokeLinecap="round" />
                                                <path d="M14.2198 7.53108L15.1392 9.17856C15.9689 10.6653 15.6358 12.6157 14.329 13.9226C14.329 13.9226 14.329 13.9226 14.329 13.9226C14.3289 13.9227 12.744 15.5078 15.6179 18.3818C18.4912 21.255 20.0763 19.6715 20.0771 19.6707C20.0771 19.6706 20.0771 19.6707 20.0772 19.6706C21.384 18.3638 23.3344 18.0307 24.8211 18.8605L26.4686 19.7799C28.7136 21.0328 28.9788 24.1813 27.0054 26.1546C25.8197 27.3404 24.3671 28.263 22.7613 28.3239C20.0581 28.4264 15.4674 27.7422 10.8624 23.1373C6.25743 18.5323 5.57331 13.9416 5.67579 11.2384C5.73666 9.6326 6.65931 8.18 7.84506 6.99425C9.81841 5.0209 12.9668 5.28604 14.2198 7.53108Z" stroke="blue" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="offcanvas-mobile-menu " id="offcanvas-mobile-menu">
                        <div className="offcanvas-wrapper">
                            <div className="offcanvas-inner-content">
                                <div className="offcanvas-mobile-search-area">
                                    <div className="logo d-flex align-items-center">
                                        <img src="/assets/logo.png" alt />
                                        <h2 className="text-pr">EduGately</h2>
                                    </div>
                                    <div className="close" onClick={() => { showSideBar() }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 34 34" fill="none">
                                            <circle cx="17.0002" cy="17.0002" r="14.1667" stroke="#3772FF" strokeWidth="1.5" />
                                            <path d="M20.5418 13.4585L13.4585 20.5418M13.4585 13.4585L20.5418 20.5418" stroke="#3772FF" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                                <nav className="offcanvas-navigation" id="offcanvas-navigation">
                                    <ul>
                                        <li className="menu-item-has-children">
                                            <NavLink to="/about">{t("part24")}</NavLink>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <NavLink to="/unverlist">{t("part3")}</NavLink>
                                        </li>
                                        <li className="menu-item-has-children">
                                            {howItWork}
                                        </li>
                                        <li className="menu-item-has-children">
                                            <NavLink to="/login">{t("part6")}</NavLink>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <NavLink to="/partners">{t("part4")}</NavLink>
                                        </li>
                                        <li className="menu-item-has-children">
                                            <NavLink to="/registration">{t("part5")}</NavLink>
                                        </li>
                                        <li>
                                            <div className="language-currency-wrap" style={{justifyContent: 'left !important'}}>
                                                <div className="same-language-currency language-style">
                                                    <span className="fs-7 text-dark">{localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'lang'}<i className="fa fa-angle-down" /></span>
                                                    <div className="lang-car-dropdown">
                                                        <ul>
                                                            <li><button onClick={() => changeLanguage('uz')} value="uz">Uz</button></li>
                                                            <li><button onClick={() => changeLanguage('ru')} value="ru">Ru</button></li>
                                                            <li><button onClick={() => changeLanguage('en')} value="en">En</button></li>
                                                        </ul>
                                                    </div>

                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                                {/* <div className="mobile-menu-middle">
                                    <div className="search-div">
                                        <form>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 36 36" fill="none">
                                                <circle cx="17.25" cy="17.25" r="14.25" stroke="#3772FF" strokeWidth="1.5" />
                                                <path d="M27.75 27.75L33 33" stroke="#3772FF" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            <input type="text" placeholder="Search" />
                                        </form>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div >
            </header >



            {/* <div className="eduGateMain">

                <button
                    id="burgerMenu"
                    className={navActive ? "burger_menu" : ""}
                    onClick={() => {
                        setBurger(!burger);
                    }}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
                <div className="NavbarFix" id={burger ? "right0" : "right100"}>
                    <div className={scrollTop < 20 ? "navbar navPass d-block d-md-flex" : "navbar navAct"}>
                      
                        <div className="d-flex align-items-center">
                            <NavLink to="/">
                                <div className="navLeft d-none d-md-flex">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 42 42"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.2731 3.50972L34.2397 12.8122C34.3539 12.8713 34.4486 12.9563 34.5144 13.0587C34.5802 13.1611 34.6148 13.2772 34.6146 13.3954V35.1719C34.6146 35.2901 34.6492 35.4063 34.7152 35.5088C34.7811 35.6112 34.8759 35.6963 34.9902 35.7554C35.1044 35.8145 35.234 35.8456 35.3659 35.8456C35.4978 35.8455 35.6273 35.8143 35.7415 35.7551L41.6239 32.7094C41.7372 32.6507 41.8315 32.5664 41.8973 32.4649C41.9631 32.3634 41.9981 32.2482 41.9988 32.1308V11.1583C41.999 11.0401 41.9644 10.924 41.8986 10.8216C41.8328 10.7192 41.738 10.6342 41.6239 10.5751L21.3753 0.0902165C21.2611 0.0311149 21.1317 0 20.9998 0C20.868 0 20.7386 0.0311149 20.6244 0.0902165L16.2731 2.34422C16.1591 2.40337 16.0646 2.48835 15.9988 2.59064C15.9331 2.69292 15.8984 2.80891 15.8984 2.92697C15.8984 3.04503 15.9331 3.16102 15.9988 3.2633C16.0646 3.36559 16.1591 3.45057 16.2731 3.50972Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M6.3917 8.62564L22.7581 17.1035C22.8723 17.1625 22.9671 17.2475 23.033 17.3499C23.0988 17.4523 23.1333 17.5685 23.1331 17.6867L23.1383 41.1208C23.1391 41.2387 23.1744 41.3544 23.2406 41.4563C23.3068 41.5582 23.4017 41.6427 23.5157 41.7014C23.6297 41.7602 23.7589 41.7911 23.8904 41.791C24.0219 41.791 24.1511 41.76 24.2651 41.7012L30.1413 38.6583C30.2554 38.5992 30.3501 38.5142 30.416 38.4118C30.4818 38.3094 30.5163 38.1933 30.5162 38.0751V15.4299C30.5163 15.3117 30.4818 15.1956 30.416 15.0932C30.3501 14.9908 30.2554 14.9058 30.1413 14.8467L11.5075 5.19861C11.3934 5.13951 11.2639 5.1084 11.1321 5.1084C11.0003 5.1084 10.8708 5.13951 10.7566 5.19861L6.39065 7.45919C6.27652 7.51837 6.18178 7.60344 6.11595 7.70587C6.05012 7.8083 6.01552 7.92446 6.01563 8.04268C6.01573 8.16091 6.05054 8.27702 6.11656 8.37935C6.18257 8.48168 6.27747 8.56662 6.3917 8.62564Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0.109375 10.7418L19.0814 20.5712V19.3493L1.25612 10.1201L0.136605 10.7005L0.109375 10.7418Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 11.6055V12.8283L19.0799 22.713V21.4911L0 11.6055Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 13.749V14.9718L19.0799 24.8566V23.6347L0 13.749Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 15.8926V17.1144L19.0788 26.9992V25.7773L0 15.8926Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M19.0788 27.9199L0 18.0352V19.258L19.0788 29.1417V27.9199Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 20.1787V21.4006L19.0788 31.2853V30.0634L0 20.1787Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 22.3213V23.5431L19.0788 33.4279V32.206L0 22.3213Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 24.4639V25.6867L19.0788 35.5714V34.3486L0 24.4639Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 26.6074V27.8293L19.0778 37.714L19.0788 36.4921L0 26.6074Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 28.75V29.9728L19.0778 39.8566V38.6347L0 28.75Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 30.8936V32.1163L19.0778 42.0001V40.7773L0 30.8936Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 24.4639V25.6867L19.0788 35.5714V34.3486L0 24.4639Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 26.6074V27.8293L19.0778 37.714L19.0788 36.4921L0 26.6074Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 28.75V29.9728L19.0778 39.8566V38.6347L0 28.75Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 30.8936V32.1163L19.0778 42.0001V40.7773L0 30.8936Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 22.3213V23.5431L19.0788 33.4279V32.206L0 22.3213Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 20.1787V21.4006L19.0788 31.2853V30.0634L0 20.1787Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 18.0352V19.258L19.0788 29.1417V27.9199L0 18.0352Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 15.8926V17.1144L19.0788 26.9992V25.7773L0 15.8926Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 13.749V14.9718L19.0799 24.8566V23.6347L0 13.749Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0 11.6055V12.8283L19.0799 22.713V21.4911L0 11.6055Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M0.109375 10.7418L19.0814 20.5712V19.3493L1.25612 10.1201L0.136605 10.7005L0.109375 10.7418Z"
                                            fill="white"
                                        />
                                    </svg>
                                    <h1> <span style={{ fontSize: '25px' }}>E</span>DUGATELY</h1>
                                    <button
                                        id="burgerclose"
                                        onClick={() => {
                                            setBurger(!burger);
                                        }}
                                    >
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>
                                <div className="navLeft2 d-flex align-items-center d-md-none">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 42 42"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M16.2731 3.50972L34.2397 12.8122C34.3539 12.8713 34.4486 12.9563 34.5144 13.0587C34.5802 13.1611 34.6148 13.2772 34.6146 13.3954V35.1719C34.6146 35.2901 34.6492 35.4063 34.7152 35.5088C34.7811 35.6112 34.8759 35.6963 34.9902 35.7554C35.1044 35.8145 35.234 35.8456 35.3659 35.8456C35.4978 35.8455 35.6273 35.8143 35.7415 35.7551L41.6239 32.7094C41.7372 32.6507 41.8315 32.5664 41.8973 32.4649C41.9631 32.3634 41.9981 32.2482 41.9988 32.1308V11.1583C41.999 11.0401 41.9644 10.924 41.8986 10.8216C41.8328 10.7192 41.738 10.6342 41.6239 10.5751L21.3753 0.0902165C21.2611 0.0311149 21.1317 0 20.9998 0C20.868 0 20.7386 0.0311149 20.6244 0.0902165L16.2731 2.34422C16.1591 2.40337 16.0646 2.48835 15.9988 2.59064C15.9331 2.69292 15.8984 2.80891 15.8984 2.92697C15.8984 3.04503 15.9331 3.16102 15.9988 3.2633C16.0646 3.36559 16.1591 3.45057 16.2731 3.50972Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M6.3917 8.62564L22.7581 17.1035C22.8723 17.1625 22.9671 17.2475 23.033 17.3499C23.0988 17.4523 23.1333 17.5685 23.1331 17.6867L23.1383 41.1208C23.1391 41.2387 23.1744 41.3544 23.2406 41.4563C23.3068 41.5582 23.4017 41.6427 23.5157 41.7014C23.6297 41.7602 23.7589 41.7911 23.8904 41.791C24.0219 41.791 24.1511 41.76 24.2651 41.7012L30.1413 38.6583C30.2554 38.5992 30.3501 38.5142 30.416 38.4118C30.4818 38.3094 30.5163 38.1933 30.5162 38.0751V15.4299C30.5163 15.3117 30.4818 15.1956 30.416 15.0932C30.3501 14.9908 30.2554 14.9058 30.1413 14.8467L11.5075 5.19861C11.3934 5.13951 11.2639 5.1084 11.1321 5.1084C11.0003 5.1084 10.8708 5.13951 10.7566 5.19861L6.39065 7.45919C6.27652 7.51837 6.18178 7.60344 6.11595 7.70587C6.05012 7.8083 6.01552 7.92446 6.01563 8.04268C6.01573 8.16091 6.05054 8.27702 6.11656 8.37935C6.18257 8.48168 6.27747 8.56662 6.3917 8.62564Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0.109375 10.7418L19.0814 20.5712V19.3493L1.25612 10.1201L0.136605 10.7005L0.109375 10.7418Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 11.6055V12.8283L19.0799 22.713V21.4911L0 11.6055Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 13.749V14.9718L19.0799 24.8566V23.6347L0 13.749Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 15.8926V17.1144L19.0788 26.9992V25.7773L0 15.8926Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M19.0788 27.9199L0 18.0352V19.258L19.0788 29.1417V27.9199Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 20.1787V21.4006L19.0788 31.2853V30.0634L0 20.1787Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 22.3213V23.5431L19.0788 33.4279V32.206L0 22.3213Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 24.4639V25.6867L19.0788 35.5714V34.3486L0 24.4639Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 26.6074V27.8293L19.0778 37.714L19.0788 36.4921L0 26.6074Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 28.75V29.9728L19.0778 39.8566V38.6347L0 28.75Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 30.8936V32.1163L19.0778 42.0001V40.7773L0 30.8936Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 24.4639V25.6867L19.0788 35.5714V34.3486L0 24.4639Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 26.6074V27.8293L19.0778 37.714L19.0788 36.4921L0 26.6074Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 28.75V29.9728L19.0778 39.8566V38.6347L0 28.75Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 30.8936V32.1163L19.0778 42.0001V40.7773L0 30.8936Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 22.3213V23.5431L19.0788 33.4279V32.206L0 22.3213Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 20.1787V21.4006L19.0788 31.2853V30.0634L0 20.1787Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 18.0352V19.258L19.0788 29.1417V27.9199L0 18.0352Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 15.8926V17.1144L19.0788 26.9992V25.7773L0 15.8926Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 13.749V14.9718L19.0799 24.8566V23.6347L0 13.749Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0 11.6055V12.8283L19.0799 22.713V21.4911L0 11.6055Z"
                                            fill="#325CFD"
                                        />
                                        <path
                                            d="M0.109375 10.7418L19.0814 20.5712V19.3493L1.25612 10.1201L0.136605 10.7005L0.109375 10.7418Z"
                                            fill="#325CFD"
                                        />
                                    </svg>
                                    <h1> <span style={{ fontSize: '25px' }}>E</span>DUGATELY</h1>
                                    <button
                                        id="burgerclose"
                                        onClick={() => {
                                            setBurger(!burger);
                                        }}
                                    >
                                        <span></span>
                                        <span></span>
                                    </button>
                                </div>

                            </NavLink>
                           
                            <div className="navRight">
                                
                                <NavLink onClick={handleout} to="/about">
                                    {t("part24")} tet
                                </NavLink>
                                {howItWork}
                                {universitet}
                                <NavLink onClick={handleout} to="/partners">
                                    {t("part4")}
                                </NavLink>

                                <NavLink onClick={handleout} to="/registration">
                                    {t("part5")}
                                </NavLink>
                                <NavLink
                                    to={
                                        currentRole
                                            ? currentRole === "applicant"
                                                ? "/my-account"
                                                : currentRole === "notary"
                                                    ? "/n-glavny"
                                                    : currentRole === "accountant"
                                                        ? "/accountant-analytics"
                                                        : currentRole === "director"
                                                            ? "/home/main"
                                                            : currentRole === "supermanager"
                                                                ? "superManager-analitika"
                                                                : currentRole === "university"
                                                                    ? "/univer-backoffice-page"
                                                                    : "/login"
                                            : "/login"
                                    }
                                >
                                    {t("part6")}
                                </NavLink>

                            </div>
                        </div>
                        <div className="nav-item">
                            <div>
                                <select
                                    className="lang-drop text-white"

                                    name="lang"
                                    onClick={changeLanguage}
                                >
                                    <option
                                        className="lang-opt text-dark"
                                        value="ru"

                                        to="/ru"
                                    >
                                        RU
                                    </option>

                                    <option
                                        className="lang-opt text-dark"
                                        value="uz"
                                        to="/uz"

                                    >
                                        Uz
                                    </option>

                                    <option
                                        value="en"
                                        className="lang-opt text-dark"
                                        to="/en"
                                    >
                                        EN
                                    </option>

                                </select>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Navbar;
