import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

import './report.scss'


import sampleAvatar from '@/assets/images/logoSample.jpg'
import GiftCard from "@/components/giftCard/giftCard";
import Account from "@/components/account/account";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getGiftById } from "@/api/gifts";

interface ReportComponent {
    user_id: number, 
    date: string,
    gift_id: number,
    scrollCallback: (block: boolean) => void
}

const Report: FC <ReportComponent>= ({user_id, date, gift_id, scrollCallback}) => {

    // -----------------
    // получение подарка
    // -----------------

    const {data: gift, isFetched: giftFetched} = useGetRequest({fetchFunc: () => getGiftById({gift_id: gift_id}), key: [], enabled: true})

    // -------------------------------------------
    // обработка репорта (редактировать отклонить)
    // -------------------------------------------

    const navigate = useNavigate()

    const handleChangeGift = () =>{
        navigate('/adminPanel/reports/submit/' + gift_id)
    }

    return(
        <div className="report">
            <Account user_id={user_id} date={date}/>
        
            <div className="report_text">РАНДОМ ТЕКСТ РЕПОРТА</div>

            {/* ДОБАВИТЬ КОЛБЕКИ */}
            {giftFetched && gift && <GiftCard data={gift[0]} scrollCallback={scrollCallback}/>}

            <div className="report_buttons">
                <button className="button_preset" onClick={handleChangeGift}>Редагувати</button>
                <button className="button_preset">Відхилити</button>
            </div>
        </div>
    )
}

export default Report