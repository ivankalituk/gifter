import { ChangeEvent, FC, useEffect, useState } from "react";

import './giftCreationPage.scss';

import giftPreInsertPhoto from '@/assets/images/giftPreInsertPhoto.svg';
import insertPhoto from '@/assets/images/insertPhoto.svg';
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getSuggestById } from "@/api/suggest";
import { deleteReportGift, getGiftByReport, getReportById } from "@/api/report";
import { useNavigate, useParams } from "react-router-dom";
import { RootState, Tag } from "@/interfaces/interface";
import { getTagByInput } from "@/api/tags";
import SearchBar from "@/components/searchBar/searchBar";
import { getGiftById, postGift, putGift } from "@/api/gifts";
import { useUpdateRequest } from "@/hooks/useUpdateRequest";
import { TypedUseSelectorHook, useSelector } from "react-redux";

interface giftCreationPage {
    type: string
    rep_id?: number
}

const GiftCreationPage : FC <giftCreationPage> = ({type, rep_id}) => {

    // ---------------------------------------------
    // получение начальных данных саггеста и репорта
    // ---------------------------------------------

    const [suggestEnabled, setSuggersEnabled] = useState<boolean>(type === 'suggest'? true : false)
    const [reportEnabled, setReportEnabled] = useState<boolean>(type === 'report'? true : false)

    const {suggest_id} = useParams()
    const {report_id} = useParams()


    const {data: suggest, isFetched: suggestFetched} = useGetRequest({fetchFunc: ()=> getSuggestById({suggest_id: suggest_id}), key: [], enabled: suggestEnabled})
    const {data: report, isFetched: reportFetched} = useGetRequest({fetchFunc: ()=> getGiftByReport({report_id: report_id}), key: [], enabled: reportEnabled})

    // --------------
    // обраюотка фото
    // -------------- 

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

    // -----------------
    // Обработка инпутов
    // -----------------

    const [nameInput, setNameInput] = useState<string>('')
    const [areaInput, setAreaInput] = useState<string>('')

    useEffect(() => {
        if(type === 'suggest'){
            if(suggest && suggestFetched){
                setAreaInput(suggest[0].content)
                setNameInput(suggest[0].name)

            }
        } else {
            if (report && reportFetched){
                setAreaInput('')
                setNameInput(report[0].name)
            }
        }
    }, [suggest, report, suggestFetched, reportFetched])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNameInput(event.target.value)
    }

    const handleAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setAreaInput(event.target.value)
    }

    // --------------------------
    // поиск тегов черезё сёрчбар
    // --------------------------

    const [tagInput, setTagInput] = useState<string>('')
    const [tagInputKey, setTagInputKey] = useState<number>(1)
    const [tagInputEnabled, setTagInputEnabled] = useState<boolean>(true)

    // МАССИВ ТЕГОВ
    const [tagArray, setTagArray] = useState<string[]>([])

    useEffect(() => {
        if(type === 'suggest'){
            if(suggest && suggestFetched){
                setTagArray(suggest[0].tags !== null? suggest[0].tags : [])
            }
        } else {
            if (report && reportFetched){
                setTagArray(report[0].tags !== null? report[0].tags : [])
            }
        }
    }, [suggest, report, suggestFetched, reportFetched])

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

    // --------------------------------
    // окончательное добавление подарка 
    // --------------------------------

    const navigate = useNavigate()

    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    const {mutatedFunc: createGift} = useUpdateRequest({fetchFunc: postGift})

    const {mutatedFunc: updateGift} = useUpdateRequest({fetchFunc: putGift})

    const [help, setHelp] = useState<boolean>(false)

    const handleAddGift = async () =>{

        // проверка на уровень админа
        if (user.user_role && user.user_role >=2){
            if(type === 'suggest'){
                if(tagArray.length >= 3 && nameInput !== '' && (selectedImgFile !== null || suggest[0].photoPath !== null)){
                    // отправить пост запрос на добавление подарка
                    const data = new FormData()
                    data.append('name', nameInput)
                    data.append('creator_id', String(suggest[0].user_id))
                    data.append('admin_id', String(user.user_id))
                    tagArray?.forEach((tag) => (data.append('tags', tag)))
                    data.append('suggest_id', String(suggest[0].id))

                    if(suggest[0].photoPath !== null && selectedImgFile === null){
                        data.append('imagePath', suggest[0].photoPath)
                    } else {
                        data.append('image', selectedImgFile)
                        if(suggest[0].photoPath !== null) {
                            data.append('imagePath', suggest[0].photoPath)
                        }
                    }
                    
                await createGift(data)
                navigate('/adminPanel/suggests')

                } else {
                    setHelp(true)
                }
            } else {
                if(tagArray.length >= 3 && nameInput !== '' && (selectedImgFile !== null || report[0].photoPath !== null)){
                    // отправить пут запрос на обновление подарка
                    const data = new FormData()
                    data.append('name', nameInput)
                    data.append('id', report[0].gift_id)
                    data.append('report_id', report[0].id)
                    tagArray?.forEach((tag) => (data.append('tags', tag)))
                    if(selectedImgFile !== null){
                        data.append('image', selectedImgFile)
                    }

                    // сам запрос
                    await updateGift(data)
                    navigate('/adminPanel/reports')
                } else {
                    setHelp(true)
                }
            }
        } else {
            alert("Ви на маєте достатнього рівня допуску")
        }

    }
    

    // ----------------
    // удаление подарка
    // ----------------

    const {mutatedFunc: deleteReportedGift} = useUpdateRequest({fetchFunc: deleteReportGift})

    const handleDeleteGift = async () => {
        if (user.user_role && user.user_role >= 2){
            await deleteReportedGift({gift_id: report[0].gift_id, report_id: report_id})
            navigate('/adminPanel/reports')
        } else {
            alert("Ви на маєте достатнього рівня допуску")
        }
    }

    return(
        <div className="giftCreationPage">
            <div className="giftCreationPage_container">
                
                <div className="giftCreationPage_gift">
                    <div className="giftCreationPage_gift_imgUpload">
                        
                        {(reportFetched || suggestFetched) && <img src={
                                type === "suggest"?
                                    selectedImg? selectedImg : (suggest[0].photoPath? 'http://localhost:1000/' + suggest[0].photoPath : insertPhoto)
                                :
                                    selectedImg? selectedImg : (report[0].photoPath? 'http://localhost:1000/' + report[0].photoPath : insertPhoto)

                            } alt="insertPhoto" />}

                        <div className="giftCreationPage_gift_imgUpload_inputGroup">
                            <img src={insertPhoto} alt="insertPhoto" />
                            <input type="file" onChange={handleImageUpload} />
                        </div>
                    </div>

                    <div className="giftCreationPage_gift_dataUpload">

                        {/* ЗАМЕНИТЬ, ЕСЛИ БЫЛО ФОТО ДО ТОГО КАК МЫ ЕГО ДОБАВИЛИ */}
                        {(reportFetched || suggestFetched) && <button className='dataUpload_photo_btn'>
                            <input type='file' className="dataUpload_photo" onChange={handleImageUpload}/>
                            <span>{
                                type === 'suggest'? 
                                    (selectedImgFile? ('Фото: ' + selectedImgFile.name) : (suggest[0].photoPath? 'Фото: ' + suggest[0].photoPath : 'Додати фото'))
                                :
                                    (selectedImgFile? ('Фото: ' + selectedImgFile.name) : (report[0].photoPath? 'Фото: ' + report[0].photoPath : 'Додати фото'))
                                }</span>
                        </button>}

                        <div className="dataUpload_name">
                            <div>Введіть назву подарунку{help && <span className='helpSpan'>*</span>}</div>
                            {(reportFetched || suggestFetched) && <input type="text" className='inputText_preset' value={nameInput} placeholder='Назва подарунку' onChange={handleInputChange}/>}
                        </div>

                        <div className="dataUpload_description">
                            <div>Введіть пояснення подарунку{help && <span className='helpSpan'>*</span>}</div>
                            {(reportFetched || suggestFetched) && <textarea placeholder='Як ви прийшли до думки запропонувати це' className='textArea_preset' value={areaInput} onChange={handleAreaChange}/>}
                        </div>

                        <div className="dataUpload_addTags">
                            <span>Введіть теги, котрі відповідают товару</span>
                            

                            <div className="filters_tagSearch">
                                <SearchBar searchInput={tagInput} results = {tags} handleSearchInputCallBack = {handleTagInputCallBack} resultsFetched = {tagsFetched} handleSearchInputSubmitCallBack = {handleTagInputSubmitCallBack}/>
                            </div>

                            <div className="dataUpload_addTags_tags">
                                <span>Додані теги:{help && <span className='helpSpan'>* не меньше трьох</span>}</span>

                                <div>{tagArray !== null && tagArray.length > 0 && tagArray.map((tag, index) => (
                                    <button onClick={() => handleRemoveTag(tag)} key={index}>{tag}</button>
                                ))}
                                </div>
                            </div>
                        </div>

                        <div className="giftCreationPage_gift_dataUpload_buttons">
                            <button className='button_preset' onClick={handleAddGift}>{type === 'report'? 'Оновити подарунок' : 'Додати подарунок'}</button>
                            {type === 'report' && <button className='button_preset' onClick={handleDeleteGift}>Видалити подарунок</button>}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default GiftCreationPage