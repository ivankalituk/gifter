import { FC } from "react";

import './admin.scss' 

import avatarSample from '@/assets/images/logoSample.jpg'
import { Link } from "react-router-dom";

interface AdminInterface {
    data: any
    handleDecreaseAdmin: (id: number) => void
    handleIncreaseAdmin: (id: number) => void
}

const Admin: FC <AdminInterface>= ({data, handleDecreaseAdmin, handleIncreaseAdmin}) => {
    return(
        <div className="admin">
            <div className="admin_left">
                <img src={avatarSample} alt="avatar" />
                <Link to={'/account/:user_id'}>{data.nickname}</Link>
            </div>

            <div className="admin_right">
                <div className="admin_status">Рівень {data.admin_level}</div>
                <button onClick={()=> handleDecreaseAdmin(data.user_id)}>-1</button>
                <button onClick={() => handleIncreaseAdmin(data.user_id)}>+1</button>
            </div>
        </div>
    )
}

export default Admin