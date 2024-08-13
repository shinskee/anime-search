import { NavLink, useNavigate } from "react-router-dom";
import ButtonThemeMode from "../Common/ButtonThemeMode/ButtonThemeMode";

function Header() {
    const navigate = useNavigate()
    
    return ( 
        <div className="flex items-center gap-x-2">
            <ButtonThemeMode />
            <a onClick={() => {navigate('/anime-search/')
                navigate(0)
            }}>Главная</a>
            <a onClick={() => {navigate(-1)}}>Назад</a>
            <a onClick={() => {navigate(+1)}}>Вперед</a>
        </div>
        
     );
}

export default Header;