import { useState } from "react";
import { Overview } from "./Overview";
import { Sidebar } from "./Sidebar";
import axios from "axios";
import { useEffect } from "react";
import React, { Suspense } from 'react'
import CreditFunds from "./CreditFunds";
import DebitFunds from "./DebitFunds";
import Transactions from "./Transactions";
import TransferFunds from "./TransferFunds";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Logout from "./Logout";
import ServerConfig from "../ServerConfig";

export default function Dashboard() {
    const [data_var, setData] = useState({});
    const location = useLocation();
    const dashboard_routes = [
        {
          route: 'overview',
          component: <Suspense fallback={"loading..."}><Overview dashboard_data={data_var}></Overview></Suspense>
        },
        {
          route: 'credit',
          component: <Suspense fallback={"loading..."}><CreditFunds></CreditFunds></Suspense>
        },
        {
          route: 'debit',
          component: <Suspense fallback={"loading..."}><DebitFunds></DebitFunds></Suspense>
        },
        {
          route: 'transactions',
          component: <Suspense fallback={"loading..."}><Transactions></Transactions></Suspense>
        },
        {
          route: 'transfer',
          component: <Suspense fallback={"loading..."}><TransferFunds></TransferFunds></Suspense>
        },
        {
            route: 'logout',
            component: <Suspense fallback={"loading..."}><Logout></Logout></Suspense>
        }
      ]
    useEffect(()=>{
        async function fetch_data(){
            const response = await axios.get(`http://${ServerConfig.serverconfig}/dashboard`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.success){
                setData(response.data.result)
            }
        }
        fetch_data();
    }, [location.pathname])

    return <>
        {data_var? <>
            <Sidebar dashboard_data={data_var}></Sidebar>
            <div className='p-4 sm:ml-64 pt-10'>
                <>
                    <Routes>
                    {
                        dashboard_routes.map((record)=>{
                            return <Route path={record.route} element={record.component}/>
                        })
                    }
                    </Routes>
                </>
            </div>
        </>: null}
        
    </>
}