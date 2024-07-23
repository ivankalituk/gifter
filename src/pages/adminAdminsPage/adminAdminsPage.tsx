import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import { FC } from "react";

import './adminAdminsPage.scss'
import Admin from "./components/admin/admin";

const AdminAdminsPage: FC = () => {
    return(
        <div className="adminAdminsPage">
            <AdminPanelAdditional page="admins"/>

            <div className="adminAdminsPage_content">
                <div className="adminAdminsPage_heading">Пропозиції подарунків користувачів</div>

                <div className="adminAdminsPage_search">
                    <input type="text" className="inputText_preset" placeholder="Введіть пошту адміна"/>
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