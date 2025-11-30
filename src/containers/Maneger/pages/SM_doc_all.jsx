import React, { useState, useEffect } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { Link,useParams } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "../../../utils/axios";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import DatePicker from "react-datepicker";
import userpic from "../../../assets/icon/LogoAsia.jpg";
import filter from "../../../assets/icon/Filter.svg";
import "../../../style/css/fakultet.css";
import search from "../../../assets/icon/Search2.svg";
import "react-datepicker/dist/react-datepicker.css";
import "../../../style/css/SidebarUniverstitet.css";
import close from "../../../assets/icon/close.svg";
import Loader from "react-js-loader";
import { useSelector } from "react-redux";
import TablePagination from "@material-ui/core/TablePagination";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { TableContainer } from "../../../TableContainer";
import { Backdrop, Fade, Modal } from "@material-ui/core";
import Swal from "sweetalert2";

const M_doc_all = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const selector = useSelector((state) => state?.payload?.payload.data);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filters, setfilters] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [key, setkey] = React.useState("");
  const [loading, setLoading] = useState(true);
  const [managers, setManager] = useState([]);
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const [amount, setAmount] = useState("");
  const [pageChange, setPageChange] = useState();
  const [prev, setPrev] = useState("");
  function handleChange(event) {
    setkey(event.target.value);
  }

  const [openx, setOpenx] = React.useState(false);
  const [whereGoFile2, setWhereGoFile2] = useState(true);
  const [addDescription, setAddDescription] = useState("");
  const next_step2 = whereGoFile2 ? "university" : "manager_reject_notary";
  const selector2 = useSelector((state) => state);
  const { payload } = selector2?.payload;
  const { first_name, last_name } = payload?.data;
  const params = useParams();
  const [currentParams, setCurrentParams] = useState()

  const handleClosex = () => {
      setOpenx(false);
  };




  const handelFilter = () => {
    setfilters(!filters);
  };

  const userList = async () => {
    setLoading(true);
    try {
      const data = await Axios.get(
        `/applicant/list/?manager-attached=true&limit=${rowsPerPage}`
      );
      if (data.status === 200) {
        setUsers(data.data.results);
        setCount(data.data.count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleManager = async (id) => {
    try {
      const res = await Axios.get(`/company/managers/list/`);
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setManager(results);
      }
    } catch (error) { }
  };
  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `/applicant/list/?manager-attached=true&limit=${rowsPerPage}&offset=${newPage * rowsPerPage
        }`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setUsers(results);
        console.log(users);
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

  const handleSubmit = async (values) => {
    setSearchName(values)
    setLoading(true);
    const sd = startDate?.getDate();
    const sm = startDate?.getMonth() + 1;
    const sy = startDate?.getFullYear();
    const ed = endDate?.getDate();
    const em = endDate?.getMonth() + 1;
    const ey = endDate?.getFullYear();
    try {
      const res = await Axios.get(
        `/applicant/list/?manager-attached=true&&date-from=${startDate ? `${sd}.${sm}.${sy}` : ""
        }&date-to=${endDate ? `${ed}.${em}.${ey}` : ""
        }&manager=${current}&search=${searchName ? searchName : " "}`
      );
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setUsers(results);
        setLoading(false);
      }
      setfilters(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [users, setUsers] = useState([]);


  const datas2 = {
    next_step2,
    reason_for_cancelling: addDescription,
  };

  const openModal =(id)=>{
    setOpenx(true)
    setCurrentParams(id)
    console.log(id);
  }
  const sendNotary2 = async () => {
    try {
      const res = await Axios.put(
        `/applicant/cancel-sudent/${currentParams}/`,
        datas2
      );
      setOpenx(false);
      Swal.fire({
        icon: 'success',
        text: 'Успешно отправлено Cancel'
      })

    } catch (error) {
      setOpenx(false);
      Swal.fire({
        icon: 'error',
        text: 'Hе отправлено Cancel'
      }).then(() => {

      })
    }
  };



  useEffect(() => {
    userList();
  }, []);
  useEffect(() => {
    handleManager();
  }, [searchName]);

  return (
    <React.Fragment>
      <ManegerSidebar />
      <div style={{width: '75%'}}>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Документы</h1>
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
        <div className="invoys n_documents m_doc_all" style={{width: '100%'}}>
          <div className="ab_1" style={{width: '100%'}}>
            <div className="excel table_excel_btn hi ">
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="table_excel"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Excel"
              />
            </div>
            <Table>
              <div className="search">
                <div className="input">
                  <button>
                    <img src={search} alt="" />
                  </button>
                  <input
                    type="text"
                    onChange={(e) => handleSubmit(e.target.value)}
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
                    <h1>Список документов</h1>
                  </div>
                  <div></div>
                </div>
                <TableContainer>
                  <table id="table_excel">
                    <thead>
                      <th>ID</th>
                      <th>ФИО</th>
                      <th>Телефон</th>
                      <th>Факультет</th>
                      <th>Степень</th>
                      <th>Тип обученияе</th>
                      <th> Направления</th>
                      <th>Загруженные документы</th>
                      <th>Статус</th>
                      <th>Менеджер</th>
                      <th>Телефон менеджера</th>
                      <th>Дата</th>
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
                        {users.map((v, i) => {
                          if (v.step === 'cancelled') {

                          } else {
                            return (
                              <tr>
                                {" "}
                                <th>{v.id}</th>
                                <th className="name">
                                  <th
                                    onClick={()=>{openModal(v.id)}}
                                    style={{cursor: 'pointer'}}
                                  >
                                    {v?.last_name} {v?.first_name} {v?.middle_name}
                                  </th>
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
                                <th>8</th>
                                <th
                                  style={{
                                    color: `${(v.step == "notary" && "green") || "red"
                                      }`,
                                  }}
                                >
                                  {(v.step == "notary" && t("p615")) ||
                                    t("p616")}
                                </th>
                                <th>
                                  {v.manager.first_name} {v.manager.last_name}
                                </th>
                                <th>{v.manager.phone_number}</th>
                                <th>{v?.manager_set_date?.slice(0, 10)}</th>
                              </tr>
                            );
                          }

                        })}
                      </tbody>
                    )}
                  </table>
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
            </Table>
          </div>

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
              <h1>Фильтры</h1>
              <div className="form_ab">
                <h2>Выберите период</h2>
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
                <h2>Manager</h2>
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
                <button className="form_button" onClick={handleSubmit}>
                  {t("p246")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="class_modal"
        open={openx}
        onClose={handleClosex}
        closeAfterTransition
        BackdropComponent={Backdrop}
        onChange={(e) => setAddDescription(e.target.value)}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openx}>
          <div className="modal" style={{ backgroundImage: 'none' }}>
            <div className="close_btn">
              <img onClick={handleClosex} src={close} alt="" />
            </div>

            {/* <img src={idea} alt="" /> */}
            <h1>Nima sababdan student cancel qilinmoqda </h1>
            <input type="text" placeholder="Shu yerga yozing" />
            <div className="modal_btn">
              <button onClick={handleClosex}>Chiqish</button>
              <button onClick={sendNotary2}> Yuborish</button>
            </div>
          </div>
        </Fade>
      </Modal>
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
      width:133%
    }
    .table {
      width: 100%;
      overflow: hidden;
      overflow-x: scroll;
    }
  
  }}
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
    }
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
  }}`;
