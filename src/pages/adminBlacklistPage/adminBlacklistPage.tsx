import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import { FC } from "react";

import './adminBlacklistPage.scss'
import User from "./components/user/user";

const AdminBlacklistPage: FC = () => {
    return(
        <div className="adminBlacklistPage">
            <AdminPanelAdditional page="blacklist"/>

            <div className="adminBlacklistPage_content">
                <div className="adminBlacklistPage_heading">Чоринй список</div>

                <div className="adminBlacklistPage_search">
                    <input type="text" className="inputText_preset" placeholder="Введіть пошту адміна"/>
                </div>

                <div className="adminBlacklistPage_blacklist">
                    <User />
                </div>
            </div>
        </div>
    )
}

export default AdminBlacklistPage