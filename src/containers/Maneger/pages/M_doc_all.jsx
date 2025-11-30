import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
import userpic from "../../../assets/icon/LogoAsia.jpg";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import Loader from "react-js-loader";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TableContainer } from "../../../TableContainer";
import M_doc_all_Table from "./M_doc_all_Table";
const M_doc_all = () => {
  const history = useHistory();
  const selector = useSelector((state) => state.payload.payload.data);
  const [filterCountry, setFilterCountry] = useState([]);
  const [student , setStudent] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [document, setDocument] = useState([]);
  const [value, setValue] = React.useState("all");
  const [filters, setfilters] = useState(false);
  const [key, setkey] = React.useState("");
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [next, setNext] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(40);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const [amount, setAmount] = useState("");
  const [pageChange, setPageChange] = useState();
  const [prev, setPrev] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handelFilter = () => {
    setfilters(!filters);
  };

  const univerCountry = async () => {
    try {
      const data2 = await Axios.get("/common/country/");
      const countrys = data2.data.results;
      if (data2.status === 200) {
        setFilterCountry(countrys);
      }
    } catch (err) { }
  };

  const fetchUniversities = async () => {
    try {
      const data = await Axios.get("/university/");
      const { results } = data.data;
      if (data.status === 200) {
        setUniversities(results);
      }
    } catch (error) { }
  };

  const [users, setUsers] = useState([]);

  const userList = async () => {
    setLoading(true);
    const sd = startDate?.getDate();
    const sm = startDate?.getMonth() + 1;
    const sy = startDate?.getFullYear();
    const ed = endDate?.getDate();
    const em = endDate?.getMonth() + 1;
    const ey = endDate?.getFullYear();
    try {
      const data = await Axios.get(
        `applicant/list/?status=managernotary&checked=${value}&date-from=${startDate ? `${sd}.${sm}.${sy}` : ""
      }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&limit=1000&search=${searchName ? searchName : " "
    }`
        // `applicant/list/?status=managernotary&checked=${value}&date-from=${startDate ? `${sd}.${sm}.${sy}` : ""
        // }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&search=${searchName ? searchName : " "
        // }`
      );

      if (data.status === 200) {
        setStudent(data.data.results);
        setCount(data.data.count);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) { }
    setfilters(false);
    setLoading(false);
  };
  useEffect(() => {
    userList();
  }, [searchName]);
  const setFavourite = async (univerId) => {
    try {
      const data = await Axios.post(
        "/enrollee/enrollee-user-favorite-university/",
        {
          university: univerId,
          //   enrollee_user: userId,
        }
      );
    } catch (error) { }
  };
  const test =()=>{
    Axios.get(
      `applicant/list/?status=managernotary&limit=100000`).then((res)=>{
        setStudent(res.data.results);
        setCount(res.data.count);
      }).catch((err)=>{
        console.log(err);
      })
  }
  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    // try {
    //   const res = await Axios.get(
    //     `applicant/list/?status=managernotary&limit=${rowsPerPage}&offset=${newPage * rowsPerPage
    //     }`
    //   );
    //   const { status, data } = res;
    //   const { results } = data;
    //   if (status == 200) {
    //     setUsers(results);
    //   }
    //   ;
    //   setLoading(false);
    // } catch (error) {
    //   ;
    //   setLoading(false);
    // }
  };

  const handleChangeRowsPerPage = async (event) => {
    ;;
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handler = (userId) => {
    setFavourite(userId).then(() => history.push(`/university/${userId}`));
  };

  const { t, i18n } = useTranslation();


  useEffect(() => {
    userList();
    test()
  }, []);
  useEffect(() => {
    userList();
  }, [rowsPerPage]);

  return (
    <React.Fragment>
      <ManegerSidebar />
      <div className="right-doc">
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">{t("p368")}</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {selector.first_name} {selector.last_name}
              </h1>
              <h2>{selector.role}</h2>
            </div>
          </div>
        </div>
        <TableContainer className="asasa">
          <div className="invoys n_documents m_doc_all">
              <Table style={{width: '100%'}}>
              <div className=" ab_1">
              <div className="excel table_excel_btn">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  className="download-table-xls-button"
                  table="table_excel"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText="Excel"
                />
              </div>
              <div className="search">
                <div className="input">
                  <button>
                    <img src={search} alt="" />
                  </button>
                  <input
                    type="text"
                    onChange={(e) => setSearchName(e.target.value)}
                  />
                </div>
                <div className="filtr_btn">
                  <button onClick={handelFilter}>
                    <img src={filter} alt="" />
                  </button>
                </div>
              </div>
              </div>
              </Table>
              <div
            className="abitFilBox"
            style={
              filters
                ? { width: "100%" }
                : { width: "0", transition: "0.5s step-end" }
            }
          >
            <div
              className="abitFilCl"
              onClick={() => setfilters(!filters)}
            ></div>
            <div
              className="ab_2"
              style={
                filters
                  ? { transform: "translateX(0)", transition: "0.5s" }
                  : { transform: "translateX(100%)", transition: "0.5s" }
              }
            >
              <button
                onClick={() => {
                  setfilters(!filters);
                }}
                className="ab_2_close"
              >
                <img src={close} alt="" />
              </button>
              <h1> {t("p238")}</h1>
              <div className="form_ab">
                <h2>{t("p239")}</h2>
                <div className="form_div">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd MMM yyyy"
                    placeholderText={t("p215")}
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd MMM yyyy"
                    minDate={startDate}
                    placeholderText={t("p216")}
                  />
                </div>
              </div>
              <div className="form_ab">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="true"
                      control={<Radio color="primary" />}
                      label={t("p404")}
                    />
                    <FormControlLabel
                      value="false"
                      control={<Radio color="primary" />}
                      label={t("p403")}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="form_ab">
                <button className="form_button" onClick={userList}>
                  {t("p246")}
                </button>
              </div>
            </div>
              </div>
          </div>
          <M_doc_all_Table student={student}  count={count}/>
        </TableContainer>
        
      </div>
    </React.Fragment>
  );
};

export default M_doc_all;
const Table = styled.div`
@media (max-width: 768px) {
  overflow-x: hidden;
  .ab_1{
    width:90%;
    .search{
      width:100%
    }
    .table {
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
    }
  
  }
  @media (max-width: 425px) {
    .ab_1 {
      width:90%;
      .search{
        width:136%
      }
       .table {
       width: 100%;
       overflow: hidden;
       overflow-x: scroll;
     }
  @media (max-width: 320px) {
   .ab_1 {
     width:90%;
     .search{
       width:156%
     }
      .table {
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
    }
  }`;

  /*
  <div className="invoys n_documents m_doc_all">
          <Table>
            <div className="ab_1">
              
              <div className="table">
                <div className="table_up">
                  <div>
                    <h1>{t("p369")} </h1>
                  </div>
                  <div></div>
                </div>
                <table id="table_excel">
                    <thead>
                      <th>№</th>
                      <th>{t("p230")}</th>
                      <th>{t("p231")}</th>
                      <th>{t("p347")}</th>
                      <th>{t("p232")}</th>
                      <th>{t("part53")}</th>
                      <th>{t("p234")}</th>
                      <th> {t("p208")}</th>
                      <th>{t("p370")}</th>
                      <th>{t("p371")}</th>
                      {(selector.role == "supermanager" && (
                        <th>{t("p236")}</th>
                      )) ||
                        null}
                      {(selector.role == "supermanager" && (
                        <th>{t("p237")}</th>
                      )) ||
                        null}
                      <th>{t("p313")}</th>
                    </thead>{" "}
                    {loading ? (
                      <Loader
                        className="spinner2"
                        type="spinner-circle"
                        bgColor={"#FFFFFF"}
                        color={"#FFFFFF"}
                        size={80}
                      />
                    ) : (
                      <tbody>
                        {student.map((v, i) => {
                            return (
                              <tr>
                                <th>{i + 1}</th>
                                <th className="name">
                                  <Link
                                    to={`${(selector.role == "manager" &&
                                        "/m-docs_all/") ||
                                      "/superManager-docs_all/"
                                      }${v.id}`}
                                  >
                                    {v?.first_name} {v?.last_name}
                                  </Link>
                                </th>
                                <th>{v.phone_number}</th>
                                <th>{v?.major?.faculty?.university?.name}</th>
                                <th>{v?.faculty}</th>
                                <th>{v?.degree}</th>
                                <th>{v?.manager}</th>
                                <th>
                                  {(v?.education_type == "full_time" &&
                                    t("p252")) ||
                                    (v?.education_type === "part_time" &&
                                      t("p375")) ||
                                    (v?.education_type === "distance" &&
                                      t("p253")) ||
                                    (v?.education_type === "night_time" &&
                                      t("p321"))}
                                </th>
                                <th>{v?.major?.name}</th>
                                <th>{v?.original}</th>
                                <th
                                  style={{
                                    color: `${(v.step == "notary" && "green") || "red"
                                      }`,
                                  }}
                                >
                                  {(v.step == "notary" && t("p615")) ||
                                    t("p616")}
                                </th>
                                <th>{v?.manager_set_date?.slice(0, 10)}</th>
                              </tr>
                            );
                          })}
                      </tbody>
                    )}
                  </table>
                <TableContainer>
                  
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[20, 40, 60, 500]}
                  component="table"
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </Table>
          <div
            className="abitFilBox"
            style={
              filters
                ? { width: "100%" }
                : { width: "0", transition: "0.5s step-end" }
            }
          >
            <div
              className="abitFilCl"
              onClick={() => setfilters(!filters)}
            ></div>
            <div
              className="ab_2"
              style={
                filters
                  ? { transform: "translateX(0)", transition: "0.5s" }
                  : { transform: "translateX(100%)", transition: "0.5s" }
              }
            >
              <button
                onClick={() => {
                  setfilters(!filters);
                }}
                className="ab_2_close"
              >
                <img src={close} alt="" />
              </button>
              <h1> {t("p238")}</h1>
              <div className="form_ab">
                <h2>{t("p239")}</h2>
                <div className="form_div">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd MMM yyyy"
                    placeholderText={t("p215")}
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd MMM yyyy"
                    minDate={startDate}
                    placeholderText={t("p216")}
                  />
                </div>
              </div>
              <div className="form_ab">
                <FormControl component="fieldset">
                  {/* <FormLabel component="legend">Status</FormLabel> */
        //           <RadioGroup
        //             aria-label="gender"
        //             name="gender1"
        //             value={value}
        //             onChange={handleChange}
        //           >
        //             <FormControlLabel
        //               value="true"
        //               control={<Radio color="primary" />}
        //               label={t("p404")}
        //             />
        //             <FormControlLabel
        //               value="false"
        //               control={<Radio color="primary" />}
        //               label={t("p403")}
        //             />
        //           </RadioGroup>
        //         </FormControl>
        //       </div>
        //       <div className="form_ab">
        //         <button className="form_button" onClick={userList}>
        //           {t("p246")}
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // </div>
