import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useTranslation } from "react-i18next";
import FormLabel from "@material-ui/core/FormLabel";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import Loader from "react-js-loader";
import styled from "styled-components";
import { TableContainer } from "../../../TableContainer";

const M_glavny_table = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterCountry, setFilterCountry] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [universitiesId, setUniversitiesId] = useState("Tatu");
  const [document, setDocument] = useState([]);
  const [filters, setfilters] = useState(false);
  const [faculty, setFaculty] = useState();
  const [value, setValue] = React.useState("all");
  const [users, setUsers] = useState([]);
  const [key, setkey] = React.useState("");
  const [loading, setLoading] = useState();
  const [searchName, setSearchName] = useState("");
  const [next, setNext] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const [amount, setAmount] = useState("");
  const [pageChange, setPageChange] = useState();
  const [prev, setPrev] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handelFilter = () => {
    setfilters(!filters);
  };

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
        `/applicant/list/?limit=${rowsPerPage}&step=${value}&date-from=${startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&search=${searchName ? searchName : " "
        }`
      );
      setUsers(data.data.results);
      setCount(data.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setfilters(false);
  };
  useEffect(() => {
    userList();
  }, []);

  const fetchUniversitiesId = async (id) => {
    try {
      const data = await Axios.get(`/university/university/${id}`);
      setUniversitiesId(data.data.name);

      if (data.status === 200) {
      }
    } catch (error) { }
  };
  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/?limit=${rowsPerPage}&offset=${newPage * rowsPerPage}`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setUsers(results);
        console.log(results);
      }
      ;
      setLoading(false);
    } catch (error) {
      ;
      setLoading(false);
    }
  };

  const { t, i18n } = useTranslation();
  ;

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    userList();
  }, [rowsPerPage]);

  useEffect(() => {
    userList();
  }, [searchName]);

  return (
    <React.Fragment>
      <div className="invoys n_documents">
        <Table>
          <div className="ab_1">
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
              <div className="table_up"></div>
              <TableContainer>
                <table>
                  <thead>
                    <th>{t("p230")}</th>
                    <th>{t("p231")}</th>
                    <th>{t("p347")}</th>
                    <th>{t("p241")}</th>
                    <th>{t("part53")}</th>
                    <th>{t("p234")} </th>
                    <th> {t("p208")}</th>
                    <th>{t("p348")}</th>
                  </thead>
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
                      {users.map((v, i) => {
                        return (
                          <tr>
                            <th  className="name">
                              <Link to={`/m-glavny/${v.id}`}>
                                {v.first_name} {v.last_name} {v.middle_name}
                              </Link>
                            </th>
                            <th>{v?.phone_number}</th>
                            <th>{v?.major?.faculty?.university?.name}</th>
                            <th>{v?.faculty}</th>
                            <th>{v?.degree}</th>
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
                            {
                              v.step == "registered" ?
                                <th className="steps">
                                  <span className={`step`}>
                                    1 <p>{t("p349")}</p>
                                  </span>
                                  <span className="">
                                    2<p>{t("p350")} </p>
                                  </span>

                                  <span className="">
                                    3 <p>{t("p351")} </p>
                                  </span>

                                  <span className="">
                                    4 <p>{t("p352")} </p>
                                  </span>

                                  <span className="">
                                    5 <p>{t("p353")} </p>
                                  </span>

                                  {/* <span className="">
                                    6 <p>manager_checking_notary </p>
                                  </span> */}

                                  <span className="">
                                    6 <p>{t("p354")} </p>
                                  </span>
                                  <span className="">
                                    7 <p>{t("p347")} </p>
                                  </span>
                                  <span className="">
                                    8 <p>{t("p325")} </p>
                                  </span>
                                  <span className="">
                                    9 <p>{t("p326")} </p>
                                  </span>
                                  <span className="">
                                    10 <p>{t("canseled")} </p>
                                  </span>
                                </th> :
                                v.step == "profile_filled" ?
                                  <th className="steps">
                                    <span className={`step`}>
                                      1 <p>{t("p349")}</p>
                                    </span>
                                    <span className="step">
                                      2 <p>{t("p355")} </p>
                                    </span>
                                    <span className="">
                                      3 <p>{t("p351")} </p>
                                    </span>
                                    <span className="">
                                      4 <p>{t("p352")} </p>
                                    </span>

                                    <span className="">
                                      5<p>{t("p353")} </p>
                                    </span>

                                    {/* <span className="">
                                6 <p>manager_checking_notary </p>
                              </span> */}

                                    <span className="">
                                      6 <p>{t("p354")} </p>
                                    </span>
                                    <span className="">
                                      7 <p>{t("p347")} </p>
                                    </span>
                                    <span className="">
                                      8 <p>{t("p325")} </p>
                                    </span>
                                    <span className="">
                                      9 <p>{t("p326")} </p>
                                    </span>
                                    <span className="">
                                      10 <p>{t("canseled")} </p>
                                    </span>
                                  </th> :
                                  v.step == "payment_confirmation" ?
                                    <th className="steps">
                                      <span className={`step`}>
                                        1 <p>{t("p359")}</p>
                                      </span>
                                      <span className="step">
                                        2 <p>{t("p355")} </p>
                                      </span>
                                      <span className="step">
                                        3 <p>{t("p351")} </p>
                                      </span>
                                      <span className="">
                                        4 <p>{t("p352")} </p>
                                      </span>
                                      <span className="">
                                        5 <p>{t("p353")} </p>
                                      </span>
                                      {/* <span className="">
                                6 <p>manager_checking_notary </p>
                              </span> */}
                                      <span className="">
                                        6 <p>{t("p354")} </p>
                                      </span>
                                      <span className="">
                                        7 <p>{t("p347")} </p>
                                      </span>
                                      <span className="">
                                        8 <p>{t("p325")} </p>
                                      </span>
                                      <span className="">
                                        9 <p>{t("p326")} </p>
                                      </span>
                                      <span className="">
                                        10 <p>{t("canseled")} </p>
                                      </span>
                                    </th> :
                                    v.step == "payment_confirmed" || v.step == "manager_checking" ?
                                      <th className="steps">
                                        <span className={`step`}>
                                          1 <p>{t("p349")}</p>
                                        </span>
                                        <span className="step">
                                          2 <p>{t("p355")} </p>
                                        </span>
                                        <span className="step">
                                          3 <p>{t("p351")} </p>
                                        </span>
                                        <span className="step">
                                          4 <p>{t("p352")} </p>
                                        </span>
                                        <span className="">
                                          5 <p>{t("p353")} </p>
                                        </span>
                                        {/* <span className="">
                                6 <p>manager_checking_notary </p>
                              </span> */}
                                        <span className="">
                                          6 <p>{t("p354")} </p>
                                        </span>
                                        <span className="">
                                          7 <p>{t("p347")} </p>
                                        </span>
                                        <span className="">
                                          8 <p>{t("p325")} </p>
                                        </span>
                                        <span className="">
                                          9 <p>{t("p326")} </p>
                                        </span>
                                        <span className="">
                                          10 <p>{t("canseled")} </p>
                                        </span>
                                      </th> :
                                      v.step == "notary" || v.step == "manager_reject_notary" ?
                                        <th className="steps">
                                          <span className={`step`}>
                                            1 <p>{t("p349")}</p>
                                          </span>
                                          <span className="step">
                                            2 <p>{t("p355")} </p>
                                          </span>
                                          <span className="step">
                                            3 <p>{t("p351")} </p>
                                          </span>
                                          <span className="step">
                                            4 <p>{t("p352")} </p>
                                          </span>
                                          <span className="step">
                                            5 <p>{t("p353")} </p>
                                          </span>
                                          {/* <span className="">
                                6 <p>manager_checking_notary </p>
                              </span> */}
                                          <span className="">
                                            6 <p>{t("p354")} </p>
                                          </span>
                                          <span className="">
                                            7 <p>{t("p347")} </p>
                                          </span>
                                          <span className="">
                                            8 <p>{t("p325")} </p>
                                          </span>
                                          <span className="">
                                            9 <p>{t("p326")} </p>
                                          </span>
                                          <span className="">
                                            10 <p>{t("canseled")} </p>
                                          </span>
                                        </th> :
                                        v.step == "manager_checking_notary" ?
                                          <th className="steps">
                                            <span className={`step`}>
                                              1 <p>{t("p349")}</p>
                                            </span>
                                            <span className="step">
                                              2 <p>{t("p355")} </p>
                                            </span>
                                            <span className="step">
                                              3 <p>{t("p351")} </p>
                                            </span>
                                            <span className="step">
                                              4 <p>{t("p352")} </p>
                                            </span>
                                            <span className="step">
                                              5 <p>{t("p353")} </p>
                                            </span>

                                            <span className="">
                                              6 <p>{t("p354")} </p>
                                            </span>
                                            <span className="">
                                              7 <p>{t("p347")} </p>
                                            </span>
                                            <span className="">
                                              8 <p>{t("p325")} </p>
                                            </span>
                                            <span className="">
                                              9 <p>{t("p326")} </p>
                                            </span>
                                            <span className="">
                                              10 <p>{t("canseled")} </p>
                                            </span>
                                          </th> :
                                          v.step == "university" ?
                                            <th className="steps">
                                              <span className={`step`}>
                                                1 <p>{t("p349")}</p>
                                              </span>
                                              <span className="step">
                                                2 <p>{t("p355")} </p>
                                              </span>
                                              <span className="step">
                                                3 <p>{t("p351")} </p>
                                              </span>
                                              <span className="step">
                                                4 <p>{t("p352")} </p>
                                              </span>
                                              <span className="step">
                                                5 <p>{t("p353")} </p>
                                              </span>
                                              <span className="step">
                                                6 <p>{t("p354")} </p>
                                              </span>
                                              <span className="step">
                                                7 <p>{t("p347")} </p>
                                              </span>
                                              <span className="">
                                                8 <p>{t("p325")} </p>
                                              </span>
                                              <span className="">
                                                9 <p>{t("p326")} </p>
                                              </span>
                                              <span className="">
                                                10 <p>{t("canseled")} </p>
                                              </span>
                                            </th> :
                                            v.step == "completed" ?
                                              <th className="steps">
                                                <span className={`step`}>
                                                  1 <p>{t("p349")}</p>
                                                </span>
                                                <span className="step">
                                                  2 <p>{t("p355")} </p>
                                                </span>
                                                <span className="step">
                                                  3 <p>{t("p351")} </p>
                                                </span>
                                                <span className="step">
                                                  4 <p>{t("p352")} </p>
                                                </span>
                                                <span className="step">
                                                  5 <p>{t("p353")} </p>
                                                </span>

                                                <span className="step">
                                                  6 <p>{t("p354")} </p>
                                                </span>
                                                <span className="step">
                                                  7 <p>{t("p347")} </p>
                                                </span>
                                                <span className="step">
                                                  8 <p>{t("p325")} </p>
                                                </span>
                                                <span className="">
                                                  9 <p>{t("p326")} </p>
                                                </span>
                                                <span className="">
                                                  10 <p>{t("canseled")} </p>
                                                </span>
                                              </th> :
                                              v.step == "rejected" ?
                                                <th className="steps">
                                                  <span className={`step`}>
                                                    1 <p>{t("p349")}</p>
                                                  </span>
                                                  <span className="step">
                                                    2 <p>{t("p355")} </p>
                                                  </span>
                                                  <span className="step">
                                                    3 <p>{t("p351")} </p>
                                                  </span>
                                                  <span className="step">
                                                    4 <p>{t("p352")} </p>
                                                  </span>
                                                  <span className="step">
                                                    5 <p>{t("p353")} </p>
                                                  </span>
                                                  <span className="step">
                                                    6 <p>{t("p354")} </p>
                                                  </span>
                                                  <span className="step">
                                                    7 <p>{t("p347")} </p>
                                                  </span>
                                                  <span className="step">
                                                    8 <p>{t("p325")} </p>
                                                  </span>
                                                  <span className="step">
                                                    9 <p>{t("p326")} </p>
                                                  </span>
                                                  <span className="">
                                                    10 <p>{t("canseled")} </p>
                                                  </span>
                                                </th> :
                                                v.step == "cancelled" ?
                                                  <th className="steps">
                                                    <span className={`step`}>
                                                      1 <p>{t("p349")}</p>
                                                    </span>
                                                    <span className="step">
                                                      2 <p>{t("p355")} </p>
                                                    </span>
                                                    <span className="step">
                                                      3 <p>{t("p351")} </p>
                                                    </span>
                                                    <span className="step">
                                                      4 <p>{t("p352")} </p>
                                                    </span>
                                                    <span className="step">
                                                      5 <p>{t("p353")} </p>
                                                    </span>

                                                    <span className="step">
                                                      6 <p>{t("p354")} </p>
                                                    </span>
                                                    <span className="step">
                                                      7 <p>{t("p347")} </p>
                                                    </span>
                                                    <span className="step">
                                                      8 <p>{t("p325")} </p>
                                                    </span>
                                                    <span className="step">
                                                      9 <p>{t("p326")} </p>
                                                    </span>
                                                    <span className="step">
                                                      10 <p>{t("canseled")} </p>
                                                    </span>
                                                  </th> : ''
                            }
                          </tr>
                        );
                        // if (v.step == "registered")
                        //   return (
                        //     <tr>
                        //       <th className="name">
                        //         <Link to={`/m-glavny/${v.id}`}>
                        //           {v.first_name} {v.last_name}
                        //         </Link>
                        //       </th>
                        //       <th>{v?.phone_number}</th>
                        //       <th>{v?.major?.faculty?.university?.name}</th>
                        //       <th>{v?.faculty}</th>
                        //       <th>{v?.degree}</th>
                        //       <th>
                        //         {(v?.education_type == "full_time" &&
                        //           t("p252")) ||
                        //           (v?.education_type === "part_time" &&
                        //             t("p375")) ||
                        //           (v?.education_type === "distance" &&
                        //             t("p253")) ||
                        //           (v?.education_type === "night_time" &&
                        //             t("p321"))}
                        //       </th>
                        //       <th>{v?.major?.name}</th>

                        //       <th className="steps">
                        //         <span className={`step`}>
                        //           1 <p>{t("p349")}</p>
                        //         </span>
                        //         <span className="">
                        //           2<p>{t("p350")} </p>
                        //         </span>

                        //         <span className="">
                        //           3 <p>{t("p351")} </p>
                        //         </span>

                        //         <span className="">
                        //           4 <p>{t("p352")} </p>
                        //         </span>

                        //         <span className="">
                        //           5 <p>{t("p353")} </p>
                        //         </span>

                        //         <span className="">
                        //           6 <p>manager_checking_notary </p>
                        //         </span>

                        //         <span className="">
                        //           6 <p>{t("p354")} </p>
                        //         </span>
                        //       </th>
                        //     </tr>
                        //   );
                        // if (v.step == "profile_filled")
                        //   return (
                        //     <tr>
                        //       <th className="name">
                        //         <Link to={`/m-glavny/${v.id}`}>
                        //           {v.first_name} {v.last_name}
                        //         </Link>
                        //       </th>
                        //       <th>{v?.phone_number}</th>
                        //       <th>{v?.major?.faculty?.university?.name}</th>
                        //       <th>{v?.faculty}</th>
                        //       <th>{v?.degree}</th>
                        //       <th>
                        //         {(v?.education_type == "full_time" &&
                        //           t("p252")) ||
                        //           (v?.education_type === "part_time" &&
                        //             t("p375")) ||
                        //           (v?.education_type === "distance" &&
                        //             t("p253")) ||
                        //           (v?.education_type === "night_time" &&
                        //             t("p321"))}
                        //       </th>
                        //       <th>{v?.major?.name}</th>

                        //       <th className="steps">
                        //         <span className={`step`}>
                        //           1 <p>{t("p349")}</p>
                        //         </span>
                        //         <span className="step">
                        //           2 <p>{t("p355")} </p>
                        //         </span>
                        //         <span className="">
                        //           3 <p>{t("p351")} </p>
                        //         </span>
                        //         <span className="">
                        //           4 <p>{t("p352")} </p>
                        //         </span>

                        //         <span className="">
                        //           5<p>{t("p353")} </p>
                        //         </span>

                        //         {/* <span className="">
                        //         6 <p>manager_checking_notary </p>
                        //       </span> */}

                        //         <span className="">
                        //           6<p>{t("p354")} </p>
                        //         </span>
                        //       </th>
                        //     </tr>
                        //   );
                        // if (v.step == "payment_confirmation")
                        //   return (
                        //     <tr>

                        //       <th className="name">
                        //         <Link to={`/m-glavny/${v.id}`}>
                        //           {v.first_name} {v.last_name}
                        //         </Link>
                        //       </th>
                        //       <th>{v?.phone_number}</th>
                        //       <th>{v?.major?.faculty?.university?.name}</th>
                        //       <th>{v?.faculty}</th>
                        //       <th>{v?.degree}</th>
                        //       <th>
                        //         {(v?.education_type == "full_time" &&
                        //           t("p252")) ||
                        //           (v?.education_type === "part_time" &&
                        //             t("p375")) ||
                        //           (v?.education_type === "distance" &&
                        //             t("p253")) ||
                        //           (v?.education_type === "night_time" &&
                        //             t("p321"))}
                        //       </th>
                        //       <th>{v?.major?.name}</th>
                        //       <th className="steps">
                        //         <span className={`step`}>
                        //           1 <p>{t("p359")}</p>
                        //         </span>
                        //         <span className="step">
                        //           2 <p>{t("p355")} </p>
                        //         </span>
                        //         <span className="step">
                        //           3 <p>{t("p351")} </p>
                        //         </span>
                        //         <span className="">
                        //           4 <p>{t("p352")} </p>
                        //         </span>
                        //         <span className="">
                        //           5 <p>{t("p353")} </p>
                        //         </span>
                        //         {/* <span className="">
                        //         6 <p>manager_checking_notary </p>
                        //       </span> */}
                        //         <span className="">
                        //           6 <p>{t("p354")} </p>
                        //         </span>
                        //       </th>
                        //     </tr>
                        //   );

                        // if (
                        //   v.step == "payment_confirmed" ||
                        //   v.step == "manager_checking"
                        // )
                        //   return (
                        //     <tr>
                        //       <th className="name">
                        //         <Link to={`/m-glavny/${v.id}`}>
                        //           {v.first_name} {v.last_name}
                        //         </Link>
                        //       </th>
                        //       <th>{v?.phone_number}</th>
                        //       <th>{v?.major?.faculty?.university?.name}</th>
                        //       <th>{v?.faculty}</th>
                        //       <th>{v?.degree}</th>
                        //       <th>
                        //         {(v?.education_type == "full_time" &&
                        //           t("p252")) ||
                        //           (v?.education_type === "part_time" &&
                        //             t("p375")) ||
                        //           (v?.education_type === "distance" &&
                        //             t("p253")) ||
                        //           (v?.education_type === "night_time" &&
                        //             t("p321"))}
                        //       </th>
                        //       <th>{v?.major?.name}</th>
                        //       <th className="steps">
                        //         <span className={`step`}>
                        //           1 <p>{t("p349")}</p>
                        //         </span>
                        //         <span className="step">
                        //           2 <p>{t("p355")} </p>
                        //         </span>
                        //         <span className="step">
                        //           3 <p>{t("p351")} </p>
                        //         </span>
                        //         <span className="step">
                        //           4 <p>{t("p352")} </p>
                        //         </span>
                        //         <span className="">
                        //           5 <p>{t("p353")} </p>
                        //         </span>
                        //         {/* <span className="">
                        //         6 <p>manager_checking_notary </p>
                        //       </span> */}
                        //         <span className="">
                        //           6 <p>{t("p354")} </p>
                        //         </span>
                        //       </th>
                        //     </tr>
                        //   );
                        // if (
                        //   v.step == "notary" ||
                        //   v.step == "manager_reject_notary"
                        // )
                        //   return (
                        //     <tr>

                        //       <th className="name">
                        //         <Link to={`/m-glavny/${v.id}`}>
                        //           {v.first_name} {v.last_name}
                        //         </Link>
                        //       </th>
                        //       <th>{v?.phone_number}</th>
                        //       <th>{v?.major?.faculty?.university?.name}</th>
                        //       <th>{v?.faculty}</th>
                        //       <th>{v?.degree}</th>
                        //       <th>
                        //         {(v?.education_type == "full_time" &&
                        //           t("p252")) ||
                        //           (v?.education_type === "part_time" &&
                        //             t("p375")) ||
                        //           (v?.education_type === "distance" &&
                        //             t("p253")) ||
                        //           (v?.education_type === "night_time" &&
                        //             t("p321"))}
                        //       </th>
                        //       <th>{v?.major?.name}</th>

                        //       <th className="steps">
                        //         <span className={`step`}>
                        //           1 <p>{t("p349")}</p>
                        //         </span>
                        //         <span className="step">
                        //           2 <p>{t("p355")} </p>
                        //         </span>
                        //         <span className="step">
                        //           3 <p>{t("p351")} </p>
                        //         </span>
                        //         <span className="step">
                        //           4 <p>{t("p352")} </p>
                        //         </span>
                        //         <span className="step">
                        //           5 <p>{t("p353")} </p>
                        //         </span>
                        //         {/* <span className="">
                        //         6 <p>manager_checking_notary </p>
                        //       </span> */}
                        //         <span className="">
                        //           6 <p>{t("p354")} </p>
                        //         </span>
                        //       </th>
                        //     </tr>
                        //   );
                        // if (v.step == "manager_checking_notary")
                        //   return (
                        //     <tr>

                        //       <th className="name">
                        //         <Link to={`/m-glavny/${v.id}`}>
                        //           {v.first_name} {v.last_name}
                        //         </Link>
                        //       </th>
                        //       <th>{v?.phone_number}</th>
                        //       <th>{v?.major?.faculty?.university?.name}</th>
                        //       <th>{v?.faculty}</th>
                        //       <th>{v?.degree}</th>
                        //       <th>
                        //         {(v?.education_type == "full_time" &&
                        //           t("p252")) ||
                        //           (v?.education_type === "part_time" &&
                        //             t("p375")) ||
                        //           (v?.education_type === "distance" &&
                        //             t("p253")) ||
                        //           (v?.education_type === "night_time" &&
                        //             t("p321"))}
                        //       </th>
                        //       <th>{v?.major?.name}</th>
                        //       <th className="steps">
                        //         <span className={`step`}>
                        //           1 <p>{t("p349")}</p>
                        //         </span>
                        //         <span className="step">
                        //           2 <p>{t("p355")} </p>
                        //         </span>
                        //         <span className="step">
                        //           3 <p>{t("p351")} </p>
                        //         </span>
                        //         <span className="step">
                        //           4 <p>{t("p352")} </p>
                        //         </span>
                        //         <span className="step">
                        //           5 <p>{t("p353")} </p>
                        //         </span>

                        //         <span className="step">
                        //           6 <p>{t("p354")} </p>
                        //         </span>
                        //       </th>
                        //     </tr>
                        //   );
                      })}
                    </tbody>
                  )}
                </table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[20, 40, 60, 100]}
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
          <div className="abitFilCl" onClick={() => setfilters(!filters)}></div>
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
            <h1>{t("p238")} </h1>
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
                <FormLabel component="legend"> {t("p371")}</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="registered"
                    control={<Radio color="primary" />}
                    label={t("p355")}
                  />
                  <FormControlLabel
                    value="profile_filled"
                    control={<Radio color="primary" />}
                    label={t("p356")}
                  />
                  <FormControlLabel
                    value="payment_confirmation"
                    control={<Radio color="primary" />}
                    label={t("p351")}
                  />
                  <FormControlLabel
                    value="payment_confirmed"
                    control={<Radio color="primary" />}
                    label={t("p236")}
                  />
                  <FormControlLabel
                    value="notary"
                    control={<Radio color="primary" />}
                    label={t("p353")}
                  />
                  <FormControlLabel
                    value="manager_checking_notary"
                    control={<Radio color="primary" />}
                    label={t("p354")}
                  />
                  <FormControlLabel
                    value="university"
                    control={<Radio color="primary" />}
                    label={t("p347")}
                  />
                  <FormControlLabel
                    value="completed"
                    control={<Radio color="primary" />}
                    label={t("p325")}
                  />
                  <FormControlLabel
                    value="rejected"
                    control={<Radio color="primary" />}
                    label={t("p326")}
                  />
                  <FormControlLabel
                    value="cancelled"
                    control={<Radio color="primary" />}
                    label={t("canseled")}
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
    </React.Fragment>
  );
};

export default M_glavny_table;
const Table = styled.div`
  overflow-x: hidden;
  width: 100%;
  .Up_navbar {
    padding-top: 70px;
  }
  @media (max-width: 768px) {
    overflow-x: hidden;
    .ab_1 {
      width: 68%;
      .search {
        width: 100%;
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
        width: 90%;
        .search {
          width: 136%;
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
            width: 68%;
            .search {
              width: 100%;
            }
            .table {
              width: 100%;
              overflow: hidden;
              overflow-x: scroll;
            }
          }
        }
      }
    }
  }
`;
