import React, { Component } from "react";
import ManegerSidebar from "../ManagerSidebar";
import userpic from "../../../assets/icon/LogoAsia.jpg";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const M_news = () => {
  const selector = useSelector((state) => state.payload.payload.data);

  const { t, i18n } = useTranslation();
   ;

  return (
    <React.Fragment>
      <ManegerSidebar />
      <div>
        <div className="up_nav n_up">
          <div>
            <h1 className="link_h1">{t("p339")}</h1>
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
      </div>
    </React.Fragment>
  );
};

export default M_news;
