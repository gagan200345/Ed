import { NavLink, Outlet } from "react-router-dom";
import {FaUsers,FaEnvelope,FaServicestack,FaHome,FaUserShield,
} from "react-icons/fa";

const AdminLayout = () => {
  return (
    <div className="admin-layout">

      {/* ================= ADMIN HEADER ================= */}
      <header className="admin-header">

        <div className="admin-header-left">
          <div className="admin-logo">
            <FaUserShield />
          </div>

          <div className="admin-title">
            <h2>Admin Panel</h2>
            <span>Management Dashboard</span>
          </div>
        </div>


        {/* ================= NAVIGATION ================= */}
        <nav className="admin-navbar">

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <FaUsers />
            <span>Users</span>
          </NavLink>


          <NavLink
            to="/admin/contacts"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <FaEnvelope />
            <span>Contacts</span>
          </NavLink>


          <NavLink
            to="/service"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <FaServicestack />
            <span>Services</span>
          </NavLink>


          <NavLink
            to="/"
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <FaHome />
            <span>Home</span>
          </NavLink>

        </nav>

      </header>


      {/* ================= PAGE CONTENT ================= */}
      <main className="admin-content">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;