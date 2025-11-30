import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
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
import { useDispatch, useSelector } from "react-redux";
//import css
import "react-datepicker/dist/react-datepicker.css";
import "../../../../style/css/home.css";
import { updateLanguageAction } from "../../../../store/actions/langAction";
//import img
import userpic from "../../../../assets/icon/userpic.svg";
import UniversitetBackoffice from "../universitetBackoffice";
import Axios from "../../../../utils/axios";

const colors = scaleOrdinal(schemeCategory10).range();

const data = require("../json/data.json");
const dataPie = require("../json/data2.json");
const dataPie2 = require("../json/data3.json");
const data_doxod = require("../json/data_doxod.json");
const dataComposed = require("../json/dataComposed.json");

function Home() {
  const selector = useSelector((state) => state.payload?.payload?.data);
  const [dataFirst, setDataFirst] = useState();
  const [data, setData] = useState();
  const [dataComposeds, setDataComposeds] = useState();
  const [statistika, setStatistika] = useState();
  const [loading, setLoading] = useState(false);
  const [second, setSecond] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [payment, setPayment] = useState({
    not_paid: "",
    paid: "",
    waiting_confirmation: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [UniID, setUniID] = useState({
    id: "",
    name: "",
    location: "",
    description: "",
    founding_year: "",
    city: {
      id: "",
      name: "",
      country: {
        id: "",
        name: "",
      },
    },
    motto: "",
    rating: "",
    rating_source: "",
    education_quality: [],
    bachelor_degree_fee_per_annum: "",
    masters_degree_fee_per_annum: "",
    living_price_per_annum: "",
    faculties: [],
    images: [],
  });
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation();
   ;
  const changeLanguage = (e) => {
    const languageValue = e.target.value;
    dispatch(updateLanguageAction({languageValue}))
    localStorage.setItem("univerLang", languageValue);
    i18n.changeLanguage(languageValue);
  };
  const fetchByDay = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/university/statistics/?day=true`);
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
      const res = await Axios.get(`/university/statistics/?week=true`);
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
      const res = await Axios.get(`/university/statistics/?month=true`);
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
      const res = await Axios.get(`/university/statistics/?year=true`);
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
        `/university/statistics/?date-from=${startDate.toLocaleDateString()}&date-to=${endDate.toLocaleDateString()}`
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
  const fetchSecondBlock = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/university/statistics/second_block/");
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
      const res = await Axios.get("/university/statistics/");

      setStatistika(res);
      const { first_block, second_block, fourth_block, third_block } = res.data;

      setDataFirst(first_block);
      setData(second_block);
      // setDataDoxod(fourth_block)
      setDataComposeds(third_block);
    } catch (error) {}
  };
  const dataStatistika = () => {
    try {
      const res = Axios.get("/university/statistics/");
    } catch (error) {}
  };
  useEffect(() => {
    getDataStatistika();
    dataStatistika();
  }, []);
  const genderOfStudents = [
    {
      name: "Group A",
      value: dataComposeds?.applicants.male,
    },
    { name: "Group B", value: dataComposeds?.applicants?.female },
  ];
  const univerID = async () => {
    try {
      const data = await Axios.get(`/university/${selector?.id}`);
      const uni = data.data;
      if (data.status === 200) {
        setUniID(uni);
      }
    } catch (err) {}
  };

  useEffect(() => {
    univerID();
  }, []);

  return (
    <UniversitetBackoffice>
      <div className="up_nav">
        <div>
          <h1 className="link_h1">{t("p210")}</h1>
        </div>
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
        <div className="user_info">
          <img
            src={
              UniID.images.length === 0
                ? userpic
                : UniID.images[0].image.toString()
            }
            alt=""
          />
          <div>
            <h1>{selector?.name}</h1>
            <h2>
              {selector?.city.name}, {selector?.city.country.name}
            </h2>
          </div>
        </div>
      </div>
      <div className="home">
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
            <h4>{t("p217")}</h4>
            <h3>{dataFirst?.applicants}</h3>
          </div>
          {/* card */}
          <div className="card_2 card">
            <h4>{t("p218")}</h4>
            <h3>{dataFirst?.countries}</h3>
          </div>
          {/* card */}
          <div className="card_3 card">
            <h4>{t("p219")}</h4>
            <h3>{dataFirst?.confirmed}</h3>
          </div>
          {/* card */}
          <div className="card_4 card">
            <h4>{t("p220")}</h4>
            <h3>{dataFirst?.rejected}</h3>
          </div>
        </div>
        <div className="scroll">
          <div className="block_2">
            <div>
              <h5>{t("p221")}</h5>
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
                  <CartesianGrid strokeDasharray="10 10" vertical="" />
                  <XAxis dataKey="sana" />
                  <YAxis />
                  <Tooltip />
                  <Legend iconType="square" />
                  <Line
                    type="monotone"
                    strokeWidth={3}
                    dataKey="applicants"
                    name={t("p217")}
                    stroke="#00587F"
                  />
                  <Line
                    type="monotone"
                    strokeWidth={3}
                    dataKey="confirmed"
                    stroke="#10CC9B"
                    name={t("p226")}
                  />
                  <Line
                    type="monotone"
                    strokeWidth={3}
                    dataKey="countries"
                    stroke="#E96383"
                    name={t("p218")}
                  />
                  <Line
                    type="monotone"
                    strokeWidth={3}
                    dataKey="rejectd"
                    stroke="#FCCA58"
                    name={t("p220")}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column'}} className="block_4">
          <div className="block_4_1">
            <h4>{t("p222")}</h4>
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
            <h4>{t("p225")}</h4>
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
                  <CartesianGrid strokeDasharray="10 10" vertical="" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="applicants_count"
                    name="Студенты"
                    barSize={35}
                    fill="#8884d8"
                  >
                    {dataComposed?.dataComposeds?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </UniversitetBackoffice>
  );
}

export default Home;

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
