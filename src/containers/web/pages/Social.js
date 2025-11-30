import React from 'react'
import '../../../style/css/social.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

const Social = () => {
  return (
    <div className='social2'>
        <a target="blank" href='https://www.facebook.com/Edugately' className="links fb">
        <FacebookIcon/>
        </a>
        <a target="blank" href='https://instagram.com/edugately?utm_medium=copy_link' className="links in">
        <InstagramIcon/>
        </a>
        <a target="blank" href='https://www.youtube.com/channel/UCQhpIS8vspJ0j_3awLeXiOQ' className="links yt">
        <YouTubeIcon/>
        </a>
        <a target="blank" href='https://t.me/Edugately' className="links tl">
        <TelegramIcon/>
        </a>
    </div>
  )
}

export default Social