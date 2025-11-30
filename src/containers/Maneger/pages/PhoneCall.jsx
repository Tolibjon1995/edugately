import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import userpic from "../../../assets/icon/LogoAsia.jpg";
import search from "../../../assets/icon/Search2.svg";
import close from "../../../assets/icon/close.svg";
import filter from "../../../assets/icon/Filter.svg";
import ManegerSidebar from '../ManagerSidebar'
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import TablePagination from "@material-ui/core/TablePagination";
import Loader from "react-js-loader";
import Axios from '../../../utils/axios';
import { useEffect } from 'react';

export default function PhoneCall() {
    const selector = useSelector((state) => state.payload.payload.data);
    const [searchName, setSearchName] = useState("");
    const [loading, setLoading] = useState();
    const [count, setCount] = useState();
    const [datas, setDatas] = useState();
    const { t, i18n } = useTranslation();
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState(0);
    const [filters, setfilters] = useState(false);
    const [radio,setRadio] = useState('')
    const handlePageChange = async(e, newPage) => {
        setPage(newPage);
        setLoading(true)
         try {
            const res = await Axios.get(`/company/set-service-price/?limit=${rowsPerPage}&offset=${newPage*rowsPerPage}`);
            const { status, data } = res;
            const { results } = data;
            if (status == 200) {
              setDatas(results);
            }
             ;
            setLoading(false)
          } catch (error) {
             ;
            setLoading(false)
          }
      };
      const handleChangeRowsPerPage = async (event) => {
         ;
         ;
        setRowsPerPage(+event.target.value);
        setPage(0);
        }
    const handelFilter = () => {
        setfilters(!filters);
      };
      const handleRadio = (e) => {
        const { name, value } = e.target;
        setRadio({ [name]: value });
      };
      const getCalls = async() =>{
        setLoading(true)
          try {
              const res = await Axios.get('/common/phone-consultation/?limit=1000')
              const {status,data} = res;
              if(status === 200){
                  const {results} = data;
                  setDatas(results)
                  setCount(res.data.count)
              }
              setLoading(false)
               ;
          } catch (error) {
              setLoading(false)
          }
      }
      const handleClock = async(id)=>{
        try {
          const res = await Axios.patch(`/common/phone-consultation/${id}/`,{
            is_contact:true
          })
          const {status,data} = res;
          if(status === 200){
            getCalls()
          }
        } catch (error) {
           ;
        }
      }
      const getFilteredData =async ()=>{
        setLoading(true)
        try {
          const res = await Axios.get(`/common/phone-consultation/?status=${radio?.filter}`)
           ;
          const {status,data} = res;
          if(status === 200) {
            const {results} = data
            setDatas(results)
          }
          setLoading(false)
          setfilters(false)
        } catch (error) {
          
        }
      }
      useEffect(()=>{
          getCalls()
      },[])
    return (
        <>
        <ManegerSidebar/>
        <div>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">Список звонков</h1>
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
                  placeholder='Поиск'
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
                  <th>T/P</th>
                  <th style={{ textAlign: "left" }}>Телефонный номер</th>
                  <th style={{ textAlign: "left" }}>Дата</th>
                  <th style={{ textAlign: "left" }}>Статус</th>
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
                    datas
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((v, i) => {
                        const {id} = v
                        return (
                          <tr>
                            <th>{i + 1}</th>
                            <th style={{ textAlign: "left" }}>
                             <a href={`tel:${v?.phone_number}`}> {v?.phone_number}</a>
                            </th>
                            <th style={{ textAlign: "left" }}>{v?.created_at.slice(0,v?.created_at.indexOf('T'))},  {v?.created_at.slice(v?.created_at.indexOf('T')+1,v?.created_at.indexOf('.'))}</th>
                            <th style={{ textAlign: "left" }}>
                              {v.is_contact 
                              ? <ConfirmedButton disabled>Звонил</ConfirmedButton>
                              :
                              <ConfirmButton onClick={()=>handleClock(id)}>Не звонил</ConfirmButton>
                            }
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
              <h1>Фильтры</h1>
              <div className="form_ab">
                <h2>Выберите период</h2>
                <div className="">
                <InputDiv>
                  <input
                    onChange={(e) =>handleRadio(e)}
                    type="radio"
                    id="true"
                    name="filter"
                    value="true"
                  />
                  <label for="true">Звонил</label>
                  </InputDiv>
                  <InputDiv>
                  <input
                    onChange={(e) =>handleRadio(e)}
                    type="radio"
                    id="all"
                    name="filter"
                    value="false"
                  />
                  <label for="all">Не звонил</label>
                  </InputDiv>
                </div>
              </div>

              <div className="form_ab">
                <button className="form_button"onClick={getFilteredData} >
                {t("p246")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

const Table=styled.div`
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
  }
}
    }
}
}`

  const ConfirmButton = styled.button`
  height: 40px;
  border:none;
  width: 197px;
  background: #5EC98B !important;
  color: white !important;
  border-radius: 4px !important;
  cursor:pointer !important;
`

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
    margin-left: 15px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const ConfirmedButton = styled.button`
  color: #219653;
  border:none;
  border-radius: 4px !important;
  font-size: 15px !important;
  height: 40px !important;
  width: 197px;
  cursor: no-drop !important;
  background: rgba(94, 201, 139, 0.25) !important;
`