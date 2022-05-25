import {USER_URL} from './URL'
import axios from "axios";

export function loadUser(){
    let apiUrl=USER_URL
    return axios.get(apiUrl)
}

export function addUser(userData){
    let apiUrl=USER_URL
    return axios.post(apiUrl,userData)
}

export function deleteUser(id){
    let apiUrl=`${USER_URL}/delete/${id}`
    return axios.delete(apiUrl)
}

export function editUser(userId,userData){
    let apiUrl=`${USER_URL}/${userId}`
    return axios.post(apiUrl,userData)
}