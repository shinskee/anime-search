import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Test from './components/Test/Test'
import Title from './components/Test/Title/Title'
import { ThemeProvider } from './Theme'
import Header from './components/Header/Header'
import SearchNew from './components/Test/SearchNew'

function App() {
  

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Test />} />
          <Route path="/title" element={<Title />} />
          <Route path="/search/*" element={<SearchNew />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
