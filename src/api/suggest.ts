import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

// получить все подарки по тегам
export async function createSuggest(data: any) {
    try{
        return await axios.post('http://localhost:1000/suggest', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          }).then(({data}) => data);
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function getAllSuggests() {
    try{
        const response = await axios.get('http://localhost:1000/suggest');
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function getSuggestById(data: any) {
    try{
        const response = await axios.get('http://localhost:1000/suggest/' + data.suggest_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}