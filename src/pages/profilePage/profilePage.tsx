import { FC } from "react";
import { Link } from "react-router-dom";

import profilePhoto from "@/assets/images/logoSample.jpg"

import './profilePage.scss'
import MarkedList from "./components/markedList/markedList";
import GiftCard from "@/components/giftCard/giftCard";

interface ProfilePageInterface {
    type: string;
    scrollCallback: (block: boolean)=> void
}

const ProfilePage: FC <ProfilePageInterface> = ({type, scrollCallback}) => {

    return(
        <div className="profilePage">
            <div className="profilePage_leftColumn">

                <img className="profilePage_leftColumn_avatar" src={profilePhoto} alt="profile photo" />

                <div className="profilePage_leftColumn_nickname">NIGNAME</div>

                <div className="profilePage_leftColumn_description">
                    <div className="profilePage_leftColumn_description_heading">Біо:</div>
                    <div className="profilePage_leftColumn_description_text">Текс описания аккаунта гифтера для пользователя бла бла бла бла бла блядт бля бла</div>
                </div>

                <div className="profilePage_leftColumn_usedTags">
                    <div className="profilePage_leftColumn_usedTags_heading">Використані теги:</div>
                    
                    <div className="profilePage_leftColumn_usedTags_tags">
                        <div>#Тег</div>
                        <div>#Довгий тег</div>
                        <div>#ДУЖЕ ДОВГИЙ ТЕГ</div>
                        <div>#Тегггггггггггггеггггггггггг</div>
                        <div>#Тег</div>
                        <div>#Тег</div>
                        <div>#Тег</div>
                    </div>
                </div>

                {type == 'privateUser' && <Link className="link_button" to={'/settings'}>Редагувати</Link>}
                
                <Link className="link_button" to={'/adminPanel/suggests'}>Адмін панель</Link>
                
            </div>

            <div className="profilePage_rightColumn">
                
                <div className="profilePage_rightColumn_info">

                    <div className="profilePage_rightColumn_accountInfo">
                        <img src={profilePhoto} alt="avatar" />

                        <div className="profilePage_rightColumn_accountInfo_info">
                             <div>Nigname</div>
                             <div>Зареєстрований: 12/12/2012</div>
                        </div>
                    </div>

                    <div className="profilePage_rightColumn_description">
                        <div className="profilePage_rightColumn_description_heading">Біо:</div>

                        <div className="profilePage_rightColumn_description_text">Текс описания аккаунта гифтера для пользователя бла бла бла бла бла блядт бля бла</div>
                    </div>

                    <div className="profilePage_rightColumn_usedTags">
                        <div className="profilePage_rightColumn_usedTags_heading">Використані теги</div>

                        <div className="profilePage_rightColumn_usedTags_list">
                            <div>#Тег</div>
                            <div>#Тег</div>
                            <div>#Тег</div>
                            <div>#Тег</div>
                            <div>#Тег</div>
                        </div>
                    </div>

                    <div className="profilePage_rightColumn_addedTags">
                        <div className="profilePage_rightColumn_addedTags_heading">Додані теги:</div>

                        <div className="profilePage_rightColumn_addedTags_tags">
                            <div>#Гітара</div>
                            <div>#Велосипед</div>
                            <div>#ЗадняДупа</div>
                            <div>#Мешуга</div>
                            <div>#Переднядупа</div>
                            <div>#ПередняДупа</div>
                            <div>#Комп'ютери</div>
                            <div>#Робота</div>
                            <div>#РоботаДупою</div>
                            <div>#Дупа</div>
                            <div>#Погода</div>
                            <div>#Погода</div>
                        </div>
                    </div>
                </div>


                <div className="profilePage_rightColumn_gifts">
                    {type == 'privateUser' && <Link to={'/suggest'} className="link_button">Запропонувати</Link>}

                    <div className="profilePage_rightColumn_gifts_list">
                        <GiftCard scrollCallback={scrollCallback}/>
                        <GiftCard scrollCallback={scrollCallback}/>
                        <GiftCard scrollCallback={scrollCallback}/>
                        <GiftCard scrollCallback={scrollCallback}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage