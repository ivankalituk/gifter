import axios from "axios";

// тогл для отмеченных подарков
export async function toggleBookmark(data: any){
    try{
        const response = await axios.post('http://localhost:1000/bookmark/toggle', {user_id: data.user_id, gift_id: data.gift_id});
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// получение всех отмеченных подарков пользователя
export async function getUserBookmarks(data: any){
    try{
        const response = await axios.get('http://localhost:1000/bookmarks/' + data.user_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}