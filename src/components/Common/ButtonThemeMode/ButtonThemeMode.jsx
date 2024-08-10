import { useContext } from "react";
import { ThemeContext } from "../../../Theme";
import sun from '../../../assets/sun.svg'
import moon from '../../../assets/moon.svg'

function ButtonThemeMode() {
    const [theme, setTheme] = useContext(ThemeContext)
    
    const handleClick = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    
    return (
        <button className="flex gap-x-2 bg-gray-300 p-0.5 w-[50px]" onClick={handleClick}>
            <img src={theme === 'light' ? sun : moon} className={ theme === 'light' ? 'buttonUnSelected' : 'buttonSelected' }></img>

        </button>
     );
}

export default ButtonThemeMode;