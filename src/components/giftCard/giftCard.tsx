import { FC } from "react";

import './giftCard.scss'

import sampleGiftPhoto from '@/assets/images/Sample Gift Photo.png'


const GiftCard: FC = () =>{
    return(
        <div className="giftCard">
            <img src={sampleGiftPhoto} alt="Gift photo" />

            <div className="giftCard_name">Кавун базований свіжий Херсонський (1шт)</div>

            <div className="giftCard_reating"></div>

            <div className="giftCard_views"></div>

            <div className="giftCard_tags"></div>

            <div className="giftCard_additional"></div>

            <div className="giftCard_mark"></div>
        </div>
    )
}

export default GiftCard