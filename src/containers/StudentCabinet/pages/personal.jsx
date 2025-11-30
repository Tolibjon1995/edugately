import React, { Component, useEffect, useState } from 'react';

// import css
import "../../../style/css/personal.css"

// imort icon
import avatar from "../../../assets/icon/Avatar.svg";
import message_icon from "../../../assets/icon/message.svg"
import call_icon from "../../../assets/icon/call.svg"
import StudentSidebar from './SidebarStudent';
import { useSelector } from 'react-redux';
import Axios from '../../../utils/axios';
import Logo from '../../../assets/icon/LogoAsia.jpg'
import Swal from 'sweetalert2';
import Loader from 'react-js-loader'
import { useTranslation } from 'react-i18next';
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
            <StudentSidebar />
            <div className="Personal" style={{width: '82%'}}>
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
            </div>
        </>
    );
}

export default Personal;