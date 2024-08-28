import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import './searchBar.scss'

// необходимо сделать компонент универсальным
// сделать так, чтоб при нажатии вниз, выбирался и заносился в инпут текст, также можно было б выбирать при повтоном нажатии вниз вверх

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

    const [chosenResultIndex, setChosenResultIndex] = useState<number>(-1)

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleTagInputCallBack(event.target.value)
        setChosenResultIndex(-1)
    }

    // отлавливание нажатий в инпуте (вверх вниз энтер)
    const handleSpecialKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!tags || tags.length === 0) {
            console.error('Массив tags пуст или равен null');
            return;
        }
    
        let newIndex = chosenResultIndex;
    
        switch (event.key) {
            case 'Enter':
                if (newIndex >= 0 && newIndex < tags.length) {
                    handleTagInputCallBack(tags[newIndex].text); // Вызываем коллбэк
                }
                break;
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
    
        // Выводим обновленный индекс и текст, если индекс допустим
        if (newIndex >= 0 && newIndex < tags.length) {
            console.log(tags[newIndex].text); // Лог выбранного тега
        }
    };
    
    const handleSubmit = (text: string) => {
        console.log(1)
    }



    // что я должен сюда получить: тут должен быть сам текст, результаты поиска

    return(
        <div className="searchBar">
            
            {/* когда фокус и есть результаты.ленгз > 1, то добавить резултс в классы*/}
            <div className={(inputFocus && tags && tags.length > 0)? "searchBar_container results" : "searchBar_container"}>

                <img src={searchSign} alt="search" />

                <input type="text" placeholder="Введіть тег" onFocus={handleFocus} onBlur={handleUnFocus} value={tagInput} onChange={(event) => handleInputChange(event)} onKeyDown={(event) => handleSpecialKeyDown(event)}/>
 
                {tags && tagsFetched && inputFocus && tags?.length > 0 && <div className="searchBar_results">
                    {tags && tags.map((data, index) => (
                        <button key={index} className={index === chosenResultIndex?"active" : ""} onClick={() => handleSubmit(data.text)} >{data.text}</button>
                    ))}
                </div>}
            </div>

            <div className={inputFocus? "searchBar_background show" : "searchBar_background"} />
        </div>
    )
}

export default SearchBar