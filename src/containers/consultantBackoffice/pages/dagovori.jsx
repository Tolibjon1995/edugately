import React, { useState, useEffect } from "react";
import { scaleOrdinal } from "d3-scale";
import { schemeCategory10 } from "d3-scale-chromatic";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ComposedChart,
  LabelList,
} from "recharts";
import { useSelector } from "react-redux";
import userpic from "../../../assets/icon/userpic.svg";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "../../../utils/axios";
import "../../../style/css/dagavor.css";
import Sidebar from "./SidebarConsult";

// import json

const colors = scaleOrdinal(schemeCategory10).range();

const Dagavori = () => {
  const selector = useSelector((state) => state.payload.payload.data);
  const [popularUniver, setPopularUniver] = useState([]);
  const [profit, setProfit] = useState([]);
  const [contruct, setContruct] = useState([]);
  const [date, setDate] = useState();
  const [date2, setDate2] = useState("");
  const [byBranch, setByBranch] = useState([]);
  const [main, setMain] = useState({
    day: "",
    week: "",
    month: "",
    year: "",
  });

  const fetchPopularUniver = async () => {
    try {
      const res = await Axios.get(
        "/company/director/statistics/dashboard/popular_universities/"
      );
      const final = res.data.map((item) => {
        return {
          name: item.name,
          value: item.students_count,
        };
      });
      ;
      setPopularUniver(final);
      ;
    } catch (error) {
      ;
    }
  };

  const fetchProfit = async () => {
    try {
      const res = await Axios.get(
        "/company/director/statistics/dashboard/money_universities/"
      );
      setProfit(res.data);
    } catch (error) {
      ;
    }
  };

  const fetchContruct = async () => {
    try {
      const res = await Axios.get(
        `/company/director/statistics/dashboard/contract_universities/`
      );
      setContruct(res.data);
    } catch (error) {
      ;
    }
  };

  const fetchContructByDate = async () => {
    try {
      const res = await Axios.get(
        `/company/director/statistics/dashboard/contract_universities/?year=${date}`
      );
      setContruct(res.data);
    } catch (error) {
      ;
    }
  };

  const fetchContructByBranch = async () => {
    try {
      const res = await Axios.get(
        `/company/director/statistics/dashboard/contract_branches/`
      );
      setByBranch(res.data);
      console.log(byBranch)
    } catch (error) {
      ;
    }
  };

  const fetchContructByBranchByDate = async () => {
    try {
      const res = await Axios.get(
        `/company/director/statistics/dashboard/contract_branches/?year=${date2}`
      );
      setByBranch(res.data);
    } catch (error) {
      ;
    }
  };

  const fetchMain = async () => {
    try {
      const res = await Axios.get(
        "/company/director/statistics/dashboard/all_contracts/"
      );
      setMain(res.data);
    } catch (error) {
      ;
    }
  };


  useEffect(() => {
    fetchPopularUniver();
    fetchContructByBranch();
    fetchProfit();
    fetchContruct();
    fetchMain();
  }, []);

  useEffect(() => {
    if (!date) return;
    fetchContructByDate();
  }, [date]);

  useEffect(() => {
    if (!date2) return;
    fetchContructByBranchByDate();
  }, [date2]);
  return (
    <div className="consultDoogovori">
      <Sidebar>
        <div className="asos">
          <div className="Up_navbar">
            <h4>Договоры</h4>
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
          <div className="sideGlavny">
            <div className="dagavor_select">
            </div>
            {/* block - 1 */}
            <div className="block_1">
              {/* card */}
              <div className="card_1 card">
                <h4>Договоры за 1 день</h4>
                <h3>{main.day}</h3>
              </div>
              {/* card */}
              <div className="card_2 card">
                <h4>За неделю</h4>
                <h3>{main.week}</h3>
              </div>
              {/* card */}
              <div className="card_3 card">
                <h4>За месяц</h4>
                <h3>{main.month}</h3>
              </div>
              {/* card */}
              <div className="card_4 card">
                <h4>За год</h4>
                <h3>{main.year}</h3>
              </div>
            </div>
            {/* end block - 1 */}
            <div className="block_2 block_chart">
              <div>
                <h5>Кол-во договоров по филиалам</h5>
                <div className="seeMoreAct data_pick">
                  <select onChange={(e) => setDate2(e.target.value)}>
                    <option selected hidden>
                      Выберите год
                    </option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>
              <div className="diag">
                <ResponsiveContainer>
                  <BarChart
                    data={byBranch}
                    margin={{
                      top: 20,
                      right: 0,
                      left: -20,
                      bottom: 50,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" vertical="" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applicant_count" barSize={45} fill="#8884d8">
                      {byBranch.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="block_2 block_chart">
              <div>
                <h5>Кол-во договоров по университетам</h5>
                <div className="seeMoreAct data_pick">
                  <select onChange={(e) => setDate(e.target.value)}>
                    <option selected hidden>
                      Выберите год
                    </option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                  </select>
                </div>
              </div>
              <div className="diag">
                <ResponsiveContainer>
                  <BarChart
                    data={contruct}
                    margin={{
                      top: 20,
                      right: 0,
                      left: -20,
                      bottom: 50,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" vertical="" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="applicant_count" barSize={45} fill="#8884d8">
                      {contruct.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="block_2 block_chart vertical_charts">
              <div>
                <h5>Самые доходные университеты по услугам компании</h5>
              </div>
              <div className="diag">
                <ResponsiveContainer>
                  <ComposedChart
                    layout="vertical"
                    data={profit}
                    margin={{
                      top: 0,
                      right: 100,
                      bottom: 10,
                      left: -20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" horizontal="" />
                    <XAxis type="number" />
                    <YAxis dataKey="total_price" type="category" scale="band" />
                    <Tooltip />
                    <Bar dataKey="total_price" barSize={20} fill="#413ea0">
                      <LabelList dataKey="name" position="right" />
                      {profit.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="block_2 block_chart vertical_charts">
              <div>
                <h5>
                  Самые популярные колледжи по числу поступивших студентов
                </h5>
              </div>
              <div className="diag">
                <ResponsiveContainer>
                  <ComposedChart
                    layout="vertical"
                    data={popularUniver}
                    margin={{
                      top: 20,
                      right: 100,
                      bottom: 20,
                      left: -20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="10 10" horizontal="" />
                    <XAxis type="number" />
                    <YAxis dataKey="value" type="category" scale="band" />
                    <Tooltip />
                    <Bar dataKey="value" barSize={20} fill="#413ea0">
                      <LabelList dataKey="name" position="right" />
                      {popularUniver.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                      ))}
                    </Bar>
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Dagavori;
