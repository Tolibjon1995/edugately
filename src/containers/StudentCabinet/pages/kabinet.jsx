import React, { useEffect, useMemo, useState } from "react";
import StudentSidebar from "./SidebarStudent.jsx";
import Loader from "react-js-loader";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
// import css
import "../../../style/css/kabinet.css";
// import icon
import avatar from "../../../assets/icon/Avatar.svg";
import StudentCabinet from "../studentCabinet";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios.js";
import { updateLanguageAction } from "../../../store/actions/langAction.js";
import { useDispatch } from "react-redux";
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


  useEffect(() => {
    fetchCurrentStep();
    fetchPaymentConfirm();
  }, []);

  return (
    <>
      <StudentSidebar />
      <div className="DNT_Kabinet" style={{width: '79%'}}>
        {/* <div style={{width:'calc(100vw - 320px)'}} className="main"> */}
        <div className="main">
          <div className="lichKabinet">
            <div style={{ position: "relative" }} className="top">
              <div className="settings p-lr-30">
                <h6>{t("p64")}</h6>
              </div>
              <SelectColor
                className="lang-drop"
                name="lang"
                onClick={changeLanguage}
              >
                <option className="lang-opt" value="uz" to="/uz">
                  Uz
                </option>
                <option className="lang-opt" value="ru">
                  RU
                </option>
                <option value="en" className="lang-opt">
                  EN
                </option>

              </SelectColor>
              <div className="person">
                <img src={avatar} alt="userImage" />
                <h4>
                  {userInfo.first_name} {userInfo.last_name}
                </h4>
                <h3>{t("p65")}</h3>
              </div>
              {/* // ! */}
            </div>
            <div className="bottom p-lr-30">
              <div className="progress2">
                <h1>{t("p66")}</h1>
                <div className="progressTdiv">
                  <div
                    className="progressIdiv"
                    style={
                      invoiceConfirm === true
                        ? { width: "100%" }
                        : currentStep === "registered"
                          ? { width: `20%` }
                          : currentStep === "university_chose"
                            ? { width: "40%" }
                            : currentStep === "data_entry"
                              ? { width: "60%" }
                              : currentStep === "document_upload" ||
                                currentStep === "payment"
                                ? { width: "80%" }
                                : { width: "0" }
                    }
                  >
                    <h6>
                      {" "}
                      {invoiceConfirm === true
                        ? "100%"
                        : currentStep === "registered"
                          ? "20%"
                          : currentStep === "university_chose"
                            ? "40%"
                            : currentStep === "data_entry"
                              ? "60%"
                              : currentStep === "document_upload" ||
                                currentStep === "payment"
                                ? "80%"
                                : "0"}{" "}
                    </h6>
                  </div>
                </div>
                <div className="progressTitle">
                  <p>{t("p78")}</p>
                  <p>{t("p79")}</p>
                  <p>{t("p80")}</p>
                  <p>{t("p81")}</p>
                  <p>{t("p82")}</p>
                </div>
              </div>
              <div className="danni">
                <div className="izmenit">
                  <h2>{t("p67")}</h2>
                  {/* <button>Изменить</button> */}
                </div>
                <table>
                  <tr>
                    <td>1. {t("p68")}</td>
                  </tr>
                  <tr>
                    <td>2. {t("p69")}</td>
                  </tr>
                  <tr>
                    <td>3. {t("p70")} </td>
                  </tr>
                  <tr>
                    <td> 4. {t("p71")} </td>
                  </tr>
                  <tr>
                    <td> 5. {t("p72")}</td>
                  </tr>
                  <tr>
                    <td> 6. {t("p73")}</td>
                  </tr>
                  <tr>
                    <td> 7. {t("p74")} </td>
                  </tr>
                  <tr>
                    <td> 8. {t("p75")}</td>
                  </tr>
                  <tr>
                    <td> 9. {t("p76")} </td>
                  </tr>
                  <tr>
                    <td>10. {t("p77")} </td>
                  </tr>
                </table>
                <ButtonContainer>
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
                        Заполнить анкету{" "}
                      </button>
                    </>
                  )}
                </ButtonContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kabinet;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  button {
    height: 64px;
    width: 600px;
    position: relative;
    top: 13px;
    color: #fff;
    cursor: pointer;
    border: none;
    margin: 0 !important;
    left: 0 !important;
    font-size: 20px;
    background: #00587f;
    border-radius: 10px;
    transition: 0.4s;
    font-weight: 500;
  }
`;

const SelectColor = styled.select`
  position: absolute;
  width: 100px;
  right: 33px;
  top: 25px;
  padding: 4px;
  font-size: 18px;
  border-radius: 7px;
  background: #000000;
  color: white;
  border: none;
  outline: none;
`;
