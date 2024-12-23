import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import { FC, useEffect, useState } from "react";

import './adminAdminsPage.scss'
import Admin from "./components/admin/admin";
import search from '@/assets/images/Search.svg'
import SearchBar from "@/components/searchBar/searchBar";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getAdminsByEmailFragment, getAdminsDataByEmailFragment, patchAdminLevel } from "@/api/admins";
import { admin, RootState } from "@/interfaces/interface";
import { useUpdateRequest } from "@/hooks/useUpdateRequest";
import { TypedUseSelectorHook, useSelector } from "react-redux";


const AdminAdminsPage: FC = () => {

    // ----------------------
    // Поиск админов по почте
    // ----------------------

    const [adminInput, setAdminInput] = useState<string>('')
    const [adminKey, setAdminKey] = useState<number>(1)
    const [submitedAdminEmail, setSubmitedAdminEmail] = useState<string>('')
    const [submitedAdminKey, setSumitedAdmiKey] = useState<number>(1)

    const {data: adminResults, isFetched: adminsResultsFetched} = useGetRequest({fetchFunc: () => getAdminsByEmailFragment({email: adminInput}), key: [adminKey], enabled: true})

    const handleAdminInputCallBack = (text: string) => {
        setAdminInput(text)
        setAdminKey(adminKey + 1)
    }

    const handleAdminInpitSubmitCallBack = (text: string) => {
        setAdminInput('')
        setSubmitedAdminEmail(submitedAdminEmail)
        setSumitedAdmiKey(submitedAdminKey + 1)
    }

    // -------------------
    // Отображение админов
    // -------------------

    const {data: admins, isFetched: adminsFetched} = useGetRequest({fetchFunc: ()=>getAdminsDataByEmailFragment({email: submitedAdminEmail}), key: [submitedAdminKey], enabled: true})

    // -----------------------------
    // манипуляции с данными админов
    // -----------------------------

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    const [adminsReal, setAdminsReal] = useState<admin[]>([])

    const {mutatedFunc: adminLeveling} = useUpdateRequest({fetchFunc: patchAdminLevel})

    useEffect(() => {
        if (admins && adminsFetched){
            setAdminsReal(admins)
        }
    }, [admins, adminsFetched])

    // понизить админа
    const handleDecreaseAdmin = (id: number) => {
        if (user.user_role && user.user_role === 3){
            setAdminsReal(prevItems =>
                prevItems
                    .map(item =>
                        item.user_id === id 
                            ? { ...item, admin_level: item.admin_level - 1 } 
                            : item
                    )
                    .filter(item => item.admin_level > 0) // удаляем элементы с admin_level <= 0
            );
    
            // отправить данные по уменьшению уровня
            adminLeveling({user_id: id, operation: '-'})
        } else {
            alert("Ви на маєте достатнього рівня допуску")
        }

    };
    
    // повысить админа
    const handleIncreaseAdmin = (id: number) => {
        if (user.user_role && user.user_role === 3){
            setAdminsReal(prevItems =>
                prevItems.map(item =>
                    item.user_id === id 
                        ? item.admin_level < 3 
                            ? { ...item, admin_level: item.admin_level + 1 } 
                            : item // если admin_level до изменений = 3, то не трогаем так как уровень макс
                        : item
                )
            );
            
            // отправить данные по увеличению уровня
            adminLeveling({user_id: id, operation: '+'})
        } else {
            alert("Ви на маєте достатнього рівня допуску")
        }
    };
    

    return(
        <div className="adminAdminsPage">
            <AdminPanelAdditional page="admins"/>

            <div className="adminAdminsPage_content">
                <div className="adminAdminsPage_heading">Керування адмінами</div>

                <div className="adminAdminsPage_search">
                    <SearchBar searchInput={adminInput} handleSearchInputCallBack={handleAdminInputCallBack} results={adminResults} resultsFetched={adminsResultsFetched} handleSearchInputSubmitCallBack={handleAdminInpitSubmitCallBack}/>
                </div>

                <div className="adminAdminsPage_list">
                    {adminsFetched && adminsReal.length > 0 && adminsReal.map((data: any, index: number) => (
                        <Admin key={index} data= {data} handleDecreaseAdmin={handleDecreaseAdmin} handleIncreaseAdmin={handleIncreaseAdmin}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminAdminsPage