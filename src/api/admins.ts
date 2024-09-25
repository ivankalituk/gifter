import axios from "axios";

// получение пользователей для поиска за почтой
export async function getAdminsByEmailFragment(data:any) {
    try{
        const response = await axios.post('http://192.168.0.105:1000/admins/email', {email: data.email});
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}