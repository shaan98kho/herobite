"use client"

import { useEffect, useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import GenericForm from "@/components/genericForm"

import { FiLoader } from "react-icons/fi"

interface UserData {
    email: string,
    password: string,
}

export default function Login() {
    const [formData, setFormData] = useState<UserData>({
        email: '',
        password: '',
    });
    const router = useRouter()


    const handleSubmit = () => {
        const payload = {
            email: formData.email,
            password: formData.password
        }

        
    }

    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return <>
        <GenericForm onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <div className="field-wrap">
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div className="field-wrap">
                <label htmlFor="password">Password</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
            </div>
            <p className="microcopy pt-2">Forgot password</p>
            
            <button type="submit" onClick={handleSubmit} className="btn mt-9 w-full">Sign In</button>
            <p className="pt-2 microcopy">Don't have an account yet? <Link href="/auth/signUp" className="underline">Sign Up</Link></p>
        </GenericForm>
    </>
}