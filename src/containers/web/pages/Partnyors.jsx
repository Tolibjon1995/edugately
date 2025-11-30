import React, { Component, useState } from 'react';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "../../../style/css/partnyors.css"
import normal from "../../../assets/icon/normal.svg"
import Navbar from './Navbar';
import Swal from "sweetalert2";
import Axios from '../../../utils/axios';
import { useHistory } from 'react-router';
import "../../../i18n";
import { useTranslation } from 'react-i18next';
function Partnyors() {

	const { t, i18n } = useTranslation();

	const history = useHistory()
	const [partnerData, setPartnerData] = useState({
		phone_number: '',
		email: '',
		partnership_type: '',
		request_content: ''
	})
	const handleInputChange = (e) => {
		const { name, value } = e.target
		setPartnerData(state => ({ ...state, [name]: value }))
	}
	const onSubmit = async () => {
		try {
			const res = await Axios.post('/partner/partnership-request/', partnerData)
			const status = res.status
			if (status === 201) {
				Swal.fire({
					icon: 'success',
					text: `${t("okey")}`
				}).then(() => history.push('/'))
			}
			;
		} catch (error) {
		}
	}
	return (
		<React.Fragment>
			<div className="navPart">
				<Navbar />
			</div>
			<div className="partnyor">
				<h1>{t("partt1")}</h1>
				<div className="partnyor_main ">
					<div className="partnyor_left">
						<h1>{t("partt2")}</h1>
						<div className="partnyor_list"><img src={normal} alt="" />
						<p>{t("partt3")}</p></div>
						<div className="partnyor_list"><img src={normal} alt="" />
						<p>{t("partt4")}</p></div>
						<div className="partnyor_list"><img src={normal} alt="" />
						<p>{t("partt5")}</p></div>
						<div className="partnyor_list"><img src={normal} alt="" />
						<p>{t("partt6")}</p></div>
						<div className="partnyor_list"><img src={normal} alt="" />
						<p>{t("partt7")}</p></div>
						<div className="partnyor_list"><img src={normal} alt="" />
						<p>{t("partt8")}</p></div>
						<div className="partnyor_list"><img src={normal} alt="" />
						<p>{t("partt9")}</p></div>
					</div>
					<div className="partnyor_right">
						<h1>{t("formpart1")}</h1>
						<div className="partnyor_input">
							<p>{t("formpart2")}</p>
							<input onChange={handleInputChange} required type="tel" name="phone_number" />
						</div>
						<div className="partnyor_input">
							<p>{t("formpart3")}</p>
							<input onChange={handleInputChange} required type="email" name="email" />
						</div>
						<div className="partnyor_radio">
							<p>{t("formpart4")}</p>
							<FormControl component="fieldset">
								<RadioGroup onChange={handleInputChange} row aria-label="position" name="partnership_type" defaultValue="1">
									<FormControlLabel
										value="university"
										control={<Radio color="primary" />}
										label={t("formpart5")}
									/>
									<FormControlLabel
										value="partner"
										control={<Radio color="primary" />}
										label={t("formpart6")}
									/>
									<FormControlLabel
										value="center"
										control={<Radio color="primary" />}
										label={t("formpart62")}
									/>
								</RadioGroup>
							</FormControl>
						</div>
						<div className="partnyor_input">
							<p>{t("formpart7")}</p>
							<textarea required onChange={handleInputChange} name="request_content" id="" cols="51" rows="6"></textarea>
						</div>
						<a onClick={onSubmit} href="#">{t("formpart8")}</a>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default Partnyors;