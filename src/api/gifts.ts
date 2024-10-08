import { Gift, giftName } from "@/interfaces/interface";
import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

// получить все подарки по тегам
export async function getAllGifts(): Promise<Gift[]> {
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

// получение массива имён по фрагменту имени подарка
export async function getGiftNameByName(name: string): Promise<giftName[]> {
    try {
        const response = await axios.post<giftName[]>('http://localhost:1000/gift/name', {name: name});

        return response.data
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
export async function getAllGiftsByTags(tags: string[], sort: string, byName: string):Promise<Gift[] | undefined> {
    try{
        return await axios.post<Gift[] | undefined>(serverUrl + '/gift/tags', {tags: tags, sort: sort, byName: byName}).then(({data}) => data);
    } catch (error){
        if (axios.isAxiosError(error)){
            console.error("ERROR WHITE GETTING DATA:", error.message)
        } else {
            console.error("UNEXPECRED ERROR:", error)
        }
    }
}

// получение всех данных по айди создателя
export async function getAllGiftsByCreatorId(creator_id: number | null): Promise<Gift[]> {
    try {
        const response = await axios.get<Gift[]>(`http://localhost:1000/gift/creator/${creator_id}`);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Ошибка при получении данных:", error.message);
        } else {
            console.error("Неожиданная ошибка:", error);
        }
        return [];
    }
}

// получение подарка по его айди
export async function getGiftById(data: any) {
    try{
        const response = await axios.get('http://localhost:1000/gift/' + data.gift_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// создание подарка 
export async function postGift(data: any) {
    try{
        await axios.post('http://localhost:1000/gift', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// получение айди рандомного подарка
export async function gerRandomGiftId() {
    try {
        const response = await axios.get(`http://localhost:1000/gift-random`);
        return response.data; 
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Ошибка при получении данных:", error.message);
        } else {
            console.error("Неожиданная ошибка:", error);
        }
        return [];
    }
}