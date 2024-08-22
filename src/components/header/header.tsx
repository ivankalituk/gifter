import { FC, useState } from "react";
import { Link } from "react-router-dom";

import './header.scss'

import logo from '@/assets/images/logo.svg'


import SearchBar from '@/components/header/components/searchBar/searchBar'
import burger from '@/assets/images/burgerMenu.svg'
import Account from "./components/account/account";

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

    return (
        <header>
            <div className="header_container">

                <div className="header_leftGroup">
                    <Link to={'/'}>
                        <img src={logo} alt="logo" />
                        <h1>gifter</h1>
                    </Link>

                    <SearchBar nameSearchCallBack = {nameSearchCallBack} />
                </div>
                
                <div className="header_profile">
                    <Account />
                </div>

                <button className="burgerMenu"  onClick={handleBurger}><img src={burger} alt="alt" /></button>

                <div className="burgerMenu_Menu">
                    <div className={burgerMenu? "burgerMenu_Menu_background show" : "burgerMenu_Menu_background"} onClick={handleBurger}></div>
                    <div className={burgerMenu? "burgerMenu_Menu_content show" : "burgerMenu_Menu_content" }>
                        <div className="burger_profile">
                            <Account />
                        </div>

                        <div className="burger_mainLinks">
                            <Link to={'/suggest'}>Запропонувати</Link>
                        </div>

                        <div className="burger_aditionalLinks">
                            <Link to={'/adminPanel/suggests'}>Пропозиції</Link>
                            <Link to={'/adminPanel/reports'}>Скарги</Link>
                            <Link to={'/adminPanel/blacklist'}>Чорний список</Link>
                            <Link to={'/adminPanel/admins'}>Адміни</Link>
                            <Link to={'/'}>Статистика</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header