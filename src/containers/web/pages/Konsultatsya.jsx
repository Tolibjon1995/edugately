import axios from 'axios';
import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../../../utils/axios';
import Navbar from './Navbar2';
import { useTranslation } from 'react-i18next';

const Konsultatsya = () => {
	const { t, i18n } = useTranslation();
	const history = useHistory()
	const [fullName, setFullName] = useState('');
	const [phone, setPhone] = useState('');
	const sendToList = async (e) => {
		e.preventDefault()
		try {
			const res = await axios.post('https://backend.edugately.com/api/v1/applicant/clients/', 
			{ 
				phone: phone ,
				fullname:fullName
			})
			if (res.status === 201) {
				Swal.fire({
					icon: 'success',
					text: 'Успешно отправлено',
				}).then(() => history.push('/'))
			}
		} catch (error) {
			;
			if (error.response.status === 400) {
				const { phone_number } = error.response.data
				Swal.fire({
					icon: 'warning',
					text: phone_number[0]
				})
			}
		}
	}
	return (
		<React.Fragment>
			<div className="avtorizatsiya" style={{height: '100vh'}}>
				<div className="container log_con">
					<div className="row justify-content-center"><a className="text-pr section_title mb-2 text-center mt-3" href="/">Edugately</a></div>
					<div className="row">
						<h1 className="text-center mt-5">
						{t('p80')}
						</h1>
					</div>
					<div className="row h-100">

						<div className="col-12 col-md-6 offset-md-3 ">
							
								<div className="log_inp mt-5">
									<input id="name" onChange={e => setFullName(e.target.value)} name="fullname" type="text" className="log_inp_in" placeholder="Azizova Nafisa" /><span><svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="10.0003" cy="4.99996" r="3.33333" stroke="#8390A2" strokeWidth="1.5" />
										<path d="M16.6663 14.5834C16.6663 16.6544 16.6663 18.3334 9.99967 18.3334C3.33301 18.3334 3.33301 16.6544 3.33301 14.5834C3.33301 12.5123 6.31778 10.8334 9.99967 10.8334C13.6816 10.8334 16.6663 12.5123 16.6663 14.5834Z" stroke="#8390A2" strokeWidth="1.5" />
									</svg></span></div>
								<div className="log_inp mt-3">
									<input id="phone"
										// ref={phoneRef}

										style={{ textIndent: '11px' }}
										type="tel"
										onChange={e => setPhone(e.target.value)}
										name="phone_number"
										required
										className="log_inp_in" placeholder={`${t('qaytaaloqa2')}`} />
									<span>
										<svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M10.0376 5.31617L10.6866 6.4791C11.2723 7.52858 11.0372 8.90532 10.1147 9.8278C10.1147 9.8278 10.1147 9.8278 10.1147 9.8278C10.1146 9.82792 8.99588 10.9468 11.0245 12.9755C13.0525 15.0035 14.1714 13.8861 14.1722 13.8853C14.1722 13.8853 14.1722 13.8853 14.1722 13.8853C15.0947 12.9628 16.4714 12.7277 17.5209 13.3134L18.6838 13.9624C20.2686 14.8468 20.4557 17.0692 19.0628 18.4622C18.2258 19.2992 17.2004 19.9505 16.0669 19.9934C14.1588 20.0658 10.9183 19.5829 7.6677 16.3323C4.41713 13.0817 3.93421 9.84122 4.00655 7.93309C4.04952 6.7996 4.7008 5.77423 5.53781 4.93723C6.93076 3.54428 9.15317 3.73144 10.0376 5.31617Z" stroke="#B1B9C5" strokeWidth="1.5" strokeLinecap="round">
											</path>
										</svg>
									</span>
								</div>
								<button onClick={sendToList} className="btn btn-primary w-100 py-3 mt-5">{t('p249')}</button>
							
						</div>
					</div>
				</div>
			</div>
			{/* <div className="navPart">
				<Navbar />
			</div>
			<div className="partnyor konsultantsiya">
				<div className="konsultantsiya_main">
					<h1>Консультация</h1>
					<div className="partnyor_input">
						<p>Ваш телефон номера</p>
						<input style={{ color: "#fff" }} defaultValue="+998" type="tel" onChange={e => setPhone(e.target.value)} />
					</div>
					
					<a href="" onClick={sendToList}>Написать</a>
				</div>
			</div> */}
		</React.Fragment>
	);
}

export default Konsultatsya;