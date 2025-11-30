import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
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
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
import styled from "styled-components";
import { TableContainer } from "../../../TableContainer";
const M_doc_send = () => {
  const history = useHistory();
  const selector = useSelector((state) => state?.payload?.payload?.data);
  const [filterCountry, setFilterCountry] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [facultyId, setFacultyId] = useState();
  const [document, setDocument] = useState();
  const [searchName, setSearchName] = useState("");
  const [filters, setfilters] = useState(false);
  const [unverId, setUnverId] = useState();
  const [typeEdu, setTypeEdu] = useState("");
  const [key, setkey] = React.useState("");
  const [facultys, setFacultys] = useState();
  const [loading, setLoading] = useState();
  const [managers, setManager] = useState([]);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [counts, setCounts] = useState();
  const [amount, setAmount] = useState("");
  const [pageChange, setPageChange] = useState();
  const [prev, setPrev] = useState("");
  function handleChange(event) {
    setkey(event.target.value);
  }

  const handelFilter = () => {
    setfilters(!filters);
  };
  const filterUserList = async () => {
    setLoading(true);
    const sd = startDate?.getDate();
    const sm = startDate?.getMonth() + 1;
    const sy = startDate?.getFullYear();
    const ed = endDate?.getDate();
    const em = endDate?.getMonth() + 1;
    const ey = endDate?.getFullYear();
    try {
      const data = await Axios.get(
        `/applicant/list/?status=notary_sent_and_come&university_id=${unverId}&faculty_id=${facultyId}&education_type=${typeEdu}&date-from=${
          startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&search=${
          searchName ? searchName : " "
        }&limit=1000`
      );
      setDocument(data.data.results);
      if (data.status == 200) {
        setLoading(false);
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
        `/university/?limit=${rowsPerPage}&offset=${newPage * rowsPerPage}`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setDocument(results);
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

  const userList = async () => {
    setLoading(true);
    try {
      const data = await Axios.get(
        `/applicant/list/?status=notary_sent_and_come`
      );
      if (data.status == 200) {
        setDocument(data.data.results);
        setCounts(data.data.count);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getUniver = async () => {
    try {
      const data = await Axios.get("/university/");
      setUniversities(data.data.results);
    } catch (error) {
      setLoading(false);
    }
  };

  const { t, i18n } = useTranslation();
   ;

  useEffect(() => {
    userList();
    getUniver();
  }, []);

  useEffect(() => {
    filterUserList();
  }, [searchName]);

  useEffect(() => {
    universities?.map(
      (m) => {
        if (unverId == m.id) {
          return setFacultys(m?.faculties);
        }
      },
      [unverId]
    );
  });
  const getManager = async () => {
    try {
      const res = await Axios.get("company/managers/list/");
      setManager(res.data.results);
    } catch {}
  };

  useEffect(() => {
    {
      selector.role == "supermanager" && getManager();
    }
  }, []);

  return (
    <React.Fragment>
      <ManegerSidebar />
      <div className="left-status">
        <div className="up_nav n_up">
          <div className="single_h1">
            <h1 className="link_h1">{t("p367")}</h1>{" "}
            <h3>
              {" "}
              {" > "}
              {t("p335")}
            </h3>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {selector?.first_name} {selector?.last_name}
              </h1>
              <h2>{selector?.role}</h2>
            </div>
          </div>
        </div>
        <div className="invoys n_documents M_doc_send">
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
                    <tr>
                    <th>{t("p230")}</th>
                    <th>{t("p231")}</th>
                    <th>{t("p232")}</th>
                    <th>{t("p233")}</th>
                    <th>{t("p234")}</th>
                    <th>{t("p208")}</th>
                    <th>{t("p372")}</th>
                    <th>{t("p373")}</th>
                    <th>{t("p360")}</th>
                    <th>{t("p371")}</th>
                    {(selector?.role == "supermanager" && (
                      <th>{t("p236")}</th>
                    )) ||
                      ""}
                    {(selector?.role == "supermanager" && (
                      <th>{t("p237")}</th>
                    )) ||
                      ""}
                    </tr>
                  </thead>
                  
                    {loading ? (
                      <Loader
                        type="spinner-circle"
                        bgColor={"#FFFFFF"}
                        color={"#FFFFFF"}
                        size={80}
                      />
                    ) : (
                      document
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((v, i) => {
                          return (
                            <tbody key={i}>
                            <tr >
                              <th className="name">
                                {v?.first_name} {v.last_name}
                              </th>
                              <th>{v.phone_number}</th>
                              <th>{v?.faculty}</th>
                              <th>{v?.degree}</th>
                              {/* <th>{data?.manager}</th> */}
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
                              <th>{v?.need_translated_count}</th>
                              {/* <th>{v.faculty === null ? "" : v.faculty.university}</th> */}
                              <th>{t("p353")}</th>
                              <th>{v?.manager_sent_notary?.slice(0, 10)}</th>
                              <th
                                style={{
                                  color: `${
                                    (v.step == "manager_checking_notary" &&
                                      "green") ||
                                    "red"
                                  }`,
                                }}
                              >
                                {(v.step == "manager_checking_notary" &&
                                  "переведен") ||
                                  "Не  переведен"}
                              </th>
                              {(selector?.role == "supermanager" && (
                                <th>
                                  {v?.manager?.first_name}
                                  {v?.manager?.last_name}
                                </th>
                              )) ||
                                ""}
                              {(selector?.role == "supermanager" && (
                                <th>{v?.manager?.phone_number}</th>
                              )) ||
                                ""}
                            </tr>
                            </tbody>
                          );
                        })
                    )}
                  
                </table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[20, 40, 60]}
                  component="table"
                  count={counts}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </div>
          </Table>

          {(selector.role != "supermanager" && (
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
                <h1>{t("p238")}</h1>
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
                      placeholderText=""
                    />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd MMM yyyy"
                      minDate={startDate}
                      placeholderText=""
                    />
                  </div>
                </div>
                <div className="form_ab">
                  <h2> {t("p374")}</h2>
                  <select
                    name=""
                    onChange={(e) => setUnverId(e.target.value)}
                    id=""
                  >
                    {universities.map((m) => {
                      return <option value={m.id}>{m.name}</option>;
                    })}
                  </select>
                </div>
                <div className="form_ab">
                  <h2>{t("p207")}</h2>
                  <select onChange={(e) => setFacultyId(e.target.value)}>
                    <option>{t("p207")}</option>
                    {facultys?.map((v, i) => {
                      return <option value={v.id}>{v?.name}</option>;
                    })}
                  </select>
                </div>
                <div className="form_ab">
                  <h2>{t("p234")}</h2>
                  <select
                    onChange={(e) => setTypeEdu(e.target.value)}
                    name=""
                    id=""
                  >
                    <option></option>
                    <option value="full_time">{t("p252")}</option>
                    <option value={"part_time"}>{t("p375")}</option>;
                    <option value={"distance"}>{t("p245")}</option>;
                    <option value={"night_time"}>{t("p376")}</option>;
                  </select>
                </div>
                <div className="form_ab">
                  <button className="form_button" onClick={filterUserList}>
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
                <h1>{t("p238")}</h1>
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
                      placeholderText=""
                    />
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="dd MMM yyyy"
                      minDate={startDate}
                      placeholderText=""
                    />
                  </div>
                </div>
                <div className="form_ab">
                  <h2>{t("p256")}</h2>
                  <select
                    onChange={(e) => setCurrent(e.target.value)}
                    name="manager"
                    id=""
                  >
                    <option value=""></option>
                    {managers.map((m) => {
                      return (
                        <option value={m.id}>
                          {m.first_name}-{m.last_name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form_ab">
                  <h2>{t("p374")}</h2>
                  <select
                    name=""
                    onChange={(e) => setUnverId(e.target.value)}
                    id=""
                  >
                    <option>{t("p374")}</option>
                    {universities.map((m) => {
                      return <option value={m.id}>{m.name}</option>;
                    })}
                  </select>
                </div>
                <div className="form_ab">
                  <h2>{t("p207")}</h2>
                  <select onChange={(e) => setFacultyId(e.target.value)}>
                    <option>{t("p207")}</option>
                    {facultys?.map((v, i) => {
                      return <option value={v.id}>{v?.name}</option>;
                    })}
                  </select>
                </div>
                <div className="form_ab">
                  <h2>{t("p234")}</h2>
                  <select
                    onChange={(e) => setTypeEdu(e.target.value)}
                    name=""
                    id=""
                  >
                    <option></option>
                    <option value="full_time">{t("p252")}</option>
                    <option value={"part_time"}>{t("p375")}</option>;
                    <option value={"distance"}> {t("p245")}</option>;
                    <option value={"night_time"}> {t("p376")}</option>;
                  </select>
                </div>
                <div className="form_ab">
                  <button className="form_button" onClick={filterUserList}>
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

export default M_doc_send;
const Table = styled.div`
width:100%;
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
  }
}
    }}}`;
