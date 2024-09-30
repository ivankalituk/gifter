import { FC, useState } from "react";

import './giftCreationPage.scss'

import insertPhoto from '@/assets/images/insertPhoto.svg'
import giftPreInsertPhoto from '@/assets/images/giftPreInsertPhoto.svg'
import { suggestForPost, Tag } from '@/interfaces/interface';
import { useUpdateRequest } from '@/hooks/useUpdateRequest';
import { createSuggest } from '@/api/suggest';
import { useGetRequest } from '@/hooks/useGetReuquest';
import { getTagByInput } from '@/api/tags';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/searchBar/searchBar';

const GiftCreationPage : FC = () => {

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
    }


    const [help, setHelp] = useState<boolean>(false)

    return(
        <div className="giftCreationPage">
            <div className="giftCreationPage_container">
                
                <div className="giftCreationPage_gift">
                    <div className="giftCreationPage_gift_imgUpload">
                        
                        <img src={selectedImg? selectedImg : giftPreInsertPhoto} alt="insertPhoto" />

                        <div className="giftCreationPage_gift_imgUpload_inputGroup">
                            <img src={insertPhoto} alt="insertPhoto" />
                            <input type="file" onChange={handleImageUpload} />
                        </div>
                    </div>

                    <div className="giftCreationPage_gift_dataUpload">

                        <input type='file' className="dataUpload_photo" onChange={handleImageUpload}/>

                        <div className="dataUpload_name">
                            <div>Введіть назву подарунку{help && <span className='helpSpan'>*</span>}</div>
                            <input type="text" className='inputText_preset' placeholder='Назва подарунку' />
                        </div>

                        <div className="dataUpload_description">
                            <div>Введіть пояснення подарунку{help && <span className='helpSpan'>*</span>}</div>
                            <textarea placeholder='Як ви прийшли до думки запропонувати це' className='textArea_preset' />
                        </div>

                        <div className="dataUpload_addTags">
                            <span>Введіть теги, котрі відповідают товару</span>
                            

                            <div className="filters_tagSearch">
                                {/* <SearchBar searchInput={tagInput} results = {tags} handleSearchInputCallBack = {handleTagInputCallBack} resultsFetched = {tagsFetched} handleSearchInputSubmitCallBack = {handleTagInputSubmitCallBack}/> */}
                            </div>

                            <div className="dataUpload_addTags_tags">
                                <span>Додані теги:</span>

                                {/* <div>{tagArray.map((tag, index) => (
                                    <button onClick={() => handleRemoveTag(tag)} key={index}>{tag}</button>
                                ))}
                                </div> */}
                            </div>
                        </div>


                        <button className='button_preset'>Додати подарунок</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default GiftCreationPage