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
import { useEffect } from 'react';

const columns = [
    { id: 'number', label: '№', minWidth: 170 },
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },

];

function createData(number, name, code, population, size) {
    const density = population / size;
    return { number, name, code, population, size, density };
}

const rows = [
    createData(1, 'India', 'IN', 1324171354, 3287263),
    createData(1, 'China', 'CN', 1403500365, 9596961),
    createData(1, 'Italy', 'IT', 60483973, 301340),
    createData(1, 'United States', 'US', 327167434, 9833520),
    createData(1, 'Canada', 'CA', 37602103, 9984670),
    createData(1, 'Australia', 'AU', 25475400, 7692024),
    createData(1, 'Germany', 'DE', 83019200, 357578),
    createData(1, 'Ireland', 'IE', 4857000, 70273),
    createData(1, 'Mexico', 'MX', 126577691, 1972550),
    createData(1, 'Japan', 'JP', 126317000, 377973),
    createData(1, 'France', 'FR', 67022000, 640679),
    createData(1, 'United Kingdom', 'GB', 67545757, 242495),
    createData(1, 'Russia', 'RU', 146793744, 17098246),
    createData(1, 'Nigeria', 'NG', 200962417, 923768),
    createData(1, 'Brazil', 'BR', 210147125, 8515767),
    createData(1, 'India', 'IN', 1324171354, 3287263),
    createData(1, 'China', 'CN', 1403500365, 9596961),
    createData(1, 'Italy', 'IT', 60483973, 301340),
    createData(1, 'United States', 'US', 327167434, 9833520),
    createData(1, 'Canada', 'CA', 37602103, 9984670),
    createData(1, 'Australia', 'AU', 25475400, 7692024),
    createData(1, 'Germany', 'DE', 83019200, 357578),
    createData(1, 'Ireland', 'IE', 4857000, 70273),
    createData(1, 'Mexico', 'MX', 126577691, 1972550),
    createData(1, 'Japan', 'JP', 126317000, 377973),
    createData(1, 'France', 'FR', 67022000, 640679),
    createData(1, 'United Kingdom', 'GB', 67545757, 242495),
    createData(1, 'Russia', 'RU', 146793744, 17098246),
    createData(1, 'Nigeria', 'NG', 200962417, 923768),
    createData(1, 'Brazil', 'BR', 210147125, 8515767),
    createData(1, 'India', 'IN', 1324171354, 3287263),
    createData(1, 'China', 'CN', 1403500365, 9596961),
    createData(1, 'Italy', 'IT', 60483973, 301340),
    createData(1, 'United States', 'US', 327167434, 9833520),
    createData(1, 'Canada', 'CA', 37602103, 9984670),
    createData(1, 'Australia', 'AU', 25475400, 7692024),
    createData(1, 'Germany', 'DE', 83019200, 357578),
    createData(1, 'Ireland', 'IE', 4857000, 70273),
    createData(1, 'Mexico', 'MX', 126577691, 1972550),
    createData(1, 'Japan', 'JP', 126317000, 377973),
    createData(1, 'France', 'FR', 67022000, 640679),
    createData(1, 'United Kingdom', 'GB', 67545757, 242495),
    createData(1, 'Russia', 'RU', 146793744, 17098246),
    createData(1, 'Nigeria', 'NG', 200962417, 923768),
    createData(1, 'test', 'BR', 210147125, 8515767),
];

export default function TestTable({ students,count }) {

    const { t, i18n } = useTranslation();
    const selector = useSelector((state) => state.payload.payload.data);


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(30);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: '66vh' }}>
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
                            <TableCell>{t("p258")}</TableCell>
                            <TableCell>{t("p359")}</TableCell>
                            <TableCell>{t("p360")}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, i) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                        <TableCell align='left'>
                                            {row.id}
                                        </TableCell>
                                        <TableCell align='left' style={{ top: 57, minWidth: 200 }}>
                                            {row.first_name} {row.last_name}
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
                                        {row?.step == "university" ? (
                                            <TableCell align='left' style={{ color: "black" }}>{t("p361")}</TableCell>
                                        ) : (
                                            <TableCell align='left'
                                                style={{
                                                    color: (row?.completed && "green") || "red",
                                                }}
                                            >
                                                {(row?.completed && "Принят") || t("p613")}
                                            </TableCell>
                                        )}
                                        <TableCell align='left' style={{
                                            color:
                                                (row?.university_invoice_confirmed && "green") ||
                                                "red",
                                        }}>
                                            {(row?.university_invoice_confirmed && "Оплачен") ||
                                                t("p614")}
                                        </TableCell>
                                        <TableCell align='left' style={{ top: 57, minWidth: 150 }}>
                                            {row?.notary_sent_manager?.slice(0, 10)}
                                        </TableCell>
                                        {(selector.role == "supermanager" && (
                                            <TableCell align='left'>
                                                {row?.manager.first_name}
                                                {row?.manager.last_name}
                                            </TableCell>
                                        )) ||
                                            ""}
                                        {(selector.role == "supermanager" && (
                                            <TableCell align='left'>{row?.manager.phone_number}</TableCell>
                                        )) ||
                                            ""}
                                        
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[30, 45, 100]}
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



