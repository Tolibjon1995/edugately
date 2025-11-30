import axios from 'axios';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import InputMask from "react-input-mask";
import Swal from 'sweetalert2';

const CallMe = () => {
    const [phone, setPhone] = useState("");
    const { t } = useTranslation();

    const callMe = async () => {
        let tels = phone.slice(0, 4) + phone.slice(6, 8) + phone.slice(10, 13) + phone.slice(14, 16) + phone.slice(17, 19)

        try {
            const data = await axios.post("https://backend.edugately.com/api/v1/common/phone-consultation/", {
                phone_number: tels,

            });
            if (data.status === 201) {

                Swal.fire({
                    icon: 'success',
                    title: 'Muvofoqiyatli yuborildi',
                }).then((res) => {
                    localStorage.setItem("sana", 'salom')
                })

            } else {

            }
        } catch (error) {
            if (error.response.status === 400) {
                const phone_number = error?.response?.data?.phone_number

                Swal.fire({
                    icon: 'warning',
                    text: phone_number[0],

                });
            }
        }
    };
    return (
        <div id={'callme'} className='container-fluid max-width px-6  callMe oldd'>
            <div className='row'>
                <div className="col-8 offset-2 col-md-12 offset-md-0">
                    <h1 className='text-pr section_title'>
                    {t("part31")}
                    
                    </h1>
                </div>
            </div>
            <div className="container" >
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <img className='tell' src={process.env.PUBLIC_URL + '/assets/tell.png'} alt="" />
                                </div>
                                <div className="col-12 col-md-6 d-flex align-items-center">
                                    <div className="form px-3 w-100">
                                        <InputMask
                                            mask="+\9\98 (99) 999-99-99"
                                            className="form-control w-100"
                                            placeholder="+998-123-45-67"
                                            type="text"
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                        <button onClick={callMe}>{t("p249")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CallMe