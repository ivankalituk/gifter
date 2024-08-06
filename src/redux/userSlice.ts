import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    user_role: null,
    user_id: null,
    user_email: null
}

const userSlice = createSlice({
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
export default userSlice.reducer