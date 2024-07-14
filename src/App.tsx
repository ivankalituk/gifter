import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';


import Header from '@/components/header/header';

import MainPage from '@/pages/mainPage/mainPage';
import SuggestPage from './pages/suggestPage/suggestPage';
import ProfilePage from './pages/profilePage/profilePage';

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
    
          {/* ДВА РАЗНЫХ РОУТА НА ПРОФИЛЬ, ПЕРВЫЙ ДЛЯ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ, ВТОРОЙ ТОЛЬКО ДЛЯ СВОЕГО ПРОФИЛЯ */}
          <Route path='/profile' element={<ProfilePage scrollCallback = {scrollCallback} type={'anyUser'}/>} />


          {/* PROTECRED AUTH ROLE */}

        </Routes>
      </main>
      
    </div>
  );
}

export default App;