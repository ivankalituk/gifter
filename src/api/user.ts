import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL

// получить пользователя
export async function getUserInfo(data:any) {
    try{
        return await axios.get('http://localhost:1000/user' + data.user_tocken).then(({data}) => data);
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// смена ника пользователя
export async function putUserNickname(data: any) {
    try{
        return await axios.put('http://localhost:1000/user/nickname', {nickname: data.nickname, user_id: data.user_id})
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// смена био пользователя
export async function putUserBio(data: any) {
    try{
        return await axios.put('http://localhost:1000/user/bio', {bio: data.bio, user_id: data.user_id})
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// смена тегов пользователя
export async function putUserTags(data: any) {
    try{
        return await axios.put('http://localhost:1000/user/tags', {tags: data.tags, user_id: data.user_id})
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// получить пользователя
export async function getUserTags(data:any) {
    try{
        const response = await axios.get('http://localhost:1000/user/tags/' + data.user_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

// 
export async function putUserPhoto(data: any) {
    try{
        return await axios.put('http://localhost:1000/user/photo', data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          }).then(({data}) => data);
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function getUserBio(data:any) {
    try{
        const response = await axios.get('http://localhost:1000/user/bio/' + data.user_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}

export async function getUserById(data:any) {
    try{
        const response = await axios.get('http://localhost:1000/user/' + data.user_id);
        return response.data
    } catch (error){
        console.log("ERROR WHITE GETTING DATA")
    }
}