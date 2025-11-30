import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
// import MenuCart from "./sub-components/MenuCart";

const IconGroup = ({ iconWhiteClass }) => {
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };
  const { t } = useTranslation();
  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };


  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)} >
      <div className="same-style header-search d-none d-lg-block">
        <div className="d-flex align-items-center">
          <span className="search-btn">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="17.25" cy="17.25" r="14.25" stroke="#3772FF" stroke-width="1.5" />
              <path d="M27.75 27.75L33 33" stroke="#3772FF" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </span>
          <input className="search ms-3" type="text" placeholder={`${t('search')}...`} />
        </div>
      </div>
      {/* <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            0
          </span>
        </Link>
      </div> */}
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};



export default IconGroup;
