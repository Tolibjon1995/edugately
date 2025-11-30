import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components'
// import css
import "../../../style/css/dogovor.css";
import avatar from "../../../assets/icon/Avatar.svg";
import download_icon from "../../../assets/icon/skachat.svg";
import print_icon from "../../../assets/icon/pechat.svg";
import StudentSidebar from "./SidebarStudent";
import Axios from "../../../utils/axios.js";
import { useTranslation } from "react-i18next";
const Dogovor = () => {
  const selector = useSelector((state) => state);
  const { payload } = selector.payload;
  const { first_name, last_name } = payload.data;
  const [lang, setLang] = useState("uz");
  const [agreement_pdf, setAggrement] = useState();
  const [defaultt, setDefault] = useState("");
  const [state, setState] = useState({
    activeObjects: null,
    objects: [{ id: 1, name: "Uz" }, { id: 2, name: "Ру" }, { id: 3, name: "Eng" }]
  })
  const [userInfo, setUserInfo] = useState({});
  const { t, i18next } = useTranslation();
  const fetchAgreement = async () => {
    try {
      const res = await Axios.get("/applicant/me/");
      ;
      const { data, status } = res;
      const { agreement_pdf } = data;
      if (status === 200) {
        if (agreement_pdf !== '') {
          setUserInfo(data);
          setAggrement(agreement_pdf);
          console.log(data);
        } else {
          setUserInfo(data);
          setAggrement(agreement_pdf);
        }
      }
    } catch (error) {
      ;
    }
  };
  const toggleActiveStyle = (index) => {
    if (state.objects[index] === state.activeObjects) {
      return "active"
    } else {
      return ""
    }
  }
  const handleLang = (e, index) => {
    setState({ ...state, activeObjects: state.objects[index] })
    const { textContent } = e.target;
    textContent === "Uz" && setLang("uz")
    textContent === "Ру" && setLang("ru")
    textContent === "Eng" && setLang('en');
    setDefault('')
  }
  useEffect(() => {
    fetchAgreement();
  }, []);
  return (
    <>
      <StudentSidebar />
      <div className="dogovor" style={{width: '100%'}}>
        <div className="top">
          <h1>{t("part58")}</h1>
          <div>
            <img src={avatar} alt="" />
            <h2>
              {userInfo.first_name} {userInfo.last_name}
              <span>{t("p65")}</span>
            </h2>
          </div>
        </div>
        <LangContainer>
          {state.objects?.map((item, index) => {
            return (
              <>
                <button key={index} className={toggleActiveStyle(index)} onClick={(e) => handleLang(e, index)}>{item.name}</button>
              </>
            )
          })}
        </LangContainer>
        <div className="bootm">
          {
            userInfo.agree_with_agreement == true ?
              <>
              <div className="print">
                  <button>
                    <img src={download_icon} alt="" />
                    {lang == 'uz' ?
                      <a
                        target="_blank"
                        style={{ color: "#00587f" }}
                        href={
                          userInfo?.agreement_uz_pdf
                        }
                        download
                      >
                        {" "}
                        {t("p401")} 
                      </a> :
                      lang == 'ru' ?
                        <a
                          target="_blank"
                          style={{ color: "#00587f" }}
                          href={
                            userInfo?.agreement_pdf
                          }
                          download
                        >
                          {" "}
                          {t("p401")}
                        </a>
                        :
                        lang == 'en' ?
                          <a
                            target="_blank"
                            style={{ color: "#00587f" }}
                            href={
                              userInfo?.agreement_en_pdf
                            }
                            download
                          >
                            {" "}
                            {t("p401")}
                          </a>
                          : ''
                    }
                  </button>
                  <button>
                    <img src={print_icon} alt="" />
                    {t("p402")}
                  </button>
                </div>
                <div className="main">
                  <h4>{t("p89")} </h4>

                  {lang == 'uz' ? (
                    <embed
                      src={
                        userInfo?.agreement_uz_pdf
                      }
                      style={{ width: "100%", height: "80vh" }}
                    />
                  ) : lang == 'ru' ? (
                    <embed
                      src={
                        userInfo?.agreement_pdf
                      }
                      style={{ width: "100%", height: "80vh" }}
                    />
                  ) : lang == 'en' ? (
                    <embed
                      src={
                        userInfo?.agreement_en_pdf
                      }
                      style={{ width: "100%", height: "80vh" }}
                    />
                  ) :
                    (
                      <p style={{ textAlign: 'center' }}>
                        {t("p419")}
                      </p>
                    )}

                </div>
              </>
              :
              <>
              <div className="print">
                  <button>
                    <img src={download_icon} alt="" />
                    {lang == 'uz' ?
                      <a
                        target="_blank"
                        style={{ color: "#00587f" }}
                        href={
                          userInfo?.agreement_monthly_uz_pdf
                        }
                        download
                      >
                        {" "}
                        {t("p401")} month
                      </a> :
                      lang == 'ru' ?
                        <a
                          target="_blank"
                          style={{ color: "#00587f" }}
                          href={
                            userInfo?.agreement_monthly_pdf
                          }
                          download
                        >
                          {" "}
                          {t("p401")} month
                        </a>
                        :
                        lang == 'en' ?
                          <a
                            target="_blank"
                            style={{ color: "#00587f" }}
                            href={
                              userInfo?.agreement_monthly_en_pdf
                            }
                            download
                          >
                            {" "}
                            {t("p401")} month
                          </a>
                          : ''
                    }
                  </button>
                  <button>
                    <img src={print_icon} alt="" />
                    {t("p402")}
                  </button>
                </div>
                <div className="main">
                  <h4>{t("p89")} </h4>

                  {lang == 'uz' ? (
                    <embed
                      src={
                        userInfo?.agreement_monthly_uz_pdf
                      }
                      style={{ width: "100%", height: "80vh" }}
                    />
                  ) : lang == 'ru' ? (
                    <embed
                      src={
                        userInfo?.agreement_monthly_pdf
                      }
                      style={{ width: "100%", height: "80vh" }}
                    />
                  ) : lang == 'en' ? (
                    <embed
                      src={
                        userInfo?.agreement_monthly_en_pdf
                      }
                      style={{ width: "100%", height: "80vh" }}
                    />
                  ) :
                    (
                      <p style={{ textAlign: 'center' }}>
                        {t("p419")}
                      </p>
                    )}

                </div>
                
              </>
          }
        </div>
      </div>
    </>
  );
};

export default Dogovor;

const LangContainer = styled.div`
  display: flex;
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
      button{
        height: 35px;
        width: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        color: #00587f;
        border: 1px solid #00587f;
        border-radius: 5px;
        margin-left:20px;
        cursor: pointer;
        &:hover {
          background: #00587f;
          color: white;
          border:none;
          transition:all 0.3s ease;
        }
      }
      .active{
          background: #00587f;
          color: white;
          border:none;
      }
`