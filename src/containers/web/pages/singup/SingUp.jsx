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
    <React.Fragment>
      <div className="navRegist">{/* <Navbar /> */}</div>
      <div className="singup_asos container2">
        <Link to="/" className="title">
          {/* <img className="log-img" src={logo_education} alt="" /> */}
          <span className="log-img"></span>
          <h2>Edugately</h2>
        </Link>
        <form onSubmit={handleSubmit} className="main_singup">
          <h1>{t("part5")}</h1>
          <div className="form_div">
            <p>{t("p411")}</p>
            <span style={{ position: 'absolute', top: '52px', left: '40px' }}>+</span>
            <input
              ref={phoneRef}
              defaultValue="998"
              style={{ textIndent: '11px' }}
              type="tel"
              onChange={handleInputChange}
              name="phone_number"
              required
            />
          </div>
          <div className="form_div">
            <p>{t("p412")}</p>

            <div className="password">
              <input
                onChange={handleInputChange}
                name="password_1"
                required
                placeholder={t("p412")}
                ref={inputRef}
                type={type ? "password" : "text"}
              />
              <img onClick={() => setType(() => !type)} src={view} alt="" />
            </div>
            <div
              style={
                loginData.password_1.length > 0
                  ? { display: "flex" }
                  : { display: "none" }
              }
              ref={statsuRef}
              className="status-bar"
            >
              <Progress ref={inputRef} percent={length} status={status} />
              {loginData.password_1.length < 8 ? (
                <div style={{ marginLeft: "20px" }} className="statusPercent">
                  <div>
                    {" "}
                    <span style={{ color: "red" }}>
                      {loginData.password_1.length}/
                    </span>
                    <span
                      style={{
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "red",
                      }}
                    >
                      8
                    </span>{" "}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="form_div">
            <p>{t("p413")}</p>
            <div className="password">
              <input
                placeholder={t("p413")}
                onClick={() =>
                  loginData.password_1.length >= 8 > 0
                    ? (statsuRef.current.style = "display:none;")
                    : ""
                }
                onChange={handleInputChange}
                type="password"
                name="password_2"
                required
              />
              {loginData.password_1 == loginData.password_2 &&
                loginData.password_2 != "" ? (
                <img src={check} alt="" />
              ) : loginData.password_2.length > 0 ? (
                <Loader type="box-up" bgColor={"black"} size={70} />
              ) : (
                ""
              )}
            </div>
          </div>
          <button
            ref={buttonRef}
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
          <h3>
            {t("p414")} <NavLink to="/login">{t("p415")}</NavLink>
          </h3>
        </form>
      </div>
    </React.Fragment>
  );
}

export default SingUp;
