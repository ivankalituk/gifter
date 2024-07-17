import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';


import Header from '@/components/header/header';

import MainPage from '@/pages/mainPage/mainPage';
import SuggestPage from './pages/suggestPage/suggestPage';
import ProfilePage from './pages/profilePage/profilePage';
import SettingsPage from './pages/settingsPage/settingsPage';
import AdminSuggestsPage from './pages/adminSuggestsPage/adminSuggestsPage';

function App() {

  const [blockScroll, setBlockScroll] = useState<boolean>(false)

  const scrollCallback = (block: boolean) =>{
    setBlockScroll(block)
  }
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


        </Routes>
      </main>
      
    </div>
  );
}

export default App;