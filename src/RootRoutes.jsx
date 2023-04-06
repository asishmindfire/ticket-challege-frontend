import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import About from "./pages/About";
import Comment from "./pages/Comment";
import Analytics from "./pages/Analytics";
import Product from "./pages/Product";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterationForm from "./components/RegisterationForm/RegisterationForm";
import Splash from "./Splash";
import Page404 from "./Page404";

const RootRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />} />
      </Routes>
      {!localStorage.getItem("token") ? (
        <Routes>
          <Route path="/signup" element={<RegisterationForm />} />
          <Route path="/signin" element={<LoginForm />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      ) : (
        <>
          <Navbar />
          <Sidebar>
            <Routes>
              <Route path="*" element={<Page404 />} />
              <Route path="/home/dashboard/tickets" element={<Dashboard />} />
              <Route path="/about" element={<About />} />
              <Route path="/comment" element={<Comment />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/product" element={<Product />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Sidebar>
        </>
      )}
    </>
  );
};

export default RootRoutes;

// /* <Route path="/home" element={<Dashboard />} /> */
// <Route path="/home/dashboard" element={<Dashboard />} />
