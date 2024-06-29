import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.scss';


import Header from '@/components/header/header';

import MainPage from '@/pages/mainPage/mainPage';

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <Routes>
          <Route path='/' Component={MainPage}></Route>
        </Routes>
      </main>
      
    </div>
  );
}

export default App;