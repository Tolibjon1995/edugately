import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components'
import { useTranslation } from "react-i18next";

// UI modal
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Loader from "react-js-loader";
import userpic from "../../../../assets/icon/userpic.svg";

// import img
import search_icon from "../../../../assets/icon/search.svg";
import settings from "../../../../assets/icon/settings.svg";
import close_modal from "../../../../assets/icon/close_modal.svg";
import folder_icon from "../../../../assets/icon/folder_icon.svg";
import closeFilter from "../../../../assets/icon/close.svg";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
// import css
// import '../../../../style/css/SidebarUniverstitet.css';
import "../../../../style/css/napravFakultet.css";
import UniversitetBackoffice from "../universitetBackoffice";
import Axios from "../../../../utils/axios";
import arrow1 from "../../../../assets/icon/arrow1.svg";
import { useSelector } from "react-redux";

const NapravFakultet = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState();
  const [filter, setFilter] = useState("");
  const [searchName, setSearchName] = useState("");
  const [name, setName] = useState();

  const [year, setYear] = useState("");
  const [universtitetName, setUniverstitetName] = useState("");
  const [faculty, setFaculty] = useState();
  const [description, setDescription] = useState("");
  const date = new Date();
  const [lang,setLang] = useState('')
  const [nowDate, setNowDate] = useState(date);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(null);
  const [fixEnd, setFix] = useState(false);
  const [degree, setDegree] = useState();
  const [dataFaculty, setDataFaculty] = useState();
  const [change, setChange] = useState(1);
  const [state,setState] = useState({
    activeObjects:null,
    objects:[{id:1,name:"Uz"},{id:2,name:"Ру"},{id:3,name:"Eng"}]
  })
  const [list,setList] = useState({
    name_ru:'',
    name_uz:'',
    name_en:''
  })
  const [datas, setDatas] = useState({
    education_type:'full_time',
    faculty:"1",
  });
  const [major, setMajor] = useState();
  // modal
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [count,setCount] = useState(0);


const handleLang = (e,index) =>{
  setState({...state,activeObjects:state.objects[index]})
  const {textContent} = e.target;
    textContent === "Uz"  &&  setLang("uz") 
    textContent === "Ру"  &&   setLang("ru")
    textContent === "Eng" &&  setLang('en');
  }



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getDegree = async () => {
    try {
      const res = await Axios.get("/university/degree/");
      setDegree(res.data.results);
    } catch (error) {}
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setDatas((state) => ({ ...state, [name]: value }));
  };
 
  const submitMajor = async (e) => {
    try {
      const res = await Axios.post("/university/major/", {...datas,...list,name:list.name_uz});
      setChange((change) => change + 1);
    } catch (error) {}
    handleClose();
  };
  const handleName = (e) =>{
    const {name,value} = e.target
    setList((prev) => ({...prev,[name]:value}) )  
 }
 const toggleActiveStyle =(index)=>{
  if(state.objects[index] === state.activeObjects){
    return "active"
  }else {
    return ""
  }
}
  const getMajor = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/own-major/?limit=${rowsPerPage}`
      );
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setLoading(false);
        setMajor(res.data.results);
        setCount(res.data.count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const filterApplicants = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/own-major/?search/?date-from=${
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
        setMajor(results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getFaculty = async () => {
    try {
      const res = await Axios.get("/university/own-faculty/");
      setDataFaculty(res.data.results);
    } catch (error) {}
  };

  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/university/own-major/?limit=${rowsPerPage}&offset=${
          newPage * rowsPerPage
        }`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setMajor(results);
      }
       ;
      setLoading(false);
    } catch (error) {
       ;
      setLoading(false);
    }
  };

  const handleChangeRowsPerPage = async (event) => {
     ;
     ;
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { t, i18n } = useTranslation();
   ;

  useEffect(() => {
    getMajor();
    getFaculty();
  }, []);

  useEffect(() => {
    getMajor();
  }, [change]);
  useEffect(() => {
    getMajor();
  }, [rowsPerPage]);
  const selector = useSelector((state) => state?.payload?.payload.data);
  return (
    <UniversitetBackoffice>
      <div className="napravFakultet">
        <div className="Up_navbar1">
          <h4>{t("p208")} </h4>
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
          <button onClick={handleOpen}>{t("p314")}</button>
          <div className="settSearch">
            <div className="searchUniv">
              <img src={search_icon} alt="" />
              <input
                type="text"
                onChange={(e) => setSearchName(e.target.value)}
                placeholder={t("p315")}
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
            <table>
              <thead>
                <tr>
                  <th className="firstTD">{t("p268")}</th>
                  <th className="firstTD">{t("p241")}</th>
                  <th className="firstTD">{t("p234")}</th>
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
                  major
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((v) => {
                      return (
                        <tr>
                          <td className="firstTD">{v?.name}</td>
                          <td className="firstTD">{v?.faculty_name}</td>
                          <td>
                          {(v?.education_type == "full_time" &&
                                    t("p252")) ||
                                    (v?.education_type === "part_time" &&
                                      t("p375")) ||
                                    (v?.education_type === "distance" &&
                                      t("p253")) ||
                                    (v?.education_type === "night_time" &&
                                      t("p321"))}
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
                <h4>{t("p238")}</h4>
                <p>{t("p239")}</p>
                <div className="datapickBlock">
                  <div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
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
                <p>Выберите страну</p>
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
                  <h5>{t("p316")}</h5>
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
                    <label>{t("p317")}</label>
                    <select onChange={(e) => inputChange(e)} name="faculty">
                      <option></option>
                      {dataFaculty?.map((v) => {
                        return (
                          <>
                            <option value={`${v.id}`}>{v.name}</option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <label>{t("p318")}</label>
                    <input
                      name={`name_${lang}`}
                      type="text"
                      value={lang === "uz" ? list.name_uz : lang === 'ru' ? list.name_ru : list.name_en}
                      onChange={(e) => handleName(e)}
                    />
                  </div>

                  <div>
                    <label>{t("p234")}</label>
                    <select
                      onChange={(e) => inputChange(e)}
                      name="education_type"
                    >
                      <option></option>
                      <option value="full_time">{t("p319")} </option>
                      <option value="part_time">{t("p320")} </option>
                      <option value="distance">{t("p253")}</option>
                      <option value="night_time">{t("p321")} </option>
                    </select>
                  </div>

                  <button
                    onClick={(e) => {
                      submitMajor(e);
                    }}
                  >
                    {t("p282")}
                  </button>
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