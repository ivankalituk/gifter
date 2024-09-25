import axios from "axios";

// получение пользователей для поиска за почтой
export async function getAdminsByEmailFragment(data:any) {
    try{
        const response = await axios.post('http://192.168.0.105:1000/admins', {email: data.email});
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function getAdminsDataByEmailFragment(data:any) {
    try{
        const response = await axios.post('http://192.168.0.105:1000/admins/email', {email: data.email});
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function patchAdminLevel(data:any) {
    try{
        const response = await axios.put('http://192.168.0.105:1000/admins/leveling', {user_id: data.user_id, operation: data.operation});
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}