// <TableContainer>
// <Table style={{ width: '100%' }}>
//   <div className="asos" id="top">

//     <div className="Up_navbar">
//       <div>
//         <div className="nav-bugalter">
//           <h4>{t("p357")}</h4>
//         </div>
//       </div>
//       <div className="user_info">
//         <img src={userpic} alt="" />
//         <div>
//           <p>
//             {selector.first_name} {selector.last_name}
//           </p>
//           <p>{selector.role}</p>
//         </div>
//       </div>
//     </div>
//     <div className="SidebarUniverstitet">
//       <button onClick={handleOpen}>
//         {/* <div className="excel table_excel_btn manager-excel ">
//       <ReactHTMLTableToExcel
//         id="test-table-xls-button"
//         className="download-table-xls-button"
//         table="table_excel"
//         filename="tablexls"
//         sheet="tablexls"
//         buttonText="Excel"
//       />{" "}
//     </div> */}
//         <span>
//           <img src={Vector} className="vector" alt="Vector img" />
//           <ReactHTMLTableToExcel
//             id="test-table-xls-button"
//             className="download-table-xls-button manager-download"
//             table="table_excel"
//             filename="tablexls"
//             sheet="tablexls"
//             buttonText="Excel"
//           />
//         </span>
//       </button>

//       <div className="settSearch">
//         <div className="searchUniv">
//           <img src={search_icon} alt="" />
//           <input
//             type="text"
//             onChange={(e) => handleSearch(e)}
//             placeholder={t("p228")}
//           />
//         </div>
//         <button
//           onClick={() => {
//             setFix(!fixEnd);
//           }}
//           className="settingsUniver"
//         >
//           <img src={filterImg} className="" alt="" />
//         </button>
//       </div>
//       <div className="univerList talabalar" id="scroll_bar">
//         <table id="table_excel">
//           <thead>
//             <th>{t("p230")}</th>
//             <th>{t("p231")}</th>
//             <th>{t("p347")}</th>
//             <th>{t("p232")}</th>
//             <th>{t("part53")}</th>
//             <th>{t("p234")} </th>
//             <th> {t("p208")}</th>
//             <th>{t("p258")}</th>
//             <th>{t("p359")}</th>
//             <th>{t("p360")}</th>
//             {(selector.role == "supermanager" && <th> {t("p236")}</th>) ||
//               ""}
//             {(selector.role == "supermanager" && <th>{t("p237")}</th>) ||
//               ""}
//           </thead>
//           <tbody>
//             {loading ? (
//               <Loader
//                 type="spinner-circle"
//                 bgColor={"#FFFFFF"}
//                 color={"#FFFFFF"}
//                 size={80}
//               />
//             ) : (
//               students.map((v) => {
//                 return (
//                   <tr>
//                     <th>
//                       {v.first_name} {v.last_name}
//                     </th>
//                     <th>{v.phone_number}</th>
//                     <th>{v?.major?.faculty?.university?.name}</th>
//                     <th>{v?.faculty}</th>
//                     <th>{v?.degree}</th>
//                     {/* <th>{data?.manager}</th> */}
//                     <td>
//                       {(v?.education_type == "full_time" && t("p252")) ||
//                         (v?.education_type === "part_time" && t("p375")) ||
//                         (v?.education_type === "distance" &&
//                           t("p253")) ||
//                         (v?.education_type === "night_time" &&
//                           t("p321"))}
//                     </td>
//                     <th>{v?.major?.name}</th>
//                     {v?.step == "university" ? (
//                       <th style={{ color: "black" }}>{t("p361")}</th>
//                     ) : (
//                       <th
//                         style={{
//                           color: (v?.completed && "green") || "red",
//                         }}
//                       >
//                         {(v?.completed && "Принят") || t("p613")}
//                       </th>
//                     )}

//                     <th
//                       style={{
//                         color:
//                           (v?.university_invoice_confirmed && "green") ||
//                           "red",
//                       }}
//                     >
//                       {(v?.university_invoice_confirmed && "Оплачен") ||
//                         t("p614")}
//                     </th>
//                     <th>{v?.notary_sent_manager?.slice(0, 10)}</th>
//                     {(selector.role == "supermanager" && (
//                       <th>
//                         {v?.manager.first_name}
//                         {v?.manager.last_name}
//                       </th>
//                     )) ||
//                       ""}
//                     {(selector.role == "supermanager" && (
//                       <th>{v?.manager.phone_number}</th>
//                     )) ||
//                       ""}
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//         <TablePagination
//           rowsPerPageOptions={[20, 40, 60]}
//           component="table"
//           count={count}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </div>

