import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

export async function getUserInfo(data:any) {
    try{
        return await axios.get('http://192.168.0.105:1000/user' + data.user_tocken).then(({data}) => data);
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}