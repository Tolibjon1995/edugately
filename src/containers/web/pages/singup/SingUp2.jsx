import React, {
    Component,
    useState,
    useCallback,
    useRef,
    useEffect,
} from "react";
import axios from "axios";
import { Link, NavLink, useHistory } from "react-router-dom";
import view from "../../../../assets/icon/view.svg";
import check from "../../../../assets/icon/checked.svg";
import "../../../../style/css/singup.css";
import Axios from "../../../../utils/axios";
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import Loader from "react-js-loader";
import { useDispatch } from "react-redux";
import { signUpAction } from "../../../../store/actions/authActions";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

function SingUp() {
    const dispatch = useDispatch();
    const history = useHistory();
    const inputRef = useRef();
    const buttonRef = useRef();
    const statsuRef = useRef();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState(true);
    const [length, setLength] = useState();
    const [status, setStatus] = useState("");
    const [loginData, setLoginData] = useState({
        phone_number: "",
        password_1: "",
        first_name: "",
        passport_number: "",
        password_2: "",
    });
    const phoneRef = useRef()
    const { t, i18n } = useTranslation()
    const referral = localStorage.getItem('referral')
    const referral2 = localStorage.getItem('referral2')
    const handleInputChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setLoginData((state) => ({ ...state, [name]: value }));
            if (name === "password_1" && !value.length) {
                setStatus("error");
                setLength(0);
            } else if (name === "password_1" && value.length < 2) {
                setStatus("error");
                setLength(12.5);
            } else if (name === "password_1" && value.length < 3) {
                setStatus("error");
                setLength(25);
            } else if (name === "password_1" && value.length < 4) {
                setStatus("error");
                setLength(37.5);
            } else if (name === "password_1" && value.length < 5) {
                setStatus("error");
                setLength(50);
            } else if (name === "password_1" && value.length < 6) {
                setStatus("error");
                setLength(62.5);
            } else if (name === "password_1" && value.length < 8) {
                const { current } = inputRef;
                current.style = "background:red";
                setStatus("error");
                setLength(75);
            } else if (name === "password_1" && value.length === 8) {
                setStatus("success");
                setLength(100);
            }
        },
        [loginData]
    );

    const finalData = {
        phone_number: `+${phoneRef?.current?.value}`,
        password_1: loginData.password_1,
        password_2: loginData.password_2,
        first_name: loginData.first_name,
        referral_university: referral2,
        referral: referral,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(
                "https://backend.edugately.com/api/v1/applicant/register_1/",
                Object.assign(finalData)
            );
            const { status } = res;
            const { data } = res;
            if (status == 201) {
                dispatch(signUpAction({ data: data }));
                localStorage.setItem("profile", JSON.stringify(data));
                localStorage.setItem("enrolle_user", data?.id);
                localStorage.removeItem("referral");
                Swal.fire({
                    icon: "success",
                    text: "Успешно зарегистрирован",
                    showCancelButton: false,
                }).then(() => {
                    axios
                        .post("https://backend.edugately.com/api/v1/common/token/obtain", {
                            phone_number: `${finalData.phone_number}`,
                            password: `${finalData.password_1}`,
                        })
                        .then((res) => {
                            const { refresh, access } = res.data;
                            localStorage.setItem("acces", access);
                            localStorage.setItem("refresh", refresh);
                        })
                        .then(() => history.push("/my-account"));
                });
            }
            setLoading(false);
        } catch (err) {
            const { status } = err?.response;
            if (status == 500) {
                Swal.fire({
                    icon: "error",
                    text: "Внутренняя ошибка сервера, попробуйте позже",
                });
            }
            if (status == 400) {
                const { data } = err?.response;
                if (data?.passport_number) {
                    Swal.fire({
                        icon: "error",
                        text: "Этот паспорт зарегистрирован",
                    });
                } else if (data?.passport_given_date) {
                    Swal.fire({
                        icon: "error",
                        text: "в паспорте указана дата в неправильном формате",
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "Пожалуйста, введите действительный номер",
                    });
                }
            }
            if (status == 409) {
                Swal.fire({
                    icon: "error",
                    text: "Этот номер уже зарегистрирован",
                });
            }
            setLoading(false);
        }

    };




    useEffect(() => {
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);
    return (
        <div className="avtorizatsiya">
            <div className="container log_con">
                <div className="row justify-content-center"><a className="text-pr section_title mb-2 text-center mt-3" href="/">Edugately</a></div>
                <div className="row h-100">
                    <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
                        <img className=" d-none d-md-block" src="/assets/log/login.png" alt="login" /></div>
                    <div className="col-12 col-md-7  form position-relative">
                        <div className="chiz" />
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2">
                                <form onSubmit={handleSubmit}>
                                    <h2>{t('plog')}</h2>
                                    <div className="mt-3"><label htmlFor="name">{t('p2302')}</label>
                                        <div className="log_inp">
                                            <input id="name" onChange={handleInputChange} name="first_name" type="text" className="log_inp_in" placeholder="Azizova Nafisa" /><span><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="10.0003" cy="4.99996" r="3.33333" stroke="#8390A2" strokeWidth="1.5" />
                                                <path d="M16.6663 14.5834C16.6663 16.6544 16.6663 18.3334 9.99967 18.3334C3.33301 18.3334 3.33301 16.6544 3.33301 14.5834C3.33301 12.5123 6.31778 10.8334 9.99967 10.8334C13.6816 10.8334 16.6663 12.5123 16.6663 14.5834Z" stroke="#8390A2" strokeWidth="1.5" />
                                            </svg></span></div>
                                    </div>
                                    <div className="mt-3"><label htmlFor="phone">{t('p391')}</label>
                                        <div className="log_inp">
                                            <input id="phone"
                                                ref={phoneRef}

                                                style={{ textIndent: '11px' }}
                                                type="tel"
                                                onChange={handleInputChange}
                                                name="phone_number"
                                                required
                                                className="log_inp_in" placeholder={`${t('qaytaaloqa2')}`} /><span><svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" stroke="#B1B9C5" strokeWidth="1.5" strokeLinecap="round">
                                                    </path>
                                                </svg></span>
                                        </div>
                                    </div>
                                    <div className="mt-3"><label htmlFor="password1">{t('p392')}</label>
                                        <div className="log_inp">
                                            <input id="password1"
                                                onChange={handleInputChange}
                                                name="password_1"
                                                required

                                                ref={inputRef}
                                                type={type ? "password" : "text"}
                                                className="log_inp_in" placeholder={`${t('p3922')}`} /><span><svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.5">
                                                        <path d="M16.1566 6.80626V5.91251C16.1566 3.16251 14.0941 0.825009 11.4816 0.618759C10.0379 0.481259 8.59414 0.996884 7.52852 1.95938C6.46289 2.92188 5.84414 4.29688 5.84414 5.70626V6.80626C3.85039 7.18438 2.33789 8.93751 2.33789 11.0688V17.2906C2.33789 19.5594 4.19414 21.3813 6.42852 21.3813H15.5035C17.7723 21.3813 19.6285 19.525 19.6285 17.2563V11C19.6629 8.93751 18.1504 7.21876 16.1566 6.80626ZM8.55977 3.09376C9.31602 2.40626 10.3129 2.06251 11.3441 2.16563C13.166 2.33751 14.6098 3.98751 14.6098 5.91251V6.70313H7.39102V5.67188C7.39102 4.70938 7.80352 3.78126 8.55977 3.09376ZM18.116 17.2906C18.116 18.7 16.9473 19.8688 15.5379 19.8688H6.46289C5.05352 19.8688 3.91914 18.7344 3.91914 17.325V11.0688C3.91914 9.52188 5.15664 8.28438 6.70352 8.28438H15.2973C16.8441 8.28438 18.116 9.52188 18.116 11V17.2906Z" fill="#64748B" />
                                                        <path d="M11.0006 11.8594C10.5881 11.8594 10.21 12.2031 10.21 12.65V16.2594C10.21 16.6719 10.5537 17.05 11.0006 17.05C11.4131 17.05 11.7912 16.7063 11.7912 16.2594V12.6156C11.7912 12.2031 11.4131 11.8594 11.0006 11.8594Z" fill="#64748B" />
                                                    </g>
                                                </svg></span></div>
                                    </div>
                                    <div className="mt-3"><label htmlFor="password2">{t('p39223')}</label>
                                        <div className="log_inp">
                                            <input
                                                onChange={handleInputChange}
                                                type="password"
                                                name="password_2"
                                                required
                                                id="password2" className="log_inp_in" placeholder={`${t('p3922')}`} /><span><svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g opacity="0.5">
                                                        <path d="M16.1566 6.80626V5.91251C16.1566 3.16251 14.0941 0.825009 11.4816 0.618759C10.0379 0.481259 8.59414 0.996884 7.52852 1.95938C6.46289 2.92188 5.84414 4.29688 5.84414 5.70626V6.80626C3.85039 7.18438 2.33789 8.93751 2.33789 11.0688V17.2906C2.33789 19.5594 4.19414 21.3813 6.42852 21.3813H15.5035C17.7723 21.3813 19.6285 19.525 19.6285 17.2563V11C19.6629 8.93751 18.1504 7.21876 16.1566 6.80626ZM8.55977 3.09376C9.31602 2.40626 10.3129 2.06251 11.3441 2.16563C13.166 2.33751 14.6098 3.98751 14.6098 5.91251V6.70313H7.39102V5.67188C7.39102 4.70938 7.80352 3.78126 8.55977 3.09376ZM18.116 17.2906C18.116 18.7 16.9473 19.8688 15.5379 19.8688H6.46289C5.05352 19.8688 3.91914 18.7344 3.91914 17.325V11.0688C3.91914 9.52188 5.15664 8.28438 6.70352 8.28438H15.2973C16.8441 8.28438 18.116 9.52188 18.116 11V17.2906Z" fill="#64748B" />
                                                        <path d="M11.0006 11.8594C10.5881 11.8594 10.21 12.2031 10.21 12.65V16.2594C10.21 16.6719 10.5537 17.05 11.0006 17.05C11.4131 17.05 11.7912 16.7063 11.7912 16.2594V12.6156C11.7912 12.2031 11.4131 11.8594 11.0006 11.8594Z" fill="#64748B" />
                                                    </g>
                                                </svg></span></div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="form-check align-items-center"><input className="form-check-input" type="checkbox" id="flexCheckDefault" defaultValue /><label className="form-check-label ms-2" htmlFor="flexCheckDefault">{t('p393')}</label>
                                        </div>
                                    </div><button className="btn btn-primary w-100 py-3 mt-5">{t('p397')}</button>

                                </form>
                            </div>
                            <div className="col-8 offset-2 mt-3"><a className="d-block text-pr" href="forgotPass.html"> {t('p394')}</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default SingUp;
