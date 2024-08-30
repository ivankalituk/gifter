import { FC, useState, KeyboardEvent } from "react";

import './searchBarBig.scss'

import search from '@/assets/images/Search.svg'
import random from '@/assets/images/Random.svg'


const SearchBarBig: FC = () =>{

    const results: string [] = ['name1', 'randomName gay sex', 'sescs', 'sdadadasdadcva', 'vavasdfwa']

    const [inputFocus, setInputFocus] = useState<boolean>(false)

    const handleInputFocus = () => {
        setInputFocus(true)
    }

    const handleUnFocus = () => {
        setInputFocus(false)
    }

    const [chosenResultIndex, setChosenResultIndex] = useState<number>(-1)

    const handleSpecialKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        
    }

    return(
        <div className="searchBarBig">
            <div className="searchBarBig_bar">
                <img src={search} alt="search" />

                <input type="text" placeholder='Введіть назву подарунку' onFocus={handleInputFocus} onBlur={handleUnFocus} onKeyDown={(event) => {}}/>

                <button>Пошук</button>

                {results && results.length > 0 && <div className="searchBarBig_results">
                    {results && results.length > 0 && results.map((data, index) => (
                        <button key={index}>{data}</button>
                    ))}

                </div>}

            </div>

            <div className={inputFocus? "searchBig_bar_Background show" : "searchBig_bar_Background"}></div>

            <button><img src={random} alt="random"/></button>
        </div>
    )
}

export default SearchBarBig