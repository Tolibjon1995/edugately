import axios from 'axios';
import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../../../utils/axios';
import Navbar from './Navbar';

const Konsultatsya = ()=> {
     const history = useHistory()
	const [phone,setPhone] = useState('');
     const sendToList = async(e)=>{
		e.preventDefault()
		try {
			const res = await axios.post('https://backend.edugately.com/api/v1/common/phone-consultation/',{phone_number:phone})
			if(res.status === 201){
				Swal.fire({
					icon:'success',
					text:'Успешно отправлено',
				}).then(()=>history.push('/'))
			}
		} catch (error) {
			 ;
			if(error.response.status === 400){
				const {phone_number} = error.response.data
					Swal.fire({
						icon:'warning',
						text:phone_number[0]
					})
			}
		}
	}
		return ( 
			<React.Fragment>
				<div className="navPart">
					<Navbar />
				</div>
				<div className="partnyor konsultantsiya">
					<div className="konsultantsiya_main">
						<h1>Консультация</h1>
						<div className="partnyor_input">
							<p>Ваш телефон номера</p>
							<input style={{color:"#fff"}} defaultValue="+998" type="tel" onChange={e=> setPhone(e.target.value)}/>
						</div>
						{/* <div className="partnyor_input">
							<p>Ваш e-mail адрес</p>
							<input type="email" />
						</div> */}
						<a href="" onClick={sendToList}>Написать</a>
					</div>
				</div>
			</React.Fragment>
		 );
}
 
export default Konsultatsya;