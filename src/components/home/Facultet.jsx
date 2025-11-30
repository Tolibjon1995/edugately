import React from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { Link, animateScroll as scroll } from "react-scroll";

const Facultet = () => {
    const { t } = useTranslation();
    let data = [
        {
            image: '/assets/facultet/5.png',
            
            title: t("fac1"),
            bgColor: '#6EA0FD33'
        },
        {
            image: '/assets/facultet/1.png',
            title: t("fac2"),
            bgColor: '#6EF5D833'
        },
        {
            image: '/assets/facultet/2.png',
            title: t("fac3"),
            bgColor: '#C954EF33'
        },
        {
            image: '/assets/facultet/4.png',
            title: t("fac4"),
            bgColor: '#F0ADC033'
        },
        {
            image: '/assets/facultet/3.png',
            title: t("fac5"),
            bgColor: '#6EA0FD33'
        },
        {
            image: '/assets/facultet/6.png',
            title: t("fac6"),
            bgColor: '#6EF5D833'
        },
        {
            image: '/assets/facultet/7.png',
            title: t("fac7"),
            bgColor: '#C954EF33'
        },
        {
            image: '/assets/facultet/8.png',
            title: t("fac8"),
            bgColor: '#F0ADC033'
        }
    ]
    return (
        <div className='facultet py-6 oldd'>
            <div className='container-fluid max-width px-6'>
                <div className='row carus'>
                    <div className="col-12">
                        <h1 className='text-pr section_title mb-2'>
                        {t("part16")}
                        </h1>
                        <p className='text-center'>
                            {/* Know more about us and our services. Join us and we will ensure you get a proper faculty facility. */}
                        </p>
                    </div>
                </div>
                <div className="row">
                    {
                        data?.map((item, index) => {
                            return (
                                <div key={index} className='col-6 col-md-6 col-lg-3'>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="img-cirkl" style={{ background: item.bgColor }}>
                                                <img style={{width: '176px'}} src={process.env.PUBLIC_URL + item.image} alt="" />
                                            </div>
                                            <p>
                                                {item.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="row">
                    <NavLink to={'login'} className="btn-header">
                        {t('header3')}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Facultet