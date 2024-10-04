import { getGiftById } from '@/api/gifts';
import './modalGift.scss'

import sampleGiftPhoto from '@/assets/images/Sample Gift Photo.png'
import sampleAvatar from '@/assets/images/logoSample.jpg'
import { useGetRequest } from '@/hooks/useGetReuquest';

import { FC, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getUserById } from '@/api/user';

interface ModalGiftInterface {
    handleGiftModalClose: () => void
    modalProps: any
}

const ModalGift: FC <ModalGiftInterface>= ({handleGiftModalClose, modalProps}) => {

    // console.log(modalProps)
    const serverUrl = process.env.REACT_APP_API_URL

    // -----------------
    // получение подарка
    // -----------------

    const {data: gift, isFetched: giftFetched} = useGetRequest({fetchFunc: () => getGiftById({gift_id: modalProps.gift_id}), enabled: true, key: []})

    // ---------------------------
    // получение создателя подарка 
    // ---------------------------

    const [user_id, setUser_id] = useState<number>(-1)
    const [userKey, setUserKey] = useState<number>(1)
    const [userEnabled, setUserEnabled] = useState<boolean>(false)

    useEffect(() => {
        if(gift && giftFetched){
            setUser_id(gift[0].creatorId)
            setUserEnabled(true)
            setUserKey(userKey + 1)

            console.log(user_id)
        }
    }, [gift, giftFetched])

    const {data: user, isFetched: userFetched} = useGetRequest({fetchFunc: () => getUserById({user_id: user_id}), enabled: userEnabled, key: [userKey]})


    useEffect(() => {
        console.log(user)
    }, [user, userFetched])

    return (
        <div className="modalGift">

            { giftFetched && <div className="modalGift_container">
                <div className="modalGift_content">
                    
                    <div className="modalGift_img"><img src={gift[0].photoPath !== null? 'http://localhost:1000/' + gift[0].photoPath : sampleGiftPhoto} alt="giftPhoto" /></div>

                    <div className="modalGift_info">
                        <div className="modalGift_info_name">{gift[0].name}</div>

                        {/* ЛИНК НА ПОЛЬЗОВАТЕЛЯ */}
                        {userFetched && <Link to={'/account/' + user[0].id} className='modalGift_info_creator'>
                            <img src={user[0].imgPath !== null? 'http://localhost:1000/' + user[0].imgPath : sampleAvatar} alt="creatorAvatar" />
                            <span>{user[0].nickname}</span>
                        </Link>}

                        <div className="modalGift_info_reating">Рейтинг Большие звёзды</div>

                        <div className="modalGift_info_views">{gift[0].userViews} користувачів переглянуло</div>

                        <div className="modalGift_info_tags">
                            {gift[0].tags.length > 0 && gift[0].tags.map((tag: string, index: number) => (
                                <div className="modalGift_info_tag" key={index}>{tag}</div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>}

        </div>
    )
}

export default ModalGift