import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';


import Header from '@/components/header/header';

import MainPage from '@/pages/mainPage/mainPage';
import SuggestPage from './pages/suggestPage/suggestPage';
import ProfilePage from './pages/profilePage/profilePage';
import SettingsPage from './pages/settingsPage/settingsPage';
import AdminSuggestsPage from './pages/adminSuggestsPage/adminSuggestsPage';
import AdminBlacklistPage from './pages/adminBlacklistPage/adminBlacklistPage';
import AdminAdminsPage from './pages/adminAdminsPage/adminAdminsPage';
import AdminReportsPage from './pages/adminReportsPage/adminReportsPage';
import { useGetRequest } from './hooks/useGetReuquest';
import { getUserInfo } from './api/user';
import axios from 'axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, UserState } from './interfaces/interface';
import { setUser } from './redux/userSlice';
import logo from '@/assets/images/logoRed.svg'
import AuthPage from './pages/authPage/authPage';

function App() {

  const dispatch = useDispatch()


  // блокировка скролла
  const [blockScroll, setBlockScroll] = useState<boolean>(false)
  const scrollCallback = (block: boolean) =>{
    setBlockScroll(block)
  }


  // для задержки к получению данных аккаунта
  const[ready, setReady] = useState<boolean>(false)
  
  // получение информации про пользователя
  useEffect(() => {
    const checkUser = async () => {
      // если токен существует
      const token = localStorage.getItem('access_token')
      console.log(token)

      if (token){
        try {
          // проверяем активен ли токен
          
          const response = await axios.post('http://localhost:1000/user', {access_token: token});
          const data = response.data
          console.log(data)

          // заполнение редакс стора

          const newUser: UserState = {
            user_nickName: data.nickname,
            user_imgUrl: data.imgPath,
            user_role: data.role,
            user_id: data.id,
            user_email: data.email,
          }

          dispatch(setUser(newUser))
          setReady(true)

        } catch (error) {
          console.error('Error:', error);
        }
      }
    }

    checkUser()
  }, [])

  const [nameSearch, setNameSearch] = useState<string>('')

  const nameSearchCallBack = (name: string) => {
    setNameSearch(name)
    console.log(nameSearch)
  }


  return (
    <div className={blockScroll? "App blockScroll" : "App"}>

      {!ready &&<div className="loader">
        <div className="loader_logo">
          <img src={logo} alt="logo" />
          <h1>gifter</h1>
        </div>
      </div>}

      {ready && <>
        <Header scrollCallback={scrollCallback} nameSearchCallBack = {nameSearchCallBack}/>

        <main>
          <Routes>
            <Route path='/' element={<MainPage scrollCallback = {scrollCallback} nameSearch = {nameSearch}/>} />
            <Route path='/auth' element = {<AuthPage/>}></Route>

            {/* PROTECTED AUTH */}
            <Route path='/suggest' element={<SuggestPage/>} />
      
            <Route path='/profile' element={<ProfilePage scrollCallback = {scrollCallback} type={'privateUser'}/>} />
            <Route path='/account/:user_id' element={<ProfilePage scrollCallback = {scrollCallback} type={'anyUser'}/>} />
            <Route path='profile/settings' element={<SettingsPage />}/>
            
            {/* PROTECRED AUTH ROLE */}
            <Route path='/adminPanel/suggests' element={<AdminSuggestsPage />}/>
            <Route path='/adminPanel/reports' element={<AdminReportsPage />}/>   
            <Route path='/adminPanel/admins' element={<AdminAdminsPage />}/>
            <Route path='/adminPanel/blacklist' element={<AdminBlacklistPage />}/>
          </Routes>
        </main>
      </>}
    </div>
  );
}

export default App;