import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import './searchBar.scss'

// необходимо сделать компонент универсальным
// сделать так, чтоб при нажатии вниз, выбирался и заносился в инпут текст, также можно было б выбирать при повтоном нажатии вниз вверх

import searchSign from '@/assets/images/Search.svg'

const SearchBar: FC = () => {

    // тестовые результаты
    const results: string[] = ['музыка', 'технологии', 'спорт', 'математика', 'биология']


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
        console.log(inputText)
    }

    // отлавливание нажатий в инпуте (вверх вниз энтер)
    const handleSpecialKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        
        switch (event.key) {
            case 'Enter':
                // HANDLE TAG ARRAY PUSH

                console.log('Enter key was pressed');
                break;
            case 'ArrowUp':
                if(chosenResultIndex > 0){
                    setChosenResultIndex(chosenResultIndex - 1)
                } else {
                    if(chosenResultIndex === 0){
                        setChosenResultIndex(results.length - 1)
                    }
                }
                setInputText(results[chosenResultIndex])
                break;
            case 'ArrowDown':
                if(chosenResultIndex < results.length - 1){
                    setChosenResultIndex(chosenResultIndex + 1)
                } else {
                    if(chosenResultIndex === results.length - 1){
                        setChosenResultIndex(0)
                    }
                }
                setInputText(results[chosenResultIndex])
                break;
        }
    };

    return(
        <div className="searchBar">
            
            {/* когда фокус и есть результаты.ленгз > 1, то добавить резултс в классы*/}
            <div className="searchBar_container " >

                <img src={searchSign} alt="search" />

                <input type="text" placeholder="Введіть тег" onFocus={handleFocus} onBlur={handleUnFocus} value={inputText} onChange={(event) => handleInputChange(event)} onKeyDown={(event) => handleSpecialKeyDown(event)}/>
 

                {/* убирать при расфокусе и когда нету результатов */}
                <div className="searchBar_results">
                    {results.map((data, index) => (
                        <button key={index} className={index === chosenResultIndex?"active" : ""}>{data}</button>
                    ))}
                </div>
            </div>

            <div className={inputFocus? "searchBar_background show" : "searchBar_background"} />
        </div>
    )
}

export default SearchBar