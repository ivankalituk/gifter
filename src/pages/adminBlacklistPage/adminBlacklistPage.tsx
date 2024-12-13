import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import { FC, useEffect, useState } from "react";

import './adminBlacklistPage.scss'
import User from "./components/user/user";

import SearchBar from "@/components/searchBar/searchBar";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { deleteUserBlacklist, getBlacklist, getUsersByEmail, getUsersByEmailPiece } from "@/api/blacklist";
import { useUpdateRequest } from "@/hooks/useUpdateRequest";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "@/interfaces/interface";

const AdminBlacklistPage: FC = () => {

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    // ----------------------------
    // поиск пользователей по почте
    // ----------------------------

    const [emailInput, setEmailInput] = useState<string>('')
    
    const [emailKey, setEmailKey] = useState<number>(1)


    const [submitedEmail, setSubmitedEmail] = useState<string>('')
    const [submitedEmailKey, setSubmitedEmailKey] = useState<number>(1)


    const {data: emails, isFetched: emailsFetched} = useGetRequest({fetchFunc: () => getUsersByEmailPiece({email: emailInput}), enabled: true, key: [emailKey]})
    
    const handleEmailInputCallBack = (text: string) => {
        setEmailInput(text)
        setEmailKey(emailKey + 1)
    }

    const handleEmailInputSubmitCallBack = (text: string) => {
        setEmailInput('')
        setEmailKey(emailKey + 1)

        // проводить поиск по пользователям с почтой, введённой в ТЕКСТ 
        setSubmitedEmail(text)
        setSubmitedEmailKey(submitedEmailKey + 1)
    }

    
    // ----------------------------------------
    // отображение пользователей чёрного списка
    // ----------------------------------------
    
    const {data: users, isFetched: usersFetched} = useGetRequest({fetchFunc: () => getUsersByEmail({email: submitedEmail}), key: [submitedEmailKey], enabled: true})

    const [userList, setUserList] = useState<{ id: number; user_id: number; nickname: string; imgPath: string; role: number; email: string; }[]>([]);


    useEffect(() => {
        if (usersFetched && users) {
            setUserList(users); // Сохраняем полученные данные в состояние
        }
    }, [usersFetched, users]);

    const removeUserByUserId = (user_id: number) => {
        setUserList((prevUsers) => prevUsers.filter(user => user.user_id !== user_id));
    };


    // -----------------------------------
    // отловить удаление из чёрного списка
    // -----------------------------------

    const {mutatedFunc: deleteUserFromBlacklist} = useUpdateRequest({fetchFunc: deleteUserBlacklist})

    const handleUnblockUserCallBack = (id: number) => {
        // запрос на разблок
        
        if(user.user_role && user.user_role >= 1){
            deleteUserFromBlacklist({user_id: id})
            removeUserByUserId(id)
        } else {
            alert("Ви не маєте достатьного допуску")
        }
    }

    return(
        <div className="adminBlacklistPage">
            <AdminPanelAdditional page="blacklist"/>

            <div className="adminBlacklistPage_content">
                <div className="adminBlacklistPage_heading">Чоринй список</div>

                <div className="adminBlacklistPage_search">

                    <SearchBar searchInput = {emailInput} results={emails} handleSearchInputCallBack = {handleEmailInputCallBack} resultsFetched = {emailsFetched} handleSearchInputSubmitCallBack = {handleEmailInputSubmitCallBack}/>
                </div>

                <div className="adminBlacklistPage_blacklist">
                    {userList && userList.length > 0 && userList.map((user: any, index:number) => (
                        <User user ={user} key={index} handleUnblockUserCallBack = {handleUnblockUserCallBack}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminBlacklistPage