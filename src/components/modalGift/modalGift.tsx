import { getGiftById } from '@/api/gifts';
import './modalGift.scss'

import sampleGiftPhoto from '@/assets/images/Sample Gift Photo.png'
import sampleAvatar from '@/assets/images/logoSample.jpg'
import { useGetRequest } from '@/hooks/useGetReuquest';

import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getUserById } from '@/api/user';

import starYellow from '@/assets/images/StarYellow.svg'
import starGrey from '@/assets/images/StarGrey.svg'

interface ModalGiftInterface {
    handleGiftModalClose: () => void
    modalProps: any
    scrollCallback: (block: boolean) => void
}

const ModalGift: FC <ModalGiftInterface>= ({handleGiftModalClose, modalProps, scrollCallback}) => {

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
        }
    }, [gift, giftFetched])

    const {data: user, isFetched: userFetched} = useGetRequest({fetchFunc: () => getUserById({user_id: user_id}), enabled: userEnabled, key: [userKey]})

    // 
    // ссылка на пользователя
    // 

    const navigate = useNavigate()

    const handleLinkToUser = () => {
        navigate('/account/' + user[0].id)

        scrollCallback(false)
    }

    return (
        <div className="modalGift">
            {giftFetched && <div className="modalGift_container">
                <img src={'http://localhost:1000/' + gift[0].photoPath} alt="giftPhoto" />
                
                <div className="modalGift_content customScrollbar">
                    <div className="modalGift_name">{gift[0].name}</div>

                    {userFetched && user.length >  0 && <div onClick={handleLinkToUser} className="modalGift_creator">
                        <img src={'http://localhost:1000/' + user[0].imgPath} alt="userAvatar" />
                        
                        <div className="modalGift_creator_name">{user[0].nickname}</div>
                    </div>}

                    <div className="modalGift_reating">
                        <img src={starYellow} alt="star" />
                        <img src={starYellow} alt="star" />
                        <img src={starGrey} alt="star" />
                        <img src={starGrey} alt="star" />
                        <img src={starGrey} alt="star" />
                    </div>
                    
                    <div className="modalGift_views">{gift[0].userViews} переглянуло</div>

                    <div className="modalGift_tags">
                        {gift[0].tags.length > 0 && gift[0].tags.map((tag: string, index: number) =>(
                            <div className="modalGift_tags_tag" key={index}>{tag}</div>
                        ))}
                    </div>


                </div>


            </div>}
        </div>
    )
}

export default ModalGift