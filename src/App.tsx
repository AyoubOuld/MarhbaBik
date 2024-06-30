import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Signup } from "./pages/Signup";
import { About } from "./pages/About";
import Welcome from "./pages/Welcome";
import Authentication from "./components/Authentication";
import Login from "./components/Loginform";
import AdminLogin from "./pages/AdminLogin";
import Add from "./pages/Add";
import Wilaya from "./pages/Wilaya";
import Destination from "./pages/Destination";
import { Faq } from "./pages/Faq";
import JoinUs from "./pages/JoinUs";
import { Homeowner } from "./pages/Homeowner";
import { Carowner } from "./pages/Carowner";
import { Agency } from "./pages/Agency";
import Blog from "./pages/Blog";
import { Home } from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Authentication/>
      <Routes>
        <Route/>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Join" element={<JoinUs />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Destinations" element={<Welcome />} />
        <Route path="Login" element={<Login/>}/>
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/wilaya/:wilayaName" element={<Wilaya/>} />
        <Route path="/destination/:destinationId" element={<Destination/>} />


        <Route path="/FAQ" element={<Faq />} />
        <Route path="/Homeowner" element={<Homeowner />} />
        <Route path="/Carowner" element={<Carowner />} />
        <Route path="/Agency" element={<Agency />} />
      </Routes>
    </Router>
  );
};

export default App;
