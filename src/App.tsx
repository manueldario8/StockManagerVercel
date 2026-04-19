import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout, Dashboard, ProviderPage, ProductPage, CategoryPage, Login, SignUp, OrderPage } from './exports';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="providers" element={<ProviderPage />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path='orders' element={<OrderPage/>}></Route>
        </Route>
        <Route path='login' element={<Login/>}></Route>
        <Route path='signup' element={<SignUp/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
