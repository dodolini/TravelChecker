import React, {useState} from "react";
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";

interface UserData {
    name: string;
    email: string;
    password: string;
}

export const Register: React.FC = () => {
    const navigate = useNavigate()
    const [data, setData] = useState<UserData>({
        name: '',
        email: '',
        password: ''
    })

    const registerUser = async (e: React.SyntheticEvent<EventTarget>) => {
        e.preventDefault()
        const {name, email, password} = data
        try {
            const {data} = await axios.post('/register', {
                name, email, password
            })
            if(data.error) {
                toast.error(data.error)
            } else {
                setData({
                    name: '',
                    email: '',
                    password: ''
                })
                toast.success("Register successful. Welcome !")
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <Navbar/>
            <div id="userForm">
                <form onSubmit={registerUser} className="userForm">
                    <div className="input">
                        <label>Name</label>
                        <input type="text" placeholder="enter name..." value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                    </div>
                    <div className="input">
                        <label>Email</label>
                        <input type="email" placeholder="enter email..." value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                    </div>
                    <div className="input">
                        <label>Password</label>
                        <input type="password" placeholder="enter password..." value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                    </div>
                    <button type="submit" className="submitButton">Register</button>
                </form>
            </div>
        </>
    )
}