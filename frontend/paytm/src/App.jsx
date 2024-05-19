import React, { Suspense, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Signup from './components/Signup'
import Login from './components/Login'
import CreditFunds from './components/CreditFunds'
import DebitFunds from './components/DebitFunds'
import Transactions from './components/Transactions'
import TransferFunds from './components/TransferFunds'
import LandingPage from './components/LandingPage'

function App() {
 
  const routes = [
    {
      route: '/',
      component: <Suspense fallback={"loading..."}><LandingPage></LandingPage></Suspense>
    },
    {
      route: '/dashboard/*',
      component: <Suspense fallback={"loading..."}><Dashboard></Dashboard></Suspense>
    },
    {
      route: '/signup',
      component: <Suspense fallback={"loading..."}><Signup></Signup></Suspense>
    },
    {
      route: '/login',
      component: <Suspense fallback={"loading..."}><Login></Login></Suspense>
    }
  ]

  return (
    <>
      <BrowserRouter>   
        <Routes>
          {
            routes.map((record)=>{
              return <Route path={record.route} element={record.component}/>
            })
          }
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
