import React from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';

const Counter = () => {
    const { t } = useTranslation();
    useEffect(() => {

    }, [])
    
    return (
        <>
            <div className="container-fluid max-width px-6 oldd">
                <div className='row'>
                    <div className="col-12">
                        <h1 className='section_title text-pr '>
                        {t("part24")}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="counter oldd">
                <div className="container-fluid max-width px-6 ">
                    <div className="row">
                        {/* <div className="col-12 col-md-3 mb-5 mb-lg-0">
                            <h1 className='text-white text-center'>{t("part24")}</h1>
                            <p className='text-white text-center'></p>
                        </div> */}
                        <div className="col-12 col-lg-10 offset-lg-1">
                            <div className="row">
                                <div className="col-6 col-md-6 col-lg-3 info-cart mt-3 mt-lg-0">
                                    <div className="card h-100">
                                        <div className="d-flex d-md-block p-2 align-items-center">
                                        <div className="card-header border-0 d-block d-md-flex justify-content-center p-0 me-1 me-md-0">
                                            <img src={process.env.PUBLIC_URL + '/assets/Ellipse 11.png'} alt="" />
                                        </div>
                                        <div className="card-body p-1">
                                            {/* <p>More than</p> */}
                                            <h1>1000+</h1>
                                            <p>{t("counter1")}</p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-md-6 col-lg-3 info-cart mt-3 mt-lg-0">
                                    <div className="card h-100">
                                        <div className="d-flex d-md-block p-2 align-items-center">
                                        <div className="card-header border-0 d-block d-md-flex justify-content-center p-0 me-1 me-md-0">
                                            <img src={process.env.PUBLIC_URL + '/assets/Ellipse 15.png'} alt="" />
                                        </div>
                                        <div className="card-body p-1">
                                            {/* <p>More than</p> */}
                                            <h1>20+</h1>
                                            <p>{t("counter2")}</p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-md-6 col-lg-3 info-cart mt-3 mt-lg-0">
                                    <div className="card h-100">
                                        <div className="d-flex d-md-block p-2 align-items-center">
                                        <div className="card-header border-0 d-block d-md-flex justify-content-center p-0 me-1 me-md-0">
                                            <img src={process.env.PUBLIC_URL + '/assets/Ellipse 16.png'} alt="" />
                                        </div>
                                        <div className="card-body p-1">
                                            {/* <p>More than</p> */}
                                            <h1>300</h1>
                                            <p>{t("counter3")}</p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-md-6 col-lg-3 info-cart mt-3 mt-lg-0">
                                    <div className="card h-100">
                                        <div className="d-flex d-md-block p-2 align-items-center">
                                        <div className="card-header border-0 d-block d-md-flex justify-content-center p-0 me-1 me-md-0">
                                            <img src={process.env.PUBLIC_URL + '/assets/Ellipse 17.png'} alt="" />
                                        </div>
                                        <div className="card-body p-1">
                                            {/* <p>More than</p> */}
                                            <h1>20</h1>
                                            <p>{t("counter4")}</p>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Counter