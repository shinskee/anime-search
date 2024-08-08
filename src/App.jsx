import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Test from './components/Test/Test'
import Title from './components/Test/Title/Title'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Test />} />
        <Route path="/title" element={<Title />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
