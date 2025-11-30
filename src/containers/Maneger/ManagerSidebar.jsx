import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Snackbar from "@material-ui/core/Snackbar";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  NavLink,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
// import "../../style/css/maneger.css"
import Axios from "../../utils/axios";
// import icon
import LogoEdu from "../../assets/icon/LogoEdu.svg";
import home from "../../assets/icon/Home.svg";
import user from "../../assets/icon/User.svg";
import paper from "../../assets/icon/Paper.svg";
import doc from "../../assets/icon/Document.svg";
import logout_icon from "../../assets/icon/logout.svg";

import { useDispatch, useSelector } from "react-redux";
import { signOutAction } from "../../store/actions/authActions";

const ManegerSidebar = () => {
  const [menu, setMenu] = useState(false);
  const handlemenuOn = () => {
    setMenu(!menu);
  };
  const [averall, setAverall] = useState(0);
  const [count, setCount] = useState(0)
  const selector = useSelector((state) => state?.payload?.payload?.data);
  const handlemenuOff = () => {
    setMenu(false);
    setSideFix(false);
  };
  const [open, setOpen] = useState(false);
  const [referral, setReferral] = useState([]);
  const history = useHistory();
  const [link, setLink] = useState();
  const dispatch = useDispatch();

  const [sideFix, setSideFix] = useState(false);

  const signOut = () => {
    dispatch(signOutAction());
    history.replace("/");
    localStorage.clear()
    localStorage.setItem("managerCount", averall)
  };
  useMemo(async () => {
    if (selector?.role === "supermanager") {
      try {
        const res = await Axios.get("/company/generate-university-link/");
        const { status, data } = res;
        console.log(res)
        if (status === 200) {
          setReferral(data);
          
        }
      } catch (error) { }
    };
    try {
      const res = await Axios.get("/company/generate-link/");
      const { status, data } = res;
      if (status === 200) {
        setReferral(data);
        
      }
    } catch (error) { }
  }, [link]);
  const generateLink = async () => {
    if (referral.length < 1) {
      try {
        const res = await Axios.post("/company/generate-link/");
        const { status, data } = res;
        if (status === 201) {
          const { url } = data.link;
          setLink(url);
        }
      } catch (error) { console.log(error);}
    } else {
      navigator.clipboard.writeText(referral[0].url);
      setOpen(true);
    }
  };

  const generateLink2 = async () => {
    if (referral.length < 1) {
      try {
        const res = await Axios.post("/company/generate-university-link/");
        const { status, data } = res;
        
        if (status === 201) {
          const { url } = data.link;
          setLink(url);
        }
      } catch (error) { console.log(error);}
    } else {
      navigator.clipboard.writeText(referral[0].url);
      setOpen(true);
    }
  };

  const getUserList = async () => {
    try {
      const res = await Axios.get('/applicant/list/')
      const { status, data } = res;
      const { count } = data;
      ;
      if (status === 200) {
        if (!localStorage.getItem("managerCount")) {
          localStorage.setItem("managerCount", count)
        }
        const differ = count - localStorage.getItem("managerCount");
        setAverall(count)
        setCount(differ)
        localStorage.setItem("managerCount", count);
      }
    } catch (error) {
      ;
    }
  }

  const { t, i18n } = useTranslation();
  ;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getUserList()
  }, []);
  return (
    <div>
      <button
        className="n_none"
        id="none768"
        onClick={() => setSideFix(!sideFix)}
      >
        <div></div>
        <div></div>
        <div></div>
      </button>
      <div className={sideFix ? "sidebarFix sideAct" : "sidebarFix sidePass"}>
        <div className="sidebar">
          <Link to="/" className="top">
            <svg
              id="Xnone768"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44 44L4 4M44 4L4 44"
                stroke="white"
                stroke-width="7"
                stroke-linecap="round"
              />
            </svg>

            <img src={LogoEdu} alt="" />
            <h1>Edugately</h1>
          </Link>
          <div className="bottom">
            <NavLink
              exact
              to={`${(selector?.role == "manager" && "/m-analitika") ||
                "/superManager-analitika"
                }`}
            >

              <h5>{t("p331")}</h5>
            </NavLink>
            <NavLink
              exact
              to={`${(selector?.role == "manager" && "/m-glavny/") ||
                "/super-manager/"
                }`}
            >

              {selector?.role == "manager" ?
                count > 0 ?
                  <SpanContainer>
                    + {count}
                  </SpanContainer>
                  : ''
                : ""
              }

              <h5>{t("p332")} </h5>
            </NavLink>
            <NavLink
              style={{
                display: (selector.role == "manager" && "flex") || "none",
              }}
              exact
              to={`${(selector?.role == "manager" && "/StatusAbiturent/") ||
                "/super-StatusAbiturent/"
                }`}
            >
              <h5>{t("p333")}</h5>
            </NavLink>
            <div>
              <div>
                <div
                  className={
                    menu === false ? "m_toggle" : "m_toggle m_toggleOn"
                  }
                  onClick={handlemenuOn}
                >
                  <NavLink
                    exact
                    to={`${(selector.role == "manager" && "/m-docs_all") ||
                      "/superManager-docs_all"
                      }`}
                    onClick={handlemenuOff}
                  >
                    <h5>{t("p334")}</h5>
                  </NavLink>
                  <NavLink
                    exact
                    to={`${(selector.role == "manager" && "/m-docs_send") ||
                      "/superManager-docs_send"
                      }`}
                    onClick={handlemenuOff}
                  >
                    <h5>{t("p335")}</h5>
                  </NavLink>
                  <NavLink
                    exact
                    to={`${(selector.role == "manager" && "/m-docs_rec") ||
                      "/superManager-docs_rec"
                      }`}
                    onClick={handlemenuOff}
                  >
                    <h5>{t("p336")}</h5>
                  </NavLink>
                </div>
                <NavLink
                  exact
                  to={`${(selector.role == "manager" && "/m-prayslist") ||
                    "/superManager-prayslist"
                    }`}
                >
                  <h5>{t("p337")} </h5>
                </NavLink>
                {(selector.role == "manager" && (
                  <NavLink to={"/changeUniver"}>
                    {" "}
                    <h5>{t("p338")}</h5>
                  </NavLink>
                )) ||
                  ""}
                <NavLink
                  exact
                  to={`${(selector?.role === "manager" && "/m-news") ||
                    "/superManager-news"
                    }`}
                >
                  <h5>{t("p339")}</h5>
                </NavLink>

                {selector.role === "supermanager" ? (
                  <NavLink exact to={"/cancel-student"}>
                    <h5>{t("canseled")}</h5>
                  </NavLink>
                ) : (
                  ""
                )}
                {selector.role === "supermanager" ? (
                  <NavLink exact to={"/super-ziyo"}>
                    <h5>Ziyo student</h5>
                  </NavLink>
                ) : (
                  ""
                )}

                {selector.role === "supermanager" ? (
                  <NavLink exact to={"/sign-up-infinite"}>
                    <h5>Add student</h5>
                  </NavLink>
                ) : (
                  ""
                )}

                {selector.role === "supermanager" ? (
                  <NavLink exact to={"/bind-unversite"}>
                    <h5>{t("b1")}</h5>
                  </NavLink>
                ) : (
                  ""
                )}

                {selector.role === "supermanager" ? (
                  <NavLink exact to={"/phone-calls"}>
                    <h5>{t("p340")}</h5>
                  </NavLink>
                ) : (
                  ""
                )}
                <button
                  to=""
                  style={{ marginBottom: "80px" }}
                  onClick={signOut}
                  className="logoutbtn"
                >
                  <img src={logout_icon} alt="" />
                  <h5>{t("p341")}</h5>
                </button>
                {selector?.role == "supermanager" ? (
                  <ReferralContainer>
                  <button onClick={generateLink2}>
                    {referral.length > 0 ? (
                      referral.map((item) => {
                        return (
                          <>
                            <p style={{ fontSize: "16px" }}>
                              {" "}
                              {item.url.length > 21
                                ? item.url.slice(0, 21) + "..."
                                : item.url}
                            </p>
                            <p>{t("p342")}</p>
                          </>
                        );
                      })
                    ) : (
                      <p>{t("p343")}</p>
                    )}
                  </button>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={t("p215")}
                  />
                </ReferralContainer>
                ) : (
                  <ReferralContainer>
                    <button onClick={generateLink}>
                      {referral.length > 0 ? (
                        referral.map((item) => {
                          return (
                            <>
                              <p style={{ fontSize: "16px" }}>
                                {" "}
                                {item.url.length > 21
                                  ? item.url.slice(0, 21) + "..."
                                  : item.url}
                              </p>
                              <p>{t("p342")}</p>
                            </>
                          );
                        })
                      ) : (
                        <p>{t("p343")}</p>
                      )}
                    </button>
                    <Snackbar
                      open={open}
                      autoHideDuration={6000}
                      onClose={handleClose}
                      message={t("p215")}
                    />
                  </ReferralContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManegerSidebar;

const ReferralContainer = styled.div`
  width: 100%;
  padding: 0 30px;
  button {
    width: 227px;
    height: 52px;
    background: #dbf4ff;
    border-radius: 12px;
    border: none;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }
`;

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



`
