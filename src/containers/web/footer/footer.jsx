import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../utils/axios";
import { useTranslation } from "react-i18next";
import axios from 'axios';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
// import css
import "../../../style/css/footer.css";
import Swal from "sweetalert2";
import MapEdugately from "../pages/yandexMap/MapEdugately";
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import InputMask from "react-input-mask";


const Footer = () => {
  const { t, i18n } = useTranslation();
  ;
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [write, setWrite] = useState(false);
  const [valid, setValid] = useState("")
  const [valid2, setValid2] = useState(false)


  const handlecheck = () => {
    setWrite(!write);
  };
  const callMe = async () => {
    let tels = phone.slice(0, 4) + phone.slice(6, 8) + phone.slice(10, 13) + phone.slice(14, 16) + phone.slice(17, 19)
    try {
      const data = await axios.post("https://backend.edugately.com/api/v1/common/phone-consultation/", {
        phone_number: tels,
        // write_to_telegram: write,
      });
      ;
      if (data.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Успешно отправлено',
        })
      }
    } catch (error) {
      ;
      if (error.response.status === 400) {
        const phone_number = error?.response?.data?.phone_number
        Swal.fire({
          icon: 'warning',
          text: phone_number[0],
        })
      }
    }
  };
  const takeDailyNews = async () => {
    if (valid2 == true) {
      try {
        const res = await axios.post('https://backend.edugately.com/api/v1/common/email-newsletter/', { email: phone2 })
        if (res.status === 201) {
          Swal.fire({
            icon: 'success',
            text: 'Успешно отправлено'
          })
        }
      } catch (error) {
        ;
        const email = error?.response?.data?.email
        if (error) {
          Swal.fire({
            icon: 'warning',
            text: 'Xatolik!!!'
          })
        }
      }
    } else {
      setValid('Ushb maydon to\'ldirilishi shart')
    }

  }

  function ValidateEmail(inputText) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      setValid('Email to\'g\'ri kiritildi')
      setValid2(true)
      setPhone2(inputText)
    }
    else {
      setValid("Iltimos haqiqiy email kiriting");
      setValid2(false)
    }
  }

  return (
    <div className="footer oldd">
      {/* <button className="btn">{t("part30")}</button> */}
      {/* <div className="top">
        <h1>{t("part31")}</h1>
        <div>
          <div>
            <InputMask
              mask="+\9\98 (99) 999-99-99"
              className="form-control"
              placeholder="+998-123-45-67"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button style={{ marginBottom: '25px' }} onClick={callMe}>{t("part32")}</button>
        </div>
      </div> */}
      <div className="down">

        <div className="left">
          {/* <MapEdugately /> */}
          <Link className="text-white mt-3 ms-5" style={{fontSize: '50px'}} to='/' >EDUGATELY</Link>

        </div>
        <div className="right">
          {/* <h1>{t("part47")}</h1> */}
          {/* <p> {t("part48")}</p> */}
          <div className="email">
            <input type="email" onChange={e => ValidateEmail(e.target.value)} placeholder="E-mail" />

          </div>
          <span style={valid2 == true ? { color: '#30A800', fontWeight: 700 } : { color: '#fd0000', fontWeight: 700 }}>{valid}</span>
          <br />
          <br />
          <button onClick={takeDailyNews}>{t("part49")}</button>
          <h4>{t("part50")}</h4>
          <div className="social">
            {/* facebook icon */}
            <a target="blank" href='https://www.facebook.com/Edugately' className="links fb">
              <FacebookIcon />
            </a>
            <a target="blank" href='https://instagram.com/edugately?utm_medium=copy_link' className="links in">
              <InstagramIcon />
            </a>
            <a target="blank" href='https://www.youtube.com/channel/UCWT2CbEH-n5vDNAGrYFqESQ' className="links yt">
              <YouTubeIcon />
            </a>
            <a target="blank" href='https://t.me/Edugately' className="links tl">
              <TelegramIcon />
            </a>



          </div>

          {/* end right */}
        </div>
      </div>

      <div className="otapoch">
        <a className="poch" href="mailto:infoedugately@gmail.com?subject text">
          <div className="doira" style={{ marginRight: '15px' }}>
            <EmailIcon fontSize="large" />
          </div>
          <div className="dvv">
            <p style={{ margin: '0px' }}>{t("part34")}:</p>
            <p>infoedugately@gmail.com</p>
          </div>
        </a>
        <a className="poch" target='_blank' href="https://www.google.com/maps/place/Asia+Consult/@41.315741,69.240353,18.82z/data=!4m5!3m4!1s0x38ae8be6a6bf321b:0x7ca52bd8be672e2b!8m2!3d41.3157538!4d69.2412375">
          <div className="doira" style={{ marginRight: '15px' }}>
            <LocationOnIcon fontSize="large" />
          </div>
          <div className="dvv">
            <p style={{ margin: '0px' }}>{t("part33")}:</p>
            <p>Toshkent sh. Furqat 23 A</p>
          </div>
        </a>
        <a className="poch" href="tel:+998 555061011" >
          <div className="doira" style={{ marginRight: '15px' }}>
            <PhoneIcon fontSize="large" />
          </div>
          <div className="dvv">
            <p style={{ margin: '0px' }}>{t("part35")}:</p>
            <p>+998 55 506 1011</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Footer;
