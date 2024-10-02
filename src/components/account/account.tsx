import { FC, useState } from "react";
import { Link } from "react-router-dom";

import './account.scss'

import sampleAvatar from '@/assets/images/logoSample.jpg'
import options from '@/assets/images/three dots.svg'
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getUserById } from "@/api/user";

interface Account {
    user_id: number,
    date: string
}

const Account: FC <Account>= ({user_id, date}) => {

    // -------------------
    // данные пользователя
    // -------------------

    const {data: user, isFetched: userFetched} = useGetRequest({fetchFunc: () => getUserById({user_id: user_id}), key: [], enabled: true})
    
    // --------------------------------------------------------
    // открыть дополнительные настройки (добавление админа, чс)
    // --------------------------------------------------------
    
    const [additional, setAditional] = useState<boolean>(false)

    const handleAdditional = () => {
        setAditional(!additional)
    }

    return(
        <div className="account">
            {userFetched && user && <Link to={'/account/' + user_id} className="account_profile">
                <img src={user[0].imgPath !== null? 'http://localhost:1000/' + user.imgPath : sampleAvatar} alt="avatar" />

                <div className="account_profile_info">
                    <div className="account_profile_nickname">{user[0].nickname}</div>
                    <div className="account_profile_data">{date}</div>
                </div>
            </Link>}

            <div className="account_additional">
                    <div className="account_additional_container">
                        <img src={options} alt="dots" onClick={handleAdditional} />
                        
                        <div className={additional? "account_additional_buttons active" : 'account_additional_buttons disabled'}>
                            <button className={additional? 'active' : 'disabled'} onClick={handleAdditional}>Зробити адміном</button>
                            <button className={additional? 'active' : 'disabled'} onClick={handleAdditional}>Додати в ЧС</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Account