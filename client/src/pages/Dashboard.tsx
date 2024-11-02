import React, {useContext, useLayoutEffect} from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import WorldMap from "../components/WordMap";

export const Dashboard: React.FC = () => {

    const {user, setUser} = useContext(UserContext)

    useLayoutEffect(() => {
        if (!user) {
          axios.get('/profile').then(({ data }) => {
            setUser(data);
          });
        }
      }, []);

    return (
        <div id="home">
            <WorldMap/>
        </div>
    )
}