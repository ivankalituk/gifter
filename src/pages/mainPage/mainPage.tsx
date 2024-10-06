import { FC, useEffect, useState } from "react";

import './mainPage.scss'

import Filters from "./components/filters/filters";
import GiftCard from "@/components/giftCard/giftCard";
import Selector from "./components/selector/selector";
import { useGetRequest } from "@/hooks/useGetReuquest";
import { getAllGifts, getAllGiftsByTags } from "@/api/gifts";
import { Gift } from "@/interfaces/interface";

interface MainPageInterface {
    scrollCallback: (block: boolean)=> void
    nameSearch: string
    deleteSearchCallBack: () => void
}

const MainPage: FC <MainPageInterface>= ({scrollCallback, nameSearch, deleteSearchCallBack}) => {

    const [filtersOpen, setFiltersOpen] = useState<boolean>(true)

    const handleFiltersOpen = () =>{
        setFiltersOpen(!filtersOpen)
        scrollCallback(!filtersOpen)
    }

    const [giftKey, setGiftKey] = useState<number>(1)
    const [giftTags, setGiftTags] = useState<string[]>([])

    const [selector, setSelector] = useState<string>('За датою')              //селектор за датой, за названием, за рейтингом

    // НЕ ТОЛЬКО ТЕГИ НО И ФИЛЬТРЫ И ТЕКСТ
    const {data: gifts, isFetched: giftsFetched} = useGetRequest<Gift[] | undefined>({fetchFunc: () => getAllGiftsByTags(giftTags, selector, nameSearch), key: [giftKey], enabled: true})

    // колбек для селектора
    const selecrotCallBack = (selectedSelector: string) => {
        setSelector(selectedSelector)
        setGiftKey(giftKey + 1)
    }

    // колбек на применение фильтров
    const filtersCallBack = (tags: string[]) => {
        // сначала добавить новые фильтры, потом обновить ключ
        setGiftTags(tags)
        setGiftKey(giftKey + 1)
    }

    return (
        <div className="mainPage">
            <div className="mainPage_container">

                <Filters filtersOpen = {filtersOpen} handleFiltersOpen ={handleFiltersOpen} filtersCallback = {filtersCallBack} nameSearch = {nameSearch} deleteSearchCallBack = {deleteSearchCallBack}/>

                <div className="mainPage_giftContent">

                    <Selector handleFiltersOpen ={handleFiltersOpen}  selecrotCallBack = {selecrotCallBack}/>

                    {giftsFetched && <div className="mainPage_giftContent_giftList">
                        {gifts !== null && gifts !== undefined && gifts.map((data: any, index:number) => (<GiftCard scrollCallback = {scrollCallback} key={index} data={data}/>))}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default MainPage