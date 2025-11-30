import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './yang.css'
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const Yangiliklar = () => {
  const { t, i18n } = useTranslation();
  const selector = useSelector((state) => state);
  const lang = selector.payload?.user?.lang?.languageValue;
  const [news, setNews] = useState([])

  useEffect(() => {
    axios.get('https://backend.edugately.com/api/v1/company/news').then((res) => {
      setNews(res.data.results)
    }).catch((err) => {

    })
  }, [])



  return (
    <>
      <div className="content-wrapper">
        {
          news.map((item, index) => {
            return (
              <div className="news-card" key={index}>
                <img src={item.image} alt className="news-card__image" />
                <div className="news-card__text-wrapper">
                  <h2 className="news-card__title">{lang == 'uz' ? item.title_uz : lang  == 'ru' ? item.title_ru : lang == 'en' ? item.title_en : item.title_ru}</h2>
                  <div className="news-card__post-date">{item.created_at.slice(0, 10)}</div>
                  <div className="news-card__details-wrapper">
                    <p className="news-card__excerpt">{lang == 'uz' ? item.short_description_uz.slice(0, 80) : lang  == 'ru' ? item.short_description_ru.slice(0, 80) : lang == 'en' ? item.short_description_en.slice(0, 80) : item.short_description_ru.slice(0, 80)}...</p>
                    {/* <div className="like">
                      <ThumbUpAltIcon />  item.short_description.slice(0, 80)
                    </div> */}
                    <Link to={`news/${item.id}`} className="news-card__read-more">{t('yangilik')}</Link>
                  </div>
                </div>
              </div>
            )
          })
        }
        {/* <div className="news-card">
          <a href="#" className="news-card__card-link" />
          <img src="https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt className="news-card__image" />
          <div className="news-card__text-wrapper">
            <h2 className="news-card__title">Amazing First Title</h2>
            <div className="news-card__post-date">Jan 29, 2018</div>
            <div className="news-card__details-wrapper">
              <p className="news-card__excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur…</p>
              <a href="#" className="news-card__read-more">Read more <i className="fas fa-long-arrow-alt-right" /></a>
            </div>
          </div>
        </div> */}
        {/* <div className="news-card">
          <a href="#" className="news-card__card-link" />
          <img src="https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt className="news-card__image" />
          <div className="news-card__text-wrapper">
            <h2 className="news-card__title">Amazing Second Title that is Quite Long</h2>
            <div className="news-card__post-date">Jan 29, 2018</div>
            <div className="news-card__details-wrapper">
              <p className="news-card__excerpt">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit…</p>
              <a href="#" className="news-card__read-more">Read more <i className="fas fa-long-arrow-alt-right" /></a>
            </div>
          </div>
        </div>
        <div className="news-card">
          <a href="#" className="news-card__card-link" />
          <img src="https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt className="news-card__image" />
          <div className="news-card__text-wrapper">
            <h2 className="news-card__title">Amazing Title</h2>
            <div className="news-card__post-date">Jan 29, 2018</div>
            <div className="news-card__details-wrapper">
              <p className="news-card__excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae…</p>
              <a href="#" className="news-card__read-more">Read more <i className="fas fa-long-arrow-alt-right" /></a>
            </div>
          </div>
        </div>
        <div className="news-card">
          <a href="#" className="news-card__card-link" />
          <img src="https://images.pexels.com/photos/248486/pexels-photo-248486.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt className="news-card__image" />
          <div className="news-card__text-wrapper">
            <h2 className="news-card__title">Amazing Forth Title that is Quite Long</h2>
            <div className="news-card__post-date">Jan 29, 2018</div>
            <div className="news-card__details-wrapper">
              <p className="news-card__excerpt">Lorem ipsum dolor sit amet!</p>
              <a href="#" className="news-card__read-more">Read more <i className="fas fa-long-arrow-alt-right" /></a>
            </div>
          </div>
        </div>
        <div className="news-card">
          <a href="#" className="news-card__card-link" />
          <img src="https://images.pexels.com/photos/206660/pexels-photo-206660.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt className="news-card__image" />
          <div className="news-card__text-wrapper">
            <h2 className="news-card__title">Amazing Fifth Title</h2>
            <div className="news-card__post-date">Jan 29, 2018</div>
            <div className="news-card__details-wrapper">
              <p className="news-card__excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio…</p>
              <a href="#" className="news-card__read-more">Read more <i className="fas fa-long-arrow-alt-right" /></a>
            </div>
          </div>
        </div>
        <div className="news-card">
          <a href="#" className="news-card__card-link" />
          <img src="https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" alt className="news-card__image" />
          <div className="news-card__text-wrapper">
            <h2 className="news-card__title">Amazing 6<sup>th</sup> Title</h2>
            <div className="news-card__post-date">Jan 29, 2018</div>
            <div className="news-card__details-wrapper">
              <p className="news-card__excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia.</p>
              <a href="#" className="news-card__read-more">Read more <i className="fas fa-long-arrow-alt-right" /></a>
            </div>
          </div>
        </div> */}
      </div>

    </>
  )
}

export default Yangiliklar