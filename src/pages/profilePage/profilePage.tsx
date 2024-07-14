import { FC } from "react";
import { Link } from "react-router-dom";

import profilePhoto from "@/assets/images/logoSample.jpg"

import './profilePage.scss'
import MarkedList from "./components/markedList/markedList";

const ProfilePage: FC = () => {

    // полностью переделать. в левой колонке будут теги выбранные пользователем, описание его интересов и возможно наиболее используемые теги пользователя
    // справа будет список пользовательских тегов, переход на его желаемые подарки и список добавленных и одобренных им подарков

    return(
        <div className="profilePage">
            <div className="profilePage_leftColumn">
                {/* ФОТО ПРОФИЛЯ, НИК ПРОФИЛЯ, ОПИСАНИЕ ПРОФИЛЯ, ЧАСТО ИСПОЛЬЗУЕМЫЕ ТЕГИ */}

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

            </div>
            <div className="profilePage_rightColumn">2</div>
        </div>
    )
}

export default ProfilePage