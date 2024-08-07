import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './pages/Login'
import ResetPassword from './pages/ForgotPassword'
import ForgotPassword from './pages/ResetPassword'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCategoryList from './pages/BlogCategoryList';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import ColorList from './pages/ColorList';
import CategoryList from './pages/CategoryList';
import BrandList from './pages/BrandList';
import ProductList from './pages/ProductList';
import AddBlog from './pages/AddBlog';
import AddBlogCategory from './pages/AddBlogCategory';
import AddColor from './pages/AddColor';
import AddCategory from './pages/AddCategory';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import AddCoupon from './pages/AddCoupon';
import CouponList from './pages/CouponList';
import ViewEnquiry from './pages/ViewEnquiry';
import ViewOrders from './pages/ViewOrders';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/forgot-password' element={<ResetPassword />} />
        <Route path='/reset-password' element={<ForgotPassword />} />
        <Route path='/admin' element={<MainLayout />} >
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquiries />} />
          <Route path='enquiries/:id' element={<ViewEnquiry />} />
          <Route path='blog' element={<AddBlog />} />
          <Route path='blog/:id' element={<AddBlog />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog-category' element={<AddBlogCategory />} />
          <Route path='blog-category/:id' element={<AddBlogCategory />} />
          <Route path='blog-category-list' element={<BlogCategoryList />} />
          <Route path='orders' element={<Orders />} />
          <Route path='order/:id' element={<ViewOrders />} />
          <Route path='coupon' element={<AddCoupon />} />
          <Route path='coupon/:id' element={<AddCoupon />} />
          <Route path='coupon-list' element={<CouponList />} />
          <Route path='customers' element={<Customers />} />
          <Route path='color' element={<AddColor />} />
          <Route path='color/:id' element={<AddColor />} />
          <Route path='color-list' element={<ColorList />} />
          <Route path='category' element={<AddCategory />} />
          <Route path='category/:id' element={<AddCategory />} />
          <Route path='category-list' element={<CategoryList />} />
          <Route path='brand' element={<AddBrand />} />
          <Route path='brand/:id' element={<AddBrand />} />
          <Route path='brand-list' element={<BrandList />} />
          <Route path='product' element={<AddProduct />} />
          <Route path='product-list' element={<ProductList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
