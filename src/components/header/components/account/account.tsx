
import './account.scss'
import { FC } from "react";
import { Link } from "react-router-dom";

import profileLogo from '@/assets/images/logoSample.jpg'
import { useGoogleLogin } from '@react-oauth/google';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { UserState } from '@/interfaces/interface';
import { setUser } from '@/redux/userSlice';

const  Account: FC = () =>{

    interface RootState {
        user: UserState;
    }

    const dispatch = useDispatch()
    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    const login = useGoogleLogin({
        onSuccess: async (data) =>{
            localStorage.setItem('access_token', data.access_token)

            // получение инфы и занос её в редакс
            const  newUser: UserState = {
                user_nickName: "JohnDoe",
                user_imgUrl: "gay",
                user_role: 1,
                user_id: 12345,
                user_email: "johndoe@example.com",
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
                    <div className="header_profile_nickname">NickNickNigname</div>

                    <div className="header_profile_img">
                        <img src={profileLogo} alt="avatar" />
                    </div>
                </Link>}
            </div>
    )
}

export default Account