"use client"

import { login } from "@/app/actions";
import { useRouter } from "next/navigation";

import { useState } from "react";

const LoginForm = () => {
    const [error, setError] = useState("")
    const router = useRouter()

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try {
            const formData = new FormData(event.currentTarget)
            const response = await login(formData)
            console.log(response);
            if(!!response.error){
                setError(response.error)
            }else{
                router.push("/bookings")
            }
            
            
        } catch (err) {
        setError(err.message) 
        }

    }
    return (
        <>
        {error && (<div className="text-xl text-red-500 text-center">{error}</div>)}
        <form className='login-form' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email Adddress</label>
                <input type="email" id='email' name='email'  />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' />
            </div>
            <button type='submit' className="btn-primary w-full mt-4">Login</button>
        </form>
        </>
    );
};

export default LoginForm;