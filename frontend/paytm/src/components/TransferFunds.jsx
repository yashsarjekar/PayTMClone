import { useLocation, useNavigate } from "react-router-dom";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import ServerConfig from "../ServerConfig";

export default function TransferFunds() {
    const location = useLocation();
    const to_id = location.state;
    const [to_data, setToData] = useState({});
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetch_data(){
            const response = await axios.get(`http://${ServerConfig.serverconfig}/user_based_on_id`, {
                params: {
                    to_id:to_id
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.success){
                console.log(response.data.result)
                setToData(response.data.result[0])
            }
        }
        fetch_data();
    }, []);

    const transfer = async ()=>{
        try{
            const response = await axios.post(`http://${ServerConfig.serverconfig}/transferfund`, {
                to: to_id,
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.success == true){
                alert("Amount Send Successfully")
                navigate('/dashboard/overview');
            }

        }catch(error){
            alert("Internal Server Error");
        }
    }

    return <div className="flex flex-col mx-auto mt-20 w-80 h-100 bg-white rounded shadow-lg p-10 items-center">
    <div className="flex font-bold text-2xl">
        Send Money
    </div>
    <div className="flex flex-col justify-between pt-10 items-center">
        <div className="font-semibold">
           Amount in (₹)
        </div>
        
        <div>
            <InputField onChange={(e)=>{
                   setAmount(e.target.value)
                }} type={"text"} label={"Amount will be send from your wallet"} placeholder={"Enter Amount"} id={"amount"}>

                </InputField>
        </div>
        <div className="flex p-2">
            <div className="w-10 h-10 rounded-full bg-slate-500 text-center ">
                <div className="text-white text-xl pt-1">
                    {to_data.firstname? to_data.firstname.slice(0,1): null}
                </div>
            </div>
            <div className="ps-3">
                <div className="text-base font-semibold">{`${to_data.firstname} ${to_data.lastname}`}</div>
                <div className="font-normal text-gray-500">{to_data.email}</div>
            </div>  
        </div>
        <div>
            <SubmitButton onClick={transfer} button_name={"Send Money"} id={"transfer"}></SubmitButton>
        </div>
        
    </div>
</div>
}