
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

    const login = useGoogleLogin({
        onSuccess: async (data) =>{
            localStorage.setItem('access_token', data.access_token)

            const response = await axios.post('http://localhost:1000/user', {access_token: data.access_token});
            const res = response.data
            console.log(res)

            // получение инфы и занос её в редакс
            const  newUser: UserState = {
                user_nickName: res.nickname,
                user_imgUrl: res.imgPath,
                user_role: res.role,
                user_id: res.id,
                user_email: res.email,
            }

            dispatch(setUser(newUser))
        },

        onError: (error) => {
            console.log(error)
        }
    })

    const handleLogIn = () => {
        login()
    }

    return(
            <div className="account">
                
                {!user.user_nickName && <button onClick={handleLogIn}>Авторизація</button>}
                
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