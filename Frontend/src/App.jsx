import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import Navbar from "./Components/Navbar";
import Error from "./Pages/Error";
import Footer from "./Components/Footer";
import Logout from "./Pages/Logout";
import Service from "./Pages/Service";
import AdminLayout from "./Components/layouts/Admin-layout";
import AdminUsers from "./Pages/AdminUsers";
import AdminContacts from "./Pages/AdminContacts";
import AdminUserEdit from "./Pages/AdminUserEdit";

const App = () =>{
return(
<>
<BrowserRouter>
<Navbar/>
<Routes>
  <Route path="/" element={<Home/>}   />
  <Route path="/about" element={<About/>}   />
   <Route path="/contact" element={<Contact/>}   />
  <Route path="/service" element={<Service />}   />
   <Route path="/register" element={<Register/>}   />
  <Route path="/login" element={<Login/>}   />
  <Route path="/logout" element={<Logout />} />
    <Route path="*" element={<Error />} />

  {/* admin route */}
    <Route path="/admin" element={<AdminLayout />}>

          <Route path="users" element={<AdminUsers />} />

         <Route
              path="users/:id/edit"
              element={<AdminUserEdit />}
            />
            
          <Route path="contacts" element={<AdminContacts />} />

        </Route>
</Routes>
<Footer />
</BrowserRouter>

</>

)

};

export default App;
