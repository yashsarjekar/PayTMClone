import Heading from "./Heading";
import InputField from "./InputField";
import Subheading from "./Subheading";
import SubmitButton from "./SubmitButton";
import BottomMessage from "./BottomMessage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


export default function Login() {
    const [email_var, setEmail] = useState("");
    const [password_var, setPassword] = useState("");
    const navigate = useNavigate()
    useEffect(()=>{

        localStorage.removeItem('token');
    },[])
    const login = async ()=>{
        try{
            const response = await axios.post("http://localhost:3000/login", {
                email: email_var,
                password: password_var
            });
            if (response.data.success == true){
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard/overview');
            }

        }catch(error){
            alert("Internal Server Error");
        }
    }


    return <div>
    <Navbar></Navbar>
    <div className='flex flex-col justify-center items-center p-20'>
        <div className='flex flex-col justify-center rounded-lg bg-white w-80 boarder border-gray-500 shadow text-center items-center'>
            <Heading label={"Sign In"}></Heading>
            <Subheading label={"Here you can login yourself"}></Subheading>
            <InputField onChange={(e)=>{
                setEmail(e.target.value);
            }} type={"text"} label={"Email"} placeholder={"Enter Email"} id={"email"}></InputField>
            <InputField onChange={(e)=>{
                setPassword(e.target.value);
            }} type={"password"} label={"Password"} placeholder={"Enter Password"} id={"password"}></InputField>
            <SubmitButton onClick={login} button_name={"Submit"} id={"login"}></SubmitButton>
            <BottomMessage label={"Do you have account?"} to={'/signup'} id="signup" text_of_link={"Sign Up"}></BottomMessage>
        </div>
        
    </div>
</div>
}