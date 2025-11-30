import React, { useEffect, useRef, useState } from "react";
import StudentSidebar from "./StudentSidebar2.jsx";
import StudentCabinet from "../studentCabinet";
import { useSelector } from "react-redux";
import folder from "../../../assets/icons/folder.svg";
import avatar from "../../../assets/icon/Avatar.svg";
import pdf from "../../../assets/icons/pdf.svg";
import down_doc from "../../../assets/icons/down_doc.svg";
import invoysLineImg from "../../../assets/images/invoysLine.svg";
import styled from "styled-components";
import Axios from "../../../utils/axios.js";
import Swal from "sweetalert2";
import Loader from "react-js-loader";
import check from "../../../assets/icon/checked.svg";
import wait from "../../../assets/images/Waiting.svg";
import goal from "../../../assets/images/Goal.svg";
import { useTranslation } from "react-i18next";
import "../../../style/css/status.css";
import Headerst from "./Headerst.jsx";
import img from '../../../assets/studentImgs/youngman.png'

const MyAccInvoys = () => {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState();
  const [loading, setLoading] = useState(false);
  const inputEl1 = useRef(null);
  const inputEl2 = useRef(null);
  const inputEl3 = useRef(null);
  const inputEl4 = useRef(null);
  const inputEl5 = useRef(null);
  const inputEl6 = useRef(null);
  const inputEl7 = useRef(null);
  const inputEl8 = useRef(null);
  const inputEl9 = useRef(null);
  const [cert, setCert] = useState("");
  const [file, setFile] = useState({
    myInvoice: "",
    diploma_confirmed: "",
  });
  const selector = useSelector((state) => state);
  const { data } = selector?.payload?.payload;
  const { first_name, last_name, id } = data;
  const [userInfo, setUserInfo] = useState({});
  const [downloaded, setDownloaded] = useState(false);
  const [invoice, setInvoice] = useState({
    applicant_invoice_upload: null,
    university_invoice_confirmed: null,
    university_invoice_upload: null,
  });
  ;
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (inputEl1.current?.files[0]) {
      formData.append("applicant_invoice_upload", inputEl1.current.files[0]);
    }

    if (!file.diploma_confirmed) return
    try {
      const res = await Axios.patch(
        `applicant/upload-invoice/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        Swal.fire({
          icon: "success",
          text: "Загружено успешно",
        });
      }
      fetchInvoice();
      ;
    } catch (error) { }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("applicant_invoice_upload_2", inputEl2.current.files[0]);

    if (!file.diploma_confirmed) return
    try {
      const res = await Axios.patch(
        `applicant/upload-invoice/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        Swal.fire({
          icon: "success",
          text: "Загружено успешно",
        });
      }
      fetchInvoice();
      ;
    } catch (error) { }
  };
  const handleSubmit3 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("applicant_invoice_upload_3", inputEl3.current.files[0]);

    if (!file.diploma_confirmed) return
    try {
      const res = await Axios.patch(
        `applicant/upload-invoice/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        Swal.fire({
          icon: "success",
          text: "Загружено успешно",
        });
      }
      fetchInvoice();
      ;
    } catch (error) { }
  };
  const handleSubmit4 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("applicant_invoice_upload_4", inputEl4.current.files[0]);

    if (!file.diploma_confirmed) return
    try {
      const res = await Axios.patch(
        `applicant/upload-invoice/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        Swal.fire({
          icon: "success",
          text: "Загружено успешно",
        });
      }
      fetchInvoice();
      ;
    } catch (error) { }
  };
  const handleSubmit5 = async (e) => {
    e.preventDefault();
    console.log(inputEl5.current.files[0]);
    const formData = new FormData();
    formData.append("applicant_invoice_upload_5", inputEl5.current.files[0]);

    if (!file.diploma_confirmed) return
    try {
      const res = await Axios.patch(
        `applicant/upload-invoice/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        Swal.fire({
          icon: "success",
          text: "Загружено успешно",
        });
      }
      fetchInvoice();
      ;
    } catch (error) { }
  };
  const handleSubmit6 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("applicant_invoice_upload_6", inputEl6.current.files[0]);

    if (!file.diploma_confirmed) return
    try {
      const res = await Axios.patch(
        `applicant/upload-invoice/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        Swal.fire({
          icon: "success",
          text: "Загружено успешно",
        });
      }
      fetchInvoice();
      ;
    } catch (error) { }
  };
  const handleSubmit7 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("applicant_invoice_upload_7", inputEl7.current.files[0]);

    if (!file.diploma_confirmed) return
    try {
      const res = await Axios.patch(
        `applicant/upload-invoice/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        Swal.fire({
          icon: "success",
          text: "Загружено успешно",
        });
      }
      fetchInvoice();
      ;
    } catch (error) { }
  };
  const handleSubmit8 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("applicant_invoice_upload_8", inputEl8.current.files[0]);

    if (!file.diploma_confirmed) return
    try {
      const res = await Axios.patch(
        `applicant/upload-invoice/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        Swal.fire({
          icon: "success",
          text: "Загружено успешно",
        });
      }
      fetchInvoice();
      ;
    } catch (error) { }
  };
  const handleSubmit9 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("applicant_invoice_upload_9", inputEl9.current.files[0]);

    if (!file.diploma_confirmed) return
    try {
      const res = await Axios.patch(
        `applicant/upload-invoice/${id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const { status } = res;
      if (status === 200) {
        Swal.fire({
          icon: "success",
          text: "Загружено успешно",
        });
      }
      fetchInvoice();
      ;
    } catch (error) { }
  };


  const handleChange = (e) => {
    const { name, files } = e.target;
    setFile((state) => ({ ...state, [name]: files[0] }));
  };
  const fetchMyData = async () => {
    try {
      const res = await Axios.get("/applicant/me/");
      const { data, status } = res;
      setUserInfo(data);
      const { university_cert, step } = data;
      ;
      if (status == 200) {
        setCert(university_cert);
        setCurrentStep(step);
      }
    } catch (error) {
      ;
    }
  };
  useEffect(() => {
    fetchInvoice();
    fetchMyData();
  }, []);
  return (
    <>
      <div className="studentKabinet" style={{ width: '100vw' }}>
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
          <div className="invoice">
            <div className="data-filling pb-5">

              <div className="example-btn"><button>{t('part202')}</button></div>
              <div className="inputs-ul pt-5">
                <div className="d-flex align-items-center justify-content-center">
                  <img className="m-auto" src={img} alt="" />
                </div>
                <h3 className="text-center mt-3">{t("p398")}</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* <StudentSidebar />
      <div className="main" style={{ width: '82%' }}>
        <div className="status">
          <div className="top">
            <h1>{t("part60")}</h1>
            <div>
              <img src={avatar} alt="" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h4>
                  {userInfo.first_name} {userInfo.last_name}
                </h4>
                <h5>{t("p65")}</h5>
              </div>
            </div>
          </div>
          <div className="myAccInvBottom">
            <div className="myAccInvBottom_Btn">
              {loading ? (
                <Loader
                  type="spinner-circle"
                  bgColor={"#fff"}
                  color={"#fff"}
                  size={80}
                />
              ) : invoice.university_invoice_upload === null ? (
                t("p398")
              ) : (
                <MyInvoice>
                  <a
                    href={invoice.university_invoice_upload}
                    target="_blank"
                    download={invoice.university_invoice_upload}
                    onClick={() => setDownloaded(() => !downloaded)}
                    className="form_doc"
                  >
                    <img src={pdf} alt="" />
                    <p style={{ fontSize: "18px" }}> Счет </p>
                    <img src={down_doc} alt="" />
                  </a>
                  <a
                    href={invoice.university_invoice_upload}
                    target="_blank"
                    onClick={() => setDownloaded(true)}
                    className="downloadBtn"
                  >
                    {t("p407")}
                  </a>
                </MyInvoice>
              )}
            </div>
          </div>
          {cert ? (
            <div className="myAccInvBottom">
              <h1 style={{ fontSize: '28px' }}>{t("par1")}</h1>
              <p style={{ fontSize: '20px' }}>{t("par2")}</p>
              <div className="myAccInvBottom_Btn">

                <MyInvoice>
                  <a
                    href={cert}
                    target="_blank"
                    download={cert}
                    onClick={() => setDownloaded(() => !downloaded)}
                    className="form_doc"
                  >
                    <img src={pdf} alt="" />
                    <p style={{ fontSize: "18px" }}> {t("par0")} </p>
                    <img src={down_doc} alt="" />
                  </a>
                  <a
                    href={cert}
                    target="_blank"
                    onClick={() => setDownloaded(true)}
                    className="downloadBtn"
                  >
                    {t("p408")}
                  </a>
                </MyInvoice>
              </div>
            </div>
          ) : (
            ""
          )}

          {invoice.university_invoice_confirmed === true &&
            currentStep === "completed" ? (
            <div className="bottom">
              <img src={goal} alt="waitforRESULT" />
              <h1>
                {t("p405")}
                <span>{t("p406")}</span>
              </h1>
            </div>
          ) : invoice.university_invoice_upload === null ? (
            ""
          ) : invoice.applicant_invoice_upload ? (
            ""
          ) : (
            <div className="myAccInvBottom">
              <div className="myAccInvBottom_Btn">
                <MyInvoice>
                  <>
                    <label
                      style={{ position: "relative" }}
                      htmlFor="drop1"
                      className="form_down"
                    >
                      <img src={folder} alt="" />
                      <input
                        ref={inputEl1}
                        type="file"
                        onChange={handleChange}
                        name="diploma_confirmed"
                        id="drop1"
                      />
                      <p style={{ fontSize: "18px" }}>
                        Drop your files here or{" "}
                        <span style={{ fontSize: "15px" }}> choose file</span>
                      </p>

                      <p
                        style={{
                          height: "27px",
                          position: "absolute",
                          right: "-45px",
                        }}
                        className="checkIcon"
                      >
                        {file?.diploma_confirmed ? (
                          <img
                            style={{ height: "100%" }}
                            src={check}
                            alt="success"
                          />
                        ) : (
                          ""
                        )}
                      </p>
                    </label>
                    <button
                      style={file?.diploma_confirmed ? { cursor: 'pointer' } : { cursor: "not-allowed" }}
                      onClick={handleSubmit}
                      className="downloadBtn"
                    >
                      Загрузит квитанция
                    </button>
                  </>
                </MyInvoice>
              </div>
            </div>
          )}

         
          {
            invoice.applicant_invoice_upload && !invoice.applicant_invoice_upload_2 ?
              (
                <div className="myAccInvBottom">
                  <div className="myAccInvBottom_Btn">
                    <MyInvoice>
                      <>
                        <label
                          style={{ position: "relative" }}
                          htmlFor="drop1"
                          className="form_down"
                        >
                          <img src={folder} alt="" />
                          <input
                            ref={inputEl2}
                            type="file"
                            onChange={handleChange}
                            name="diploma_confirmed"
                            id="drop1"
                          />
                          <p style={{ fontSize: "18px" }}>
                            2-smestr{" "}
                            <span style={{ fontSize: "15px" }}> choose file</span>
                          </p>

                          <p
                            style={{
                              height: "27px",
                              position: "absolute",
                              right: "-45px",
                            }}
                            className="checkIcon"
                          >
                            {file?.diploma_confirmed ? (
                              <img
                                style={{ height: "100%" }}
                                src={check}
                                alt="success"
                              />
                            ) : (
                              ""
                            )}
                          </p>
                        </label>
                        <button
                          style={file?.diploma_confirmed ? { cursor: 'pointer' } : { cursor: "not-allowed" }}
                          onClick={handleSubmit2}
                          className="downloadBtn"
                        >
                          Загрузит квитанция
                        </button>
                      </>
                    </MyInvoice>
                  </div>
                </div>
              )
              :
              ''
          }

        

          {
            invoice.applicant_invoice_upload_2 && !invoice.applicant_invoice_upload_3 ?
              (
                <div className="myAccInvBottom">
                  <div className="myAccInvBottom_Btn">
                    <MyInvoice>
                      <>
                        <label
                          style={{ position: "relative" }}
                          htmlFor="drop1"
                          className="form_down"
                        >
                          <img src={folder} alt="" />
                          <input
                            ref={inputEl3}
                            type="file"
                            onChange={handleChange}
                            name="diploma_confirmed"
                            id="drop1"
                          />
                          <p style={{ fontSize: "18px" }}>
                            3-smestr{" "}
                            <span style={{ fontSize: "15px" }}> choose file</span>
                          </p>

                          <p
                            style={{
                              height: "27px",
                              position: "absolute",
                              right: "-45px",
                            }}
                            className="checkIcon"
                          >
                            {file?.diploma_confirmed ? (
                              <img
                                style={{ height: "100%" }}
                                src={check}
                                alt="success"
                              />
                            ) : (
                              ""
                            )}
                          </p>
                        </label>
                        <button
                          style={file?.diploma_confirmed ? { cursor: 'pointer' } : { cursor: "not-allowed" }}
                          onClick={handleSubmit3}
                          className="downloadBtn"
                        >
                          Загрузит квитанция
                        </button>
                      </>
                    </MyInvoice>
                  </div>
                </div>
              )
              :
              ''
          }

      

          {
            invoice.applicant_invoice_upload_3 && !invoice.applicant_invoice_upload_4 ?
              (
                <div className="myAccInvBottom">
                  <div className="myAccInvBottom_Btn">
                    <MyInvoice>
                      <>
                        <label
                          style={{ position: "relative" }}
                          htmlFor="drop1"
                          className="form_down"
                        >
                          <img src={folder} alt="" />
                          <input
                            ref={inputEl4}
                            type="file"
                            onChange={handleChange}
                            name="diploma_confirmed"
                            id="drop1"
                          />
                          <p style={{ fontSize: "18px" }}>
                            4-smestr{" "}
                            <span style={{ fontSize: "15px" }}> choose file</span>
                          </p>

                          <p
                            style={{
                              height: "27px",
                              position: "absolute",
                              right: "-45px",
                            }}
                            className="checkIcon"
                          >
                            {file?.diploma_confirmed ? (
                              <img
                                style={{ height: "100%" }}
                                src={check}
                                alt="success"
                              />
                            ) : (
                              ""
                            )}
                          </p>
                        </label>
                        <button
                          style={file?.diploma_confirmed ? { cursor: 'pointer' } : { cursor: "not-allowed" }}
                          onClick={handleSubmit4}
                          className="downloadBtn"
                        >
                          Загрузит квитанция
                        </button>
                      </>
                    </MyInvoice>
                  </div>
                </div>
              )
              :
              ''
          }

      

          {
            invoice.applicant_invoice_upload_4 && !invoice.applicant_invoice_upload_5 ?
              (
                <div className="myAccInvBottom">
                  <div className="myAccInvBottom_Btn">
                    <MyInvoice>
                      <>
                        <label
                          style={{ position: "relative" }}
                          htmlFor="drop1"
                          className="form_down"
                        >
                          <img src={folder} alt="" />
                          <input
                            ref={inputEl5}
                            type="file"
                            onChange={handleChange}
                            name="diploma_confirmed"
                            id="drop1"
                          />
                          <p style={{ fontSize: "18px" }}>
                            5-smestr{" "}
                            <span style={{ fontSize: "15px" }}> choose file</span>
                          </p>

                          <p
                            style={{
                              height: "27px",
                              position: "absolute",
                              right: "-45px",
                            }}
                            className="checkIcon"
                          >
                            {file?.diploma_confirmed ? (
                              <img
                                style={{ height: "100%" }}
                                src={check}
                                alt="success"
                              />
                            ) : (
                              ""
                            )}
                          </p>
                        </label>
                        <button
                          style={file?.diploma_confirmed ? { cursor: 'pointer' } : { cursor: "not-allowed" }}
                          onClick={handleSubmit5}
                          className="downloadBtn"
                        >
                          Загрузит квитанция
                        </button>
                      </>
                    </MyInvoice>
                  </div>
                </div>
              )
              :
              ''
          }

       

          {
            invoice.applicant_invoice_upload_5 && !invoice.applicant_invoice_upload_6 ?
              (
                <div className="myAccInvBottom">
                  <div className="myAccInvBottom_Btn">
                    <MyInvoice>
                      <>
                        <label
                          style={{ position: "relative" }}
                          htmlFor="drop1"
                          className="form_down"
                        >
                          <img src={folder} alt="" />
                          <input
                            ref={inputEl6}
                            type="file"
                            onChange={handleChange}
                            name="diploma_confirmed"
                            id="drop1"
                          />
                          <p style={{ fontSize: "18px" }}>
                            6-smestr{" "}
                            <span style={{ fontSize: "15px" }}> choose file</span>
                          </p>

                          <p
                            style={{
                              height: "27px",
                              position: "absolute",
                              right: "-45px",
                            }}
                            className="checkIcon"
                          >
                            {file?.diploma_confirmed ? (
                              <img
                                style={{ height: "100%" }}
                                src={check}
                                alt="success"
                              />
                            ) : (
                              ""
                            )}
                          </p>
                        </label>
                        <button
                          style={file?.diploma_confirmed ? { cursor: 'pointer' } : { cursor: "not-allowed" }}
                          onClick={handleSubmit6}
                          className="downloadBtn"
                        >
                          Загрузит квитанция
                        </button>
                      </>
                    </MyInvoice>
                  </div>
                </div>
              )
              :
              ''
          }

          

          {
            invoice.applicant_invoice_upload_6 && !invoice.applicant_invoice_upload_7 ?
              (
                <div className="myAccInvBottom">
                  <div className="myAccInvBottom_Btn">
                    <MyInvoice>
                      <>
                        <label
                          style={{ position: "relative" }}
                          htmlFor="drop1"
                          className="form_down"
                        >
                          <img src={folder} alt="" />
                          <input
                            ref={inputEl7}
                            type="file"
                            onChange={handleChange}
                            name="diploma_confirmed"
                            id="drop1"
                          />
                          <p style={{ fontSize: "18px" }}>
                            7-smestr{" "}
                            <span style={{ fontSize: "15px" }}> choose file</span>
                          </p>

                          <p
                            style={{
                              height: "27px",
                              position: "absolute",
                              right: "-45px",
                            }}
                            className="checkIcon"
                          >
                            {file?.diploma_confirmed ? (
                              <img
                                style={{ height: "100%" }}
                                src={check}
                                alt="success"
                              />
                            ) : (
                              ""
                            )}
                          </p>
                        </label>
                        <button
                          style={file?.diploma_confirmed ? { cursor: 'pointer' } : { cursor: "not-allowed" }}
                          onClick={handleSubmit7}
                          className="downloadBtn"
                        >
                          Загрузит квитанция
                        </button>
                      </>
                    </MyInvoice>
                  </div>
                </div>
              )
              :
              ''
          }

      

          {
            invoice.applicant_invoice_upload_7 && !invoice.applicant_invoice_upload_8 ?
              (
                <div className="myAccInvBottom">
                  <div className="myAccInvBottom_Btn">
                    <MyInvoice>
                      <>
                        <label
                          style={{ position: "relative" }}
                          htmlFor="drop1"
                          className="form_down"
                        >
                          <img src={folder} alt="" />
                          <input
                            ref={inputEl8}
                            type="file"
                            onChange={handleChange}
                            name="diploma_confirmed"
                            id="drop1"
                          />
                          <p style={{ fontSize: "18px" }}>
                            8-smestr{" "}
                            <span style={{ fontSize: "15px" }}> choose file</span>
                          </p>

                          <p
                            style={{
                              height: "27px",
                              position: "absolute",
                              right: "-45px",
                            }}
                            className="checkIcon"
                          >
                            {file?.diploma_confirmed ? (
                              <img
                                style={{ height: "100%" }}
                                src={check}
                                alt="success"
                              />
                            ) : (
                              ""
                            )}
                          </p>
                        </label>
                        <button
                          style={file?.diploma_confirmed ? { cursor: 'pointer' } : { cursor: "not-allowed" }}
                          onClick={handleSubmit8}
                          className="downloadBtn"
                        >
                          Загрузит квитанция
                        </button>
                      </>
                    </MyInvoice>
                  </div>
                </div>
              )
              :
              ''
          }

          

          {
            invoice.applicant_invoice_upload_8 && !invoice.applicant_invoice_upload_9 ?
              (
                <div className="myAccInvBottom">
                  <div className="myAccInvBottom_Btn">
                    <MyInvoice>
                      <>
                        <label
                          style={{ position: "relative" }}
                          htmlFor="drop1"
                          className="form_down"
                        >
                          <img src={folder} alt="" />
                          <input
                            ref={inputEl9}
                            type="file"
                            onChange={handleChange}
                            name="diploma_confirmed"
                            id="drop1"
                          />
                          <p style={{ fontSize: "18px" }}>
                            9-smestr{" "}
                            <span style={{ fontSize: "15px" }}> choose file</span>
                          </p>

                          <p
                            style={{
                              height: "27px",
                              position: "absolute",
                              right: "-45px",
                            }}
                            className="checkIcon"
                          >
                            {file?.diploma_confirmed ? (
                              <img
                                style={{ height: "100%" }}
                                src={check}
                                alt="success"
                              />
                            ) : (
                              ""
                            )}
                          </p>
                        </label>
                        <button
                          style={file?.diploma_confirmed ? { cursor: 'pointer' } : { cursor: "not-allowed" }}
                          onClick={handleSubmit9}
                          className="downloadBtn"
                        >
                          Загрузит квитанция
                        </button>
                      </>
                    </MyInvoice>
                  </div>
                </div>
              )
              :
              ''
          }
        </div>
      </div> */}
    </>
  );
};

export default MyAccInvoys;

const MyInvoice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  .downloadBtn {
    background: #00587f !important;
    border-radius: 10px !important;
    padding: 15px 20px !important;
    outline: none !important;
    border: none !important;
    font-size: 17px !important;
    color: #fff !important;
    height: 55px !important;
    width: 224px !important;
    transition: 0.2s !important;
  }
`;
