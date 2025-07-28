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
import LoginPage from './pages/LoginPage.jsx'
import Signup from './pages/SignUpPage';
import UpdateUser from './pages/UpdateUser.jsx'
import ForgetPassword from './pages/ForgetPassword.jsx'
import AdminPanelProducts from './pages/AdminPanelProducts.jsx'
import AdminPanelSearchProduct from './pages/AdminPanelSearchProduct.jsx'
import AdminPanelProductList from './pages/AdminPanelProductsList.jsx'



createRoot(document.getElementById('root')).render(
  
  <StrictMode>
      <BrowserRouter>
      <ChakraProvider>
  
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route path="/AdminPanel" element={<AdminPanel/>} />
        <Route path="/AdminPanel/categories" element={<AdminPanelCategories/>}/>
        <Route path="/AdminPanel/orders" element = {<AdminPanelOrders/>}></Route>
        <Route path="/AdminPanel/Products" element={<AdminPanelProducts/>}/>
        <Route path="/AdminPanel/List" element={<AdminPanelProductList/>}/>
        <Route path="/AdminPanel/SearchProduct" element={<AdminPanelSearchProduct/>}/>
       
        
        <Route path="/login" element ={<LoginPage/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/update-user" element={<UpdateUser/>}/>
        <Route path="/forgetPassword" element={<ForgetPassword/>}/>
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>

     </ChakraProvider >
    
      </BrowserRouter>
    
  </StrictMode>
 
)
