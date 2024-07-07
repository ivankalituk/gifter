import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';


import Header from '@/components/header/header';

import MainPage from '@/pages/mainPage/mainPage';
import SuggestPage from './pages/suggestPage/suggestPage';

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
          <Route path='/' element={<MainPage scrollCallback = {scrollCallback}/>}></Route>

          {/* PROTECTED AUTH */}
          <Route path='/suggest' element={<SuggestPage/>}></Route>

        </Routes>
      </main>
      
    </div>
  );
}

export default App;