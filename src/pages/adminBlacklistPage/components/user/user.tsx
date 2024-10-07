import { FC } from "react";

import './user.scss'
import { Link } from "react-router-dom";

import avatarSample from '@/assets/images/logoSample.jpg'
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getUserById } from "@/api/user";

interface UserInterface {
    user: any,
    handleUnblockUserCallBack: (id: number) => void
}

// запрос на юзера и получение его данных

const User: FC <UserInterface> = ({user, handleUnblockUserCallBack}) => {

    return(
        <div className="user">

            <div className="user_left">
                <img src={user.imgPath !== null? 'http://localhost:1000/' + user.imgPath: avatarSample} alt="avatar" />
                <Link to={'/account/' + user.user_id}>{user.email}</Link>
            </div>

            <div className="user_right">
                <button className="button_preset" onClick={() => handleUnblockUserCallBack(user.user_id)}>Розблокувати</button>
            </div>
        </div>
    )
}

export default User