import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import styled from "styled-components";
import StudentSidebar from "./SidebarStudent";
import avatar from "../../../assets/icon/Avatar.svg";
import scholars from "../../../assets/images/scholars.svg";

// import "../../../style/css/status.css";
import "../../../style/css/status.css";
import Axios from "../../../utils/axios";
import { useTranslation } from "react-i18next";

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
      <StudentSidebar />
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
      </div>
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
