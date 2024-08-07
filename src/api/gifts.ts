import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

export async function getAllGifts() {
    try{
        console.log(serverUrl + '/gift')
        return await axios.get('http://localhost:1000/gift').then(({data}) => data);
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}