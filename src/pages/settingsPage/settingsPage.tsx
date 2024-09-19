import React, { FC, useState } from "react";
import './settingsPage.scss'

import sampleLogo from '@/assets/images/logoSample.jpg'
import insertPhoto from '@/assets/images/insertPhoto.svg'
import editPen from '@/assets/images/editPen.svg'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, Tag } from "@/interfaces/interface";
import { clearUser, setUser } from "@/redux/userSlice";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/searchBar/searchBar";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getTagByInput } from "@/api/tags";

// СМЕНА НИКА +
// СМЕНА АВЫ +
// СМЕНА ТЕГОВ ПОЛЬЗОВАТЕЛЯ 
// СМЕНА БИО
// МОЖНО ЛИ ОТОБРАЖАТЬ ИСПОЛЬЗОВАННЫЕ ТЕГИ (МБ УБРАТЬ) -
// ВЫХОД ИЗ АККАУНТА



const SettingsPage: FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)


    // ---------------
    // IMAGE UPLOAD
    // ---------------

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

        // тут же отправлять фото на сервер
    }

    // ---------------
    // NICKNAME CHANGE
    // ---------------

    const [nichnameChange, setNicknameChange] = useState<boolean>(false)
    const [nicknameInput, setNicknameInput] = useState<string>('')

    const handleNicknameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNicknameInput(event.target.value)
    }

    const handleNicknameChange = () => {
        setNicknameChange(true)
    }

    const handleNicknameSubmit = () => {
        console.log("SUBMIT NEW NICKNAME: ", nicknameInput)
        // добавление логина в бд
        setNicknameChange(false)
    }

    // ---------------
    // BIO CHANGE
    // ---------------

    const [bioArea, setBioArea] = useState<string>('')
    
    const handleBioChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBioArea(event.target.value)
    }

    const handleBioSubmit = () => {
        console.log("BIO SUBMIT: ", bioArea)
        // добавление био на бд
    }

    // ---------------
    // ACCOUNT EXIT
    // ---------------

    const handleAccountExit = () =>{
        localStorage.setItem('access_token', '')
        dispatch(clearUser())
        navigate('/')
    }

    // ---------------
    // USER TAG LIST
    // ---------------

    const [tagInput, setTagInput] = useState<string>('')
    const [tagInputEnabled, setTagInputEnabled] = useState<boolean>(true)
    const [tagInputKey, setTagInputKey] = useState(1)

    const {data: tags, isFetched: tagsFetched} = useGetRequest<Tag[]>({fetchFunc: () => getTagByInput({text: tagInput}), enabled: tagInputEnabled, key: [tagInputKey]})

    const handleTagInputCallBack = (text: string) => {
        setTagInput(text)
        setTagInputKey(tagInputKey + 1)
    }

    const handleTagInputSubmitCallBack = (text: string) =>{
        console.log(text)
    }
    
    const [userTags, setUserTags] = useState<string[]>([])

    const handleAddUserTag = (tag: string) => {
        setUserTags(prevTags => [... prevTags, tag])
    }

    const handleRemoveUserTag = (tag: string) =>{
        setUserTags(prevTags => userTags.filter(filtredTag => filtredTag !== tag) )
    }

    return(
        <div className="settingsPage">
            <div className="settingsPage_container">
                <div className="settingsPage_settingsPanel">

                    <div className="settingsPage_settingsPanel_imgUpload">
                        
                        <img src={selectedImg? selectedImg : user.user_imgUrl? user.user_imgUrl : null} alt="insertPhoto" />

                        <div className="settingsPage_settingsPanel_imgUpload_inputGroup">
                            <img src={insertPhoto} alt="insertPhoto" />
                            <input type="file" onChange={handleImageUpload} />
                        </div>
                    </div>

                    <div className="settingsPage_nameChange">
                        
                        {!nichnameChange && <div className="settingsPage_nameChange_initial">
                            <span>{user.user_nickName}</span>
                            <button onClick={handleNicknameChange}><img src={editPen} alt="edit" /></button>
                        </div>}

                        {nichnameChange && <div className="settingsPage_nameChange_change">
                            <input type="text" className="inputText_preset" value={nicknameInput} onChange={(event) => handleNicknameInput(event)}/>
                            <button className="button_preset" onClick={handleNicknameSubmit}>Submit</button>
                        </div>}

                    </div>

                    <div className="settingsPage_bioChange">
                        
                        <textarea  className="textArea_preset" placeholder="Біо" value={bioArea} onChange={handleBioChange}></textarea>

                        <button className="button_preset" onClick={handleBioSubmit}>Підтвердити</button>
                    </div>

                    <div className="settingsPage_tagsChange">
                        <SearchBar tagInput={tagInput} handleTagInputCallBack = {handleTagInputCallBack} tags = {tags} tagsFetched = {tagsFetched} handleTagInputSubmitCallBack = {handleTagInputSubmitCallBack}/>
                    </div>

                    <div className="settingsPage_accountExit">
                        <button className="button_preset" onClick={handleAccountExit}>ВИЙТИ З АККАУНТУ</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SettingsPage