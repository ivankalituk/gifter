import { FC } from "react";
import { Link } from "react-router-dom";

import profilePhoto from "@/assets/images/logoSample.jpg"

import './profilePage.scss'
import MarkedList from "./components/markedList/markedList";

const ProfilePage: FC = () => {

    // две колонки, на первой - ава человека, длинна колонки длинна второй колонки, там же переход на настройки как в гитхабе
    // в второй колонке будет вся инфа пользователя по предложениям и так далее

    return(
        <div className="profilePage">
            <div className="profilePage_container">
                <div className="profilePage_firstColumn">

                    <Link to={'/settings'}>
                        <div className="profile_firstColumb_avatar"><img src={profilePhoto} alt="" /></div>
                    </Link>

                    <div className="profilePage_firstColumn_nickname">NIGNAMENIGNAMENIGNAME</div>


                    <Link to={'/settings'} className="link_button">Редагувати профіль</Link>


                </div>

                <div className="profilePage_secondColumn">
                    <div className="profilePage_secondColumn_markedLists">
                        <MarkedList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage