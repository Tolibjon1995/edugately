// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { IMaskInput } from 'react-imask';
// import NumberFormat from 'react-number-format';
// import Box from '@mui/material/Box';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import { useTranslation } from 'react-i18next';

// const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
//     const { onChange, ...other } = props;
//     return (
//         <IMaskInput
//             {...other}
//             mask="#000 00 000 00 00"
//             definitions={{
//                 '#': /[1-9,+]/,
//             }}
//             inputRef={ref}
//             onAccept={(value) => onChange({ target: { name: props.name, value } })}
//             overwrite
//         />
//     );
// });

// TextMaskCustom.propTypes = {
//     name: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
// };

// const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
//     const { onChange, ...other } = props;

//     return (
//         <NumberFormat
//             {...other}
//             getInputRef={ref}
//             onValueChange={(values) => {
//                 onChange({
//                     target: {
//                         name: props.name,
//                         value: values.value,
//                     },
//                 });
//             }}
//             thousandSeparator
//             isNumericString
//             prefix="$"
//         />
//     );
// });

// NumberFormatCustom.propTypes = {
//     name: PropTypes.string.isRequired,
//     onChange: PropTypes.func.isRequired,
// };

// export default function Tel({handlecheck}) {
//     const { t, i18n } = useTranslation();
//     const [values, setValues] = React.useState({
//         textmask: '+998',
//     });

//     const handleChange = (event) => {
//         setValues({
//             ...values,
//             [event.target.name]: event.target.value,
//         });
//     };

//     const callMe = async () => {
//         try {
//             const data = await axios.post("https://backend.edugately.com/api/v1/common/phone-consultation/", {
//                 phone_number: values,
//                 // write_to_telegram: write,
//             });
//             if (data.status === 201) {

//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Muvofoqiyatli yuborildi',
//                 })

//             } else {

//             }
//         } catch (error) {
//             if (error.response.status === 400) {
//                 const phone_number = error?.response?.data?.phone_number

//                 Swal.fire({
//                     icon: 'warning',
//                     text: phone_number[0],

//                 });
//             }
//         }
//     };

//     return (
//         <div className="top">
//             <div>

//             <Box
//             sx={{
//                 '& > :not(style)': {
//                     m: 1,
//                 },
//             }}
//         >
//                 <Input
//                     type='text'
//                     value={values.textmask}
//                     onChange={handleChange}
//                     name="textmask"
//                     id="formatted-text-mask-input"
//                     inputComponent={TextMaskCustom}
//                 />
            
//         </Box>
//                 <label className="custom-checkbox">
//                     <input type="checkbox" onClick={handlecheck} name="" id="" />
//                     <span></span>
//                     <p>{t("part44")}</p>
//                 </label>
//                 <button onClick={callMe}>{t("part32")}</button>
//             </div>
//         </div>

//     );
// }
