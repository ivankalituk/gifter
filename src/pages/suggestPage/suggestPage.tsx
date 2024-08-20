import './suggestPage.scss'

import { FC, useState } from "react";

import search from '@/assets/images/Search.svg'

import insertPhoto from '@/assets/images/insertPhoto.svg'
import giftPreInsertPhoto from '@/assets/images/giftPreInsertPhoto.svg'
import { suggestForPost, Tag } from '@/interfaces/interface';
import { useUpdateRequest } from '@/hooks/useUpdateRequest';
import { createSuggest } from '@/api/suggest';
import { useGetRequest } from '@/hooks/useGetReuquest';
import { getTagByInput } from '@/api/tags';
import { useNavigate } from 'react-router-dom';

const  SuggestPage: FC  = () => {

    const navigate = useNavigate()

    // ОБРАБОТКА ФОТО
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
    
    // РАБОТА С ЗАПРОСАМИ ДЛЯ САГГЕСТА
    const {mutatedFunc: postSuggest} = useUpdateRequest({fetchFunc: createSuggest})

    const [suggestName, setSuggestName] = useState<string>('')
    const [suggestDesc, setSuggestDesc] = useState<string>('')
    const [help, setHelp] = useState<boolean>(false)

    const handleCreateSuggest = () =>{
        if (suggestDesc === '' || suggestName === ''){
            setHelp(true)
            console.log("HELP")
        } else {

            // в формдату залить массив тегов
            const data = new FormData()
            data.append('name', suggestName)
            data.append('user_id', '2')
            data.append('content', suggestDesc)
            // data.append('tags[]', tagArray)
            data.append('image', selectedImgFile)

            postSuggest(data)
            navigate('/')
        }
    }

    // отловить текст названия 
    const handleSuggestName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSuggestName(event.target.value)
    }

    // отловить текст описания
    const handleSuggestDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSuggestDesc(event.target.value)
    }
    
    // МАССИВ ТЕГОВ
    const [tagArray, setTagArray] = useState<string[]>([])

    // для запроса на теги
    const [tagInput, setTagInput] = useState<string>('')
    const [tagInputKey, setTagInputKey] = useState<number>(1)
    const [tagInputEnabled, setTagInputEnabled] = useState<boolean>(true)

    // сделать добавление тегов через поиск и так далее
    const {data: tags, isFetched: tagsFetched} = useGetRequest<Tag[]>({fetchFunc: () => getTagByInput({text: tagInput}), enabled: tagInputEnabled, key: [tagInputKey]})

    // отловить изменения инпута
    const handleTagInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(event.target.value)
        console.log(tagInput)
        setTagInputKey(tagInputKey + 1)
        console.log(tags)
    }

    // для добавления неопределённого тега по нажатию на энтер
    const handleEnterTagInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && tagInput !== ''){
            handleTag(tagInput)
            setTagInput('')
            setTagInputKey(tagInputKey + 1)
        }
    }
    
    // для удаления тега из списка выбранных тегов
    const handleRemoveTag = (newTag: string) => {
        setTagArray(prevTags => prevTags.filter(tag => tag !== newTag))
    }

    // для добавления тега из списка результатов
    const handleTag = (tag: string) => {
        if (!tagArray.includes(tag)){
            setTagArray(prevTags => [...prevTags, tag])
        }
        setTagInput('')
        setTagInputKey(tagInputKey + 1)
    }

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
                            <div>Введіть назву подарунку{help && <span className='helpSpan'>*</span>}</div>
                            <input type="text" className='inputText_preset' placeholder='Назва подарунку' onChange={(event) => handleSuggestName(event)}/>
                        </div>

                        <div className="dataUpload_description">
                            <div>Введіть пояснення подарунку{help && <span className='helpSpan'>*</span>}</div>
                            <textarea placeholder='Як ви прийшли до думки запропонувати це' className='textArea_preset' onChange={(event) => handleSuggestDesc(event)}/>
                        </div>

                        <div className="dataUpload_addTags">
                            <span>Введіть теги, котрі відповідают товару</span>
                            

                        <div className="filters_tagSearch_searchBar">
                            <img src={search} alt="search" />
                            <input type="text" placeholder="Введіть тег" value={tagInput} onChange={handleTagInput} onKeyDown={(event) => handleEnterTagInput(event)}/>

                            {(tagsFetched && tags !== null && tags.length > 0) && <div className="filters_tagSearch_results">
                                {tags.map((data: any, index: number) => (
                                    <button className="filters_tagSearch_result" onClick={() =>handleTag(data.text)} key={index}>{data.text}</button>
                                    ))}
                            </div>}
                        </div>

                            <div className="dataUpload_addTags_tags">
                                <span>Додані теги:</span>

                                <div>{tagArray.map((tag) => (
                                     <button onClick={() => handleRemoveTag(tag)}>{tag}</button>
                                ))}
                                </div>
                            </div>
                        </div>


                        <button className='button_preset' onClick={handleCreateSuggest}>Відправити пропозицію</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default SuggestPage