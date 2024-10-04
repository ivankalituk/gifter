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
    filtersOpen: boolean,
    nameSearch: string,
    deleteSearchCallBack: () => void
}

const Filters: FC <FilterInterface>= ({filtersOpen, handleFiltersOpen, filtersCallback, nameSearch, deleteSearchCallBack}) =>{

    // для чекбокса гендера
    const [checkboxGenderAll, setCheckboxGenderAll] = useState<boolean>(false)
    const [checkboxGenderMen, setCheckboxGenderMen] = useState<boolean>(false)
    const [checkboxGenderWoman, setCheckboxGenderWoman] = useState<boolean>(false)

    // для бургер фильтра
    const [burgerFilter, setBurgerFilter] = useState<boolean>(false)

    // отловить нажатия на чекбоксы гендера
    const handleChangeGender = (event: ChangeEvent<HTMLInputElement>, gender: string) => {
        
        const isChecked = event.target.checked;

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
            addTag(gender);
        } else {
            removeTag(gender); 
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

    // ЗАМЕНИТЬ
    // -----------------------------------------------------------------------------------------------------
    // Обработка тегов
    // -----------------------------------------------------------------------------------------------------

    // добавление тега, если он не добавлен
    const addTag = (tag: string) =>{
        if (!chosenTags.includes(tag)){
            setChosenTags((prevTag) => [... prevTag, tag])
        }
    }

    // удаление тега
    const removeTag = (tag: string) => {
        setChosenTags(chosenTags.filter((chosenTag) => chosenTag !== tag))
    }

    // нажатие Застосувати, поиск по фильтрам
    const handleSearchByFilters = () =>{
        console.log(1)
        filtersCallback(chosenTags)
    }

    // -----------------------------------------------------------------------------------------------------
    // SEARCHBAR
    // -----------------------------------------------------------------------------------------------------

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
        addTag(text)
    }

    // изменение чека кастомных чекбоксов, если тег был удалён из массива тегов нажатием
    useEffect(() => {
        if (chosenTags.includes("#дляВсіх")){
            setCheckboxGenderAll(true)
        } else {
            setCheckboxGenderAll(false)
        }

        if (chosenTags.includes("#дляЖінок")){
            setCheckboxGenderWoman(true)
        } else {
            setCheckboxGenderWoman(false)
        }

        if (chosenTags.includes("#дляЧоловіків")){
            setCheckboxGenderMen(true)
        } else {
            setCheckboxGenderMen(false)
        }
    }, [chosenTags])
    

    return(
        <div className="filters">
            <div className= {filtersOpen? "filters_container" : "filters_container show"}>

                <div className="filters_tagSearch">

                    <SearchBar searchInput = {tagInput} results = {tags} handleSearchInputCallBack = {handleTagInputCallBack} resultsFetched = {tagsFetched} handleSearchInputSubmitCallBack = {handleTagInputSubmitCallBack}/>

                    {chosenTags.length > 0 && <div className="filters_tagSearch_tags">
                        {chosenTags.map((text: string, index: number) => (
                            <button className="tag" key={index} onClick={() => removeTag(text)}>{text}</button>
                        ))}
                    </div>}

                </div>

                {nameSearch && <div className="filters_nameSearch">
                    <div className="filters_nameSearch_heading">Пошук за іменем подарунку:</div>
                    <div className="filters_nameSearch_name">...{nameSearch}...</div>
                    <button onClick={deleteSearchCallBack} className="button_preset">Видалити</button>
                </div>}


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