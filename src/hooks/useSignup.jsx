import axios from "axios";
import { useAuth } from "../context/AuthContext";
import React from 'react'
import { useState } from "react";

const useSignup = () => {
    const { login } = useAuth()
    const [errorSignup, setErrorSignup] = useState(null)

    const registerUser = async (values) => {

        try {
            setErrorSignup(null)

            const res = await axios.post("http://localhost:3000/auth/signup", values)

            if (res.status === 200) {
                login(res.data.token, res.data.user)
                console.log(res.data.message)
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response.data.message)
                console.log(err.response.data.message)
            }
            else console.log(err)
        }
    }

    return { errorSignup, registerUser }

}

export default useSignup