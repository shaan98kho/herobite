"use client"

import { useEffect, useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import GenericForm from "@/components/genericForm"
import Toast from "@/components/toast"

import { FiLoader } from "react-icons/fi"

interface UserData {
    email: string,
    password: string,
    role:string,
    address: string,

    // fields specific to business partners
    business_name?: string,
    business_id?: string,
    business_type?: string,
    inventory_count?: number,

    // fields specific to customers
    coins?: number,
    completed_module?: number,
    name?: string
}

export default function SignUp() {
    const [formData, setFormData] = useState<UserData>({
        email: '',
        password: '',
        role: '',
        address: '',

        // fields specific to business partners
        business_name: '',
        business_id: '',
        business_type: '',
        inventory_count: 0,

        // fields specific to customers
        coins: 0,
        completed_module: 0,
        name: ''
    });
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [pwError, setPwError] = useState<string>()
    const [userRole, setuserRole] = useState<string>('')
    const [toastMsg, setToastMsg] = useState<string>('')
    const router = useRouter()


    const clearInput = () => {
        setFormData(() => {
            return {
                email: '',
                password: '',
                address: '',
                role: '',

                // fields specific to business partners
                business_name: '',
                business_id: '',
                business_type: '',
                inventory_count: 0,

                // fields specific to customers
                coins: 0,
                completed_module: 0,
                name: ''
            }
        })
    }

    const handleSubmit = () => {
        if (formData.password !== confirmPassword) {
            setPwError("Passwords do not match!");
            return;
        } else {
            setPwError('')
            
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

    return <>
        {toastMsg && <Toast message={toastMsg} onClose={() => {
            setToastMsg('')
            clearInput()
            router.replace("/auth/login")
        }}/>}

        <GenericForm onSubmit={handleSubmit}>
            <h1>Sign Up{userRole === '' && " As"}</h1>
            {userRole !== '' && 
                <p className="pb-6 microcopy">Changed your mind? Sign up as <span onClick={() => {{
                    setuserRole(userRole === "customer" ? "business_partner" : "customer")
                    clearInput()
                    setFormData({
                        ...formData,
                        role: userRole === "customer" ? "business_partner" : "customer"
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
                            setuserRole("business_partner")
                            clearInput()
                            setFormData({
                                ...formData,
                                role: "business_partner"
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
                    {userRole === "customer" &&
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
                    }
                    <div className="field-wrap">
                        <label htmlFor="address">Address</label>
                        <input 
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            required
                        />
                    </div>
                    {userRole === "business_partner" && 
                        <>
                            <div className="field-wrap">
                                <label htmlFor="">Business Type</label>
                                <select name="business_type" 
                                    id="business_type"
                                    value={formData.business_type}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a role</option>
                                    <option value="restaurant">Restaurant Owner</option>
                                    <option value="supplier">Fresh Supplier</option>
                                </select>
                            </div>
                            <div className="field-wrap">
                                <label htmlFor="business_name">Business Name</label>
                                <input 
                                    type="text"
                                    id="business_name"
                                    name="business_name"
                                    value={formData.business_name}
                                    onChange={handleChange}
                                    placeholder="Enter your business name"
                                    required
                                />
                            </div>
                            <div className="field-wrap">
                                <label htmlFor="business_id">Business ID</label>
                                <input 
                                    type="text"
                                    id="business_id"
                                    name="business_id"
                                    value={formData.business_id}
                                    onChange={handleChange}
                                    placeholder="Enter your business ID"
                                    required
                                />
                            </div>
                        </>
                    }
                    <div className="field-wrap">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
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
                        <input 
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            placeholder="Retype your password"
                            required
                        />
                    </div>
                    {pwError !== '' && <span className="error">{pwError}</span>}

                    <button type="submit" className="btn mt-9 w-full">Sign Up</button>
                    <p className="pt-1 microcopy">Already have an account? <Link href="/auth/login" className="underline">Log In</Link></p>
                </div>
            }
        </GenericForm>
    </>
}