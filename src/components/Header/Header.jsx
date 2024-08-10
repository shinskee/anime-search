import { NavLink, useNavigate } from "react-router-dom";
import ButtonThemeMode from "../Common/ButtonThemeMode/ButtonThemeMode";

function Header() {
    const navigate = useNavigate()
    
    return ( 
        <div className="flex items-center gap-x-2">
            <ButtonThemeMode />
            <NavLink to={'/'}>Главная</NavLink>
        </div>
        
     );
}

export default Header;