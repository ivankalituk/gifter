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
import GiftCreationPage from './pages/giftCreationPage/giftCreationPage';
import ProtectedRourt from './components/protectedRoute/protectedRoute';

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

      if (token){
        try {
          // проверяем активен ли токен
          
          const response = await axios.post('http://localhost:1000/user', {access_token: token});
          const data = response.data
          console.log(data)
          // заполнение редакс стора

          const newUser: UserState = {
            user_nickName: data[0].nickname,
            user_imgUrl: data[0].imgPath,
            user_role: data[0].role,
            user_id: data[0].id,
            user_email: data[0].email,
            user_blocked: data[0].blocked
          }

          dispatch(setUser(newUser))
          setReady(true)

        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        setReady(true)
      }
    }

    checkUser()
  }, [])


  // для поиска по названию подарка
  const [nameSearch, setNameSearch] = useState<string>('')

  const nameSearchCallBack = (name: string) => {
    setNameSearch(name)
  }

  const deleteSearchCallBack = () => {
    setNameSearch('')
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
            <Route path='/' element={<MainPage scrollCallback = {scrollCallback} nameSearch = {nameSearch} deleteSearchCallBack = {deleteSearchCallBack}/>} />
            <Route path='/auth' element = {<AuthPage/>}></Route>
            <Route path='/account/:user_id' element={<ProfilePage scrollCallback = {scrollCallback} type={'anyUser'}/>} />

            {/* PROTECTED AUTH */}
            <Route element = {<ProtectedRourt type='user'/>}><Route path='/suggest' element={<SuggestPage/>} /></Route>
            <Route element = {<ProtectedRourt type='user'/>}><Route path='/profile' element={<ProfilePage scrollCallback = {scrollCallback} type={'privateUser'}/>} /></Route>
            <Route element = {<ProtectedRourt type='user'/>}><Route path='/settings' element={<SettingsPage />}/></Route>
            
            {/* PROTECRED AUTH ROLE */}
            <Route element = {<ProtectedRourt type='admin'/>}><Route path='/adminPanel/suggests' element={<AdminSuggestsPage />}/></Route>
            <Route element = {<ProtectedRourt type='admin'/>}><Route path='/adminPanel/reports' element={<AdminReportsPage scrollCallback={scrollCallback}/>}/></Route>
            <Route element = {<ProtectedRourt type='admin'/>}><Route path='/adminPanel/admins' element={<AdminAdminsPage />}/></Route>
            <Route element = {<ProtectedRourt type='admin'/>}><Route path='/adminPanel/blacklist' element={<AdminBlacklistPage />}/></Route>
            <Route element = {<ProtectedRourt type='admin'/>}><Route path='/adminPanel/suggests/submit/:suggest_id' element={<GiftCreationPage type={'suggest'} />} /></Route>
            <Route element = {<ProtectedRourt type='admin'/>}><Route path='/adminPanel/reports/submit/:report_id' element={<GiftCreationPage type={'report'}/>} /></Route>
          </Routes>
        </main>
      </>}
    </div>
  );
}

export default App;