import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useTranslation } from "react-i18next";

import NumberFormat from "react-number-format";
import GoogleMapReact from "google-map-react";
import Swal from "sweetalert2";
import styled from "styled-components";
//import img
import userpic from "../../../../assets/icon/userpic.svg";
import image from "../../../../assets/icon/image.jpg";
import img1 from "../../../../assets/icon/img1.svg";
import img2 from "../../../../assets/icon/img2.svg";
import img3 from "../../../../assets/icon/img3.svg";
import img4 from "../../../../assets/icon/img4.svg";
import plus from "../../../../assets/icon/plus.svg";
import close from "../../../../assets/icon/close.svg";
//import css
import "../../../../style/css/info.css";
import "../../../../style/css/singlepage2.css";
import UniversitetBackoffice from "../universitetBackoffice";
import { useSelector } from "react-redux";
import Axios from "../../../../utils/axios";

// UI modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

/// input range ///
const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 200,
    label: "200",
  },
  {
    value: 500,
    label: "500",
  },
  {
    value: 800,
    label: "800",
  },
  {
    value: 1000,
    label: "1000",
  },
  {
    value: 2000,
    label: "2000",
  },
  {
    value: 3000,
    label: "3000",
  },
  {
    value: 4000,
    label: "4000",
  },
  {
    value: 5000,
    label: "5000",
  },
  {
    value: 6000,
    label: "6000+",
  },
];

const SSlider = withStyles({
  root: {
    color: "#00587F",
    height: 15,
  },
  thumb: {
    height: 45,
    width: 45,
    backgroundColor: "#E5F7FF",
    border: "6px solid currentColor",
    marginTop: -17,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% - 3px)",
  },
  track: {
    height: 15,
    borderRadius: 7,
  },
  rail: {
    height: 15,
    borderRadius: 7,
    backgroundColor: "#cdeefce8",
  },
})(Slider);

