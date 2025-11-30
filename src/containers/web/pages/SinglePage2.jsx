import React, { useEffect, useState } from 'react'
import Navbar2 from './Navbar2'
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useParams } from 'react-router-dom';
import Axios from '../../../utils/axios';
import down from '../../../assets/download.png'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import img1 from '../../../assets/university/Businessman generated a new great idea.png'
import Footer from '../footer/footer2';



function SinglePage2() {
    const [unverInfo, setUnverInfo] = useState({})
    const { id } = useParams();
    const [facultet, setFacultet] = useState([])

    const fetchUniversityById = async () => {
        try {
            const { data } = await axios.get(
                `https://backend.edugately.com/api/v1/university/uzbuniversity/${id}/`
            );

            setUnverInfo(data);


        } catch (error) {

        }
    };

    const getUzbFacultety = async () => {
        try {
            const { data } = await axios.get(`
            https://backend.edugately.com/api/v1/university/uzbekfaculty/?q=${id}
            `)
            setFacultet(data.results);
            console.log(facultet);
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchUniversityById();
        getUzbFacultety()
    }, [])

    return (
        <div className='bg-new-unver'>
            <Navbar2 />
            <div className="container single-univer ">
                <div className="row">
                    <div className="col-12">
                        <h1 className="title">
                        {unverInfo?.name}                        </h1>
                    </div>
                </div>
                <div className="row university-img">
                    <div className="col-12 ">
                        <div className="img-div">
                            <img src={'https://backend.edugately.com/' + unverInfo?.image} alt="university img" />
                            <div className="img-name">
                                <img src={'https://backend.edugately.com/' + unverInfo?.icon} alt="name" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row university-offer">
                    <div className="col-12">
                        <h1 className="title">What university offer?</h1>
                    </div>
                </div>
                <div className="row cards">
                    <div className="col-12 col-lg-5 parent-card">
                        <div className="card">
                            <div className="textandicon ">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={37} height={37} viewBox="0 0 37 37" fill="none">
                                        <path d="M18.5 1.5C27.8888 1.5 35.5 9.11116 35.5 18.5C35.5 27.8888 27.8888 35.5 18.5 35.5C9.11116 35.5 1.5 27.8888 1.5 18.5C1.5 9.11116 9.11116 1.5 18.5 1.5Z" stroke="url(#paint0_linear_1602_4245)" />
                                        <path d="M35.2702 18.4994C35.2702 9.23708 27.7616 1.72852 18.4994 1.72852C9.23708 1.72852 1.72852 9.23708 1.72852 18.4994C1.72852 27.7616 9.23708 35.2702 18.4994 35.2702C27.7616 35.2702 35.2702 27.7616 35.2702 18.4994Z" stroke="url(#paint1_linear_1602_4245)" strokeWidth="1.5" strokeMiterlimit={10} />
                                        <path d="M8.29102 19.2289L14.4991 25.437L28.3971 11.5391" stroke="url(#paint2_linear_1602_4245)" strokeWidth={2} strokeMiterlimit={10} />
                                        <defs>
                                            <linearGradient id="paint0_linear_1602_4245" x1="18.5" y1={36} x2="18.5" y2="0.999999" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_1602_4245" x1="18.4994" y1="35.2702" x2="18.4994" y2="1.72851" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                            <linearGradient id="paint2_linear_1602_4245" x1="18.344" y1="25.437" x2="18.344" y2="11.5391" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="text">
                                    <h5>15 faculties</h5>
                                    <p>Quis vestibulum diam vitae eget dissd.</p>
                                </div>
                            </div>
                            <div className="img-icon" style={{ background: 'linear-gradient(124deg, #FCD546 3.97%, #FF843E 86.6%)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={68} height={68} viewBox="0 0 68 68" fill="none">
                                    <path d="M25.0265 28.332H14.6376C12.8148 28.332 11.332 26.8493 11.332 25.0265V14.6376C11.332 12.8148 12.8148 11.332 14.6376 11.332H25.0265C26.8493 11.332 28.332 12.8148 28.332 14.6376V25.0265C28.332 26.8493 26.8493 28.332 25.0265 28.332ZM14.6376 14.1654C14.3769 14.1654 14.1654 14.3769 14.1654 14.6376V25.0265C14.1654 25.2871 14.3769 25.4987 14.6376 25.4987H25.0265C25.2871 25.4987 25.4987 25.2871 25.4987 25.0265V14.6376C25.4987 14.3769 25.2871 14.1654 25.0265 14.1654H14.6376Z" fill="white" />
                                    <path d="M53.3585 28.332H42.9696C41.1468 28.332 39.6641 26.8493 39.6641 25.0265V14.6376C39.6641 12.8148 41.1468 11.332 42.9696 11.332H53.3585C55.1813 11.332 56.6641 12.8148 56.6641 14.6376V25.0265C56.6641 26.8493 55.1813 28.332 53.3585 28.332ZM42.9696 14.1654C42.709 14.1654 42.4974 14.3769 42.4974 14.6376V25.0265C42.4974 25.2871 42.709 25.4987 42.9696 25.4987H53.3585C53.6192 25.4987 53.8307 25.2871 53.8307 25.0265V14.6376C53.8307 14.3769 53.6192 14.1654 53.3585 14.1654H42.9696Z" fill="white" />
                                    <path d="M25.0265 56.6641H14.6376C12.8148 56.6641 11.332 55.1813 11.332 53.3585V42.9696C11.332 41.1468 12.8148 39.6641 14.6376 39.6641H25.0265C26.8493 39.6641 28.332 41.1468 28.332 42.9696V53.3585C28.332 55.1813 26.8493 56.6641 25.0265 56.6641ZM14.6376 42.4974C14.3769 42.4974 14.1654 42.709 14.1654 42.9696V53.3585C14.1654 53.6192 14.3769 53.8307 14.6376 53.8307H25.0265C25.2871 53.8307 25.4987 53.6192 25.4987 53.3585V42.9696C25.4987 42.709 25.2871 42.4974 25.0265 42.4974H14.6376Z" fill="white" />
                                    <path d="M53.3585 56.6641H42.9696C41.1468 56.6641 39.6641 55.1813 39.6641 53.3585V42.9696C39.6641 41.1468 41.1468 39.6641 42.9696 39.6641H53.3585C55.1813 39.6641 56.6641 41.1468 56.6641 42.9696V53.3585C56.6641 55.1813 55.1813 56.6641 53.3585 56.6641ZM42.9696 42.4974C42.709 42.4974 42.4974 42.709 42.4974 42.9696V53.3585C42.4974 53.6192 42.709 53.8307 42.9696 53.8307H53.3585C53.6192 53.8307 53.8307 53.6192 53.8307 53.3585V42.9696C53.8307 42.709 53.6192 42.4974 53.3585 42.4974H42.9696Z" fill="white" />
                                    <path d="M19.832 18.4141H40.6098V21.2474H19.832V18.4141Z" fill="white" />
                                    <path d="M27.3867 46.75H48.1645V49.5833H27.3867V46.75Z" fill="white" />
                                    <path d="M46.75 19.832H49.5833V40.6098H46.75V19.832Z" fill="white" />
                                    <path d="M18.4141 27.3887H21.2474V48.1664H18.4141V27.3887Z" fill="white" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 parent-card">
                        <div className="card">
                            <div className="textandicon ">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={37} height={37} viewBox="0 0 37 37" fill="none">
                                        <path d="M18.5 1.5C27.8888 1.5 35.5 9.11116 35.5 18.5C35.5 27.8888 27.8888 35.5 18.5 35.5C9.11116 35.5 1.5 27.8888 1.5 18.5C1.5 9.11116 9.11116 1.5 18.5 1.5Z" stroke="url(#paint0_linear_1602_4245)" />
                                        <path d="M35.2702 18.4994C35.2702 9.23708 27.7616 1.72852 18.4994 1.72852C9.23708 1.72852 1.72852 9.23708 1.72852 18.4994C1.72852 27.7616 9.23708 35.2702 18.4994 35.2702C27.7616 35.2702 35.2702 27.7616 35.2702 18.4994Z" stroke="url(#paint1_linear_1602_4245)" strokeWidth="1.5" strokeMiterlimit={10} />
                                        <path d="M8.29102 19.2289L14.4991 25.437L28.3971 11.5391" stroke="url(#paint2_linear_1602_4245)" strokeWidth={2} strokeMiterlimit={10} />
                                        <defs>
                                            <linearGradient id="paint0_linear_1602_4245" x1="18.5" y1={36} x2="18.5" y2="0.999999" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_1602_4245" x1="18.4994" y1="35.2702" x2="18.4994" y2="1.72851" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                            <linearGradient id="paint2_linear_1602_4245" x1="18.344" y1="25.437" x2="18.344" y2="11.5391" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="text">
                                    <h5>New methods in Teaching</h5>
                                    <p>Quis vestibulum diam vitae eget dissd.</p>
                                </div>
                            </div>
                            <div className="img-icon" style={{ background: 'white' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={73} height={72} viewBox="0 0 73 72" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M36.5 18C29.4262 18 23.6918 23.4721 23.6918 30.2222C23.6918 34.0811 25.5634 37.5214 28.4958 39.7646C28.9921 40.1442 29.2808 40.7182 29.2808 41.3251V46H42.7877V41.9828C42.7877 41.3213 43.1304 40.7027 43.7032 40.3301C47.091 38.1268 49.3082 34.4213 49.3082 30.2222C49.3082 23.4721 43.5738 18 36.5 18ZM19.5 30.2222C19.5 21.2629 27.1112 14 36.5 14C45.8888 14 53.5 21.2629 53.5 30.2222C53.5 35.4107 50.9458 40.0295 46.9795 42.9964V48C46.9795 49.1046 46.0411 50 44.8836 50H27.1849C26.0274 50 25.089 49.1046 25.089 48V42.247C21.6592 39.2813 19.5 34.9918 19.5 30.2222Z" fill="url(#paint0_linear_1602_4252)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M36.5 31.5C37.7426 31.5 38.75 32.5074 38.75 33.75V47.25C38.75 48.4926 37.7426 49.5 36.5 49.5C35.2574 49.5 34.25 48.4926 34.25 47.25V33.75C34.25 32.5074 35.2574 31.5 36.5 31.5Z" fill="url(#paint1_linear_1602_4252)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M36.5 27C35.2574 27 34.25 28.0074 34.25 29.25C34.25 30.4926 35.2574 31.5 36.5 31.5C37.7426 31.5 38.75 30.4926 38.75 29.25C38.75 28.0074 37.7426 27 36.5 27ZM29.75 29.25C29.75 25.5221 32.7721 22.5 36.5 22.5C40.2279 22.5 43.25 25.5221 43.25 29.25C43.25 32.9779 40.2279 36 36.5 36C32.7721 36 29.75 32.9779 29.75 29.25Z" fill="url(#paint2_linear_1602_4252)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M23 60.75C23 57.0221 26.0221 54 29.75 54H43.25C46.9779 54 50 57.0221 50 60.75C50 64.4779 46.9779 67.5 43.25 67.5H29.75C26.0221 67.5 23 64.4779 23 60.75ZM29.75 58.5C28.5074 58.5 27.5 59.5074 27.5 60.75C27.5 61.9926 28.5074 63 29.75 63H43.25C44.4926 63 45.5 61.9926 45.5 60.75C45.5 59.5074 44.4926 58.5 43.25 58.5H29.75Z" fill="url(#paint3_linear_1602_4252)" />
                                    <path d="M27.5 60.75C27.5 59.5074 28.5074 58.5 29.75 58.5H43.25C44.4926 58.5 45.5 59.5074 45.5 60.75C45.5 61.9926 44.4926 63 43.25 63H29.75C28.5074 63 27.5 61.9926 27.5 60.75Z" fill="url(#paint4_linear_1602_4252)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20.75 51.75C20.75 48.0221 23.7721 45 27.5 45H45.5C49.2279 45 52.25 48.0221 52.25 51.75C52.25 55.4779 49.2279 58.5 45.5 58.5H27.5C23.7721 58.5 20.75 55.4779 20.75 51.75ZM27.5 49.5C26.2574 49.5 25.25 50.5074 25.25 51.75C25.25 52.9926 26.2574 54 27.5 54H45.5C46.7426 54 47.75 52.9926 47.75 51.75C47.75 50.5074 46.7426 49.5 45.5 49.5H27.5Z" fill="url(#paint5_linear_1602_4252)" />
                                    <path d="M25.25 51.75C25.25 50.5074 26.2574 49.5 27.5 49.5H45.5C46.7426 49.5 47.75 50.5074 47.75 51.75C47.75 52.9926 46.7426 54 45.5 54H27.5C26.2574 54 25.25 52.9926 25.25 51.75Z" fill="url(#paint6_linear_1602_4252)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_1602_4252" x1="19.5" y1={14} x2="55.4413" y2="47.9445" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#CE9FFC" />
                                            <stop offset={1} stopColor="#7367F0" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_1602_4252" x1="34.25" y1="31.5" x2="42.7206" y2="33.6176" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#CE9FFC" />
                                            <stop offset={1} stopColor="#7367F0" />
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_1602_4252" x1="29.75" y1="22.5" x2="43.25" y2={36} gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#CE9FFC" />
                                            <stop offset={1} stopColor="#7367F0" />
                                        </linearGradient>
                                        <linearGradient id="paint3_linear_1602_4252" x1={23} y1={54} x2="33.8" y2="75.6" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FEB692" />
                                            <stop offset={1} stopColor="#EA5455" />
                                        </linearGradient>
                                        <linearGradient id="paint4_linear_1602_4252" x1={23} y1={54} x2="33.8" y2="75.6" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FEB692" />
                                            <stop offset={1} stopColor="#EA5455" />
                                        </linearGradient>
                                        <linearGradient id="paint5_linear_1602_4252" x1="20.75" y1={45} x2="30.5259" y2="67.8103" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FEB692" />
                                            <stop offset={1} stopColor="#EA5455" />
                                        </linearGradient>
                                        <linearGradient id="paint6_linear_1602_4252" x1="20.75" y1={45} x2="30.5259" y2="67.8103" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#FEB692" />
                                            <stop offset={1} stopColor="#EA5455" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 parent-card">
                        <div className="card">
                            <div className="textandicon ">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={37} height={37} viewBox="0 0 37 37" fill="none">
                                        <path d="M18.5 1.5C27.8888 1.5 35.5 9.11116 35.5 18.5C35.5 27.8888 27.8888 35.5 18.5 35.5C9.11116 35.5 1.5 27.8888 1.5 18.5C1.5 9.11116 9.11116 1.5 18.5 1.5Z" stroke="url(#paint0_linear_1602_4245)" />
                                        <path d="M35.2702 18.4994C35.2702 9.23708 27.7616 1.72852 18.4994 1.72852C9.23708 1.72852 1.72852 9.23708 1.72852 18.4994C1.72852 27.7616 9.23708 35.2702 18.4994 35.2702C27.7616 35.2702 35.2702 27.7616 35.2702 18.4994Z" stroke="url(#paint1_linear_1602_4245)" strokeWidth="1.5" strokeMiterlimit={10} />
                                        <path d="M8.29102 19.2289L14.4991 25.437L28.3971 11.5391" stroke="url(#paint2_linear_1602_4245)" strokeWidth={2} strokeMiterlimit={10} />
                                        <defs>
                                            <linearGradient id="paint0_linear_1602_4245" x1="18.5" y1={36} x2="18.5" y2="0.999999" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_1602_4245" x1="18.4994" y1="35.2702" x2="18.4994" y2="1.72851" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                            <linearGradient id="paint2_linear_1602_4245" x1="18.344" y1="25.437" x2="18.344" y2="11.5391" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="text">
                                    <h5>4 programs for Masters dergre</h5>
                                    <p>Quis vestibulum diam vitae eget dissd.</p>
                                </div>
                            </div>
                            <div className="img-icon" style={{ background: 'linear-gradient(92deg, #FB6CBB 26.6%, #FF0C92 96.53%)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M9.42419 31.8195C10.1723 31.3894 11.1275 31.6472 11.5575 32.3954C12.9385 34.7976 14.9054 36.811 17.2747 38.2477C19.6441 39.6844 22.3387 40.4975 25.1073 40.6114C25.9695 40.6468 26.6397 41.3745 26.6043 42.2367C26.5688 43.0989 25.8411 43.7692 24.9789 43.7337C21.683 43.5982 18.4751 42.6302 15.6544 40.9198C12.8338 39.2095 10.4922 36.8126 8.84827 33.9528C8.4182 33.2047 8.67605 32.2495 9.42419 31.8195Z" fill="url(#paint0_linear_1602_4269)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M42.1383 16.618C41.3902 17.0481 40.435 16.7903 40.005 16.0421C38.624 13.6399 36.6571 11.6265 34.2878 10.1898C31.9184 8.75313 29.2238 7.93996 26.4553 7.82615C25.593 7.7907 24.9228 7.063 24.9583 6.20078C24.9937 5.33857 25.7214 4.66834 26.5836 4.70378C29.8795 4.83928 33.0874 5.80734 35.9081 7.51766C38.7287 9.22799 41.0703 11.6249 42.7142 14.4847C43.1443 15.2328 42.8864 16.188 42.1383 16.618Z" fill="url(#paint1_linear_1602_4269)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.5 6.25C10.7741 6.25 9.375 7.64911 9.375 9.375C9.375 11.1009 10.7741 12.5 12.5 12.5C14.2259 12.5 15.625 11.1009 15.625 9.375C15.625 7.64911 14.2259 6.25 12.5 6.25ZM6.25 9.375C6.25 5.92322 9.04822 3.125 12.5 3.125C15.9518 3.125 18.75 5.92322 18.75 9.375C18.75 12.8268 15.9518 15.625 12.5 15.625C9.04822 15.625 6.25 12.8268 6.25 9.375Z" fill="url(#paint2_linear_1602_4269)" />
                                    <path d="M9.375 9.375C9.375 7.64911 10.7741 6.25 12.5 6.25C14.2259 6.25 15.625 7.64911 15.625 9.375C15.625 11.1009 14.2259 12.5 12.5 12.5C10.7741 12.5 9.375 11.1009 9.375 9.375Z" fill="url(#paint3_linear_1602_4269)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M37.5 23.4375C35.7741 23.4375 34.375 24.8366 34.375 26.5625C34.375 28.2884 35.7741 29.6875 37.5 29.6875C39.2259 29.6875 40.625 28.2884 40.625 26.5625C40.625 24.8366 39.2259 23.4375 37.5 23.4375ZM31.25 26.5625C31.25 23.1107 34.0482 20.3125 37.5 20.3125C40.9518 20.3125 43.75 23.1107 43.75 26.5625C43.75 30.0143 40.9518 32.8125 37.5 32.8125C34.0482 32.8125 31.25 30.0143 31.25 26.5625Z" fill="url(#paint4_linear_1602_4269)" />
                                    <path d="M34.375 26.5625C34.375 24.8366 35.7741 23.4375 37.5 23.4375C39.2259 23.4375 40.625 24.8366 40.625 26.5625C40.625 28.2884 39.2259 29.6875 37.5 29.6875C35.7741 29.6875 34.375 28.2884 34.375 26.5625Z" fill="url(#paint5_linear_1602_4269)" />
                                    <path d="M3.125 28.125C3.125 28.9879 3.82456 29.6875 4.6875 29.6875H20.3125C21.1754 29.6875 21.875 28.9879 21.875 28.125V26.5625C21.875 21.3848 17.6777 17.1875 12.5 17.1875C7.32233 17.1875 3.125 21.3848 3.125 26.5625V28.125Z" fill="url(#paint6_linear_1602_4269)" />
                                    <path d="M28.125 45.3125C28.125 46.1754 28.8246 46.875 29.6875 46.875H45.3125C46.1754 46.875 46.875 46.1754 46.875 45.3125V43.75C46.875 38.5723 42.6777 34.375 37.5 34.375C32.3223 34.375 28.125 38.5723 28.125 43.75V45.3125Z" fill="url(#paint7_linear_1602_4269)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_1602_4269" x1="8.64014" y1="31.6113" x2="19.8831" y2="48.2716" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset="0.5625" stopColor="white" />
                                            <stop offset={1} stopColor="white" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_1602_4269" x1="42.9224" y1="16.8262" x2="31.6794" y2="0.165868" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="white" />
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_1602_4269" x1="6.25" y1="3.125" x2="18.75" y2="15.625" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="#F5CCCC" />
                                        </linearGradient>
                                        <linearGradient id="paint3_linear_1602_4269" x1="6.25" y1="3.125" x2="18.75" y2="15.625" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="#F5CCCC" />
                                        </linearGradient>
                                        <linearGradient id="paint4_linear_1602_4269" x1="31.25" y1="20.3125" x2="43.75" y2="32.8125" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="#F5CCCC" />
                                        </linearGradient>
                                        <linearGradient id="paint5_linear_1602_4269" x1="31.25" y1="20.3125" x2="43.75" y2="32.8125" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="#F5CCCC" />
                                        </linearGradient>
                                        <linearGradient id="paint6_linear_1602_4269" x1="3.125" y1="17.1875" x2="14.6635" y2="34.4952" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="#F5CCCC" />
                                        </linearGradient>
                                        <linearGradient id="paint7_linear_1602_4269" x1="28.125" y1="34.375" x2="39.6635" y2="51.6827" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="#F5CCCC" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-5 parent-card">
                        <div className="card">
                            <div className="textandicon ">
                                <div className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={37} height={37} viewBox="0 0 37 37" fill="none">
                                        <path d="M18.5 1.5C27.8888 1.5 35.5 9.11116 35.5 18.5C35.5 27.8888 27.8888 35.5 18.5 35.5C9.11116 35.5 1.5 27.8888 1.5 18.5C1.5 9.11116 9.11116 1.5 18.5 1.5Z" stroke="url(#paint0_linear_1602_4245)" />
                                        <path d="M35.2702 18.4994C35.2702 9.23708 27.7616 1.72852 18.4994 1.72852C9.23708 1.72852 1.72852 9.23708 1.72852 18.4994C1.72852 27.7616 9.23708 35.2702 18.4994 35.2702C27.7616 35.2702 35.2702 27.7616 35.2702 18.4994Z" stroke="url(#paint1_linear_1602_4245)" strokeWidth="1.5" strokeMiterlimit={10} />
                                        <path d="M8.29102 19.2289L14.4991 25.437L28.3971 11.5391" stroke="url(#paint2_linear_1602_4245)" strokeWidth={2} strokeMiterlimit={10} />
                                        <defs>
                                            <linearGradient id="paint0_linear_1602_4245" x1="18.5" y1={36} x2="18.5" y2="0.999999" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                            <linearGradient id="paint1_linear_1602_4245" x1="18.4994" y1="35.2702" x2="18.4994" y2="1.72851" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                            <linearGradient id="paint2_linear_1602_4245" x1="18.344" y1="25.437" x2="18.344" y2="11.5391" gradientUnits="userSpaceOnUse">
                                                <stop stopColor="#1757AE" />
                                                <stop offset={1} stopColor="#0266EF" />
                                                <stop offset={1} stopColor="#0061E7" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <div className="text">
                                    <h5>2000 hours of practising </h5>
                                    <p>Quis vestibulum diam vitae eget dissd.</p>
                                </div>
                            </div>
                            <div className="img-icon" style={{ background: 'linear-gradient(124deg, #11F843 3.97%, #FFAA79 86.6%)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={49} height={48} viewBox="0 0 49 48" fill="none">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M33.5 21C33.5 20.1716 34.1716 19.5 35 19.5H42.5C43.3284 19.5 44 20.1716 44 21V43.5C44 44.3284 43.3284 45 42.5 45H35C34.1716 45 33.5 44.3284 33.5 43.5V21ZM36.5 22.5V42H41V22.5H36.5ZM18.5 27C18.5 26.1716 19.1716 25.5 20 25.5H27.5C28.3284 25.5 29 26.1716 29 27V43.5C29 44.3284 28.3284 45 27.5 45H20C19.1716 45 18.5 44.3284 18.5 43.5V27ZM21.5 28.5V42H26V28.5H21.5ZM3.5 33C3.5 32.1716 4.17157 31.5 5 31.5H12.5C13.3284 31.5 14 32.1716 14 33V43.5C14 44.3284 13.3284 45 12.5 45H5C4.17157 45 3.5 44.3284 3.5 43.5V33ZM6.5 34.5V42H11V34.5H6.5Z" fill="url(#paint0_linear_1602_4286)" />
                                    <path d="M6.5 42V34.5H11V42H6.5Z" fill="url(#paint1_linear_1602_4286)" />
                                    <path d="M21.5 42V28.5H26V42H21.5Z" fill="url(#paint2_linear_1602_4286)" />
                                    <path d="M36.5 42V22.5H41V42H36.5Z" fill="url(#paint3_linear_1602_4286)" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M36.4998 4.5C36.4998 3.67157 37.1714 3 37.9998 3H43.9998C44.8282 3 45.4998 3.67157 45.4998 4.5V10.5C45.4998 11.3284 44.8282 12 43.9998 12C43.1714 12 42.4998 11.3284 42.4998 10.5V7.84027L31.4963 17.6211C30.9988 18.0634 30.2693 18.1248 29.7048 17.772L18.4549 10.7408L5.72825 17.8112C5.00407 18.2136 4.09087 17.9526 3.68855 17.2285C3.28623 16.5043 3.54715 15.5911 4.27132 15.1888L17.7713 7.68876C18.2485 7.42369 18.8319 7.43872 19.2948 7.728L30.3425 14.6328L40.0545 6H37.9998C37.1714 6 36.4998 5.32843 36.4998 4.5Z" fill="url(#paint4_linear_1602_4286)" />
                                    <defs>
                                        <linearGradient id="paint0_linear_1602_4286" x1="3.5" y1="19.5" x2="26.4951" y2="56.0216" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="white" />
                                        </linearGradient>
                                        <linearGradient id="paint1_linear_1602_4286" x1="3.5" y1="19.5" x2="26.4951" y2="56.0216" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="white" />
                                        </linearGradient>
                                        <linearGradient id="paint2_linear_1602_4286" x1="3.5" y1="19.5" x2="26.4951" y2="56.0216" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="white" />
                                        </linearGradient>
                                        <linearGradient id="paint3_linear_1602_4286" x1="3.5" y1="19.5" x2="26.4951" y2="56.0216" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="white" />
                                        </linearGradient>
                                        <linearGradient id="paint4_linear_1602_4286" x1="3.49951" y1={3} x2="13.002" y2="29.6067" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="white" />
                                            <stop offset={1} stopColor="white" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="row info">
                    <div className="col-12 university-info">
                        <div className="title">
                            <p>{unverInfo?.name}</p>
                        </div>
                        <div className="row bottom">
                            <div className="col-12 col-lg-7 info-text">
                                <p>{unverInfo?.description}</p>
                            </div>
                            <div className="col-12 col-lg-5 img-div">
                                <img src={img1} alt={404} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row reserveing">
                    <div className="col-12 pt-5 pb-5">
                        {/* <h1 className="title">Reserve your place now</h1> */}
                    </div>
                    <div className="data-filling">
                        {/* <div className="example-btn">
                            <button>Connection</button>
                        </div>
                        <div className="row inputs">
                            <div className="col-12 col-lg-5 input">
                                <label htmlFor="email">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                        <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#1C274C" strokeWidth="1.5" />
                                        <path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <span>Email address</span>
                                </label>
                                <input type="text" name id="email" />
                            </div>
                            <div className="col-12 col-lg-5 input">
                                <label htmlFor="email">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                        <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#1C274C" strokeWidth="1.5" />
                                        <path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <span>Email address</span>
                                </label>
                                <input type="text" name id="email" />
                            </div>
                            <div className="col-12 col-lg-5 input">
                                <label htmlFor="email">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                        <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#1C274C" strokeWidth="1.5" />
                                        <path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <span>Email address</span>
                                </label>
                                <input type="text" name id="email" />
                            </div>
                            <div className="col-12 col-lg-5 input">
                                <label htmlFor="email">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                        <path d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z" stroke="#1C274C" strokeWidth="1.5" />
                                        <path d="M6 8L8.1589 9.79908C9.99553 11.3296 10.9139 12.0949 12 12.0949C13.0861 12.0949 14.0045 11.3296 15.8411 9.79908L18 8" stroke="#1C274C" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    <span>Email address</span>
                                </label>
                                <input type="text" name id="email" />
                            </div>
                            <hr />
                        </div> */}
                        <div className="row download pt-5">
                            <div className="col-6 text">
                                <h4 >Kvotalar haqida malumotni yuklab olish:</h4>
                            </div>
                            <div className="col-6 upload-btn">
                                <a className='button-upl' download href={'https://backend.edugately.com/' + unverInfo?.excel_file}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={35} height={35} viewBox="0 0 35 35" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M17.4998 1.82422C18.1039 1.82422 18.5936 2.31391 18.5936 2.91797V11.9441L21.1014 9.43624C21.5286 9.0091 22.2211 9.0091 22.6482 9.43624C23.0754 9.86337 23.0754 10.5559 22.6482 10.983L18.2732 15.358C17.8461 15.7852 17.1536 15.7852 16.7264 15.358L12.3514 10.983C11.9243 10.5559 11.9243 9.86337 12.3514 9.43624C12.7786 9.0091 13.4711 9.0091 13.8982 9.43624L16.4061 11.9441V2.91797C16.4061 2.31391 16.8958 1.82422 17.4998 1.82422ZM23.703 2.99604C23.7621 2.39488 24.2974 1.95548 24.8986 2.01461C27.3644 2.25716 29.2652 2.82466 30.7209 4.28038C32.0258 5.58531 32.6169 7.24784 32.9002 9.35475C33.177 11.4132 33.1769 14.0514 33.1769 17.4178V17.5851C33.1769 18.0436 33.1769 18.4885 33.1762 18.9204C33.1767 18.9334 33.1769 18.9465 33.1769 18.9596C33.1769 18.9741 33.1766 18.9884 33.1761 19.0027C33.1711 21.7037 33.1369 23.8879 32.9002 25.6481C32.6169 27.755 32.0258 29.4176 30.7209 30.7225C29.416 32.0274 27.7534 32.6185 25.6465 32.9018C23.5881 33.1785 20.9499 33.1785 17.5835 33.1785H17.4162C14.0498 33.1785 11.4116 33.1785 9.35316 32.9018C7.24625 32.6185 5.58372 32.0274 4.27879 30.7225C2.97386 29.4176 2.38273 27.755 2.09947 25.6481C1.86281 23.8879 1.82854 21.7037 1.82359 19.0027C1.82303 18.9884 1.82275 18.9741 1.82275 18.9596C1.82275 18.9465 1.82299 18.9334 1.82345 18.9204C1.82275 18.4885 1.82275 18.0436 1.82275 17.5851V17.4178C1.82274 14.0513 1.82272 11.4132 2.09947 9.35475C2.38273 7.24784 2.97386 5.58531 4.27879 4.28038C5.73451 2.82466 7.63522 2.25716 10.1011 2.01461C10.7023 1.95548 11.2375 2.39488 11.2967 2.99604C11.3558 3.5972 10.9164 4.13247 10.3152 4.19161C8.04112 4.41529 6.75125 4.9015 5.82558 5.82717C4.99483 6.65792 4.51811 7.78189 4.26746 9.64623C4.01258 11.542 4.01025 14.0332 4.01025 17.5014C4.01025 17.6241 4.01026 17.7456 4.01027 17.8659H7.52522C7.59128 17.8659 7.65654 17.8658 7.72104 17.8657C8.84762 17.8646 9.73984 17.8636 10.5425 18.2328C11.3451 18.6019 11.925 19.28 12.6573 20.1361C12.6992 20.1851 12.7417 20.2347 12.7847 20.2849L13.6676 21.3149C14.5918 22.3932 14.8512 22.6599 15.1629 22.8033C15.4747 22.9467 15.846 22.9701 17.2661 22.9701H17.7335C19.1537 22.9701 19.525 22.9467 19.8367 22.8033C20.1485 22.6599 20.4079 22.3932 21.3321 21.3149L22.215 20.2849C22.258 20.2347 22.3004 20.1851 22.3424 20.1361C23.0746 19.28 23.6546 18.6019 24.4572 18.2328C25.2598 17.8636 26.1521 17.8646 27.2786 17.8657C27.3431 17.8658 27.4084 17.8659 27.4745 17.8659H30.9894C30.9894 17.7456 30.9894 17.6241 30.9894 17.5014C30.9894 14.0332 30.9871 11.542 30.7322 9.64623C30.4816 7.78189 30.0048 6.65792 29.1741 5.82717C28.2484 4.9015 26.9586 4.41529 24.6844 4.19161C24.0833 4.13247 23.6439 3.5972 23.703 2.99604ZM30.9843 20.0534H27.4745C26.0543 20.0534 25.683 20.0768 25.3713 20.2202C25.0595 20.3635 24.8001 20.6302 23.8759 21.7085L22.993 22.7386C22.95 22.7887 22.9076 22.8383 22.8656 22.8873C22.1334 23.7435 21.5534 24.4215 20.7508 24.7906C19.9482 25.1598 19.0559 25.1589 17.9294 25.1577C17.8649 25.1576 17.7996 25.1576 17.7335 25.1576H17.2661C17.2001 25.1576 17.1348 25.1576 17.0703 25.1577C15.9437 25.1589 15.0515 25.1598 14.2489 24.7906C13.4462 24.4215 12.8663 23.7435 12.134 22.8873C12.0921 22.8383 12.0497 22.7887 12.0067 22.7386L11.1238 21.7085C10.1996 20.6302 9.94015 20.3635 9.62841 20.2202C9.31667 20.0768 8.94535 20.0534 7.52522 20.0534H4.01536C4.02912 22.2448 4.07993 23.9618 4.26746 25.3566C4.51811 27.221 4.99483 28.3449 5.82558 29.1757C6.65633 30.0064 7.7803 30.4832 9.64464 30.7338C11.5404 30.9887 14.0316 30.991 17.4998 30.991C20.9681 30.991 23.4592 30.9887 25.355 30.7338C27.2194 30.4832 28.3433 30.0064 29.1741 29.1757C30.0048 28.3449 30.4816 27.221 30.7322 25.3566C30.9197 23.9618 30.9706 22.2448 30.9843 20.0534Z" fill="white" />
                                    </svg>
                                    <span> Start upload</span>
                                </a>
                            </div>
                            <div className="col-12 submit-btn">
                                {/* <button>Topshirish</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Container>
                <div className="new_unver_container">
                    <div className="new_unver_content">
                        <h2>{unverInfo?.name}</h2>
                        <img src={'https://backend.edugately.com/' + unverInfo?.image} alt="" />
                        <p>{unverInfo?.description}</p>
                        <hr className='hr' />
                        <div className="kvota">
                            <h3>Kvotalar haqida malumotni:</h3>
                            <a download href={'https://backend.edugately.com/' + unverInfo?.excel_file}>
                                Yuklab olish
                                <img className='icon' src={down} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="new_unver_kontakt">
                        <h5>Aloqa havolalari</h5>
                        <div className="kvota">
                            <div className="box">
                                <p>
                                    <PhoneIcon />
                                    Telefon nomer:
                                </p>
                                <a href={`tel:${unverInfo?.phone}`}>{unverInfo?.phone}</a>
                            </div>
                            <div className="box">
                                <p>
                                    <EmailIcon />
                                    Elektron pochta:
                                </p>
                                <a target='_blank' href={`mailto:${unverInfo?.email}?subject text`}>{unverInfo?.email}</a>
                            </div>

                        </div>
                        <div className="kvota">
                            <div className="box">
                                <p>
                                    <LanguageIcon />
                                    Veb sayt:
                                </p>
                                <a>{unverInfo?.site}</a>
                            </div>
                        </div>
                        <h5>Manzil</h5>
                        <div className="kvota">
                            <div className="box">
                                <p>
                                    <LocationOnIcon />
                                    Joylashgan manzili:
                                </p>
                                <a >{unverInfo?.location}</a>
                            </div>

                        </div>
                        <a href='/#/unverlist' className="ortga_btn">Ro'yhatga qaytish</a>
                    </div>
                </div>

            </Container>
            <Container style={{ marginTop: '' }}>

            </Container>
            <div style={{ width: '95%', margin: 'auto', marginTop: '50px' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ minWidth: 100 }}>Talim kodi</TableCell>
                                <TableCell style={{ minWidth: 300 }}>Talim yo'nalishi</TableCell>
                                <TableCell style={{ minWidth: 150 }}>Kvota budjet (o'zbek tili)</TableCell>
                                <TableCell style={{ minWidth: 150 }}>Kvota budjet (rus tili)</TableCell>
                                <TableCell style={{ minWidth: 150 }}>Kvota kontrakt (o'zbek tili)</TableCell>
                                <TableCell style={{ minWidth: 150 }}>Kvota kontrakt (rus tili)</TableCell>
                                <TableCell style={{ minWidth: 150 }}>Ta'lim darajasi</TableCell>
                                <TableCell style={{ minWidth: 150 }}>Ta'lim turi</TableCell>
                               
                                <TableCell style={{ minWidth: 200 }}>Kontrakt miqdori</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                facultet?.map((item, index) => {
                                    return (
                                        <TableRow key={index} style={{ background: '#FFF' }}>
                                            <TableCell fixed >{item?.education_code}</TableCell>
                                            <TableCell fixed >{item?.course_of_study}</TableCell>


                                            <TableCell>{item?.quota_budget_uz}</TableCell>
                                            <TableCell>{item?.quota_budget_ru}</TableCell>
                                            <TableCell>{item?.quota_contract_uz}</TableCell>
                                            <TableCell>{item?.quota_contract_ru}</TableCell>
                                            <TableCell>{item?.education_degree}</TableCell>
                                            <TableCell>{item?.education_type}</TableCell>
                                            
                                            <TableCell>{item?.education_fee} so'm</TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div> */}
            <Footer/>
        </div>
    )
}

export default SinglePage2