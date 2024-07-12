import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';


import Header from '@/components/header/header';

import MainPage from '@/pages/mainPage/mainPage';
import SuggestPage from './pages/suggestPage/suggestPage';
import ProfilePage from './pages/profilePage/profilePage';
import AdminGiftpage from './pages/adminGiftPage/adminGiftPage';
import AdminBlacklistPage from './pages/adminBlacklistPage/adminBlacklistPage';

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
          <Route path='/profile' element={<ProfilePage/>} />

          {/* PROTECRED AUTH ROLE */}
          <Route path='/adminPanel/gifts' element = {<AdminGiftpage/>} />
          <Route path='/adminPanel/blacklist' element = {<AdminBlacklistPage/>} />

        </Routes>
      </main>
      
    </div>
  );
}

export default App;