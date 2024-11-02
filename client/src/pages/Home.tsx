import React from "react";
import '../App.css'
import { Navbar } from "../components/Navbar";

export const Home: React.FC = () => {
    return (
        <div id="home">
            <Navbar/>
            <img src="../../public/home_image.png"></img>
            <h1>Welcome to our app TRAVEL CHECKER!</h1>
            <p>Manage your countries you have been to or you want to visit.</p>
            <p>Add friends and share your countries with them!</p>
            <footer>© Copiright 2024</footer>
        </div>
    )
}