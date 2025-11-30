import React, { useEffect, useMemo, useState } from "react";
import StudentSidebar from "./StudentSidebar2.jsx";
import Loader from "react-js-loader";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// import css
import "../../../assets/scss/style.css";
// import icon
import avatar from "../../../assets/icon/Avatar.svg";
import StudentCabinet from "../studentCabinet";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios.js";
import { updateLanguageAction } from "../../../store/actions/langAction.js";
import { useDispatch } from "react-redux";
import Headerst from './Headerst'
const Kabinet = () => {
    const { t, i18n } = useTranslation();
    const [invoiceConfirm, setInvoiceConfirm] = useState();
    const [userInfo, setUserInfo] = useState({})
    const [progress, setProgress] = useState(0);
    const univerId = JSON.parse(localStorage.getItem("univerId"));
    const userId = JSON.parse(localStorage.getItem("enrolle_user"));
    const files = JSON.parse(localStorage.getItem("files"));
    const profile3 = JSON.parse(localStorage.getItem("profile3"));
    const payment = JSON.parse(localStorage.getItem("payment"));
    const history = useHistory();
    const [myStep, setMyStep] = useState();
    const [currentStep, setCurrentStep] = useState();
    const selector = useSelector((state) => state);
    const { lastStep } = selector.dataSave;
    // const data = selector?.updateInfo?.data;
    // const { first_name, last_name } = data;
    const dispatch = useDispatch()
    const changeLanguage = (e) => {
        const languageValue = e.target.value;
        dispatch(updateLanguageAction({ languageValue }))
        i18n.changeLanguage(languageValue);
    };

    const fetchPaymentConfirm = async () => {
        try {
            const res = await Axios.get("/applicant/me/");
            const { data, status } = res;
            const { invoice_confirmed, step } = data;
            ;
            if (status == 200) {
                setUserInfo(data)
                setMyStep(step);
                setInvoiceConfirm(invoice_confirmed);
            }
        } catch (error) {
            ;
        }
    };

    const fetchCurrentStep = async () => {
        try {
            const res = await Axios.get("/applicant/profile/step/");
            const { status, data } = res;
            const { step } = data;
            if (status === 200) {
                setCurrentStep(step);

            }
        } catch (error) {
            ;
        }
    };

    const step = [
        {
            name: 'Roʻyxatdan oʻtish',
            step2: 'registered'
        },
        {
            name: 'Universitetni tanlang',
            step2: 'university_chose'
        },
        {
            name: 'Arizani to\'ldiring',
            step2: 'data_entry'
        },
        {
            name: 'Hujjatlarni topshirish',
            step2: 'document_upload'
        },
        {
            name: 'Xizmat pullik',
            step2: 'payment'
        },
    ]



    useEffect(() => {
        fetchCurrentStep();

        fetchPaymentConfirm();
    }, []);

    return (
        <>
            <div className="studentKabinet" style={{ width: '100vw' }}>
                <StudentSidebar />

                <div className="mobileHeader">
                    <div className="header-icons">
                        <div className="hambur" onclick="showSidebar()">
                            {/* <img src="/assets/studentImgs/Hamburger Menu.png" alt="="> */}
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
                            {/* <img src="/assets/studentImgs/Phone Calling Rounded.png" alt=""></a> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width={34} height={34} viewBox="0 0 34 34" fill="none">
                                <path d="M19.8335 2.83301C19.8335 2.83301 22.9502 3.11634 26.9168 7.08301C30.8835 11.0497 31.1668 14.1663 31.1668 14.1663" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M20.1265 7.8418C20.1265 7.8418 21.5289 8.24249 23.6325 10.3461C25.7362 12.4498 26.1369 13.8522 26.1369 13.8522" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M14.2198 7.53157L15.1392 9.17905C15.9689 10.6658 15.6358 12.6162 14.329 13.923C14.329 13.923 14.329 13.923 14.329 13.923C14.3289 13.9232 12.744 15.5083 15.6179 18.3823C18.4912 21.2555 20.0763 19.672 20.0771 19.6712C20.0771 19.6711 20.0771 19.6711 20.0772 19.6711C21.384 18.3643 23.3344 18.0312 24.8211 18.861L26.4686 19.7804C28.7136 21.0333 28.9788 24.1818 27.0054 26.1551C25.8197 27.3409 24.3671 28.2635 22.7613 28.3244C20.0581 28.4269 15.4674 27.7427 10.8624 23.1377C6.25743 18.5328 5.57331 13.9421 5.67579 11.2389C5.73666 9.63309 6.65931 8.18049 7.84506 6.99474C9.81841 5.02139 12.9668 5.28653 14.2198 7.53157Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </a>
                    </div>
                </div>
                <Headerst/>
                <div className="sub-header" id="sub-header">
                    <div className="chooseUniver">

                        <div className="checkbuttons">
                            <ul className="step-wizard-list">
                                <li className="step-wizard-item">
                                    <span className={`progress-count ${currentStep == 'registered' ? 'current-item' : ''}`}>
                                        <div className="dot" />
                                    </span>
                                    <span className="progress-label">Roʻyxatdan oʻtish</span>
                                </li>
                                <li className="step-wizard-item">
                                    <span className={`progress-count ${currentStep == 'university_chose' ? 'current-item' : ''}`}>
                                        <div className="dot" />
                                    </span>
                                    <span className="progress-label">Universitetni tanlang</span>
                                </li>
                                <li className="step-wizard-item ">
                                    <span className={`progress-count ${currentStep == 'data_entry' ? 'current-item' : ''}`}>
                                        <div className="dot" />
                                    </span>
                                    <span className="progress-label">Arizani to'ldiring</span>
                                </li>
                                <li className="step-wizard-item">
                                    <span className={`progress-count ${currentStep == 'document_upload' ? 'current-item' : ''}`}>
                                        <div className="dot" />
                                    </span>
                                    <span className="progress-label">Hujjatlarni topshirish</span>
                                </li>
                                <li className="step-wizard-item">
                                    <span className={`progress-count ${currentStep == 'payment' ? 'current-item' : ''}`}>
                                        <div className="dot" />
                                    </span>
                                    <span className="progress-label">Xizmat pullik</span>
                                </li>
                            </ul>
                        </div>
                        <div className="table-div">
                            <div className="text-top">
                                {t("p67")}
                            </div>
                            <div className="table-ul">
                                <ul>
                                    <li>1. {t("p68")}</li>
                                    <li>2. {t("p69")}</li>
                                    <li>3. {t("p70")} </li>
                                    <li>4. {t("p71")} </li>
                                    <li>5. {t("p72")} </li>
                                    <li>6. {t("p73")} </li>
                                    <li>7. {t("p74")} </li>
                                    <li>8. {t("p75")} </li>
                                    <li>9. {t("p76")} </li>
                                    <li>10.{t("p77")} </li>
                                </ul>
                            </div>
                            <div className="button-div">
                                {myStep === "payment_confirmation" ? (
                                    <h1>{t("p83")}</h1>
                                ) : myStep === "completed" ||
                                    myStep === "university" ||
                                    myStep === "электронный дагавор" ||
                                    currentStep === "data_entry" ? (
                                    ""
                                ) : (
                                    <>
                                        <button
                                            style={
                                                myStep === "registered" ? {} : { display: "none" }
                                            }
                                            onClick={() => history.push("/universities")}
                                        >
                                            {" "}
                                            {t("part37")}{" "}
                                        </button>
                                        <button
                                            style={
                                                myStep === "profile_filled" ? {} : { display: "none" }
                                            }
                                            onClick={() => history.push("/payment-transaction")}
                                        >
                                            {" "}
                                            {t('p491')}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* <div className="info">
                            <div className="data-filling">
                                <div className="example-btn"><button>Tez misol</button></div>
                                <div className="inputs-ul">
                                    <ul>
                                        <li>
                                            <span>E-pochta manzili</span>
                                            <div className="input-group input-group-lg">
                                                <input placeholder="E-pochta manzili" type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                                            </div>
                                        </li>
                                        <li>
                                            <span>Parol</span>
                                            <div className="input-group input-group-lg">
                                                <input placeholder="Parol" type="text" className="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                                            </div>
                                        </li>
                                        <li>
                                            <span>Fayl kiritish</span>
                                            <div className="upload-div w-100 justify-content-between input-group input-group-lg">
                                                <input id="upload" type="file" className="d-none form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" /><label htmlFor="upload" className="upload-label"><span>Faylni
                                                    tanlang</span></label>
                                                <div className="two-buttons">
                                                    <button className="browse">Ko‘rib chiqish</button><button className="upload">Yuklash</button>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" defaultValue /><label className="form-check-label" htmlFor="flexCheckDefault">Ro'yxatdan o'chirilish</label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="buttons">
                                    <div className="upload-btn">
                                        <input type="file" id="upload" className="d-none" /><label htmlFor="upload" className="button upload-label"><svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                                            <path d="M18.5936 13.1253C18.5936 12.5213 18.1039 12.0316 17.4998 12.0316C16.8958 12.0316 16.4061 12.5213 16.4061 13.1253L16.4061 16.4066H13.1248C12.5208 16.4066 12.0311 16.8963 12.0311 17.5004C12.0311 18.1044 12.5208 18.5941 13.1248 18.5941H16.4061V21.8753C16.4061 22.4794 16.8958 22.9691 17.4998 22.9691C18.1039 22.9691 18.5936 22.4794 18.5936 21.8753L18.5936 18.5941H21.8748C22.4789 18.5941 22.9686 18.1044 22.9686 17.5004C22.9686 16.8963 22.4789 16.4066 21.8748 16.4066H18.5936V13.1253Z" fill="white" />
                                            <path fillRule="evenodd" clipRule="evenodd" d="M17.4998 1.82324C8.84162 1.82324 1.82275 8.84211 1.82275 17.5003C1.82275 26.1585 8.84162 33.1774 17.4998 33.1774C26.1581 33.1774 33.1769 26.1585 33.1769 17.5003C33.1769 8.84211 26.1581 1.82324 17.4998 1.82324ZM4.01025 17.5003C4.01025 10.0502 10.0497 4.01074 17.4998 4.01074C24.9499 4.01074 30.9894 10.0502 30.9894 17.5003C30.9894 24.9504 24.9499 30.9899 17.4998 30.9899C10.0497 30.9899 4.01025 24.9504 4.01025 17.5003Z" fill="white" />
                                        </svg><span>Fayllarni qo'shish</span></label><a className="button download" href="#"><svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M17.4998 1.82324C18.1039 1.82324 18.5936 2.31293 18.5936 2.91699V11.9431L21.1014 9.43526C21.5286 9.00812 22.2211 9.00812 22.6482 9.43526C23.0754 9.8624 23.0754 10.5549 22.6482 10.9821L18.2732 15.3571C17.8461 15.7842 17.1536 15.7842 16.7264 15.3571L12.3514 10.9821C11.9243 10.5549 11.9243 9.8624 12.3514 9.43526C12.7786 9.00812 13.4711 9.00812 13.8982 9.43526L16.4061 11.9431V2.91699C16.4061 2.31293 16.8958 1.82324 17.4998 1.82324ZM23.703 2.99506C23.7621 2.3939 24.2974 1.9545 24.8986 2.01364C27.3644 2.25618 29.2652 2.82368 30.7209 4.2794C32.0258 5.58433 32.6169 7.24687 32.9002 9.35377C33.177 11.4122 33.1769 14.0504 33.1769 17.4168V17.5841C33.1769 18.0426 33.1769 18.4876 33.1762 18.9194C33.1767 18.9324 33.1769 18.9455 33.1769 18.9587C33.1769 18.9731 33.1766 18.9875 33.1761 19.0017C33.1711 21.7027 33.1369 23.8869 32.9002 25.6471C32.6169 27.754 32.0258 29.4166 30.7209 30.7215C29.416 32.0264 27.7534 32.6176 25.6465 32.9008C23.5881 33.1776 20.9499 33.1776 17.5835 33.1775H17.4162C14.0498 33.1776 11.4116 33.1776 9.35316 32.9008C7.24625 32.6176 5.58372 32.0264 4.27879 30.7215C2.97386 29.4166 2.38273 27.754 2.09947 25.6471C1.86281 23.8869 1.82854 21.7027 1.82359 19.0017C1.82303 18.9875 1.82275 18.9731 1.82275 18.9587C1.82275 18.9455 1.82299 18.9324 1.82345 18.9194C1.82275 18.4876 1.82275 18.0426 1.82275 17.5841V17.4168C1.82274 14.0504 1.82272 11.4122 2.09947 9.35377C2.38273 7.24687 2.97386 5.58433 4.27879 4.2794C5.73451 2.82368 7.63522 2.25618 10.1011 2.01364C10.7023 1.9545 11.2375 2.3939 11.2967 2.99506C11.3558 3.59623 10.9164 4.1315 10.3152 4.19063C8.04112 4.41432 6.75125 4.90053 5.82558 5.8262C4.99483 6.65695 4.51811 7.78091 4.26746 9.64525C4.01258 11.5411 4.01025 14.0322 4.01025 17.5005C4.01025 17.6232 4.01026 17.7446 4.01027 17.8649H7.52522C7.59128 17.8649 7.65654 17.8648 7.72104 17.8648C8.84762 17.8636 9.73984 17.8626 10.5425 18.2318C11.3451 18.601 11.925 19.279 12.6573 20.1351C12.6992 20.1842 12.7417 20.2337 12.7847 20.2839L13.6676 21.314C14.5918 22.3922 14.8512 22.6589 15.1629 22.8023C15.4747 22.9457 15.846 22.9691 17.2661 22.9691H17.7335C19.1537 22.9691 19.525 22.9457 19.8367 22.8023C20.1485 22.6589 20.4079 22.3922 21.3321 21.314L22.215 20.2839C22.258 20.2337 22.3004 20.1841 22.3424 20.1351C23.0746 19.279 23.6546 18.601 24.4572 18.2318C25.2598 17.8626 26.1521 17.8636 27.2786 17.8648C27.3431 17.8648 27.4084 17.8649 27.4745 17.8649H30.9894C30.9894 17.7446 30.9894 17.6232 30.9894 17.5005C30.9894 14.0322 30.9871 11.5411 30.7322 9.64525C30.4816 7.78091 30.0048 6.65695 29.1741 5.8262C28.2484 4.90053 26.9586 4.41432 24.6844 4.19063C24.0833 4.1315 23.6439 3.59623 23.703 2.99506ZM30.9843 20.0524H27.4745C26.0543 20.0524 25.683 20.0758 25.3713 20.2192C25.0595 20.3626 24.8001 20.6293 23.8759 21.7075L22.993 22.7376C22.95 22.7877 22.9076 22.8373 22.8656 22.8864C22.1334 23.7425 21.5534 24.4205 20.7508 24.7897C19.9482 25.1588 19.0559 25.1579 17.9294 25.1567C17.8649 25.1566 17.7996 25.1566 17.7335 25.1566H17.2661C17.2001 25.1566 17.1348 25.1566 17.0703 25.1567C15.9437 25.1579 15.0515 25.1588 14.2489 24.7897C13.4462 24.4205 12.8663 23.7425 12.134 22.8863C12.0921 22.8373 12.0497 22.7877 12.0067 22.7376L11.1238 21.7075C10.1996 20.6293 9.94015 20.3626 9.62841 20.2192C9.31667 20.0758 8.94535 20.0524 7.52522 20.0524H4.01536C4.02912 22.2438 4.07993 23.9608 4.26746 25.3557C4.51811 27.22 4.99483 28.344 5.82558 29.1747C6.65633 30.0055 7.7803 30.4822 9.64464 30.7328C11.5404 30.9877 14.0316 30.99 17.4998 30.99C20.9681 30.99 23.4592 30.9877 25.355 30.7328C27.2194 30.4822 28.3433 30.0055 29.1741 29.1747C30.0048 28.344 30.4816 27.22 30.7322 25.3557C30.9197 23.9608 30.9706 22.2438 30.9843 20.0524Z" fill="white" />
                                        </svg><span>Yuklashni boshlang</span></a><button className="button cancel-btn">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                                                <path d="M18.5936 13.1253C18.5936 12.5213 18.1039 12.0316 17.4998 12.0316C16.8958 12.0316 16.4061 12.5213 16.4061 13.1253L16.4061 16.4066H13.1248C12.5208 16.4066 12.0311 16.8963 12.0311 17.5004C12.0311 18.1044 12.5208 18.5941 13.1248 18.5941H16.4061V21.8753C16.4061 22.4794 16.8958 22.9691 17.4998 22.9691C18.1039 22.9691 18.5936 22.4794 18.5936 21.8753L18.5936 18.5941H21.8748C22.4789 18.5941 22.9686 18.1044 22.9686 17.5004C22.9686 16.8963 22.4789 16.4066 21.8748 16.4066H18.5936V13.1253Z" fill="white" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M17.4998 1.82324C8.84162 1.82324 1.82275 8.84211 1.82275 17.5003C1.82275 26.1585 8.84162 33.1774 17.4998 33.1774C26.1581 33.1774 33.1769 26.1585 33.1769 17.5003C33.1769 8.84211 26.1581 1.82324 17.4998 1.82324ZM4.01025 17.5003C4.01025 10.0502 10.0497 4.01074 17.4998 4.01074C24.9499 4.01074 30.9894 10.0502 30.9894 17.5003C30.9894 24.9504 24.9499 30.9899 17.4998 30.9899C10.0497 30.9899 4.01025 24.9504 4.01025 17.5003Z" fill="white" />
                                            </svg><span>Yuklashni bekor qilish</span>
                                        </button>
                                    </div>
                                    <button className="confirm-btn">Tasdiqlang</button>
                                </div>
                            </div>
                        </div> */}
                        <br />
                    </div>
                </div>
            </div>

        </>
    );
};

export default Kabinet;

