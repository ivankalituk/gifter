import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import './searchBar.scss'

import searchSign from '@/assets/images/Search.svg'
import { Tag } from "@/interfaces/interface";

interface SearchBar {
    tagInput: string,                                           //валью инпута, которое меняется с каждым символом
    tags: Tag[] | undefined,                                    //список вариантов ответов
    handleTagInputCallBack: (text: string) => void,             //колбек для выбора тега по вверх вниз
    tagsFetched: boolean                                        //прогружен ли список ответов
    handleTagInputSubmitCallBack: (text: string) => void        //окончательный выбор тега
}

const SearchBar: FC <SearchBar> = ({tagInput, tags, handleTagInputCallBack, tagsFetched, handleTagInputSubmitCallBack}) => {
 
    // отловить фокус инпута
    const [inputFocus, setInputFocus] = useState<boolean>(false)
    const [inputShow, setInputShow] = useState<boolean>(false)          //для назначения z-index

    const handleFocus = () => {
        setInputFocus(true)

        setInputShow(true)      //добавляем класс, который увеличивает z-index
    }

    const handleUnFocus = () => {
        setInputFocus(false)
        // убираем z-index после анимации затухания фона
        setTimeout(() => {
            setInputShow(false)
        }, 500);
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

            if(event.key === 'ArrowUp' || event.key === 'ArrowDown'){
                if (!tags) {
                    // console.error('Массив tags пуст или равен null');
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
            }
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
            <div className={`${(inputFocus && tags && tags.length > 0)? "searchBar_container results" : "searchBar_container"} ${inputShow? 'show' : ''}`}>

                <img src={searchSign} alt="search" />

                <input type="text" placeholder="Введіть тег" onFocus={handleFocus} onBlur={handleUnFocus} value={tagInput} onChange={(event) => handleInputChange(event)} onKeyDown={(event) => handleSpecialKeyDown(event)}/>
 
                {tags && tagsFetched && inputFocus && tags?.length > 0 && <div className="searchBar_results">
                    {tags && tags.map((data, index) => (
                        <button key={index} className={index === chosenResultIndex? "active" : ""} onMouseDown={() => handleSubmit(data.text)} >{data.text}</button>
                    ))}
                </div>}
            </div>

            <div className={inputFocus? "searchBar_background show" : "searchBar_background"} />
        </div>
    )
}

export default SearchBar