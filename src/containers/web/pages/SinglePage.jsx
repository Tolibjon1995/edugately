import React, { Component, useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useTranslation } from "react-i18next";

import GoogleMapReact from "google-map-react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import Universitet_pic from "../../../assets/images/universitet_pic.jpg";
import closeFicG from "../../../assets/icon/close.svg";
import "../../../style/css/singlepage.css";
import { useHistory, useParams } from "react-router";
import Axios from "../../../utils/axios";
import { useSelector } from "react-redux";
import Navbar from "../pages/Navbar";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModalUi from "@mui/material/Modal";
import axios from "axios";
import Swal from "sweetalert2";

SwiperCore.use([Pagination]);

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const dataT = require("../json/data_univer.json");

function SinglePage(props) {
  const [openy, setOpeny] = React.useState(false);
  const [galId, setGalId] = React.useState(0);
  const [m_img, setM_img] = React.useState(null);
  const [majorData, setMajorData] = React.useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState(null);
  const handleClose = () => setIsOpen(false);
  const toggling = () => setIsOpen(!isOpen);


  const { t, i18n } = useTranslation();

  const handleClosey = () => {
    setOpeny(false);
  };
  const handleOpeny = (index) => {
    setM_img(univer.images[index].image);
    setTimeout(() => {
      setOpeny(true);
    }, 500);
  };
  const selector = useSelector((state) => state);
  const history = useHistory();
  const [data, setData] = useState(dataT);
  const params = useParams();
  // const { t, i18next } = useTranslation();
  const majorId = localStorage.getItem("majorId");
  const [univer, setUniver] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
    founding_year: "",
    city: {
      id: "",
      name: "",
      country: {
        id: "",
        name: "",
      },
    },
    motto: "",
    rating: "",
    rating_source: "",
    education_quality: [],
    bachelor_degree_fee_per_annum: "",
    masters_degree_fee_per_annum: "",
    living_price_per_annum: "",
    faculties: [],
    images: [],
  });
  const priceType = univer.bachelor_degree_fee_per_annum.split(" ")[1];
  const {
    name,
    city,
    rating,
    living_price_per_annum,
    images,
    location,
    description,
    faculties,
    masters_degree_fee_per_annum,
    bachelor_degree_fee_per_annum,
  } = univer;

  const lat = 41.31082388091818;
  const lng = 69.796142578125;
  // const lat = location.split(",")[0]
  // const lng = location.split(",")[1]

  props = {
    center: {
      lat: location?.split(",")[0],
      lng: location?.split(",")[1],
      // lat: 41.31082388091818,
      // lng: 69.796142578125
    },
    zoom: 11,
  };
  const lang = selector.payload?.user?.lang?.languageValue;
  const fetchUniversityById = async () => {
    try {
      const { data } = await axios.get(
        `https://backend.edugately.com/api/v1/university/${params.id}/`,
        {
          headers: {
            "Accept-language": lang,
          },
        }
      );
      localStorage.setItem("univerId", params.id);
      setUniver(data);
    } catch (error) {
      
    }
  };

  const fetchMajorDetail = async (id) => {
    const toggling = () => setIsOpen(!isOpen);
    try {
      const { data } = await Axios.get(`/university/faculty/${id}`);
      setMajorData(data?.majors);
    } catch (error) {
       ;
    }
  };
  const postSelectedUniver = async () => {
    if (!selector?.payload?.payload?.data?.id) {
      history.push("/login");
    } else if (
      selector?.updateInfo?.payload?.data ??
      selector?.payload?.payload?.data?.first_name
    ) {
      Swal.fire({
        icon: "warning",
        text: "Вы уже выбрали университет",
      });
    } else {
      history.push("/sign-up");
    }
  };
  useEffect(() => {
    fetchUniversityById();
    fetchMajorDetail();
  }, [lang]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="single_page">
        <div className="sp_up">
          <div className="sp_img">
            <img
              src={
                images.length === 0
                  ? Universitet_pic
                  : images[0].image.toString()
              }
              alt=""
              
              className={images.length === 0 ? "" : "u_img"}
              width="100%"
            />
          </div>
          <div className="sp_title">
            <div>
              <h1>{name}</h1>
            </div>
            <div>
              <button onClick={() => postSelectedUniver()}>{t("p420")}</button>
            </div>
          </div>
        </div>
        <div className="sp_navbar">
          <a href="#opisaniya">{t("p421")}</a>
          {/* <a href="#lokatsya">Локация</a> */}
          <a href="#postupleniya"> {t("p422")}</a>
          <a href="#galereya"> {t("p423")}</a>
        </div>
        <div className="sp_main">
          <div className="sp_main1 sp1">
            <div className="sp_main_left">
              <div className="sp_table">
                <table>
                  <tr>
                    <td>{t("p424")} </td>
                    <td>{rating}</td>
                  </tr>
                  <tr>
                    <td> {t("part52")} </td>
                    <td>{city.country.name}</td>
                  </tr>
                  <tr>
                    <td> {t("p271")}</td>
                    <td>{city.name}</td>
                  </tr>
                  <tr>
                    <td> {t("p425")}</td>
                    <td>{bachelor_degree_fee_per_annum}/год</td>
                  </tr>
                  <tr>
                    <td> {t("part10")}</td>
                    <td>{masters_degree_fee_per_annum}/год</td>
                  </tr>
                  <tr>
                    <td> {t("p426")}</td>
                    <td>{living_price_per_annum}/год</td>
                  </tr>
                </table>
              </div>
              <div className="sp_map" id="lokatsya">
              </div>
            </div>
            <div className="sp_main1_right" id="opisaniya">
              <h1>{description}</h1>
            </div>
          </div>
          <div className="sp_main1 sp3">
            <div className="sp_main_left">
              <p> {t("p427")}</p>
              <ResponsiveContainer width="80%" height={300}>
                <AreaChart
                  data={data}
                  margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="kirish" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00587F" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#00587F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <Tooltip />
                  <CartesianGrid vertical="" strokeDasharray="10 10" />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#00587F"
                    strokeWidth="3"
                    fillOpacity={1}
                    fill="url(#kirish)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="sp_main2_right" id="postupleniya">
              <h1> {t("p428")}</h1>
              <h2>{t("p429")}</h2>
            </div>
          </div>

          {/* <<<<<<< HEAD */}
          <div className="sp_main1 sp4">
            <div></div>
            <div className="sp_main2_right">
              <h1> {t("p430")}</h1>
              <ul>
                <li>{t("p431")}</li>
                <li> {t("p432")}</li>
                <li> {t("p433")}</li>
                <li>{t("p434")}</li>
                <li> {t("p435")}</li>
                <li>{t("p436")}</li>
                <li>{t("p437")}</li>
              </ul>
            </div>
          </div>
          <div className="sp_main2 sp2">
            <div></div>
            <div>
              <h1> {t("p207")}</h1>
              <div className="sp_table sp2_table">
                <table>
                  <thead>
                    <tr>
                      <th> {t("p241")}</th>
                      <th> {t("p438")}</th>
                      {/* <th>{t("p439")}</th> */}
                      <th> {t("part53")}</th>
                      <th> {t("p440")}</th>
                      <th> {t("p336")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faculties.map((f) => {
                      return (
                        <tr>
                          <td>
                            <span
                              onClick={() => {
                                return history.push({
                                  pathname: `/university-major/${f.id}`,
                                  state: { currentId: params.id },
                                });
                              }}
                              style={{ color: "black", cursor: "pointer" }}
                            >
                              {f.name}
                            </span>
                          </td>
                          <td>{f.quota} </td>
                          {/* <td>
                            {f.education_fee} {priceType}{" "}
                          </td> */}
                          {/* <td>
                                 {(f.education_type == "full_time" &&"Очный") 
                                ||
                                  f.education_type === "part_time" && "Заочный"
                                ||  
                                f.education_type === "distance" && "Дистанционное обучение"
                                ||
                                f.education_type === "night_time" &&  "Вечернее обучение"
                                  }
                          </td> */}
                          <td>{f.degree_name}</td>
                          <td>
                            {f.service_price?.toLocaleString()}{" "}
                            {f.service_price > 0 ? "сўм" : "0 сўм"}
                          </td>
                          <td>
                            {f.status === "open" ? t("p617") : null}
                            {f.status === "close" ? t("p618") : null}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div>
                  {/* {isOpen && (
                    <div className="list-cont">
                      <h5 className="cancel-btn" onClick={handleClose}>
                        x
                      </h5>
                      <table>
                        <thead>
                          <tr>
                            <th>Тип обучения</th>
                            <th>Направление</th>
                          </tr>
                        </thead>
                        <tbody>
                          {majorData.map((m, i) => {
                            return (
                              <tr>
                                <td>
                                {f?.degree_name}
                                {i + 1}
                                </td>
                                <td>{m?.education_type}</td>
                                <td>{m?.name}</td>
                               
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )} */}
                  {/* {isOpen && (
                      <div className="list-cont">
                        <div className="list-card">
                          <h5 className="cancel-btn" onClick={handleClose}>x</h5>
                          {majorData.map((m, i) => {
                          return(
                            <div>
                              <h5 onClick={handleClose}>xxxxx</h5>
                                <h5 className="card-name">
                                 {i + 1} {m?.name}
                                </h5>
                            </div>
                            )
                          })}
                     </div>
                   </div>
                      )} */}
                </div>
              </div>
            </div>
          </div>

          <div className="sp_main1 sp5">
            <div className="sp_main_left"></div>
            <div className="sp_main3_right">
              <button
                onClick={() =>
                  postSelectedUniver()
                }
              >
                {t("p441")}
              </button>
              <Link to="/konsultatsya"> {t("p442")}</Link>
            </div>
          </div>
          <div className="sp_swiper" id="galereya">
            <Swiper
              slidesPerView={3.5}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                10: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                375: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                425: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.5,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3.5,
                  spaceBetween: 30,
                },
                1440: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              className="mySwiper"
            >
              {images.map((i) => {
                return (
                  <SwiperSlide>
                    <img
                      src={i.image}
                      width="100%"
                      onClick={() => {
                        setM_img(i.image);
                        setTimeout(() => {
                          setOpeny(true);
                        }, 500);
                      }}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          {/*  */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="class_modal"
            open={openy}
            onClose={handleClosey}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            // onChange={(e) => setAddDescription(e.target.value)}
          >
            <Fade in={openy}>
              <div className="PubModSinPage">
                <div className="close_btn">
                  <img onClick={handleClosey} src={closeFicG} alt="" />
                </div>
                <div className="univerImgGal">
                  <img src={m_img ? m_img : null} alt="" />
                </div>
              </div>
            </Fade>
          </Modal>
          {/*  */}
        </div>
      </div>
    </React.Fragment>
  );
}

export default SinglePage;
