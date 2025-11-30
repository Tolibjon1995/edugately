import React, { useEffect, useState } from "react";
import ManegerSidebar from "../ManagerSidebar";
import { useTranslation } from "react-i18next";

import userpic from "../../../assets/icon/LogoAsia.jpg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  ComposedChart,
  LabelList,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { scaleOrdinal } from "d3-scale";
import { interpolateCividis, schemeCategory10 } from "d3-scale-chromatic";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { updateLanguageAction } from "../../../store/actions/langAction";
import Axios from "../../../utils/axios";
import styled from "styled-components";
const colors = scaleOrdinal(schemeCategory10).range();
const dataPie = require("../../consultantBackoffice/univerBackoffice/json/data2.json");
const dataPie2 = require("../../consultantBackoffice/univerBackoffice/json/data3.json");
const dataComposed = require("../../consultantBackoffice/univerBackoffice/json/dataComposed.json");

const M_analitika = () => {
  const [dataFirst, setDataFirst] = useState();
  const [data, setData] = useState();
  const [dataComposeds, setDataComposeds] = useState();
  const [data_doxod, setDataDoxod] = useState();
  const [loading, setLoading] = useState(false);
  const [second, setSecond] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [payment, setPayment] = useState({
    not_paid: "",
    paid: "",
    waiting_confirmation: "",
  });

  const fetchByDay = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?day=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchByWeek = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?week=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchByMonth = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?month=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchByYear = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?year=true`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchByChoosenDate = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(
        `/company/manager/statistics/third_block/?date-from=${startDate.toLocaleDateString()}&date-to=${endDate.toLocaleDateString()}`
      );
      const { status, data } = res;
      if (status === 200) {
        const { payment } = data;
        setPayment(payment);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const dispatch = useDispatch();
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    dispatch(updateLanguageAction({ languageValue }));
    localStorage.setItem("univerLang", languageValue);
    i18n.changeLanguage(languageValue);
  };
  const fetchSecondBlock = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/company/manager/statistics/second_block/");
      const { status, data } = res;
      if (status === 200) {
        setSecond(data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getDataStatistika = async () => {
    try {
      const res = await Axios.get("/company/manager/statistics/");
      const { first_block, second_block, fourth_block, third_block } = res.data;
      setDataFirst(first_block);
      setData(second_block);
      setDataDoxod(third_block);
      setDataComposeds(fourth_block);
    } catch (error) {}
  };

  const { t, i18n } = useTranslation();
   ;

  useEffect(() => {
    getDataStatistika();
  }, []);

  const [startDate, setStartDate] = useState(null);
  const selector = useSelector((state) => state.payload.payload.data);
  const genderOfStudents = [
    {
      name: "Group A",
      value: dataComposeds?.applicants?.male,
    },
    { name: "Group B", value: dataComposeds?.applicants?.female },
  ];

  return (
    <React.Fragment>
      <ManegerSidebar />
      <div className="asos">
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">{t("p323")}</h1>
          </div>
          {selector?.role === "manager" ? (
            <SelectColor
              className="lang-drop"
              name="lang"
              onChange={changeLanguage}
            >
              <option className="lang-opt" value="uz">
                Uz
              </option>
              <option className="lang-opt" value="ru">
                RU
              </option>
              <option value="en" className="lang-opt">
                EN
              </option>
              
            </SelectColor>
          ) : (
            ""
          )}
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
        <div className="home m_analitika">
          <FilterContainer>
            <p onClick={fetchByDay}>{t("p211")}</p>
            <p onClick={fetchByWeek}>{t("p212")}</p>
            <p onClick={fetchByMonth}> {t("p213")}</p>
            <p onClick={fetchByYear}>{t("p214")}</p>
            <p>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                openTo="year"
                views={["year", "month", "day"]}
                startDate={startDate}
                endDate={endDate}
                dateFormat="dd MM yyyy"
                placeholderText={t("p215")}
              />
            </p>
            -
            <p>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                onSelect={fetchByChoosenDate}
                dateFormat="dd MM yyyy"
                minDate={startDate}
                placeholderText={t("p216")}
              />
            </p>
          </FilterContainer>
          <div className="block_1">
            {/* card */}
            <div className="card_1 card">
              <h4>{t("p324")}</h4>
              <h3>{dataFirst?.applicants}</h3>
            </div>
            {/* card */}
            <div className="card_2 card">
              <h4> {t("p325")}</h4>
              <h3>{dataFirst?.completed}</h3>
            </div>
            {/* card */}
            <div className="card_3 card">
              <h4> {t("p326")}</h4>
              <h3>{dataFirst?.closed}</h3>
            </div>
            {/* card */}
            <div className="card_4 card">
              <h4> {t("p327")}</h4>
              <h3>{dataFirst?.in_process}</h3>
            </div>
          </div>
          <div className="scroll">
            <div className="block_2">
              <div>
                <h5>{t("p328")}</h5>
                <div className="seeMoreAct">
                  <select>
                    <option>{t("p329")}</option>
                    <option>lorem1</option>
                    <option>lorem2</option>
                  </select>
                </div>
              </div>
              <div className="diag">
                <ResponsiveContainer>
                  <LineChart height={300} data={data}>
                    <CartesianGrid strokeDasharray="12 12" vertical="" />
                    <XAxis dataKey="Месяц" />
                    <YAxis />
                    <Tooltip />
                    <Legend iconType="square" />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="applicants"
                      stroke="#00587F"
                      name={t("p324")}
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="in_process"
                      stroke="#10CC9B"
                      name={t("p327")}
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="closed"
                      stroke="#E96383"
                      name={t("p326")}
                    />
                    <Line
                      type="monotone"
                      strokeWidth={3}
                      dataKey="completed"
                      stroke="#FCCA58"
                      name={t("p325")}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column" }}
            className="block_4"
          >
            <div className="block_4_1">
              <h4>{t("p330")}</h4>
              <div className="pieChart diag">
                <div>
                  <span>
                    {dataComposeds?.applicants?.female +
                      dataComposeds?.applicants?.male}
                  </span>
                  <PieChart width={188} height={188}>
                    <Pie
                      data={genderOfStudents}
                      cx={80}
                      cy={80}
                      innerRadius={50}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dataComposed.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </div>
                <div className="PieChartSurf">
                  <span>
                    <div style={{ background: "#4897D1" }}></div>
                    <h5>{t("p223")}</h5>
                    <h6>{dataComposeds?.applicants?.male}</h6>
                  </span>
                  <span>
                    <div style={{ background: "rgb(255, 127, 14)" }}></div>
                    <h5>{t("p224")}</h5>
                    <h6>{dataComposeds?.applicants?.female}</h6>
                  </span>
                </div>
              </div>
            </div>
            <div className="block_2">
              <h4>{t("part16")}</h4>
              <div className="diag">
                <ResponsiveContainer>
                  <BarChart
                    data={dataComposeds?.popular_faculties}
                    margin={{
                      top: 0,
                      right: 0,
                      left: -20,
                      bottom: 50,
                    }}
                  >
                    <CartesianGrid strokeDasharray="20 20" vertical="" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applicants_count" barSize={35} fill="#8884d8">
                      {dataComposed.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default M_analitika;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  align-items: center;
  justify-content: space-around;
  p {
    background: #fff;
    width: 148px;
    height: 49px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    font-size: 18px;
    font-weight: 600;
    opacity: 0.6;
    cursor: pointer;
    &:hover {
      opacity: 1;
      transition: all 0.25s;
      box-shadow: 0px -2px 8px rgba(13, 83, 114, 0.15),
        2px 4px 9px rgba(13, 83, 114, 0.15);
      border: 1px solid #1ab9;
    }
    input {
      border: none;
      outline: none;
      height: 100%;
      width: 100%;
    }
  }
`;

const SelectColor = styled.select`
  padding: 4px;
  font-size: 18px;
  border-radius: 7px;
  background: #000000;
  color: white;
  border: none;
  outline: none;
`;
