import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import './report.scss'


import sampleAvatar from '@/assets/images/logoSample.jpg'
import GiftCard from "@/components/giftCard/giftCard";
import Account from "@/components/account/account";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getGiftById } from "@/api/gifts";
import { useUpdateRequest } from "@/hooks/useUpdateRequest";
import { deleteReport } from "@/api/report";

interface ReportComponent {
    user_id: number, 
    date: string,
    gift_id: number,
    scrollCallback: (block: boolean) => void
    report_id: number
}

const Report: FC <ReportComponent>= ({user_id, date, gift_id, scrollCallback, report_id}) => {

    // -----------------
    // получение подарка
    // -----------------

    const {data: gift, isFetched: giftFetched} = useGetRequest({fetchFunc: () => getGiftById({gift_id: gift_id}), key: [], enabled: true})

    // -------------------------------------------
    // обработка репорта (редактировать отклонить)
    // -------------------------------------------

    const {mutatedFunc: deleteReportFunc} = useUpdateRequest({fetchFunc: deleteReport})

    const navigate = useNavigate()

    const handleChangeGift = () =>{
        navigate('/adminPanel/reports/submit/' + gift_id)
    }

    const handleDeleteReport = () =>{
        // колбек для удаления из массива
        deleteReportFunc({report_id: report_id})
    }

    return(
        <div className="report">
            <Account user_id={user_id} date={date}/>
        
            <div className="report_text">REP</div>

            {/* ДОБАВИТЬ КОЛБЕКИ */}
            {giftFetched && gift && <GiftCard data={gift[0]} scrollCallback={scrollCallback}/>}

            <div className="report_buttons">
                <button className="button_preset" onClick={handleChangeGift}>Редагувати</button>
                <button className="button_preset" onClick={handleDeleteReport}>Відхилити</button>
            </div>
        </div>
    )
}

export default Report