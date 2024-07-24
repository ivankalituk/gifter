import { FC } from "react";

import './admin.scss' 

import avatarSample from '@/assets/images/logoSample.jpg'
import { Link } from "react-router-dom";

const Admin: FC = () => {
    return(
        <div className="admin">
            <div className="admin_left">
                <img src={avatarSample} alt="avatar" />
                <Link to={'/account/:user_id'}>Nickname</Link>
            </div>

            <div className="admin_right">
                <div className="admin_status">Рівень 3</div>
                <button>-1</button>
                <button>+1</button>
            </div>
        </div>
    )
}

export default Admin