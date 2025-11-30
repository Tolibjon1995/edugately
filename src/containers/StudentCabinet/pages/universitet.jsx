import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import TextField from "@material-ui/core/TextField";
// SWIPPER
import closeImg from "../../../assets/icon/close2.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/swiper.min.css";
import unvlogo from "../../../assets/unvlogo.png";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination, Navigation } from "swiper/core";
import search_icon from "../../../assets/icon/search.svg";
import settings from "../../../assets/icon/Filter.svg";
import Loader from "react-js-loader";
import avatar from "../../../assets/icon/Avatar.svg";
// import css
import "../../../style/css/universitet.css";
import StudentSidebar from "./StudentSidebar2";
import EmptyPic from "../../../assets/icon/empty.svg";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import axios from "axios";
import { useTranslation } from "react-i18next";
import Headerst from './Headerst'
SwiperCore.use([Pagination]);


const Universitet = () => {
  const { t, i18n } = useTranslation();
  const selector = useSelector((state) => state);
  const { payload } = selector?.payload;
  const { data } = payload;
  const [favourites, setFavourites] = useState({
    id: "",
    description: "",
    images: [],
    name: "",
  });
  const { first_name, last_name } = data;
  const [universities, setUniversities] = useState([]);
  const history = useHistory();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [degree, setDegree] = useState([]);
  const [major, setMajor] = useState([]);
  const [univerId, setUniverId] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [fixEnd, setFix] = useState(false);
  const [searchedData, setSearchedData] = useState({
    country: "",
    degree: "",
    major: "",
  });
  const [univerCount, setUniverCount] = useState(12);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState();

  const [unverls, setUnverls] = useState(false)
  useEffect(() => {
    if (unverls) {
      setUniverCount(1000)
    } else if (!unverls) {
      setUniverCount(12)
    }
  }, [unverls])

  const fetchUniversities = async () => {
    try {
      const data = await Axios.get(
        `/university/?limit=${univerCount}`

      );
      const { results } = data.data;
      if (data.status === 200) {
        setUniversities(results);
        setLoading(false);
      }
    } catch (error) {

    }
  };

  useEffect(() => {
    fetchUniversities()
  }, [univerCount])


  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/?country=${searchedData.country}&degree=${searchedData.degree}&major=${searchedData.major}`
      );
      ;
      const { status } = res;
      const { results } = res.data;
      if (status === 200) {
        setFilteredData(results);
      }
      setLoading(false);
      setFix(!fixEnd);
    } catch (error) {
      ;
      setLoading(false);
    }
  };

  const fetchCountry = async () => {
    try {
      const res = await Axios.get("/company/country/degree/major/?limit=1000");
      const { status, data } = res;
      ;
      if (status === 200) {
        const { results } = data;
        setCountries(results);
      }
    } catch (error) {
      ;
    }
  };


  const handleRegion = (event, newValue) => {
    if (newValue?.id) {
      setSearchedData((state) => ({ ...state, country: newValue.id }));
      const newFilter = countries.filter((item) => item.id === newValue.id);
      setDegree(newFilter[0].degrees);
    }
  };

  const handleDegree = (event, newValue) => {
    if (newValue?.id) {
      setSearchedData((state) => ({ ...state, degree: newValue.id }));
      const newFilter = degree.filter((item) => item.id === newValue.id);
      setMajor(newFilter[0].majors);
    }
  };

  const handleMajor = (event, newValue) => {
    if (newValue?.id) {
      setSearchedData((state) => ({ ...state, major: newValue.id }));
      localStorage.setItem("majorId", newValue.id);
    }
  };

  const handleSearch = async (e) => {
    const { value } = e.target;
    if (value?.length > 2) {
      setLoading(true);
      try {
        const res = await Axios.get(`/university/?search=${value} `);
        const { status } = res;
        const { results } = res.data;
        setFilteredData(results);
        setLoading(false);
      } catch (error) {
        ;
        setLoading(false);
      }
    }
  };
  const fetchUserFavourite = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/applicant/me/");
      const { status, data } = res;
      ;
      setUserInfo(data);
      if (status === 200) {
        const { id } = data?.major?.faculty?.university;
        setLoading(true);
        try {
          const res = await Axios.get(`/university/${id}`);
          const { status, data } = res;
          if (status === 200) {
            setFavourites(data);
          }
          ;
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }
      ;
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const fetchUserUniver = async () => {
    setLoading(true);
    if (!univerId) return
    try {
      const res = await Axios.get(`/university/${univerId}`);
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setUniverId(results);
      }
      ;
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handler = (univerId) => {
    history.push(`/university/${univerId}`);
  };

  useEffect(() => {
    fetchCountry();
    // fetchDegree();
    // fetchMajor();
    fetchUserFavourite();
  }, []);
  useEffect(() => {
    fetchUserUniver();
    setTimeout(() => {

    }, 1000);
  }, [univerId]);

  const unverr = localStorage.getItem('unverr')

  useEffect(() => {
    Axios.get(`/applicant/me/`).then((res) => {
      if (res) {
        localStorage.setItem('mim', res.data.referral_university)
      }
    })

    if (unverr) {
      Axios.get(
        `/university/?application_referral_status=true`
      ).then((res) => {
      
        setUniversities(res.data.results);

      })
    } else {
      fetchUniversities();

    }
  }, [])

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
        <div class="sub-header " id="sub-header">
          <div class="student-universities">
            {favourites.id ? (
              <div className="container-fluid max-width px-5 my-5 universities oldd">
                <h1 className=" text-dark section_title text-pr d-blcok d-xl-none">Universities around the world</h1>
                <div className="row parent pt-5 pb-5">
                  <div className="col-12 col-xl-9 parent-cards p-02">
                    <div className="row cards">
                      <div className="col-6 col-xl-4 " onClick={() => history.push(`/uzbuniversity/${favourites?.id}/`)}>
                        <div className="card">
                          <div className="img-div">
                            <img src={favourites.icon} alt="" />
                          </div>
                          {favourites?.name?.length > 55 ? (
                            <h5>{favourites.name.substring(0, 50)}...</h5>
                          ) : (
                            <h5>{favourites?.name}</h5>
                          )}
                          <div className="stars">
                            <svg xmlns="http://www.w3.org/2000/svg" width={152} height={24} viewBox="0 0 152 24" fill="none">
                              <path d="M11.1033 1.81699C11.4701 1.07374 12.5299 1.07374 12.8967 1.81699L15.294 6.67446C15.4397 6.9696 15.7213 7.17417 16.047 7.2215L21.4075 8.00043C22.2277 8.11961 22.5552 9.12759 21.9617 9.70612L18.0828 13.4871C17.8471 13.7169 17.7396 14.0479 17.7952 14.3723L18.7109 19.7111C18.851 20.528 17.9936 21.151 17.26 20.7653L12.4653 18.2446C12.174 18.0915 11.826 18.0915 11.5347 18.2446L6.74005 20.7653C6.00642 21.151 5.14899 20.528 5.2891 19.7111L6.20479 14.3723C6.26043 14.0479 6.15288 13.7169 5.91719 13.4871L2.03827 9.70612C1.44476 9.12759 1.77226 8.11961 2.59249 8.00043L7.95302 7.2215C8.27873 7.17417 8.5603 6.9696 8.70596 6.67446L11.1033 1.81699Z" fill="#FF8C4B" />
                              <path d="M43.1033 1.81699C43.4701 1.07374 44.5299 1.07374 44.8967 1.81699L47.294 6.67446C47.4397 6.9696 47.7213 7.17417 48.047 7.2215L53.4075 8.00043C54.2277 8.11961 54.5552 9.12759 53.9617 9.70612L50.0828 13.4871C49.8471 13.7169 49.7396 14.0479 49.7952 14.3723L50.7109 19.7111C50.851 20.528 49.9936 21.151 49.26 20.7653L44.4653 18.2446C44.174 18.0915 43.826 18.0915 43.5347 18.2446L38.7401 20.7653C38.0064 21.151 37.149 20.528 37.2891 19.7111L38.2048 14.3723C38.2604 14.0479 38.1529 13.7169 37.9172 13.4871L34.0383 9.70612C33.4448 9.12759 33.7723 8.11961 34.5925 8.00043L39.953 7.2215C40.2787 7.17417 40.5603 6.9696 40.706 6.67446L43.1033 1.81699Z" fill="#FF8C4B" />
                              <path d="M75.1033 1.81699C75.4701 1.07374 76.5299 1.07374 76.8967 1.81699L79.294 6.67446C79.4397 6.9696 79.7213 7.17417 80.047 7.2215L85.4075 8.00043C86.2277 8.11961 86.5552 9.12759 85.9617 9.70612L82.0828 13.4871C81.8471 13.7169 81.7396 14.0479 81.7952 14.3723L82.7109 19.7111C82.851 20.528 81.9936 21.151 81.26 20.7653L76.4653 18.2446C76.174 18.0915 75.826 18.0915 75.5347 18.2446L70.7401 20.7653C70.0064 21.151 69.149 20.528 69.2891 19.7111L70.2048 14.3723C70.2604 14.0479 70.1529 13.7169 69.9172 13.4871L66.0383 9.70612C65.4448 9.12759 65.7723 8.11961 66.5925 8.00043L71.953 7.2215C72.2787 7.17417 72.5603 6.9696 72.706 6.67446L75.1033 1.81699Z" fill="#FF8C4B" />
                              <path d="M107.103 1.81699C107.47 1.07374 108.53 1.07374 108.897 1.81699L111.294 6.67446C111.44 6.9696 111.721 7.17417 112.047 7.2215L117.408 8.00043C118.228 8.11961 118.555 9.12759 117.962 9.70612L114.083 13.4871C113.847 13.7169 113.74 14.0479 113.795 14.3723L114.711 19.7111C114.851 20.528 113.994 21.151 113.26 20.7653L108.465 18.2446C108.174 18.0915 107.826 18.0915 107.535 18.2446L102.74 20.7653C102.006 21.151 101.149 20.528 101.289 19.7111L102.205 14.3723C102.26 14.0479 102.153 13.7169 101.917 13.4871L98.0383 9.70612C97.4448 9.12759 97.7723 8.11961 98.5925 8.00043L103.953 7.2215C104.279 7.17417 104.56 6.9696 104.706 6.67446L107.103 1.81699Z" fill="#FF8C4B" />
                              <path d="M139.103 1.81699C139.47 1.07374 140.53 1.07374 140.897 1.81699L143.294 6.67446C143.44 6.9696 143.721 7.17417 144.047 7.2215L149.408 8.00043C150.228 8.11961 150.555 9.12759 149.962 9.70612L146.083 13.4871C145.847 13.7169 145.74 14.0479 145.795 14.3723L146.711 19.7111C146.851 20.528 145.994 21.151 145.26 20.7653L140.465 18.2446C140.174 18.0915 139.826 18.0915 139.535 18.2446L134.74 20.7653C134.006 21.151 133.149 20.528 133.289 19.7111L134.205 14.3723C134.26 14.0479 134.153 13.7169 133.917 13.4871L130.038 9.70612C129.445 9.12759 129.772 8.11961 130.592 8.00043L135.953 7.2215C136.279 7.17417 136.56 6.9696 136.706 6.67446L139.103 1.81699Z" fill="#C4C4C4" />
                            </svg>
                          </div>
                          <div className="location">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M3.25 10.1433C3.25 5.24427 7.15501 1.25 12 1.25C16.845 1.25 20.75 5.24427 20.75 10.1433C20.75 12.5084 20.076 15.0479 18.8844 17.2419C17.6944 19.4331 15.9556 21.3372 13.7805 22.3539C12.6506 22.882 11.3494 22.882 10.2195 22.3539C8.04437 21.3372 6.30562 19.4331 5.11556 17.2419C3.92403 15.0479 3.25 12.5084 3.25 10.1433ZM12 2.75C8.00843 2.75 4.75 6.04748 4.75 10.1433C4.75 12.2404 5.35263 14.5354 6.4337 16.526C7.51624 18.5192 9.04602 20.1496 10.8546 20.995C11.5821 21.335 12.4179 21.335 13.1454 20.995C14.954 20.1496 16.4838 18.5192 17.5663 16.526C18.6474 14.5354 19.25 12.2404 19.25 10.1433C19.25 6.04748 15.9916 2.75 12 2.75ZM12 7.75C10.7574 7.75 9.75 8.75736 9.75 10C9.75 11.2426 10.7574 12.25 12 12.25C13.2426 12.25 14.25 11.2426 14.25 10C14.25 8.75736 13.2426 7.75 12 7.75ZM8.25 10C8.25 7.92893 9.92893 6.25 12 6.25C14.0711 6.25 15.75 7.92893 15.75 10C15.75 12.0711 14.0711 13.75 12 13.75C9.92893 13.75 8.25 12.0711 8.25 10Z" fill="#C4C4C4" stroke="#C4C4C4" strokeWidth="0.5" />
                            </svg>
                            <p>{t('p299')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container-fluid max-width px-5 my-5 universities oldd">
                <h1 className=" text-dark section_title text-pr d-blcok d-xl-none">Universities around the world</h1>
                <div className="row parent ">
                  <div className="col-12 col-xl-9 parent-cards p-02">
                    <h1 className="text-dark section_title text-pr mt-5 mb-5 d-none d-xl-block">{t('part28')}</h1>

                    <div className="row cards">
                      {
                        universities?.map((item, index) => {
                          return (
                            <div className="col-6 col-xl-4 " key={index} onClick={() => history.push(`/university/${item?.id}/`)}>
                              <div className="card">
                                <div className="img-div">
                                  <img src={item.icon} alt="" />
                                </div>
                                {item?.name?.length > 55 ? (
                                  <h5>{item.name.substring(0, 50)}...</h5>
                                ) : (
                                  <h5>{item?.name}</h5>
                                )}
                                <div className="stars">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={152} height={24} viewBox="0 0 152 24" fill="none">
                                    <path d="M11.1033 1.81699C11.4701 1.07374 12.5299 1.07374 12.8967 1.81699L15.294 6.67446C15.4397 6.9696 15.7213 7.17417 16.047 7.2215L21.4075 8.00043C22.2277 8.11961 22.5552 9.12759 21.9617 9.70612L18.0828 13.4871C17.8471 13.7169 17.7396 14.0479 17.7952 14.3723L18.7109 19.7111C18.851 20.528 17.9936 21.151 17.26 20.7653L12.4653 18.2446C12.174 18.0915 11.826 18.0915 11.5347 18.2446L6.74005 20.7653C6.00642 21.151 5.14899 20.528 5.2891 19.7111L6.20479 14.3723C6.26043 14.0479 6.15288 13.7169 5.91719 13.4871L2.03827 9.70612C1.44476 9.12759 1.77226 8.11961 2.59249 8.00043L7.95302 7.2215C8.27873 7.17417 8.5603 6.9696 8.70596 6.67446L11.1033 1.81699Z" fill="#FF8C4B" />
                                    <path d="M43.1033 1.81699C43.4701 1.07374 44.5299 1.07374 44.8967 1.81699L47.294 6.67446C47.4397 6.9696 47.7213 7.17417 48.047 7.2215L53.4075 8.00043C54.2277 8.11961 54.5552 9.12759 53.9617 9.70612L50.0828 13.4871C49.8471 13.7169 49.7396 14.0479 49.7952 14.3723L50.7109 19.7111C50.851 20.528 49.9936 21.151 49.26 20.7653L44.4653 18.2446C44.174 18.0915 43.826 18.0915 43.5347 18.2446L38.7401 20.7653C38.0064 21.151 37.149 20.528 37.2891 19.7111L38.2048 14.3723C38.2604 14.0479 38.1529 13.7169 37.9172 13.4871L34.0383 9.70612C33.4448 9.12759 33.7723 8.11961 34.5925 8.00043L39.953 7.2215C40.2787 7.17417 40.5603 6.9696 40.706 6.67446L43.1033 1.81699Z" fill="#FF8C4B" />
                                    <path d="M75.1033 1.81699C75.4701 1.07374 76.5299 1.07374 76.8967 1.81699L79.294 6.67446C79.4397 6.9696 79.7213 7.17417 80.047 7.2215L85.4075 8.00043C86.2277 8.11961 86.5552 9.12759 85.9617 9.70612L82.0828 13.4871C81.8471 13.7169 81.7396 14.0479 81.7952 14.3723L82.7109 19.7111C82.851 20.528 81.9936 21.151 81.26 20.7653L76.4653 18.2446C76.174 18.0915 75.826 18.0915 75.5347 18.2446L70.7401 20.7653C70.0064 21.151 69.149 20.528 69.2891 19.7111L70.2048 14.3723C70.2604 14.0479 70.1529 13.7169 69.9172 13.4871L66.0383 9.70612C65.4448 9.12759 65.7723 8.11961 66.5925 8.00043L71.953 7.2215C72.2787 7.17417 72.5603 6.9696 72.706 6.67446L75.1033 1.81699Z" fill="#FF8C4B" />
                                    <path d="M107.103 1.81699C107.47 1.07374 108.53 1.07374 108.897 1.81699L111.294 6.67446C111.44 6.9696 111.721 7.17417 112.047 7.2215L117.408 8.00043C118.228 8.11961 118.555 9.12759 117.962 9.70612L114.083 13.4871C113.847 13.7169 113.74 14.0479 113.795 14.3723L114.711 19.7111C114.851 20.528 113.994 21.151 113.26 20.7653L108.465 18.2446C108.174 18.0915 107.826 18.0915 107.535 18.2446L102.74 20.7653C102.006 21.151 101.149 20.528 101.289 19.7111L102.205 14.3723C102.26 14.0479 102.153 13.7169 101.917 13.4871L98.0383 9.70612C97.4448 9.12759 97.7723 8.11961 98.5925 8.00043L103.953 7.2215C104.279 7.17417 104.56 6.9696 104.706 6.67446L107.103 1.81699Z" fill="#FF8C4B" />
                                    <path d="M139.103 1.81699C139.47 1.07374 140.53 1.07374 140.897 1.81699L143.294 6.67446C143.44 6.9696 143.721 7.17417 144.047 7.2215L149.408 8.00043C150.228 8.11961 150.555 9.12759 149.962 9.70612L146.083 13.4871C145.847 13.7169 145.74 14.0479 145.795 14.3723L146.711 19.7111C146.851 20.528 145.994 21.151 145.26 20.7653L140.465 18.2446C140.174 18.0915 139.826 18.0915 139.535 18.2446L134.74 20.7653C134.006 21.151 133.149 20.528 133.289 19.7111L134.205 14.3723C134.26 14.0479 134.153 13.7169 133.917 13.4871L130.038 9.70612C129.445 9.12759 129.772 8.11961 130.592 8.00043L135.953 7.2215C136.279 7.17417 136.56 6.9696 136.706 6.67446L139.103 1.81699Z" fill="#C4C4C4" />
                                  </svg>
                                </div>
                                <div className="location">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.25 10.1433C3.25 5.24427 7.15501 1.25 12 1.25C16.845 1.25 20.75 5.24427 20.75 10.1433C20.75 12.5084 20.076 15.0479 18.8844 17.2419C17.6944 19.4331 15.9556 21.3372 13.7805 22.3539C12.6506 22.882 11.3494 22.882 10.2195 22.3539C8.04437 21.3372 6.30562 19.4331 5.11556 17.2419C3.92403 15.0479 3.25 12.5084 3.25 10.1433ZM12 2.75C8.00843 2.75 4.75 6.04748 4.75 10.1433C4.75 12.2404 5.35263 14.5354 6.4337 16.526C7.51624 18.5192 9.04602 20.1496 10.8546 20.995C11.5821 21.335 12.4179 21.335 13.1454 20.995C14.954 20.1496 16.4838 18.5192 17.5663 16.526C18.6474 14.5354 19.25 12.2404 19.25 10.1433C19.25 6.04748 15.9916 2.75 12 2.75ZM12 7.75C10.7574 7.75 9.75 8.75736 9.75 10C9.75 11.2426 10.7574 12.25 12 12.25C13.2426 12.25 14.25 11.2426 14.25 10C14.25 8.75736 13.2426 7.75 12 7.75ZM8.25 10C8.25 7.92893 9.92893 6.25 12 6.25C14.0711 6.25 15.75 7.92893 15.75 10C15.75 12.0711 14.0711 13.75 12 13.75C9.92893 13.75 8.25 12.0711 8.25 10Z" fill="#C4C4C4" stroke="#C4C4C4" strokeWidth="0.5" />
                                  </svg>
                                  <p>{t('p299')}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }

                    </div>
                  </div>
                  <div className="col-12 col-xl-3 sticky-search p-02" id="search-universities">
                    <div className="search" id="searchDiv">
                      <div className="text">
                        <h4>University filter</h4>
                        <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                          <g clipPath="url(#clip0_867_4120)">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.25 3C8.25 3.41421 7.91421 3.75 7.5 3.75L2.25 3.75C1.83578 3.75 1.5 3.41421 1.5 3C1.5 2.58579 1.83578 2.25 2.25 2.25L7.5 2.25C7.91421 2.25 8.25 2.58579 8.25 3Z" fill="#64748B" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.5 3C16.5 3.41421 16.1642 3.75 15.75 3.75L10.5 3.75C10.0858 3.75 9.75 3.41421 9.75 3C9.75 2.58579 10.0858 2.25 10.5 2.25L15.75 2.25C16.1642 2.25 16.5 2.58579 16.5 3Z" fill="#64748B" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.75 9C9.75 9.41421 9.41421 9.75 9 9.75L2.25 9.75C1.83579 9.75 1.5 9.41421 1.5 9C1.5 8.58579 1.83579 8.25 2.25 8.25L9 8.25C9.41421 8.25 9.75 8.58579 9.75 9Z" fill="#64748B" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.5 9C16.5 9.41421 16.1642 9.75 15.75 9.75L12 9.75C11.5858 9.75 11.25 9.41421 11.25 9C11.25 8.58579 11.5858 8.25 12 8.25L15.75 8.25C16.1642 8.25 16.5 8.58579 16.5 9Z" fill="#64748B" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M6.75 15C6.75 15.4142 6.41421 15.75 6 15.75L2.25 15.75C1.83578 15.75 1.5 15.4142 1.5 15C1.5 14.5858 1.83578 14.25 2.25 14.25L6 14.25C6.41421 14.25 6.75 14.5858 6.75 15Z" fill="#64748B" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.5 15C16.5 15.4142 16.1642 15.75 15.75 15.75L9 15.75C8.58579 15.75 8.25 15.4142 8.25 15C8.25 14.5858 8.58579 14.25 9 14.25L15.75 14.25C16.1642 14.25 16.5 14.5858 16.5 15Z" fill="#64748B" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.5 -3.27835e-08C7.91421 -1.46777e-08 8.25 0.335786 8.25 0.75L8.25 5.25C8.25 5.66421 7.91421 6 7.5 6C7.08579 6 6.75 5.66421 6.75 5.25L6.75 0.75C6.75 0.335786 7.08579 -5.08894e-08 7.5 -3.27835e-08Z" fill="#64748B" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 6C12.4142 6 12.75 6.33579 12.75 6.75L12.75 11.25C12.75 11.6642 12.4142 12 12 12C11.5858 12 11.25 11.6642 11.25 11.25L11.25 6.75C11.25 6.33579 11.5858 6 12 6Z" fill="#64748B" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M6 12C6.41421 12 6.75 12.3358 6.75 12.75L6.75 17.25C6.75 17.6642 6.41421 18 6 18C5.58579 18 5.25 17.6642 5.25 17.25L5.25 12.75C5.25 12.3358 5.58579 12 6 12Z" fill="#64748B" />
                          </g>
                          <defs>
                            <clipPath id="clip0_867_4120">
                              <rect width={18} height={18} fill="white" transform="translate(18) rotate(90)" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="accordion mt-5" id="accordionExample">
                        <div className="accordion-item border-0">
                          <h2 className="accordion-header">
                            <div className="accordion-button bg-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                              <p className="text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                                  <path d="M6.10322 0.957031H2.53135C1.5751 0.957031 0.787598 1.74453 0.787598 2.70078V6.27266C0.787598 7.22891 1.5751 8.01641 2.53135 8.01641H6.10322C7.05947 8.01641 7.84697 7.22891 7.84697 6.27266V2.72891C7.8751 1.74453 7.0876 0.957031 6.10322 0.957031ZM6.60947 6.30078C6.60947 6.58203 6.38447 6.80703 6.10322 6.80703H2.53135C2.2501 6.80703 2.0251 6.58203 2.0251 6.30078V2.72891C2.0251 2.44766 2.2501 2.22266 2.53135 2.22266H6.10322C6.38447 2.22266 6.60947 2.44766 6.60947 2.72891V6.30078Z" fill="#DEE4EE" />
                                  <path d="M15.4689 0.957031H11.8971C10.9408 0.957031 10.1533 1.74453 10.1533 2.70078V6.27266C10.1533 7.22891 10.9408 8.01641 11.8971 8.01641H15.4689C16.4252 8.01641 17.2127 7.22891 17.2127 6.27266V2.72891C17.2127 1.74453 16.4252 0.957031 15.4689 0.957031ZM15.9752 6.30078C15.9752 6.58203 15.7502 6.80703 15.4689 6.80703H11.8971C11.6158 6.80703 11.3908 6.58203 11.3908 6.30078V2.72891C11.3908 2.44766 11.6158 2.22266 11.8971 2.22266H15.4689C15.7502 2.22266 15.9752 2.44766 15.9752 2.72891V6.30078Z" fill="#DEE4EE" />
                                  <path d="M6.10322 9.92969H2.53135C1.5751 9.92969 0.787598 10.7172 0.787598 11.6734V15.2453C0.787598 16.2016 1.5751 16.9891 2.53135 16.9891H6.10322C7.05947 16.9891 7.84697 16.2016 7.84697 15.2453V11.7016C7.8751 10.7172 7.0876 9.92969 6.10322 9.92969ZM6.60947 15.2734C6.60947 15.5547 6.38447 15.7797 6.10322 15.7797H2.53135C2.2501 15.7797 2.0251 15.5547 2.0251 15.2734V11.7016C2.0251 11.4203 2.2501 11.1953 2.53135 11.1953H6.10322C6.38447 11.1953 6.60947 11.4203 6.60947 11.7016V15.2734Z" fill="#DEE4EE" />
                                  <path d="M15.4689 9.92969H11.8971C10.9408 9.92969 10.1533 10.7172 10.1533 11.6734V15.2453C10.1533 16.2016 10.9408 16.9891 11.8971 16.9891H15.4689C16.4252 16.9891 17.2127 16.2016 17.2127 15.2453V11.7016C17.2127 10.7172 16.4252 9.92969 15.4689 9.92969ZM15.9752 15.2734C15.9752 15.5547 15.7502 15.7797 15.4689 15.7797H11.8971C11.6158 15.7797 11.3908 15.5547 11.3908 15.2734V11.7016C11.3908 11.4203 11.6158 11.1953 11.8971 11.1953H15.4689C15.7502 11.1953 15.9752 11.4203 15.9752 11.7016V15.2734Z" fill="#DEE4EE" />
                                </svg>
                                You can search by:
                              </p>
                            </div>
                          </h2>
                          <div id="collapseOne" className="accordion-collapse collapse show body-part" data-bs-parent="#accordionExample">
                            <div className="accordion-body p-0">
                              <div className=" sort">
                                <p>Name of the university</p>
                              </div>
                              <div className=" sort">
                                <p>Location of the university</p>
                              </div>
                              <div className=" sort">
                                <p>Majors</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="search-div d-flex">
                        <label htmlFor="search-univer">
                          <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.3505 11.1495 3 8.25 3ZM1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25Z" fill="#4B6A97" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M11.957 11.958C12.2499 11.6651 12.7247 11.6651 13.0176 11.958L16.2801 15.2205C16.573 15.5133 16.573 15.9882 16.2801 16.2811C15.9872 16.574 15.5124 16.574 15.2195 16.2811L11.957 13.0186C11.6641 12.7257 11.6641 12.2508 11.957 11.958Z" fill="#4B6A97" />
                          </svg>
                        </label>
                        <input className type="text" id="search-univer" />
                      </div>
                    </div>
                  </div>
                  <div className="d-none d-xl-block col-12 pagination">
                  <div className="col-12">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <button className="btn-unver" onClick={() => setUnverls(!unverls)}>
                                {t("bce")}
                            </button>
                        </div>
                    </div>
                </div>
                  </div>
                </div>
                
              </div>
            )}

          </div>
        </div>
      </div>
      <div className="unniversitetBlock DNT_studentUniversitet">
        <div className="top">
          <h1>{t("part56")}</h1>
          <div>
            <img src={avatar} alt="userImage" />
            <h2>
              {userInfo.first_name} {userInfo.last_name} <span>{t("p65")}</span>
            </h2>
          </div>
        </div>
        <div className="bottom">
          {favourites.id ? (
            ''
          ) : (
            <>
              <div className="settSearch">
                <div className="searchUniv">
                  <img onClick={handleSearch} src={search_icon} alt="" />
                  <input
                    onKeyPress={() => setLoading(true)}
                    onChange={(e) => handleSearch(e)}
                    type="text"
                    placeholder={t("p417")}
                  />
                </div>
                <button
                  onClick={() => {
                    setFix(!fixEnd);
                  }}
                  className="settingsUniver"
                >
                  {loading ? (
                    <Loader
                      type="spinner-circle"
                      bgColor={"#FFFFFF"}
                      color={"#FFFFFF"}
                      size={60}
                    />
                  ) : (
                    ""
                  )}
                  <img src={settings} alt="" />
                </button>
              </div>


              <div
                className="FilterFix"
                style={
                  fixEnd
                    ? { width: "100%" }
                    : { width: "0", transition: "0.5s step-end" }
                }
              >
                <div
                  className="fixLeft"
                  onClick={() => {
                    setFix(!fixEnd);
                  }}
                ></div>
                <div
                  className="FilterUniver"
                  style={
                    fixEnd
                      ? { transform: "translateX(0)", transition: "0.5s" }
                      : { transform: "translateX(100%)", transition: "0.5s" }
                  }
                >
                  <img
                    src={closeImg}
                    className="closeFilImg"
                    onClick={() => {
                      setFix(!fixEnd);
                    }}
                    alt=""
                  />
                  <h4>{t("p238")}</h4>
                  <div className="filterContainer">
                    <div className="selectCountry">
                      <p>{t("p295")}</p>
                      <Autocomplete
                        aria-required
                        onChange={handleRegion}
                        id="profayl_input"
                        options={countries}
                        getOptionLabel={(option) => (option ? option.name : "")}
                        style={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            placeholder={t("p295")}
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                    <div className="selectCountry">
                      <p>{t("p308")}</p>
                      <Autocomplete
                        aria-required
                        onChange={handleDegree}
                        id="profayl_input"
                        options={degree}
                        getOptionLabel={(option) => (option ? option.title : "")}
                        style={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            placeholder={t("p308")}
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                    <div className="selectCountry">
                      <p>{t("p399")}</p>
                      <Autocomplete
                        aria-required
                        onChange={handleMajor}
                        id="profayl_input"
                        options={major}
                        getOptionLabel={(option) => (option ? option.name : "")}
                        style={{ width: "100%" }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            placeholder={t("p399")}
                            variant="outlined"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <button
                    className="filterButton"
                    style={
                      loading
                        ? { background: "#8cb4c5" }
                        : { background: "#00587F" }
                    }
                    onClick={(e) => onSubmit(e)}
                  >
                    {loading ? (
                      <>
                        <Loader
                          type="spinner-circle"
                          bgColor={"#FFFFFF"}
                          color={"#FFFFFF"}
                          size={60}
                        />
                      </>
                    ) : (
                      t("p246")
                    )}
                  </button>
                </div>
              </div>
              <h1
                className="result"
                style={
                  filteredData?.length > 0
                    ? { display: "block" }
                    : { display: "none" }
                }
              >
                Результаты поиска ({filteredData?.length}-университетов найдено )
              </h1>
            </>
          )
          }


          <div className="cardSwipperBlock">
            <Swiper
              slidesPerView={3.3}
              spaceBetween={20}
              slidesPerGroup={1}
              className="mySwiper"
              breakpoints={{
                10: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                320: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                375: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                390: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                425: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                500: {
                  slidesPerView: 1.4,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2.2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 2.2,
                  spaceBetween: 20,
                },
                1100: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                1200: {
                  slidesPerView: 2.18,
                  spaceBetween: 5,
                },
                1280: {
                  slidesPerView: 2.3,
                  spaceBetween: 10,
                },
                1400: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },
                1500: {
                  slidesPerView: 2.5,
                  spaceBetween: 10,
                },
                1600: {
                  slidesPerView: 3.2,
                  spaceBetween: 30,
                },
              }}
            >
              {favourites.id ? (
                <div
                  style={{ padding: "0 10px", marginTop: "0" }}
                  className="document"
                >
                  <h1 style={{ marginBottom: "0" }}>{t("p84")}</h1>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <div
                      // onClick={() =>
                      //   history.push(`/university/${favourites?.id}`)
                      // }
                      style={{ marginTop: "15px", cursor: "pointer" }}
                      className="card"
                    >
                      <img
                        src={
                          favourites?.images[0]?.image
                            ? favourites?.images[0].image
                            : "https://www.princeton.edu//sites/default/files/images/2017/06/20060425_NassauHall_JJ_IMG_5973.jpg"
                        }
                        alt=""
                      />
                      <h1>{favourites?.name}</h1>
                      <p>
                        {favourites?.description?.length > 100
                          ? favourites?.description?.slice(0, 100) + "..."
                          : favourites?.description}
                      </p>
                      {/* <h4>Качество обучения:</h4> */}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {favourites.id ? (
                ''
              ) : (
                filteredData.length > 0 ? (
                  // <div className="cardSwipperBlock">
                  <div className="mainEduGate">
                    <div className="resultBlock">
                      <div className="result">
                        {filteredData.map((item) => {
                          const {
                            id,
                            name,
                            icon,
                          } = item;
                          return (
                            <div
                              className="new-card"
                              onClick={() => history.push(`/university/${id}`)}
                              style={{ display: 'flex' }}
                            >
                              <div className="mew-card-img2">
                                <img src={icon ? icon : unvlogo} alt="" />
                              </div>
                              <div className="mew-card-content">
                                {name?.length > 55 ? (
                                  <h4>{name?.substring(0, 35)}...</h4>
                                ) : (
                                  <h4>{name}</h4>
                                )}
                              </div>


                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 style={{ padding: "17px" }}>{t("part56")}</h2>
                    <div className="mainEduGate">
                      <div className="resultBlock">
                        <div className="result">
                          {universities.map((item) => {
                            const {
                              id,
                              name,
                              icon,
                            } = item;
                            return (
                              <div
                                className="new-card"
                                onClick={() => history.push(`/university/${id}`)}
                                style={{ display: 'flex' }}
                              >
                                <div className="mew-card-img2">
                                  <img src={icon ? icon : unvlogo} alt="" />
                                </div>
                                <div className="mew-card-content">
                                  {name?.length > 55 ? (
                                    <h4>{name?.substring(0, 35)}...</h4>
                                  ) : (
                                    <h4>{name}</h4>
                                  )}
                                </div>


                              </div>
                            );
                          })}
                        </div>
                        <button style={{ padding: '10px 30px' }} className="btn" onClick={() => setUnverls(!unverls)}>
                          {t("p400")}
                        </button>
                      </div>
                    </div>

                  </>
                )
              )}

              { }
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default Universitet;
const CardContainer = styled.div`
  position: relative;
  .cards {
    display: flex;
    flex-wrap: wrap;
  }
  button {
    position: fixed;
    bottom: 50px;
    right: 20px;
    right: 52px;
    padding: 10px 30px;
    background: #00587f;
    color: white;
    font-size: 18px;
    border-radius: 8px;
    border: none;
    -webkit-transition: 0.4s all ease;
    transition: 0.4s all ease;
    cursor: pointer;
  }
`;
const Card = styled.div`
  padding-bottom: 36px;
  width: 420px;
  height: 600px;
  position: relative;
  background: #e2f1f8;
  border-radius: 12px;
  margin-bottom: 40px;
  box-shadow: 0px -2px 8px rgb(0 0 0 / 9%), 2px 4px 9px rgb(0 0 0 / 10%);
  margin: 15px;
  cursor: pointer;
  .main {
    height: 46%;
    padding: 15px;
    h1 {
      font-size: 22px;
    }
    p {
      font-size: 21px;
      font-weight: 600;
      padding: 10px 0;
      line-height: 1.2;
    }
  }
  .footer {
    padding: 15px;
  }
  .univerPic {
    height: 40%;
    width: 100%;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
  }
`;
