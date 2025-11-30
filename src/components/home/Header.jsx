import React from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Link, animateScroll as scroll } from "react-scroll";


const Header = () => {
    const { t } = useTranslation();
    return (
        <div className='container-fluid max-width px-6 oldd'>
            <div className='row heder'>
                <div className="col-12 col-md-6">
                    <h1 className=' text-start section_title'>
                        {t("header1")}
                    </h1>
                    <p className='text-pr'>
                        {t('header2')}
                    </p>
                    <NavLink
                        to={'login'}
                        spy={true}
                        offset={-60}
                        duration={700} 
                        className="btn-header">
                        {t('header3')}
                    </NavLink>
                </div>

                <div className="col-12 col-md-6 d-flex align-items-center justify-content-end">
                    <img className='w-100 mt-5 mt-md-0 d-none d-md-block' src={process.env.PUBLIC_URL + '/assets/header1.png'} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Header