function valuetext(value) {
  return `${value}`;
}
//// google map locatsiyasi
const center = {
  lat: 42.37702172345865,
  lng: -71.116660363554,
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Info = () => {
  const [values, setValues] = useState(null);
  const reload = () => {
    window.location.reload();
  };
  const select = useSelector((state) => state.payload.payload.data);
  const [univerImg, setUniverImg] = useState(null);
  const [foiz, setFoiz] = useState();
  const [openDescript, setOpenDescript] = React.useState(false);
  const [city, setCity] = useState();
  const [danniInp, setDanniInp] = useState(false);
  const [nameU, setNameU] = useState();
  const [year, setYear] = useState();
  const [country, setCountry] = useState();
  const [moto, setMoto] = useState();
  const [cityId, setCityId] = useState(0);
  const [bacalavir, setBacalavir] = useState();
  const [magistr, setMagistr] = useState();
  const [livingPrice, setLivingPrice] = useState();
  const [startSalary, setStartSalary] = useState(0);
  const [selectedFile, setSelectedFile] = useState();
  const [images, setImages] = useState();
  const [openImgUniver, setOpenImgUniver] = React.useState(false);
  const [preview, setPreview] = useState();
  const [descript, setDescription] = useState({
    description: "",
  });
  const [input, setInput] = useState();
  const [bachelor, setBachelor] = useState("");
  const [masters, setMaster] = useState("");
  const [living, setLiving] = useState("");
  const [currency, setCurrency] = useState([]);
  const [lang, setLang] = useState("");
  const [state, setState] = useState({
    activeObjects: null,
    objects: [
      { id: 1, name: "Uz" },
      { id: 2, name: "Ру" },
      { id: 3, name: "Eng" },
    ],
  });
  const [list, setList] = useState({
    name_ru: "",
    name_uz: "",
    name_en: "",
    motto_ru: "",
    motto_en: "",
    motto_uz: "",
    description: "",
    description_en: "",
    description_ru: "",
    description_uz: "",
  });
  const handleClose = () => {
    setOpenDescript(false);
    setOpenImgUniver(false);
  };

  const selector = useSelector((state) => state);
  const [univerData, setUniverData] = useState({});
  const [UniID, setUniID] = useState({
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
  const handleName = (e) => {
    const { name, value } = e.target;
    setList((prev) => ({ ...prev, [name]: value }));
  };
  const getCity = async () => {
    try {
      const res = await Axios.get("/company/city/");
      setCity(res.data.results);
    } catch (error) {}
  };
  const descriptPatch = async (e) => {
    e.preventDefault();
    try {
      const data = await Axios.patch(`/university/${select?.id}/`, {
        description: list.description,
        description_en: list.description_en,
        description_ru: list.description_ru,
        description_uz: list.description_uz,
      });
      if (data.status === 200) {
        reload();
      }
    } catch (err) {}
  };
  const univerID = async () => {
    try {
      const data = await Axios.get(`/university/${select.id}/`);
      const uni = data.data;
      const {
        starting_salary,
        year_of_creation,
        name,
        name_en,
        name_ru,
        name_uz,
        description_en,
        description_ru,
        description_uz,
        motto,
        motto_en,
        motto_ru,
        motto_uz,
        masters_degree_fee_per_annum,
        living_price_per_annum,
        education_quality,
        education_fee_per_annum,
        application_end_date,
        description,
        bachelor_degree_fee_per_annum,
        quota,
      } = uni;
      setList({
        name_ru: name_ru,
        name_uz: name_uz,
        name_en: name_en,
        motto_en: motto_en,
        motto_ru: motto_ru,
        motto_uz: motto_uz,
        description_en,
        description_ru,
        description_uz,
        description,
      });
      setYear(year_of_creation);
      setMoto(motto);
      setBacalavir(bachelor_degree_fee_per_annum);
      setLivingPrice(living_price_per_annum);
      setStartSalary(starting_salary);
      setMagistr(masters_degree_fee_per_annum);
      if (data.status === 200) {
        setFoiz(uni.percent);

        setUniID(uni);
      }
    } catch (err) {}
  };
  const setDataUniver = async () => {
    try {
      const res = await Axios.patch(`/university/${select.id}/`, {
        name: list.name_en,
        name_ru: list.name_ru,
        name_uz: list.name_uz,
        motto: list.motto_en,
        motto_en: list.motto_en,
        motto_ru: list.motto_ru,
        motto_uz: list.motto_uz,
        name_en: list.name_en,
        year_of_creation: year,
        motto: moto,
        bachelor_degree_fee_per_annum: `${
          bacalavir.split(" ")[0] + " " + bachelor
        }`,
        masters_degree_fee_per_annum: `${
          magistr.split(" ")[0] + " " + masters
        }`,
        living_price_per_annum: `${livingPrice.split(" ")[0] + " " + living}`,
        starting_salary: startSalary,
        city_id: `${cityId ? cityId : UniID.city.id}`,
      });
    } catch (error) {}
    setDanniInp(false);
    univerID();
  };
  useEffect(() => {
    univerID();
    getCity();
  }, [univerData]);
  const onSelectFile = (e) => {
    setImages(e.target.files[0]);
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setOpenImgUniver(true);
  };
  const formData = new FormData();
  formData.append("image", images);
  formData.append("university", select.id);
  const deleteImg = async (id) => {
    try {
      const res = await Axios.delete(`/university/image/${id}/`);
      if (res.status === 200) {
        univerID();
      }
    } catch (err) {
    }
    univerID();
  };
  const univerImgPost = async () => {
    try {
      const dataImg = await Axios.post(`/university/image/`, formData);
      reload();
    } catch (err) {}
    handleClose();
  };
  const getCurrency = async () => {
    try {
      const res = await Axios.get("/common/currency/");
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setCurrency(results);
      }
    } catch (error) {
       ;
    }
  };

  const { t, i18n } = useTranslation();

  useEffect(() => {
    getCurrency();
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);
  const handleLang = (e, index) => {
    setState({ ...state, activeObjects: state.objects[index] });
    const { textContent } = e.target;
    textContent === "Uz" && setLang("uz");
    textContent === "Ру" && setLang("ru");
    textContent === "Eng" && setLang("en");
  };
  const toggleActiveStyle = (index) => {
    if (state.objects[index] === state.activeObjects) {
      return "active";
    } else {
      return "";
    }
  };
  const patchQuto = async (e) => {
    try {
      const res = await Axios.patch(`/university/${select.id}/`, {
        quota: e.target.ariaValueNow,
      });
    } catch (error) {}
  };
  return (
    <>
      <UniversitetBackoffice>
        <div className="infoTopBlock">
          <div className="infoDanJs">
            <div className="infoTop">
              <h1 className="link_h1 ">{t("p259")}</h1>
            </div>
            <img
              style={{ objectFit: "cover" }}
              className="img_big"
              src={
                UniID.images.length === 0
                  ? image
                  : UniID.images[0].image.toString()
              }
            />
            <div className="user_info">
              <img
                src={
                  UniID.images.length === 0
                    ? userpic
                    : UniID.images[0].image.toString()
                }
                alt=""
              />
              <div className="infoBottom">
                <h1>{UniID.name}</h1>
                <h2>
                  {UniID.city.name}, {UniID.city.country.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="info">
          <div className="info-1">
            <h1>
              {t("p260")} {foiz}%
            </h1>
            <h2>{t("p261")}</h2>
            <div className="info_line">
              <div className="info_out">
                <div className="info_in" style={{ width: `${foiz}%` }}>
                  <h1>{foiz}%</h1>
                </div>
              </div>
              <div className="info_line_list">
                <div>
                  <h3>{t("p262")}</h3>
                </div>
                <div>
                  <h3>
                    {t("p263")} {UniID.images.length} {t("p264")}
                  </h3>
                </div>
                <div>
                  <h3>{t("p265")}</h3>
                </div>
                <div>
                  <h3>{t("p266")}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="single_down">
            <div className="single_h1">
              <h1>{t("p267")}</h1>
              <LangContainer
                style={danniInp ? { display: "flex" } : { display: "none" }}
              >
                {state.objects?.map((item, index) => {
                  return (
                    <>
                      <button
                        key={index}
                        className={toggleActiveStyle(index)}
                        onClick={(e) => handleLang(e, index)}
                      >
                        {item.name}
                      </button>
                    </>
                  );
                })}
              </LangContainer>
              <button onClick={() => setDanniInp(true)}>
                {danniInp ? null : t("p278")}
              </button>
            </div>
            <div className="single_info">
              <div className="info_1">
                <div>
                  <h1>{t("p268")}</h1>
                </div>
                <div>
                  {danniInp ? (
                    <input
                      className="danniInpEdit"
                      type="text"
                      name={`name_${lang}`}
                      value={
                        lang === "uz"
                          ? list.name_uz
                          : lang === "ru"
                          ? list.name_ru
                          : list.name_en
                      }
                      onChange={handleName}
                    />
                  ) : (
                    <p>{UniID.name}</p>
                  )}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1>{t("p269")}</h1>
                </div>
                <div>
                  {danniInp ? (
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="year_of_creation"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                    />
                  ) : (
                    <p>{UniID.year_of_creation}</p>
                  )}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1>{t("p270")}</h1>
                </div>
                <div>
                  {/* {danniInp ? (
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  ) : ( */}
                  <p>{UniID.city.country.name}</p>
                  {/* )} */}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1> {t("p271")}</h1>
                </div>
                <div>
                  {danniInp ? (
                    <select
                      onChange={(e) => setCityId(e.target.value)}
                      className="danniInpEdit"
                      type="text"
                      name="city"
                    >
                      <option selected hidden value={UniID.city.id}>
                        {UniID.city.name}
                      </option>
                      {city?.map((v) => {
                        return <option value={v.id}>{v.name}</option>;
                      })}
                    </select>
                  ) : (
                    <p>{UniID.city.name}</p>
                  )}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1>{t("p272")}</h1>
                </div>
                <div>
                  {danniInp ? (
                    <input
                      className="danniInpEdit"
                      type="text"
                      name={`motto_${lang}`}
                      value={
                        lang === "uz"
                          ? list.motto_uz
                          : lang === "ru"
                          ? list.motto_ru
                          : list.motto_en
                      }
                      onChange={handleName}
                    />
                  ) : (
                    <p>{UniID.motto}</p>
                  )}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1>{t("p273")} </h1>
                </div>
                <div>
                  {danniInp ? (
                    <>
                      <input
                        className="danniInpEdit"
                        type="text"
                        name="bachelor_degree_fee_per_annum"
                        value={bacalavir?.split(" ")[0]}
                        onChange={(e) => setBacalavir(e.target.value)}
                      />
                      <SelectStyle>
                        <select
                          onChange={(e) => setBachelor(e.target.value)}
                          name="bachelor"
                          id=""
                        >
                          <option selected hidden>
                            {bacalavir?.split(" ")
                              ? bacalavir?.split(" ")[1]
                              : "Валюта"}
                          </option>
                          {currency.map((type) => {
                            return (
                              <option value={type.name}>{type.name}</option>
                            );
                          })}
                        </select>
                      </SelectStyle>
                    </>
                  ) : (
                    <p>{UniID.bachelor_degree_fee_per_annum}</p>
                  )}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1> {t("p274")} </h1>
                </div>
                <div>
                  {danniInp ? (
                    <>
                      <input
                        className="danniInpEdit"
                        type="text"
                        name="masters_degree_fee_per_annum"
                        value={magistr?.split(" ")[0]}
                        onChange={(e) => setMagistr(e.target.value)}
                      />
                      <SelectStyle>
                        <select
                          onChange={(e) => setMaster(e.target.value)}
                          name="masters"
                          id=""
                        >
                          <option selected hidden>
                            {magistr?.split(" ")
                              ? magistr?.split(" ")[1]
                              : "Валюта"}
                          </option>
                          {currency.map((type) => {
                            return (
                              <option value={type.name}>{type.name}</option>
                            );
                          })}
                        </select>
                      </SelectStyle>
                    </>
                  ) : (
                    <p>{UniID.masters_degree_fee_per_annum}</p>
                  )}
                </div>
              </div>
              <div className="info_1">
                <div>
                  <h1> {t("p275")} </h1>
                </div>
                <div>
                  {danniInp ? (
                    <>
                      <input
                        className="danniInpEdit"
                        type="text"
                        name="living_price_per_annum"
                        value={livingPrice?.split(" ")[0]}
                        onChange={(e) => setLivingPrice(e.target.value)}
                      />
                      <SelectStyle>
                        <select
                          onChange={(e) => setLiving(e.target.value)}
                          name="living"
                          id=""
                        >
                          <option selected hidden>
                            {livingPrice?.split(" ")
                              ? livingPrice?.split(" ")[1]
                              : "Валюта"}
                          </option>
                          {currency.map((type) => {
                            return (
                              <option value={type.name}>{type.name}</option>
                            );
                          })}
                        </select>
                      </SelectStyle>
                    </>
                  ) : (
                    <p>{UniID.living_price_per_annum}</p>
                  )}
                </div>
              </div>
              {/* <div className="info_1">
                <div>
                  <h1>Начальная зар - плата выпускников</h1>
                </div>
                <div>
                  {danniInp ? (
                    <input
                      className="danniInpEdit"
                      type="text"
                      name="starting_salary"
                      value={startSalary}
                      onChange={(e) => setStartSalary(e.target.value)}
                    />
                  ) : (
                    <p>{UniID.starting_salary}$</p>
                  )}
                </div>
              </div> */}
              <div
                className="info_1"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div>
                  {danniInp ? (
                    <div>
                      <button
                        style={{
                          padding: "10px 30px",
                          color: "#00587F",
                          outline: "none",
                          border: "none",
                          backgroundColor: "#F3F5F7",
                          borderRadius: "8px",
                        }}
                        onClick={() => setDanniInp(false)}
                      >
                        {t("p276")}
                      </button>
                      <button
                        style={{
                          padding: "10px 30px",
                          color: "white",
                          outline: "none",
                          marginLeft: "30px",
                          border: "none",
                          backgroundColor: "#00587F",
                          borderRadius: "8px",
                        }}
                        onClick={() => setDataUniver()}
                      >
                        {t("p277")}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="info-2">
            <div className="single_h1">
              <h1>{t("p267")}</h1>
              <a onClick={() => setOpenDescript(true)}>{t("p278")}</a>
            </div>
            <div className="info_2_list">
              <h1>{list.description}</h1>
            </div>
          </div>
          <div className="info-3">
            <div className="single_h1">
              <h1>{t("p279")}</h1>
            </div>
            <div className="info_3_list">
              {UniID.images.map((x) => {
                return (
                  <div style={{ position: "relative" }}>
                    <img
                      onClick={() => deleteImg(x.id)}
                      style={{
                        position: "absolute",
                        top: "0",
                        right: "0",
                        width: "25px",
                      }}
                      src={close}
                      alt=""
                    />
                    <img src={x.image} alt="" />
                  </div>
                );
              })}
              <div>
                <div className="type_file">
                  <label htmlFor="chFile">
                    <input type="file" id="chFile" onChange={onSelectFile} />
                    <img src={plus} alt="" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="info-4">
            <div className="single_h1">
              <h1>Локация на карте</h1>
            </div>
            <div className="info_5_list">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyCIuhJElVEhGVPYptJbkrWxEy4lKzEoOA8",
                }}
                defaultCenter={center}
                defaultZoom={15}
              >
                <AnyReactComponent
                  lat={41.31398038757752}
                  lng={69.24571025285795}
                  text=""
                />
              </GoogleMapReact>
            </div>
          </div> */}
        </div>
        {/*  */}
        {/*  */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="class1"
          open={openDescript}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openDescript}>
            <div className="editDescription">
              <div className="modalContainer">
                <h1>{t("p280")}</h1>
                <LangContainer style={{ margin: "10px" }}>
                  {state.objects?.map((item, index) => {
                    return (
                      <>
                        <button
                          key={index}
                          className={toggleActiveStyle(index)}
                          onClick={(e) => handleLang(e, index)}
                        >
                          {item.name}
                        </button>
                      </>
                    );
                  })}
                </LangContainer>
                <textarea
                  onChange={handleName}
                  rows="7"
                  name={`description_${lang}`}
                  cols="40"
                >
                  {lang === "uz"
                    ? list.description_uz
                    : lang === "ru"
                    ? list.description_ru
                    : list.description_en}
                </textarea>
                <div>
                  <button onClick={() => handleClose()}>Отмена</button>
                  <button onClick={(e) => descriptPatch(e)}>Изменить</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>

        {/* //!~img */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="class1"
          open={openImgUniver}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openImgUniver}>
            <div className="editDescription">
              <div className="modalContainer">
                <h1>{t("p281")}</h1>
                {selectedFile && <img src={preview} />}
                {/* <img src={univerImg} alt="" /> */}
                <div>
                  <button onClick={() => handleClose()}>{t("p276")}</button>
                  <button onClick={() => univerImgPost()}>{t("p282")}</button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>

        {/*  */}
        {/*  */}
      </UniversitetBackoffice>
    </>
  );
};

export default Info;

const SelectStyle = styled.div`
  select {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 0.02em;
    color: #00121a;
    outline: none;
    padding: 3px 10px;
    border: 1px solid #00587f;
    border-radius: 8px;
    color: #00121a;
    background: none;
    margin-left: 15px;
  }
  @media only screen and (max-width: 425px) {
    select {
      margin: 0;
      margin-top: 8px;
    }
  }
  @media only screen and (max-width: 425px) {
    margin: 0 !important;
  }
`;

const LangContainer = styled.div`
  display: flex;
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
  button {
    height: 35px;
    width: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white !important;
    color: #00587f !important;
    border: 1px solid #00587f !important;
    border-radius: 5px;
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      background: #00587f !important;
      color: white !important;
      border: none !important;
      transition: all 0.3s ease !important;
    }
  }
  .active {
    background: #00587f !important;
    color: white !important;
    border: none !important;
  }
`;
