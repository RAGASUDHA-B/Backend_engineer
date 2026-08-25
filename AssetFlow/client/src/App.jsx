import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Departments";
import Category from "./pages/Categories";
import Asset from "./pages/Assets";
import Allocation from "./pages/Allocation";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/departments" element={<Department />} />

                <Route path="/categories" element={<Category />} />

                <Route path="/assets" element={<Asset />} />

                <Route path="/allocation" element={<Allocation />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;