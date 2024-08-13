import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Test from './components/Test/Test'
import Title from './components/Test/Title/Title'
import { ThemeProvider } from './Theme'
import Header from './components/Header/Header'
import SearchPage from './components/Pages/SearchPage/SearchPage'
import MainPage from './components/Pages/MainPage/MainPage'

function App() {
  

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/anime-search/" element={<MainPage />} />
          <Route path="/anime-search/title" element={<Title />} />
          <Route path="/anime-search/search/*" element={<SearchPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
