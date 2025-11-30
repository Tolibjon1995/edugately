import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components'
// import css
import "../../../style/css/dogovor.css";
import avatar from "../../../assets/icon/Avatar.svg";
import download_icon from "../../../assets/icon/skachat.svg";
import print_icon from "../../../assets/icon/pechat.svg";
import StudentSidebar from "./StudentSidebar2.jsx";
import Axios from "../../../utils/axios.js";
import { useTranslation } from "react-i18next";
import Headerst from "./Headerst.jsx";
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
  console.log(userInfo);

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
          <div className="eagreement">
            <div className="data-filling">
              <div className="example-btn">
                <button>{t('part202')}</button>
              </div>
              <div className="print-upload">
                <p>{t("p401")}/{t("p402")}:</p>
                {
                  userInfo.agree_with_agreement == true ?
                    <div className="buttons">
                      <a href={
                        userInfo?.agreement_uz_pdf
                      }
                        download target="_blank" className="upload">
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                          <path fillRule="evenodd" clipRule="evenodd" d="M17.4993 1.82324C18.1034 1.82324 18.5931 2.31293 18.5931 2.91699V11.9431L21.101 9.43526C21.5281 9.00812 22.2206 9.00812 22.6477 9.43526C23.0749 9.8624 23.0749 10.5549 22.6477 10.9821L18.2727 15.3571C17.8456 15.7842 17.1531 15.7842 16.726 15.3571L12.351 10.9821C11.9238 10.5549 11.9238 9.8624 12.351 9.43526C12.7781 9.00812 13.4706 9.00812 13.8977 9.43526L16.4056 11.9431V2.91699C16.4056 2.31293 16.8953 1.82324 17.4993 1.82324ZM23.7025 2.99506C23.7616 2.3939 24.2969 1.9545 24.8981 2.01364C27.364 2.25618 29.2647 2.82368 30.7204 4.2794C32.0253 5.58433 32.6165 7.24687 32.8997 9.35377C33.1765 11.4122 33.1765 14.0504 33.1764 17.4168V17.5841C33.1764 18.0426 33.1764 18.4876 33.1757 18.9194C33.1762 18.9324 33.1764 18.9455 33.1764 18.9587C33.1764 18.9731 33.1761 18.9875 33.1756 19.0017C33.1706 21.7027 33.1364 23.8869 32.8997 25.6471C32.6165 27.754 32.0253 29.4166 30.7204 30.7215C29.4155 32.0264 27.7529 32.6176 25.646 32.9008C23.5876 33.1776 20.9494 33.1776 17.583 33.1775H17.4157C14.0493 33.1776 11.4111 33.1776 9.35267 32.9008C7.24576 32.6176 5.58323 32.0264 4.2783 30.7215C2.97337 29.4166 2.38225 27.754 2.09898 25.6471C1.86232 23.8869 1.82805 21.7027 1.8231 19.0017C1.82255 18.9875 1.82227 18.9731 1.82227 18.9587C1.82227 18.9455 1.8225 18.9324 1.82296 18.9194C1.82226 18.4876 1.82226 18.0426 1.82227 17.5841V17.4168C1.82225 14.0504 1.82223 11.4122 2.09898 9.35377C2.38225 7.24687 2.97337 5.58433 4.2783 4.2794C5.73402 2.82368 7.63474 2.25618 10.1006 2.01364C10.7018 1.9545 11.237 2.3939 11.2962 2.99506C11.3553 3.59623 10.9159 4.1315 10.3147 4.19063C8.04063 4.41432 6.75077 4.90053 5.82509 5.8262C4.99434 6.65695 4.51763 7.78091 4.26697 9.64525C4.01209 11.5411 4.00977 14.0322 4.00977 17.5005C4.00977 17.6232 4.00977 17.7446 4.00979 17.8649H7.52473C7.59079 17.8649 7.65605 17.8648 7.72055 17.8648C8.84713 17.8636 9.73935 17.8626 10.542 18.2318C11.3446 18.601 11.9246 19.279 12.6568 20.1351C12.6987 20.1842 12.7412 20.2337 12.7842 20.2839L13.6671 21.314C14.5913 22.3922 14.8507 22.6589 15.1624 22.8023C15.4742 22.9457 15.8455 22.9691 17.2656 22.9691H17.7331C19.1532 22.9691 19.5245 22.9457 19.8363 22.8023C20.148 22.6589 20.4074 22.3922 21.3316 21.314L22.2145 20.2839C22.2575 20.2337 22.3 20.1841 22.3419 20.1351C23.0741 19.279 23.6541 18.601 24.4567 18.2318C25.2593 17.8626 26.1516 17.8636 27.2781 17.8648C27.3426 17.8648 27.4079 17.8649 27.474 17.8649H30.9889C30.9889 17.7446 30.9889 17.6232 30.9889 17.5005C30.9889 14.0322 30.9866 11.5411 30.7317 9.64525C30.4811 7.78091 30.0044 6.65695 29.1736 5.8262C28.2479 4.90053 26.9581 4.41432 24.6839 4.19063C24.0828 4.1315 23.6434 3.59623 23.7025 2.99506ZM30.9838 20.0524H27.474C26.0538 20.0524 25.6825 20.0758 25.3708 20.2192C25.059 20.3626 24.7996 20.6293 23.8754 21.7075L22.9925 22.7376C22.9495 22.7877 22.9071 22.8373 22.8652 22.8864C22.1329 23.7425 21.5529 24.4205 20.7503 24.7897C19.9477 25.1588 19.0555 25.1579 17.9289 25.1567C17.8644 25.1566 17.7991 25.1566 17.7331 25.1566H17.2656C17.1996 25.1566 17.1343 25.1566 17.0698 25.1567C15.9432 25.1579 15.051 25.1588 14.2484 24.7897C13.4457 24.4205 12.8658 23.7425 12.1335 22.8863C12.0916 22.8373 12.0492 22.7877 12.0062 22.7376L11.1233 21.7075C10.1991 20.6293 9.93966 20.3626 9.62792 20.2192C9.31618 20.0758 8.94487 20.0524 7.52473 20.0524H4.01487C4.02863 22.2438 4.07945 23.9608 4.26697 25.3557C4.51763 27.22 4.99434 28.344 5.82509 29.1747C6.65584 30.0055 7.77981 30.4822 9.64415 30.7328C11.54 30.9877 14.0311 30.99 17.4993 30.99C20.9676 30.99 23.4587 30.9877 25.3545 30.7328C27.2189 30.4822 28.3429 30.0055 29.1736 29.1747C30.0044 28.344 30.4811 27.22 30.7317 25.3557C30.9193 23.9608 30.9701 22.2438 30.9838 20.0524Z" fill="white" />
                        </svg>
                        <span>
                          {t("p401")}
                        </span>
                      </a>
                      <a href="#" target="_blank" className="print">
                        <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                          <path d="M8.74935 26.2247C6.48391 26.1565 5.13266 25.9038 4.19742 24.9686C2.91602 23.6872 2.91602 21.6248 2.91602 17.5C2.91602 13.3752 2.91602 11.3128 4.19742 10.0314C5.47883 8.75 7.54123 8.75 11.666 8.75H23.3327C27.4575 8.75 29.5199 8.75 30.8013 10.0314C32.0827 11.3128 32.0827 13.3752 32.0827 17.5C32.0827 21.6248 32.0827 23.6872 30.8013 24.9686C29.866 25.9038 28.5148 26.1565 26.2494 26.2247" stroke="white" strokeWidth="1.5" />
                          <path d="M13.125 14.583H8.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M27.709 20.417H7.29232" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M24.9686 4.1984L24.4383 4.72873V4.72873L24.9686 4.1984ZM10.0314 4.1984L10.5617 4.72873H10.5617L10.0314 4.1984ZM10.0314 30.8022L10.5617 30.2719H10.5617L10.0314 30.8022ZM27 20.417C27 20.0028 26.6642 19.667 26.25 19.667C25.8358 19.667 25.5 20.0028 25.5 20.417H27ZM9.5 20.417C9.5 20.0028 9.16421 19.667 8.75 19.667C8.33579 19.667 8 20.0028 8 20.417H9.5ZM25.5 23.3337C25.5 25.4173 25.4984 26.9045 25.3465 28.0343C25.1975 29.1425 24.9164 29.7938 24.4383 30.2719L25.4989 31.3326C26.3022 30.5293 26.6618 29.5087 26.8331 28.2342C27.0016 26.9812 27 25.3748 27 23.3337H25.5ZM17.5 32.8337C19.5412 32.8337 21.1475 32.8353 22.4005 32.6668C23.675 32.4954 24.6956 32.1359 25.4989 31.3326L24.4383 30.2719C23.9601 30.75 23.3088 31.0312 22.2006 31.1802C21.0708 31.3321 19.5836 31.3337 17.5 31.3337V32.8337ZM17.5 3.66699C19.5836 3.66699 21.0708 3.66859 22.2006 3.82048C23.3088 3.96947 23.9601 4.2506 24.4383 4.72873L25.4989 3.66807C24.6956 2.86479 23.675 2.50521 22.4005 2.33386C21.1475 2.1654 19.5412 2.16699 17.5 2.16699V3.66699ZM17.5 2.16699C15.4588 2.16699 13.8525 2.1654 12.5995 2.33386C11.325 2.50521 10.3044 2.86479 9.50108 3.66807L10.5617 4.72873C11.0399 4.2506 11.6912 3.96947 12.7994 3.82048C13.9292 3.66859 15.4164 3.66699 17.5 3.66699V2.16699ZM8 23.3337C8 25.3748 7.99841 26.9812 8.16686 28.2342C8.33822 29.5087 8.6978 30.5293 9.50108 31.3326L10.5617 30.2719C10.0836 29.7938 9.80248 29.1425 9.65349 28.0343C9.50159 26.9045 9.5 25.4173 9.5 23.3337H8ZM17.5 31.3337C15.4164 31.3337 13.9292 31.3321 12.7994 31.1802C11.6912 31.0312 11.0399 30.75 10.5617 30.2719L9.50108 31.3326C10.3044 32.1359 11.325 32.4954 12.5995 32.6668C13.8525 32.8353 15.4588 32.8337 17.5 32.8337V31.3337ZM26.9744 8.72774C26.9065 6.47354 26.6649 4.83402 25.4989 3.66807L24.4383 4.72873C25.1428 5.43325 25.4065 6.49622 25.4751 8.77291L26.9744 8.72774ZM9.52492 8.77291C9.59352 6.49623 9.85722 5.43325 10.5617 4.72873L9.50108 3.66807C8.33513 4.83402 8.09352 6.47354 8.0256 8.72774L9.52492 8.77291ZM27 23.3337V20.417H25.5V23.3337H27ZM9.5 23.3337V20.417H8V23.3337H9.5Z" fill="white" />
                          <circle cx="24.7923" cy="14.5833" r="1.45833" fill="white" />
                          <path d="M21.875 24.0625H13.125" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                          <path d="M18.959 27.708H13.1257" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span>
                          {t("p402")}
                        </span>
                      </a>
                    </div>
                    :
                    <h1>{t('p419')}</h1>
                }
                <embed
                className="mt-5"
                      src={
                        userInfo?.agreement_pdf
                      }
                      style={{ width: "100%", height: "80vh" }}
                    />

                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <StudentSidebar />
      <div className="dogovor" style={{ width: '100%' }}>
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
      </div> */}
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