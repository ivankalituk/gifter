import { FC } from "react";

import './adminBlacklistPage.scss'
import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import BlacklistUser from "./components/blacklistUser/blacklistUser";

const AdminBlacklistPage: FC = () => {
    return(
        <div className="adminBlacklistPage">
            <div className="adminBlacklistPage_container">

                <AdminPanelAdditional page="blacklist"/>

                <div className="adminBlacklistPage_inner">

                    <div className="adminBlacklistPage_heading">Чорний список</div>
                    
                    <input type="text" className="inputText_preset" placeholder="Введіть пошту користувача"/>

                    <div className="adminBlacklistPage_blacklist">
                        <div className="adminBlacklistPage_blacklist_heading">Список заблокованих користувачів:</div>

                        <div className="adminBlacklistPage_blacklist_list">
                            <BlacklistUser />
                            <BlacklistUser />
                            <BlacklistUser />
                            <BlacklistUser />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdminBlacklistPage