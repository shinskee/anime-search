import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light')
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if(theme === 'dark') document.body.classList.add('dark', 'bg-gray-800', 'text-gray-100')
      else document.body.classList.remove('dark', 'bg-gray-800', 'text-gray-100')
    setIsActive(!isActive)
  }, [theme])
  return (
    <ThemeContext.Provider value={[theme, setTheme, isActive, setIsActive]}>{children}</ThemeContext.Provider>
  )
}