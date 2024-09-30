import { FC, useState } from "react";
import { Link } from "react-router-dom";

import './account.scss'

import sampleAvatar from '@/assets/images/logoSample.jpg'
import options from '@/assets/images/three dots.svg'

const Account: FC = () => {

    const [additional, setAditional] = useState<boolean>(false)

    const handleAdditional = () => {
        setAditional(!additional)
    }

    return(
        <div className="account">
            <Link to={'/account/:user_id'} className="account_profile">
                <img src={sampleAvatar} alt="avatar" />

                <div className="account_profile_info">
                    <div className="account_profile_nickname">NIGGA</div>
                    <div className="account_profile_data">24:24 12/12/2121</div>
                </div>
            </Link>

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