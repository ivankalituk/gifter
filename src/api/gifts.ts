import { Gift } from "@/interfaces/interface";
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

// получить все подарки по тегам
export async function getAllGifts(): Promise<Gift[] | undefined> {
    try {
        const response = await axios.get<{ data: Gift[] }>('http://localhost:1000/gift').then(({data}) => data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error getting data:", error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        return [];
    }
}

// получение всех подарков по массиву тегов (если массив пуст, то любые подарки)
export async function getAllGiftsByTags(data: string[]):Promise<Gift[] | undefined> {
    try{
        return await axios.post<Gift[] | undefined>('http://localhost:1000/gift/tags', {tags: data}).then(({data}) => data);
    } catch (error){
        if (axios.isAxiosError(error)){
            console.log("ERROR WHITE GETTING DATA:", error.message)
        } else {
            console.error("UNEXPECRED ERROR:", error)
        }
    }
}
