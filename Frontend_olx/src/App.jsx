// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel.jsx';
import AdminPanelCategories from './pages/AdminPanelCategories.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Signup from './pages/SignUpPage.jsx';
import UpdateUser from './pages/UpdateUser.jsx';
import ForgetPassword from './pages/ForgetPassword.jsx';
import AdminPanelProducts from './pages/AdminPanelProducts.jsx';
import AdminPanelSearchProduct from './pages/AdminPanelSearchProduct.jsx';
import AdminPanelProductList from './pages/AdminPanelProductsList.jsx';
import AdminPanelCategoriesAnalytics from './pages/AdminPanelCategoriesAnalytics.jsx';
import AdminPanelProductsAnalytics from './pages/AdminPanelProductsAnalytics.jsx';
import AdminPanelCategoriesList from './pages/AdminPanelCategoriesList.jsx';
import AdminPanelComplaintsAnalytics from './pages/AdminPanelComplanitsAnalytics.jsx';
import AdminPanelUserAnalytics from './pages/AdminPanelUsersAnalytics.jsx';
import AdminPanelUsersList from './pages/AdminPanelUsersList.jsx';
import AdminPanelComplaintsList from './pages/AdminPanelComplaintsList.jsx';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route path="/AdminPanel/categories" element={<AdminPanelCategories />} />
          <Route path="/AdminPanel/Products" element={<AdminPanelProducts />} />
          <Route path="/AdminPanel/products/list" element={<AdminPanelProductList />} />
          <Route path="/AdminPanel/categories/analytics" element={<AdminPanelCategoriesAnalytics />} />
          <Route path="/AdminPanel/categories/list" element={<AdminPanelCategoriesList />} />
          <Route path="/AdminPanel/products/analytics" element={<AdminPanelProductsAnalytics />} />
          <Route path="/AdminPanel/SearchProduct" element={<AdminPanelSearchProduct />} />
          <Route path="/AdminPanel/complaints/analytics" element={<AdminPanelComplaintsAnalytics />} />
          <Route path="/AdminPanel/users/analytics" element={<AdminPanelUserAnalytics />} />
          <Route path="/AdminPanel/users/list" element={<AdminPanelUsersList />} />
          <Route path="/AdminPanel/reports/all" element={<AdminPanelComplaintsList />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/update-user" element={<UpdateUser />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />

          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;
