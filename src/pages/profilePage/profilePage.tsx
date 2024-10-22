import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import profilePhoto from "@/assets/images/logoSample.jpg"

import './profilePage.scss'
import MarkedList from "./components/markedList/markedList";
import GiftCard from "@/components/giftCard/giftCard";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { Gift, RootState } from "@/interfaces/interface";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getAllGiftsByCreatorId } from "@/api/gifts";
import { getUserBio, getUserTags } from "@/api/user";
import tick from '@/assets/images/tick.svg'

interface ProfilePageInterface {
    type: string;
    scrollCallback: (block: boolean)=> void
}

const ProfilePage: FC <ProfilePageInterface> = ({type, scrollCallback}) => {

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)
    
    const {data: gifts, isFetched: giftsFetched} = useGetRequest<Gift[] | undefined>({fetchFunc:  () => getAllGiftsByCreatorId(user.user_id), enabled: true, key: [1]})

    const {data: bio, isFetched: bioFetched} = useGetRequest<any>({fetchFunc:  () => getUserBio({user_id: user.user_id}), enabled: true, key: [1]})
    const {data: tags, isFetched: tagsFetched} = useGetRequest<any>({fetchFunc:  () => getUserTags({user_id: user.user_id}), enabled: true, key: [1]})
    
    // ------------------------------------
    // DropDown список для мобильной версии
    // ------------------------------------

    const [dropMenu, setDropMenu] = useState<boolean>(false)

    const handleDropMenu = () => {
        setDropMenu(!dropMenu)
    }



    return(
        <div className="profilePage">
            <div className="profilePage_leftColumn">

                <img className="profilePage_leftColumn_avatar" src={user.user_imgUrl? 'http://localhost:1000/' + user.user_imgUrl :profilePhoto} alt="profile photo" />

                <div className="profilePage_leftColumn_nickname">{user.user_nickName}</div>

                {bioFetched && bio[0].bio !== null && <div className="profilePage_leftColumn_description">
                    <div className="profilePage_leftColumn_description_heading">Біо:</div>
                    <div className="profilePage_leftColumn_description_text">{bio[0].bio}</div>
                </div>}

                {tagsFetched && tags !== null && tags.length > 0 && <div className="profilePage_leftColumn_usedTags">
                        <div className="profilePage_leftColumn_usedTags_heading">Використані теги</div>

                        <div className="profilePage_leftColumn_usedTags_tags">
                            {tags.map((tag: string, index: number) => (
                                <div key={index}>{tag}</div>
                            ))}
                        </div>
                    </div>}

                {type == 'privateUser' && <Link className="link_button" to={'/settings'}>Редагувати</Link>}
                {type == 'privateUser' && <Link to={'/suggest'} className="link_button">Запропонувати</Link>}
                <Link className="link_button" to={'/adminPanel/suggests'}>Адмін панель</Link>
                
            </div>

            <div className="profilePage_rightColumn">
                
                <div className="profilePage_rightColumn_info">
                
                    <div className="profilePage_rightColumn_accountInfo">
                        <img src={user.user_imgUrl? 'http://localhost:1000/' + user.user_imgUrl :profilePhoto} alt="avatar" />

                        <div className="profilePage_rightColumn_accountInfo_info">
                            <div>Nigname</div>
                            <div>Зареєстрований: 12/12/2012</div>
                        </div>
                    </div>
                        
                        <div className={`profilePage_rightColumn_drop ${dropMenu ? 'open' : ''}`}>

                            <div className="profilePage_rightColumn_description">
                                <div className="profilePage_rightColumn_description_heading">Біо:</div>

                                {bioFetched && bio && <div className="profilePage_rightColumn_description_text">{bio[0].bio}</div>}
                            </div>

                            {tagsFetched && tags.length > 0 && <div className="profilePage_rightColumn_usedTags">
                                <div className="profilePage_rightColumn_usedTags_heading">Використані теги</div>

                                <div className="profilePage_rightColumn_usedTags_list">
                                    {tags.map((tag: string, index: number) => (
                                        <div key={index}>{tag}</div>
                                    ))}
                                </div>
                            </div>}

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

                    <div className="profilePage_rightColumn_tick" onClick={handleDropMenu}>
                        <img src={tick} alt="tick" style={dropMenu? {rotate: '-180deg', transition: '0.5s'} : { transition: '0.5s'}}/>
                    </div>
                </div>


                <div className="profilePage_rightColumn_gifts">
                    {type == 'privateUser' && <Link to={'/suggest'} className="link_button">Запропонувати</Link>}

                    <div className="profilePage_rightColumn_gifts_list">
                        {gifts && giftsFetched && gifts.map((data, index) => (
                            
                            <GiftCard scrollCallback={scrollCallback} data = {data} key={index} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ProfilePage