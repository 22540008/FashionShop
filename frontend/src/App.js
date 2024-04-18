/* Bảo mật Route profile nếu chưa đăng nhập bằng ProtectedRoute  
*/
import "./App.css";
// React router DOM quản lý routing. Router xác định các routes. Route: URL path
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./component/Home";

import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header";
// Toast package giúp hiển thị thông báo success, error, warning... https://www.npmjs.com/package/react-hot-toast
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import ProductDetails from "./component/product/ProductDetails";
import Login from "./component/auth/Login"; // auto chèn khi chọn Login từ Quick Fix
import Register from "./component/auth/Register"; // auto chèn
import Profile from "./component/user/Profile"; // auto chèn
import UpdateProfile from "./component/user/UpdateProfile";
import ProtectedRoute from "./component/auth/ProtectedRoute";
import UploadAvatar from "./component/user/UploadAvatar";
import UpdatePassword from "./component/user/UpdatePassword";
// import './custom-theme.min.css';
import Cart from "./component/cart/Cart"
import Shipping from "./component/cart/Shipping"
import ConfirmOrder from "./component/cart/ConfirmOrder";
import PaymentMethod from "./component/cart/PaymentMethod";
import ForgotPassword from "./component/auth/ForgotPassword";
import ResetPassword from "./component/auth/ResetPassword";




function App() {
  return (
    <Router>
      <div className="App">
      {/* "react-hot-toast" */}
      <Toaster position="top-center" />
      {/* "react-toastify" */}
      <ToastContainer 
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        draggable
      /> 
      {/* Page header từ ./component/layout/Footer */}
      <Header/>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />

          {/* <Route path="/me/profile" element={<Profile />} /> 
          <Route path="/me/update_profile" element={<UpdateProfile />} />*/}
          <Route 
            path="/me/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/me/update_profile"
              element={
              <ProtectedRoute>
                <UpdateProfile/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/me/upload_avatar"
              element={
                <ProtectedRoute>
                  <UploadAvatar/>
                </ProtectedRoute>
            }
          />

          <Route
            path="/me/update_password"
              element={
                <ProtectedRoute>
                  <UpdatePassword/>
                </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          {/**một số route cần có route cho ac đăng ký và chưa đăng ký */}
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/confirm_order" element={<ConfirmOrder/>} />
          <Route
            path="/payment_method" 
              element={
                <ProtectedRoute>
                  <PaymentMethod />
                </ProtectedRoute>
                } 
          />
        </Routes>

      </div>
      

      {/* Page Footer từ ./component/layout/Header*/}
      <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
