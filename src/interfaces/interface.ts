// для пользователя в редакс
export interface UserState {
        user_nickName: null | string,
        user_imgUrl: null | string,
        user_role: null | number,
        user_id: null | number,
        user_email: null | string
}

// для селетора пользователя в редаксе
export interface RootState {
        user: UserState;
}
