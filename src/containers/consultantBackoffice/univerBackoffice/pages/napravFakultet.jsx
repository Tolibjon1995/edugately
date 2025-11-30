import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "react-js-loader";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
// UI modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import userpic from "../../../../assets/icon/userpic.svg";

import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
// import img
import search_icon from "../../../../assets/icon/search.svg";
import settings from "../../../../assets/icon/settings.svg";
import close_modal from "../../../../assets/icon/close_modal.svg";
import folder_icon from "../../../../assets/icon/folder_icon.svg";
import closeFilter from "../../../../assets/icon/close.svg";
import edit from "../../../../assets/icon/edit.svg";
// import css
// import '../../../../style/css/SidebarUniverstitet.css';
import "../../../../style/css/napravFakultet.css";
import UniversitetBackoffice from "../universitetBackoffice";
import Axios from "../../../../utils/axios";
import arrow1 from "../../../../assets/icon/arrow1.svg";
import { useSelector } from "react-redux";

const NapravFakultet = () => {
  const select = useSelector((state) => state.payload.payload.data);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [filter, setFilter] = useState("");
  const [lang, setLang] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState();
  const [name, setName] = useState('');
  const [list,setList] = useState({
    name_ru:'',
    name_uz:'',
    name_en:''
  })
  const [universtitetName, setUniverstitetName] = useState(0);
  const [kvota, setKvota] = useState(null);
  const [description, setDescription] = useState("");
  const date = new Date();
  const [nowDate, setNowDate] = useState(date);
  const [defaultt, setDefault] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(null);
  const [living, setLiving] = useState("");
  const [fixEnd, setFix] = useState(false);
  const [degree, setDegree] = useState();
  const [degreeName, setDegreeName] = useState();
  const [degreeId, setDegreeId] = useState();
  const [dataFaculty, setDataFaculty] = useState();
  const [change, setChange] = useState(1);
  const [type, setType] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [currency, setCurrency] = useState([]);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState();
  const [state,setState] = useState({
    activeObjects:null,
    objects:[{id:1,name:"Uz"},{id:2,name:"Ру"},{id:3,name:"Eng"}]
  })
  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/own-faculty/?limit=${rowsPerPage}&offset=${
          newPage * rowsPerPage
        }`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setDataFaculty(results);
      }
       ;
      setLoading(false);
    } catch (error) {
       ;
      setLoading(false);
    }
  };
  const getCurrency = async () => {
    try {
      const res = await Axios.get(`/university/${select.id}/`);
      const { data, status } = res;
      if (status === 200) {
        const { bachelor_degree_fee_per_annum } = data;
        const currency = bachelor_degree_fee_per_annum.split(" ");
        const currencyType = currency[currency.length - 1];
        setCurrency(currencyType);
      }
       ;
    } catch (error) {
       ;
    }
  };
  const handleChangeRowsPerPage = async (event) => {
     ;
     ;
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const getDegree = async () => {
    try {
      const res = await Axios.get("/university/degree/?limit=1000");
      setDegree(res.data.results);
    } catch (error) {}
  };

  const getFaculty = async () => {
    try {
      const res = await Axios.get("/university/own-faculty/?limit=1000");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setDataFaculty(res.data.results);
        setCount(res.data.count);
      }
    } catch (error) {}
  };

  const filterApplicants = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/own-faculty/?search/?date-from=${
          startDate ? startDate.toLocaleDateString() : ""
        }&date-to=${
          endDate ? endDate.toLocaleDateString() : ""
        }&payment-status=${filter ? filter.filter : ""}&search=${
          searchName ? searchName : " "
        }`
      );
      const { data, status } = res;
      const { results } = data;
      if (status == 200) {
        setDataFaculty(results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const geteditFaculty = async (id) => {
    handleOpen();
    setUpdate(true);
    setId(id);
    try {
      const res = await Axios.get(`/university/faculty/${id}/`);
      const { status, data } = res;
       ;
      if (status == 200) {
        setList({name_ru:data.name_ru,name_uz:data.name_uz,name_en:data.name_en})
        setKvota(data.quota);
        setPrice(data.education_fee);
        setDegreeName(data.degree_name);
        setDegreeId(data.degree);
      }
    } catch (error) {
       ;
    }
  };
  const postEditFaculty = async () => {
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    try {
      const res = await Axios.patch(`/university/faculty/${id}/`, {
        name: list.name_ru,
        quota: kvota,
        description: description,
        deadline: year + "-" + month + "-" + day,
        education_fee: price,
        education_type: type,
        degree_id: degreeId,
        name_ru:list.name_ru,
        name_en:list.name_en,
        name_uz:list.name_uz
      });
      const { status } = res;
      if (status == 200) {
        setName(0);
        setKvota(null);
        setPrice(null);
        setDegreeName(null);
        getFaculty();
      }
    } catch (error) {
       ;
    }
    setUpdate(false);
    // getFaculty();
    handleClose();
  };

  const submitFaculty = async (e) => {
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    const final = {
      name: list.name_ru,
      universtitetName: universtitetName,
      quota: kvota,
      description: description,
      deadline: year + "-" + month + "-" + day,
      status: status,
      education_fee: price,
      education_type: type,
      degree_id: degreeId,
      name_ru:list.name_ru,
      name_en:list.name_en,
      name_uz:list.name_uz
    }
    try {
      const res = await Axios.post("/university/own-faculty/", final);
      setLoading(false);
      setChange((change) => change + 1);
    } catch (error) {}

    handleClose();
  };

  const { t, i18n } = useTranslation();
  const langOption = () =>{
    const data = state.objects.filter(item => item.name === i18n.language).flat();
     ;
    setState({...state,activeObjects:data})

  }
  useEffect(()=>{
   langOption()
  },[])
  const handleName = (e) => {
    const { name, value } = e.target;
    setList((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    getDegree();
    getCurrency();
  }, []);

  useEffect(() => {
    getFaculty();
  }, [change]);
  const handleLang = (e,index) =>{
    setState({...state,activeObjects:state.objects[index]})
    const {textContent} = e.target;
      textContent === "Uz"  &&  setLang("uz") 
      textContent === "Ру"  &&   setLang("ru")
      textContent === "Eng" &&  setLang('en');
      setDefault('')
    }
    const toggleActiveStyle =(index)=>{
        if(state.objects[index] === state.activeObjects){
          return "active"
        }else {
          return ""
        }
    }

  useEffect(() => {
    filterApplicants();
  }, [searchName]);
  useEffect(() => {
    getFaculty();
  }, [rowsPerPage]);
  const selector = useSelector((state) => state.payload.payload.data);
  return (
    <UniversitetBackoffice>
      <div className="napravFakultet">
        <div className="Up_navbar1">
          <h4>{t("p207")}</h4>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <p>{selector?.name} </p>
              <p>
                {selector?.city?.name}, {selector?.city?.country.name}
              </p>
            </div>
          </div>
        </div>
        <div className="SidebarUniverstitet">
          <button onClick={handleOpen}>{t("p283")}</button>
          <div className="settSearch">
            <div className="searchUniv">
              <img src={search_icon} alt="" />
              <input
                type="text"
                onChange={(e) => setSearchName(e.target.value)}
                placeholder={t("p284")}
              />
            </div>
            {/* <button
              onClick={() => {
                setFix(!fixEnd);
              }}
              className="settingsUniver"
            >
              <img src={settings} alt="" />
            </button> */}
          </div>
          {/* end settSearch */}
          <div className="univerList fakultet" id="scroll_bar">
            <table className="univerOfficeNapravfakultetTable">
              <thead>
                <tr>
                  <th className="firstTD" style={{ textAlign: "start" }}>
                    {t("p289")}
                  </th>
                  <th>{t("p290")}</th>
                  <th>{t("p291")}</th>
                  <th>{t("p292")}</th>
                  <th>{t("p293")}</th>
                  <th>{t("p294")}</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <Loader
                    type="spinner-circle"
                    bgColor={"#FFFFFF"}
                    color={"#FFFFFF"}
                    size={80}
                  />
                ) : (
                  dataFaculty
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((v) => {
                      return (
                        <tr>
                          <td
                            className="firstTD"
                            style={{ textAlign: "start" }}
                          >
                            {v.name}
                          </td>
                          <td>{v.degree.title}</td>
                          <td className="priDoc">{v.quota}</td>
                          <td>
                            {v.education_fee} {currency}
                          </td>
                          <td>{v.deadline}</td>
                          <td>
                            <img
                              onClick={() => geteditFaculty(v.id)}
                              src={edit}
                              alt=""
                            />
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
            <TablePagination
              rowsPerPageOptions={[20, 40, 60]}
              component="table"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          {/* end univerList */}
          {/* Filter */}
          <div
            className="abitFilBox"
            style={
              fixEnd
                ? { width: "100%" }
                : { width: "0", transition: "0.5s step-end" }
            }
          >
            <div className="abitFilCl" onClick={() => setFix(!fixEnd)}></div>
            <div
              className="FilterFix"
              style={
                fixEnd
                  ? { transform: "translateX(0)", transition: "0.5s" }
                  : { transform: "translateX(100%)", transition: "0.5s" }
              }
            >
              <div
                className="fixLeft"
                onClick={() => {
                  setFix(!fixEnd);
                }}
              ></div>
              <div className="FilterUniver">
                <button
                  onClick={() => {
                    setFix(!fixEnd);
                  }}
                  className="ab_2_close"
                >
                  <img src={closeFilter} alt="" />
                </button>
                <h4> {t("p238")}</h4>
                <p>{t("p239")}</p>
                <div className="datapickBlock">
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      views={["year", "month", "day"]}
                      startDate={startDate}
                      endDate={endDate}
                      placeholderText={t("p215")}
                    />
                  </div>
                  <div>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      placeholderText={t("p216")}
                    />
                  </div>
                </div>
                <p>{t("p295")}</p>
                <div className="selectCountry">
                  <select name="" id="">
                    <option value="">{t("p296")}</option>
                    <option value="">{t("p297")}</option>
                    <option value="">{t("p298")}</option>
                    <option value="">{t("p299")}</option>
                  </select>
                </div>
                <p>{t("p300")}</p>
                <div className="selectCountry">
                  <select name="" id="">
                    <option value="">{t("p301")}</option>
                    <option value="">{t("p302")}</option>
                    <option value="">{t("p303")}</option>
                    <option value="">{t("p304")}</option>
                  </select>
                </div>
                <button>{t("p246")}</button>
              </div>
              {/* end FilterUniver */}
            </div>
          </div>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="class1"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className="addNewUniverModalUniver talaba_modal napravMoodal1">
                <img onClick={handleClose} src={close_modal} alt="" />
                <div className="modalContainer">
                  {update ? (
                    <h5>{t("p305")}</h5>
                  ) : (
                    <h5>{t("p306")}</h5>
                  )}
                   <LangContainer>
                     {state.objects?.map((item,index)=>{
                       return(
                         <>
                         <button key={index} className={toggleActiveStyle(index)}  onClick={(e)=>handleLang(e,index)}>{item.name}</button>
                         </>
                       )
                     })}
                   </LangContainer>
                  <div>
                    <label>{t("p307")}</label>
                    <input
                      type="text"
                      name={`name_${lang}`}
                      value={lang === "uz" ? list.name_uz : lang === 'ru' ? list.name_ru : list.name_en}
                      onChange={(e) => handleName(e)}
                    />
                  </div>
                  <div>
                    <label>{t("p308")}</label>
                    <select onChange={(e) => setDegreeId(e.target.value)}>
                      <option value={degreeId}>{degreeName}</option>
                      {degree?.map((v) => {
                        return <option value={v.id}>{v.title}</option>;
                      })}
                    </select>
                  </div>

                  <div>
                    <label>{t("p291")}</label>
                    <input
                      type="text"
                      value={kvota}
                      onChange={(e) => setKvota(e.target.value)}
                    />
                  </div>

                  <div className="modalDataPick">
                    <label>{t("p309")}</label>
                    <DatePicker
                      selected={nowDate}
                      onChange={(e) => setNowDate(e)}
                      placeholderText={t("p313")}
                    />
                  </div>
                  <div>
                    <label>{t("p310")}</label>
                    <input
                      value={price}
                      type="text"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  {update ? (
                    <button onClick={() => postEditFaculty()}>
                      {t("p311")}
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        submitFaculty(e);
                      }}
                    >
                      {t("p282")}
                    </button>
                  )}

                  <button onClick={handleClose} className="back_btn">
                    <img src={arrow1} alt="" /> {t("p312")}
                  </button>
                </div>
              </div>
            </Fade>
          </Modal>
          {/* end Filter */}
        </div>
      </div>
    </UniversitetBackoffice>
  );
};

export default NapravFakultet;

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
