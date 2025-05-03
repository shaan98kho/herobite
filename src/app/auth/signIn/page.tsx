"use client"

import { useEffect, useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import GenericForm from "@/components/GenericForm"

import { FiLoader } from "react-icons/fi"
import { FaEye, FaEyeSlash } from "react-icons/fa"

import { AuthSignIn } from "@/store/types"
import { useStore } from '@/store/useStore'

export default function Login() {
    const signIn = useStore(state => state.signIn)
    const loading = useStore(state => state.loading)
    const success = useStore(state => state.success)
    const [formData, setFormData] = useState<AuthSignIn>({
        email: '',
        password: '',
    })
    const [isShowPassword, setIsShowPassword] = useState(false)
    const router = useRouter()

    const togglePassword = () => {
        setIsShowPassword((prev) => !prev)
    }

    const handleSubmit = async () => {
        await signIn(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        success && router.replace("/")
    }, [success])

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
                {isShowPassword ? <FaEyeSlash onClick={togglePassword}/> : <FaEye onClick={togglePassword}/>}
                <input 
                    type={isShowPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
            </div>
            <p className="microcopy pt-2">Forgot password</p>
            
            <button type="submit" onClick={handleSubmit} className="btn mt-9 w-full">{loading ? <FiLoader /> : "Sign In"}</button>
            <p className="pt-2 microcopy">Don't have an account yet? <Link href="/auth/signUp" className="underline">Sign Up</Link></p>
        </GenericForm>
    </>
}