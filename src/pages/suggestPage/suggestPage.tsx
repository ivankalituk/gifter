import './suggestPage.scss'

import { FC, useState, ChangeEvent } from "react";

import search from '@/assets/images/Search.svg'

import insertPhoto from '@/assets/images/insertPhoto.svg'
import giftPreInsertPhoto from '@/assets/images/giftPreInsertPhoto.svg'
import { suggestForPost } from '@/interfaces/interface';

const  SuggestPage: FC  = () => {


    const [selectedImgFile, setSelectedImgFile] = useState<any>(null)           //сохранение файла фото
    const [selectedImg, setSelectedImg] = useState<any>(null)                   //сохранение ссылки на файл фото


    const handleImageUpload = (event: any)=>{
        const file = event.target.files[0]
        setSelectedImgFile(file)
        const reader = new FileReader()

        reader.onload = () =>{
            setSelectedImg(reader.result)
        }

        reader.readAsDataURL(file)
        console.log(typeof(selectedImg))
        console.log(typeof(selectedImgFile))
    }


    // дата для отправки
    const data :suggestForPost | null= null


    return(
        <div className="suggestPage">
            <div className="suggestPage_container">
                
                <div className="suggestPage_suggest">
                    <div className="suggestPage_suggest_imgUpload">
                        
                        <img src={selectedImg? selectedImg : giftPreInsertPhoto} alt="insertPhoto" />

                        <div className="suggestPage_suggest_imgUpload_inputGroup">
                            <img src={insertPhoto} alt="insertPhoto" />
                            <input type="file" onChange={handleImageUpload} />
                        </div>
                    </div>

                    <div className="suggestPage_suggest_dataUpload">

                        <input type='file' className="dataUpload_photo" onChange={handleImageUpload}/>


                        <div className="dataUpload_name">
                            <div>Введіть назву подарунку</div>
                            <input type="text" className='inputText_preset' placeholder='Назва подарунку'/>
                        </div>

                        <div className="dataUpload_description">
                            <div>Введіть пояснення подарунку</div>
                            <textarea placeholder='Як ви прийшли до думки запропонувати це' className='textArea_preset'/>
                        </div>

                        <div className="dataUpload_addTags">
                            <span>Введіть теги, котрі відповідают товару</span>
                            
                            <div className="custom_search">
                                <img src={search} alt="search" />
                                <input type="text" placeholder="Введіть тег" />
                            </div>

                            <div className="dataUpload_addTags_tags">
                                <span>Додані теги:</span>

                                <div>
                                    <button>#тег</button>
                                    <button>#ДОВГИЙтег</button>
                                    <button>#ДУЖЕДОВГИЙтег</button>
                                    <button>#тТЕФКОФАФАФАег</button>
                                    <button>#гег</button>
                                    <button>#ЧУДЛЯКИБУДЛЯКИчудлибудлибудляки</button>
                                    <button>#чудличудличудлюдлей</button>
                                    <button>#чудличудличудлюдлей</button>
                                </div>
                            </div>
                        </div>


                        <button className='button_preset'>Відправити пропозицію</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SuggestPage