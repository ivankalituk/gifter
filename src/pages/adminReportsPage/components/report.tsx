import { FC } from "react";
import { Link } from "react-router-dom";

import './report.scss'


import sampleAvatar from '@/assets/images/logoSample.jpg'
import GiftCard from "@/components/giftCard/giftCard";

const Report: FC = () => {
    return(
        <div className="report">
            <Link to={'/account/:user_id'} className="report_account">
                <img src={sampleAvatar} alt="" />
                <span>Nigname</span>
            </Link>

            <div className="report_text">РАНДОМ ТЕКСТ РЕПОРТА</div>

            {/* ДОБАВИТЬ КОЛБЕКИ */}
            {/* <GiftCard /> */}

        </div>
    )
}

export default Report