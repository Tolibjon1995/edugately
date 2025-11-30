// React.useEffect(() => {
//     axios.get(`https://backend.edugately.com/api/v1/applicant/list/?manager-attached=false`).then((res)=>{
//         console.log(res.data);
//     }).catch((err)=>{
//         console.log(err);
//     })
// }, [])

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';





export default function M_doc_all_Table({ student, count }) {

    const { t, i18n } = useTranslation();
    const selector = useSelector((state) => state.payload.payload.data);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };





    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: '90vh' }}>
                <Table stickyHeader aria-label="sticky table">  
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>{t("p230")}</TableCell>
                            <TableCell>{t("p231")}</TableCell>
                            <TableCell>{t("p347")}</TableCell>
                            <TableCell>{t("p232")}</TableCell>
                            <TableCell>{t("part53")}</TableCell>
                            <TableCell>{t("p234")}</TableCell>
                            <TableCell>{t("p208")}</TableCell>
                            <TableCell>{t("p370")}</TableCell>
                            <TableCell>{t("p371")}</TableCell>
                            {(selector.role == "supermanager" && (
                                <TableCell>{t("p236")}</TableCell>
                            )) ||
                                null}
                            {(selector.role == "supermanager" && (
                                <TableCell>{t("p237")}</TableCell>
                            )) ||
                                null}
                            <TableCell>{t("p313")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {student
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                if(row.step !== "notary"){
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                        <TableCell align='left'>
                                            {row.id}
                                        </TableCell>
                                        <TableCell align='left' style={{ top: 57, minWidth: 300 }}>
                                            <Link
                                                to={`${(selector.role == "manager" &&
                                                    "/m-docs_all/") ||
                                                    "/superManager-docs_all/"
                                                    }${row.id}`}
                                            >
                                                {row.first_name} {row.last_name} {row.middle_name}
                                            </Link>
                                        </TableCell>
                                        <TableCell align='left'>
                                            {row.phone_number}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {row?.major?.faculty?.university?.name}
                                        </TableCell>
                                        <TableCell align='left' style={{ top: 57, minWidth: 250 }}>
                                            {row?.faculty}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {row?.degree}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {(row?.education_type == "full_time" && t("p252")) ||
                                                (row?.education_type === "part_time" && t("p375")) ||
                                                (row?.education_type === "distance" &&
                                                    t("p253")) ||
                                                (row?.education_type === "night_time" &&
                                                    t("p321"))}
                                        </TableCell>
                                        <TableCell align='left' style={{ top: 57, minWidth: 300 }}>
                                            {row?.major?.name}
                                        </TableCell>
                                        <TableCell align='left'>
                                            {row?.original}
                                        </TableCell>
                                        <TableCell align='left'
                                            style={{
                                                color: `${(row.step == "notary" && "green") || "red"
                                                    }`,
                                            }}
                                        >
                                            {(row.step == "notary" && t("p615")) ||
                                                t("p616")}
                                        </TableCell>
                                        <TableCell align='left'>{row?.manager_set_date?.slice(0, 10)}</TableCell>

                                    </TableRow>
                                )}
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[20, 45, 100]}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
