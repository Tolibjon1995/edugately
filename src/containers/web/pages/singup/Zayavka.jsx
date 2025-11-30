import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import arrowright from "../../../../assets/icon/arrowright.svg";
import TextField from "@material-ui/core/TextField";
import { useTranslation } from "react-i18next";
import Loader from "react-js-loader";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Axios from "../../../../utils/axios";
import Swal from "sweetalert2";
import axios from "axios";

function Zayavka() {
  const univerId = localStorage.getItem("univerId");
  const selector = useSelector((state) => state);
  const { payload } = selector?.payload;
  const { id } = payload.data;
  const userId = id;
  const history = useHistory();
  const [currentUnivercity, setCurrentUniver] = useState();
  const [newUniver, setNewUniver] = useState();
  const [univercities, setUnivercities] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [major, setMajor] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState();
  const [service, setService] = useState();
  const [educationType, setEducationType] = useState([]);
  const [selectedEdcuation, setSelectedEducation] = useState();
  const [userUniversity, setUserUniversity] = useState({
    id: "",
    name: "",
  });
  const [allFaculties, setAllFaculties] = useState([]);
  const [degreeList, setDegreeList] = useState([]);
  const [selectedDegree, setSelectedDegree] = useState();
  const [selectedMajor, setSelectedMajor] = useState();
  const [loading, setLoading] = useState(false);

  const handleUniver = (event) => {
    const { value, name } = event.target;
    setService(value);
  };

  const userUniver = async () => {
    try {
      const res = await Axios.get(`/university/${univerId}/`);
      const { status, data } = res;
      ;
      if (status == 200) {
        setUserUniversity(data);
      }
      ;
    } catch (error) {
      ;
    }
  };

  const handleDegree = (event, newValue) => {
    if (newValue) {
      const { id } = newValue;
      ;
      setSelectedDegree(id);
    }
  };

  const handleMajor = (event, newValue) => {
    if (newValue) {
      const { id } = newValue;
      setSelectedMajor(id);
    }
  };

  const handleEducation = (event, newValue) => {
    if (newValue) {
      setSelectedEducation(newValue);
    }
  };

  const handleFaculty = (event, newValue) => {
    if (newValue) {
      const { id } = newValue;
      setSelectedFaculty(id);
    }
  };

  const fetchUnivercities = async () => {
    try {
      const res = await Axios.get("/university/");
      const { status, data } = res;
      const { results } = data;
      if (status === 200) {
        setUnivercities(results);
      }
      ;
    } catch (error) {
      ;
    }
  };

  const fetchDegreeList = async () => {
    try {
      const res = await Axios.get(
        `/university/degree/?university_id=${service || univerId}`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setDegreeList(results);
      }
    } catch (error) { }
  };

  const fetchEducationType = async () => {
    try {
      const res = await Axios.get(
        `/university/education-type/?university_id=${service || univerId}`
      );
      const { status, data } = res;
      const { education_types } = data;
      if (status == 200) {
        setEducationType(education_types);
      }
      ;
    } catch (error) { }
  };

  const fetchFaculties = async () => {
    try {
      const res = await Axios.get(
        `/university/faculty/?degree=${selectedDegree}&education_type=${selectedEdcuation}&limit=1000&offset=0&university_id=${service || univerId
        }`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setFaculties(results);

        
      }
      ;
    } catch (error) {
      ;
    }
  };

  const fetchMajorList = async () => {
    try {
      const res = await Axios.get(
        `/university/major/?faculty=${selectedFaculty}&education_type=${selectedEdcuation}`
      );
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setMajor(results);
      }
    } catch (error) {
      ;
    }
  };

  const filterUniver = () => {
    const data = univercities.filter((item) =>
      item.name == service ? item.id : null
    );
    setNewUniver(data);
    ;
  };

  const fetchAllFaculties = async () => {
    try {
      const res = await Axios.get(`/university/faculty/?limit=1000&${univerId}`);
      const { status, data } = res;
      const { results } = data;
      if (status == 200) {
        setAllFaculties(results);
      }
    } catch (error) {
      ;
    }
  };
  const finalData = {
    enroll_user_id: userId,
    major_id: selectedMajor,
  };

  const currentUniver = () => {
    const data = univercities.filter((item) => item.id == +univerId);
    setCurrentUniver(data);
    ;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { t, i18n } = useTranslation();

  const postUniversity = async () => {
    localStorage.setItem("zayavka", JSON.stringify(finalData));

    try {
      const res = await Axios.post("/applicant/profile/step/", {
        step: "university_chose",
      });

      const { status } = res;
      if (status === 200) {
        try {
          const res = await Axios.post("/applicant/profile/step/", {
            step: "data_entry",
          });
          const { status } = res;
          if (status === 200) {
            try {
              const res = await Axios.post("/applicant/chosen-university/", {
                major_id: finalData.major_id,
              });
              ;
              const { status } = res;
              if (status === 201) {
                history.push("/files");
              }
            } catch (error) {
              ;
            }
          }
          ;
        } catch (error) {

          ;
          Swal.fire({
            icon: "error",
            text: "something went wrong",
          });
        }
      }
      ;
    } catch (error) {

      ;
      Swal.fire({
        icon: "error",
        text: "something went wrong",
      });
    }
  };

  useEffect(() => {
    fetchEducationType();
  }, [selectedDegree]);

  useEffect(() => filterUniver(), [service, univercities]);

  useEffect(() => {
    fetchDegreeList();
  }, [userUniversity, newUniver]);

  useEffect(() => {
    fetchMajorList();
  }, [selectedFaculty]);

  useEffect(() => {
    fetchFaculties();
  }, [selectedEdcuation, educationType]);

  useEffect(() => {
    currentUniver();
    userUniver();
    fetchUnivercities();
    fetchAllFaculties();
  }, []);


  return (
    <React.Fragment>
      <div className="navRegist">{/* <Navbar /> */}</div>
      <div className="singup_asos container">
        <div className="nav_name">
          <h1> {t("p487")}</h1>
        </div>
        <div className="up_nav">
          <NavLink to="/sign-up" className="singup_pass h2"> {t("p488")}</NavLink>
          <svg
            id="svg_pass"
            width="82"
            height="10"
            viewBox="0 0 82 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.3755.75H66.625V4.25H56.375V5.75Z"
              fill="#5C7C8A"
            />
          </svg>
          <h2> {t("p489")}</h2>
          <svg
            width="82"
            height="10"
            viewBox="0 0 82 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z"
              fill="#5C7C8A"
            />
          </svg>
          <h2> {t("p490")}</h2>
          <svg
            width="82"
            height="10"
            viewBox="0 0 82 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M82 5L74.5 0.669873V9.33013L82 5ZM0 5.75H5.125V4.25H0V5.75ZM15.375 5.75H25.625V4.25H15.375V5.75ZM35.875 5.75H46.125V4.25H35.875V5.75ZM56.375 5.75H66.625V4.25H56.375V5.75Z"
              fill="#5C7C8A"
            />
          </svg>
          <h2> {t("p491")}</h2>
        </div>
        <form onSubmit={handleSubmit} className="main_singup" >
          <h1> {t("p349")}</h1>
          <div className="form_div">
            <p>
              {" "}
              <span
                style={{
                  color: "red",
                  fontSize: "40px",
                  position: "relative",
                  top: "14px",
                }}
              >
                *
              </span>{" "}
              {t("p347")}
            </p>
            <input
              style={{ width: "600px" }}
              onChange={handleUniver}
              defaultValue={userUniversity.name}
              list="europe-countries"
              placeholder={t("p492")}
            ></input>
            <datalist id="europe-countries">
              {univercities.map((item, index) => {
                const { id, name } = item;
                return <option value={id} key={index}> {name}</option>;
              })}
            </datalist>
          </div>
          <div className="form_div">
            <p>
              {" "}
              <span
                style={{
                  color: "red",
                  fontSize: "40px",
                  position: "relative",
                  top: "14px",
                }}
              >
                *
              </span>{" "}
              {t("part53")}
            </p>
            <Autocomplete
              aria-required
              onChange={handleDegree}
              id="combo-box-demo"
              options={degreeList}
              getOptionLabel={(option) =>
                option ? option.title : "Нет данных"
              }
              style={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  placeholder={t("p492")}
                />
              )}
            />
          </div>
          <div className="form_div asas">
            <p>
              <span
                style={{
                  color: "red",
                  fontSize: "40px",
                  position: "relative",
                  top: "14px",
                }}
              >
                *
              </span>{" "}
              {t("p234")}
            </p>
            <Autocomplete
              aria-required
              onChange={handleEducation}
              id="combo-box-demo"
              options={educationType}
              getOptionLabel={(option) =>
                option == "distance" ? t("p245") : option == "part_time" ? t("p320") : option == "full_time" ? t("p319") : option == "night_time" ? t("p321") : "Нет данных"
              }
              style={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  placeholder={t("p492")}
                />
              )}
            />
          </div>
          <div className="form_div">
            <p>
              <span
                style={{
                  color: "red",
                  fontSize: "40px",
                  position: "relative",
                  top: "14px",
                }}
              >
                *
              </span>{" "}
              {t("p241")}
            </p>
            <Autocomplete
              aria-required
              onChange={handleFaculty}
              id="combo-box-demo"
              options={faculties.length > 0 ? faculties : allFaculties}
              getOptionLabel={(option) => (option ? option.name : " ")}
              style={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  placeholder={t("p492")}
                />
              )}
            />
          </div>
          <div className="form_div">
            <p>
              {" "}
              <span
                style={{
                  color: "red",
                  fontSize: "40px",
                  position: "relative",
                  top: "14px",
                }}
              >
                *
              </span>{" "}
              {t("part54")}
            </p>
            <Autocomplete
              aria-required
              onChange={handleMajor}
              id="combo-box-demo"
              options={major}
              getOptionLabel={(option) => (option ? option.name : "Нет данных")}
              style={{ width: '100%' }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  variant="outlined"
                  placeholder={t("p492")}
                />
              )}
            />
          </div>
          {/* <p>Услуга за поступление: $450</p> */}
          <button onClick={postUniversity} className="reg_btn">

            {t("p493")}

            <img src={arrowright} alt="" />
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Zayavka;
