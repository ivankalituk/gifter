import { FC, useState } from "react";
import { Link } from "react-router-dom";

import './header.scss'

import logo from '@/assets/images/logo.svg'


import SearchBar from '@/components/header/components/searchBar/searchBar'
import burger from '@/assets/images/burgerMenu.svg'
import Account from "./components/account/account";
import SearchBarBig from "../searchBarBig/searchBarBig";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getGiftNameByName } from "@/api/gifts";
import { giftName } from "@/interfaces/interface";

interface HeaderProps {
    scrollCallback: (block: boolean) => void
    nameSearchCallBack: (name: string) => void
}


const Header: FC<HeaderProps> = ({scrollCallback, nameSearchCallBack}) =>{

    const [burgerMenu, setBurgerMenu] = useState<boolean>(true)

    const handleBurger = () =>{
        setBurgerMenu(!burgerMenu)
        scrollCallback(burgerMenu)
    }


    // обработка сёрчбара
    const [searchInput, setSearchInput] = useState<string>('')
    const [giftNamesKey, setGiftNamesKey] = useState<number>(1)


    const {data: giftNames} = useGetRequest<giftName[]>({fetchFunc: () => getGiftNameByName(searchInput), key: [giftNamesKey], enabled: true})

    const handleSearchInputCallBack = (text: string) => {
        setSearchInput(text)

        setGiftNamesKey(giftNamesKey + 1)
    }

    const handleSearchSubmitCallBack = (text: string) => {
        nameSearchCallBack(text)
    }


    return (
        <header>
            <div className="header_container">

                <div className="header_leftGroup">
                    <Link to={'/'}>
                        <img src={logo} alt="logo" />
                        <h1>gifter</h1>
                    </Link>

                    {/* <SearchBar nameSearchCallBack = {nameSearchCallBack} /> */}
                    <SearchBarBig handleSearchSubmitCallBack = {handleSearchSubmitCallBack} handleSearchInputCallBack = {handleSearchInputCallBack} giftNames = {giftNames} searchInput = {searchInput}/>
                </div>
                
                <div className="header_profile">
                    <Account />
                </div>

                <button className="burgerMenu"  onClick={handleBurger}><img src={burger} alt="alt" /></button>

                <div className="burgerMenu_Menu">
                    <div className={!burgerMenu? "burgerMenu_Menu_background open" : "burgerMenu_Menu_background"} onClick={handleBurger}></div>
                    <div className={!burgerMenu? "burgerMenu_Menu_content open" : "burgerMenu_Menu_content" }>
                        <div className="burgerMenu_auth">
                            <Account />
                        </div>

                        <div className="burgerMenu_links">
                            <Link to={'/'}><span>Головна</span></Link>
                            <Link to={'/suggest'}><span>Запропонувати</span></Link>
                            <Link to={'/profile'}><span>Ваш профіль</span></Link>
                            <Link to={'/settings'}><span>Налаштування</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header