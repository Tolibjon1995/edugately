import React from 'react'
// import koreya from "./img/koreya.jpg";
// import malayziya from "./img/malayziya.jpg";
// import polsha from "./img/polsha.jpg";
// import qirgiz from "./img/qirgiz.jpg";
// import qozoq from "./img/qozoq.jpg";
// import rassiya from "./img/rassiya.jpg";
// import singapur from "./img/singapur.jpg";
// import turkiya from "./img/turkiya.jpg";
import { useTranslation } from 'react-i18next';

const CountryUnver = () => {
    const { t, i18n } = useTranslation();
    const country = [
        {
            name: t("davlat1"),
            img: 'countBg1'
        },
        {
            name: t("davlat2"),
            img: 'countBg2'
        },
        {
            name: t("davlat3"),
            img: 'countBg3'
        },
        {
            name: t("davlat4"),
            img: 'countBg4'
        },
        {
            name: t("davlat5"),
            img: 'countBg5'
        },
        {
            name: t("davlat6"),
            img: 'countBg6'
        },
        {
            name: t("davlat7"),
            img: 'countBg7'
        },
        {
            name: t("davlat8"),
            img: 'countBg8'
        }
    ]
    return (
        <div className='CountryUnver'  style={{width: '100%'}}>
            <div className="topFacultetBlock "  style={{width: '100%'}}>
                <h4>{t("part16")}</h4>
                <div className="topFacultet" style={{width: '100%'}}>
                    {country.map((a) => {
                        return (
                            <div className={`card ${a.img}`}>
                                <p className='p'>{a.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default CountryUnver