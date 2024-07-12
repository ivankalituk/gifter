import { FC } from "react";

import './blacklistUser.scss'

import UserImg from '@/assets/images/logoSample.jpg'

const BlacklistUser: FC = () => {
    return(
        <div className="blacklistUser">
            <div className="blacklistUser_leftGroup">
                <img src={UserImg} alt="UserImg" />

                <span>Нікнейм користувача</span>
            </div>

            <button className="button_preset">Видалити</button>
        </div>
    )
}

export default BlacklistUser