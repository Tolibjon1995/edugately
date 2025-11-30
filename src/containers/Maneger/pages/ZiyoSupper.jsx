import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import ManegerSidebar from '../ManagerSidebar'
import userpic from "../../../assets/icon/userpic.svg";
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Axios from '../../../utils/axios';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ZiyoSupper = () => {
    const selector = useSelector((state) => state.payload.payload.data);
    const { t, i18n } = useTranslation();

    const [student, setStudent] = useState([])

    useEffect(() => {
        Axios.get(`/applicant/asiaconsult/`).then((res) => {
            setStudent(res.data.results);
            console.log(res.data.results);
        })
    }, [])

    return (
        <React.Fragment>
            <ManegerSidebar />
            <Responsive style={{ width: '100%' }}>
                <div className="up_nav n_up">
                    <div className="single_h1">
                        <h1 className="link_h1"> {t("p367")} </h1>
                        <h4>

                        </h4>
                    </div>
                    <div className="user_info">
                        <img src={userpic} alt="" />
                        <div>
                            <h1>
                                {selector?.first_name} {selector?.last_name}
                            </h1>
                            <h2>{selector?.role}</h2>
                        </div>
                    </div>
                </div>
                <Paper>
                    <TableContainer>
                        <Table style={{ width: '100%', padding: '10px' }} stickyHeader aria-label="sticky table">
                            <TableHead style={{ borderBottom: '1px solid #007aff'}}>
                                <TableRow className="tdlar">
                                <TableCell style={{padding: '10px', textAlign: 'start'}}>№</TableCell>
                                <TableCell style={{padding: '10px', textAlign: 'start'}}>{t("p230")}</TableCell>
                                <TableCell style={{padding: '10px', textAlign: 'start'}}>Davlat</TableCell>
                                <TableCell style={{padding: '10px', textAlign: 'start'}}>Tel</TableCell>
                                <TableCell style={{padding: '10px', textAlign: 'start'}}>To'lov summasi</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    student.map((item, index) => {
                                        return (
                                            <TableRow className="tdlar">
                                                <TableCell style={{padding: '10px', textAlign: 'start'}}>{index + 1}</TableCell>
                                                <TableCell style={{padding: '10px', textAlign: 'start'}}>{item.fish}</TableCell>
                                                <TableCell style={{padding: '10px', textAlign: 'start'}}>{item.davlat}</TableCell>
                                                <TableCell style={{padding: '10px', textAlign: 'start'}}>{item.mobile.phone_number}</TableCell>
                                                <TableCell style={{padding: '10px', textAlign: 'start'}}>{item.mobile.tahrir.tulov} so'm</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Responsive>

        </React.Fragment>
    )
}

export default ZiyoSupper
const Responsive = styled.div`
    .form_doc_btn {
        display: flex;
        justify-content: space-between;
        align-items: start;
    }
    @media (max-width: 768px) {
        .doc_box {
        height: auto;
        }
        .form_doc_btn {
        flex-direction: column;
        align-items: start;
        flex-wrap: wrap;
        }
        .doc_perevodi {
        display: flex;
        flex-direction: column;
        .doc_1 {
            width: 90%;
            display: flex;
            align-items: start;
        }
        }
    }
    @media (max-width: 576px) {
        .doc_box {
        height: auto;
        }
        .doc_perevodi {
        display: flex;
        flex-direction: column;
        .doc_1 {
            width: 90%;
            display: flex;
            align-items: start;
        }
        .form_doc_btn {
            width: 90%;
            display: flex;
            align-items: start;
            flex-wrap: wrap;
        }
        }
    }
    @media (max-width: 320px) {
        .doc_box {
        height: auto;
        }
        .doc_perevodi {
        display: flex;
        flex-direction: column;
        .doc_1 {
            width: 90%;
            display: flex;
            align-items: start;
            .form_doc_btn {
            flex-direction: column;
            }
        }
        .form_doc_btn {
            width: 90%;
            display: flex;
            align-items: start;
        }
        }
    }
`;