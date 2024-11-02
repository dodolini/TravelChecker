import React, {useState} from "react";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

interface UserData {
    email: string;
    password: string;
}

export const Login: React.FC = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<UserData>({
        email: '',
        password: ''
    })

    const loginUser = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault();
        const {email, password} = data
        try {
            const {data} = await axios.post('/login', {
                email,
                password
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({
                    email: '',
                    password: ''
                })
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <>
            <Navbar/>
            <div id="userForm">
                <form onSubmit={loginUser} className="userForm">
                    <div className="input">
                        <label>Email</label>
                        <input type="email" placeholder="enter email..." value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                    </div>
                    <div className="input">
                        <label>Password</label>
                        <input type="password" placeholder="enter password..." value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                    </div>
                    <button type="submit" className="submitButton">Login</button>
                </form>
            </div>
        </>
        
    )
}