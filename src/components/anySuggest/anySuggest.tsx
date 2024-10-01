import { FC } from "react";

import './anySuggest.scss'
import { Link, useNavigate } from "react-router-dom";

import sampleAvatar from '@/assets/images/logoSample.jpg'
import sampleGift from '@/assets/images/Sample Gift Photo.png'
import Account from "../account/account";

interface AnySuggestInterface{
    data: any,
    handleDeleteSuggestCallBack: (id: number) => void
}

const AnySuggest: FC <AnySuggestInterface>= ({data, handleDeleteSuggestCallBack}) => {

    // сначала должен быть коммент самого предлагающего, далее идёт само предложение
    // предложение не имеющее фото будет добавлено заглушку
    // далее предложение будет выглядеть ровно так же, как и на главной страниые
    // по нажатию на одобрить будет открыто модальное окно изменения

    const navigate = useNavigate()

    // лень переделывать стили ссылки
    const handleChangeLink = () =>{
        navigate('/adminPanel/suggests/submit/' + data.id)
    }

    const handleDelete = () => {
        handleDeleteSuggestCallBack(data.id)
        // также сделать удаление 
    }

    console.log(data)

    return(
        <div className="suggest">

            <Account user_id={data.user_id} date={data.addDate}/>

            <div className="suggest_comment">{data.content}</div>

            <div className="suggest_gift">
                {/* тут должен быть имедж, название подарка и теги */}

                {data.photoPath !== null && <img src={'http://localhost:1000/' + data.photoPath} alt="giftPhoto" />}

                <div className="suggest_gift_name">{data.name}</div>

                {data.tags !== null && data.tags.length > 0 &&<div className="suggest_gift_tags">
                    {data.tags.map((tag: string, index: number) => (
                        <div className="suggest_gift_tag" key={index}>{tag}</div>
                    ))}

                </div>}

            </div>

            <div className="suggest_buttons">
                <button className="button_preset" onClick={handleChangeLink}>Редактор</button>
                <button className="button_preset" onClick={handleDelete}>Відмовити</button>
            </div>
        </div>
    )
}

export default AnySuggest