
import './account.scss'
import { FC } from "react";
import { Link } from "react-router-dom";

import profileLogo from '@/assets/images/logoSample.jpg'
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { UserState } from '@/interfaces/interfaces';

const  Account: FC = () =>{

    interface RootState {
        user: UserState
    }

    const dispatch = useDispatch()
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
    const user = useTypedSelector((state) => state.user)


    const login = useGoogleLogin({
        onSuccess: async (data) =>{
            localStorage.setItem('access_token', data.access_token)        

            // получение юзера
        },
        onError: error => {
            console.log(error)
        }
    })

    const handleLogin = () =>{
        login()
    }

    return(
        <div className="account">
            <button onClick={handleLogin}>Реєстрація</button>


            <Link className='account_user' to={'/profile'}>
                <div className="header_profile_nickname">NickNickNigname</div>

                <div className="header_profile_img">
                    <img src={profileLogo} alt="avatar" />
                </div>
            </Link>
        </div>
    )
}

export default Account