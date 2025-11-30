import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Unversity = () => {
    const { t ,i18n} = useTranslation();
    const history = useHistory();
    const [unversit, setUnversit] = useState([])
    const [univerCount, setUniverCount] = useState(8);
    const refThirdDiv = React.useRef(null);
    useEffect(() => {
        axios.get(`https://backend.edugately.com/api/v1/university/?limit=${univerCount}`).then((res) => {
            setUnversit(res.data.results);
        })
    }, [])

    const fetchUniversities =()=>{
        axios.get(`https://backend.edugately.com/api/v1/university/?limit=${univerCount}`).then((res) => {
            setUnversit(res.data.results);
        })
    }

    const [unverls, setUnverls] = useState(false)

    useEffect(() => {

        if (unverls) {
            setUniverCount(1000)

        } else if (!unverls) {
            setUniverCount(8)

        }
    }, [unverls])

    React.useEffect(() => {
        if (refThirdDiv.current) {
          refThirdDiv.current.scrollIntoView({ behavior: "smooth" });
        }
      }, []);

    useEffect(() => {
        fetchUniversities()
    }, [univerCount])

    return (
        <div id={'unversity'} ref={refThirdDiv} className="container-fluid max-width px-6 oldd">
            <div className='row'>
                <div className="col-12">
                    <h1 className='section_title text-pr '>
                        {t("part28")}
                    </h1>
                </div>
            </div>
            <div className="row unversity">
                {
                    unversit?.map((item, index) => {
                        return (
                            <div key={index} className="col-6 col-md-6 col-lg-3 px-md-5 ">
                                <div className="card pointer" onClick={() => history.push(`/university/${item?.id}`)}>
                                    <div className="container_images">
                                        <img src={item?.icon} alt="" />
                                    </div>
                                    <div className="p">
                                        <p>{i18n.language == 'uz' ? item?.name_uz : i18n.language == 'ru' ? item?.name_ru :item?.name_en}</p>
                                    </div>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="332" height="185" viewBox="0 0 332 185" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M112.146 0.360352H32C14.3269 0.360352 0 14.6872 0 32.3604V152.36C0 170.033 14.3269 184.36 32 184.36H300C317.673 184.36 332 170.033 332 152.36V32.3604C332 14.6872 317.673 0.360352 300 0.360352H218.972C218.486 29.4443 194.758 52.8717 165.559 52.8717C136.359 52.8717 112.631 29.4443 112.146 0.360352Z" fill="white" />
                                    </svg> */}
                                </div>

                            </div>
                        )
                    })
                }
                <div className="col-12">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center align-items-center">
                            <button className="btn-unver" onClick={() => setUnverls(!unverls)}>
                                {t("bce")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Unversity