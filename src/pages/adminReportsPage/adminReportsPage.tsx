import { FC } from "react";

import './adminReportsPage.scss'
import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import Report from "./components/report";

const AdminReportsPage: FC = () => {

    // идея следующая: нужно отобразить подарок, как на главной странице, а выше написать сам репорт и аккаунт пользователя, который ему выдал репорт

    return(
        <div className="adminReportsPage">
            <AdminPanelAdditional page="report"/>

            <div className="adminReportsPage_content">
                <div className="adminReportsPage_heading">Скарги на подарунки</div>

                <div className="adminReportsPage_reportList">
                    <Report />
                </div>
            </div>
        </div>
    )
}

export default AdminReportsPage