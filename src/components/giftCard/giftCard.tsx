import { FC, useState } from "react";

import './giftCard.scss'

import sampleGiftPhoto from '@/assets/images/Sample Gift Photo.png'
import dots from '@/assets/images/three dots.svg'
import mark from '@/assets/images/markGrey.svg'
import starGrey from '@/assets/images/StarGrey.svg'
import starYellow from '@/assets/images/StarYellow.svg'

const GiftCard: FC = () =>{

    const [additional, setAditional] = useState<boolean>(false)                     //для отображение доп функций
    const [additionalVisible, setAditionaVisible] = useState<boolean>(false)        //для отображения анимации доп функций 
    const [report, setReport] = useState<boolean>(false)                            //для открытия модального окна жалоб
    const [reportVisible, setReportVisible] = useState<boolean>(false)              //для отображения анимации модального окна
    const [giftModal, setGiftModal] = useState<boolean>(false)
    const [giftmodalVisible, setGiftModalVisible] = useState<boolean>(false)
    // Отмеченный подарок
    const [marked, setMarked] = useState<boolean>(false)


    // 
    const handleAdditional = () => {
        if(additional){
            setAditional(false)
            setTimeout(() => {
                setAditionaVisible(false)
            }, 500);
        } else {
            setAditionaVisible(true)
            setAditional(true)
        }
    }

    // отметить марк
    const handleMarked = () => {
        setMarked(!marked)
    }

    // открытие адишинал по трём точкам
    const handleAddtionalOpen = () => {
        if (report){
            setReport(false)
            setTimeout(() => {
                setReportVisible(false)
                setAditionaVisible(false)
                setAditional(false)
            }, 500);
        } else {
            setReport(true)
            setReportVisible(true)
        }
        setAditional(false)
    }
    
    const handleGiftModal = () => {
        if(giftModal){
            setGiftModal(false)

            setTimeout(() => {
                setGiftModalVisible(false)
            }, 500);
        } else {
            setGiftModal(true)
            setGiftModalVisible(true)
        }
    }

    return(
        <div className="giftCard">

            <div className="giftCard_container">

                <div className="giftCard_inner" onClick={handleGiftModal}>
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

                </div>

                <div className="giftCard_additional">
                    <div className="giftCard_additional_container">
                        <img src={dots} alt="dots" onClick={handleAdditional} />

                        {additionalVisible && <button className={additional? 'active' : 'disabled'} onClick={handleAddtionalOpen}>Поскаржтись</button>}
                    </div>
                </div>

                <div className="giftCard_mark"><img src={mark}  alt="mark" className={marked? "active": ""} onClick={handleMarked}/></div>
            </div>

            {reportVisible && <div className="giftCard_additionalModal">
                <div className={report? "giftCard_additionalModal_background show" : "giftCard_additionalModal_background hide"} onClick={handleAddtionalOpen}></div>

                <div className={report? "giftCard_additionalModal_content show" : "giftCard_additionalModal_content hide"}>
                    <span>Відгук</span>
                    <textarea placeholder="Введіть відгук"/>
                    <button onClick={handleAddtionalOpen}>Відправити відгук</button>
                </div>
            </div>}

            {giftmodalVisible && <div className="giftCard_giftModal">
                <div className={giftModal? "giftCard_giftModal_background show": "giftCard_giftModal_background hide" } onClick={handleGiftModal}></div>

                <div className={giftModal? "giftCard_giftModal_content show" : "giftCard_giftModal_content hide"}>Пока тут ничего нет, дизайн не придумал</div>
            </div>}
            
        </div>
    )
}

export default GiftCard