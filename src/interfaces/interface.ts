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

// -----------------------------------------------------------------------------
// --------------------------ДЛЯ ЗАПРОСОВ НА СЕРВЕР-----------------------------
// -----------------------------------------------------------------------------

// интерфейс подарка
export interface Gift {
        id: number | null,
        addData: string | null,
        appreciators: number | null,
        creatorId: number | null,
        name: string | null,
        photoPath: string | null,
        reating: number | null,
        tags: string | null,
        userViews: number | null
}

export interface Tag {
        id: number,
        text: string
}

export interface suggest {
        id: number,
        addData: string,
        creatorId: number,
        name: string
}

export interface suggestForPost {
        creatorId: number,
        name: string,
        description: string,
        tags: string[]
}
