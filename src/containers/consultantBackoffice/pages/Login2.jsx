import React, { useState, useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { signUpAction } from "../../../store/actions/authActions";
import logo_education from "../../../assets/icon/Logo_education.svg";
import eye_login from "../../../assets/icon/eye_login.svg";
import "../../../assets/scss/style.css";
import Loader from "react-js-loader";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const phoneRef = useRef();
    const [wiew, setWiew] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        password: "",
    });
    const finalData = {
        phone_number: `+${phoneRef?.current?.value}`,
        password: state.password,
    };

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setState((state) => ({ ...state, [name]: value }));
        },
        [state]
    );
    const submitData = async (e) => {
        e.preventDefault();
        if (!window.navigator.onLine) {
            Swal.fire({
                icon: "warning",
                text: "у вас нет подключения к интернету",
            });
        } else {
            setLoading(true);
            try {
                const res = await axios.post(
                    "https://backend.edugately.com/api/v1/common/token/obtain",
                    finalData
                );
                const { access, refresh, data } = res.data;

                const { role } = data;

                dispatch(
                    signUpAction({ access, refresh, role: data.role, data: data })
                );
                localStorage.setItem("enrolle_user", data?.id);
                if (role.startsWith("u")) {
                    history.push("/univer-backoffice-page");
                } else if (role === "applicant") {
                    history.push("/my-account");
                } else if (role.startsWith("d")) {
                    history.push("/home/main");
                } else if (role.startsWith("m")) {
                    history.push("/m-analitika");
                } else if (role.startsWith("supermanager")) {
                    history.push("/superManager-analitika");
                } else if (role === "accountant") {
                    history.push("/accountant-ticket");
                } else if (role.startsWith("n")) {
                    history.push("/n-glavny");
                } else if (role.startsWith("branch_director")) {
                    history.push("/home/main");
                } else if (role.startsWith("agent")) {
                    history.push("/branchAgentGlavny");
                }
                // else if (role === "supermanager") {
                //   history.push("/m-analitika");
                // }
                else {
                    history.push("/");
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
                const status = error?.response?.status;

                Swal.fire({
                    icon: "error",
                    text: "Активная учетная запись с указанными учетными данными не найдена",
                });
                setLoading(false);
            }
        }
    };

    const { t, i18n } = useTranslation();


    return (
        <div className="avtorizatsiya">
            <div className="container log_con">
                <div className="row justify-content-center"><a className="text-pr section_title mb-2 text-center mt-3" href="/">Edugately</a></div>
                <div className="row h-100">
                    <div className="col-12 col-md-5 d-flex align-items-center justify-content-center">
                        <img className=" d-none d-md-block" src="/assets/log/login.png" alt="login" /></div>
                    <div className="col-12 col-md-7 position-relative">
                        <div className="chiz" />
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2">
                                <form onSubmit={submitData}>
                                    <h2>Sign in to start your session</h2>
                                    <div className="mt-3"><label htmlFor="phone">{t("p87")}</label>
                                        <div className="log_inp">
                                            <input id="phone"
                                                name="phone_number"
                                                ref={phoneRef}
                                                style={{ textIndent: "4px" }}
                                                onChange={handleChange}
                                                type="text" className="log_inp_in" placeholder={`${t('qaytaaloqa2')}`} />
                                                <span>
                                                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" stroke="#B1B9C5" strokeWidth="1.5" strokeLinecap="round">
                                                    </path>
                                                </svg></span></div>
                                    </div>
                                    <div className="mt-3"><label htmlFor="pasword">{t('p392')}</label>
                                        <div className="log_inp">
                                            <input id="pasword" 
                                            onChange={handleChange}
                                            name="password"
                                            type="password" className="log_inp_in" placeholder={`${t('p3922')}`} /><span>
                                            <svg width={22} height={22} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g opacity="0.5">
                                                    <path d="M16.1566 6.80626V5.91251C16.1566 3.16251 14.0941 0.825009 11.4816 0.618759C10.0379 0.481259 8.59414 0.996884 7.52852 1.95938C6.46289 2.92188 5.84414 4.29688 5.84414 5.70626V6.80626C3.85039 7.18438 2.33789 8.93751 2.33789 11.0688V17.2906C2.33789 19.5594 4.19414 21.3813 6.42852 21.3813H15.5035C17.7723 21.3813 19.6285 19.525 19.6285 17.2563V11C19.6629 8.93751 18.1504 7.21876 16.1566 6.80626ZM8.55977 3.09376C9.31602 2.40626 10.3129 2.06251 11.3441 2.16563C13.166 2.33751 14.6098 3.98751 14.6098 5.91251V6.70313H7.39102V5.67188C7.39102 4.70938 7.80352 3.78126 8.55977 3.09376ZM18.116 17.2906C18.116 18.7 16.9473 19.8688 15.5379 19.8688H6.46289C5.05352 19.8688 3.91914 18.7344 3.91914 17.325V11.0688C3.91914 9.52188 5.15664 8.28438 6.70352 8.28438H15.2973C16.8441 8.28438 18.116 9.52188 18.116 11V17.2906Z" fill="#64748B" />
                                                    <path d="M11.0006 11.8594C10.5881 11.8594 10.21 12.2031 10.21 12.65V16.2594C10.21 16.6719 10.5537 17.05 11.0006 17.05C11.4131 17.05 11.7912 16.7063 11.7912 16.2594V12.6156C11.7912 12.2031 11.4131 11.8594 11.0006 11.8594Z" fill="#64748B" />
                                                </g>
                                            </svg></span></div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="form-check align-items-center">
                                            <input name="rememberMe" value="rememberMe" className="form-check-input" type="checkbox" id="flexCheckDefault" defaultValue /><label className="form-check-label ms-2" htmlFor="flexCheckDefault">{t('part44')}</label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 py-3 mt-5">{t('p390')}</button>

                                </form>
                            </div>
                            <div className="col-8 offset-2 mt-3">
                                <a className="d-block text-pr" href="forgotPass.html"> {t('p394')}</a>
                                <NavLink className="d-block text-pr" to="/registration">{t('part5')}</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div className="Login">
        //   <div className="background_login"></div>
        //   <div className="background_login"></div>
        //   <div className="container">
        //     <Link to="/" className="title">
        //       {/* <img className="log-img" src={logo_education} alt="" /> */}
        //       <span className="log-img"></span>
        //       <h2>Edugately</h2>
        //     </Link>
        //     <div className="block">
        //       <form onSubmit={submitData} className="blockBox">
        //         <h3>{t("p390")}</h3>
        //         <div className="loginInput">
        //           <p>{t("p391")}</p>
        //           <div style={{ position: "relative" }}>
        //             <span
        //               style={{
        //                 position: "absolute",
        //                 top: "16px",
        //                 left: "8px",
        //                 fontSize: "25px",
        //                 color: "#00587f",
        //               }}
        //             >
        //               +
        //             </span>
        //             <input
        //               ref={phoneRef}
        //               defaultValue="998"
        //               style={{ textIndent: "4px" }}
        //               onChange={handleChange}
        //               type="phone"
        //               name="phone_number"
        //               placeholder=""
        //               required
        //             />
        //           </div>
        //         </div>
        //         <div className="loginInput">
        //           <p>{t("p392")}</p>
        //           <div>
        //             <input
        //               onChange={handleChange}
        //               name="password"
        //               type={wiew === false ? "password" : "text"}
        //               required
        //             />
        //             <img
        //               src={eye_login}
        //               alt=""
        //               onClick={() => {
        //                 setWiew(!wiew);
        //               }}
        //             />
        //           </div>
        //         </div>
        //         <div className="loginRemberMe">
        //           <label className="custom-checkbox">
        //             <input type="checkbox" name="rememberMe" value="rememberMe" />
        //             <span></span>
        //             <p>{t("p393")}</p>
        //           </label>
        //           <p>
        //             {t("p394")} <Link to="/loginStaff"> {t("p395")}</Link>
        //           </p>
        //         </div>
        //         <h4 style={{ color: "red", margin: "auto" }}>{errorMsg}</h4>
        //         <button type="submit">
        //           {loading ? (
        //             <>
        //               <Loader
        //                 type="spinner-circle"
        //                 bgColor={"#FFFFFF"}
        //                 color={"#FFFFFF"}
        //                 size={75}
        //               />
        //             </>
        //           ) : (
        //             t("p390")
        //           )}
        //         </button>
        //         <div className="forgetPass">
        //           <p>
        //             {" "}
        //             {t("p396")} <Link to="/registration"> {t("p397")}</Link>
        //           </p>
        //         </div>
        //       </form>
        //     </div>
        //   </div>
        // </div>
    );
}

export default Login;
