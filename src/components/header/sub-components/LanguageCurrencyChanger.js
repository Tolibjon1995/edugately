import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrency } from "../../../store/slices/currency-slice"

const LanguageCurrencyChanger = () => {
  const { i18n } = useTranslation();
  // const dispatch = useDispatch();
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    i18n.changeLanguage(languageCode);
  };

  const setCurrencyTrigger = e => {
    const currencyName = e.target.value;
    // dispatch(setCurrency(currencyName));
  };

  return (
    <div className="language-currency-wrap">
      <div className="same-language-currency language-style">
        <span className="fs-7">
          {i18n.resolvedLanguage === "uz"
            ? "UZ"
            : i18n.resolvedLanguage === "en"
            ? "EN"
            : i18n.resolvedLanguage === "ru"
            ? "РУ"
            : ""}{" "}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="uz" onClick={e => changeLanguageTrigger(e)}>
                Uz
              </button>
            </li>
            <li>
              <button value="ru" onClick={e => changeLanguageTrigger(e)}>
                Ru
              </button>
            </li>
            <li>
              <button value="en" onClick={e => changeLanguageTrigger(e)}>
                En
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* <div className="same-language-currency use-style">
        <span>
          {['currency.currencyName']} <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="USD" onClick={e => setCurrencyTrigger(e)}>
                USD
              </button>
            </li>
            <li>
              <button value="EUR" onClick={e => setCurrencyTrigger(e)}>
                EUR
              </button>
            </li>
            <li>
              <button value="GBP" onClick={e => setCurrencyTrigger(e)}>
                GBP
              </button>
            </li>
          </ul>
        </div>
      </div> */}
      {/* <div className="same-language-currency">
        <p>Call Us 3965410</p>
      </div> */}
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  currency: PropTypes.shape({}),
};

export default LanguageCurrencyChanger;
