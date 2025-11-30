import React, { useEffect, useState } from "react";
import StudentSidebar from "./SidebarStudent";
import "../../../style/css/status.css";
import StudentCabinet from "../studentCabinet";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Axios from "../../../utils/axios.js";
import avatar from "../../../assets/icon/Avatar.svg";
import wait from "../../../assets/images/Waiting.svg";
import goal from "../../../assets/images/Goal.svg";
import styled from "styled-components";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const Status = () => {
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({
    applicant_invoice_upload: null,
    university_invoice_confirmed: null,
    university_invoice_upload: null,
  });
  const [stepNumber, setStepNumber] = useState(-1);
  const [myData, setMyData] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [currentStep, setCurrentStep] = useState("");
  const selector = useSelector((state) => state);
  const { payload } = selector.payload;
  const { first_name, last_name } = payload.data;
  const steps = [t("p91"), t("p92"), t("p93")];
  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/applicant/university-docs/");
      const { status, data } = res;
      if (status === 200) {
        setInvoice(data);
        if (data) {
          localStorage.setItem("invoiceSeen", data.university_invoice_upload);
        }
      }
       ;
      setLoading(false);
    } catch (error) {
       ;
      setLoading(false);
    }
  };
  const fetchMyData = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/applicant/me/");
      const { data, status } = res;
      setUserInfo(data);
       ;
      if (status == 200) {
        const { step } = data;
        setMyData(data);
        setCurrentStep(step);
        if (step === "payment_confirmation") {
          setStepNumber(0);
        } else if (
          step === "manager_checking" ||
          step === "payment_confirmed"
        ) {
          setStepNumber(1);
        } else if (
          step === "notary" ||
          step === "manager_reject_notary" ||
          step === "manager_checking_notary"
        ) {
          setStepNumber(2);
        } else if (step === "university" || step === "rejected") {
          setStepNumber(3);
        } else if (step === "completed") {
          setStepNumber(4);
        }
      }
      setLoading(false);
    } catch (error) {
       ;
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInvoice();
    fetchMyData();
  }, []);
  return (
    <>
      <StudentSidebar />
      <div className="main">
        <div className="status">
          <div className="top">
            <h1>{t("p66")}</h1>
            <div>
              <>
                <img src={avatar} alt="userImage" />
                <h2>
                  {userInfo.first_name} {userInfo.last_name}{" "}
                  <span>{t("p65")}</span>
                </h2>
              </>
            </div>
          </div>
          <div className="bottom">
            <SvgContainer>
              <Stepper activeStep={stepNumber} alternativeLabel>
                <Step key="accountant">
                  <StepLabel>{t("p90")}</StepLabel>
                </Step>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </SvgContainer>
            {invoice.university_invoice_confirmed === true ||
            currentStep === "completed" ? (
              <>
                <img src={goal} alt="waitForResult" />
                <h1>
                  {t("p405")}
                  <span>{t("p406")}</span>
                </h1>
              </>
            ) : currentStep === "rejected" ? (
              <>
                <img src={wait} alt="waitForResult" />
                <h1>
                  Документы расмартиваются .<span>Пожалуйста подождите</span>
                </h1>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Status;

const SvgContainer = styled.div`
  svg {
    height: 24px !important;
    width: 24px !important;
  }
`;
