import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import InputField from "./InputField";
import ServerConfig from "../ServerConfig";

export default function DebitFunds() {
    const [amount, setAmount] = useState(0);
    const [data_var, setData] = useState({});
    const navigate = useNavigate();
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
    }, []);
    const debit = async ()=>{
        try{
            const response = await axios.post(`http://${ServerConfig.serverconfig}/debit`, {
                amount: parseFloat(amount)
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.success == true){
                alert("Amount Debited Successfully")
                navigate('/dashboard/overview');
            }

        }catch(error){
            alert("Internal Server Error");
        }
    }

    return <div className="flex flex-col mx-auto mt-20 w-80 h-80 bg-white rounded shadow-lg p-10 items-center">
    <div className="flex font-bold text-2xl">
        Debit Money
    </div>
    <div className="flex flex-col justify-between pt-10 items-center">
        <div className="font-semibold">
           Amount in (₹)
        </div>
        <div>
            <InputField onChange={(e)=>{
                    setAmount(e.target.value);
                }} type={"text"} label={`Wallet Balance is ${data_var["balance"]}`} placeholder={"Enter Amount"} id={"amount"}></InputField>
        </div>
        <div>
            <SubmitButton onClick={debit} button_name={"Debit"} id={"debit"}></SubmitButton>
        </div>
        
    </div>
</div>
}