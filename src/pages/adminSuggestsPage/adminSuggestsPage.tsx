import { FC } from "react";

import './adminSuggestsPage.scss'
import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import AnySuggest from "@/components/anySuggest/anySuggest";

const AdminSuggestsPage: FC = () =>{
    return(
        <div className="adminSuggestsPage">
            <AdminPanelAdditional page="gifts"/>

            <div className="adminSuggestsPage_content">
                <div className="adminSuggestsPage_heading">Пропозиції подарунків користувачів</div>

                <div className="adminSuggestsPage_content_suggests">
                    <AnySuggest />
                    <AnySuggest />
                </div>
            </div>
        </div>
    )
}

export default AdminSuggestsPage