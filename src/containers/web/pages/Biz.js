import React from 'react'
import Navbar from './Navbar'
import '../../../style/css/biz.css'
import { useTranslation } from 'react-i18next';
import Footer from '../footer/footer';

const Biz = () => {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Navbar />
            <div className="mainEduGate">
                <div className="biz_haqimizda">
                    <h1>{t('part24')}</h1>
                    <h2>{t('biz1')}</h2>
                    <div className="biz_card">
                        {/* <p>{t('biz2')}</p> */}
                        {/* <p>{t('biz3')}</p> */}
                        <p>{t('biz4')}</p>
                        <p>{t('biz5')}</p>
                        <p>{t('biz6')}</p>
                    </div>
                </div>
            </div>
            <Footer/>

        </>
    )
}

export default Biz