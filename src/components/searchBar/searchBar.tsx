import { ChangeEvent, FC, KeyboardEvent, useEffect, useState } from "react";
import './searchBar.scss'

// необходимо сделать компонент универсальным
// сделать так, чтоб при нажатии вниз, выбирался и заносился в инпут текст, также можно было б выбирать при повтоном нажатии вниз вверх

import searchSign from '@/assets/images/Search.svg'
import { Tag } from "@/interfaces/interface";

interface SearchBar {
    tagInput: string,
    tags: Tag[] | null,
    handleTagInputCallBack: (text: string) => void,
    tagsFetched: boolean
}

const SearchBar: FC <SearchBar> = ({tagInput, tags, handleTagInputCallBack}) => {

    // тестовые результаты
    // const results: string[] = ['музыка', 'технологии', 'спорт', 'математика', 'биология']


    // отловить фокус инпута
    const [inputFocus, setInputFocus] = useState<boolean>(false)

    const handleFocus = () => {
        setInputFocus(true)
    }

    const handleUnFocus = () => {
        setInputFocus(false)
    }

    const [chosenResultIndex, setChosenResultIndex] = useState<number>(-1)

    // отловить изменение текста 
    const [inputText, setInputText] = useState<string>('')

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value)
        handleTagInputCallBack(event.target.value)
    }

    // отлавливание нажатий в инпуте (вверх вниз энтер)
    const handleSpecialKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!tags || tags.length === 0) {
            console.error('Массив tags пуст или равен null');
            return;
        }

        if ()

        switch (event.key) {
            case 'Enter':
                console.log('Нажата клавиша Enter');
                // ОБРАБОТКА ДОБАВЛЕНИЯ ТЕГА В МАССИВ
                break;
            case 'ArrowUp':
                if (chosenResultIndex > 0) {
                    setChosenResultIndex(chosenResultIndex - 1);
                } else if (chosenResultIndex === 0) {
                    setChosenResultIndex(tags.length - 1);
                }
                console.log(tags[chosenResultIndex].text); // Используем строковое свойство name или другое свойство
                break;
            case 'ArrowDown':
                if (chosenResultIndex < tags.length - 1) {
                    setChosenResultIndex(chosenResultIndex + 1);
                } else if (chosenResultIndex === tags.length - 1) {
                    setChosenResultIndex(0);
                }
                console.log(tags[chosenResultIndex].text); // Аналогично используем строковое свойство
                break;
        }
    };
    



    // что я должен сюда получить: тут должен быть сам текст, результаты поиска

    return(
        <div className="searchBar">
            
            {/* когда фокус и есть результаты.ленгз > 1, то добавить резултс в классы*/}
            <div className={(inputFocus && tags && tags.length > 0)? "searchBar_container results" : "searchBar_container"}>

                <img src={searchSign} alt="search" />

                <input type="text" placeholder="Введіть тег" onFocus={handleFocus} onBlur={handleUnFocus} value={tagInput} onChange={(event) => handleInputChange(event)} onKeyDown={(event) => handleSpecialKeyDown(event)}/>
 

                {/* убирать при расфокусе и когда нету результатов */}
                {tags && inputFocus && tags?.length > 0 && <div className="searchBar_results">
                    {tags && tags.map((data, index) => (
                        <button key={index} className={index === chosenResultIndex?"active" : ""}>{data.text}</button>
                    ))}
                </div>}
            </div>

            <div className={inputFocus? "searchBar_background show" : "searchBar_background"} />
        </div>
    )
}

export default SearchBar