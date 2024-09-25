import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import { FC, useState } from "react";

import './adminAdminsPage.scss'
import Admin from "./components/admin/admin";
import search from '@/assets/images/Search.svg'
import SearchBar from "@/components/searchBar/searchBar";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getAdminsByEmailFragment } from "@/api/admins";


const AdminAdminsPage: FC = () => {

    const [adminInput, setAdminInput] = useState<string>('')
    const [adminKey, setAdminKey] = useState<number>(1)

    const {data: adminResults, isFetched: adminsResultsFetched} = useGetRequest({fetchFunc: () => getAdminsByEmailFragment({email: adminInput}), key: [adminKey], enabled: true})

    const handleAdminInputCallBack = (text: string) => {
        setAdminInput(text)
        setAdminKey(adminKey + 1)
    }

    const handleAdminInpitSubmitCallBack = (text: string) => {
        setAdminInput('')
        console.log(text)
    }

    return(
        <div className="adminAdminsPage">
            <AdminPanelAdditional page="admins"/>

            <div className="adminAdminsPage_content">
                <div className="adminAdminsPage_heading">Керування адмінами</div>

                <div className="adminAdminsPage_search">
                    <SearchBar searchInput={adminInput} handleSearchInputCallBack={handleAdminInputCallBack} results={adminResults} resultsFetched={adminsResultsFetched} handleSearchInputSubmitCallBack={handleAdminInpitSubmitCallBack}/>
                </div>

                <div className="adminAdminsPage_list">
                    <Admin />
                    <Admin />
                    <Admin />
                </div>
            </div>
        </div>
    )
}

export default AdminAdminsPage