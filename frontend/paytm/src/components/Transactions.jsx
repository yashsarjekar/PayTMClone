import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const location = useLocation();

    useEffect(()=>{
        async function fetch_data(){
            const response = await axios.get("http://localhost:3000/transactions", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.success){
                setTransactions(response.data.result)
            }
        }
        fetch_data();
    }, [location.pathname]);

    console.log(transactions)
    return <div>
         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    From/To
                </th>
                <th scope="col" className="px-6 py-3">
                    Credited/Debited
                </th>
                <th scope="col" className="px-6 py-3">
                    Balance
                </th>
                <th scope="col" className="px-6 py-3">
                    Amount
                </th>
            </tr>
        </thead>
        <tbody>
            {transactions.map((record)=>{
                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="w-10 h-10 rounded-full bg-slate-500 text-center ">
                        <div className="text-white text-xl pt-1">
                            {record.second_user? record.second_user[0]: "T"} 
                        </div>
                    </div>
                    <div className="ps-3">
                        <div className="text-base font-semibold">{record.second_user? record.second_user: "Transaction"}</div>
                    </div>  
                </th>
                <td className="px-6 py-4">
                    {record.is_credited? <div className="flex"><div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 mt-1"></div> {"Credited"} </div> : <div className="flex"><div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2 mt-1"></div> {"Debited"}</div>}
                </td>
                <td className="px-6 py-4">
                    {record.balance}
                </td>
                <td className="px-6 py-4">
                    {record.amount}
                </td>
            </tr>
            })}
            
        </tbody>
    </table>
    </div>
}