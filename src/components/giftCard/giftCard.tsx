import { FC, useState } from "react";

import './giftCard.scss'

import sampleGiftPhoto from '@/assets/images/Sample Gift Photo.png'
import dots from '@/assets/images/three dots.svg'
import mark from '@/assets/images/markGrey.svg'
import starGrey from '@/assets/images/StarGrey.svg'
import starYellow from '@/assets/images/StarYellow.svg'
import ModalReport from "./components/modalReport/modalReport";

const GiftCard: FC = () =>{

    const [additional, setAditional] = useState<boolean>(false)                     //для отображение доп функций (три точки)
    const [report, setReport] = useState<boolean>(false)                            //для открытия модального окна жалоб
    const [reportVisible, setReportVisible] = useState<boolean>(false)              //для отображения анимации модального окна
    const [giftModal, setGiftModal] = useState<boolean>(false)
    const [giftmodalVisible, setGiftModalVisible] = useState<boolean>(false)
    // Отмеченный подарок
    const [marked, setMarked] = useState<boolean>(false)



    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };



    // ЗАМЕНИТЬ
    // для отображения дополнительных (три точки)
    const handleAdditional = () => {
        setAditional(!additional)
    }

    // отметить подарок (марк)
    const handleMarked = () => {
        setMarked(!marked)
    }

    // открытия модального окна репорта
    const handleAddtionalOpen = () => {
        if (report){
            setReport(false)
            setTimeout(() => {
                setReportVisible(false)
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

                        <button className={additional? 'active' : 'disabled'} onClick={handleAddtionalOpen}>Поскаржтись</button>
                    </div>
                </div>

                <div className="giftCard_mark"><img src={mark}  alt="mark" className={marked? "active": ""} onClick={handleMarked}/></div>
            </div>

            {/* <ModalReport isOpen={isModalOpen} onClose={closeModal} /> */}

            {giftmodalVisible && <div className="giftCard_giftModal">
                <div className={giftModal? "giftCard_giftModal_background show": "giftCard_giftModal_background hide" } onClick={handleGiftModal}></div>

                <div className={giftModal? "giftCard_giftModal_content show" : "giftCard_giftModal_content hide"}>Пока тут ничего нет, дизайн не придумал</div>
            </div>}
            
        </div>
    )
}

export default GiftCard