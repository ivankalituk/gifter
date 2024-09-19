import { FC, useState } from "react";
import './settingsPage.scss'

import sampleLogo from '@/assets/images/logoSample.jpg'
import insertPhoto from '@/assets/images/insertPhoto.svg'
import editPen from '@/assets/images/editPen.svg'

// СМЕНА НИКА +
// СМЕНА АВЫ +
// СМЕНА ТЕГОВ ПОЛЬЗОВАТЕЛЯ 
// СМЕНА БИО
// МОЖНО ЛИ ОТОБРАЖАТЬ ИСПОЛЬЗОВАННЫЕ ТЕГИ (МБ УБРАТЬ) -
// ВЫХОД ИЗ АККАУНТА



const SettingsPage: FC = () => {

    // ---------------
    // IMAGE UPLOAD
    // ---------------

    const handleImageUpload = () => {
        console.log("IMAGE HANDLE IMAGE ADDED")
    }


    // ---------------
    // NICKNAME CHANGE
    // ---------------

    const [nichnameChange, setNicknameChange] = useState<boolean>(false)

    const handleNicknameChange = () => {
        setNicknameChange(true)
    }

    return(
        <div className="settingsPage">
            <div className="settingsPage_container">
                <div className="settingsPage_settingsPanel">

                    <div className="settingsPage_settingsPanel_imgUpload">
                        
                        <img src={sampleLogo} alt="insertPhoto" />

                        <div className="settingsPage_settingsPanel_imgUpload_inputGroup">
                            <img src={insertPhoto} alt="insertPhoto" />
                            <input type="file" onChange={handleImageUpload} />
                        </div>
                    </div>

                    <div className="settingsPage_nameChange">
                        
                        {!nichnameChange && <div className="settingsPage_nameChange_initial">
                            <span>NICKNAME</span>
                            <button onClick={handleNicknameChange}><img src={editPen} alt="edit" /></button>
                        </div>}

                        {nichnameChange && <div className="settingsPage_nameChange_change">
                            <input type="text" className="inputText_preset"/>
                            <button className="button_preset">Submit</button>
                        </div>}

                    </div>

                    <div className="settingsPage_bioChange">
                        
                        <textarea  className="textArea_preset" placeholder="Біо"></textarea>

                        <button className="button_preset">Підтвердити</button>
                    </div>

                    <div className="settingsPage_tagsChange">
                        {/* ТУТ ДОЛГО ДЕЛАТЬ */}

                        {/* SEARCHBAR */}
                        {/* TAGLIST */}
                        {/* SUBMIT BUTTON */}
                    </div>

                    <div className="settingsPage_accountExit">
                        <button className="button_preset">ВИЙТИ З АККАУНТУ</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SettingsPage