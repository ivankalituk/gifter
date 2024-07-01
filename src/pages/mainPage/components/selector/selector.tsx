import './selector.scss'

import { FC, useState } from "react";

import tick from '@/assets/images/tick.svg'


const Selector: FC = () => {

    const options: string[] = ["За датою", "За рейтингом", "За переглядами"]

    const [open, setOpen] = useState<boolean>(false)
    const [selected, setSelected] = useState<string>(options[0])

    // функция для выбора опшина
    const handleSelector = (option: string) => {
        setSelected(option)
        setOpen(false)

        // СДЕЛАТЬ КОЛБЕК
    }

    // функция для открытия селектора
    const handleOpen = () =>{
        setOpen(!open)
    }


    return (
        <div className="selector">
        <div className={open? "selector_selectedOption open" : "selector_selectedOption close"} onClick={handleOpen}>
            <span>{selected}</span>
            <img src={tick} alt="tick" className={open? "selector_tick open" : "selector_tick close"}/>
        </div>


        <div className={open? "selector_options open" :"selector_options close"}>
            {options.map((option, index) => (
                <div className="selection_option" key={index} onClick={() => handleSelector(option)}>{option}</div>
            ))}
        </div>

    </div>
    )
}

export default Selector