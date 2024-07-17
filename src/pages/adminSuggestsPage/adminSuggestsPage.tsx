import { FC } from "react";

import './adminSuggestsPage.scss'
import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";

const AdminSuggestsPage: FC = () =>{
    return(
        <div className="adminSuggestsPage">
            <AdminPanelAdditional page="gifts"/>

            <div className="adminSuggestsPage_content">dada</div>
        </div>
    )
}

export default AdminSuggestsPage