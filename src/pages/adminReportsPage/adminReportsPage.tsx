import { FC, useEffect, useState } from "react";

import './adminReportsPage.scss'
import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import Report from "./components/report";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getAllReports } from "@/api/report";
import { report } from "@/interfaces/interface";

interface AdminReportsPageInterface {
    scrollCallback: (block: boolean) => void
}

const AdminReportsPage: FC <AdminReportsPageInterface>= ({scrollCallback}) => {

    // идея следующая: нужно отобразить подарок, как на главной странице, а выше написать сам репорт и аккаунт пользователя, который ему выдал репорт

    // 
    // отображение всех репортов
    // 

    const {data: reports, isFetched: reportsFetched} = useGetRequest({fetchFunc: ()=> getAllReports(), key: [], enabled: true})

    const [initialReports, setInitialReports] = useState<report[]>([])

    useEffect(() => {
        if (reports && reportsFetched){
            setInitialReports(reports)
        }
    }, [reports, reportsFetched])

    const handleDeleteReportCallBack = (id: number) => {
        setInitialReports(prevItems => prevItems.filter(item => item.id !== id))
    }

    return(
        <div className="adminReportsPage">
            <AdminPanelAdditional page="report"/>

            <div className="adminReportsPage_content">
                <div className="adminReportsPage_heading">Скарги на подарунки</div>

                <div className="adminReportsPage_reportList">
                    {reportsFetched && initialReports !== null && initialReports.length > 0 && initialReports.map((report: any, index: number) => (
                        <Report key={index} handleDeleteReportCallBack = {handleDeleteReportCallBack} user_id={report.user_id} date={report.ad_date} gift_id={report.gift_id} scrollCallback={scrollCallback} report_id={report.id} data= {report}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminReportsPage