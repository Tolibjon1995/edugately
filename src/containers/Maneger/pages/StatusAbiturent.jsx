import ManegerSidebar from "../ManagerSidebar";
import React, { useEffect, useState, useRef } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Loader from "react-js-loader";
import { useTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import search_icon from "../../../assets/icon/search.svg";
import filterImg from "../../../assets/icon/Filter.svg";
import Vector from "../../../assets/icons/Vector.svg";
import blueStroke from "../../../assets/images/Stroke-blue.svg";
import closeFilter from "../../../assets/icon/close.svg";
import check from "../../../assets/icon/check1.svg";
import styled from "styled-components";
import TableContainer from '@mui/material/TableContainer';
// import css
import "../../../style/css/SidebarUniverstitet.css";
import "../../../style/css/fakultet.css";
import "react-datepicker/dist/react-datepicker.css";
import userpic from "../../../assets/icon/LogoAsia.jpg";
import Axios from "../../../utils/axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "../../../style/css/notarius.css";
import plus from "../../../assets/icon/plus.svg";
import { Pagination } from "@material-ui/lab";
import TablePagination from "@material-ui/core/TablePagination";
import TestTable from './TestTable'
export default function SuperManager() {
  const [items, setItems] = useState([]);
  const [radio, setRadio] = useState("");
  //   const [tempNote, setTempNote] = useState([]);
  const [value, setValue] = useState();
  const [note, setNote] = useState([]);
  const [words, setWords] = useState();

  const [loading, setLoading] = useState(false);
  const counts = new Date().getUTCMilliseconds();
  const [students, setStudents] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const [open_change, setOpen_change] = React.useState(false);
  const [fixEnd, setFix] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const [managersFrom, setManager] = useState();
  const [managerAll, setManagerAll] = useState();
  const container = useRef();
  const [faculty, setFaculty] = useState([]);
  const [managerName, setManagerName] = useState();
  const [userId, setUserId] = useState();
  const [select, setSelect] = useState([]);
  const [nameIdM, setNameIdM] = useState();
  const [confirms, setConfirms] = useState();
  const history = useHistory();
  const selector = useSelector((state) => state.payload.payload.data);

  const [univer, setUniver] = useState([]);
  const [next, setNext] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState();
  const [amount, setAmount] = useState("");
  const [pageChange, setPageChange] = useState();
  const [prev, setPrev] = useState("");
  const fethcStudents = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        "applicant/list/?manager-attached=false&limit=1000"
      );
      const { status, data } = res;
      const { results, count } = data;
      results.map((v, i) => {
        return setConfirms((state) => ({
          ...state,
          [`confirms_${v?.id}`]: false,
        }));
      });
      if (status === 200) {
        setStudents(results);
        setCount(count);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const addCard = () => {
    setItems([
      ...items,
      {
        id: counts,
        description: words,
      },
    ]);
  };

  const saveCard = async (id) => {
    let data = items.find((items) => items.id === id);
    let newData = items.filter((item) => item.id !== id);
    setItems(newData);
    try {
      const res = await Axios.post(`/company/note/`, {
        text: data.description,
      });
    } catch (error) { }
    fetchNote();
  };

  const deleteCard = (index) => {
    const filteredData = items.filter((item) => item.id != index);
    setItems(filteredData);
  };

  const handlePageChange = async (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    try {
      const res = await Axios.get(
        `applicant/list/?manager-attached=false&limit=${rowsPerPage}&offset=${newPage * rowsPerPage
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
    ;
    ;
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const inputHandler = (e, index) => {
    let filteredWords = items.find((item) => item.id == index);
    filteredWords.description = e.target.value;
    // handleWords(data, index);
  };

  const fetchNote = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/company/note/");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setNote(results);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const deleteFetchedCard = async (id) => {
    Swal.fire({
      icon: "warning",
      text: "Вы уверены, что хотите удалить?",
      showCancelButton: true,
      showConfirmButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await Axios.delete(`/company/note/${id}/`);
          const { status } = res;
          if (status === 204) {
            fetchNote();
          }
        } catch (error) { }
      }
    });
  };
  useEffect(() => {
    fetchNote();
  }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen_change = () => {
    setOpen_change(true);
  };
  const handleClose_change = () => {
    setOpen_change(false);
  };
  const handleClock = async (id) => {
    try {
      const res = await Axios.put(`/applicant/confirm-payment/${id}/`, {
        invoice_confirmed: true,
      });
      setPaymentConfirm(true);
      const { data, status } = res;
    } catch (error) { }
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
  const handleClick = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Вы действительно хотите потвердить этот платеж?",
      showCancelButton: true,
      reverseButtons: true,
      cancelButtonColor: "#F3F5F7",
      cancelButtonText: "Отменить",
      confirmButtonColor: "#00587F",
      confirmButtonText: "Потвердить",
    }).then((result) => {
      if (result.isConfirmed) {
        handleClock(id);
      } else {
      }
    });
  };
  const [input, setInput] = useState(false);

  const [IdUser, setIdUser] = useState(() => new Set());

  const addItem = (item) => {
    setIdUser((prev) => new Set(prev).add(item));
    //
  };

  const getManagerId = () => {
    managersFrom?.map((v) => {
      if (managerName == v.first_name) {
        setNameIdM((nameIdM) => v.id);
      }
    });
  };

  const onChange = async (e, id) => {
    setManagerName(e.target.innerText);
    const { name } = e.target;
    managersFrom?.map((v) => {
      if (e.target.innerText == v.first_name) {
        setNameIdM((nameIdM) => v.id);
        // try {
        //   const dataUser = { manager: nameIdM, applicant: id };
        //   const res = Axios.post(
        //     "/company/super-manager-set-manager/",
        //     dataUser
        //   );
        // } catch (error) {}
      }
    });
  };
  const handleRadio = (e) => {
    const { name, value } = e.target;
    setRadio({ [name]: value });
  };
  const handleSelect = (e) => {
    const { name, value } = e.target;
    setSelect((prev) => ({ ...prev, [name]: value }));
  };

  const setManagers = async (id) => {
    const dataUser = { manager: nameIdM, applicant: id };
    try {
      const res = Axios.post("/company/super-manager-set-manager/", dataUser);
    } catch (error) { }
    setConfirms((state) => ({ ...state, [`confirms_${id}`]: true }));
  };
  const fetchUniver = async () => {
    try {
      const res = await Axios.get("/university/");
      const { status, data } = res;
      if (status === 200) {
        const { results } = data;
        setUniver(results);
      }
    } catch (error) { }
  };
  const fetchFaculty = async () => {
    try {
      const res = await Axios.get(`/university/${select?.university}`);
      const { status, data } = res;
      if (status === 200) {
        const { faculties } = data;
        setFaculty(faculties);
      }
    } catch (error) { }
  };
  const handleSubmit = async () => {
    try {
      const res = await Axios.get(
        `/applicant/list/?manager-attached=false&has_univer=${radio.has_univer
        }&date-from=${startDate.toLocaleDateString()}&date-to=${endDate.toLocaleDateString()}&university=${select.university
        }&faculty=${select.faculty}&education_type=${select.education_type}`
      );
      const { status, data } = res;
      const { results, count } = data;

      if (status === 200) {
        setStudents(results);
      }
    } catch (error) { }
  };
  const handleSearch = async (e) => {
    const { value } = e.target;
    if (value.length > 2) {
      try {
        const res = await Axios.get(
          `/applicant/list/?manager-attached=false&search=${value}`
        );
        const { status, data } = res;
        const { results, count } = data;
        results.map((v, i) => {
          return setConfirms((state) => ({
            ...state,
            [`confirms_${v?.id}`]: false,
          }));
        });
        if (status === 200) {
          setStudents(results);
        }
      } catch (error) { }
    }
  };

  const { t, i18n } = useTranslation();

  useEffect(() => {
    fethcStudents();
    fetchUniver();
  }, []);
  useEffect(() => {
    fetchFaculty();
  }, [select?.university]);
  useEffect(() => {
    handleManager();
  }, []);
  // useEffect(() => {
  //   fethcStudents();
  // }, [count]);
  useEffect(() => {
    getManagerId();
  }, [managerName]);

  return (
    <>
      <ManegerSidebar />

      <TableContainer>
        <div className="Up_navbar">
          <div>
            <div className="nav-bugalter">
              <h4>{t("p357")}</h4>
            </div>
          </div>
          <div className="user_info">
            <img src={userpic} alt="" />
            <div>
              <p>
                {selector.first_name} {selector.last_name}
              </p>
              <p>{selector.role}</p>
            </div>
          </div>
        </div>
        <div className="SidebarUniverstitet">
          <button onClick={handleOpen}>
            
            <span>
              <img src={Vector} className="vector" alt="Vector img" />
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button manager-download"
                table="table_excel"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Excel"
              />
            </span>
          </button>

          <div className="settSearch">
            <div className="searchUniv">
              <img src={search_icon} alt="" />
              <input
                type="text"
                onChange={(e) => handleSearch(e)}
                placeholder={t("p228")}
              />
            </div>
            <button
              onClick={() => {
                setFix(!fixEnd);
              }}
              className="settingsUniver"
            >
              <img src={filterImg} className="" alt="" />
            </button>
          </div>
        </div>
        <TestTable students={students} count={count} />
      </TableContainer>
    </>
  );
}

const FormFilter = styled.div``;
const InputDiv = styled.div`
      margin: 18px 0;
      font-size: 18px;
      display: flex;
      align-items: center;
      input {
        height: 18px;
      width: 18px;
  }
      label {
        margin - left: 15px;
      font-weight: 600;
      cursor: pointer;
  }
      `;
const Table = styled.div`
      .SidebarUniverstitet .univerList table tr th {
        padding: 0 10px !important;
  }
      `;
