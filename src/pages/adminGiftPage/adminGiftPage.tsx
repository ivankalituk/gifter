import './adminGiftPage.scss'

import { FC } from "react";

import AdminPanelAdditional from '@/components/adminPanelAditional/adminPanelAdditional';

const AdminGiftpage: FC = () => {

    // две колонки как в профиль пейдж
    // слева находится навигация по сайту, по разным страницам

    return(
        <div className="adminGiftPage">
            <div className="adminGiftPage_container">
                <AdminPanelAdditional page='gifts'/>

                <div className="adminGiftpage_proposes">
                    <div className="adminGiftPage_proposes_heading">Список пропозицій</div>

                    <div className="adminGiftPage_proposes_list">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminGiftpage