import { FC, useState, KeyboardEvent, ChangeEvent } from "react";

import './searchBarBig.scss'

import search from '@/assets/images/Search.svg'
import random from '@/assets/images/Random.svg'


const SearchBarBig: FC = () =>{

    const results: string [] = ['name1', 'randomName gay sex', 'sescs', 'sdadadasdadcva', 'vavasdfwa']

    const [inputFocus, setInputFocus] = useState<boolean>(false)
    const [inputShow, setInputShow] = useState<boolean>(false)          //для назначения z-index
    
    const handleInputFocus = () => {
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

    const [chosenResultIndex, setChosenResultIndex] = useState<number>(-1)

    const [searchInput, setSearchInput] = useState<string>('')

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value)
    }


    // отлавливание нажатия на кнопку
    const handleSpecialKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {

        if (event.key === 'Enter'){
            
            //если выбран тег из резалтов и после нажат энтер 
            if(chosenResultIndex > -1 && results){
                setSearchInput(results[chosenResultIndex])
                setChosenResultIndex(-1)
            } else {
                handleSubmit()
            }
        } else {

            if(event.key === 'ArrowUp' || event.key === 'ArrowDown'){
                if (!results) {
                    // console.error('Массив tags пуст или равен null');
                    return;
                }

                let newIndex = chosenResultIndex;
            
                switch (event.key) {
                    case 'ArrowUp':
                        if (newIndex > 0) {
                            newIndex = newIndex - 1;
                        } else {
                            newIndex = results.length - 1;
                        }
                        setChosenResultIndex(newIndex);
                        break;
                    case 'ArrowDown':
                        if (newIndex < results.length - 1) {
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

    // по нажатию на результат, вносить его в инпут
    const handleResultClick = (index: number) => {
        setSearchInput(results[index])
    }

    // начать поиск по слову
    const handleSubmit = () => {
        // ОТПРАВКА ДАННЫХ В ФИЛЬТРЫ
        console.log("SEARCHING: ", searchInput)
        setSearchInput('')
    }


    // задержка для добавления z-index
    

    return(
        <div className="searchBarBig">
            <div className={inputShow? "searchBarBig_bar show" : "searchBarBig_bar"}>
                <img src={search} alt="search" />

                <input type="text" placeholder='Введіть назву подарунку' value={searchInput} onFocus={handleInputFocus} onBlur={handleUnFocus} onKeyDown={(event) => {handleSpecialKeyDown(event)}} onChange={(event) => handleChangeInput(event)}/>

                <button onClick={handleSubmit}>Пошук</button>

                {inputFocus && results && results.length > 0 && <div className="searchBarBig_results">
                    {results && results.length > 0 && results.map((data, index) => (
                        <button key={index} className={index === chosenResultIndex? "active": ""} onMouseDown={() => handleResultClick(index)}>{data}</button>
                    ))}

                </div>}

            </div>

            <div className={inputFocus? "searchBig_bar_Background show" : "searchBig_bar_Background"}></div>

            <button><img src={random} alt="random"/></button>
        </div>
    )
}

export default SearchBarBig