import React from "react";
import axios from "axios";


export default function Api() {

    const userInfo = localStorage.getItem('userInfo');
    const user = JSON.parse(userInfo);

    const http = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${user?.token}`
        },
    });

    return {
        http
    }
}
