import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import { FC } from "react";

import './adminAdminsPage.scss'
import Admin from "./components/admin/admin";
import search from '@/assets/images/Search.svg'


const AdminAdminsPage: FC = () => {
    return(
        <div className="adminAdminsPage">
            <AdminPanelAdditional page="admins"/>

            <div className="adminAdminsPage_content">
                <div className="adminAdminsPage_heading">Пропозиції подарунків користувачів</div>

                <div className="adminAdminsPage_search">
                    <div className="custom_search">
                        <button><img src={search} alt="search" /></button>
                        <input type="text" placeholder="Введіть пошту користувача" />
                    </div>
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