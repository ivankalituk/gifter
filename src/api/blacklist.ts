import axios from "axios";

// получение всех пользователей в чёрном списке
export async function getBlacklist() {
    try{
        const response = await axios.get('http://localhost:1000/blacklist');
        // console.log(response.data)
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}


// получение пользователей для поиска за почтой
export async function getUsersByEmailPiece(data:any) {
    try{
        const response = await axios.post('http://localhost:1000/blacklist/email', {email: data.email});
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function getUsersByEmail(data:any) {
    try{
        const response = await axios.post('http://localhost:1000/blacklist/users/email', {email: data.email});
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function deleteUserBlacklist(data:any) {
    try{
        const response = await axios.delete('http://localhost:1000/blacklist/user/' + data.user_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// добавить в чёрный список
export async function insertBlacklist(data:any) {
    try{
        await axios.post('http://localhost:1000/blacklist-add', {user_id: data.user_id});
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}