import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import LandingPage from './components/LandingPage'
import Seller from './components/Seller'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/seller' element={<Seller />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App