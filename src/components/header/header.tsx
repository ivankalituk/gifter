import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './header.scss'

import logo from '@/assets/images/logo.svg'
import accountBackground from '@/assets/images/burgerAccoungBack.jpg'
import sampleLogo from '@/assets/images/logoSample.jpg'

import mainPageSVG from '@/assets/images/burgerHome.svg'
import suggestPageSVG from '@/assets/images/burgerSuggest.svg'
import profilePageSVG from '@/assets/images/burgerProfile.svg'
import settingsPageSVG from '@/assets/images/burgerSettings.svg'
import adminPageSVG from '@/assets/images/burgerAdmin.svg'
import blacklistPageSVG from '@/assets/images/burgerBlacklist.svg'
import suggestListPageSVG from '@/assets/images/burgerSuggestList.svg'
import reportsPageSVG from '@/assets/images/burgerReports.svg'

import SearchBar from '@/components/header/components/searchBar/searchBar'
import burger from '@/assets/images/burgerMenu.svg'
import Account from "./components/account/account";
import SearchBarBig from "../searchBarBig/searchBarBig";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { gerRandomGiftId, getGiftNameByName } from "@/api/gifts";
import { giftName, RootState } from "@/interfaces/interface";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Modal from "../modal/modal";
import ModalGift from "../modalGift/modalGift";

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

    const dispatch = useDispatch()
    const useTypeSelector: TypedUseSelectorHook <RootState> = useSelector
    const user = useTypeSelector((state) => state.user)

    // ------------------------------------------
    // перенаправление на регистрацию или профиль
    // ------------------------------------------

    const navigate = useNavigate()

    const handleAccount = () => {
        if (user.user_email === null){
            navigate('/auth')
        } else {
            navigate('/profile')
        }
    }

    // -----------------
    // рандомный подарок
    // -----------------

    const [giftModal, setGiftModal] = useState<boolean>(false)

    const [randomGiftEnabled, setRandomGiftEnabled] = useState<boolean>(false)
    const [randomGiftKey, setRandomGiftKey] = useState<number>(1)

    const {data: randomGift, isFetched: randomGiftFetched} = useGetRequest({fetchFunc: () => gerRandomGiftId(), key: [randomGiftKey], enabled: randomGiftEnabled})

    const handleGiftModalClose = () =>{
        setGiftModal(false)
        scrollCallback(false)
    }

    const handleRandomGiftCallBack = () => {
        setRandomGiftEnabled(true)
        setRandomGiftKey(randomGiftKey + 1)
    } 

    useEffect(() => {
        if(randomGift && randomGiftFetched){
            setGiftModal(true)
        }
    }, [randomGift, randomGiftFetched])

    return (
        <header>
            <div className="header_container">

                <div className="header_leftGroup">
                    <Link to={'/'}>
                        <img src={logo} alt="logo" />
                        <h1>gifter</h1>
                    </Link>

                    {/* <SearchBar nameSearchCallBack = {nameSearchCallBack} /> */}
                    <SearchBarBig handleSearchSubmitCallBack = {handleSearchSubmitCallBack} handleSearchInputCallBack = {handleSearchInputCallBack} giftNames = {giftNames} searchInput = {searchInput} handleRandomGiftCallBack={handleRandomGiftCallBack}/>
                </div>
                
                <div className="header_profile">
                    <Account />
                </div>

                <button className="burgerMenu"  onClick={handleBurger}><img src={burger} alt="alt" /></button>

                <div className="burgerMenu_Menu">
                    <div className={!burgerMenu? "burgerMenu_Menu_background open" : "burgerMenu_Menu_background"} onClick={handleBurger}></div>
                    
                    <div className={!burgerMenu? "burgerMenu_Menu_content open" : "burgerMenu_Menu_content" }>

                    <div className="burgerMenu_account" onClick={handleAccount}>
                        <img src={accountBackground} alt="accountBack" />

                        <div className="burgerMenu_account_info_container">
                            {user.user_email !== null &&<div className="burgerMenu_account_info_inner">
                                
                                <img  src={user.user_imgUrl !== null? 'http://localhost:1000/' + user.user_imgUrl : sampleLogo}/>

                                <div className="burgerMenu_account_info_data">
                                    <div className="burgerMenu_account_info_nickname">{user.user_nickName}</div>
                                    <div className="burgerMenu_account_info_email">{user.user_email}</div>
                                </div>
                            </div>}

                            {user.user_email === null && <div className="burgerMenu_account_info_inner">
                                <div className="burgerMenu_account_info_registration">Реєстрація</div>
                            </div>}
                        </div>
                        
                    </div>

                    <div className="burgerMenu_links">
                        <Link to={'/'}>
                            <img src={mainPageSVG}/>
                            <span>Головна</span>
                        </Link>
                        
                        <Link to={'/suggest'}>
                            <img src={suggestPageSVG}/>
                            <span>Запропонувати</span>
                        </Link>

                        <Link to={'/profile'}>
                            <img src={profilePageSVG}/>
                            <span>Профіль</span>
                        </Link>
                        
                        <Link to={'/settings'}>
                            <img src={settingsPageSVG}/>
                            <span>Налаштування</span>
                        </Link>
                    </div>

                    <div className="burgerMenu_links">
                        <Link to={'/adminPanel/suggests'}>
                            <img src={suggestListPageSVG}/>
                            <span>Пропозиції</span>
                        </Link>
                        
                        <Link to={'/adminPanel/reports'}>
                            <img src={reportsPageSVG}/>
                            <span>Скарги</span>
                        </Link>

                        <Link to={'/adminPanel/admins'}>
                            <img src={adminPageSVG}/>
                            <span>Адміни</span>
                        </Link>
                        
                        <Link to={'/adminPanel/blacklist'}>
                            <img src={blacklistPageSVG}/>
                            <span>Чорний список</span>
                        </Link>
                    </div>


                    </div>
                </div>
            </div>

            {giftModal && <Modal onClose = {handleGiftModalClose} Component={ModalGift} modalProps={{gift_id: randomGift[0].id}} scrollCallback = {scrollCallback}/>}
        </header>
    )
}

export default Header