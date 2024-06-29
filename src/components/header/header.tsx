import { FC } from "react";
import { Link } from "react-router-dom";

import './header.scss'

import logo from '@/assets/images/logo.svg'
import Mark from '@/assets/images/Mark.svg'

import SearchBar from '@/components/header/components/searchBar/searchBar'


const Header: FC = () =>{
    return (
        <header>
            <div className="header_container">

                <Link to={'/'}>
                    <img src={logo} alt="logo" />
                    <h1>gifter</h1>
                </Link>

                <SearchBar />

                <div className="header_additionalButtons">
                    <Link to={'/marks'} className="header_additionalButtons_marks">
                        <img src={Mark} alt="mark" />
                        <div>Закладки</div>
                    </Link>

                    <Link to={'/propose'} className="header_additionalButtons_propose">Запропонувати</Link>

                </div>
            </div>
        </header>
    )
}

export default Header