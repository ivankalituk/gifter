import './adminPanelPage.scss'

import { FC } from "react";

import AdminPanelAdditional from '@/components/adminPanelAditional/adminPanelAdditional';

const AdminPanelPage: FC = () => {

    // две колонки как в профиль пейдж
    // слева находится навигация по сайту, по разным страницам

    return(
        <div className="adminPanelPage">
            <div className="adminPanelPage_container">
                <AdminPanelAdditional />

                <div className="adminPanelPage_proposes">
                    <div className="adminPanelPage_proposes_heading">Список скарг</div>

                    <div className="adminPanelPage_proposes_list">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanelPage