import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../assets/scss/style.css";
import { useTranslation } from "react-i18next";
import axios from 'axios';

import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguageAction } from "../../../store/actions/langAction";
import { NavLink } from "react-router-dom";


const Footer = () => {
    const { t, i18n } = useTranslation();

    const selector = useSelector((state) => state);
    const { payload } = selector.payload;
    const currentRole = payload?.role;

    const dispatch = useDispatch()

    const changeLanguage = (e) => {
        const languageValue = e;
        dispatch(updateLanguageAction({ languageValue }))
        i18n.changeLanguage(languageValue);
    };
    ;
    const [phone, setPhone] = useState("");
    const [phone2, setPhone2] = useState("");
    const [write, setWrite] = useState(false);
    const [valid, setValid] = useState("")
    const [valid2, setValid2] = useState(false)


    const handlecheck = () => {
        setWrite(!write);
    };
    const callMe = async () => {
        let tels = phone.slice(0, 4) + phone.slice(6, 8) + phone.slice(10, 13) + phone.slice(14, 16) + phone.slice(17, 19)
        try {
            const data = await axios.post("https://backend.edugately.com/api/v1/common/phone-consultation/", {
                phone_number: tels,
                // write_to_telegram: write,
            });
            ;
            if (data.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Успешно отправлено',
                })
            }
        } catch (error) {
            ;
            if (error.response.status === 400) {
                const phone_number = error?.response?.data?.phone_number
                Swal.fire({
                    icon: 'warning',
                    text: phone_number[0],
                })
            }
        }
    };
    const takeDailyNews = async () => {
        if (valid2 == true) {
            try {
                const res = await axios.post('https://backend.edugately.com/api/v1/common/email-newsletter/', { email: phone2 })
                if (res.status === 201) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Успешно отправлено'
                    })
                }
            } catch (error) {
                ;
                const email = error?.response?.data?.email
                if (error) {
                    Swal.fire({
                        icon: 'warning',
                        text: 'Xatolik!!!'
                    })
                }
            }
        } else {
            setValid('Ushb maydon to\'ldirilishi shart')
        }

    }

    function ValidateEmail(inputText) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputText.match(mailformat)) {
            setValid('Email to\'g\'ri kiritildi')
            setValid2(true)
            setPhone2(inputText)
        }
        else {
            setValid("Iltimos haqiqiy email kiriting");
            setValid2(false)
        }
    }

    return (
        // <div className="footer oldd">
        //   {/* <button className="btn">{t("part30")}</button> */}
        //   {/* <div className="top">
        //     <h1>{t("part31")}</h1>
        //     <div>
        //       <div>
        //         <InputMask
        //           mask="+\9\98 (99) 999-99-99"
        //           className="form-control"
        //           placeholder="+998-123-45-67"
        //           type="text"
        //           onChange={(e) => setPhone(e.target.value)}
        //         />
        //       </div>

        //       <button style={{ marginBottom: '25px' }} onClick={callMe}>{t("part32")}</button>
        //     </div>
        //   </div> */}
        //   <div className="down">

        //     <div className="left">
        //       {/* <MapEdugately /> */}
        //       <Link className="text-white mt-3 ms-5" style={{fontSize: '50px'}} to='/' >EDUGATELY</Link>

        //     </div>
        //     <div className="right">
        //       {/* <h1>{t("part47")}</h1> */}
        //       {/* <p> {t("part48")}</p> */}
        //       <div className="email">
        //         <input type="email" onChange={e => ValidateEmail(e.target.value)} placeholder="E-mail" />

        //       </div>
        //       <span style={valid2 == true ? { color: '#30A800', fontWeight: 700 } : { color: '#fd0000', fontWeight: 700 }}>{valid}</span>
        //       <br />
        //       <br />
        //       <button onClick={takeDailyNews}>{t("part49")}</button>
        //       <h4>{t("part50")}</h4>
        //       <div className="social">
        //         {/* facebook icon */}
        //         <a target="blank" href='https://www.facebook.com/Edugately' className="links fb">
        //           <FacebookIcon />
        //         </a>
        //         <a target="blank" href='https://instagram.com/edugately?utm_medium=copy_link' className="links in">
        //           <InstagramIcon />
        //         </a>
        //         <a target="blank" href='https://www.youtube.com/channel/UCWT2CbEH-n5vDNAGrYFqESQ' className="links yt">
        //           <YouTubeIcon />
        //         </a>
        //         <a target="blank" href='https://t.me/Edugately' className="links tl">
        //           <TelegramIcon />
        //         </a>



        //       </div>

        //       {/* end right */}
        //     </div>
        //   </div>

        //   <div className="otapoch">
        //     <a className="poch" href="mailto:infoedugately@gmail.com?subject text">
        //       <div className="doira" style={{ marginRight: '15px' }}>
        //         <EmailIcon fontSize="large" />
        //       </div>
        //       <div className="dvv">
        //         <p style={{ margin: '0px' }}>{t("part34")}:</p>
        //         <p>infoedugately@gmail.com</p>
        //       </div>
        //     </a>
        //     <a className="poch" target='_blank' href="https://www.google.com/maps/place/Asia+Consult/@41.315741,69.240353,18.82z/data=!4m5!3m4!1s0x38ae8be6a6bf321b:0x7ca52bd8be672e2b!8m2!3d41.3157538!4d69.2412375">
        //       <div className="doira" style={{ marginRight: '15px' }}>
        //         <LocationOnIcon fontSize="large" />
        //       </div>
        //       <div className="dvv">
        //         <p style={{ margin: '0px' }}>{t("part33")}:</p>
        //         <p>Toshkent sh. Furqat 23 A</p>
        //       </div>
        //     </a>
        //     <a className="poch" href="tel:+998 555061011" >
        //       <div className="doira" style={{ marginRight: '15px' }}>
        //         <PhoneIcon fontSize="large" />
        //       </div>
        //       <div className="dvv">
        //         <p style={{ margin: '0px' }}>{t("part35")}:</p>
        //         <p>+998 55 506 1011</p>
        //       </div>
        //     </a>
        //   </div>
        // </div>
        <footer className="footer-area bg-footer pt-100 pb-70">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-4 ">
                        <div className="row w-100  d-flex justify-content-center d-lg-block">
                            <a href="/" className=" col-lg-2 col-sm-4 p-0 d-flex d-lg-none align-items-center justify-content-center edugately-text ">
                                <img src={process.env.PUBLIC_URL + '/assets/Education.png'} alt="logo" />
                                <h1 className="text-white">EduGately</h1>
                            </a>
                            <a href="/" className=" col-lg-2 col-sm-4 p-0 d-none d-lg-flex align-items-center edugately-text">
                                <img src={process.env.PUBLIC_URL + '/assets/Education.png'} alt="logo" />
                                <h1 className="text-white">EduGately</h1>
                            </a>
                        </div>
                        <div className="row mt-30 d-none d-lg-block">
                            <div className="col-12 col-lg-10 mt-3 p-0  ">
                                <div className="d-flex align-items-ce offset-sm-4  offset-lg-0  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 46 47" fill="none">
                                        <path d="M7.6665 19.8018C7.6665 11.1818 14.5315 4.19385 22.9998 4.19385C31.4682 4.19385 38.3332 11.1818 38.3332 19.8018C38.3332 28.3543 33.4393 38.3343 25.8038 41.9032C24.0238 42.7352 21.9758 42.7352 20.1959 41.9032C12.5604 38.3343 7.6665 28.3543 7.6665 19.8018Z" stroke="white" strokewidth="1.5" />
                                        <circle cx={23} cy="19.5269" r="5.75" stroke="white" strokewidth="1.5" />
                                    </svg>
                                    <div>
                                        <p className="mb-0 text-white ms-3">{t('part33')}:</p>
                                        <p className="mb-0 text-white ms-3">{t('adres1')}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-10 mt-3 p-0  ">
                                <div className="d-flex align-items-ce offset-sm-4  offset-lg-0  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 46 47" fill="none">
                                        <path d="M3.8335 23.3602C3.8335 16.132 3.8335 12.5179 6.07901 10.2724C8.32453 8.02686 11.9386 8.02686 19.1668 8.02686H26.8335C34.0617 8.02686 37.6758 8.02686 39.9213 10.2724C42.1668 12.5179 42.1668 16.132 42.1668 23.3602C42.1668 30.5884 42.1668 34.2025 39.9213 36.448C37.6758 38.6935 34.0617 38.6935 26.8335 38.6935H19.1668C11.9386 38.6935 8.32453 38.6935 6.07901 36.448C3.8335 34.2025 3.8335 30.5884 3.8335 23.3602Z" stroke="white" strokewidth="1.5" />
                                        <path d="M11.5 15.6938L15.6379 19.1421C19.1581 22.0756 20.9182 23.5424 23 23.5424C25.0818 23.5424 26.8419 22.0756 30.3621 19.1421L34.5 15.6938" stroke="white" strokewidth="1.5" strokelinecap="round" />
                                    </svg>
                                    <div>
                                        <p className="mb-0 text-white ms-3">{t('part34')}:</p>
                                        <p className="mb-0 text-white ms-3">infoedugately@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12  col-lg-10 mt-3 p-0 ">
                                <div className="d-flex offset-sm-4 offset-lg-0   ">
                                    <a href="tel:+998555061011" className="d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 46 47" fill="none">
                                            <path d="M26.8335 4.19385C26.8335 4.19385 31.0502 4.57718 36.4168 9.94385C41.7835 15.3105 42.1668 19.5272 42.1668 19.5272" stroke="white" strokewidth="1.5" strokelinecap="round" />
                                            <path d="M27.23 10.9702C27.23 10.9702 29.1274 11.5123 31.9735 14.3584C34.8196 17.2045 35.3617 19.1019 35.3617 19.1019" stroke="white" strokewidth="1.5" strokelinecap="round" />
                                            <path d="M19.2386 10.5495L20.4825 12.7785C21.6051 14.79 21.1544 17.4287 19.3864 19.1968C19.3864 19.1968 19.3864 19.1968 19.3864 19.1968C19.3862 19.1969 17.2418 21.3416 21.1302 25.2299C25.0178 29.1175 27.1624 26.9745 27.1632 26.9737C27.1632 26.9736 27.1632 26.9737 27.1633 26.9736C28.9313 25.2056 31.5701 24.7549 33.5816 25.8775L35.8105 27.1215C38.8479 28.8166 39.2066 33.0762 36.5368 35.7461C34.9326 37.3503 32.9673 38.5986 30.7948 38.681C27.1375 38.8196 20.9265 37.894 14.6963 31.6638C8.466 25.4335 7.54042 19.2225 7.67906 15.5653C7.76142 13.3928 9.00971 11.4275 10.614 9.82322C13.2838 7.1534 17.5434 7.51211 19.2386 10.5495Z" stroke="white" strokewidth="1.5" strokelinecap="round" />
                                        </svg>
                                        <div>
                                            <p className="mb-0 text-white ms-3">+998 (55) 506 1011</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="row ml-xl-100 d-block d-lg-none mt-5">
                            <div className="col-12 col-lg-4  col-md-4 w-100 d-flex justify-content-center">
                                <div className="footer-widget mb-3 ">
                                    <div className="footer-title footer-title-mobile">
                                        <NavLink to="/about">
                                            {t("part24")}
                                        </NavLink>
                                    </div>
                                    <div className="footer-list d-none d-lg-block">
                                        <ul>
                                            <li>
                                                <a href="#">{t('foter2')}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4  col-md-4 w-100 d-flex justify-content-center">
                                <div className="footer-widget mb-3 ">
                                    <div className="footer-title footer-title-mobile">
                                        <NavLink

                                            to="/unverlist"
                                        >
                                            {t("part3")}
                                        </NavLink>
                                    </div>
                                    <div className="footer-list d-none d-lg-block">
                                        <ul>
                                            <li>
                                                <NavLink
                                                    className="text-white" to={
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
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4  col-md-4 w-100 d-flex justify-content-center">
                                <div className="footer-widget mb-3 ">
                                    <div className="footer-title footer-title-mobile">
                                        <NavLink

                                            to="unversity"
                                            spy={true}
                                            offset={-60}
                                            duration={700}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {t("part28")}
                                        </NavLink>
                                    </div>
                                    <div className="footer-list d-none d-lg-block">
                                        <ul>
                                            <li>
                                                <NavLink className="text-white" to="/partners">
                                                    {t("part4")}
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-8 mt-90 mt-lg-0">
                        <div className="row ml-xl-100 d-none d-lg-flex">
                            <div className="col-12 col-lg-4  col-md-4">
                                <div className="footer-widget mb-30 ml-30">
                                    <div className="footer-title">
                                        <NavLink to="/about" className="text-white">
                                            {t("part24")}
                                        </NavLink>
                                    </div>
                                    <div className="footer-list d-none d-lg-block">
                                        <ul>
                                            <li>
                                                <a href="#">{t('foter2')}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4  col-md-4">
                                <div className="footer-widget mb-30 ml-50">
                                    <div className="footer-title">
                                        <NavLink
                                            className="text-white"
                                            to="/unverlist"
                                        >
                                            {t("part3")}
                                        </NavLink>
                                    </div>
                                    <div className="footer-list d-none d-lg-block">
                                        <ul>
                                            <li>
                                                <NavLink
                                                    className="text-white" to={
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
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-4  col-md-4">
                                <div className="footer-widget mb-30 ml-75">
                                    <div className="footer-title">
                                        <NavLink
                                            className="text-white"
                                            to="unversity"
                                            spy={true}
                                            offset={-60}
                                            duration={700}
                                            style={{ cursor: "pointer" }}
                                        >
                                            {t("part28")}
                                        </NavLink>
                                    </div>
                                    <div className="footer-list d-none d-lg-block">
                                        <ul>
                                            <li>
                                                <NavLink className="text-white" to="/partners">
                                                    {t("part4")}
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-50">
                            <div className="email-input">
                                <h1>{t('foter1')}</h1>
                                <div className="input">
                                    <form>
                                        <input type="text" placeholder={`${t('p88')}`} />
                                        <button>{t('p249')}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-30 d-blcok d-lg-none">
                            <div className="col-12 col-lg-10 mt-3 p-0  ">
                                <div className="d-flex align-items-ce offset-2 offset-sm-4  offset-lg-0  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 46 47" fill="none">
                                        <path d="M7.6665 19.8018C7.6665 11.1818 14.5315 4.19385 22.9998 4.19385C31.4682 4.19385 38.3332 11.1818 38.3332 19.8018C38.3332 28.3543 33.4393 38.3343 25.8038 41.9032C24.0238 42.7352 21.9758 42.7352 20.1959 41.9032C12.5604 38.3343 7.6665 28.3543 7.6665 19.8018Z" stroke="white" strokewidth="1.5" />
                                        <circle cx={23} cy="19.5269" r="5.75" stroke="white" strokewidth="1.5" />
                                    </svg>
                                    <div>
                                        <p className="mb-0 text-white ms-3">{t('part33')}:</p>
                                        <p className="mb-0 text-white ms-3">Toshkent sh. Furqat 23 A</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-10 mt-3 p-0  ">
                                <div className="d-flex align-items-ce offset-2 offset-sm-4  offset-lg-0  ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 46 47" fill="none">
                                        <path d="M3.8335 23.3602C3.8335 16.132 3.8335 12.5179 6.07901 10.2724C8.32453 8.02686 11.9386 8.02686 19.1668 8.02686H26.8335C34.0617 8.02686 37.6758 8.02686 39.9213 10.2724C42.1668 12.5179 42.1668 16.132 42.1668 23.3602C42.1668 30.5884 42.1668 34.2025 39.9213 36.448C37.6758 38.6935 34.0617 38.6935 26.8335 38.6935H19.1668C11.9386 38.6935 8.32453 38.6935 6.07901 36.448C3.8335 34.2025 3.8335 30.5884 3.8335 23.3602Z" stroke="white" strokewidth="1.5" />
                                        <path d="M11.5 15.6938L15.6379 19.1421C19.1581 22.0756 20.9182 23.5424 23 23.5424C25.0818 23.5424 26.8419 22.0756 30.3621 19.1421L34.5 15.6938" stroke="white" strokewidth="1.5" strokelinecap="round" />
                                    </svg>
                                    <div>
                                        <p className="mb-0 text-white ms-3">{t('part34')}:</p>
                                        <p className="mb-0 text-white ms-3">infoedugately@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12  col-lg-10 mt-3 p-0 ">
                                <div className="d-flex offset-2 offset-sm-4 offset-lg-0   ">
                                    <a href="tel:+998555061011" className="d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 46 47" fill="none">
                                            <path d="M26.8335 4.19385C26.8335 4.19385 31.0502 4.57718 36.4168 9.94385C41.7835 15.3105 42.1668 19.5272 42.1668 19.5272" stroke="white" strokewidth="1.5" strokelinecap="round" />
                                            <path d="M27.23 10.9702C27.23 10.9702 29.1274 11.5123 31.9735 14.3584C34.8196 17.2045 35.3617 19.1019 35.3617 19.1019" stroke="white" strokewidth="1.5" strokelinecap="round" />
                                            <path d="M19.2386 10.5495L20.4825 12.7785C21.6051 14.79 21.1544 17.4287 19.3864 19.1968C19.3864 19.1968 19.3864 19.1968 19.3864 19.1968C19.3862 19.1969 17.2418 21.3416 21.1302 25.2299C25.0178 29.1175 27.1624 26.9745 27.1632 26.9737C27.1632 26.9736 27.1632 26.9737 27.1633 26.9736C28.9313 25.2056 31.5701 24.7549 33.5816 25.8775L35.8105 27.1215C38.8479 28.8166 39.2066 33.0762 36.5368 35.7461C34.9326 37.3503 32.9673 38.5986 30.7948 38.681C27.1375 38.8196 20.9265 37.894 14.6963 31.6638C8.466 25.4335 7.54042 19.2225 7.67906 15.5653C7.76142 13.3928 9.00971 11.4275 10.614 9.82322C13.2838 7.1534 17.5434 7.51211 19.2386 10.5495Z" stroke="white" strokewidth="1.5" strokelinecap="round" />
                                        </svg>
                                        <div>
                                            <p className="mb-0 text-white ms-3">+998 (55) 506 1011</p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 mt-5">
                        <div className="row">
                            <div className="col-4 footer-copyright justify-content-start d-none d-lg-flex">
                                {/* <select>
                              <option value="">UZ</option>
                              <option value="">EN</option>
                              <option value="">RU</option>
                          </select> */}
                                <div className="same-language-currency language-style">
                                    <span className="fs-7">{localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'lang'} <i className="fa fa-angle-down" /></span>
                                    <div className="lang-car-dropdown">
                                        <ul>
                                            <li><button onClick={() => changeLanguage('uz')} value="uz">Uz</button></li>
                                            <li><button onClick={() => changeLanguage('ru')} value="ru">Ru</button></li>
                                            <li><button onClick={() => changeLanguage('en')} value="en">En</button></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 footer-copyright justify-content-center copyright  d-none d-lg-flex">
                                <p>© 2023 • All Rights Reserved</p>
                            </div>
                            <div className="col-4 footer-copyright social-meadia justify-content-end d-none d-lg-flex">
                                <a href="https://www.facebook.com/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={10} height={18} viewBox="0 0 10 18" fill="none">
                                        <path d="M6.065 17.9972V9.80115H8.83L9.241 6.59215H6.065V4.54815C6.065 3.62215 6.323 2.98815 7.652 2.98815H9.336V0.12715C8.517 0.03915 7.693 -0.00285004 6.869 0.000149963C4.425 0.000149963 2.747 1.49215 2.747 4.23115V6.58615H0V9.79515H2.753V17.9972H6.065Z" fill="white" />
                                    </svg>
                                </a>
                                <a href="https://instagram.com/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={18} viewBox="0 0 19 18" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.168 0H5.16797C2.69319 0 0.667969 2.02432 0.667969 4.5V13.5C0.667969 15.9748 2.69319 18 5.16797 18H14.168C16.6427 18 18.668 15.9748 18.668 13.5V4.5C18.668 2.02432 16.6427 0 14.168 0ZM9.66797 12.7499C7.59662 12.7499 5.91789 11.0704 5.91789 9C5.91789 6.92865 7.59662 5.24993 9.66797 5.24993C11.7384 5.24993 13.418 6.92865 13.418 9C13.418 11.0704 11.7384 12.7499 9.66797 12.7499ZM13.418 4.12492C13.418 4.74615 13.9211 5.24992 14.543 5.24992C15.1649 5.24992 15.668 4.74615 15.668 4.12492C15.668 3.5037 15.1649 2.99992 14.543 2.99992C13.9211 2.99992 13.418 3.5037 13.418 4.12492Z" fill="white" />
                                    </svg>
                                </a>
                                <a href="https://www.youtube.com/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={23} height={16} viewBox="0 0 23 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M20.635 0.732071C21.5968 0.857373 22.5159 1.79268 22.6329 2.76809C23.0469 6.3428 23.0469 9.80921 22.6329 13.3828C22.5159 14.3582 21.5968 15.2946 20.635 15.4188C14.7706 16.1475 8.83994 16.1475 2.97721 15.4188C2.01461 15.2944 1.09546 14.3582 0.978508 13.3828C0.564456 9.80893 0.564456 6.3428 0.978508 2.76809C1.09546 1.79268 2.01461 0.857094 2.97721 0.732071C8.83994 0.00337209 14.7703 0.00337209 20.635 0.732071ZM9.94928 4.36332V11.7887L15.5182 8.07614L9.94928 4.36332Z" fill="white" />
                                    </svg>
                                </a>
                            </div>
                            <div className="col-12 footer-copyright social-meadia justify-content-center  d-flex d-lg-none">
                                <a href="https://www.facebook.com/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={10} height={18} viewBox="0 0 10 18" fill="none">
                                        <path d="M6.065 17.9972V9.80115H8.83L9.241 6.59215H6.065V4.54815C6.065 3.62215 6.323 2.98815 7.652 2.98815H9.336V0.12715C8.517 0.03915 7.693 -0.00285004 6.869 0.000149963C4.425 0.000149963 2.747 1.49215 2.747 4.23115V6.58615H0V9.79515H2.753V17.9972H6.065Z" fill="white" />
                                    </svg>
                                </a>
                                <a href="https://instagram.com/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={18} viewBox="0 0 19 18" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.168 0H5.16797C2.69319 0 0.667969 2.02432 0.667969 4.5V13.5C0.667969 15.9748 2.69319 18 5.16797 18H14.168C16.6427 18 18.668 15.9748 18.668 13.5V4.5C18.668 2.02432 16.6427 0 14.168 0ZM9.66797 12.7499C7.59662 12.7499 5.91789 11.0704 5.91789 9C5.91789 6.92865 7.59662 5.24993 9.66797 5.24993C11.7384 5.24993 13.418 6.92865 13.418 9C13.418 11.0704 11.7384 12.7499 9.66797 12.7499ZM13.418 4.12492C13.418 4.74615 13.9211 5.24992 14.543 5.24992C15.1649 5.24992 15.668 4.74615 15.668 4.12492C15.668 3.5037 15.1649 2.99992 14.543 2.99992C13.9211 2.99992 13.418 3.5037 13.418 4.12492Z" fill="white" />
                                    </svg>
                                </a>
                                <a href="https://www.youtube.com/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={23} height={16} viewBox="0 0 23 16" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M20.635 0.732071C21.5968 0.857373 22.5159 1.79268 22.6329 2.76809C23.0469 6.3428 23.0469 9.80921 22.6329 13.3828C22.5159 14.3582 21.5968 15.2946 20.635 15.4188C14.7706 16.1475 8.83994 16.1475 2.97721 15.4188C2.01461 15.2944 1.09546 14.3582 0.978508 13.3828C0.564456 9.80893 0.564456 6.3428 0.978508 2.76809C1.09546 1.79268 2.01461 0.857094 2.97721 0.732071C8.83994 0.00337209 14.7703 0.00337209 20.635 0.732071ZM9.94928 4.36332V11.7887L15.5182 8.07614L9.94928 4.36332Z" fill="white" />
                                    </svg>
                                </a>
                            </div>
                            <div className="col-12 footer-copyright justify-content-center copyright mt-5 d-flex d-lg-none">
                                <p>© 2023 • All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    );
};

export default Footer;
