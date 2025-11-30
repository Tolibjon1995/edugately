import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


const HeaderTop = ({ borderStyle, sidebarMenu ,menuWhiteClass}) => {
  const { t } = useTranslation();
  // const currency = useSelector((state) => state.currency);
  return (
    <div className={clsx("header-top-wap", borderStyle === "fluid-border" && "border-bottom")}>
      <div className="d-flex align-items-center">
        <div className="header-offer">
          <a href="tel:+998555061011" className="nav-link">
            <span className="me-3">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 3C21 3 24.3 3.3 28.5 7.5C32.7 11.7 33 15 33 15" stroke="#3772FF" stroke-width="1.5" stroke-linecap="round" />
                <path d="M21.3105 8.30347C21.3105 8.30347 22.7955 8.72773 25.0229 10.9551C27.2502 13.1825 27.6745 14.6674 27.6745 14.6674" stroke="#3772FF" stroke-width="1.5" stroke-linecap="round" />
                <path d="M15.0564 7.97426L16.0299 9.71865C16.9085 11.2929 16.5558 13.358 15.1721 14.7417C15.1721 14.7417 15.1721 14.7417 15.1721 14.7417C15.1719 14.7418 13.4938 16.4202 16.5368 19.4632C19.5791 22.5056 21.2575 20.8287 21.2583 20.8279C21.2583 20.8279 21.2583 20.8279 21.2583 20.8279C22.642 19.4442 24.7071 19.0915 26.2814 19.9701L28.0257 20.9436C30.4028 22.2702 30.6836 25.6039 28.5942 27.6933C27.3387 28.9488 25.8006 29.9257 24.1004 29.9902C21.2382 30.0987 16.3774 29.3743 11.5016 24.4984C6.62569 19.6226 5.90132 14.7618 6.00983 11.8996C6.07428 10.1994 7.0512 8.66135 8.30671 7.40585C10.3961 5.31642 13.7298 5.59716 15.0564 7.97426Z" stroke="#3772FF" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </span>
            +998 (55) 506 1011
          </a>

        </div>
        <span className="mx-4">
          <svg width="2" height="39" viewBox="0 0 2 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="4.37115e-08" x2="0.999998" y2="39" stroke="#3772FF" stroke-width="2" />
          </svg>
        </span>
        <div className="header-offer">
          <div
            className={clsx(sidebarMenu
              ? "sidebar-menu"
              : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)}
          >
            <nav>
              <ul>
                <li>
                  <Link className="fs-7" to={process.env.PUBLIC_URL + "/"}>
                    {t("login")}
                    {sidebarMenu ? (
                      <span>
                        <i className="fa fa-angle-right"></i>
                      </span>
                    ) : (
                      <i className="fa fa-angle-down" />
                    )}
                  </Link>
                  <ul className="mega-menu mega-menu-padding">
                    <li>
                      <ul>
                        <li className="mega-menu-title">
                          <Link to={process.env.PUBLIC_URL + "/login"}>
                            {t("login")}
                          </Link>
                        </li>
                        <li className="mega-menu-title">
                          <Link to={process.env.PUBLIC_URL + "/registr"}>
                            {t("Registration")}
                          </Link>
                        </li>

                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <LanguageCurrencyChanger />
    </div>
  );
};

HeaderTop.propTypes = {
  borderStyle: PropTypes.string,
};

export default HeaderTop;
