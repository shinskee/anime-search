import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Test from './components/Test/Test'
import Title from './components/Test/Title/Title'
import ButtonThemeMode from './components/Common/ButtonThemeMode/ButtonThemeMode'
import { ThemeProvider } from './Theme'

function App() {
  

  return (
    <BrowserRouter>
      <ThemeProvider>
        <ButtonThemeMode />
        <Routes>
          <Route path="/*" element={<Test />} />
          <Route path="/title" element={<Title />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
