import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DashboardLayout, Dashboard, ProviderPage, ProductPage, CategoryPage, Login, SignUp, OrderPage, ProviderDetail, CategoryDetail } from './exports';
import { AuthProvider, ProtectedRoute, PublicRoute } from './exports';



function App() {
  return (
    <Router>
  <AuthProvider>
    <Routes>

      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="providers" element={<ProviderPage />} />
          <Route path="providers/:id" element={<ProviderDetail />} />
          <Route path="categories" element={<CategoryPage />} />
          <Route path="categories/:id" element={<CategoryDetail />} />
          <Route path="products" element={<ProductPage />} />
          <Route path='orders' element={<OrderPage />} />
        </Route>
      </Route>

      <Route element={<PublicRoute />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
      </Route>

    </Routes>
  </AuthProvider>
</Router>
  )
}

export default App
