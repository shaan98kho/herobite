"use client"

import { useEffect, useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import GenericForm from "@/components/GenericForm"
import Toast from "@/components/Toast"

import { FiLoader } from "react-icons/fi"
import { FaEye, FaEyeSlash } from "react-icons/fa"

import { AuthSignUp } from "@/store/types"
import { useStore } from "@/store/useStore"

export default function SignUp() {
    const signUp = useStore(state => state.signUp)
    const success = useStore(state => state.success)
    const loading = useStore(state => state.loading)
    const [formData, setFormData] = useState<AuthSignUp>({
        email: '',
        password: '',
        role: "customer",
        name: '',
        phone: ''
    })
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [pwError, setPwError] = useState<string>()
    const [userRole, setuserRole] = useState<string>('')
    const [toastMsg, setToastMsg] = useState<string>('')
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowConfirm, setIsShowConfirm] = useState(false)
    const router = useRouter()

    const togglePassword = () => {
        setIsShowPassword((prev) => !prev)
    }

    const toggleConfirm = () => {
        setIsShowConfirm((prev) => !prev)
    }

    const clearInput = () => {
        setFormData(() => {
            return {
                email: '',
                password: '',                
                role: 'customer',
                name: '',
                phone: ''
            }
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.password !== confirmPassword) {
            setPwError("Passwords do not match!");
            return;
        } else {
            setPwError('')
            await signUp(formData)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(e.target.value)
    }

    useEffect(() => {
        success && setToastMsg("Successfully registered!")
    }, [success])

    return <>
        {toastMsg && <Toast message={toastMsg} onClose={() => {
            setToastMsg('')
            clearInput()
            router.replace("/auth/signIn")
        }}/>}

        <GenericForm onSubmit={handleSubmit}>
            <h1>Sign Up{userRole === '' && " As"}</h1>
            {userRole !== '' && 
                <p className="pb-6 microcopy">Changed your mind? Sign up as <span onClick={() => {{
                    setuserRole(userRole === "customer" ? "business_partner" : "customer")
                    clearInput()
                    setFormData({
                        ...formData,
                        role: userRole === "customer" ? "restaurant" : "customer"
                    })
                }}} className="highlight cursor-pointer underline">{userRole === "customer" ? "Business Partner" : "Customer"}</span> instead</p>
            }

            {userRole === '' && 
                <div className="m-auto">
                    <div className="flex gap-5 justify-center items-center">
                        <button className="btn" onClick={() => {
                            setuserRole("customer")
                            clearInput()
                            setFormData({
                                ...formData,
                                role: "customer"
                            })
                        }}>Customer</button>
                        <span className="font-bold">or</span>
                        <button className="btn" onClick={() => {
                            setuserRole("restaurant")
                            clearInput()
                            setFormData({
                                ...formData,
                                role: "restaurant"
                            })
                        }}>Business Partner</button>
                    </div>
                </div>
            }

            {userRole !== '' &&
                <div>
                    <div className="field-wrap">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="JohnDoe@mail.com"
                            required
                        />
                    </div>
                    <div className="field-wrap">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                        />
                    </div>
                    <div className="field-wrap">
                        <label htmlFor="name">Number</label>
                        <input 
                            type="phone"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+60 123456789"
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
                            minLength={6}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <div className="field-wrap">
                        <label htmlFor="confirmPassword">Confirm your password</label>
                        {isShowConfirm ? <FaEyeSlash onClick={toggleConfirm}/> : <FaEye onClick={toggleConfirm} />}
                        <input 
                            type={isShowConfirm ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            placeholder="Retype your password"
                            required
                        />
                    </div>
                    {pwError !== '' && <span className="error">{pwError}</span>}

                    <button type="submit" className="btn mt-9 w-full">{loading ? <FiLoader /> : "Sign Up"}</button>
                    <p className="pt-1 microcopy">Already have an account? <Link href="/auth/signIn" className="underline">Log In</Link></p>
                </div>
            }
        </GenericForm>
    </>
}