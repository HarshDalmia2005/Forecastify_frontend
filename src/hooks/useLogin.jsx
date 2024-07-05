import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";


const useLogin = () => {
    const { login,userData } = useAuth()
    const [errorLogin, setErrorLogin] = useState(null)

    const loginUser = async (values) => {

        try {
            setErrorLogin(null)

            const res = await axios.post("https://localhost:3000/users/login", values)
            console.log(res)
            if (res.status === 200) {
                login(res.data.token, res.data.user)
                console.log(res.data.message)
                console.log(res.data.user)
            }


        } catch (err) {

            if (axios.isAxiosError(err)) {
                setErrorLogin(err.response.data.message)
                console.log(err.response.data.message)
            }
            else console.log(err)
        }
    }

    return { errorLogin, loginUser}

}

export default useLogin