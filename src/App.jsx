import './App.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import PageNotFound from './pages/PageNotFound'
import { useState } from 'react'

function App() {
const [isMobile,setIsMobile] = useState(false);
  return (
    <>
      <Routes>
        <Route path='/' element={<Home isMobile={isMobile}/>}></Route>
        <Route path='/product/:id' element={<Product isMobile={isMobile}/>}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
