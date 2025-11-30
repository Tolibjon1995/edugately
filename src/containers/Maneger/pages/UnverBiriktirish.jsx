import React,{useEffect, useState} from 'react'
import ManegerSidebar from '../ManagerSidebar'
import { useTranslation } from "react-i18next";
import '../../../style/css/unverbiriktirish.css'
import Axios from '../../../utils/axios';
import Checkbox from '@mui/material/Checkbox';

const UnverBiriktirish = () => {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([])
  const data2=[]
  useEffect(() => {
  Axios.get(`/university/`).then((res)=>{
    setData(res.data.results)
  })
  }, [])

  const handlechange =(e)=>{
    data2.push(e)
    console.log(data2)
  }
  
  return (
    <>
        <ManegerSidebar />
        <div className="unverbr">
        <h1>{t("b1")}</h1>
        <table style={{width: '100%'}}>
          <thead>
          <tr>
            <th>№</th>
            <th>Belgilash</th>
            <th>Unversitet nomi</th>
            
          </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>
              <Checkbox
              value='1'
                onChange={(e)=>handlechange(1)}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              </th>
              <th>unver 1</th>
            </tr>
            <tr>
              <th>2</th>
              <th>
              <Checkbox
              value='2'
                onChange={(e)=>handlechange(2)}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              </th>
              <th>unver 2</th>
            </tr>
            <tr>
              <th>3</th>
              <th>
              <Checkbox
              value='3'
                onChange={(e)=>handlechange(3)}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
              />
              </th>
              <th>unver 3</th>
            </tr>
          </tbody>
        </table>
        </div>
    </>
  )
}

export default UnverBiriktirish