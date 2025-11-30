import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import {
  BrowserRouter,
  NavLink,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

//import img
import Logout from "../../../assets/icon/logout.svg";
import logo from "../../../assets/icon/logo.svg";
import home from "../../../assets/icon/Home.svg";
import user from "../../../assets/icon/User.svg";
import paper from "../../../assets/icon/Paper.svg";
import doc from "../../../assets/icon/Document.svg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signOutAction } from "../../../store/actions/authActions";
import styled from "styled-components";
import Axios from "../../../utils/axios";
import { useEffect } from "react";

function UniversitetBackoffice(props) {
  const history = useHistory();
  const [invoiceMenu, setInvoiceMenu] = useState();
  const [handleburger, setHandleburger] = useState();
  const [count, setCount] = useState(0);
  const [menu, setMenu] = useState(false);
  const [average, setAverage] = useState(0);
  const selector = useSelector((state) => state);

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutAction());
    history.replace("/");
    localStorage.clear();
    localStorage.setItem("univerCount", average);
  };
  const fetchStudents = async () => {
    try {
      const res = await Axios.get("/applicant/list/");
       ;
      const { status, data } = res;
      const { count } = data;
      if (status === 200) {
        if (!localStorage.getItem("univerCount")) {
          localStorage.setItem("univerCount", count);
        }
        const newValue = count - localStorage.getItem("univerCount");
        setAverage(count);
        setCount(newValue);
        localStorage.setItem("univerCount", count);
      }
    } catch (error) {
       ;
    }
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  const handlemenu = () => {
    setMenu(!menu);
  };

  const handlemenuclose = () => {
    setMenu(false);
  };

  const { t, i18n } = useTranslation();
   ;

  return (
    <>
      <div className="asos_1">
        <div className="navfixed" id={menu ? "left0" : ""}>
          <Link style={{ cursor: "pointer" }} className="logo" to="/">
            <img src={logo} alt="" />
            <h1>Edugately</h1>
          </Link>
          <div className="links">
            <NavLink
              onClick={handlemenu}
              activeClassName="active_unve"
              to="/univer-backoffice-page"
            >
              <img src={home} alt="" />
              {t("part200")}
            </NavLink>
            <NavLink
              onClick={handlemenu}
              activeClassName="active_unve"
              to="/studentsss"
              style={{ position: "relative" }}
            >
              <img src={user} alt="" />
              {count > 0 ? <SpanContainer>+ {count}</SpanContainer> : ""}
              {t("part201")}
            </NavLink>
            <div className={menu ? "div_active div_a" : "div_a"}>
              <div className={menu ? "link_active bugalter" : "bugalter"}>
                <div onClick={handlemenu} className="toggle_link">
                  <img src={doc} alt="" />
                  <h5 className="invoice-send"> {t("part202")}</h5>
                </div>
                <div className="toggle">
                  <NavLink onClick={handleburger} to="/invoice">
                    {t("p203")}
                  </NavLink>
                  <NavLink onClick={handleburger} to="/invoice-send">
                    {t("p204")}
                  </NavLink>
                  <NavLink onClick={handleburger} to="/invoice-receive">
                    {t("p205")}
                  </NavLink>
                </div>
              </div>
            </div>

            <NavLink
              onClick={handlemenu}
              activeClassName="active_unve"
              to="/info"
            >
              <img src={paper} alt="" />
              {t("p206")}
            </NavLink>

            <NavLink
              onClick={handlemenu}
              activeClassName="active_unve"
              to="/tabriklar"
            >
              <img src={paper} alt="" />
              {t("par0")}
            </NavLink>

            <NavLink
              onClick={handlemenu}
              activeClassName="active_unve"
              to="/napravFakultet"
            >
              <img src={paper} alt="" />
              {t("p207")}
            </NavLink>
            <NavLink
              onClick={handlemenu}
              activeClassName="active_unve"
              to="/napravMajor"
            >
              <img src={paper} alt="" />
              {t("p208")}
            </NavLink>
            <button onClick={signOut}>
              <img src={Logout} /> {t("p209")}
            </button>
          </div>
        </div>
        <div className="fix_diiv"></div>
      </div>
      <div className="asos_2">
        <button onClick={handlemenu} className="burger_btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="switchs" onClick={handlemenuclose}>
          {props.children}
        </div>
      </div>
    </>
  );
}

export default UniversitetBackoffice;

const SpanContainer = styled.span`
  position: absolute;
  right: 4px;
  top: -12px;
  background: white;
  color: black;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
