import { useState } from "react";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreditFunds() {
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate()

    const credit = async ()=>{
        try{
            const response = await axios.post("http://localhost:3000/credit", {
                amount: parseFloat(amount)
            },{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            if (response.data.success == true){
                alert("Amount Credited Successfully");
                navigate('/dashboard/overview');
            }

        }catch(error){
            console.log(error)
            alert("Internal Server Error");
        }
    }

    return <div className="flex flex-col mx-auto mt-20 w-80 h-80 bg-white rounded shadow-lg p-10 items-center">
    <div className="flex font-bold text-2xl">
        Add Money
    </div>
    <div className="flex flex-col justify-between pt-10 items-center">
        <div className="font-semibold">
           Amount in (₹)
        </div>
        <div>
            <InputField onChange={(e)=>{
                    setAmount(e.target.value);
                }} type={"text"} label={"Amount will be added to wallet"} placeholder={"Enter Amount"} id={"amount"}></InputField>
        </div>
        <div>
            <SubmitButton onClick={credit} button_name={"Credit"} id={"credit"}></SubmitButton>
        </div>
        
    </div>
</div>
}