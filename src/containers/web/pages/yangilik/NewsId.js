import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import './yang.css'


const NewsId = () => {
    const selector = useSelector((state) => state);
    const lang = selector.payload?.user?.lang?.languageValue;
    const [newsId, setNewsId] = useState([])
    const params = useParams()
    useEffect(() => {
        axios.get(`https://backend.edugately.com/api/v1/company/news/${params.id}`).then((res) => {
            setNewsId(res.data);
        }).catch((err) => {

        })
    }, [])
    return (
        <>
            <div className="news-card heg">
                <a href="#" className="news-card__card-link" />
                <img src={newsId.image} alt className="news-card__image" />
                <div className="news-card__text-wrapper vhh">
                    <h2 className="news-card__title">{lang == 'uz' ? newsId.title_uz : lang  == 'ru' ? newsId.title_ru : lang == 'en' ? newsId.title_en : newsId.title_ru}</h2>
                    <div className="news-card__details-wrapper opp">
                        <p className="news-card__excerpt">{lang == 'uz' ? newsId.description_uz : lang  == 'ru' ? newsId.description_ru : lang == 'en' ? newsId.description_en : newsId.description_ru}</p>
                        <Link to="/" className="news-card__read-more">Bosh sahifa</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewsId