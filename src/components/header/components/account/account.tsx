
import './account.scss'
import { FC } from "react";
import { Link } from "react-router-dom";

import profileLogo from '@/assets/images/logoSample.jpg'


const  Account: FC = () =>{
    return(
            <Link className='account' to={'/profile'}>
                <div className="header_profile_nickname">NickNickNigname</div>

                <div className="header_profile_img">
                    <img src={profileLogo} alt="avatar" />
                </div>
            </Link>
    )
}

export default Account