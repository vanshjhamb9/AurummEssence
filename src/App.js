import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
import OpenRoute from "./components/core/Auth/openRoute";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Testing from "./pages/Testing"
import Navbar from "./components/common/Navbar";
import Catalog from "./pages/Catalog";
import AllProduct from "./pages/AllProduct";
import VerifyEmail from "./pages/verifyEmail";
import ProductDetails from "./pages/productDetails";
import Contact from "./pages/contact";
import Cart from "./components/core/Dashboard/Cart";
import About from "./pages/AboutUs";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import History from "./components/core/Dashboard/History";

function App() {
  return (
    <div className="w-full min-h-screen bg-peach-500   flex flex-col font-inter">
    <Navbar/>
    <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="test" element={<Testing/>} />
        <Route path="catalog/:catalogName" element={<Catalog/>} />
        <Route path="products/:productId" element={<ProductDetails/>} />
        {/* <Route path="products/:productId" element={<ProductDetails/>} /> */}
        <Route path="allProduct" element={<AllProduct />} /> 
        <Route path="about" element={<About/>} />


        <Route
          path="signup"
          element={
              <Signup />
          }
        />
    <Route
          path="login"
          element={
              <Login />
          }
        />

       <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

       <Route path="/contact" element={<Contact />} />

       <Route path="dashboard/cart" element={<Cart/>} />
       

       <Route element ={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
       }>

       <Route path="dashboard/my-profile" element={<MyProfile/>} />
       <Route path="dashboard/purchase-history" element={<History/>} />
       <Route path="dashboard/my-profile" element={<MyProfile/>} />

       </Route>

      </Routes>
    </div>
    </div>
  );
}

export default App;
