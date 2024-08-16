import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

// получить все подарки по тегам
export async function createSuggest(data: any) {
    try{
        return await axios.post('http://localhost:1000/suggest', data).then(({data}) => data);
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}
