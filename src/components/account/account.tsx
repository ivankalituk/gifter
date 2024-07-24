import { FC } from "react";
import { Link } from "react-router-dom";

import './account.scss'

import sampleAvatar from '@/assets/images/logoSample.jpg'

const Account: FC = () => {
    return(
        <Link to={'/account/:user_id'} className="suggest_account">
            <img src={sampleAvatar} alt="avatar" />

            <div className="suggest_account_info">
                <div className="suggest_account_nickname">NIGGA</div>
                <div className="suggest_account_data">24:24 12/12/2121</div>
            </div>
        </Link>
    )
}

export default Account