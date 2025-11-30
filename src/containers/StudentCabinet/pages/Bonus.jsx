import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import styled from "styled-components";
import StudentSidebar from "./StudentSidebar2";
import avatar from "../../../assets/icon/Avatar.svg";
import scholars from "../../../assets/images/scholars.svg";

// import "../../../style/css/status.css";
import "../../../style/css/status.css";
import Axios from "../../../utils/axios";
import { useTranslation } from "react-i18next";
import Headerst from "./Headerst";
import img from '../../../assets/studentImgs/isometric view of young woman with cup in hand leaning on table.png'

SwiperCore.use([Pagination]);

export default function Bonus() {
  const { t, i18n } = useTranslation();
  const selector = useSelector((state) => state);
  const [assets,setAssets] = useState([]);
  const [userInfo,setUserInfo] = useState({})
  const [datas,setData] = useState()
  
  const lang = selector.payload?.user?.lang?.languageValue


  const fetchBonus = async() => {
    try {
      const response = await Axios.get(`/company/bonus/`);
      const { results } = response.data;
      setAssets(results);
    } catch (error) {
      
    }
 }

 const fetchInfo = async() => {
    try {
      const response = await Axios.get(`/applicant/me/`);
      const { data } = response
      setUserInfo(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchBonus();
    fetchInfo();
    return () => {
    };
  }, []);

 useEffect(() => {
   fetchBonus();
   fetchInfo()
  },[lang]);
 
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

              <div className="example-btn"><button>{t('p61')}</button></div>
              <div className="inputs-ul pt-5">
                <div className="d-flex align-items-center justify-content-center">
                  <img className="m-auto" src={img} alt="" />
                </div>
                <h3 className="text-center mt-3">{t("p6111")}</h3>
              </div>
            </div>
          </div>
        </div>

      </div>
      {/* <StudentSidebar />
      <div className="main" style={{width: '82%'}}>
        <div className="status">
          <div className="top">
            <h1>{t("p61")}</h1>
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
          <div>
            <h5 className="recept">{t("p409")}</h5>
          </div>
          {assets.map((item, index) => {
            return (
              <Container>
                <div>
                  <div
                    className="girl-one "
                    style={{ display: "flex", justifyContent: "inherit" }}
                  >
                    <div className="paper-img">
                      <img src={item.images[0]?.image} alt="" />
                    </div>
                    <div className="paper-info">
                      <p className="paper-text">{item.name.slice(0, 900)}</p>
                    </div>
                  </div>
                  <div className="girl-two">
                    <div className="paper-info">
                      <p className="girl-info">{item.name.slice(900)}</p>
                    </div>
                    <div>
                      <video controls src={item.videos[0]?.video} alt="" />
                    </div>
                  </div>
                </div>
              </Container>
            );
          })}
        </div>
      </div> */}
    </>
  );
}

const Container = styled.div`
  img,
  video {
    height: 218px;
    width: 302px;
    border-radius: 48px;
    margin: 10px;
    box-shadow: 4px 5px 27px #00000029;
    object-fit: cover;
  }
  .paper-text {
    margin-left: 10px;
    text-align: justify;
  }
  .girl-info {
    text-align: justify;
  }
`;
