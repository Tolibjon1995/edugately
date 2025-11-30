import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Loader from "react-js-loader";
import userpic from "../../../assets/icon/LogoAsia.jpg";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import { useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { TableContainer } from "../../../TableContainer";
const M_doc_rec = () => {
  const selector = useSelector((state) => state.payload.payload.data);
  const history = useHistory();
  const [filterCountry, setFilterCountry] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [document, setDocument] = useState([]);
  const [filters, setfilters] = useState(false);
  const [key, setkey] = React.useState("");
  const [next, setNext] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const [amount, setAmount] = useState("");
  const [pageChange, setPageChange] = useState();
  const [prev, setPrev] = useState("");
  const [loading, setLoading] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchName, setSearchName] = useState();
  const [current, setCurrent] = useState("");
  const [managers, setManager] = useState([]);

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
        `/applicant/list/?status=manager_checking_notary&date-from=${startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&search=${searchName ? searchName : " "
        }&limit=1000`
      );
      console.log(data);
      if (data.status === 200) {
        setLoading(false);
        setUsers(data.data.results);
        setCount(data.data.count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setfilters(false);
  };
  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/?status=manager_checking_notary?limit=${rowsPerPage}&offset=${newPage * rowsPerPage
        }`
      );
      const { status, data } = res;
      const { results, count } = data;
      if (status == 200) {
        setUsers(results);
        setCount(count);
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
  function handleChange(event) {
    setkey(event.target.value);
  }

  const handelFilter = () => {
    setfilters(!filters);
  };
  const [users, setUsers] = useState([]);

  const handleSubmit = async () => {
    setLoading(true);
    const sd = startDate?.getDate();
    const sm = startDate?.getMonth() + 1;
    const sy = startDate?.getFullYear();
    const ed = endDate?.getDate();
    const em = endDate?.getMonth() + 1;
    const ey = endDate?.getFullYear();
    try {
      const res = await Axios.get(
        `/applicant/list/?manager-attached=true&status=manager_checking_notary&date-from=${startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""
        }&manager=${current}&search=${searchName ? searchName : " "}`
      );
      const { status, data } = res;
      if (status === 200) {
        const { results, count } = data;
        setUsers(results);
        setCount(count);
      }
      setfilters(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const { t, i18n } = useTranslation();
  ;

  useEffect(() => {
    handleSubmit();
  }, [searchName]);
  const getManager = async () => {
    try {
      const res = await Axios.get("company/managers/list/");
      setManager(res.data.results);
    } catch { }
  };
  useEffect(() => {
    {
      (selector.role == "supermanager" && handleSubmit()) || userList();
    }
    {
      selector.role == "supermanager" && getManager();
    }
  }, []);
  useEffect(() => {
    userList();
  }, [rowsPerPage]);
  return (
    <React.Fragment>
      <ManegerSidebar />
      <div>
        <div className="up_nav n_up">
          <div className="single_h1">
            <h1 className="link_h1"> {t("p367")} </h1>{" "}
            <h3>
              {" "}
              {" > "}
              {t("p205")}
            </h3>
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
        <div className="invoys n_documents M_doc_rec">
          <Table>
            <div className="ab_1">
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
              <div className="table">
                <div className="table_up">
                  <div>
                    <h1> {t("p369")}</h1>
                  </div>
                  <div></div>
                </div>
                <TableContainer>
                  <table id="table_excel">
                    <thead>
                      <th> {t("p230")}</th>
                      <th>{t("p231")}</th>
                      <th>{t("p232")}</th>
                      <th>{t("p233")}</th>
                      <th>{t("p234")} </th>
                      <th> {t("p208")}</th>
                      <th> {t("p377")}</th>
                      <th>{t("p378")}</th>
                      <th>{t("p360")}</th>
                      {(selector.role == "supermanager" && (
                        <th> {t("p236")}</th>
                      )) ||
                        ""}
                      {(selector.role == "supermanager" && (
                        <th>{t("p237")}</th>
                      )) ||
                        ""}
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
                        users?.map((v) => {
                          return (
                            <tr>
                              <th className="name">
                                <Link to={`/m-docs_rec/${v.id}`}>
                                  {v.first_name} {v.last_name}
                                </Link>
                              </th>
                              <th>{v.phone_number}</th>
                              <th>{v?.faculty}</th>
                              <th>{v?.degree}</th>
                              {/* <th>{data?.manager}</th> */}
                              <th>
                                {(v?.education_type == "full_time" && t("p252")) ||
                                  (v?.education_type === "part_time" &&
                                    t("p375")) ||
                                  (v?.education_type === "distance" &&
                                    t("p253")) ||
                                  (v?.education_type === "night_time" &&
                                    t("p321"))}
                              </th>
                              <th>{v?.major?.name}</th>
                              <th>{v?.need_translated_count}</th>
                              <th>Нотариус</th>
                              <th>{v?.notary_sent_manager?.slice(0, 10)}</th>
                              {(selector.role == "supermanager" && (
                                <th>
                                  {v?.manager.first_name}
                                  {v?.manager.last_name}
                                </th>
                              )) ||
                                ""}
                              {(selector.role == "supermanager" && (
                                <th>{v?.manager.phone_number}</th>
                              )) ||
                                ""}
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </TableContainer>
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
            </div>
          </Table>

          {(selector.role == "supermanager" && (
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
                  <h2> {t("p239")}</h2>
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
                  <h2>{t("p236")}</h2>
                  <select
                    onChange={(e) => setCurrent(e.target.value)}
                    name="manager"
                    id=""
                  >
                    <option value=""></option>
                    {managers?.map((m) => {
                      return (
                        <option value={m.id}>
                          {m.first_name}-{m.last_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form_ab">
                  <button className="form_button" onClick={handleSubmit}>
                    {t("p246")}
                  </button>
                </div>
              </div>
            </div>
          )) || (
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
                    <h2> {t("p239")} </h2>
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
                    <button className="form_button" onClick={userList}>
                      {t("p246")}
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default M_doc_rec;
const Table = styled.div`
width:100%;
overflow-x: hidden;
.Up_navbar {
  padding-top: 70px;
}
@media (max-width: 768px) {
 
  overflow-x: hidden;
  .ab_1{
    width:60%;
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
    font-size: 12px;
    .Up_navbar {
      margin-left: 0; 
      padding-top: 50px;
     }
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
    font-size: 12px;
    .Up_navbar {
      margin-left: 0; 
      padding-top: 50px;
     }
   .ab_1 {
     width:68%;
     .search{
       width:100%
     }
      .table {
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
    }
  }`;
