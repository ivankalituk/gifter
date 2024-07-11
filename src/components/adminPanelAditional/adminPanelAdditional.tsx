import './adminPanelAdditional.scss'

import { Link } from 'react-router-dom';
import { FC } from "react";

const AdminPanelAdditional: FC = () =>{

    const chosen: number = 1;
    
    return (
        <div className="adminPanelAdditional">
            
            <Link to={'/'}>Пропозиції</Link>
            <Link className={chosen? "chosen" : ""} to={'/'}>Скарги</Link>
            <Link to={'/'}>Керування адмінами</Link>
            <Link to={'/'}>Чорний список</Link>
            <Link to={'/'}>Статистика</Link>


        </div>
    )
}

export default AdminPanelAdditional