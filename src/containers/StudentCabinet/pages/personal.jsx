import React, { Component, useEffect, useState } from 'react';

// import css
import "../../../style/css/personal.css"

// imort icon
import avatar from "../../../assets/icon/Avatar.svg";
import message_icon from "../../../assets/icon/message.svg"
import call_icon from "../../../assets/icon/call.svg"
import StudentSidebar from './StudentSidebar2';
import { useSelector } from 'react-redux';
import Axios from '../../../utils/axios';
import Logo from '../../../assets/icon/LogoAsia.jpg'
import Swal from 'sweetalert2';
import Loader from 'react-js-loader'
import { useTranslation } from 'react-i18next';
import Headerst from './Headerst';
import img from '../../../assets/studentImgs/Rectangle 3463849.png'
const Personal = () => {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false)
    const selector = useSelector(state => state)
    const [userInfo, setUserInfo] = useState({})
    const [currentManager, setCurrentManager] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        role: ''
    })
    const { payload } = selector?.payload
    const userFirstName = payload?.data?.first_name
    const userLasttName = payload?.data?.last_name

    const fetchMyMeneger = async () => {
        setLoading(true)
        try {
            const res = await Axios.get('/applicant/me/')
            setUserInfo(res.data)
            const { manager } = res.data
            setCurrentManager(manager)
            if (manager) {
                localStorage.setItem('seen', manager.first_name)
            }
            setLoading(false)
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error?.response
            })
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchMyMeneger()
    }, [])
    return (
        <>
            <div className="studentKabinet" style={{width:'100vw'}}>
                <StudentSidebar />
                <div className="mobileHeader">
                    <div className="header-icons">
                        <div className="hambur" onclick="showSidebar()">

                            <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 34 34" fill="none">
                                <path d="M28.3335 9.91699L5.66683 9.91699" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M28.3335 17L5.66683 17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M28.3335 24.083L5.66683 24.083" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div className="logo">
                            <img src="/assets/studentImgs/Education gately 1.png" alt />
                            <h1>EDUGATELY</h1>
                        </div>
                        <a href="tel:+998555061011" className="tel">

                            <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 34 34" fill="none">
                                <path d="M19.8335 2.83301C19.8335 2.83301 22.9502 3.11634 26.9168 7.08301C30.8835 11.0497 31.1668 14.1663 31.1668 14.1663" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M20.1265 7.8418C20.1265 7.8418 21.5289 8.24249 23.6325 10.3461C25.7362 12.4498 26.1369 13.8522 26.1369 13.8522" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M14.2198 7.53157L15.1392 9.17905C15.9689 10.6658 15.6358 12.6162 14.329 13.923C14.329 13.923 14.329 13.923 14.329 13.923C14.3289 13.9232 12.744 15.5083 15.6179 18.3823C18.4912 21.2555 20.0763 19.672 20.0771 19.6712C20.0771 19.6711 20.0771 19.6711 20.0772 19.6711C21.384 18.3643 23.3344 18.0312 24.8211 18.861L26.4686 19.7804C28.7136 21.0333 28.9788 24.1818 27.0054 26.1551C25.8197 27.3409 24.3671 28.2635 22.7613 28.3244C20.0581 28.4269 15.4674 27.7427 10.8624 23.1377C6.25743 18.5328 5.57331 13.9421 5.67579 11.2389C5.73666 9.63309 6.65931 8.18049 7.84506 6.99474C9.81841 5.02139 12.9668 5.28653 14.2198 7.53157Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </a>
                    </div>
                </div>
                <Headerst first_name={userInfo.first_name + ' ' + userInfo.last_name} />
                <div className="sub-header " id="sub-header">
                    <div className="manager">
                        <div className="data-filling">
                            <div className="example-btn">
                                <button>{t("part57")}</button>
                            </div>
                            <div className="info-about-manager">
                                {
                                     currentManager?.first_name ?

                                     <div className="info">
                                    <div className="first-info">
                                        <div className="img-div">
                                            <img src={img} alt={404} />
                                        </div>
                                        <div className="name">
                                            <h4>{currentManager.first_name} {currentManager.last_name}</h4>
                                            <p>{currentManager.role}, Edugately</p>
                                            <div className="icons">
                                                <a href="mailto:educationgateway@gmail.com">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#1C274C" strokeWidth="1.5" />
                                                        <path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </a>
                                                <a href={`tel:${currentManager.phone_number}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                        <path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="second-info">
                                        <h4>Hurmatli Talaba Edugateway platformasiga xush kelibsiz!</h4>
                                        <p>{t("p85")} {currentManager.first_name} - {currentManager.last_name}.{t("p86")}</p>
                                    </div>
                                    <div className="third-info">
                                        <div className="phone">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                                                <path d="M7.03759 2.31617L7.6866 3.4791C8.2723 4.52858 8.03718 5.90532 7.11471 6.8278C7.11471 6.8278 7.11471 6.8278 7.11471 6.8278C7.11459 6.82792 5.99588 7.94685 8.02451 9.97548C10.0525 12.0035 11.1714 10.8861 11.1722 10.8853C11.1722 10.8853 11.1722 10.8853 11.1722 10.8853C12.0947 9.96281 13.4714 9.7277 14.5209 10.3134L15.6838 10.9624C17.2686 11.8468 17.4557 14.0692 16.0628 15.4622C15.2258 16.2992 14.2004 16.9505 13.0669 16.9934C11.1588 17.0658 7.91828 16.5829 4.6677 13.3323C1.41713 10.0817 0.934215 6.84122 1.00655 4.93309C1.04952 3.7996 1.7008 2.77423 2.53781 1.93723C3.93076 0.544282 6.15317 0.731437 7.03759 2.31617Z" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            {t("p87")}: <span><a style={{ color: "black" }} href={`tel:${currentManager.phone_number}`}> {currentManager.phone_number}</a></span>
                                        </div>
                                        <hr />
                                        <div className="email">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#1C274C" strokeWidth="1.5" />
                                                <path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                            {t("p88")}:<span><a style={{ color: 'black' }} href="mailto:educationgateway@gmail.com">educationgateway@gmail.com</a></span>
                                        </div>
                                    </div>
                                </div>
                                :
                                <p>{t("p418")}</p>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            
            {/* <div className="Personal" style={{ width: '82%' }}>
                <div className="top">
                    <h1>{t("part57")}</h1>
                    <div>
                        <img src={avatar} alt="" />
                        <h2>{userInfo.first_name} {userInfo.last_name} <span>{t("p65")}</span></h2>
                    </div>
                </div>
                <div className="bottom">

                    {loading ? <Loader type="spinner-circle" bgColor={"#fff"} color={'#fff'} size={80} /> :
                        currentManager?.first_name ?
                            <div>
                                <div className="inf">
                                    <div>
                                        <img src={Logo} alt="" />
                                        <h2>{currentManager.first_name} {currentManager.last_name}<span>{currentManager.role}, Edugately</span></h2>
                                    </div>
                                    <div>
                                        <a href="mailto: educationgateway@gmail.com"><img src={message_icon} alt="" /></a>
                                        <a href={`tel:${currentManager.phone_number}`}><img src={call_icon} alt="" /></a>
                                    </div>
                                </div>
                                <p>{t("p85")} {currentManager.first_name} - {currentManager.last_name}.{t("p86")}</p>
                                <h5>{t("p87")}:<span><a style={{ color: "black" }} href={`tel:${currentManager.phone_number}`}> {currentManager.phone_number}</a></span></h5>
                                <h6> {t("p88")}:<span><a style={{ color: 'black' }} href="mailto:educationgateway@gmail.com">educationgateway@gmail.com</a></span></h6>
                            </div> : <p>{t("p418")}</p>
                    }
                </div>
            </div> */}
            </div>
        </>
    );
}

export default Personal;