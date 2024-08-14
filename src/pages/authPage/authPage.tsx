import { FC } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, UserState } from '@/interfaces/interface';
import { setUser } from '@/redux/userSlice';
import axios from 'axios';
import './authPage.scss'
import { useNavigate } from "react-router-dom";

const AuthPage: FC = () => {

    const dispatch = useDispatch()
    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)
    const navigate = useNavigate()

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
            navigate('/profile')
        },

        onError: (error) => {
            console.log(error)
        }
    })

    const handleLogIn = () => {
        login()
    }

    return(
        <div className="authPage">
            <div className="authPage_container">
                <div className="authPage_auth">
                    <button onClick={handleLogIn} disabled = {user.user_email? true : false}>Авторизація</button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage