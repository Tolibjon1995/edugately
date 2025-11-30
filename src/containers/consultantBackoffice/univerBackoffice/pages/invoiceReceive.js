import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { useTranslation } from "react-i18next";
import TableContainer from '@mui/material/TableContainer';
import check from "../../../../assets/icon/check1.svg";
import InvoisModal from "./invoisModal";
//import css
import "react-datepicker/dist/react-datepicker.css";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
//import img
import Message from "../../../../assets/icon/sendFile.png";
import filterImg from "../../../../assets/icon/Filter.svg";
import excel from "../../../../assets/icon/excel.svg";
import search from "../../../../assets/icon/Search2.svg";
import ticketDownload from "../../../../assets/images/ticket-download.svg";
import userpic from "../../../../assets/icon/userpic.svg";
import close from "../../../../assets/icon/close.svg";
import UniversitetBackoffice from "../universitetBackoffice";
import { useSelector } from "react-redux";
import Axios from "../../../../utils/axios";
import Loader from "react-js-loader";
import styled from "styled-components";
const data_table = require("../json/data_table.json");

const InvoiceReceive = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [filter, setFilter] = useState("");

  const [downloaded, setDownloaded] = useState(false);

  const [loading, setLoading] = useState();
  const [students, setStudents] = useState([]);
  const [filters, setfilters] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [key, setkey] = React.useState("");
  const [invoiceAlert, setInvoiceAlert] = useState(() => new Set());
  const [next, setNext] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [page, setPage] = useState(0);
  const [moneyType, setMoneyType] = useState('')
  const [count, setCount] = useState();
  const [amount, setAmount] = useState("");
  const [pageChange, setPageChange] = useState();
  const [prev, setPrev] = useState("");

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `applicant/list/confirmed/?invoice_status=true&limit=${rowsPerPage}`
      );
      const { status, data } = res;
      const { results, count } = data;
      if (status === 200) {
        setStudents(results);
        setCount(count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `applicant/list/confirmed/?invoice_status=true&limit=${rowsPerPage}&offset=${newPage * rowsPerPage
        }`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setStudents(results);
      }
      ;
      setLoading(false);
    } catch (error) {
      ;
      setLoading(false);
    }
  };

  const handleChangeRowsPerPage = async (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleChange(event) {
    setkey(event.target.value);
  }

  const addItem = (item) => {
    setInvoiceAlert((prev) => new Set(prev).add(item));
  };

  const selector = useSelector((state) => state.payload?.payload?.data);

  const handleClickSave = (event) => { };

  const filterApplicants = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/confirmed/?invoice_status=true&date-from=${startDate ? startDate.toLocaleDateString() : ""
        }&date-to=${endDate ? endDate.toLocaleDateString() : ""
        }&payment-status=${filter ? filter.filter : ""}&search=${searchName ? searchName : " "
        }`
      );
      const { data, status } = res;
      const { results } = data;
      if (status == 200) {
        setStudents(results);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const pnChange = (e) => {
    const { name } = e.target;
    setIsShow((state) => ({ ...state, [name]: true }));
  };
  const handleClock = async (id) => {
    try {
      const res = Axios.patch(`applicant/university-check-documents/${id}/`, {
        university_invoice_confirmed: true,
      });
      fetchInvoice();
      filterApplicants();
    } catch (error) { }
  };

  const { t, i18n } = useTranslation();
  ;
  const getFaculty = async () => {
    try {
      const response = await Axios.get(`/university/${selector.id}/`);
      let money = response.data?.living_price_per_annum?.replace(/[^a-zA-Z]+/g, '')
      setMoneyType(money)
    } catch (error) { }
  };
  useEffect(() => {
    fetchInvoice();
    getFaculty()
  }, []);

  useEffect(() => {
    filterApplicants();
  }, [searchName]);

  useEffect(() => {
    fetchInvoice();
  }, [rowsPerPage]);



  return (
    <UniversitetBackoffice>
      <div className="up_nav">
        <div>
          <h4 className="link_h1">
            {t("part202")} {`>`} {t("p205")}
          </h4>
        </div>
        <div className="user_info">
          <img src={userpic} alt="" />
          <div>
            <h5>{selector.name}</h5>
            <p>
              {selector.city.name}, {selector.city.country.name}
            </p>
          </div>
        </div>
      </div>
      <div className="invoys">
        <Responsive>
          <div className="ab_1 w-100">
            <div className="excel">
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
                  placeholder={t("p228")}
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="filtr_btn">
                <button
                  onClick={() => {
                    setfilters(!filters);
                  }}
                >
                  <img src={filterImg} alt="" />
                </button>
              </div>
            </div>
            <div className="table" >
              <div className="table_up">
                <div>
                  <h1>{t("p205")}</h1>
                </div>
              </div>
              <TableContainer sx={{ maxHeight: 440 }}>
                <table className="" id="table_excel" >
                  <thead>
                    <th className="px-3">N</th>
                    <th>{t("p230")}</th>
                    <th>{t("p232")}</th>
                    <th>{t("p233")}</th>
                    <th>{t("p234")}</th>
                    {/* <th>{t("p235")}</th> */}
                    <th>{t("p236")} </th>
                    <th>{t("p237")}</th>
                    <th>{t("part202")}</th>
                    {/* <th>{t("part202")}2</th>
                    <th>{t("part202")}3</th>
                    <th>{t("part202")}4</th>
                    <th>{t("part202")}5</th>
                    <th>{t("part202")}6</th>
                    <th>{t("part202")}7</th>
                    <th>{t("part202")}8</th>
                    <th>{t("part202")}9</th> */}
                    <th></th>
                    <th></th>
                    <th></th>
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
                      students.map((data, i) => {

                        if (filters) {
                          return (
                            <tr>
                              <td className="invoice-table">{i + 1}</td>
                              <th>{data?.full_name}</th>
                              <th>{data?.faculty}</th>
                              <th>{data?.degree}</th>
                              {/* <th>{data?.manager}</th> */}
                              <th>
                                {(data?.education_type == "full_time" &&
                                  t("p252")) ||
                                  (data?.education_type === "part_time" &&
                                    t("p375")) ||
                                  (data?.education_type === "distance" &&
                                    t("p253")) ||
                                  (data?.education_type === "night_time" &&
                                    t("p321"))}
                              </th>
                              <th> {data?.education_fee} {moneyType}</th>
                              <th>{data?.applicant_invoice_upload}</th>
                              <th>
                                <button className="invoice-btn">
                                  <img src={ticketDownload} alt="" />
                                </button>
                              </th>
                              <th>
                                {data?.manager?.first_name}{" "}
                                {data?.manager?.last_name}
                              </th>
                              <th>{data?.manager?.phone_number}</th>
                            </tr>
                          );
                        } else {
                          return (
                            <tr>
                              {/* <td className="invoice-table">{i + 1}</td> */}
                              <th className="">{i + 1}</th>
                              <th>{data?.full_name}</th>
                              <th>{data?.faculty}</th>
                              <th>{data?.degree}</th>
                              {/* <th>{data?.manager}</th> */}
                              <th>
                                {(data?.education_type == "full_time" &&
                                  t("p252")) ||
                                  (data?.education_type === "part_time" &&
                                    t("p375")) ||
                                  (data?.education_type === "distance" &&
                                    t("p253")) ||
                                  (data?.education_type === "night_time" &&
                                    t("p321"))}
                              </th>
                              {/* <th>$ {data?.education_fee}</th> */}
                              <th>
                                {data?.manager?.first_name}{" "}
                                {data?.manager?.last_name}
                              </th>
                              <th>{data?.manager?.phone_number}</th>
                              <th>
                                <a
                                  href={data.applicant_invoice_upload}
                                  target="_blank"
                                  download={data.applicant_invoice_upload}
                                  className="invoice-load"
                                  onClick={() => setDownloaded(true)}
                                >
                                  <img src={ticketDownload} alt="" />
                                </a>
                              </th>
                              {
                                data.applicant_invoice_upload_2 ?
                                  <th>
                                    <a
                                      href={data.applicant_invoice_upload_2}
                                      target="_blank"
                                      download={data.applicant_invoice_upload_2}
                                      className="invoice-load"
                                      onClick={() => setDownloaded(true)}
                                    >
                                      <img src={ticketDownload} alt="" />
                                    </a>
                                  </th>
                                  : ''
                              }

                              {
                                data.applicant_invoice_upload_3 ?
                                  <th>
                                    <a
                                      href={data.applicant_invoice_upload_3}
                                      target="_blank"
                                      download={data.applicant_invoice_upload_3}
                                      className="invoice-load"
                                      onClick={() => setDownloaded(true)}
                                    >
                                      <img src={ticketDownload} alt="" />
                                    </a>
                                  </th>
                                  : ''
                              }

                              {
                                data.applicant_invoice_upload_4 ?
                                  <th>
                                    <a
                                      href={data.applicant_invoice_upload_4}
                                      target="_blank"
                                      download={data.applicant_invoice_upload_4}
                                      className="invoice-load"
                                      onClick={() => setDownloaded(true)}
                                    >
                                      <img src={ticketDownload} alt="" />
                                    </a>
                                  </th>
                                  : ''
                              }

                              {
                                data.applicant_invoice_upload_5 ?
                                  <th>
                                    <a
                                      href={data.applicant_invoice_upload_5}
                                      target="_blank"
                                      download={data.applicant_invoice_upload_5}
                                      className="invoice-load"
                                      onClick={() => setDownloaded(true)}
                                    >
                                      <img src={ticketDownload} alt="" />
                                    </a>
                                  </th>
                                  : ''
                              }

                              {
                                data.applicant_invoice_upload_6 ?
                                  <th>
                                    <a
                                      href={data.applicant_invoice_upload_6}
                                      target="_blank"
                                      download={data.applicant_invoice_upload_6}
                                      className="invoice-load"
                                      onClick={() => setDownloaded(true)}
                                    >
                                      <img src={ticketDownload} alt="" />
                                    </a>
                                  </th>
                                  : ''
                              }

                              {
                                data.applicant_invoice_upload_7 ?
                                  <th>
                                    <a
                                      href={data.applicant_invoice_upload_7}
                                      target="_blank"
                                      download={data.applicant_invoice_upload_7}
                                      className="invoice-load"
                                      onClick={() => setDownloaded(true)}
                                    >
                                      <img src={ticketDownload} alt="" />
                                    </a>
                                  </th>
                                  : ''
                              }

                              {
                                data.applicant_invoice_upload_8 ?
                                  <th>
                                    <a
                                      href={data.applicant_invoice_upload_8}
                                      target="_blank"
                                      download={data.applicant_invoice_upload_8}
                                      className="invoice-load"
                                      onClick={() => setDownloaded(true)}
                                    >
                                      <img src={ticketDownload} alt="" />
                                    </a>
                                  </th>
                                  : ''
                              }

                              {
                                data.applicant_invoice_upload_9 ?
                                  <th>
                                    <a
                                      href={data.applicant_invoice_upload_9}
                                      target="_blank"
                                      download={data.applicant_invoice_upload_9}
                                      className="invoice-load"
                                      onClick={() => setDownloaded(true)}
                                    >
                                      <img src={ticketDownload} alt="" />
                                    </a>
                                  </th>
                                  : ''
                              }


                              <th>
                                {data?.university_invoice_confirmed ? (
                                  <ConfirmedButton disabled>
                                    Платеж потвержден
                                  </ConfirmedButton>
                                ) : (
                                  <ConfirmButton
                                    onClick={() => handleClock(data?.id)}
                                  >
                                    Потвердить платеж
                                  </ConfirmButton>
                                )}
                              </th>
                              {/* {data?.university_cert ? (
                                  <th>
                                    <img
                                      src={check}
                                      alt=""
                                      style={{
                                        width: "25px",
                                      }}
                                    />
                                  </th>
                                ) : (
                                  <th>
                                    <img
                                      src={Message}
                                      name={`name${data?.id}`}
                                      onClick={(e) => pnChange(e)}
                                      style={{ width: "25px" }}
                                      alt=""
                                    />
                                    {isShow[`name${data?.id}`] ? (
                                      <InvoisModal
                                        onClose={() => setIsShow(false)}
                                        id={data?.id}
                                        where={"university_cert"}
                                        show={isShow}
                                      />
                                    ) : null}
                                  </th>
                                )} */}
                            </tr>
                          );
                        }
                      })
                    )}
                  </tbody>
                </table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[100, 200, 300]}
                component="table"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
        </Responsive>

        {/* // ! */}
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
              <button className="form_button" onClick={filterApplicants}>
                {t("p246")}
              </button>
            </div>
          </div>
        </div>
        {/* // ! */}
      </div>
    </UniversitetBackoffice>
  );
};

export default InvoiceReceive;

const ConfirmButton = styled.button`
  height: 40px;
  border: none;
  width: 197px;
  background: #5ec98b !important;
  color: white !important;
  border-radius: 4px !important;
  cursor: pointer !important;
`;
const ConfirmedButton = styled.button`
  color: #219653;
  border: none;
  border-radius: 4px !important;
  font-size: 15px !important;
  height: 40px !important;
  width: 197px;
  cursor: no-drop !important;
  background: rgba(94, 201, 139, 0.25) !important;
`;
const Responsive = styled.div`  
width:100%;
@media (max-width: 768px) {
  overflow-x: hidden;
  .ab_1{
    width:90%;
    .search{
      width:100%
    }
    .table {
      font-size: 12px;
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
    }
  
  }}
  @media (max-width: 425px) {
    .ab_1 {
      width:90%;
      .search{
        width:135%
      }
       .table {
         font-size: 12px;
       width: 100%;
       overflow: hidden;
       overflow-x: scroll;
     }
    }
  }
  @media (max-width: 320px) {
   .ab_1 {
     width:90%;
     .search{
       width:135%
     }
      .table {
        font-size: 12px;
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
    }
  `;
