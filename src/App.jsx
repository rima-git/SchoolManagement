import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddStu from './Pages/Master/AddStu'
import GetStu from './Pages/Master/GetStu'
import LogIn from './Pages/Master/LogIn'
import Menu from './Pages/Master/Menu'

function App() {

  const [count, setCount] = useState(0)
  const [token, setToken] = useState('')


  useEffect(() => {
    const getToken = async () => {
      const tokaen = localStorage.getItem("token");
      console.log(tokaen);
      setToken(tokaen);
    };
    getToken();
  }, []);



  return (
    
    <>
      {token ? <Menu /> : <LogIn />}
    </>

  )
}

export default App