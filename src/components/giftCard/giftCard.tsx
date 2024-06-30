import { FC } from "react";

import './giftCard.scss'

import sampleGiftPhoto from '@/assets/images/Sample Gift Photo.png'
import dots from '@/assets/images/three dots.svg'
import mark from '@/assets/images/markGrey.svg'
import starGrey from '@/assets/images/StarGrey.svg'
import starYellow from '@/assets/images/StarYellow.svg'

const GiftCard: FC = () =>{
    return(
        <div className="giftCard">
            <img src={sampleGiftPhoto} alt="Gift photo" />

            <div className="giftCard_name">Кавун базований свіжий Херсонський (1шт)</div>

            <div className="giftCard_reating">
                <div className="giftCard_reating_stars">
                    <img src={starGrey} alt="star" />
                    <img src={starGrey} alt="star" />
                    <img src={starGrey} alt="star" />
                    <img src={starGrey} alt="star" />
                    <img src={starGrey} alt="star" />
                </div>

                <div className="giftCard_reating_reating">
                    <img src={starYellow} alt="star" />
                    <img src={starYellow} alt="star" />
                    <img src={starYellow} alt="star" />
                    <img src={starYellow} alt="star" />
                    <img src={starYellow} alt="star" />
                </div>
                
            </div>

            <div className="giftCard_views">1999 перегляди</div>

            <div className="giftCard_tags">
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
                <div className="giftCard_tags_tag">#тег</div>
            </div>

            <div className="giftCard_additional"><img src={dots} alt="dots" /></div>

            {/* Checkbox? */}
            <div className="giftCard_mark"><img src={mark}  alt="mark" /></div>
        </div>
    )
}

export default GiftCard