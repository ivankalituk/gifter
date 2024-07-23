import { FC } from "react";

import './user.scss'
import { Link } from "react-router-dom";

import avatarSample from '@/assets/images/logoSample.jpg'

const User: FC = () => {
    return(
        <div className="user">

            <div className="user_left">
                <img src={avatarSample} alt="avatar" />
                <Link to={'/account/:user_id'}>User</Link>
            </div>

            <div className="user_right">
                <button className="button_preset">Розблокувати</button>
            </div>
        </div>
    )
}

export default User