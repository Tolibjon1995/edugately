
import React from 'react'
import { useTranslation } from 'react-i18next'
import Footer from '../../footer/footer'
import Navbar from '../Navbar'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import './unverlist.css'


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const UnverList = () => {
    const { t, i18n } = useTranslation();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // {
    //     "Milliy Texnologik Tadqiqotlar Unversiteti “MISiS” (Rossiya)": "Andijon Davlat Pedagogika Instituti",
    //     "Almalik": "Andijon",
    //     "http://www.misis.uz/": "https://andupi.uz"
    // },
    const data = [
        {
            "№": 1,
            "nomi": "ANDIJON DAVLAT CHET TILLARI INSTITUTI",
            "joy": "Andijon",
            "tel": 998742234276,
            "sayt": "http://adchti.uz/"
        },
        {
            "№": 2,
            "nomi": "ANDIJON DAVLAT PEDAGOGIKA INSTITUTI",
            "joy": "Andijon",
            "tel": 998742240172,
            "sayt": "https://andupi.uz"
        },
        {
            "№": 3,
            "nomi": "ANDIJON DAVLAT TIBBIYOT INSTITUTI",
            "joy": "Andijon",
            "tel": 998742239460,
            "sayt": "https://adti.uz/ru/"
        },
        {
            "№": 4,
            "nomi": "ANDIJON DAVLAT UNIVERSITETI",
            "joy": "Andijon",
            "tel": 998742238814,
            "sayt": "https://adu.uz"
        },
        {
            "№": 5,
            "nomi": "ANDIJON IQTISODIYOT VA QURILISH INSTITUTI",
            "joy": "Andijon",
            "tel": 998994748747,
            "sayt": "https://eduaiqi.uz/"
        },
        {
            "№": 6,
            "nomi": "ANDIJON MASHINASOZLIK INSTITUTI",
            "joy": "Andijon",
            "tel": 998742234212,
            "sayt": "http://andmiedu.uz/"
        },
        {
            "№": 7,
            "nomi": "ANDIJON QISHLOQ XO'JALIGI VA AGROTEXNOLOGIYALAR INSTITUTI",
            "joy": "Andijon",
            "tel": 998743731363,
            "sayt": "https://andqxai.uz/"
        },
        {
            "№": 8,
            "nomi": "COLLEGIUM HUMANUM VARSHAVA MENEJMENT UNIVERSITETI ",
            "joy": "Andijon",
            "tel": 998902032000,
            "sayt": "https://collegiumhumanum.uz/"
        },
        {
            "№": 9,
            "nomi": "SHARDA UNIVERSITY (Xindiston)",
            "joy": "Andijon",
            "tel":  998954200909,
            "sayt": "https://www.shardauniversity.uz/"
        },
        {
            "№": 10,
            "nomi": "UNIVERSITY OF ECONOMICS AND PEDAGOGY",
            "joy": "Andijon",
            "tel": 998339299117,
            "sayt": "https://uniep.uz/"
        },
        {
            "№": 11,
            "nomi": "ANGREN UNIVERSITETI",
            "joy": "Angren",
            "tel": 998947226268,
            "sayt": "https://mr.auni.uz/"
        },
        {
            "№": 12,
            "nomi": "BUXORO DAVLAT TIBBIYOT INSTITUTI",
            "joy": "Buxoro",
            "tel": 998652230050,
            "sayt": "https://bsmi.uz"
        },
        {
            "№": 13,
            "nomi": "BUXORO DAVLAT UNIVERSITETI",
            "joy": "Buxoro",
            "tel": 998652212914,
            "sayt": "https://buxdu.uz"
        },
        {
            "№": 14,
            "nomi": "BUXORO DAVLAT UNIVERSITETINING PEDAGOGIKA INSTITUTI",
            "joy": "Buxoro",
            "tel": 998652261097,
            "sayt": "http://buxdupi.uz/"
        },
        {
            "№": 15,
            "nomi": "BUXORO INNOVATSION TIBBIYOT INSTITUTI",
            "joy": "Buxoro",
            "tel": 998973037007,
            "sayt": "https://biti.uz/"
        },
        {
            "№": 16,
            "nomi": "BUXORO INNOVATSIYALAR UNIVERSITETI",
            "joy": "Buxoro",
            "tel": 998956005005,
            "sayt": "http://buxiu.uz/"
        },
        {
            "№": 17,
            "nomi": "BUXORO MUHANDISLIK-TEXNOLOGIYA INSTITUTI",
            "joy": "Buxoro",
            "tel": 998652237884,
            "sayt": "https://bmti.uz"
        },
        {
            "№": 18,
            "nomi": "BUXORO PSIXOLOGIYA VA XORIJIY TILLAR INSTITUTI",
            "joy": "Buxoro",
            "tel": 998553055555,
            "sayt": "http://buxpxti.uz/"
        },
        {
            "№": 19,
            "nomi": "BUXORO TABIIY RESURSLARNI BOSHQARISH INSTITUTI",
            "joy": "Buxoro",
            "tel": 998652289424,
            "sayt": "http://tiiamebb.uz/"
        },
        {
            "№": 20,
            "nomi": "OSIYO XALQARO UNIVERSITETI",
            "joy": "Buxoro",
            "tel": 998553050009,
            "sayt": "https://oxu.uz/"
        },
        {
            "№": 21,
            "nomi": "TURON ZARMED UNIVERSITETI",
            "joy": "Buxoro",
            "tel": 998655057070,
            "sayt": "https://buxtzu.uz/"
        },
        {
            "№": 22,
            "nomi": "CHIRCHIQ DAVLAT PEDAGOGIKA UNIVERSITETI",
            "joy": "Chirchiq ",
            "tel": 998707166805,
            "sayt": "https://www.cspi.uz/uz"
        },
        {
            "№": 23,
            "nomi": "O`ZBEKISTON DAVLAT JISMONIY TARBIYA VA SPORT UNIVERSITETI ",
            "joy": "Chirchiq ",
            "tel": 998707171776,
            "sayt": "https://jtsu.uz/uz"
        },
        {
            "№": 24,
            "nomi": "DENOV TADBIRKORLIK VA PEDAGOGIKA INSTITUTI",
            "joy": "Denov",
            "tel": 998956507757,
            "sayt": "https://dtpi.uz"
        },
        {
            "№": 25,
            "nomi": "CENTRAL ASIAN MEDICAL UNIVERSITY",
            "joy": "Farg'ona",
            "tel": 998982767313,
            "sayt": "https://camuf.uz/"
        },
        {
            "№": 26,
            "nomi": "FARG`ONA DAVLAT UNIVERSITETI",
            "joy": "Farg'ona",
            "tel": 998732444402,
            "sayt": "https://fdu.uz"
        },
        {
            "№": 27,
            "nomi": "FARG`ONA JAMOAT SALOMATLIGI TIBBIYOT INSTITUTI",
            "joy": "Farg'ona",
            "tel": 998732455907,
            "sayt": "https://ttaff.uz"
        },
        {
            "№": 28,
            "nomi": "FARG`ONA POLITEXNIKA INSTITUTI",
            "joy": "Farg'ona",
            "tel": 998732411206,
            "sayt": "https://ferpi.uz"
        },
        {
            "№": 29,
            "nomi": "ISMA UNIVERSITY OF APPLIED SCIENCES ",
            "joy": "Farg'ona",
            "tel": 998985767767,
            "sayt": "https://www.ismaeu.uz/"
        },
        {
            "№": 30,
            "nomi": "KOREYA XALQARO UNIVERSITETI ",
            "joy": "Farg'ona",
            "tel": 998954019454,
            "sayt": "https://www.kiuf.uz/"
        },
        {
            "№": 31,
            "nomi": "O‘ZBEKISTON DAVLAT JISMONIY TARBIYA VA SPORT UNIVERSITETI ",
            "joy": "Farg'ona",
            "tel": 998732429431,
            "sayt": "https://uzdjtsuff.uz/"
        },
        {
            "№": 32,
            "nomi": "O‘ZBEKISTON DAVLAT SAN'AT VA MADANIYAT INSTITUTINING FARGONA MINTAQAVIY FILIALI",
            "joy": "Farg'ona",
            "tel": 998735434630,
            "sayt": "http://dsmi-qf.uz/"
        },
        {
            "№": 33,
            "nomi": "TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI",
            "joy": "Farg'ona",
            "tel": 998732268209,
            "sayt": "https://tatuff.uz/"
        },
        {
            "№": 34,
            "nomi": "VIU - VODIY INNOVATIV UNIVERSITETI - XALQARO TIBBIYOT FAKULTETI ",
            "joy": "Farg'ona",
            "tel": 998907851114,
            "sayt": "t.me/viuedu_uz"
        },
        {
            "№": 35,
            "nomi": "GULISTON DAVLAT PEDAGOGIKA INSTITUTI",
            "joy": "Guliston",
            "tel": 998672265790,
            "sayt": "https://gspi.uz/"
        },
        {
            "№": 36,
            "nomi": "GULISTON DAVLAT UNIVERSITETI",
            "joy": "Guliston",
            "tel": 998672254176,
            "sayt": "https://guldu.uz"
        },
        {
            "№": 37,
            "nomi": "UNIVERSITY OF ECONOMICS AND PEDAGOGY",
            "joy": "Guliston",
            "tel": 998900202624,
            "sayt": "https://www.youtube.com/watch?v=ZmMGE4Pm1gg"
        },
        {
            "№": 38,
            "nomi": "JIZZAX DAVLAT PEDAGOGIKA UNIVERSITETI",
            "joy": "Jizzax",
            "tel": 998722266810,
            "sayt": "https://jdpu.uz/"
        },
        {
            "№": 39,
            "nomi": "JIZZAX POLITEXNIKA INSTITUTI",
            "joy": "Jizzax",
            "tel": 998722264605,
            "sayt": "http://jizpi.uz/"
        },
        {
            "№": 40,
            "nomi": "O‘ZBEKISTON MILLIY UNIVERSITETI",
            "joy": "Jizzax",
            "tel": 998722260170,
            "sayt": "http://jbnuu.uz/"
        },
        {
            "№": 41,
            "nomi": "QOZON FEDERAL UNIVERSITETI",
            "joy": "Jizzax",
            "tel": 998722260170,
            "sayt": "https://jbnuu.uz/post/284"
        },
        {
            "№": 42,
            "nomi": "SAMBHRAM UNIVERSITY",
            "joy": "Jizzax",
            "tel": 998722215868,
            "sayt": "https://www.sambhram.uz/"
        },
        {
            "№": 43,
            "nomi": "SAMARQAND DAVLAT UNIVERSITETI ",
            "joy": "Kattaqo‘rg‘on",
            "tel": 998662391700,
            "sayt": "http://samdukf.uz/"
        },
        {
            "№": 44,
            "nomi": "XORAZM MA'MUN AKADEMIYASI",
            "joy": "Khiva",
            "tel": 998622262027,
            "sayt": "http://www.mamun.uz/"
        },
        {
            "№": 45,
            "nomi": "NAMANGAN DAVLAT CHET TILLARI INSTITUTI",
            "joy": "Namangan",
            "tel":  998694421167,
            "sayt": "https://namsifl.uz/"
        },
        {
            "№": 46,
            "nomi": "IMPULS BSR ",
            "joy": "Namangan",
            "tel": 998913516171,
            "sayt": "ЯНГИ"
        },
        {
            "№": 47,
            "nomi": "IMPULS TIBBIYOT INSTITUTI",
            "joy": "Namangan",
            "tel": 998555105015,
            "sayt": "https://www.impulsmi.uz/"
        },
        {
            "№": 48,
            "nomi": "NAMANGAN DAVLAT PEDAGOGIKA INSTITUTI",
            "joy": "Namangan",
            "tel": 998692272721,
            "sayt": "https://namspi.uz/"
        },
        {
            "№": 49,
            "nomi": "NAMANGAN DAVLAT UNIVERSITETI",
            "joy": "Namangan",
            "tel": 998692395006,
            "sayt": "https://namdu.uz/uz"
        },
        {
            "№": 50,
            "nomi": "NAMANGAN MUHANDISLIK TEXNOLOGIYA INSTITUTI",
            "joy": "Namangan",
            "tel": 998692287675,
            "sayt": "https://nammti.uz/uz/"
        },
        {
            "№": 51,
            "nomi": "NAMANGAN MUHANDISLIK - QURILISH INSTITUTI",
            "joy": "Namangan",
            "tel": 998692341430,
            "sayt": "https://nammqi.uz/"
        },
        {
            "№": 52,
            "nomi": "NAMANGAN TO‘QIMACHILIK SANOATI INSTITUTI",
            "joy": "Namangan",
            "sayt": "ЯНГИ "
        },
        {
            "№": 53,
            "nomi": "NAMXU - NAMANGAN XALQARO UNIVERSITY",
            "joy": "Namangan",
            "tel": 998959565333,
            "sayt": "https://namxu.uz/"
        },
        {
            "№": 54,
            "nomi": "UNIVERSITY OF BUSINESS AND SCIENCE",
            "joy": "Namangan",
            "tel": 998781132626,
            "sayt": "https://ubsuzbekistan.uz/"
        },
        {
            "№": 55,
            "nomi": "ТURAN INTERNATIONAL UNIVERSITY",
            "joy": "Namangan",
            "tel": 998999210055,
            "sayt": "https://tiu-edu.uz/"
        },

        {
            "№": 57,
            "nomi": "NAVOIY DAVLAT PEDAGOGIKA INSTITUTI",
            "joy": "Navoiy",
            "tel": 998792251930,
            "sayt": "http://nspi.uz/"
        },
        {
            "№": 58,
            "nomi": "NAVOIY INNOVATSIYALAR INSTITUTI",
            "joy": "Navoiy",
            "tel": 998555000043,
            "sayt": "https://niiedu.uz/"
        },
        {
            "№": 59,
            "nomi": "PROFI UNIVERSITY",
            "joy": "Navoiy",
            "tel": 998787771111,
            "sayt": "https://profiuniversity.uz/"
        },
        {
            "№": 60,
            "nomi": "NAVOIY DAVLAT KONCHILIK VA TEXNOLOGIYALAR UNIVERSITETI",
            "joy": "Navoiy",
            "tel": 998792234966,
            "sayt": "http://ndki.uz/uz"
        },
        {
            "№": 61,
            "nomi": "NUKUS DAVLAT PEDAGOGIKA INSTITUTI",
            "joy": "Nukus",
            "tel": 998612294093,
            "sayt": "https://ndpi.uz/uz/"
        },
        {
            "№": 62,
            "nomi": "NUKUS INNOVATSION INSTITUTI",
            "joy": "Nukus",
            "tel": 998992950012,
            "sayt": "https://t.me/Nukusinnovatsioninstituti_uz"
        },
        {
            "№": 63,
            "nomi": "ÓZBEKSTAN MÁMLEKETLIK DENE TÁRBIYASÍ HÁM SPORT UNIVERSITETI",
            "joy": "Nukus",
            "tel": 998612242773,
            "sayt": "https://uzdjtsunf.uz/"
        },
        {
            "№": 64,
            "nomi": "O‘ZBEKISTON DAVLAT KONSERVATORIYASI ",
            "joy": "Nukus",
            "tel": 998551020540,
            "sayt": "https://uzdknf.uz/"
        },
        {
            "№": 65,
            "nomi": "O‘ZBEKISTON DAVLAT SAN'AT VA MADANIYAT INSTITUTI ",
            "joy": "Nukus",
            "tel":  998612242902,
            "sayt": "https://uzdsmi-nf.uz/"
        },
        {
            "№": 67,
            "nomi": "QORAQALPOG‘ISTON TIBBIYOT INSTITUTI",
            "joy": "Nukus",
            "tel": 998612228407,
            "sayt": "https://kkmi.uz/"
        },
        {
            "№": 68,
            "nomi": "QORAQALPOQ DAVLAT UNIVERSITETI",
            "joy": "Nukus",
            "tel": 998612236078,
            "sayt": "https://karsu.uz/ru/"
        },
        {
            "№": 69,
            "nomi": "QORAQALPOG'ISTON QISHLOQ XO'JALIGI VA AGROTEXNOLOGIYALAR INSTITUTI",
            "joy": "Nukus",
            "tel": 998612292701,
            "sayt": "https://tdaunukus.uz/uz/"
        },
        {
            "№": 70,
            "nomi": "SAMARQAND DAVLAT VETERINARIYA MEDITSINASI, CHORVACHILIK VA BIOTEXNOLOGIYALAR UNIVERSITETI",
            "joy": "Nukus",
            "tel": 998612247109,
            "sayt": "https://sdvunf.uz/"
        },
        {
            "№": 71,
            "nomi": "TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI",
            "joy": "Nukus",
            "tel": 998612224910,
            "sayt": "https://tatunf.uz/"
        },
        {
            "№": 72,
            "nomi": "TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI",
            "joy": "Nurafshon",
            "tel": 998712386566,
            "sayt": "https://nbtuit.uz/"
        },
        {
            "№": 73,
            "nomi": "MILLIY TEXNOLOGIK TADQIQOTLAR UNVERSITETI “MISIS” (Rossiya)",
            "joy": "Olmaliq",
            "tel": 998706143413,
            "sayt": "http://www.misis.uz/"
        },
        {
            "№": 74,
            "nomi": "TOSHKENT DAVLAT TEXNIKA UNIVERSITETI ",
            "joy": "Olmaliq",
            "tel": 998706138193,
            "sayt": "http://tdtuof.uz/"
        },
        {
            "№": 75,
            "nomi": "IQTISODIYOT VA PEDAGOGIKA UNIVERSITETI",
            "joy": "Qarshi",
            "tel": 998752236060,
            "sayt": "https://ipu-edu.uz/"
        },
        {
            "№": 225,
            "nomi": "QARSHI DAVLAT UNIVERSITETINING PEDAGOGIKA INSTITUTI  ",
            "joy": "Qarshi ",
            "tel": 998955115856,
            "sayt": "https://mbaza.uz/otish-ballari/qarshi-davlat-universitetining-pedagogika-instituti-kirish-ballari/"
        },
        {
            "№": 76,
            "nomi": "QARSHI DAVLAT UNIVERSITETI",
            "joy": "Qarshi",
            "tel": 998752253413,
            "sayt": "http://www.qarshidu.uz/uz"
        },
        {
            "№": 77,
            "nomi": "QARSHI INNOVATSION TA'LIM UNIVERSITETI",
            "joy": "Qarshi",
            "tel": 998901131166,
            "sayt": "https://qitu.uz/"
        },
        {
            "№": 78,
            "nomi": "QARSHI MUHANDISLIK - IQTISODIYOT INSTITUTI",
            "joy": "Qarshi",
            "tel": 998752210923,
            "sayt": "https://qmii.uz/uz"
        },
        {
            "№": 79,
            "nomi": "TURON UNIVERSITETI",
            "joy": "Qarshi",
            "tel": 998770400025,
            "sayt": "https://www.turonuniversity.uz/"
        },
        {
            "№": 80,
            "nomi": "QARSHI XALQARO UNIVERSITETI",
            "joy": "Qarshi",
            "tel": 998555009944,
            "sayt": "https://kiu.uz/"
        },
        {
            "№": 81,
            "nomi": "TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI",
            "joy": "Qarshi",
            "tel": 998752280232,
            "sayt": "https://www.tuitkf.uz/"
        },
        {
            "№": 82,
            "nomi": "TOSHKENT IRRIGATSIYA VA QISHLOQ XO‘JALIGINI MEXANIZASIYALASH MUHANDISLARI INSTITUTI ",
            "joy": "Qarshi",
            "tel": 998752241948,
            "sayt": "https://www.tiiamekb.uz/uz"
        },
        {
            "№": 83,
            "nomi": "QISHLOQ XO‘JALIGI XALQARO UNIVERSITETI",
            "joy": "Qibray",
            "tel": 998999810919,
            "sayt": "https://iau.uz/"
        },
        {
            "№": 84,
            "nomi": "ASTRAXAN DAVLAT TEXNIKA UNIVERSITETINING  OZBEKISTON RESPUBLIKASI TOSHKENT VILOYATIDAGI FILIALI (Rossiya)",
            "joy": "Qibray",
            "tel": 998555030127,
            "sayt": "https://astutr.uz"
        },
        {
            "№": 85,
            "nomi": "TARMOQLARARO AMALIY TEXNIK KVALIFIKATSIYALAR INSTITUTI (Belarus)",
            "joy": "Qibray",
            "tel": 998951448801,
            "sayt": "https://miptk.uz"
        },
        {
            "№": 86,
            "nomi": "QO‘QON DAVLAT PEDAGOGIKA INSTITUTI",
            "joy": "Qo'qon",
            "tel": 998735423838,
            "sayt": "http://www.kspi.uz/"
        },
        {
            "№": 87,
            "nomi": "QO'QON UNIVERSITETI",
            "joy": "Qo'qon",
            "tel": 998735455555,
            "sayt": "https://kokanduni.uz"
        },
        {
            "№": 88,
            "nomi": "TOSHKENT DAVLAT TEXNIKA UNIVERSITETI ",
            "joy": "Qo'qon",
            "tel": 998735410794,
            "sayt": "https://tdtukokand.uz"
        },
        {
            "№": 89,
            "nomi": "TOSHKENT DAVLAT AGRAR UNIVERSITETI",
            "joy": "Samarqand",
            "tel": 998664928116,
            "sayt": "http://samaguni.uz/"
        },
        {
            "№": 90,
            "nomi": "IPAK YO'LI TURIZM VA MADANIY MEROS XALQARO UNIVERSITETI",
            "joy": "Samarqand",
            "tel": 998662406768,
            "sayt": "https://www.univ-silkroad.uz"
        },
        {
            "№": 91,
            "nomi": "OLIY SPORT MAHORATI INSTITUTI",
            "joy": "Samarqand",
            "sayt": "ЯНГИ"
        },
        {
            "№": 92,
            "nomi": "O'ZBEKISTON - FINLANDIYA PEDAGOGIKA INSTITUTI",
            "joy": "Samarqand",
            "tel": 998662226927,
            "sayt": "http://uzfi.uz"
        },
        {
            "№": 93,
            "nomi": "ROSSIYA DAVLAT JISMONIY TARBIYA, SPORT, YOSHLAR VA TURIZM UNIVERSITETI",
            "joy": "Samarqand",
            "tel": 998973948242,
            "sayt": "https://rgusport.uz"
        },
        {
            "№": 94,
            "nomi": "SAMARQAND DAVLAT ARXITEKTURA - QURILISH UNIVERSITETI",
            "joy": "Samarqand",
            "tel": 998662371593,
            "sayt": "https://www.samgasi.uz/"
        },
        {
            "№": 95,
            "nomi": "SAMARQAND DAVLAT CHET TILLAR INSTITUTI",
            "joy": "Samarqand",
            "tel": 998662382937,
            "sayt": "https://samdchti.uz/"
        },
        {
            "№": 96,
            "nomi": "SAMARQAND IQTISODIYOT VA SERVIS INSTITUTI",
            "joy": "Samarqand",
            "tel": 998662337368,
            "sayt": "https://sies.uz"
        },
        {
            "№": 97,
            "nomi": "SAMARQAND DAVLAT TIBBIYOT UNIVERSITETI",
            "joy": "Samarqand",
            "tel": 998662330841,
            "sayt": "https://www.sammu.uz/uz"
        },
        {
            "№": 98,
            "nomi": "SAMARQAND DAVLAT UNIVERSITETI",
            "joy": "Samarqand",
            "tel": 998662391083,
            "sayt": "http://www.samdu.uz/"
        },
        {
            "№": 99,
            "nomi": "SAMARQAND DAVLAT VETERINARIYA MEDITSINASI, CHORVACHILIK VA BIOTEXNOLOGIYALAR UNIVERSITETI",
            "joy": "Samarqand",
            "tel": 998662349873,
            "sayt": "https://samvmi.uz"
        },
        {
            "№": 100,
            "nomi": "SAMARQAND XALQARO TEXNOLOGIYA UNIVERSITETI",
            "joy": "Samarqand",
            "tel": 998557055005,
            "sayt": "https://www.siut.uz/"
        },
        {
            "№": 101,
            "nomi": "TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI",
            "joy": "Samarqand",
            "tel": 998662322929,
            "sayt": "http://samtuit.uz/uz"
        },

        {
            "№": 103,
            "nomi": "TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI ",
            "joy": "Samarqand",
            "tel": 998662373200,
            "sayt": "https://sbtsue.uz/uz"
        },

        {
            "№": 105,
            "nomi": "SHAHRISABZ DAVLAT PEDAGOGIKA INSTITUTI",
            "joy": "Shahrisabz",
            "tel": 998755224058,
            "sayt": "https://shdpi.uz/oz"
        },
        {
            "№": 106,
            "nomi": "TOSHKENT KIMYO - TEXNOLOGIYA INSTITUTI ",
            "joy": "Shahrisabz",
            "tel": 998755225068,
            "sayt": "https://stict.uz"
        },
        {
            "№": 107,
            "nomi": "TERMIZ AGROTEXNOLOGIYALAR VA INNOVATSION RIVOJLANISH INSTITUTI",
            "joy": "Termiz",
            "tel": 998763633348,
            "sayt": "https://tsautb.uz/"
        },
        {
            "№": 108,
            "nomi": "TERMIZ DAVLAT UNIVERSITETI",
            "joy": "Termiz",
            "tel": 998762280120,
            "sayt": "https://tersu.uz/"
        },
        {
            "№": 109,
            "nomi": "TERMIZ DAVLAT UNIVERSITETINING PEDAGOGIKA INSTITUTI",
            "joy": "Termiz",
            "tel": 998762280120,
            "sayt": "https://tersu.uz/struct/view/834"
        },
        {
            "№": 110,
            "nomi": "TERMIZ IQTISODIYOT VA SERVIS UNIVERSITETI",
            "joy": "Termiz",
            "tel": 998954120707,
            "sayt": "https://tisu.uz/"
        },
        {
            "№": 111,
            "nomi": "TERMIZ MUHANDISLIK - TEXNOLOGIYA INSTITUTI",
            "joy": "Termiz",
            "tel": 998762218720,
            "sayt": "https://tdtutf.uz/"
        },
        {
            "№": 112,
            "nomi": "TOSHKENT DAVLAT AGRAR UNIVERSITETI ",
            "joy": "Termiz",
            "sayt": "ЯНГИ"
        },
        {
            "№": 113,
            "nomi": "TOSHKENT DAVLAT PEDAGOGIKA UNIVERSITETI ",
            "joy": "Termiz",
            "tel": 998712024421,
            "sayt": "https://new.tdpu.uz/page/5895"
        },
        {
            "№": 114,
            "nomi": "TOSHKENT TIBBIYOT AKADEMIYASI ",
            "joy": "Termiz",
            "tel": 998554525586,
            "sayt": "https://ttatf.uz/"
        },
        {
            "№": 115,
            "nomi": "TOSHKENT DAVLAT AGRAR UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712604382,
            "sayt": "https://tdau.uz/"
        },
        {
            "№": 116,
            "nomi": "AJOU UNIVERSITETI ",
            "joy": "Toshkent",
            "tel": 998712076525,
            "sayt": "https://ajou.uz"
        },
        {
            "№": 117,
            "nomi": "AKFA UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712000522,
            "sayt": "https://www.akfauniversity.uz/"
        },
        {
            "№": 118,
            "nomi": "AL-BUXORIY UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998955012442,
            "sayt": "https://albukhari-edu.uz/"
        },
        {
            "№": 119,
            "nomi": "ALFRAGANUS UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998781227557,
            "sayt": "https://alfraganusuniversity.uz/"
        },
        {
            "№": 120,
            "nomi": "AMITI UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712079006,
            "sayt": "https://amity.uz"
        },
        {
            "№": 121,
            "nomi": "ANIQ VA IJTIMOIY FANLAR UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998951502222,
            "sayt": "https://uess.uz/"
        },
        {
            "№": 122,
            "nomi": "BELARUS - O‘ZBEKISTON QO‘SHMA TARMOQLARARO AMALIY TEXNIK KVALIFIKATSIYALAR INSTITUTI",
            "joy": "Toshkent",
            "tel": 998951448801,
            "sayt": "http://bumiptk.edu.uz/"
        },
        {
            "№": 123,
            "nomi": "BRITISH MANAGEMENT UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998955119999,
            "sayt": "https://bmu-edu.uz"
        },
        {
            "№": 124,
            "nomi": "BUCHEON UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998781504002,
            "sayt": "https://bucheon.uz/uz"
        },
        {
            "№": 125,
            "nomi": "BUTUNROSSIYA DAVLAT KINEMATOGRAFIYA INSTITUTI S.A. GERASIMOV NOMIDAGI (Rossiya)",
            "joy": "Toshkent",
            "sayt": "ЯНГИ"
        },
        {
            "№": 126,
            "nomi": "CAMBRIDGE INTERNATIONAL UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998712000306,
            "sayt": "https://cambridge.uz/"
        },
        {
            "№": 127,
            "nomi": "DIPLOMAT UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998712008818,
            "sayt": "https://diplomat.university/uz"
        },
        {
            "№": 128,
            "nomi": "EMU - EUROPEAN MEDICAL UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998781470007,
            "sayt": "https://emuni.uz/"
        },
        {
            "№": 129,
            "nomi": "FARMATSEVTIKA TEXNIK UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998958338181,
            "sayt": "https://phtu.uz/"
        },
        {
            "№": 130,
            "nomi": "FISKAL INSTITUTI - O'ZBEKISTON RESPUBLIKASI DAVLAT SOLIQ QO'MITASI HUZURIDAGI",
            "joy": "Toshkent",
            "tel": 998712301650,
            "sayt": "https://fiin.uz"
        },
        {
            "№": 131,
            "nomi": "FTTI - FARMATSEVTIKA TA'LIM VA TADQIQOT INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712020550,
            "sayt": "https://ftti.uz/"
        },
        {
            "№": 132,
            "nomi": "GEOLOGIYA FANLARI UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712097900,
            "sayt": "https://uzgeouniver.uz"
        },
        {
            "№": 133,
            "nomi": "ISFI - IJTIMOIY VA SIYOSIY FANLAR INSTITUTI",
            "joy": "Toshkent",
            "tel": " 998 99 841 60 06",
            "sayt": "https://isfi.uz/"
        },
        {
            "№": 134,
            "nomi": "INHA UNIVERSITETI (KOREYA)",
            "joy": "Toshkent",
            "tel": 998712899999,
            "sayt": "https://inha.uz"
        },
        {
            "№": 135,
            "nomi": "INNOVATSION VA IJTIMOIY - IQTISODIYOT UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998555067975,
            "sayt": "https://iiiu.uz/"
        },
        {
            "№": 136,
            "nomi": "IDU - INTERNATIONAL DIGITAL UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998712305080,
            "sayt": "http://idu.uz/"
        },
        {
            "№": 137,
            "nomi": "ISFT INSTITUTE - INTERNATIONAL SCHOOL OF FINANCE TECHNOLOGY AND SCIENCE",
            "joy": "Toshkent",
            "tel": 998781473737,
            "sayt": "https://isft.uz/"
        },
        {
            "№": 138,
            "nomi": "IQTISODIYOT VA TEXNOLOGIYALAR UNIVERSITETI (Turkiya)",
            "joy": "Toshkent",
            "tel": 998781506008,
            "sayt": "https://tobbetu.uz/"
        },
        {
            "№": 139,
            "nomi": "IT-PARK UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998555039999,
            "sayt": "https://itpu.uz/"
        },
        {
            "№": 140,
            "nomi": "JAHON IQTISODIYOTI VA DIPLOMATIYA UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712673950,
            "sayt": "https://uwed.uz/"
        },
        {
            "№": 141,
            "nomi": "JAPAN DIGITAL UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998712000595,
            "sayt": "https://www.jdu.uz/"
        },
        {
            "№": 142,
            "nomi": "MEHNAT VA IJTIMOIY MUNOSABATLAR AKADEMIYASI",
            "joy": "Toshkent",
            "tel": 998712650164,
            "sayt": "https://atso.uz/"
        },
        {
            "№": 143,
            "nomi": "MGIMO - MOSKVA DAVLAT XALQARO MUNOSABATLARI INSTITUTI  ",
            "joy": "Toshkent",
            "tel": 998712078090,
            "sayt": "https://uzb.mgimo.ru/"
        },
        {
            "№": 144,
            "nomi": "MILLIY RASSOMLIK VA DIZAYN INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712551892,
            "sayt": "http://mrdi.uz/"
        },
        {
            "№": 145,
            "nomi": "MILLIY TADQIQOT TIBBIYOT UNIVERSITETI N.I.PIROGOV NOMIDAGI (Rossiya)",
            "joy": "Toshkent",
            "tel": 998712603123,
            "sayt": "https://tashpmi.uz/uz/2021/07/pirogov-nomidagi-tibbiyot-universiteti-klinik-ordinaturaga-qabul-elon-qiladi/"
        },
        {
            "№": 146,
            "nomi": "MMFI - MILLIY TADQIQOT YADRO UNIVERSITETI (Rossiya)",
            "joy": "Toshkent",
            "tel": 998712319180,
            "sayt": "https://www.mephi.uz/"
        },
        {
            "№": 147,
            "nomi": "MOSKVA DAVLAT UNIVERSITETI M.V.LOMONOSOV NOMIDAGI ",
            "joy": "Toshkent",
            "tel": 998712335826,
            "sayt": "https://msu.uz/"
        },
        {
            "№": 148,
            "nomi": "MPEI - MOSCOW POWER ENGINEERING INSTITUTI (Rossiya)",
            "joy": "Toshkent",
            "tel": 998930065060,
            "sayt": "https://mpei.uz/"
        },
        {
            "№": 149,
            "nomi": "NORDIK XALQARO UNIVERSITY (Finlyandiya)",
            "joy": "Toshkent",
            "tel": 998712008688,
            "sayt": "http://nordicuniversity.org/"
        },
        {
            "№": 150,
            "nomi": "O'ZBEK MILLIY MUSIQA SAN'ATI INSTITUTI YUNUS RAJABIY NOMIDAGI ",
            "joy": "Toshkent",
            "tel": 998712373049,
            "sayt": "https://uzmmsi.uz/"
        },
        {
            "№": 151,
            "nomi": "JAHON TILLARI UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712301291,
            "sayt": "http://www.uzswlu.uz/"
        },
        {
            "№": 152,
            "nomi": "O‘ZBEKISTON DAVLAT KONSERVATORIYASI",
            "joy": "Toshkent",
            "tel": 998712394653,
            "sayt": "http://konservatoriya.uz/"
        },
        {
            "№": 153,
            "nomi": "O‘ZBEKISTON DAVLAT KONSERVATORIYASI HUZURIDAGI MILLIY ESTRADA SAN'ATI INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712394653,
            "sayt": "http://uzmesi.uz/"
        },

        {
            "№": 155,
            "nomi": "O‘ZBEKISTON JURNALISTIKA VA OMMAVIY KOMMUNIKATSIYALAR UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712070906,
            "sayt": "https://uzjoku.uz/"
        },
        {
            "№": 156,
            "nomi": "O‘ZBEKISTON RESPUBLIKASI HUQUQNI MUHOFAZA QILISH AKADEMIYASI",
            "joy": "Toshkent",
            "tel": 998712020496,
            "sayt": "https://proacademy.uz/"
        },
        {
            "№": 157,
            "nomi": "O’ZBEKISTON DAVLAT XOREOGRAFIYA AKADEMIYASI",
            "joy": "Toshkent",
            "tel": 998712155594,
            "sayt": "https://uzdxa.uz/"
        },
        {
            "№": 158,
            "nomi": "ORIENTAL UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998951932442,
            "sayt": "https://orientaluniversity.uz/"
        },
        {
            "№": 159,
            "nomi": "O'ZBEKISTON XALQARO ISLOM AKADEMIYASI",
            "joy": "Toshkent",
            "tel": 998712440056,
            "sayt": "https://iiau.uz/"
        },
        {
            "№": 160,
            "nomi": "OZIQ-OVQAT TEXNOLOGIYASI VA MUHANDISLIGI XALQARO INSTITUTI",
            "joy": "Toshkent",
            "sayt": "ЯНГИ"
        },
        {
            "№": 161,
            "nomi": "PERFECT UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998555000250,
            "sayt": "https://perfectuniversity.uz/"
        },
        {
            "№": 162,
            "nomi": "PISA UNIVERSITETI (Italiya)",
            "joy": "Toshkent",
            "tel": 998977594400,
            "sayt": "http://pisa.uz/ru"
        },
        {
            "№": 163,
            "nomi": "PROFI UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998787771111,
            "sayt": "https://profiuniversity.uz/"
        },
        {
            "№": 164,
            "nomi": "RAQAMLI IQTISODIYOT VA AGROTEXNOLOGIYALAR UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998788880800,
            "sayt": "https://udea.uz/"
        },
        {
            "№": 165,
            "nomi": "RENESSANS TA'LIM UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998333500005,
            "sayt": "https://renessans-edu.uz/"
        },
        {
            "№": 166,
            "nomi": "ROSSIYA DAVLAT NEFT VA GAZ UNIVERSITETI I.M.GUBKIN NOMIDAGI ",
            "joy": "Toshkent",
            "tel": 998712627091,
            "sayt": "https://gubkin.uz/"
        },
        {
            "№": 167,
            "nomi": "ROSSIYA DAVLAT PEDAGOGIKA UNIVERSITETI A.I.GERTSEN NOMIDAGI (Rossiya)",
            "joy": "Toshkent",
            "tel": 998901152877,
            "sayt": "https://www.herzen.uz/"
        },
        {
            "№": 168,
            "nomi": "ROSSIYA IQTISODIYOT UNIVERSITETI G.V.PLEXANOV NOMLI (Rossiya)",
            "joy": "Toshkent",
            "tel": 998712624350,
            "sayt": "https://reu.uz/"
        },
        {
            "№": 169,
            "nomi": "ROSSIYA KIMYO-TEXNOLOGIYA UNIVERSITETI D.I.MENDELEEV NOMIDAGI (Rossiya)",
            "joy": "Toshkent",
            "tel": 998781407408,
            "sayt": "https://muctr.uz/ru"
        },
        {
            "№": 170,
            "nomi": "ROSSIYA MILLIY TADQIQOT TIBBIYOT UNIVERSITETI N.I. PIROGOV NOMIDAGI (Rossiya)",
            "joy": "Toshkent",
            "tel": 998712623320,
            "sayt": "https://tashpmi.uz/uz/2021/07/pirogov-nomidagi-tibbiyot-universiteti-klinik-ordinaturaga-qabul-elon-qiladi/"
        },
        {
            "№": 171,
            "nomi": "SAMARQAND DAVLAT VETERINARIYA MEDITSINASI, CHORVACHILIK VA BIOTEXNOLOGIYALAR UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998662347686,
            "sayt": "https://svmitf.uz/"
        },
        {
            "№": 172,
            "nomi": "SANKT-PETERBURG DAVLAT UNIVERSITETI",
            "joy": "Toshkent",
            "sayt": "ЯНГИ"
        },
        {
            "№": 173,
            "nomi": "SINGAPUR MENEDJMENTNI RIVOJLANTIRISH INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712717702,
            "sayt": "https://www.mdis.uz/"
        },
        {
            "№": 174,
            "nomi": "STARS INTERNATIONAL UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998781291919,
            "sayt": "https://stars.university/"
        },
        {
            "№": 175,
            "nomi": "TEAM UNIVERSITY",
            "joy": "Toshkent",
            "tel": 998712002060,
            "sayt": "https://teamuni.uz/ru/"
        },
        {
            "№": 176,
            "nomi": "TIUE XALQARO UNIVERSITETI - TASHKENT INTERNATIONAL UNIVERSITY OF EDUCATION",
            "joy": "Toshkent",
            "tel": 998555122020,
            "sayt": "https://tiue.uz/"
        },
        {
            "№": 177,
            "nomi": "TMC INSTITUTE",
            "joy": "Toshkent",
            "tel": 998712070049,
            "sayt": "https://tmci.uz/"
        },
        {
            "№": 178,
            "nomi": "TOSHKENT AMALIY FANLAR UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712000540,
            "sayt": "https://utas.uz/"
        },
        {
            "№": 179,
            "nomi": "TOSHKENT ARXITEKTURA - QURILISH UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998951423595,
            "sayt": "https://taqi.uz/"
        },
        {
            "№": 180,
            "nomi": "TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712034444,
            "sayt": "https://tuit.uz/"
        },

        {
            "№": 182,
            "nomi": "TOSHKENT DAVLAT IQTISODIYOT UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712392866,
            "sayt": "https://tsue.uz/"
        },
        {
            "№": 183,
            "nomi": "TOSHKENT DAVLAT O‘ZBEK TILI VA ADABIYOTI UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712814511,
            "sayt": "https://tsuull.uz/"
        },
        {
            "№": 184,
            "nomi": "TOSHKENT DAVLAT PEDAGOGIKA UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712024421,
            "sayt": "http://new.tdpu.uz/"
        },
        {
            "№": 185,
            "nomi": "TDSHU - TOSHKENT DAVLAT SHARQSHUNOSLIK UNIVERSITETI ",
            "joy": "Toshkent",
            "tel": 998712333424,
            "sayt": "https://tsuos.uz/"
        },
        {
            "№": 186,
            "nomi": "TOSHKENT DAVLAT STOMATOLOGIYA INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712302072,
            "sayt": "https://tsdi.uz/"
        },
        {
            "№": 187,
            "nomi": "TOSHKENT DAVLAT TEXNIKA UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712464600,
            "sayt": "http://tdtu.uz/"
        },
        {
            "№": 188,
            "nomi": "TOSHKENT DAVLAT TRANSPORT UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712990001,
            "sayt": "https://tstu.uz/"
        },
        {
            "№": 189,
            "nomi": "TOSHKENT DAVLAT YURIDIK UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712334209,
            "sayt": "https://tsul.uz"
        },
        {
            "№": 190,
            "nomi": "TOSHKENT DAVLAT YURIDIK UNIVERSITETINING IXTISOSLASHTIRILGAN FILIALI",
            "joy": "Toshkent",
            "tel": 998712070378,
            "sayt": "https://sbtsul.uz"
        },
        {
            "№": 191,
            "nomi": "TOSHKENT FARMATSEVTIKA INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712563738,
            "sayt": "https://pharmi.uz"
        },
        {
            "№": 192,
            "nomi": "TOSHKENT GUMANITAR FANLAR UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998788886666,
            "sayt": "http://tgfu.uz/"
        },
        {
            "№": 193,
            "nomi": "TOSHKENT IQTISODIYOT VA TEXNOLOGIYALARI UNIVERSITETI ",
            "joy": "Toshkent",
            "tel": 998990402236,
            "sayt": "http://dtm.tivtu.uz/"
        },
        {
            "№": 194,
            "nomi": "TOSHKENT IRRIGATSIYA VA QISHLOQ XO‘JALIGINI MEXANIZATSIYALASH MUHANDISLARI INSTITUTI       MILLIY TADQIQOT UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712374668,
            "sayt": "https://tiiame.uz/"
        },
        {
            "№": 195,
            "nomi": "YEODJU TEXNIKA INSTITUTI - TOSHKENT KIMYO XALQARO UNIVERSITETI ",
            "joy": "Toshkent",
            "tel": 998781294040,
            "sayt": "http://kiut.uz/uz/"
        },
        {
            "№": 196,
            "nomi": "TOSHKENT KIMYO-TEXNOLOGIYA INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712447917,
            "sayt": "https://tkti.uz"
        },
        {
            "№": 197,
            "nomi": "TOSHKENT MENEJMENT VA IQTISODIYOT INSTITUTI",
            "joy": "Toshkent",
            "tel": 998956829000,
            "sayt": "https://timeedu.uz/uz/"
        },
        {
            "№": 198,
            "nomi": "TOSHKENT MOLIYA INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712344626,
            "sayt": "https://tfi.uz"
        },
        {
            "№": 199,
            "nomi": "TOSHKENT PEDIATRIYA TIBBIYOT INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712623320,
            "sayt": "https://tashpmi.uz"
        },
        {
            "№": 200,
            "nomi": "TOSHKENT TIBBIYOT AKADEMIYASI",
            "joy": "Toshkent",
            "tel": 998781507825,
            "sayt": "https://tma.uz/"
        },
        {
            "№": 201,
            "nomi": "TOSHKENT TO‘QIMACHILIK VA YENGIL SANOAT INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712536931,
            "sayt": "https://web.ttyesi.uz/"
        },
        {
            "№": 202,
            "nomi": "TOSHKENT XALQARO MOLIYAVIY BOSHQARUV VA TEXNOLOGIYALAR UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998781132999,
            "sayt": "https://tift.uz/"
        },
        {
            "№": 203,
            "nomi": "TURIN POLITEXNIKA UNIVERSITETI (Italiya)",
            "joy": "Toshkent",
            "tel": 998712468052,
            "sayt": "https://polito.uz"
        },
        {
            "№": 204,
            "nomi": "TURKIYANING IQTISODIYOT VA TEXNOLOGIYALAR UNIVERSITETINING ",
            "joy": "Toshkent",
            "tel": 998909151619,
            "sayt": "https://tobbetu.uz/uz"
        },
        {
            "№": 205,
            "nomi": "UNIVERSITY OF MANAGEMENT AND FUTURE TECHNOLOGIES ",
            "joy": "Toshkent",
            "tel": 998555068888,
            "sayt": "http://umft.uz/"
        },
        {
            "№": 206,
            "nomi": "UNIVERSITY OF SCIENCE AND TECHNOLOGIES (Koreya)",
            "joy": "Toshkent",
            "tel": 998712007677,
            "sayt": "http://usat.uz/"
        },
        {
            "№": 207,
            "nomi": "UNIVERSITY OF TASHKENT FOR APPLIED SCIENCES",
            "joy": "Toshkent",
            "tel": 998908320308,
            "sayt": "https://www.ismaeu.uz/"
        },
        {
            "№": 208,
            "nomi": "WEBSTER UNIVERSITETI (AQSh)",
            "joy": "Toshkent",
            "tel": 998712413300,
            "sayt": "https://webster.uz"
        },
        {
            "№": 209,
            "nomi": "WESTMINSTER XALQARO UNIVERSITETI (Buyuk Britaniya)",
            "joy": "Toshkent",
            "tel": 998712387400,
            "sayt": "http://www.wiut.uz/uzbek-content"
        },
        {
            "№": 210,
            "nomi": "YANGI ASR UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712002992,
            "sayt": "https://yangiasr.uz/"
        },
        {
            "№": 211,
            "nomi": "YANGI OʻZBEKISTON UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712024111,
            "sayt": "https://newuu.uz/"
        },
        {
            "№": 212,
            "nomi": "YAPONIYA RAQAMLI UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712000595,
            "sayt": "https://jdu.uz"
        },
        {
            "№": 213,
            "nomi": "YAPONIYA XALQARO UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712030220,
            "sayt": "https://jiuuni.uz/"
        },
        {
            "№": 214,
            "nomi": "О‘ZBEKISTON DAVLAT SAN’AT VA MADANIYAT INSTITUTI",
            "joy": "Toshkent",
            "tel": 998712302802,
            "sayt": "http://dsmi.uz/"
        },
        {
            "№": 215,
            "nomi": "О‘ZBEKISTON MILLIY UNIVERSITETI",
            "joy": "Toshkent",
            "tel": 998712465417,
            "sayt": "https://nuu.uz/"
        },
        {
            "№": 216,
            "nomi": "BINARY XALQARO UNIVERSITETI ",
            "joy": "Urganch",
            "tel": 998622261333,
            "sayt": "https://biu.uz/"
        },
        {
            "№": 217,
            "nomi": "O‘ZBEKISTON DAVLAT XOREOGRAFIYA AKADEMIYASI ",
            "joy": "Urganch",
            "tel": 998934119412,
            "sayt": "https://uzdxauf.uz/"
        },
        {
            "№": 218,
            "nomi": "TOSHKENT AXBOROT TEXNOLOGIYALARI UNIVERSITETI",
            "joy": "Urganch",
            "tel": 998622246145,
            "sayt": "https://www.ubtuit.uz/"
        },
        {
            "№": 219,
            "nomi": "TOSHKENT TIBBIYOT AKADEMIYASI ",
            "joy": "Urganch",
            "tel": 998622248484,
            "sayt": "https://urgfiltma.uz"
        },
        {
            "№": 220,
            "nomi": "URGANCH DAVLAT PEDAGOGIKA INSTITUTI",
            "joy": "Urganch",
            "tel": 998622293787,
            "sayt": "https://urspi.uz/uz"
        },
        {
            "№": 221,
            "nomi": "URGANCH DAVLAT UNIVERSITETI",
            "joy": "Urganch",
            "tel": 998622246700,
            "sayt": "https://urdu.uz/uz"
        },
        {
            "№": 222,
            "nomi": "URGANCH INNOVATSION UNIVERSITY",
            "joy": "Urganch",
            "tel": 998904362022,
            "sayt": "http://uriu.uz/"
        },
        {
            "№": 223,
            "nomi": "URGANCH RANCH TEXNOLOGIYA UNIVERSITETI",
            "joy": "Urganch",
            "tel": 998992170060,
            "sayt": "http://utu-ranch.uz/"
        },
        {
            "№": 224,
            "nomi": "SAMARQAND DAVLAT UNIVERSITETI",
            "joy": "Urgut",
            "tel": 998933582848,
            "sayt": "https://samduuf.uz/"
        },
        {
            "№": 225,
            "nomi": "TOSHKENT KIMYO - TEXNOLOGIYA INSTITUTI",
            "joy": "Yangiyer",
            "tel": 998955115856,
            "sayt": "https://tktiyf.uz"
        }
    ]

    const data2 = [
        {
            "name": "101 Percent",
            "phone": 998974542565
        },
        {
            "name": "5 с Плюсом ",
            "phone": 998903508249
        },
        {
            "name": "7th AVENUE",
            "phone": 998909516100
        },
        {
            "name": "Adam Academy",
            "phone": 998998556969
        },
        {
            "name": "Adam Consulting",
            "phone": 998712459208
        },
        {
            "name": "Akbar Education",
            "phone": 998951933193
        },
        {
            "name": "Alimax Study",
            "phone": 998712548788,
            "site": ""
        },
        {
            "name": "Alloma",
            "phone": 998712070047
        },
        {
            "name": "Almaz",
            "phone": 998998112080,
            "site": ""
        },
        {
            "name": "Ardo ",
            "phone": 998935905757
        },
        {
            "name": "Arsenal Invest",
            "phone": 998935860575
        },
        {
            "name": "Asia",
            "phone": 998990528650
        },
        {
            "name": "Asia Education Plus",
            "phone": 998712691600,
            "site": ""
        },
        {
            "name": "Atlantis",
            "phone": 998951443444
        },
        {
            "name": "BASE 33",
            "phone": 998903719777
        },
        {
            "name": "BCC Education",
            "phone": 998712522252
        },
        {
            "name": "Bizcon Education",
            "phone": 998712815956
        },
        {
            "name": "Brain Train",
            "phone": 998712334007
        },
        {
            "name": "Brixton School",
            "phone": 998972606644
        },
        {
            "name": "Buxoro Avitsenna",
            "phone": 998909245100
        },
        {
            "name": "Callan",
            "phone": 998712001030
        },
        {
            "name": "Cambridge",
            "phone": 998712001115
        },
        {
            "name": "Chance",
            "phone": 998712001009
        },
        {
            "name": "City Education",
            "phone": 998712003030
        },
        {
            "name": "Class",
            "phone": 998712577970
        },
        {
            "name": "Clever House",
            "phone": 998712670733
        },
        {
            "name": "Compas",
            "phone": 998909479766
        },
        {
            "name": "Concord Lite",
            "phone": 998712174070
        },
        {
            "name": "Creative Education",
            "phone": 998712560097
        },
        {
            "name": "Creative Learning Center",
            "phone": 998946527881
        },
        {
            "name": "D.Nur",
            "phone": 998951697977
        },
        {
            "name": "Davlat Nur",
            "phone": 998903304888
        },
        {
            "name": "Delta Education",
            "phone": 998712544453
        },
        {
            "name": "Diamond",
            "phone": 998973869797
        },
        {
            "name": "Dilbarim Servis",
            "phone": 998946082442
        },
        {
            "name": "DR Academy",
            "phone": 998998355388
        },
        {
            "name": "E`zoz-Fayz  ",
            "phone": 998712769091
        },
        {
            "name": "Easy Education ",
            "phone": 998712389268
        },
        {
            "name": "Edu Center",
            "phone": 998998987175
        },
        {
            "name": "EDU SPHERE",
            "phone": 998951449465
        },
        {
            "name": "Education Chance ",
            "phone": 998953403010
        },
        {
            "name": "Educo  ",
            "phone": 998951777723
        },
        {
            "name": "Educonnect",
            "phone": 998917769900
        },
        {
            "name": "Eduline",
            "phone": 998712001202
        },
        {
            "name": "Effekt Moliya",
            "phone": 998712351036
        },
        {
            "name": "Elegant Study",
            "phone": 998974046703
        },
        {
            "name": "Elite Study Group",
            "phone": 998712389260
        },
        {
            "name": "ENG ZONE",
            "phone": 998988882200
        },
        {
            "name": "English Club",
            "phone": 998935157617
        },
        {
            "name": "English Way",
            "phone": 998712778494
        },
        {
            "name": "English Way",
            "phone": 998712778494
        },
        {
            "name": "ENGLISH ZONE",
            "phone": 998977702028
        },
        {
            "name": "Everest",
            "phone": 998951448070
        },
        {
            "name": "Everest Education ",
            "phone": 998951448070
        },
        {
            "name": "Evrika",
            "phone": 998712418882
        },
        {
            "name": "Express IELTS ",
            "phone": 998990334111
        },
        {
            "name": "Famous",
            "phone": 998999999601
        },
        {
            "name": "Fanlar Dunyosi",
            "phone": 998951700497
        },
        {
            "name": "Farzona Ziyo",
            "phone": 998712564037
        },
        {
            "name": "Fast Progress",
            "phone": 998998309455
        },
        {
            "name": "Filat",
            "phone": 998951464321
        },
        {
            "name": "Focus",
            "phone": 998712445547
        },
        {
            "name": "Forward School",
            "phone": 998951442212
        },
        {
            "name": "Foxford Academy",
            "phone": 998781484222
        },
        {
            "name": "Ganjina Fayz Barokat",
            "phone": 998712948341
        },
        {
            "name": "GENIUSES",
            "phone": 998901680847
        },
        {
            "name": "Get Club",
            "phone": 998712002111
        },
        {
            "name": "Get Study",
            "phone": 998931716969
        },
        {
            "name": "Global Education.uz",
            "phone": 998951452112
        },
        {
            "name": "Global Peer Education",
            "phone": 998901682227
        },
        {
            "name": "Global School",
            "phone": 998712615919
        },
        {
            "name": "Global Study",
            "phone": 998711205729
        },
        {
            "name": "Globus",
            "phone": 998913201995
        },
        {
            "name": "Glory Vseznayka",
            "phone": 998951969070
        },
        {
            "name": "Go Abroad ",
            "phone": 998901760636
        },
        {
            "name": "Go Up ",
            "phone": 998977697955
        },
        {
            "name": "Goal Coast ",
            "phone": 998951771015
        },
        {
            "name": "Golden Language",
            "phone": 998712715040
        },
        {
            "name": "Golden Years",
            "phone": 998712741188
        },
        {
            "name": "GRADATSIYA ",
            "phone": 998901886018
        },
        {
            "name": "GRBS",
            "phone": 998781291919
        },
        {
            "name": "Great Teachers",
            "phone": 998946535215
        },
        {
            "name": "Growth Akademiya",
            "phone": 998712417361
        },
        {
            "name": "Hard Work",
            "phone": 998935747530
        },
        {
            "name": "Harvard",
            "phone": 998951699060
        },
        {
            "name": "Harvard Class",
            "phone": 998911360039
        },
        {
            "name": "Hello Education",
            "phone": 998712359141
        },
        {
            "name": "High Road - Language Center",
            "phone": 998971316116
        },
        {
            "name": "Hihg Star",
            "phone": 998909377537
        },
        {
            "name": "Hong Kong",
            "phone": 998951445252
        },
        {
            "name": "House of Wisdom",
            "phone": 998977654455
        },
        {
            "name": "HS EDUCATION",
            "phone": 998901785526
        },
        {
            "name": "I CAN",
            "phone": 998933784908
        },
        {
            "name": "I Education",
            "phone": 998977078758
        },
        {
            "name": "I Study",
            "phone": 998951979798
        },
        {
            "name": "IELTS House",
            "phone": 998909596758
        },
        {
            "name": "IELTS Hub",
            "phone": 998951970102
        },
        {
            "name": "IELTS Online.uz",
            "phone": 998712007075
        },
        {
            "name": "IELTS Zone",
            "phone": 998971306822
        },
        {
            "name": "Infinity",
            "phone": 998974430170
        },
        {
            "name": "Infinity Challenge",
            "phone": 998712969991
        },
        {
            "name": "Inos World Academy",
            "phone": 998931895522
        },
        {
            "name": "INSPIRING EDUCATION",
            "phone": 998951984824
        },
        {
            "name": "INphone SCHOOL",
            "phone": 998955145999
        },
        {
            "name": "Inphonelect ",
            "phone": 998712670759
        },
        {
            "name": "Inter Nation",
            "phone": "998951439143"
        },
        {
            "name": "Inter Prof Education",
            "phone": 998977514344
        },
        {
            "name": "International Academy",
            "phone": 998712882641
        },
        {
            "name": "Joyful - Study with Masters (JSM)",
            "phone": 998903711848
        },
        {
            "name": "JUST - School of foreign languages",
            "phone": 998712354155
        },
        {
            "name": "Kelajak Ilmi - Business School",
            "phone": 998711501882
        },
        {
            "name": "Kingdom Education ",
            "phone": 998935002200
        },
        {
            "name": "KING'S ACADEMY",
            "phone": 998944130900
        },
        {
            "name": "LANEX Education",
            "phone": 998712411123
        },
        {
            "name": "Language Link",
            "phone": 998712359201
        },
        {
            "name": "LANGUAGE VISION",
            "phone": 998909262426
        },
        {
            "name": "Lingua Education",
            "phone": 998712620705
        },
        {
            "name": "London School",
            "phone": 998951995888
        },
        {
            "name": "LTS TRAINING",
            "phone": 998712370832
        },
        {
            "name": "Ma`mun",
            "phone": 998974040874
        },
        {
            "name": "Madinas Lessons",
            "phone": 998712200366
        },
        {
            "name": "Mandarinka",
            "phone": 998946494666
        },
        {
            "name": "Master IELTS",
            "phone": 998998664444
        },
        {
            "name": "Master Mind",
            "phone": 998978761999
        },
        {
            "name": "Master Study",
            "phone": 998909267406
        },
        {
            "name": "Maximum LC",
            "phone": 998977743060
        },
        {
            "name": "Mega School",
            "phone": 998917710444
        },
        {
            "name": "Merit Education ",
            "phone": 998974404004
        },
        {
            "name": "Miracle Academy",
            "phone": 998712006999
        },
        {
            "name": "Monday Education",
            "phone": 998946130022
        },
        {
            "name": "Motive",
            "phone": 998977662228
        },
        {
            "name": "Mr.English",
            "phone": 998712564700
        },
        {
            "name": "Navigate",
            "phone": 998994842224
        },
        {
            "name": "Nobel School",
            "phone": 998944888882
        },
        {
            "name": "Outright Perfection",
            "phone": 998974005270
        },
        {
            "name": "Oxford",
            "phone": 998951451145
        },
        {
            "name": "Oxfordshire",
            "phone": 998903300033
        },
        {
            "name": "Perfect English",
            "phone": 998974773730
        },
        {
            "name": "POLYGLOT",
            "phone": 998983665333
        },
        {
            "name": "PREMIER",
            "phone": 998903231599
        },
        {
            "name": "PRESTIGE GROUP",
            "phone": 998935069642
        },
        {
            "name": "PRIME COACH",
            "phone": 998946064354
        },
        {
            "name": "Profi Education",
            "phone": 998712663066
        },
        {
            "name": "ProMind Education",
            "phone": 998712343210
        },
        {
            "name": "Qorakol Ziyo Nur",
            "phone": 998999954400
        },
        {
            "name": "REAL SCIENCE",
            "phone": 998912050880
        },
        {
            "name": "Real Science ",
            "phone": 998951702451
        },
        {
            "name": "Registan Academy",
            "phone": 998935122700
        },
        {
            "name": "Richmond Trust",
            "phone": 998977031311
        },
        {
            "name": "Riks Education",
            "phone": 998712003833
        },
        {
            "name": "Ritz Study",
            "phone": 998711484040
        },
        {
            "name": "Royal Education",
            "phone": 998977716030
        },
        {
            "name": "SAKINA STUDY",
            "phone": 998712000084
        },
        {
            "name": "Sakina Study",
            "phone": 998909991500
        },
        {
            "name": "Sam IELTS",
            "phone": 998998997888
        },
        {
            "name": "Sapid Education",
            "phone": 998951946436
        },
        {
            "name": "Sensus ",
            "phone": 998712004334
        },
        {
            "name": "SILA ZNANIY",
            "phone": 998983602030
        },
        {
            "name": "SMART IDEA",
            "phone": 998935652022
        },
        {
            "name": "SMART SCHOOL",
            "phone": 998712319955
        },
        {
            "name": "Speak Easy",
            "phone": 998937666999
        },
        {
            "name": "STUDY LAB",
            "phone": 998712320076
        },
        {
            "name": "Tandem Education",
            "phone": 998911335365
        },
        {
            "name": "Target",
            "phone": 998712000727
        },
        {
            "name": "Team - Language Center",
            "phone": 998954752020
        },
        {
            "name": "THE WAY EDUCATION",
            "phone": 998712565525
        },
        {
            "name": "Thompson School",
            "phone": 998781221010
        },
        {
            "name": "Topik Master Study",
            "phone": 998933757996
        },
        {
            "name": "TSB - Education Center",
            "phone": 998998587010
        },
        {
            "name": "Umid Gullari",
            "phone": 998951698100
        },
        {
            "name": "Unimax - Education Center",
            "phone": 998983350095
        },
        {
            "name": "Unique School",
            "phone": 998712458149
        },
        {
            "name": "Washington Academy",
            "phone": 998977503636
        },
        {
            "name": "Well Academy",
            "phone": 998712561166
        },
        {
            "name": "West School",
            "phone": 998909848282
        },
        {
            "name": "You Matter",
            "phone": 998712443331
        },
        {
            "name": "Your Dream ",
            "phone": 998911916333
        },
        {
            "name": "Your English Zone ",
            "phone": 998903938010
        },
        {
            "name": "Your Tutor",
            "phone": 998903231599
        },
        {
            "name": "Yuksak Talim",
            "phone": 998998203033
        },
        {
            "name": "Yuksalish Study ",
            "phone": 998909382277
        },
        {
            "name": "Yuksalish Ziyo",
            "phone": 998712640422
        },
        {
            "name": "Ziyo Talim",
            "phone": 998712000503
        },
        {
            "name": "Аlfakom",
            "phone": 998712022575
        }
    ]


    const data3 = [
        {
            "name": "Алтайский Государственный Технический Университет им.И.И.Ползунова",
            "city": "Барнаул",
            "cayt": "https://www.altstu.ru/"
        },
        {
            "name": "Балтийский Федеральный Университет имени И.Канта ",
            "city": "Калининград",
            "cayt": "https://kantiana.ru/"
        },
        {
            "name": "Бурятский Государственный Университет им. Д.Банзарова ",
            "city": "Улан-Удэ",
            "cayt": "https://bsu.ru/university/"
        },
        {
            "name": "Витебский Государственный Университет имени П.М. Машерова ",
            "city": "Витебск",
            "cayt": "https://vsu.by/"
        },
        {
            "name": "Владивостокский Государственный Университет Экономики и Сервиса ВГУЭС",
            "city": "Владивосток ",
            "cayt": "https://vvsu.ru/"
        },
        {
            "name": "Воронежский Государственный Университет ",
            "city": "Воронеж",
            "cayt": "http://www.vsu.ru/"
        },
        {
            "name": "Вятский Государственный Университет",
            "city": "Киров",
            "cayt": "https://www.vyatsu.ru/"
        },
        {
            "name": "Дальневосточный Федеральный Университет ",
            "city": "Владивосток ",
            "cayt": "http://www.dvfu.ru"
        },
        {
            "name": "Забайкальский Государственный Университет",
            "city": "Чита",
            "cayt": "https://zabgu.ru/"
        },
        {
            "name": "Ивановская Государственная Сельскохозяйственная Академия ",
            "city": "Иваново",
            "cayt": "https://ivgsha.ru/"
        },
        {
            "name": "Ивановская Медицинская Академия",
            "city": "Иваново",
            "cayt": "https://ivanovo.ucheba.ru/uz/9525"
        },
        {
            "name": "Ивановский Государственный Политехнический Университет",
            "city": "Иваново",
            "cayt": "https://ivgpu.ru/"
        },
        {
            "name": "Ивановский Государственный Химико - Технологический Университет ",
            "city": "Иваново",
            "cayt": "https://www.isuct.ru/"
        },
        {
            "name": "Ивановский Государственный Энергетический Университет ",
            "city": "Иваново",
            "cayt": "http://ispu.ru/"
        },
        {
            "name": "Институт Мировых Цивилизаций имени В.В. Жириновского ",
            "city": "Москва",
            "cayt": "http://imc-i.ru/"
        },
        {
            "name": "Казанский Государственный Энергетический Университет ",
            "city": "Казань",
            "cayt": "https://kgeu.ru/"
        },
        {
            "name": "Казанский Национальный Исследовательский Технологический Университет ",
            "city": "Казань",
            "cayt": "https://www.kstu.ru/"
        },
        {
            "name": "Казанский Федеральный Университет",
            "city": "Казань",
            "cayt": "https://kpfu.ru/"
        },
        {
            "name": "Кемеровский Государственный Университет",
            "city": "Кемерово",
            "cayt": "https://kemsu.ru/"
        },
        {
            "name": "Международный Государственный Экологический Институт имени А.Д.Сахарова                                     Белорусского Государственного Университета",
            "city": "Минск",
            "cayt": "https://www.iseu.bsu.by/ru/"
        },
        {
            "name": "Мордовский Государственный Университет им. Н.П. Огарева ",
            "city": "Саранск",
            "cayt": "https://mrsu.ru/ru/"
        },
        {
            "name": "Московский Государственный Институт Международных Отношений МГИМО",
            "city": "Москва",
            "cayt": "https://mgimo.ru/"
        },
        {
            "name": "Московский Государственный Университет Геодезии и Картографии МИИГАиК",
            "city": "Москва",
            "cayt": "https://www.miigaik.ru/"
        },
        {
            "name": "Московский Политехнический Университет",
            "city": "Москва",
            "cayt": "https://mospolytech.ru/"
        },
        {
            "name": "Московский Физико-Технический Институт ",
            "city": "Москва",
            "cayt": "https://mipt.ru/"
        },
        {
            "name": "Московский Финансово-Юридический Университет ",
            "city": "Москва",
            "cayt": "https://www.mfua.ru/"
        },
        {
            "name": "Национальный Исследовательский Технологический Университет «МИСиС» ",
            "city": "Москва",
            "cayt": "http://misis.ru/"
        },
        {
            "name": "Национальный Исследовательский Томский Государственный Университет ",
            "city": "Томск",
            "cayt": "http://www.tsu.ru"
        },
        {
            "name": "Национальный Исследовательский Университет «Высшая Школа Экономики» ",
            "city": "Москва",
            "cayt": "https://www.hse.ru/"
        },
        {
            "name": "Национальный Исследовательский Университет ИТМО ",
            "city": "Санкт-Петербург ",
            "cayt": "http://www.ifmo.ru/"
        },
        {
            "name": "Национальный Исследовательский Ядерный Университет «МИФИ»  ",
            "city": "Москва",
            "cayt": "https://mephi.ru"
        },
        {
            "name": "Нижегородский Государственный архитектурно- строительный Университет ННГАСУ",
            "city": "Нижний Новгород",
            "cayt": "https://www.nngasu.ru/"
        },
        {
            "name": "Нижегородский Государственный Университет им. Н.И.Лобачевского",
            "city": "Нижний Новгород",
            "cayt": "http://www.unn.ru"
        },
        {
            "name": "Новосибирский Национальный Исследовательский Государственный Университет ",
            "city": "Новостбирск",
            "cayt": "http://www.nsu.ru/"
        },
        {
            "name": "Первый Московский Государственный Медицинский Университет имени И.М. Сеченова ",
            "city": "Москва ",
            "cayt": "https://sechenov.ru/"
        },
        {
            "name": "Петрозаводский Государственный Университет ",
            "city": "Петрозаводск",
            "cayt": "http://petrsu.ru/"
        },
        {
            "name": "Поволжский Государственный Технологический Университет ",
            "city": "Йошкар-Ола",
            "cayt": "https://www.volgatech.net/"
        },
        {
            "name": "Приволжский Федеральный Университет ",
            "city": "Казань",
            "cayt": "http://kpfu.ru/"
        },
        {
            "name": "Российский Государственный Гуманитарный Университет ",
            "city": "Москва",
            "cayt": "https://www.rsuh.ru/"
        },
        {
            "name": "Российский Государственный профессионально-педагогический Университет  РГППУ",
            "city": "Екатеринбург",
            "cayt": "https://www.rsvpu.ru/"
        },
        {
            "name": "Российский Государственный Университет Туризма и Сервиса ",
            "city": "Черкизово",
            "cayt": "https://rguts.ru/"
        },
        {
            "name": "Российский Национальный Исследовательский Медицинский Университет имени Н.И. Пирогова",
            "city": "Москва",
            "cayt": "https://rsmu.ru/"
        },
        {
            "name": "Российский Технологический Университет МИРЭА",
            "city": "Москва",
            "cayt": "https://priem.mirea.ru/"
        },
        {
            "name": "Российский Университет Дружбы Народов ",
            "city": "Москва",
            "cayt": "http://www.rudn.ru"
        },
        {
            "name": "Российский Экономический Университет имени Г.В. Плеханова ",
            "city": "Москва",
            "cayt": "https://xn--p1ag3a.xn--p1ai/"
        },
        {
            "name": "Самарский Национальный Исследовательский Университет им. академика С.П. Королёва  ",
            "city": "Самара",
            "cayt": "http://www.ssau.ru"
        },
        {
            "name": "Санкт-Петербургский Государственный Архитектурно-Строительный Университет",
            "city": "Санкт-Петербург ",
            "cayt": "https://www.spbgasu.ru/"
        },
        {
            "name": "Санкт-Петербургский Государственный Университет",
            "city": "Санкт-Петербург ",
            "cayt": "https://sutd.ru/"
        },
        {
            "name": "Санкт-Петербургский Государственный Университет промышленных технологий и дизайна",
            "city": "Санкт-Петербург ",
            "cayt": "https://sutd.ru/"
        },
        {
            "name": "Санкт-Петербургский Государственный Электротехнический Университет «ЛЭТИ» ",
            "city": "Санкт-Петербург ",
            "cayt": "http://etu.ru"
        },
        {
            "name": "Санкт-Петербургский Политехнический Университет Петра Великого ",
            "city": "Санкт-Петербург ",
            "cayt": "http://www.spbstu.ru"
        },
        {
            "name": "Сибирский Государственный Индустриальный Университет",
            "city": "Новокузнецк",
            "cayt": "https://www.sibsiu.ru/"
        },
        {
            "name": "Сибирский Государственный Медицинский Университет  ",
            "city": "Томск",
            "cayt": "https://ssmu.ru/ru/"
        },
        {
            "name": "Сибирский Государственный Университет науки и технологий имени академика М.Ф. Решетнёва",
            "city": "Красноярск",
            "cayt": "http://gf.sibsau.ru/"
        },
        {
            "name": "Сибирский Университет потрибительской кооперации СибУПК",
            "city": "Новосибирск",
            "cayt": "http://sibupk.su/"
        },
        {
            "name": "Сибирский Федеральный Университет ",
            "city": "Красноярск ",
            "cayt": "http://www.sfu-kras.ru/"
        },
        {
            "name": "Сочинский Государственный Университет",
            "city": "Сочи",
            "cayt": "https://sutr.ru/"
        },
        {
            "name": "Томский Политехнический Университет ",
            "city": "Томск",
            "cayt": "https://tpu.ru/"
        },
        {
            "name": "Тюменский Государственный Университет",
            "city": "Тюмень",
            "cayt": "https://www.utmn.ru/"
        },
        {
            "name": "Университет Иннополис ",
            "city": "Иннополис ",
            "cayt": "https://innopolis.university/"
        },
        {
            "name": "Уральский Государственный экономический  Университет  УрГЭУ",
            "city": "Екатеринбург",
            "cayt": "https://www.usue.ru/"
        },
        {
            "name": "Уральский Государственный юредичический  Университет  им. В.Ф.Яковлева УрГЮУ",
            "city": "Екатеринбург",
            "cayt": "https://www.usla.ru/"
        },
        {
            "name": "Уральский Федеральный Университет",
            "city": "Екатеринбург",
            "cayt": "https://urfu.ru/ru/"
        },
        {
            "name": "Уральский Федеральный Университет имени Б. Н. Ельцина  ",
            "city": "Екатеринбург",
            "cayt": "http://urfu.ru"
        },
        {
            "name": "Финансовый Университет при Правительстве Российской Федерации",
            "city": "Москва",
            "cayt": "http://www.fa.ru/"
        },
        {
            "name": "Чеченский Государственный Университет им. А.А.Кадырова",
            "city": "Грозный",
            "cayt": "https://www.chesu.ru/"
        },
        {
            "name": "Юго-Западный Государственный Университет ",
            "city": "Курск",
            "cayt": "https://swsu.ru/"
        },
        {
            "name": "Южно-Российский Государственный Политехнический Университет (НПИ) имени М.И. Платова",
            "city": "Новочеркаск",
            "cayt": "https://www.npi-tu.ru/"
        },
        {
            "name": "Южно-Уральский Государственный Университет ",
            "city": "Челябинск",
            "cayt": "http://susu.ru"
        }
    ]

    const data4 = [
        {"nomi":"Abdulla Qodiriy nomidagi maktab","tel":"+998712925363"},
        {"nomi":"Al-Beruniy nomidagi xalqaro maktab","tel":"+998946252432"},
        {"nomi":"Al-Buxoriy nomidagi maktab","tel":"+998712443582"},
        {"nomi":"Al-Farobiy nomidagi maktab","tel":"+998712621537"},
        {"nomi":"Al-Xorazmiy nomidagi maktab","tel":"+998555015050"},
        {"nomi":"Artel Technical School","tel":"+998712070600"},
        {"nomi":"Asia","tel":"+998712404308"},
        {"nomi":"Asian Elite School","tel":"+998998008650"},
        {"nomi":"Bek","tel":"+998 71 222 32 93"},
        {"nomi":"British School of Tashkent","tel":"+998712626020"},
        {"nomi":"Cambridge International College (CIC)","tel":"+998 71 200 03 08"},
        {"nomi":"CIS Intenational School","tel":"+998712096669"},
        {"nomi":"Cool Kids","tel":"+998 94 625 24 32"},
        {"nomi":"Diplomat International School","tel":"+998994814555"},
        {"nomi":"Erudite Education School","tel":"+998712359297"},
        {"nomi":"Evrika","tel":"+998993017071"},
        {"nomi":"Fortuna Education","tel":"+998977005548"},
        {"nomi":"French International School","tel":"+998712635894"},
        {"nomi":"Future Education","tel":"+998974002962"},
        {"nomi":"Genesis Education","tel":"+998712375621"},
        {"nomi":"GOLD STARS School","tel":"+998781131222"},
        {"nomi":"GORODOK ZNANIY","tel":"+998712643910"},
        {"nomi":"HAYOT MAKTABI","tel":"+998983656225"},
        {"nomi":"Lider","tel":"+998933000520"},
        {"nomi":"Little Harvard","tel":"+998909354700"}
        ,
        {"nomi":"Lumos Mind","tel":"+998903478893"},
        {"nomi":"Merit School","tel":"+998999889999"},
        {"nomi":"OLIY MAKTAB","tel":"+998909708183"},
        {"nomi":"Oxbridge International School","tel":"+998712630015"},
        {"nomi":"PREZIDENT SCHOOL of UZBEKISTAN","tel":"+998712079998"},
        {"nomi":"Profi School","tel":"+998787771111"},
        {"nomi":"Salam School","tel":"+998951772626"},
        {"nomi":"Sehriyo","tel":"+998712907063"},
        {"nomi":"Smart School","tel":"+998917988889"},
        {"nomi":"TASHKENT INTERNATIONAL SCHOOL","tel":"+998712919670"},
        {"nomi":"Tashkent Turk Okulu","tel":"+998712210859"},
        {"nomi":"UK School of Business","tel":"+998712657267"},
        {"nomi":"UNIKUM EDULAND","tel":"+998881985577"},
        {"nomi":"VOSIQ - International School","tel":"+998712070088"},
        {"nomi":"WINNERS INTERNATIONAL SCHOOL","tel":"+998975431111"},
        {"nomi":"Wisdom","tel":"+998977822520"},
        {"nomi":"Wise School","tel":"+998712490134"},
        {"nomi":"Wunder Kind","tel":"+998712952647"},
        {"nomi":"YOSH JURNALISTLAR MAKTABI","tel":"+998944264040"},
        {"nomi":"ZIYO ZUKKO","tel":"+998712443581"}
        ]
        

    return (
        <div>
            <Navbar />
            <div className="mainEduGate">
                <div className="biz_haqimizda">
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab className='unverListBtn' label={t("unverlist1")} {...a11yProps(0)} />
                                <Tab className='unverListBtn' label={t("unverlist2")} {...a11yProps(1)} />
                                <Tab className='unverListBtn' label={t("unverlist6")} {...a11yProps(2)} />
                                {/* <Tab className='unverListBtn' label={t("unverlist4")} {...a11yProps(3)} /> */}
                                <Tab className='unverListBtn' label={t("unverlist3")} {...a11yProps(3)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Paper>
                                <TableContainer>
                                    <Table style={{ width: '100%', padding: '10px' }} stickyHeader aria-label="sticky table">
                                        <TableHead style={{ borderBottom: '1px solid #007aff' }}>
                                            <TableRow className="tdlar">
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>№</TableCell>
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("unver3")}</TableCell>
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("p271")}</TableCell>
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("p4112")}</TableCell>
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("site")}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data.map((item, index) => {
                                                    return (
                                                        <TableRow key={index} className="tdlar">
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>{index + 1}</TableCell>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>{item.nomi}</TableCell>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>{item.joy}</TableCell>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>
                                                                <a href={`tel:${item.tel}`}>{item.tel}</a>
                                                            </TableCell>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>
                                                                <a target="_blank" href={item.sayt}>{item.sayt}</a>
                                                            </TableCell>

                                                        </TableRow>
                                                    )

                                                })
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Paper>
                                <TableContainer>
                                    <Table style={{ width: '100%', padding: '10px' }} stickyHeader aria-label="sticky table">
                                        <TableHead style={{ borderBottom: '1px solid #007aff' }}>
                                            <TableRow className="tdlar">
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>№</TableCell>
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("unver3")}</TableCell>
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("p271")}</TableCell>
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("site")}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data3.map((item, index) => {
                                                    return (
                                                        <TableRow className="tdlar" key={index}>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>{index + 1}</TableCell>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>{item.name}</TableCell>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>{item.city}</TableCell>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>
                                                                <a target="_blank" href={item.cayt}>{item.cayt}</a>
                                                            </TableCell>

                                                        </TableRow>
                                                    )

                                                })
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </TabPanel>
                        
                        <TabPanel value={value} index={2}>
                            <Paper>
                                <TableContainer>
                                    <Table style={{ width: '100%', padding: '10px' }} stickyHeader aria-label="sticky table">
                                        <TableHead style={{ borderBottom: '1px solid #007aff' }}>
                                            <TableRow className="tdlar">
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>№</TableCell>
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("unverlist6")}</TableCell>
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("p4112")}</TableCell>
                                                <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("site")}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                data2.map((item, index) => {
                                                    return (
                                                        <TableRow className="tdlar" key={index}>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>{index + 1}</TableCell>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>{item.name}</TableCell>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>
                                                                <a href={`tel:${item.phone}`}>{item.phone}</a>
                                                            </TableCell>
                                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>
                                                                <a target="_blank" href={item.site}>{item.site}</a>
                                                            </TableCell>

                                                        </TableRow>
                                                    )

                                                })
                                            }

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <Paper>
                            <TableContainer>
                                <Table style={{ width: '100%', padding: '10px' }} stickyHeader aria-label="sticky table">
                                    <TableHead style={{ borderBottom: '1px solid #007aff' }}>
                                        <TableRow className="tdlar">
                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>№</TableCell>
                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("unverlist3")}</TableCell>
                                            <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "24px" }}>{t("p4112")}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            data4.map((item, index) => {
                                                return (
                                                    <TableRow className="tdlar">
                                                        <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>{index + 1}</TableCell>
                                                        <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>{item.nomi}</TableCell>
                                                        <TableCell style={{ padding: '10px', textAlign: 'start', fontSize: "20px" }}>
                                                                <a href={`tel:${item.tel}`}>{item.tel}</a>
                                                            </TableCell>

                                                    </TableRow>
                                                )

                                            })
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                        </TabPanel>
                    </Box>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UnverList