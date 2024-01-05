import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

const useUserData = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [tokenExp, setTokenExp] = useState(null);
   

    const token = localStorage.getItem("token");
    const fetchData = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        await axios.post('http://127.0.0.1:8000/api/me')
        .then((response) => {
            setUserData(response.data);
        })
    }

    useEffect(() => {
        if(!token){
            navigate('/')
        }
        else {
           
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; 
            if (decodedToken.exp < currentTime) {
              localStorage.removeItem('token'); 
              navigate('/login');
            } else {
              const remainingTimeInSeconds = decodedToken.exp - currentTime;
              setTokenExp(remainingTimeInSeconds);
              fetchData('');
            }
          }

    }, []);
    return {userData, tokenExp};
};

export default useUserData;
