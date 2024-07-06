import { FC, useState } from "react";
import { Link } from "react-router-dom";

import './header.scss'

import logo from '@/assets/images/logo.svg'


import SearchBar from '@/components/header/components/searchBar/searchBar'
import burger from '@/assets/images/burgerMenu.svg'
import Account from "./components/account/account";

interface HeaderProps {
    scrollCallback: (block: boolean) => void
}


const Header: FC<HeaderProps> = ({scrollCallback}) =>{

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

                    <SearchBar />
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
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header