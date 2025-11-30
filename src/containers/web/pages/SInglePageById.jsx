import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useParams, useLocation } from "react-router-dom";
import Axios from "../../../utils/axios";
import "../../../style/css/singlepage.css";
import Navbar from "./Navbar";
import backTo from "./../../../assets/images/BackTo.png";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useSelector } from "react-redux";

export default function SInglePageById() {



  const params = useParams();
  const [major, setMajors] = useState([]);
  const [majors, setMajorss] = useState();
  const [deadline, setDeadline] = useState("");
  const location = useLocation();
  const selector = useSelector((state) => state);
  const lang = selector.payload?.user?.lang?.languageValue;

  // localStorage.setItem('mainId', location.state.currentId)

  const fetchData = async () => {
    try {
      const res = await axios.get(`https://backend.edugately.com/api/v1/university/faculty/${params.id}/`, {
        headers: {
          'Accept-Language': lang,
        }
      });
      setMajors(res.data.majors);
      res.data.majors.map((i) => {
        setMajorss(i)
      })
      setDeadline(res.data);
    } catch (error) { }
  };
  const { t, i18next } = useTranslation()
  useEffect(() => {
    fetchData();
  }, [lang]);
  useEffect(() => {
    fetchData();
  }, [])
  const mainId = localStorage.getItem('univerId');
  console.log(mainId);
  return (
    <>
      {/* <Navbar/> */}
      <div className="sp_main">
        <div style={{ justifyContent: "unset" }} className="sp_main2 sp2">
          <div></div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <Link to={`/university/${mainId}`} className="backTo">
                <img
                  style={{ width: "16px", filter: "brightness(0.28)" }}
                  src={backTo}
                  alt=""
                />
              </Link>
              <h1>{t("p232")} - {deadline.name}</h1>
            </div>
            <div className="sp_table sp2_table">
              <table>
                <thead>
                  <tr>
                    <th>{t("part54")}</th>
                    <th>{t("p293")}</th>
                    <th>{t("p234")}</th>
                    <th>{t("p2342")}</th>
                    <th>{t("p439")}</th>
                    <th>{t("p2342")}</th>
                    
                    <th>{t("p336")}</th>
                  </tr>
                </thead>
                <tbody>
                  {major.map((f, i) => {
                    return (
                      <tr key={i}>
                        <td>{f.name}</td>
                        <td>{deadline.deadline} </td>
                        <td>
                          {(f?.education_type == "full_time" &&
                            t("p252")) ||
                            (f?.education_type === "part_time" &&
                              t("p375")) ||
                            (f?.education_type === "distance" &&
                              t("p253")) ||
                            (f?.education_type === "night_time" &&
                              t("p321"))}
                        </td>
                        <td>{f.edu_type} </td>
                        <td>{f.edu_type === 'Grant' ? "0" : f.education_fee}</td>
                        <td>{f.training_period} yil</td>
                        <td>
                          {deadline.status === "open" ? t("p617") : null}
                          {f.status === "close" ? t("p618") : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
