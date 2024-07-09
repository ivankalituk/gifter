import './modalGift.scss'

import sampleGiftPhoto from '@/assets/images/Sample Gift Photo.png'

import { FC, useState } from "react";

interface ModalGiftInterface {
    handleGiftModalClose: () => void
}

const ModalGift: FC <ModalGiftInterface>= ({handleGiftModalClose}) => {

    const [giftAnimation, setGiftAnimation] = useState<boolean>(true)

    const handleClose = () => {
        setGiftAnimation(false)

        setTimeout(() => {
            handleGiftModalClose()
          }, 500);
    }

    return (
        <div className="modalGift">

            <div className="modalGift_container">
                <div className="modalGift_content">
                    
                    <div className="modalGift_img"><img src={sampleGiftPhoto} alt="giftPhoto" /></div>

                    <div className="modalGift_info">
                        <div className="modalGift_info_name">Кавун базований свіжий Херсонський (1шт)</div>

                        <div className="modalGift_info_reating">Рейтинг Большие звёзды</div>

                        <div className="modalGift_info_views">1999 перегляди</div>

                        <div className="modalGift_info_tags">
                            <div className="modalGift_info_tag">#кавун</div>
                            <div className="modalGift_info_tag">#жирнийКавун</div>
                            <div className="modalGift_info_tag">#ВеликийЖирнийКавун</div>
                            <div className="modalGift_info_tag">#жирКавун</div>
                            <div className="modalGift_info_tag">#КавунВеликий</div>
                            <div className="modalGift_info_tag">#Херсон</div>
                            <div className="modalGift_info_tag">#ХерСон</div>
                            <div className="modalGift_info_tag">#Дніпро</div>
                            <div className="modalGift_info_tag">#ДовгийТегДляДовгогоТега</div>
                            <div className="modalGift_info_tag">#НАЙДОВШИЙТЕГНАЙДОВШИЙТЕГНАЙДОВШИЙТЕГНАЙДОВШИЙТЕГНАЙДОВШИЙТЕГ</div>
                            <div className="modalGift_info_tag">#щеодинтег</div>
                            <div className="modalGift_info_tag">#щеодинтеггггггг</div>
                            <div className="modalGift_info_tag">#щеодинтеггггггг</div>
                            <div className="modalGift_info_tag">#щеодинтеггггггг</div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default ModalGift