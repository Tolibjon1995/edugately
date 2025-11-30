import React, { useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import routes from "./routes/routes";
import "./style/css/sidebarCabinet.css";
import "./i18n";
import Swal from "sweetalert2";
// ! iltimos tegmang - DNT
// import "./style/css/DNT.css";
// ! iltimos tegmang - DNT

import "./style/css/sidebar.css";
import MainEduGate from "./containers/web/pages/MainEduGate";
import Home from "./containers/consultantBackoffice/univerBackoffice/pages/home";
import ScrollToTop from './ScrolltoTop';

function App() {
  const history = useHistory();

  const redirectToMain = () => {
    if (history?.location?.pathname?.startsWith("/invitation")) {
      localStorage.setItem(
        "referral",
        history.location.pathname.slice(
          12,
          history.location.pathname.lastIndexOf("/")
        )
      );
      history.push("/");
    }
    if (history?.location?.pathname?.startsWith("/university")) {
      localStorage.setItem(
        "referral2",
        history.location.pathname.slice(
          12,
          history.location.pathname.lastIndexOf("/")
        )
      );
      localStorage.setItem(
        "unverr",
        history.location.pathname.slice(
          12,
          history.location.pathname.lastIndexOf("/")
        )
      );
      history.push("/");
    }
  };
  const isUserOnline = () => {
    if (window.navigator.onLine) return
    Swal.fire({
      text: 'пожалуйста, проверьте ваше интернет-соединение',
      icon: 'warning'
    })
  }
  useEffect(() => {
    redirectToMain();
    isUserOnline()
  }, []);

  return (
    <>
      <ScrollToTop />
      <div className="container" >
        <Switch>
          {routes.public.map((item) => {
            return <Route {...item} />;
          })}
        </Switch>
        <div className="asos_u">
          <Switch>
            {routes.univerOffice.map((item) => {
              return <Route {...item} />;
            })}
          </Switch>
        </div>
        <div className="switchs">
          <Switch>
            {routes.consult.map((item) => {
              return <Route {...item} />;
            })}
          </Switch>
        </div>
        <div className="switchs">
          <Switch>
            {routes.accountant.map((item) => {
              return <Route {...item} />;
            })}
          </Switch>
        </div>
        <div className="kabinet">
          <Switch>
            {routes.student.map((item) => {
              return <Route {...item} />;
            })}
          </Switch>
        </div>
        <div className="kabinet notarius">
          <Switch>
            {routes.notarius.map((item) => {
              return <Route {...item} />;
            })}
          </Switch>
        </div>
        <div className="kabinet notarius maneger">
          <Switch>
            {routes.maneger.map((item) => {
              return <Route {...item} />;
            })}
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
