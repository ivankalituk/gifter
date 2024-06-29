import './searchBar.scss'

import { FC } from "react";

import search from '@/assets/images/Search.svg'
import random from '@/assets/images/Random.svg'

const SearchBar: FC = () =>{
    return(
        <div className="searchBar">
            <div className="searchBar_bar">
                <img src={search} alt="search" />

                <input type="text" placeholder='Введіть назву подарунку'/>

                <button>Пошук</button>
            </div>

            <button><img src={random} alt="random" /></button>
        </div>
    )
}

export default SearchBar