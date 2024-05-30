import { useState } from "react";
import BottomMessage from "./BottomMessage";
import Heading from "./Heading";
import InputField from "./InputField";
import Subheading from "./Subheading";
import SubmitButton from "./SubmitButton";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ServerConfig from "../ServerConfig";

export default function Signup() {
    const [first_name_var, setFirstName] = useState("");
    const [last_name_var, setLastName] = useState("");
    const [username_var, setUsername] = useState("");
    const [email_var, setEmail] = useState("");
    const [password_var, setPassword] = useState("");
    const [age_var, setAge] = useState(0);
    const navigate = useNavigate()

    const signup = async ()=>{
        try{
            const response = await axios.post(`http://${ServerConfig.serverconfig}/signup`, {
                firstname: first_name_var,
                lastname: last_name_var,
                username: username_var,
                email: email_var,
                password: password_var,
                age: parseInt(age_var)
            });
            console.log(response.data)
            if (response.data.success == true){
                alert(response.data.message);
                navigate('/login');
            }else{
                alert("Internal Server Error");
            }
        }catch(error){
            alert("Internal Server Error");
        }
    }


    return <div>
        <Navbar></Navbar>
        <div className='flex flex-col justify-center items-center p-20 '>
            <div className='flex flex-col justify-center rounded-lg bg-white w-80 boarder border-gray-500 shadow text-center items-center'>
                <Heading label={"Sign up"}></Heading>
                <Subheading label={"Here you can register yourself"}></Subheading>
                <InputField onChange={(e)=>{
                    setFirstName(e.target.value);
                }} type={"text"} label={"First Name"} placeholder={"Enter first Name"} id={"first_name"}></InputField>
                <InputField onChange={(e)=>{
                    setLastName(e.target.value);
                }} type={"text"}  label={"Last Name"} placeholder={"Enter last Name"} id={"last_name"}></InputField>
                <InputField onChange={(e)=>{
                    setUsername(e.target.value);
                }} type={"text"} label={"Username"} placeholder={"Enter Username"} id={"username"}></InputField>
                <InputField onChange={(e)=>{
                    setEmail(e.target.value);
                }} type={"text"} label={"Email"} placeholder={"Enter Email"} id={"email"}></InputField>
                <InputField onChange={(e)=>{
                    setPassword(e.target.value);
                }} type={"password"} label={"Password"} placeholder={"Enter Password"} id={"password"}></InputField>
                <InputField onChange={(e)=>{
                    setAge(e.target.value);
                }} type={"number"} label={"Age"} placeholder={"Enter Age"} id={"age"}></InputField>
                <SubmitButton onClick={signup} button_name={"Submit"} id={"register"}></SubmitButton>
                <BottomMessage label={"Already have an account?"} to={'/login'} id="login" text_of_link={"Login"}></BottomMessage>
            </div>
            
        </div>
    </div>
}