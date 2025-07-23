import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage'
import App from './App.jsx'

import { ChakraProvider, } from '@chakra-ui/react'


import AdminPanel from './pages/AdminPanel.jsx'
import AdminPanelCategories from './pages/AdminPanelCategories.jsx'
import AdminPanelOrders from './pages/AdminPanelOrders.jsx'



createRoot(document.getElementById('root')).render(
  
  <StrictMode>
      <BrowserRouter>
      <ChakraProvider>
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AdminPanel" element={<AdminPanel/>} />
        <Route path="/AdminPanel/categories" element={<AdminPanelCategories/>}/>
        <Route path="/AdminPanel/orders" element = {<AdminPanelOrders/>}></Route>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

     </ChakraProvider >
    
      </BrowserRouter>
    
  </StrictMode>
 
)