//       {/* NOTES */}
//       <div className="n_glavny">
//         <h1>{t("p345")}</h1>
//         <div className="zametki">
//           <div
//             onClick={addCard}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               cursor: "pointer",
//             }}
//             className="paper"
//           >
//             <img src={plus} alt="plus" />
//           </div>
//           {items.map((data, index) => {
//             const { description, id } = data;
//             return (
//               <div onBlur={() => saveCard(id)} key={id} className="paper">
//                 <span onClick={() => deleteCard(id)}>x</span>
//                 <h1>
//                   {t("p346")} {index + 1}
//                 </h1>
//                 <textarea
//                   onChange={(e) => inputHandler(e, id)}
//                 ></textarea>
//                 {/* <p onClick={saveCard} className="saveButton">сохранит</p> */}
//               </div>
//             );
//           })}

//           {note.map((data, index) => {
//             const { id, text } = data;
//             return (
//               <div key={id} className="paper">
//                 <span onClick={() => deleteFetchedCard(id)}>x</span>
//                 <h1>
//                   {t("p346")} {index + 1}
//                 </h1>
//                 <p style={{ textAlign: "justify" }}>{text}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       {/* end Filter */}

//       <div
//         className="abitFilBox"
//         style={
//           fixEnd
//             ? { width: "100%" }
//             : { width: "0", transition: "0.5s step-end" }
//         }
//       >
//         <div className="abitFilCl" onClick={() => setFix(!fixEnd)}></div>
//         <div
//           className="FilterFix"
//           style={
//             fixEnd
//               ? { transform: "translateX(0)", transition: "0.5s" }
//               : { transform: "translateX(100%)", transition: "0.5s" }
//           }
//         >
//           <div
//             className="fixLeft"
//             onClick={() => {
//               setFix(!fixEnd);
//             }}
//           ></div>
//           <div className="FilterUniver">
//             <button
//               onClick={() => {
//                 setFix(!fixEnd);
//               }}
//               className="ab_2_close"
//             >
//               <img src={closeFilter} alt="" />
//             </button>
//             <h4>{t("p238")} </h4>
//             <p>{t("p239")}</p>
//             <div className="datapickBlock">
//               <div>
//                 <DatePicker
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   selectsStart
//                   startDate={startDate}
//                   endDate={endDate}
//                   minDate={startDate}
//                   placeholderText={t("p215")}
//                 />
//               </div>
//               <div>
//                 <DatePicker
//                   selected={endDate}
//                   onChange={(date) => setEndDate(date)}
//                   selectsEnd
//                   startDate={startDate}
//                   endDate={endDate}
//                   minDate={startDate}
//                   placeholderText={t("p216")}
//                 />
//               </div>
//             </div>
//             <FormFilter>
//               <InputDiv>
//                 <input
//                   value="false"
//                   onChange={handleRadio}
//                   type="radio"
//                   name="has_univer"
//                   id="registered"
//                 />
//                 <label htmlFor="registered">{t("p362")}</label>
//               </InputDiv>
//               <InputDiv>
//                 <input
//                   value="true"
//                   onChange={handleRadio}
//                   type="radio"
//                   name="has_univer"
//                   id="univer"
//                 />
//                 <label htmlFor="univer">{t("p363")}</label>
//               </InputDiv>
//               <div
//                 style={
//                   radio?.has_univer === "true"
//                     ? { visibility: "visible" }
//                     : { visibility: "hidden" }
//                 }
//               >
//                 <p>{t("p79")}</p>
//                 <div className="selectCountry">
//                   <select name="university" onChange={handleSelect}>
//                     {univer.map((item) => {
//                       const { id, name } = item;
//                       return <option value={id}>{name}</option>;
//                     })}
//                   </select>
//                 </div>
//                 <p>{t("p364")}</p>
//                 <div className="selectCountry">
//                   <select name="faculty" onChange={handleSelect} id="">
//                     {faculty.map((item) => {
//                       const { id, name } = item;
//                       return <option value={id}>{name}</option>;
//                     })}
//                   </select>
//                 </div>
//                 <div>
//                   <p>{t("p365")}</p>
//                   <div className="selectCountry">
//                     <select
//                       onChange={handleSelect}
//                       name="education_type"
//                       id=""
//                     >
//                       <option value="full_time">очное</option>
//                       <option value="distance">{t("p245")}</option>
//                       <option value="part_time"> {t("p320")} </option>
//                       <option value="night_time">{t("p321")}</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </FormFilter>

//             <button onClick={handleSubmit}>{t("p246")}</button>
//           </div>
//           {/* end FilterUniver */}
//         </div>
//       </div>
//     </div>
//     <a href="#top" title="Go to top" className="backTop">
//       <img src={blueStroke} alt="back to top" />
//     </a>
//   </div>
// </Table>
// </TableContainer>