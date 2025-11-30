import React, { useState, useEffect, useCallback } from "react";
import NotariusSidebar from "../NotariusSidebar";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import avatar from "../../../assets/icon/Avatar.svg";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import Loader from "react-js-loader";
import userpic from "../../../assets/icon/LogoAsia.jpg";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const N_document = () => {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [count, setCount] = useState("");
  const [filterCountry, setFilterCountry] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [document, setDocument] = useState([]);
  const [filters, setfilters] = useState(false);
  const [key, setkey] = useState("");
  const [radio, setRadio] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const { t, i18n } = useTranslation();
  const selector = useSelector((state) => state);
  const { payload } = selector?.payload;
  const { first_name, last_name } = payload?.data;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [value, setValue] = React.useState("all");
  const [searchName, setSearchName] = useState("");
  const [student , setStudent] = useState([]);

  const handleChange = (event) => {
    setkey(event.target.value);
  };

  const handelFilter = useCallback(() => {
    setfilters(() => !filters);
  }, []);

  const univerCountry = async () => {
    try {
      const data2 = await Axios.get("/common/country/");
      const countrys = data2.data.results;
      if (data2.status === 200) {
        setFilterCountry(countrys);
      }
    } catch (err) {}
  };

  const fetchUniversities = async () => {
    try {
      const data = await Axios.get("/university/");
      const { results } = data.data;
      if (data.status === 200) {
        setUniversities(results);
      }
    } catch (error) {}
  };

  const [users, setUsers] = useState([]);
  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/?status=notary&limit=${rowsPerPage}&offset=${
          newPage * rowsPerPage
        }`
      );
      const { status, data } = res;
      const { results, previous } = data;
      if (status == 200) {
        setDocument(results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const userList = async () => {
    setLoading(true);
    try {
      const data = await Axios.get(
        `/applicant/list/?status=notary&limit=${rowsPerPage}`
      );
      const { results, count } = data.data;
      if (data.status === 200) {
        setDocument(results);
        setCount(count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const userList2 = async () => {
    setLoading(true);
    const sd = startDate?.getDate();
    const sm = startDate?.getMonth() + 1;
    const sy = startDate?.getFullYear();
    const ed = endDate?.getDate();
    const em = endDate?.getMonth() + 1;
    const ey = endDate?.getFullYear();
    try {
      const data = await Axios.get(
        `applicant/list/?status=notary=${value}&date-from=${startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}`
      );

      if (data.status === 200) {
        setDocument(data.data.results);
        setCount(data.data.count);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) { }
    setfilters(false);
    setLoading(false);
  };
  useEffect(() => {
    userList2();
  }, [searchName]);



  const handleRadio = (e) => {
    setRadio(e.target.value);
  };
  const fetchRadio = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/applicant/list/?status=${radio}`);
      const { data, status } = res;
      if (status === 200) {
        const { results } = data;
        setDocument(results);
      }
      setLoading(false);
      setfilters(!filter);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    userList();
  }, [rowsPerPage]);
  useEffect(() => {
    fetchUniversities();
    univerCountry();
    userList();
  }, []);
  return (
    <React.Fragment>
      <NotariusSidebar />
      <div >
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Документы полученные от Консультантов</h1>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <h1>
                {first_name} {last_name}
              </h1>
              <h2>Нотариус</h2>
            </div>
          </div>
        </div>
        <div className="invoys n_documents">
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
                <input type="text" onChange={handleChange} />
              </div>
              <div className="filtr_btn">
                <button style={{cursor: 'pointer'}} onClick={handelFilter}>
                  <img src={filter} alt="" />
                </button>
              </div>
            </div>
            <div className="table">
              <div className="table_up">
                <div>
                  <h1>Список документов</h1>
                </div>
                <div></div>
              </div>

              <table id="table_excel">
                <thead>
                  <th>№</th>
                  <th>ФИО</th>
                  <th>Страна</th>
                  <th>Университет</th>
                  <th>Телефон номер</th>
                  <th>Статус</th>
                </thead>
                <tbody>
                  {loading ? (
                    <Loader
                      type="spinner-circle"
                      bgColor={"#fff"}
                      color={"black"}
                      size={70}
                    />
                  ) : (
                    document.map((data, index) => {
                      const {
                        first_name,
                        last_name,
                        manager_sent_notary,
                        middle_name,
                        address,
                        phone_number,
                        id,
                        university,
                        need_to_translate,
                        manager_comment_for_notary,
                        status,
                        country,
                      } = data;
                      if (filters) {
                        return (
                          <tr key={id}>
                            <th>{index + 1}</th>
                            <th>
                              <Link to={`/n-document/:${id}`}>
                                {last_name} {first_name}
                              </Link>
                            </th>
                            <th>{country}</th>
                            <th>{university}</th>
                            <th>{phone_number}</th>

                            <th>
                              {" "}
                              {status === "manager_rejected" ? (
                                <p style={{ color: "orange" }}>
                                  перевести еще раз{" "}
                                </p>
                              ) : status === "manager_checking" ? (
                                <p> менеджер проверяет </p>
                              ) : status === "need_to_translate" ? (
                                <p style={{ color: "red" }}>нужно перевести </p>                                
                              ) : (
                                ""
                              )}{" "}
                            </th>
                          </tr>
                        );
                      } else {
                        if (
                          last_name.toUpperCase().includes(key.toUpperCase()) || first_name.toUpperCase().includes(key.toUpperCase()) || middle_name.toUpperCase().includes(key.toUpperCase())
                        ) {
                          return (
                            <tr>
                              <th>{index + 1}</th>
                              <th>
                                <Link to={`/n-document/:${id}`}>
                                {last_name} {first_name} {middle_name}
                                </Link>
                              </th>
                              <th>{country}</th>
                              <th>{university}</th>
                              <th>{phone_number}</th>
                              <th>
                                {" "}
                                {status === "manager_rejected" ? (
                                  <p style={{ color: "orange" }}>
                                    перевести еще раз{" "}
                                  </p>
                                ) : status === "manager_checking" ? (
                                  <p> менеджер проверяет </p>
                                ) : status === "need_to_translate" ? (
                                  <p style={{ color: "red" }}>
                                    нужно перевести{" "}
                                  </p>
                                ) : (
                                  ""
                                )}{" "}
                              </th>
                            </tr>
                          );
                        }
                        // if (data.faculty === null){
                        //     return(
                        //         "sasas"
                        //     )
                        // }
                      }
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
          </div>
          {/* // ! coment */}
          <div className="NdocKonsult" id={filters ? "raa2" : "raa1"}>
            <div
              className="closeNdocKonsult"
              onClick={() => setfilters(false)}
            ></div>
            {/* <div className="ab_2" id={filters ? "ra0" : "ra100"}> */}
            <div className="ab_2">
              <button onClick={() => setfilters(false)} className="ab_2_close">
                <img src={close} alt="" />
              </button>
              <h1>Фильтры</h1>
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
                <div className="form_ab">
                <button className="form_button" onClick={userList2}>
                  {t("p315")}
                </button>
              </div>
              </div>
              <Filter>
                <RadioGroup
                  aria-label="gender"
                  defaultValue="female"
                  onChange={handleRadio}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="all"
                    control={<Radio color="primary" />}
                    label="все"
                  />
                  <FormControlLabel
                    value="notary"
                    control={<Radio color="primary" />}
                    label="нужно перевести"
                  />
                  <FormControlLabel
                    value="checking"
                    control={<Radio color="primary" />}
                    label="менеджер проверяет"
                  />
                  <FormControlLabel
                    value="reject"
                    control={<Radio color="primary" />}
                    label="перевести еще раз"
                  />
                </RadioGroup>
              </Filter>

              <div className="form_ab">
                <button className="form_button" onClick={fetchRadio}>
                  {t("p246")}
                </button>
              </div>
            </div>
          </div>
          {/* // ! comment  */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default N_document;

const Filter = styled.div`
  width: 100%;
`;
