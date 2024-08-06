import { FC } from "react";
import { Link } from "react-router-dom";

import './report.scss'


import sampleAvatar from '@/assets/images/logoSample.jpg'
import GiftCard from "@/components/giftCard/giftCard";
import Account from "@/components/account/account";

const Report: FC = () => {
    return(
        <div className="report">
            <Account />

            <div className="report_text">РАНДОМ ТЕКСТ РЕПОРТА</div>

            {/* ДОБАВИТЬ КОЛБЕКИ */}
            <GiftCard />

        </div>
    )
}

export default Report