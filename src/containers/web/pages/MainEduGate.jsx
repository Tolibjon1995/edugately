import React, { useEffect, useState, useRef } from "react";
import Loader from "react-js-loader";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import "../../../style/css/MainEduGate.css";
// import "../../../style/css/footer.css";
import styled from "styled-components";
import chat_icon from "../../../assets/icon/chat.svg";
import univer_icon from "../../../assets/icon/univer.svg";
import country_icon from "../../../assets/icon/country.svg";
import univer_pic from "../../../assets/images/univer.jpg";
import icon1 from "../../../assets/icon/icon1.svg";
import icon2 from "../../../assets/icon/icon2.svg";
import icon3 from "../../../assets/icon/icon3.svg";
import icon4 from "../../../assets/icon/icon4.svg";
import icon5 from "../../../assets/icon/icon5.svg";
import icon6 from "../../../assets/icon/icon6.svg";
import star1 from "../../../assets/icons/star1.svg";
import star2 from "../../../assets/icons/star2.svg";
import star3 from "../../../assets/icons/star3.svg";
import star4 from "../../../assets/icons/star4.svg";
import star5 from "../../../assets/icons/star5.svg";
import arrow from "../../../assets/arrow.png";
import Axios from "../../../utils/axios";
import SwiperCore, { Pagination, Navigation, Autoplay, EffectFade } from "swiper/core";
import Navbar from "./Navbar";
import { useHistory } from "react-router";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
import Swal from "sweetalert2";
import { Container, Row } from "reactstrap";
import Social from "./Social";
import Yangiliklar from './yangilik/Yangiliklar'
import Malumot from "./MALUMOT/Malumot";
import close from "../../../assets/icon/close-red.svg";
import { updateLanguageAction } from "../../../store/actions/langAction";
import Fikirlar from "./Fikirlar";
import Tel from "./Tel";
import CountryUnver from "./CountryUnver/CountryUnver";
// import { Autoplay, Pagination, Navigation } from "swiper";
//

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay, EffectFade]);

// import data json
// const datafakultet = require("../json/topFakultet.json");
const dataSwipper = require("../json/swipper.json");

