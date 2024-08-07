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

function App() {

  const [blockScroll, setBlockScroll] = useState<boolean>(false)

  // блокировка скролла
  const scrollCallback = (block: boolean) =>{
    setBlockScroll(block)
  }

  // получение информации про пользователя

  const [userEnabled, setUserEnabled] = useState<boolean>(false)
  const [userKey, setUserKey] = useState<number>(0)
  const [access_token, setAccess_tocken] = useState<string | null>(null)

  const {data: userData, isFetched: userFetched} = useGetRequest({fetchFunc: ()=> getUserInfo(23232), key: [userKey], enabled: userEnabled})

  useEffect(() => {
    const checkUser = async () => {
      // если токен существует
      const token = localStorage.getItem('access_token')
      console.log(token)
      // if (token){
      //   try {
      //     // проверяем активен ли токен
          
      //     const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/user/' + token);
      //     const data = response.data


      //   } catch (error) {
      //     console.error('Error:', error);
      //   }
      // }
    }

    checkUser()
  }, [])

  return (
    <div className={blockScroll? "App blockScroll" : "App"}>
      <Header scrollCallback={scrollCallback}/>

      <main>
        <Routes>
          <Route path='/' element={<MainPage scrollCallback = {scrollCallback}/>} />

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
      
    </div>
  );
}

export default App;