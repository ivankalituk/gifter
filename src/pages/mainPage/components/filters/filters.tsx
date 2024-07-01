import { FC, useState , ChangeEvent} from "react";

import './filters.scss'

import search from '@/assets/images/Search.svg'

const Filters: FC = () =>{

    // для чекбокса гендера
    const [checkboxGenderAll, setCheckboxGenderAll] = useState<boolean>(false)
    const [checkboxGenderMen, setCheckboxGenderMen] = useState<boolean>(false)
    const [checkboxGenderWoman, setCheckboxGenderWoman] = useState<boolean>(false)

    // для чекбокса гендера
    const handleChangeGenderAll = (event: ChangeEvent<HTMLInputElement>) =>{
        setCheckboxGenderAll(event.target.checked)
    }

    const handleChangeGenderMen = (event: ChangeEvent<HTMLInputElement>) =>{
        setCheckboxGenderMen(event.target.checked)
    }

    const handleChangeGenderWoman = (event: ChangeEvent<HTMLInputElement>) =>{
        setCheckboxGenderWoman(event.target.checked)
    }


    return(
        <div className="filters">

            <div className="filters_tagSearch">
                
                <div className="filters_tagSearch_searchBar">
                    <img src={search} alt="search" />
                    <input type="text" placeholder="Введіть тег" />
                </div>

                <div className="filters_tagSearch_tags">
                    <div className="tag">#ДляГеїв</div>
                    <div className="tag">#ДляПедиків</div>
                    <div className="tag">#ДляПедорастів</div>
                    <div className="tag">#ДляНебінарніхХвойдоДрочерів</div>
                    <div className="tag">#ДляГеївЩоГолосуютьЗаОПЗЖ</div>
                    <div className="tag">#ХуйКартопляБалалайкаАнусТигрЯраняйка</div>
                </div>

            </div>

            <div className="filters_gender">
                <div className="filters_gender_heading">Стать</div>

                <div className="filters_gender_genders">

                    <div className="gender">
                        <span>Для всіх</span>

                        <div className={checkboxGenderAll? "gender_customCheck active" : "gender_customCheck disabled"}>
                            <div className={checkboxGenderAll? "gender_customCheck_circle active" : "gender_customCheck_circle disabled"}></div>
                        </div>

                        <input type="checkbox" checked={checkboxGenderAll} onChange={handleChangeGenderAll}/>
                    </div>
                    
                    <div className="gender">
                        <span>Для чоловіків</span>

                        <div className={checkboxGenderMen? "gender_customCheck active" : "gender_customCheck disabled"}>
                            <div className={checkboxGenderMen? "gender_customCheck_circle active" : "gender_customCheck_circle disabled"}></div>
                        </div>

                        <input type="checkbox" checked={checkboxGenderMen} onChange={handleChangeGenderMen}/>
                    </div>

                    <div className="gender">
                        <span>Для жінок</span>

                        <div className={checkboxGenderWoman? "gender_customCheck active" : "gender_customCheck disabled"}>
                            <div className={checkboxGenderWoman? "gender_customCheck_circle active" : "gender_customCheck_circle disabled"}></div>
                        </div>

                        <input type="checkbox" checked={checkboxGenderWoman} onChange={handleChangeGenderWoman}/>
                    </div>

                </div>
            </div>

            <div className="filters_age">
                <div className="filters_age_heading">
                    <span>Вік</span>
                    <div className="custom_switch"></div>
                </div>

                <div className="filters_age_customRange">
                    <input type="range" min={0} max={2} step={1}/>
                </div>
                

            </div>


        </div>
    )
}

export default Filters