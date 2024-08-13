import { createSlice, PayloadAction } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { UserState } from "@/interfaces/interface";

const  initialState: UserState = {
    user_nickName: null,
    user_imgUrl: null,
=======

interface UserState {
    user_nickname: string | null,
    user_imageURL: string | null,
    user_role: number | null,
    user_id: number | null,
    user_email: string | null
}

const initialState: UserState = {
    user_nickname: null,
    user_imageURL: null,
>>>>>>> 4ce593b2430cbe87a12c6fbedde1ed577b38fab0
    user_role: null,
    user_id: null,
    user_email: null
}

const userSlice = createSlice({
<<<<<<< HEAD
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user_nickName = action.payload.user_nickName;
            state.user_imgUrl = action.payload.user_imgUrl;
            state.user_role = action.payload.user_role;
            state.user_id = action.payload.user_id;
            state.user_email = action.payload.user_email
        },
        
        clearUser: (state) => {
            state.user_nickName = null;
            state.user_imgUrl = null;
            state.user_role = null;
            state.user_id = null;
            state.user_email = null;
        },

        setUserNickname: (state, action) => {
            state.user_nickName = action.payload.user_nickName
        },

        setUserImgPath:  (state, action) => {
            state.user_imgUrl = action.payload.user_imgUrl
        }
        
    }
})

export const {setUser, clearUser, setUserNickname, setUserImgPath} = userSlice.actions
=======
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action: PayloadAction<UserState>) =>{
            state.user_nickname = action.payload.user_nickname
            state.user_imageURL = action.payload.user_imageURL
            state.user_role = action.payload.user_role
            state.user_id = action.payload.user_id
            state.user_email = action.payload.user_email
        },

        clearUser: (state) =>{
            state.user_nickname = null
            state.user_imageURL = null
            state.user_role = null
            state.user_id = null
            state.user_email = null
        },
    }
})


export const {setUser, clearUser} = userSlice.actions
>>>>>>> 4ce593b2430cbe87a12c6fbedde1ed577b38fab0
export default userSlice.reducer