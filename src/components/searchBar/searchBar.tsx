import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import './searchBar.scss'

import searchSign from '@/assets/images/Search.svg'
import { Tag } from "@/interfaces/interface";

interface SearchBar {
    tagInput: string,
    tags: Tag[] | undefined,
    handleTagInputCallBack: (text: string) => void,
    tagsFetched: boolean
    handleTagInputSubmitCallBack: (text: string) => void
}

const SearchBar: FC <SearchBar> = ({tagInput, tags, handleTagInputCallBack, tagsFetched, handleTagInputSubmitCallBack}) => {
 
    // отловить фокус инпута
    const [inputFocus, setInputFocus] = useState<boolean>(false)

    const handleFocus = () => {
        setInputFocus(true)
    }

    const handleUnFocus = () => {
        setInputFocus(false)
    }

    // индекс текущего выбранного результата (вверх вниз)
    const [chosenResultIndex, setChosenResultIndex] = useState<number>(-1)


    // отловить изменение инпута 
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleTagInputCallBack(event.target.value)
        setChosenResultIndex(-1)
    }

    // отлавливание нажатий в инпуте (вверх вниз энтер)
    const handleSpecialKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter'){
            
            //если выбран тег из резалтов и после нажат энтер 
            if(chosenResultIndex > -1 && tags){
                handleTagInputCallBack(tags[chosenResultIndex].text)
                setChosenResultIndex(-1)
            } else {
                handleSubmit(tagInput)
            }
        } else {

            // возможно сделать тут иф только для эрроу ап и эрроу даун
            if (!tags) {
                console.error('Массив tags пуст или равен null');
                return;
            }
        
            let newIndex = chosenResultIndex;
        
            switch (event.key) {
                case 'ArrowUp':
                    if (newIndex > 0) {
                        newIndex = newIndex - 1;
                    } else {
                        newIndex = tags.length - 1;
                    }
                    setChosenResultIndex(newIndex);
                    break;
                case 'ArrowDown':
                    if (newIndex < tags.length - 1) {
                        newIndex = newIndex + 1;
                    } else {
                        newIndex = 0;
                    }
                    setChosenResultIndex(newIndex);
                    break;
                default:
                    break;
            }
        
            // добавление в инпут резалта по айди
            // возможно работает и без этого ифа (переделывал) 
            // if (newIndex >= 0 && newIndex < tags.length) {
            //     // ТУТ ДОЛЖНО БЫТЬ ДЕЙСТВИЕ С ТЕГОМ ИЗ РЕЗАЛТС
            // }
        }
    };

    // для занесения тега в массив тегов для поиска
    const handleSubmit = (tag: string) => {
        setChosenResultIndex(-1)
        handleTagInputSubmitCallBack(tag)
        handleTagInputCallBack('')
    }

    return(
        <div className="searchBar">
            
            {/* когда фокус и есть результаты.ленгз > 1, то добавить резултс в классы*/}
            <div className={(inputFocus && tags && tags.length > 0)? "searchBar_container results" : "searchBar_container"}>

                <img src={searchSign} alt="search" />

                <input type="text" placeholder="Введіть тег" onFocus={handleFocus} onBlur={handleUnFocus} value={tagInput} onChange={(event) => handleInputChange(event)} onKeyDown={(event) => handleSpecialKeyDown(event)}/>
 
                {tags && tagsFetched && inputFocus && tags?.length > 0 && <div className="searchBar_results">
                    {tags && tags.map((data, index) => (
                        <button key={index} className={index === chosenResultIndex?"active" : ""} onMouseDown={() => handleSubmit(data.text)} >{data.text}</button>
                    ))}
                </div>}
            </div>

            <div className={inputFocus? "searchBar_background show" : "searchBar_background"} />
        </div>
    )
}

export default SearchBar