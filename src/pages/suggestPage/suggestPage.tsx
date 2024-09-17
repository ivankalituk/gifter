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
import SearchBar from '@/components/searchBar/searchBar';

const  SuggestPage: FC  = () => {

    const navigate = useNavigate()


    // ----------------------------------------------
    // Photo upload
    // ----------------------------------------------
    
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
    
    // ----------------------------------------------
    // POST SUGGEST
    // ----------------------------------------------

    const {mutatedFunc: postSuggest} = useUpdateRequest({fetchFunc: createSuggest})

    const [suggestName, setSuggestName] = useState<string>('')
    const [suggestDesc, setSuggestDesc] = useState<string>('')
    const [help, setHelp] = useState<boolean>(false)

    const handleCreateSuggest = () =>{
        if (suggestDesc === '' || suggestName === ''){
            setHelp(true)
        } else {

            // в формдату залить массив тегов
            const data = new FormData()
            data.append('name', suggestName)
            data.append('user_id', '2')
            data.append('content', suggestDesc)
            tagArray?.forEach((tag) => (data.append('tagArray', tag)))
            
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

    // для удаления тега из списка выбранных тегов
    const handleRemoveTag = (newTag: string) => {
        setTagArray(prevTags => prevTags.filter(tag => tag !== newTag))
    }

    // добавление тега в выбранные теги
    const handleAddtag = (newTag: string) => {
        if (!tagArray.includes(newTag)){
            setTagArray(prevTags => [... prevTags, newTag])
        }
    }

    // ----------------------------------------------
    // SearchBar
    // ----------------------------------------------

    const [tagInput, setTagInput] = useState<string>('')
    const [tagInputKey, setTagInputKey] = useState<number>(1)
    const [tagInputEnabled, setTagInputEnabled] = useState<boolean>(true)

    // сделать добавление тегов через поиск и так далее
    const {data: tags, isFetched: tagsFetched} = useGetRequest<Tag[]>({fetchFunc: () => getTagByInput({text: tagInput}), enabled: tagInputEnabled, key: [tagInputKey]})
    
    // колбек для изменения поискового запроса
    const handleTagInputCallBack = (text: string) => {
        setTagInput(text)
        setTagInputKey(tagInputKey + 1)
    }

    // окончательное добавление тега
    const handleTagInputSubmitCallBack = (tag: string) => {
        handleAddtag(tag)
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
                            

                            <div className="filters_tagSearch">
                                <SearchBar tagInput={tagInput} tags = {tags} handleTagInputCallBack = {handleTagInputCallBack} tagsFetched = {tagsFetched} handleTagInputSubmitCallBack = {handleTagInputSubmitCallBack}/>
                            </div>

                            <div className="dataUpload_addTags_tags">
                                <span>Додані теги:</span>

                                <div>{tagArray.map((tag, index) => (
                                    <button onClick={() => handleRemoveTag(tag)} key={index}>{tag}</button>
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