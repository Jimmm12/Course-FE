import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./page/auth/Loginpage";
import Register from "./page/auth/Register";
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';
import Homepage from "./components/Homepage";
import CoursesDetail from "./page/courses/CoursesDetail";
import UserInfo from "./page/User/UserInfo";
import UserUpdate from "./page/User/UserUpdate";
import CoursesUser from "./page/courses/CoursesUser";
import Order from "./components/Order";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Toaster position="top-center" reverseOrder={false} />
        <main className="flex-grow">
          <Routes>
            <Route path="*" exact element={<Navbar />} />
            <Route path="/" exact element={<Homepage />} />
            <Route path="/login" exact element={<Loginpage />} />
            <Route path="/register" exact element={<Register />} />
            <Route path="/course/:id" exact element={<CoursesDetail />} />
            <Route path="/course/user/:id" exact element={<CoursesUser />} />
            <Route path="/user/:id" exact element={<UserInfo />} />
            <Route path="/user/update/:id" exact element={<UserUpdate />} />
            <Route path="/order/:id" exact element={<Order />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
