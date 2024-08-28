import { FC, useState , ChangeEvent, useEffect} from "react";

import './filters.scss'

import search from '@/assets/images/Search.svg'
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getTagByInput } from "@/api/tags";
import { Tag } from "@/interfaces/interface";
import SearchBar from "@/components/searchBar/searchBar";

interface FilterInterface {
    handleFiltersOpen: ()=> void,
    filtersCallback: (tags: string[]) => void,
    filtersOpen: boolean
}

const Filters: FC <FilterInterface>= ({filtersOpen, handleFiltersOpen, filtersCallback}) =>{

    // для чекбокса гендера
    const [checkboxGenderAll, setCheckboxGenderAll] = useState<boolean>(false)
    const [checkboxGenderMen, setCheckboxGenderMen] = useState<boolean>(false)
    const [checkboxGenderWoman, setCheckboxGenderWoman] = useState<boolean>(false)

    // для бургер фильтра
    const [burgerFilter, setBurgerFilter] = useState<boolean>(false)

    // для чекбокса гендера
    const handleChangeGender = (event: ChangeEvent<HTMLInputElement>, gender: string) => {
        
        const isChecked = event.target.checked;
    
        const NEWFKNCOMMITFORGITFKNHUB = true

        // Обновляем состояние чекбокса
        switch (gender) {
            case "#дляВсіх":
                setCheckboxGenderAll(isChecked);
                break;
            case "#дляЧоловіків":
                setCheckboxGenderMen(isChecked);
                break;
            case "#дляЖінок":
                setCheckboxGenderWoman(isChecked);
                break;
            default:
                break;
        }
    
        // Добавляем или удаляем тег 
        if (isChecked) {
            handleAddTag(gender);
        } else {
            handleRemoveTag(gender); 
        }
    };
    

    // для инпут ренджа
    const [rangeValue, setRangeValue] = useState<number>(0)

    // для инпут ренджа
    const handleRangeChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setRangeValue(Number(event.target.value))
    }

    // для инпут свитч
    const [ageInputSwitch, setAgeInputSwitch] = useState<boolean>(false)

    const handleAgeInputSwitch = () =>{
        setAgeInputSwitch(!ageInputSwitch)
    }


    // отловить изменение в поиске тегов 
    const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{    
        setTagInput(event.target.value)
        
        setTagInputKey(tagInputKey + 1)
    }

    // отловить выбор тега пользователем
    const handleSearchTag = (text: string) => {

        // сделать проверку на такие же теги
        if(!chosenTags.includes(text)){
            handleAddTag(text)

            if (text === "#дляВсіх"){setCheckboxGenderAll(true)}
            if (text === "#дляЧоловіків"){setCheckboxGenderMen(true)}
            if (text === "#дляЖінок"){setCheckboxGenderWoman(true)}
        }

        setTagInput('')
        setTagInputKey(tagInputKey + 1)
    }

    // убрать тег по нажатию на него
    const handleRemoveTag = (text: string) => {
        setChosenTags(prevTags => prevTags.filter(tag => tag !== text))
        if (text === "#дляВсіх"){setCheckboxGenderAll(false)}
        if (text === "#дляЧоловіків"){setCheckboxGenderMen(false)}
        if (text === "#дляЖінок"){setCheckboxGenderWoman(false)}
    }

    // добавление тега в массив
    const handleAddTag = (text: string) => {
        setChosenTags(prevTags => [...prevTags, text])
    }

    // начать поиск по тегам
    const handleSearchByFilters = () =>{
        console.log(1)
        filtersCallback(chosenTags)
    }


    // ЗАНОВО СОЗДАННЫЕ ТЕГИ 
    const [chosenTags, setChosenTags] = useState<string[]>([])              //хранение выбранных тегов
    const [tagInput, setTagInput] = useState<string>('')                    //сохранение инпута сёрчбара
    const [tagInputKey, setTagInputKey] = useState<number>(1)               //ключ обновления инпута тегов
    const [tagInputEnabled, setTagInputEnabled] = useState<boolean>(true)   //енейблед для хука тегов(пока не работает)

    // запрос на сервер для списка тегов по схожести
    const {data: tags, isFetched: tagsFetched} = useGetRequest<Tag[]>({fetchFunc: () => getTagByInput({text: tagInput}), enabled: true, key: [tagInputKey]})
    
    // колбек для сёрчбара (возвращает результат для поиска тега)
    const handleTagInputCallBack = (text: string) => {
        setTagInput(text)
        setTagInputKey(tagInputKey + 1)
        console.log(tags)
    }

    // окончательное добавление тега через сёрчбар
    const handleTagInputSubmitCallBack = (text: string) => {
        setTagInput('')

        // внесение тега
        console.log(text)
    }

    return(
        <div className="filters">
            <div className= {filtersOpen? "filters_container" : "filters_container show"}>

                <div className="filters_tagSearch">

                    <SearchBar tagInput = {tagInput} tags = {tags} handleTagInputCallBack = {handleTagInputCallBack} tagsFetched = {tagsFetched} handleTagInputSubmitCallBack = {handleTagInputSubmitCallBack}/>

                    {chosenTags.length > 0 && <div className="filters_tagSearch_tags">
                        {chosenTags.map((text: string, index: number) => (
                            <button className="tag" key={index} onClick={() => handleRemoveTag(text)}>{text}</button>
                        ))}
                    </div>}

                </div>

                <div className="filters_gender">
                    <div className="filters_gender_heading">Стать</div>

                    <div className="filters_gender_genders">

                        <div className="gender">
                            <span>Для всіх</span>

                            <div className={checkboxGenderAll? "gender_customCheck active" : "gender_customCheck disabled"}>
                                <div className={checkboxGenderAll? "gender_customCheck_circle active" : "gender_customCheck_circle disabled"}></div>
                            </div>

                            <input type="checkbox" checked={checkboxGenderAll} onChange={(event) => handleChangeGender(event, '#дляВсіх')}/>
                        </div>
                        
                        <div className="gender">
                            <span>Для чоловіків</span>

                            <div className={checkboxGenderMen? "gender_customCheck active" : "gender_customCheck disabled"}>
                                <div className={checkboxGenderMen? "gender_customCheck_circle active" : "gender_customCheck_circle disabled"}></div>
                            </div>

                            <input type="checkbox" checked={checkboxGenderMen} onChange={(event) => handleChangeGender(event, '#дляЧоловіків')}/>
                        </div>

                        <div className="gender">
                            <span>Для жінок</span>

                            <div className={checkboxGenderWoman? "gender_customCheck active" : "gender_customCheck disabled"}>
                                <div className={checkboxGenderWoman? "gender_customCheck_circle active" : "gender_customCheck_circle disabled"}></div>
                            </div>

                            <input type="checkbox" checked={checkboxGenderWoman} onChange={(event) => handleChangeGender(event, '#дляЖінок')}/>
                        </div>
 
                    </div>
                </div>

                <div className="filters_age">
                    <div className="filters_age_heading">
                        <span>Вік</span>

                        <div className={ageInputSwitch? "custom_switch active" : "custom_switch"}>
                            <div className={ageInputSwitch? "custom_switch_thumb active" : "custom_switch_thumb "} />
                            <input type="checkbox" checked={ageInputSwitch} onChange={handleAgeInputSwitch}/>
                        </div>
                    </div>

                    <div className="filters_age_customRange">
                        <input type="range" min={0} max={2} step={1} value={rangeValue} onChange={handleRangeChange} />
                    </div>
                    

                </div>

                <button className="button_preset" onClick={handleSearchByFilters}>Застосувати</button>

            </div>

            <div className={filtersOpen? "filters_backround" : "filters_backround show"} onClick={handleFiltersOpen}></div>
        </div>
    )
}

export default Filters