const MainEduGate = () => {
  const { t, i18n } = useTranslation();
  ;
  const [openx, setOpenx] = React.useState(false);
  const handleClosex = () => {
    setOpenx(false);
    localStorage.setItem("sana", 'salom')
  };

  const datafac = [
    // {
    //   name: t("fac1"),
    //   img: "https://images.unsplash.com/photo-1494419470281-65c2b001a42b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=931&q=80"
    // },
    {
      name: t('fac2'),
      img: "facultetBg1"
    },
    {
      name: t("fac3"),
      img: "facultetBg2"
    },
    {
      name: t("fac4"),
      img: "facultetBg3"
    },
    {
      name: "IT",
      img: "facultetBg4"
    },
    {
      name: t("fac5"),
      img: "facultetBg5"
    },
    {
      name: t("fac6"),
      img: "facultetBg6"
    },
    {
      name: t("fac7"),
      img: "facultetBg7"
    },
    {
      name: t("fac8"),
      img: "facultetBg8"
    }
  ]


  //Creating a method to change the language onChnage from select box
  // const changeLanguageHandler = (e) => {
  //   const languageValue = e.target.value;
  //   i18n.changeLanguage(languageValue);
  // };
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const [userId, setUserId] = useState();
  const startRef = useRef();
  const history = useHistory();
  const [getCard, setGetCard] = useState();
  const [change1, setChange1] = useState("");
  const [change2, setChange2] = useState("");
  const [change3, setChange3] = useState("");
  const [serach, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [dataFilter, setdataFilter] = useState([]);
  const [filterMajors, setFilterMajors] = useState([]);
  const [filterCountry, setFilterCountry] = useState([]);
  const [filterDegree, setFilterDegree] = useState([]);
  const [univerCount, setUniverCount] = useState(8);
  const [countryID, setCountryID] = useState("");
  const lang = selector.payload?.user?.lang?.languageValue;

  const [phone, setPhone] = useState("");
  const [write, setWrite] = useState(false);

  const handlecheck = () => {
    setWrite(!write);
  };
  window.addEventListener('scroll', () => {
    if (localStorage.getItem("sana") !== 'salom') {
      if ((window.scrollY > 700) && (window.scrollY < 800)) {
        setOpenx(true);
      }
    } else if (localStorage.getItem("sana") === 'salom') {
    }

  })
  const callMe = async () => {
    let tels = phone.slice(0, 4) + phone.slice(6, 8) + phone.slice(10, 13) + phone.slice(14, 16) + phone.slice(17, 19)

    try {
      const data = await axios.post("https://backend.edugately.com/api/v1/common/phone-consultation/", {
        phone_number: tels,

      });
      if (data.status === 201) {
        setOpenx(false);
        Swal.fire({
          icon: 'success',
          title: 'Muvofoqiyatli yuborildi',
        }).then((res) => {
          localStorage.setItem("sana", 'salom')
        })

      } else {
        setOpenx(false)
      }
    } catch (error) {
      if (error.response.status === 400) {
        const phone_number = error?.response?.data?.phone_number
        setOpenx(false)
        Swal.fire({
          icon: 'warning',
          text: phone_number[0],

        });
      }
    }
  };
  const [unverls, setUnverls] = useState(false)
  useEffect(() => {
    if (unverls) {
      setUniverCount(1000)
    } else if (!unverls) {
      setUniverCount(8)
    }
  }, [unverls])


  
  // const LimitUn = () => {
  //   if (univerCount === 8) {
  //     setUniverCount(1000)
  //   } else if (univerCount > 8) {
  //     setUniverCount(8)
  //   }
  // }
  const fetchUniversities = async () => {
    try {
      const data = await axios.get(
        `https://backend.edugately.com/api/v1/university/?limit=${univerCount}`,
        {
          headers: {
            "Accept-language": lang,
          },
        }
      );
      const { results } = data.data;
      if (data.status === 200) {
        setUniversities(results);
        console.log(results);
      }
    } catch (error) {
      ;
    }
  };

  const univerCountry = async () => {
    try {
      const res = await axios.get(
        "https://backend.edugately.com/api/v1/company/country/degree/major/?limit=1000", {
        headers: {
          "Accept-Language": lang
        }
      }
      );
      const { data, status } = res;
      if (status === 200) {
        const { results } = data;

        setFilterCountry(results);
        // console.log(results);
        // const degree = results.map((item) => item.degrees).flat(1);
        // console.log(degree);
        // const final = degree.map((item) => item.id);
        // const filtered = degree.filter(
        //   ({ id }, index) => !final.includes(id, index + 1)
        // );
        // console.log(filtered);
        // const majorList = degree.map((item) => item.majors).flat(1);
        // setFilterMajors(majorList);
        // console.log(majorList);
        // setFilterDegree(filtered);
      }
    } catch (err) {
    }
  };

  const handleRegion = (event, newValue) => {
    if (newValue?.id) {
      setChange1((state) => ({ ...state, country: newValue.id }));
      for (let i = 0; i < filterCountry.length; i++) {
        if (filterCountry[i].id == newValue.id) {
          const degree = filterCountry[i].degrees;
          const final = degree.map((item) => item.id);
          const filtered = degree.filter(
            ({ id }, index) => !final.includes(id, index + 1)
          );
          setFilterDegree(filtered);
        }

      }

    } else {
      setChange1((state) => ({ ...state, country: "" }));
    }
  };
  const handleDegree = (event, newValue) => {
    if (newValue?.id) {
      setChange2((state) => ({ ...state, degree: newValue.id }));
      for (let i = 0; i < filterDegree.length; i++) {
        if (filterDegree[i].id == newValue.id) {
          // const majorList = filterDegree[i].majors.map((item) => item.majors).flat(1);
          setFilterMajors(filterDegree[i].majors);
        }
      }
    } else {
      setChange2((state) => ({ ...state, degree: "" }));
    }
  };

  const handleMajor = (event, newValue) => {
    if (newValue?.id) {
      setChange3((state) => ({ ...state, major: newValue.id }));
    } else {
      setChange3((state) => ({ ...state, major: "" }));
    }
  };

  const filterUniver = async () => {
    try {
      setLoading(true)
      const data = await axios.get(
        `https://backend.edugately.com/api/v1/university/?country=${change1.country}&degree=${change2.degree}&major=${change3.major}`
      );
      const { results } = data.data;

      if (data.status === 200) {
        setdataFilter(results);
        setSearch(true);
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
    }
  };

  const setFavourite = async (univerId) => {
    try {
      const res = await Axios.post("/applicant/favorite-university/", {
        university_id: univerId,
      });
      const { status } = res;
      if (status === 201) {
        const current = universities.filter((item) => item.id === univerId);
        startRef.current.fill = "red";
      }
    } catch (error) {
      const { status, data } = error?.response;
      if (status === 401) {
        Swal.fire({
          icon: "error",
          text: "Пожалуйста, войдите в свою учетную запись",
        }).then(() => history.push("/login"));
      } else if (status === 403) {
        Swal.fire({
          icon: "warning",
          text: "Уже добавлен в список",
        });
      }
    }
  };

  const fetchCard = async () => {
    try {
      const res = await axios.get("https://backend.edugately.com/api/v1/company/review/", {
        headers: {
          "Accept-Language": lang
        }
      });
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setGetCard(results);
      }
    } catch (error) {
      ;
    }
  };


  const handler = (univerId) => {
    history.push(`/university/${univerId}`);
  };
  const [star, setStar] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const closeAll = () => {
    if (open1 === true) {
      setOpen1(false);
    } else {
      if (open2 === true) {
        setOpen2(false);
      }
      if (open3 === true) {
        setOpen3(false);
      }
    }
  };
  useEffect(() => {
    // dispatch(updateLanguageAction('ru'))
    // i18n.changeLanguage('ru');

    if (selector.payload.payload) {
      const { payload } = selector?.payload;
      const userId = payload?.data?.id;
      setUserId(userId);
    }
  }, [univerCount, lang]);

  useEffect(() => {
    univerCountry();
    fetchCard();
  }, [lang]);


  useEffect(() => {
    fetchUniversities()
  }, [univerCount])

  const unverr = localStorage.getItem('unverr')

  useEffect(() => {
    
    
    Axios.get(`/applicant/me/`).then((res)=>{
      if (res) {
        localStorage.setItem('mim', res.data.referral_university)
      }
    })
    const mim = localStorage.getItem('mim')
    console.log(unverr)
    console.log(mim)
    
    if(unverr){
      Axios.get(
        `/university/?application_referral_status=true`,
        {
          headers: {
            "Accept-language": lang,
          },
        }
      ).then((res)=>{
        console.log(res)
        setUniversities(res.data.results);
        
      })
    }else{
      fetchUniversities();
      console.log('ishlamadi')
    }
  }, [])

  return (
    <>
      <div className="n1">
        <Navbar />
      </div>
      <div onClick={closeAll} className="mainEduGate" id="main">
        <div className="header" id="heaer">
          <Container fluid className="testiviy">
            <Social />
            <Row className="row">
              <div className="col-6">
                <h2>{t("part7")}</h2>
                <div className="consultation">
                  <h3>{t("part0")}</h3>
                  {/* <ArrowForwardIcon /> */}
                  {/* <span className="arrow-img icon-phone rotate"></span>
                   */}

                </div>
                <h3>{t("part8")}</h3>
                <div className="listLvl">
                  <p>
                    <div className="circleList"></div> {t("part9")}
                  </p>
                  <p>
                    <div className="circleList"></div> {t("part10")}
                  </p>
                  <p>
                    <div className="circleList"></div> {t("part11")}
                  </p>
                  <p>
                    <div className="circleList"></div> {t("part12")}
                  </p>
                </div>
                <div className="consultation d-nn">
                  {/* <span className="arrow-img icon-phone rotate2"></span> */}
                  <h3>{t("part0")}</h3>
                </div>
              </div>
              <div className="col-6">
                {/* <Tel handlecheck={handlecheck}/> */}
                <div className="top">
                  <div>
                    <div>
                      <InputMask
                        mask="+\9\98 (99) 999-99-99"
                        className="form-control"
                        placeholder="+998-123-45-67"
                        type="text"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    {/* <label className="custom-checkbox">
                      <input type="checkbox" onClick={handlecheck} name="" id="" />
                      <span></span>
                      <p>{t("part44")}</p>
                    </label> */}
                    <button className="playbtn" onClick={callMe}>{t("part32")}</button>
                  </div>
                </div>
              </div>
            </Row>
          </Container>
          <div className="chat">
            <h4>{t("part37")}</h4>
            {/* <img src={chat_icon} alt="" /> */}
          </div>
          <div className="filter">
            <div className="dropDwn">
              <AutocompleteContainer>
                <Autocomplete
                  aria-required
                  onChange={handleRegion}
                  id="profayl_input"
                  options={filterCountry}
                  placeholder="country"
                  getOptionLabel={(option) => (option ? option.name : "")}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      placeholder={t("part52")}
                      variant="outlined"
                    />
                  )}
                />
              </AutocompleteContainer>
            </div>
            <div className="dropDwn">
              <AutocompleteContainer>
                <Autocomplete
                  aria-required
                  onChange={handleDegree}
                  id="profayl_input"
                  options={filterDegree}
                  placeholder="country"
                  getOptionLabel={(option) => (option ? option.title : "")}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      name="degree"
                      placeholder={t("part53")}
                      variant="outlined"
                    />
                  )}
                />
              </AutocompleteContainer>
            </div>
            <div className="dropDwn">
              <AutocompleteContainer>
                <Autocomplete
                  aria-required
                  onChange={handleMajor}
                  id="profayl_input"
                  options={filterMajors}
                  placeholder="country"
                  getOptionLabel={(option) => (option ? option.name : "")}
                  style={{ width: "100%" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      name="degree"
                      placeholder={t("part54")}
                      variant="outlined"
                    />
                  )}
                />
              </AutocompleteContainer>
            </div>

            <a

              className="dropSearch"
              onClick={filterUniver}
            >
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="13.6879"
                  cy="13.6311"
                  rx="11.9847"
                  ry="11.9407"
                  stroke="#5C7C8A"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.0234 22.5566L26.7221 27.2259"
                  stroke="#5C7C8A"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
          {/* end filter */}
        </div>
        {/* end header */}

        {/* resultBlock */}
        <span
          id="result_search"
          style={{ display: "flex", padding: "0px", margin: "10px" }}
        ></span>
        {loading ? (
          <Loader
            type="spinner-circle"
            bgColor={"#FFFFFF"}
            color={"#FFFFFF"}
            size={80}
          />
        ) : (

          serach === true ? (
            dataFilter?.length === 0 ? (
              <div className="resultBlock" id="">
                <h5>Результаты поиска 0</h5>
              </div>
            ) : (
              <div className="resultBlock" id="">
                <h5>Результаты поиска {dataFilter?.length}</h5>
                <div className="result">
                  {/* card */}
                  {dataFilter.map((x) => {
                    return (
                      <div
                        className="card card-md"
                        onClick={() => history.push(`/university/${x.id}`)}
                      >
                        <img
                          className="img-unv"
                          src={
                            x?.images?.length === 0
                              ? univer_pic
                              : x.images[0].image.toString()
                          }
                          alt=""
                        />
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.1043 2.17701L12.9317 5.82776C13.1108 6.18616 13.4565 6.43467 13.8573 6.49218L17.9453 7.08062C18.9554 7.22644 19.3573 8.45055 18.6263 9.15194L15.6702 11.9924C15.3797 12.2718 15.2474 12.6733 15.3162 13.0676L16.0138 17.0778C16.1856 18.0698 15.1298 18.8267 14.227 18.3574L10.5732 16.4627C10.215 16.2768 9.78602 16.2768 9.42679 16.4627L5.773 18.3574C4.87023 18.8267 3.81439 18.0698 3.98724 17.0778L4.68385 13.0676C4.75257 12.6733 4.62033 12.2718 4.32982 11.9924L1.37368 9.15194C0.642715 8.45055 1.04464 7.22644 2.05466 7.08062L6.14265 6.49218C6.54354 6.43467 6.89028 6.18616 7.06937 5.82776L8.89574 2.17701C9.34765 1.27433 10.6523 1.27433 11.1043 2.17701Z"
                            stroke="#F2F2F2"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        {x?.name?.length > 50 ? (
                          <h1>{x.name.substring(0, 50)}...</h1>
                        ) : (
                          <h1>{x.name}</h1>
                        )}
                        
                        {/* <div className="card-ft">
                          <h2 onClick={() => handler(x.id)}>
                            {t("p424")}:{" "}
                            <span>
                              {x.rating} место 
                            </span>
                          </h2>
                          <h3 onClick={() => handler(x.id)}>
                            {t("p611")}:{" "}
                            <img
                              className="star_image"
                              src={
                                x.education_quality === 1
                                  ? star1
                                  : x.education_quality === 2
                                    ? star2
                                    : x.education_quality === 3
                                      ? star3
                                      : x.education_quality === 4
                                        ? star4
                                        : star5
                              }
                              alt=""
                            />
                          </h3>
                          <h4 onClick={() => handler(x.id)}>
                            
                          </h4>
                        </div> */}
                      </div>
                    );
                  })}
                  {/* end card */}
                </div>
                {/* end result */}
              </div>
            )
          ) : (
            <div id=""></div>
          ))}
        {/* end resultBlock */}


        {/* Yangiliklar */}
        {/* <Yangiliklar /> */}
        {/* Yangiliklar */}


        {/* workBlock */}
        <div id="howItWork" className="workBlock">
          <h4>{t("part14")}</h4>
          <div className="weareWork">
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon1} alt="" />
                </div>
                <p>{t("part38")}</p>
              </div>
            </div>
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon2} alt="" />
                </div>
                <p>{t("part39")}</p>
              </div>
            </div>
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon3} alt="" />
                </div>
                <p>{t("part40")}</p>
              </div>
            </div>
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon6} alt="" />
                </div>
                <p>{t("part43")}</p>
              </div>
            </div>
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon4} alt="" />
                </div>
                <p>{t("part41")}</p>
              </div>
            </div>
            {/* card */}
            <div className="card">
              <div className="cardBack">
                <div>
                  <img src={icon5} alt="" />
                </div>
                <p>{t("part42")}</p>
              </div>
            </div>
            
          </div>
        </div>
        {/* end workBlock */}
        <Container className="aloqa" style={{ marginTop: '30px' }}>
          <Social />
          <Row className="row">

            <div className="col-6 belgi" style={{ paddingLeft: '50px', }}>
              <h1>{t("titlecon1")}</h1>
              <div className="consultation">
                <h3>{t("part0")}</h3>

              </div>
              <div className="consultation d-nn">
                <span className="arrow-img icon-phone rotate2"></span>
                <h3>{t("part0")}</h3>
              </div>
            </div>
            <div className="col-6">
              <div className="top top2">
                <div>
                  <div>
                    <InputMask
                      mask="+\9\98 (99) 999-99-99"
                      className="form-control"
                      placeholder="+998-123-45-67"
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {/* <label className="custom-checkbox">
                    <input type="checkbox" onClick={handlecheck} name="" id="" />
                    <span></span>
                    <p>{t("part44")}</p>
                  </label> */}
                  <button onClick={callMe}>{t("part32")}</button>
                </div>
              </div>
            </div>
          </Row>
        </Container>
        {/* resultBlock */}
        <div
          style={{ position: "relative" }}
          className="resultBlock"
          id="university"
        >
          <h5>{t("part15")}</h5>
          <div className="result">
            {/* <CountryUnver/> */}
          </div>
          <div className="result">
            {/* card */}
            {universities?.map((item) => {
              const {
                id,
                name,
                description,
                education_quality,
                rating,
                living_price_per_annum,
                city,
                images,
              } = item;
              return (
                <div
                  className="card card-md"
                  onClick={() => history.push(`/university/${id}`)}
                >
                  <div>
                    <img
                      className="img-unv"
                      src={
                        item?.images?.length === 0
                          ? univer_pic
                          : item.images[0].image.toString()
                      }
                      alt=""
                    />
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 20 20"
                      ref={startRef}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        //fill={star === true ? "yellow" : ""}
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.1043 2.17701L12.9317 5.82776C13.1108 6.18616 13.4565 6.43467 13.8573 6.49218L17.9453 7.08062C18.9554 7.22644 19.3573 8.45055 18.6263 9.15194L15.6702 11.9924C15.3797 12.2718 15.2474 12.6733 15.3162 13.0676L16.0138 17.0778C16.1856 18.0698 15.1298 18.8267 14.227 18.3574L10.5732 16.4627C10.215 16.2768 9.78602 16.2768 9.42679 16.4627L5.773 18.3574C4.87023 18.8267 3.81439 18.0698 3.98724 17.0778L4.68385 13.0676C4.75257 12.6733 4.62033 12.2718 4.32982 11.9924L1.37368 9.15194C0.642715 8.45055 1.04464 7.22644 2.05466 7.08062L6.14265 6.49218C6.54354 6.43467 6.89028 6.18616 7.06937 5.82776L8.89574 2.17701C9.34765 1.27433 10.6523 1.27433 11.1043 2.17701Z"
                        stroke="#F2F2F2"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    {name?.length > 55 ? (
                      <h1>{name?.substring(0, 35)}...</h1>
                    ) : (
                      <h1>{name}</h1>
                    )}
                  </div>
                  {/* {description?.length > 100 ? (
                    <p onClick={() => handler(id)}>
                      {description.substring(0, 180)}...
                    </p>
                  ) : (
                    <p onClick={() => handler(id)}>{description}</p>
                  )} */}

                  <div className="card-ft">
                    {/* <h2 onClick={() => handler(id)}>
                      {t("p424")}:{" "}
                      <span>
                        {rating} место {city.name}
                      </span>
                    </h2>
                    <h3 onClick={() => handler(id)}>
                      {t("p611")}:
                      <img
                        className="star_image"
                        src={
                          education_quality === 1
                            ? star1
                            : education_quality === 2
                              ? star2
                              : education_quality === 3
                                ? star3
                                : education_quality === 4
                                  ? star4
                                  : star5
                        }
                        alt=""
                      />
                    </h3> */}
                    <h4 onClick={() => handler(id)}>
                      {/* {t("p612")}: <span>{living_price_per_annum}</span> */}
                    </h4>
                  </div>
                </div>
              );
            })}
            {/* end card */}
          </div>

          <Button
            onClick={()=>setUnverls(!unverls)}>
            {t("bce")}
          </Button>
          {/* end result */}
        </div>

        {/* end resultBlock */}
        {/* MALUMOT OLISH */}

        {/* MALUMOT OLISH */}
        {/* top fakultet */}
        <div className='CountryUnver'  style={{width: '100%'}}>
            <div className="topFacultetBlock "  style={{width: '100%'}}>
                <h4>{t("part16")}</h4>
                <div className="topFacultet" style={{width: '100%'}}>
                    {datafac.map((a) => {
                        return (
                            <div className={`card ${a.img}`}>
                                <p className='p'>{a.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
        {/* <div className="topFacultetBlock">
          <h4>{t("part16")}</h4>
          <div className="topFacultet">
            {datafac.map((a) => {
              return (
                <div className="card">
                  <div className="sloy">
                    <p>{a.name}</p>
                  </div>
                  <img src={a.img} alt="" />
                  <span></span>

                </div>
              );
            })}
          </div>
        </div> */}
        {/* end top fakultet */}
        {/* <Container className="aloqa" style={{ marginTop: '30px' }}>
          <Social />
          <Row className="row">
            <div className="col-6">
              <div className="top top2">
                <div>
                  <div>
                    <InputMask
                      mask="+\9\98 (99) 999-99-99"
                      className="form-control"
                      placeholder="+998-123-45-67"
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  
                  <button onClick={callMe}>{t("part32")}</button>
                </div>
              </div>
            </div>
            <div className="col-6 belgi" style={{ paddingLeft: '50px' }}>
              <h1>{t("titlecon2")}</h1>
              <div className="consultation" style={{ display: 'block', transform: 'rotate(180deg)' }}>
                


              </div>
              <h3 >{t("part0")}</h3>
            </div>

          </Row>
        </Container> */}
        {/* about block */}
        <div className="aboutBlock">
          <h5>{t("part24")}</h5>
          <div className="aboutUs">
            {/*  */}
            <div className="cardAbout">
              <h1>26+</h1>
              <h4>{t("part25")}</h4>
              <p>
                {t("about1")}
              </p>
            </div>
            {/*  */}
            {/*  */}
            <div className="cardAbout">
              <h1>{filterCountry?.length} +</h1>
              <h4>{t("part27")}</h4>
              <p>
                {t("about21")}{" "} {filterCountry?.length}{" "}
                {t("about22")}{" "}
              </p>
            </div>
            {/*  */}
            {/*  */}
            <div className="cardAbout">
              <h1>20 +</h1>
              <h4>{t("part28")}</h4>
              <p>
                {t("about31")} 20 {" "}
                {t("about32")}{" "}
              </p>
            </div>
            {/*  */}
          </div>
        </div>
        {/* end about block */}

        {/* swipper block */}

        <div className="swipperBlock">
          <h4>{t("part29")}</h4>

          <Swiper
            slidesPerView={1}
            effect={"fade"}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            navigation={true}
            modules={[EffectFade, Autoplay, Pagination, Navigation]}
            className="mySwiper"
            pagination={{
              dynamicBullets: true,
            }}

          >
            <div>
              <div>
                {getCard?.map((i) => {
                  const {
                    image,
                    updated_at,
                    applicant_name_uz,
                    applicant_name_ru,
                    applicant_name_en,
                    applicant_name,
                    major,
                    major_uz,
                    major_ru,
                    major_en,
                    university_uz,
                    university_ru,
                    university_en,
                    university,
                    comment_uz,
                    comment_ru,
                    comment_en,
                    comment,
                    created_at,
                  } = i;

                  return (
                    <SwiperSlide>
                      <div style={{ overflow: "hidden" }} className="card">
                        <div className="top top5" style={{ background: '#FFF' }}>
                          <div className="imagggg">
                            <img src={image} alt="" />
                          </div>
                          <div style={{ textAlign: 'center' }}>
                            <h1>{lang === 'uz' ? applicant_name_uz : lang === 'ru' ? applicant_name_ru : lang === 'en' ? applicant_name_en : applicant_name} </h1>
                            {/* <h3>{lang === 'uz' ? major_uz : lang === 'ru' ? major_ru : lang === 'en' ? major_en : major}</h3> */}
                            <h2>{lang === 'uz' ? university_uz : lang === 'ru' ? university_ru : lang === 'en' ? university_en : university}</h2>
                          </div>
                        </div>
                        <p style={{ textAlign: 'center', fontSize: '18px' }}>{
                          lang === 'uz' ? comment_uz : lang === 'ru' ? comment_ru : lang === 'en' ? comment_en : comment
                        }</p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </div>
            </div>
          </Swiper>
        </div>
        {/* end swipper block */}

        <Modal
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
                <img onClick={handleClosex} src={close} alt="" />
              </div>
              <h1>{t('qaytaaloqa')}</h1>
              <div className="top">
                <div>
                  <label htmlFor="qayta">{t('qaytaaloqa2')}</label>
                  <div>

                    <InputMask
                      mask="+\9\98 (99) 999-99-99"
                      className="form-control"
                      placeholder="+998-123-45-67"
                      type="text"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  {/* <label className="custom-checkbox">
                    <input type="checkbox" onClick={handlecheck} name="" id="" />
                    <span></span>
                    <p>{t("part44")}</p>
                  </label> */}

                </div>
              </div>
              <div className="modal_btn" style={{ width: '100%' }}>
                <button onClick={handleClosex}>{t("p209")}</button>
                <button onClick={callMe}>{t("p249")}</button>
              </div>
            </div>
          </Fade>
        </Modal>

        {/* footer */}
        <Footer />
        {/* footer */}
      </div>
    </>
  );
};

export default MainEduGate;

const AutocompleteContainer = styled.div`
  fieldset {
    border: none;
  }
`;
const CardFooter = styled.div`
  position: absolute;
  bottom: 36px;
  line-height: 14px;
`;
const Button = styled.button`
  position: absolute;
  right: 52px;
  padding: 10px 30px;
  background: #00587f;
  color: white;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  transition: 0.4s all ease;
  cursor: pointer;
  &:hover {
    background: white;
    color: #00587f;
    border: 1px solid #00587f;
  }
`;
