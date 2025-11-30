import React, {
  Component,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { NavLink, useHistory } from "react-router-dom";

import "../../../../style/css/singup.css";
import styled from "styled-components";
import InputErrorMsg from "./inputErrorMsg";
import Axios from "../../../../utils/axios";
import "react-sweet-progress/lib/style.css";
import Loader from "react-js-loader";
import { useDispatch } from "react-redux";

import {
  signUpAction,
  updateInfo,
} from "../../../../store/actions/authActions";
import Swal from "sweetalert2";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import close from "../../../../assets/icon/close-red.svg";
import axios from "axios";


function SignUpComplete() {
  // const userId = JSON.parse(localStorage.getItem("enrolle_user"));
  // let test = document.getElementById('label2');
  // let test2 = document.getElementById('label');
  // const [openx, setOpenx] = React.useState(false);
  // const handleClosex = () => {
  //   setOpenx(false);
  //   test.checked = false;
  //   setValue2(false);
  // };

  // const [value2, setValue2] = useState(false);

  // if((test.checked !== true) && (test2.checked !== true)){
  //   test.checked = true
  // }
  // else if (test.checked === true) {
  //   test2.checked = false;
  // } else if (test2.checked == true) {
  //   test.checked = false;
  // }else{
  //   test2.checked = true;
  // }

  // const handlechange = () => {
  //   console.log(test.checked);
  //   console.log(test2.checked);
  //   console.log(value);
  //   console.log(value2);
  // };

  const dispatch = useDispatch();
  const history = useHistory();
  const [region, setRegion] = useState();
  const inputRef = useRef();
  const buttonRef = useRef();
  const statsuRef = useRef();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(true);
  const [error, setError] = useState("");
  const [countries, setCountry] = useState();
  const [countriess, setSountry] = useState();
  const [citiess, setCities] = useState([]);
  const [length, setLength] = useState();
  const [status, setStatus] = useState("");
  const [phone, setPhone] = useState();
  const [value, setValue] = useState(false);


  const [loginData, setLoginData] = useState({
    first_name: "",
    phone_number: "",
    last_name: "",
    middle_name: "",
    password_1: "",
    passport_number: "",
    passport_given_date: "",
    password_2: "",
    birthday: "",
    address: "",
    passport_given_by: "",
    gender: "",
    email: "",
    email_password: "",
  });
  const { t, i18next } = useTranslation();
  const phoneRef = useRef();
  const referral = localStorage.getItem("referral");
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

  const fetchCountries = async () => {
    try {
      const res = await Axios.get("/common/country/all/");
      const { status, data } = res;
      const { results } = res?.data;
      if (status === 200) {
        setSountry(data);
      }
    } catch (error) { }
  };
  const handleRegion = (event, newValue) => {
    setRegion(newValue);
  };
  const handleCountry = (event, newValue) => {
    setCountry(newValue);
  };
  const id1 = countries?.id;
  const id2 = region?.id;

  const fetchCities = async () => {
    if (!id1) return;
    try {
      const res = await Axios.get(`/common/country/${id1}/`);
      const { status, data } = res;
      const { cities } = data;
      if (status == 200) {
        setCities(cities);
      }
    } catch (error) { }
  };
  const finalData = {
    first_name: loginData.first_name,
    last_name: loginData.last_name,
    middle_name: loginData.middle_name,
    birthday: loginData.birthday,
    // agree_with_agreement: value,
    address: loginData.address,
    citizenship: id1,
    passport_number: loginData.passport_number,
    city: id2,
    passport_given_by: loginData.passport_given_by,
    passport_given_date: loginData.passport_given_date,
    gender: loginData.gender,
    email: loginData.email,
    email_password: loginData.email_password,
  };
  // const formData = {
  //   agree_with_agreement_monthly: value2,
  //   agree_with_agreement: value
  // };

  // const rasrochka =()=>{
  //   console.log(formData);
  //   try{
  //     const data =  Axios.put(`/applicant/profile/${userId}/`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     const { status } = data;
  //     if (status == 200) {
  //       Swal.fire({
  //         icon: "success",
  //         text: "Mudatli to'lov shartnomasi",
  //         showCancelButton: false,
  //       })
  //     }
  //   }catch{
  //     console.log(error);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      const res = await Axios.patch("/applicant/me/", finalData);

      const { status } = res;
      const { data } = res;
      if (status == 200) {
        dispatch(updateInfo({ data: data }));
        // rasrochka();
        localStorage.setItem("profile", JSON.stringify(data));
        localStorage.removeItem("referral");
        Swal.fire({
          icon: "success",
          text: "Успешно зарегистрирован",
          showCancelButton: false,
        }).then(() => history.push("/requisition"));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      const status = err?.response?.status;
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
    fetchCities();
  }, [countries]);
  useEffect(() => {
    fetchCountries();
    return () => {
      window.scrollTo(0, 0);
    };
  }, []);
  return (
    <React.Fragment>
      <div className="navRegist">{/* <Navbar /> */}</div>
      <div className="singup_asos container">
        <form onSubmit={handleSubmit} className="main_singup">
          <h1>{t("p78")}</h1>
          <div className="container_login">

            <div className="col_6_login">
              <div className="form_div">
                <p>{t("p501")} </p>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="last_name"
                  placeholder={t("p501")}
                  required
                />

                <InputErrorMsg type="last_name" errorObj={error} />
              </div>
              
              <div className="form_div">
                <p>{t("p502")}</p>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="middle_name"
                  placeholder={t("p502")}
                  required
                />
                <InputErrorMsg type="first_name" errorObj={error} />
              </div>
              <div className="form_div">
                <p>{t("p506")}</p>
                <input
                  onChange={handleInputChange}
                  type="date"
                  name="birthday"
                  placeholder="24.06.2002"
                  required
                />
                <InputErrorMsg type="last_name" errorObj={error} />
              </div>
              <div className="form_div">
                <p>{t("p503")}</p>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="passport_number"
                  placeholder="AA0000"
                  required
                />
              </div>
              <div className="form_div">
                <p>{t("p504")}</p>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="passport_given_by"
                  placeholder={t("p504")}
                  required
                />
              </div>
              <div className="form_div">
                <p>{t("p505")}</p>
                <input
                  onChange={handleInputChange}
                  type="date"
                  name="passport_given_date"
                  placeholder={t("p505")}
                  required
                />
              </div>
            </div>
            <div className="col_6_login">
              
            <div className="form_div">
                <p>{t("p500")}</p>
                <input
                  onChange={handleInputChange}
                  type="text"
                  name="first_name"
                  placeholder={t("p500")}
                  required
                />

                <InputErrorMsg type="last_name" errorObj={error} />
              </div>
              <div className="form_div">
                <p>{t("p507")}</p>
                <Autocomplete
                  aria-required
                  onChange={handleCountry}
                  id="profayl_input"
                  options={countriess}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  style={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                />
              </div>
              <div className="form_div">
                <p>{t("p508")}</p>
                <Autocomplete
                  aria-required
                  onChange={handleRegion}
                  id="profayl_input"
                  options={citiess}
                  getOptionLabel={(option) => (option ? option.name : "")}
                  style={{ width: '100%' }}
                  renderInput={(params) => (
                    <TextField {...params} label="" variant="outlined" />
                  )}
                />
              </div>
              <div className="form_div">
                <p>{t("p509")}</p>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="address"
                  placeholder="address"
                  required
                />
              </div>
              <div className="form_div">
                <p>Email</p>
                <input
                  type="email"
                  onChange={handleInputChange}
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              {/* <div className="form_div">
            <p>Email password</p>
            <input
              type="password"
              onChange={handleInputChange}
              name="email_password"
              placeholder="Email password"
              required
            />
          </div> */}
              <div className="form_d"></div>
              <RadioContainer>
                <p style={{ color: "black" , marginBottom: '10px' }}>{t("p510")}</p>
                <div>
                  <div>
                    <input
                      required
                      onChange={handleInputChange}
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                    />
                    <label for="female">{t("p512")}</label>
                  </div>
                  <div style={{ marginLeft: "35px" }}>
                    <input
                      required
                      onChange={handleInputChange}
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                    />
                    <label for="male">{t("p511")}</label>
                  </div>
                </div>
              </RadioContainer>
            </div>
          </div>


          {/* <div className="checkBox">
            <input
              onChange={() => {
                setValue(!value);
                handlechange()
              }}
              type="checkbox"
              name="agree_with_agreement"
              id="label"
              value={value}
              
            />
            <label style={{ marginLeft: "10px" }} for="label">
              {t("p513")} <NavLink to="text-agreement">{t("p514")}</NavLink>{" "}
              {t("p515")}
            </label>
          </div>
          <div className="checkBox">
            <input
              onChange={() => {
                setOpenx(!openx);
                handlechange()
              }}
              // ref={inputEl11}
              type="checkbox"
              name="agree_with_agreement_monthly"
              id="label2"
              value={value2}
            />
            <label style={{ marginLeft: "10px" }} for="label">
              Muddatli to'lov shartnomasi olish
            </label>
          </div> */}

          <p style={{ color: "red", marginBottom: "8px", fontWeight: "600" }}>
            {" "}
            {error}
          </p>
          <button
            ref={buttonRef}
            type="submit"
            // style={
            //   value === false
            //     ? { cursor: "not-allowed" }
            //     : loading
            //     ? { background: "#8cb4c5" }
            //     : { background: "#00587F" }
            // }
            className="reg_btn"
          >
            {loading ? (
              <>
                <Loader
                  type="spinner-circle"
                  bgColor={"#FFFFFF"}
                  color={"#FFFFFF"}
                  size={70}
                />
              </>
            ) : (
              t("p416")
            )}
          </button>
          {/* <h2>или</h2>
            <h2>Войдите через</h2>
            <a className="reg_link" href="#">
              <GoogleLogin
                clientId="971142751474-u0fttn4so4e7melu9jlruprvsplget6r.apps.googleusercontent.com"
                buttonText="Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
            </a>
            <a className="reg_link" href="#">
              <img src={facebook} alt="" /> Facebook
            </a> */}
          <h3>
            {t("p414")}
            <NavLink to="/login">{t("p415")}</NavLink>
          </h3>
          {/* <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="class_modal"
            open={openx}
            onClose={handleClosex}
            closeAfterTransition
            BackdropComponent={Backdrop}
            // onChange={(e) => setAddDescription(e.target.value)}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openx}>
              <div className="modal mainEduGate">
                <div className="close_btn">
                  <img onClick={() => {
                    handleClosex()
                  }} src={close} alt="" />
                </div>
                <h1>{t('qaytaaloqa')}</h1>
                <h1 style={{ color: 'blue' }}>{t('text')}</h1>
                <div className="modal_btn" style={{ width: '100%' }}>
                  <button onClick={() => {
                    handleClosex()
                  }}>{t("p209")}</button>
                  <button onClick={() => {
                    setOpenx(false);
                    setValue2(true);
                    test.checked = true;
                  }}>{t("p5132")}</button>
                </div>
              </div>
            </Fade>
          </Modal> */}
        </form>
      </div>
    </React.Fragment>
  );
}

const RadioContainer = styled.div`
  padding-left: 25px;
  width: 625px;
  max-width: 100%;
  div {
    display: flex;
    div {
      display: flex;
      align-items: center;
      input {
        height: 18px;
        width: 18px;
      }
      label {
        margin-left: 8px;
      }
    }
  }
`;
export default SignUpComplete;
