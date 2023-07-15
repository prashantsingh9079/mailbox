import React from 'react'
import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}
