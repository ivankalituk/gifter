import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

// получить все подарки по тегам
export async function getAllGifts() {
    try{
        return await axios.get('http://localhost:1000/gift').then(({data}) => data);
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// получение всех подарков по массиву тегов (если массив пуст, то любые подарки)
export async function getAllGiftsByTags(data: string[]) {
    try{
        console.log(data)
        return await axios.post('http://localhost:1000/gift/tags', {tags: data}).then(({data}) => data);
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}
