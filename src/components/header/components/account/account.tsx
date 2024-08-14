
import './account.scss'
import { FC } from "react";
import { Link } from "react-router-dom";

import profileLogo from '@/assets/images/logoSample.jpg'
import { useGoogleLogin } from '@react-oauth/google';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, UserState } from '@/interfaces/interface';
import { setUser } from '@/redux/userSlice';
import axios from 'axios';

const  Account: FC = () =>{

    const dispatch = useDispatch()
    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    return(
            <div className="account">
                
                {!user.user_nickName && <Link to={'/auth'}>Авторизація</Link>}
                
                {user.user_nickName && <Link className='account_loged' to={'/profile'}>
                    <div className="header_profile_nickname">{user.user_nickName}</div>

                    <div className="header_profile_img">
                        <img src={user.user_imgUrl? user.user_imgUrl : profileLogo} alt="avatar" />
                    </div>
                </Link>}
            </div>
    )
}

export default Account