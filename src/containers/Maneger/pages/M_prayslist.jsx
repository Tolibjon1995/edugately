import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import Axios from "../../../utils/axios";
import userpic from "../../../assets/icon/LogoAsia.jpg";
import filter from "../../../assets/icon/Filter.svg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import { useSelector } from "react-redux";
import Loader from "react-js-loader";
// import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import axios from "axios";
import { Container, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";

const M_prayslist = () => {
  const history = useHistory();
  const selector = useSelector((state) => state.payload.payload.data);
  const [loading, setLoading] = useState(true);
  const [datas, setDatas] = useState();
  const [filters, setfilters] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // <PaginationItem active>
  //                   <PaginationLink href="#">
  //                     1
  //                   </PaginationLink>
  //                 </PaginationItem>
  const paginate = (pageNumber) => setPage(pageNumber)
  let items = [];
  for (let number = 1; number <= Math.ceil(count / rowsPerPage); number++) {

    items.push(
      <PaginationItem
        onClick={() => { paginate(number) }}
        key={number}
        active={number === page}>
        <PaginationLink href="!#">
          {number}
        </PaginationLink>
      </PaginationItem>,
    );
  }

  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/set-service-price/?limit=${rowsPerPage}&offset=${newPage * rowsPerPage
        }`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setDatas(results);
        setCount(res.data.count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getDatas = async (newPage) => {
    setLoading(true);
    const sd = startDate?.getDate();
    const sm = startDate?.getMonth() + 1;
    const sy = startDate?.getFullYear();
    const ed = endDate?.getDate();
    const em = endDate?.getMonth() + 1;
    const ey = endDate?.getFullYear();
    try {
      const res = await Axios.get(
        `/company/set-service-price/?date-from=${startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""}&search=${searchName ? searchName : " "
        }&limit=${rowsPerPage}&offset=${newPage * rowsPerPage
        }`
      );

      setDatas(res.data.results);
      setLoading(false);
      setCount(res.data.count);
    } catch (error) {
      setLoading(false);
    }
    setfilters(false);
  };

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };
  const handelFilter = () => {
    setfilters(!filters);
  };

  const { t, i18n } = useTranslation();
  ;
  useEffect(() => {
    getDatas();
  }, [])

  useEffect(() => {
    getDatas();
  }, [searchName]);
  useEffect(() => {
    getDatas();
    console.log(datas);
  }, [rowsPerPage]);

  const indexOfLastOrder = page * rowsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - rowsPerPage;
  const currentOrder = datas?.slice(indexOfFirstOrder, indexOfLastOrder);

  console.log(currentOrder);

  return (
    <>
      <ManegerSidebar />
      <div>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">{t("p380")} </h1>
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
        <div className="invoys n_documents m_prayslist">
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
                <table>
                  <thead> 
                    <th style={{ textAlign: "left" }}> {t("p374")}</th>
                    <th style={{ textAlign: "left" }}> {t("part53")} </th>
                    <th style={{ textAlign: "left" }}>{t("p207")}</th>
                    <th style={{ textAlign: "left" }}>{t("p381")}</th>
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
                      datas?.map((v, i) => {
                        return (
                          <tr key={i}>
                            <th style={{ textAlign: "left" }}>
                              {v?.university.name}
                            </th>
                            <th style={{ textAlign: "left" }}>{v?.degree}</th>
                            <th style={{ textAlign: "left" }}>{v?.name}</th>
                            <th style={{ textAlign: "left" }}>
                              {v?.service_price}
                            </th>
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
                {/* <Container>
                  <Row>
                    <Pagination>
                      {items}
                    </Pagination>
                  </Row>
                </Container> */}
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
                <button className="form_button" onClick={getDatas}>
                  {t("p246")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default M_prayslist;
const Table = styled.div`
width:100%;
@media (max-width: 768px) {
  .ab_1{
    width:98%;
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
        width:130%
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
       width:130%
     }
      .table {
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
    }
  }`;
