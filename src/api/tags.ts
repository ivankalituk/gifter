import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

export async function getTagByInput(data: any) {
    try{
        return await axios.post('http://192.168.0.105:1000/tagName', data).then(({data}) => data);
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}