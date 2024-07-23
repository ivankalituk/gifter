import { FC } from "react";

import './anySuggest.scss'
import { Link } from "react-router-dom";

import sampleAvatar from '@/assets/images/logoSample.jpg'
import sampleGift from '@/assets/images/Sample Gift Photo.png'


const AnySuggest: FC = () => {

    // сначала должен быть коммент самого предлагающего, далее идёт само предложение
    // предложение не имеющее фото будет добавлено заглушку
    // далее предложение будет выглядеть ровно так же, как и на главной страниые
    // по нажатию на одобрить будет открыто модальное окно изменения

    return(
        <div className="suggest">
            <Link to={'/account/:user_id'} className="suggest_account">
                <img src={sampleAvatar} alt="" />
                <span>Nigname</span>
            </Link>

            <div className="suggest_comment">Комментарий коммент комменткомменткомменткомменткомменткомменткомменткомменткомменткомменткоммент</div>

            <div className="suggest_gift">
                {/* тут должен быть имедж, название подарка и теги */}

                <img src={sampleGift} alt="giftPhoto" />

                <div className="suggest_gift_name">GIFT NAMEEEE MEMEMEMEMEM ME MEM EMEM EME M</div>

                <div className="suggest_gift_tags">
                    <div className="suggest_gift_tag">#ТегТег</div>
                    <div className="suggest_gift_tag">#ТегТег</div>
                    <div className="suggest_gift_tag">#ТегТег</div>
                    <div className="suggest_gift_tag">#ТегТег</div>
                    <div className="suggest_gift_tag">#ТегТег</div>
                    <div className="suggest_gift_tag">#ТегТег</div>
                    <div className="suggest_gift_tag">#ТегТег</div>
                </div>

            </div>

            <div className="suggest_buttons">
                <button className="button_preset">Редактор</button>
                <button className="button_preset">Відмовити</button>
            </div>
        </div>
    )
}

export default AnySuggest