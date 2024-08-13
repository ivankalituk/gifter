import { FC, useState , ChangeEvent, useEffect} from "react";

import './filters.scss'

import search from '@/assets/images/Search.svg'
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getTagByInput } from "@/api/tags";

interface FilterInterface {
    handleFiltersOpen: ()=> void,
    filtersOpen: boolean
}

const Filters: FC <FilterInterface>= ({filtersOpen, handleFiltersOpen}) =>{

    // для чекбокса гендера
    const [checkboxGenderAll, setCheckboxGenderAll] = useState<boolean>(false)
    const [checkboxGenderMen, setCheckboxGenderMen] = useState<boolean>(false)
    const [checkboxGenderWoman, setCheckboxGenderWoman] = useState<boolean>(false)

    // для бургер фильтра
    const [burgerFilter, setBurgerFilter] = useState<boolean>(false)

    // для чекбокса гендера
    // const handleChangeGenderAll = (event: ChangeEvent<HTMLInputElement>) =>{
    //     setCheckboxGenderAll(event.target.checked)
    //     if(event.target.checked){
    //         handleAddTag("#дляВсіх")
    //     } else {
    //         handleRemoveTag("#дляВсіх")
    //     }
    // }
    // const handleChangeGenderMen = (event: ChangeEvent<HTMLInputElement>) =>{
    //     setCheckboxGenderMen(event.target.checked)
    //     if(event.target.checked){
    //         handleAddTag("#дляЧоловіків")
    //     } else {
    //         handleRemoveTag("#дляЧоловіків")
    //     }
    // }
    // const handleChangeGenderWoman = (event: ChangeEvent<HTMLInputElement>) =>{
    //     setCheckboxGenderWoman(event.target.checked)
    //     if(event.target.checked){
    //         handleAddTag("#дляЖінок")
    //     } else {
    //         handleRemoveTag("#дляЖінок")
    //     }
    // }

    const handleChangeGender = (event: ChangeEvent<HTMLInputElement>, gender: string) => {
        const isChecked = event.target.checked;
    
        // Обновляем состояние соответствующего чекбокса
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
    
        // Добавляем или удаляем тег в зависимости от состояния чекбокса
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


    // для хранения выбранных тегов подарков
    const [chosenTags, setChosenTags] = useState<string[]>([])



    // по вводу текста в поиск, будут находиться теги, при выборе тега из списка, он будет добавляться в общий список
    const [tagInput, setTagInput] = useState<string>('')
    const [tagInputKey, setTagInputKey] = useState<number>(1)
    const [tagInputEnabled, setTagInputEnabled] = useState<boolean>(true)


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

    const handleAddTag = (text: string) => {
        setChosenTags(prevTags => [...prevTags, text])
    }

    // запрос на сервер для списка тегов по схожести
    const {data: tags, isFetched: tagsFetched} = useGetRequest({fetchFunc: () => getTagByInput({text: tagInput}), enabled: tagInputEnabled, key: [tagInputKey]})

    return(
        <div className="filters">
            <div className= {filtersOpen? "filters_container" : "filters_container show"}>

                <div className="filters_tagSearch">
                    
                    <div className="filters_tagSearch_searchBar">
                        <img src={search} alt="search" />
                        <input type="text" placeholder="Введіть тег" value={tagInput} onChange={handleTagInputChange}/>

                        {(tagsFetched && tags.length > 0) && <div className="filters_tagSearch_results">
                            {tags.map((data: any, index: number) => (
                                <button className="filters_tagSearch_result" onClick={() =>handleSearchTag(data.text)} key={index}>{data.text}</button>
                                ))}
                        </div>}
                    </div>

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

            </div>

            <div className={filtersOpen? "filters_backround" : "filters_backround show"} onClick={handleFiltersOpen}></div>
        </div>
    )
}

export default Filters