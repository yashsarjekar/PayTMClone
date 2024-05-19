import { useEffect, useState } from "react";
import NavbarLink from "./NavbarLink";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function UsersList(){
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const [search, setSearch] = useState("");

    useEffect(()=>{
        async function fetch_data(){
            const response = await axios.get("http://localhost:3000/users", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.success){
                setUsers(response.data.result)
            }
        }
        fetch_data();
    }, [location.pathname]);

    async function fetch_user_data(){
        try{
            const response = await axios.get(`http://localhost:3000/search?filter=${search}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.success){
                setUsers(response.data.user)
            }else {
                setUsers([]); // Reset the users list if no results
            }
        }catch(error){
            alert("Internal Server Error")
        }
    }
    const handleKeyPress = (event)=>{
        if (event.key === 'Enter'){
            event.preventDefault();
            fetch_user_data();
        }
    }



    return <>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
        <label for="table-search" className="sr-only">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input onChange={(e)=>{
                setSearch(e.target.value);
            }} onKeyDown={handleKeyPress} type="text" id="table-search-users" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
        </div>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {users.map((record)=>{
                return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="w-10 h-10 rounded-full bg-slate-500 text-center ">
                        <div className="text-white text-xl pt-1">
                            {record.firstname[0]} 
                        </div>
                    </div>
                    <div className="ps-3">
                        <div className="text-base font-semibold">{`${record.firstname} ${record.lastname}`}</div>
                        <div className="font-normal text-gray-500">{record.email}</div>
                    </div>  
                </th>
                <td className="px-6 py-4">
                    {console.log(record._id)}
                    <NavbarLink 
                     class_names={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}
                     to={'/dashboard/transfer'} 
                     id={"send_money"}
                     text_of_link={"Send Money"}
                     stateing={record._id}></NavbarLink>
                </td>
            </tr>
            })}
            
        </tbody>
    </table>
</div>

    </>
}