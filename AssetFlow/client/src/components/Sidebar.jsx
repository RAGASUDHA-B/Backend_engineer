import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}>
      <h3 className="text-center mb-4">AssetFlow</h3>
      <NavLink className="btn btn-outline-light w-100 mb-2" to="/dashboard">
        Dashboard
      </NavLink>
      <NavLink className="btn btn-outline-light w-100 mb-2" to="/departments">
        Departments
      </NavLink>
      <NavLink className="btn btn-outline-light w-100 mb-2" to="/categories">
        Categories
      </NavLink>
      <NavLink className="btn btn-outline-light w-100 mb-2" to="/assets">
        Assets
      </NavLink>
      <NavLink className="btn btn-outline-light w-100 mb-2" to="/allocation">
        Allocation
      </NavLink>
      <NavLink className="btn btn-danger w-100 mt-5" to="/">
        Logout
      </NavLink>
    </div>
  );
}
export default Sidebar;