import AdminPanelAdditional from "@/components/adminPanelAditional/adminPanelAdditional";
import { FC, useState } from "react";

import './adminBlacklistPage.scss'
import User from "./components/user/user";

import search from '@/assets/images/Search.svg'
import SearchBar from "@/components/searchBar/searchBar";

const AdminBlacklistPage: FC = () => {

    const [searchInput, setSearchInput] = useState<string>('')

    

    return(
        <div className="adminBlacklistPage">
            <AdminPanelAdditional page="blacklist"/>

            <div className="adminBlacklistPage_content">
                <div className="adminBlacklistPage_heading">Чоринй список</div>

                <div className="adminBlacklistPage_search">

                    {/* переделать */}

                    {/* <SearchBar searchInput = {searchInput}/> */}

                    {/* <input type="text" className="inputText_preset" placeholder="Введіть пошту адміна"/> */}
                </div>

                <div className="adminBlacklistPage_blacklist">
                    <User />
                </div>
            </div>
        </div>
    )
}

export default AdminBlacklistPage