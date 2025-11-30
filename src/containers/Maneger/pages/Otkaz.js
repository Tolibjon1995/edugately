import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import userpic from "../../../assets/icon/LogoAsia.jpg";
import ManegerSidebar from '../ManagerSidebar'
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Axios from '../../../utils/axios';
import { Table } from 'reactstrap';
import '../../../style/css/abiturient.css'
import { TablePagination } from '@material-ui/core';



const Otkaz = () => {
    const { t, i18n } = useTranslation();
    const selector = useSelector((state) => state.payload.payload.data);
    const [otkaz, setOtkaz] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(`/applicant/cancel-sudent/?limit=${rowsPerPage}`).then((res) => {
            setOtkaz(res.data.results);
            setCount(res.data.count);
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    const handlePageChange = async (e, newPage) => {
        setPage(newPage);
        setLoading(true);
        try {
            const res = await Axios.get(
                `/applicant/cancel-sudent/?limit=${rowsPerPage}&offset=${newPage * rowsPerPage
                }`
            );
            const { status, data } = res;
            if (status == 200) {
                setOtkaz(res.data.results);
                setCount(res.data.count);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        Axios.get(`/applicant/cancel-sudent/?limit=${rowsPerPage}`).then((res) => {
            setOtkaz(res.data.results);
            setCount(res.data.count);
        }).catch((err) => {
            console.log(err);
        })

    }, [rowsPerPage]);

    return (
        <>
            <ManegerSidebar />
            <div className="asos " style={{ background: '#FFF' }}>
                <div className="up_nav n_up">
                    <div>
                        <h1 className="link_h1">
                            {t("canseled")}
                        </h1>
                    </div>
                    <div className="user_info">
                        <img src={userpic} alt="" />
                        <div>
                            <h1>
                                {selector.first_name} {selector.last_name}
                            </h1>
                            <h2>{selector.role}</h2>
                        </div>
                    </div>
                </div>
                <div className="ab_1">
                    <div className='table' >
                        <table hover sx={{ minWidth: 650 }}>
                            <thead>
                                <tr >
                                    <th style={{ fontWeight: '900' }}>№</th>
                                    <th style={{ fontWeight: '900' }}>Id</th>
                                    <th style={{ fontWeight: '900' }}>ФИО</th>
                                    <th style={{ fontWeight: '900' }}>ТЕЛ</th>
                                    <th style={{ fontWeight: '900' }}>САБАБИ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {otkaz.map((row, index) => (
                                    <tr
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <th component="th" scope="row" style={{ fontWeight: '900' }}>
                                            {index + 1}
                                        </th>
                                        <th component="th" scope="row" style={{ fontWeight: '900' }}>
                                            {row.id}
                                        </th>
                                        <th sx={{ minWidth: 300 }} > {row.get_full_name}</th>
                                        <th sx={{ minWidth: 200 }} > {row.user.phone_number}</th>
                                        <th style={{ color: 'red', background: 'transparent' }}>{row.reason_for_cancelling}</th>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <TablePagination
                            rowsPerPageOptions={[20, 40, 60]}
                            component="table"
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Otkaz