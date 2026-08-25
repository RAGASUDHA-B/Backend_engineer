import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Department() {

    const [departments, setDepartments] = useState([]);

    const [form, setForm] = useState({
        name: "",
        status: "Active"
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const res = await api.get("/departments");
            setDepartments(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await api.put(`/departments/${editingId}`, form);

                alert("Department Updated");

            } else {

                await api.post("/departments", form);

                alert("Department Added");

            }

            setForm({
                name: "",
                status: "Active"
            });

            setEditingId(null);

            fetchDepartments();

        }

        catch (err) {

            alert("Error");

        }

    };

    const editDepartment = (dept) => {

        setEditingId(dept._id);

        setForm({

            name: dept.name,

            status: dept.status

        });

    };

    const deleteDepartment = async (id) => {

        if (!window.confirm("Delete Department?")) return;

        try {

            await api.delete(`/departments/${id}`);

            fetchDepartments();

        }

        catch (error) {

            alert("Delete Failed");

        }

    };

    return (

        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <Navbar />

                <div className="container mt-4">

                    <h2>Department Management</h2>

                    <div className="card shadow p-4 mb-4">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-5">

                                    <input

                                        type="text"

                                        name="name"

                                        className="form-control"

                                        placeholder="Department Name"

                                        value={form.name}

                                        onChange={handleChange}

                                        required

                                    />

                                </div>

                                <div className="col-md-3">

                                    <select

                                        className="form-control"

                                        name="status"

                                        value={form.status}

                                        onChange={handleChange}

                                    >

                                        <option>Active</option>

                                        <option>Inactive</option>

                                    </select>

                                </div>

                                <div className="col-md-4">

                                    <button className="btn btn-primary">

                                        {editingId ? "Update" : "Add"}

                                    </button>

                                </div>

                            </div>

                        </form>

                    </div>

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Name</th>

                                <th>Status</th>

                                <th width="220">

                                    Actions

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                departments.map((dept) => (

                                    <tr key={dept._id}>

                                        <td>{dept.name}</td>

                                        <td>{dept.status}</td>

                                        <td>

                                            <button

                                                className="btn btn-warning btn-sm me-2"

                                                onClick={() => editDepartment(dept)}

                                            >

                                                Edit

                                            </button>

                                            <button

                                                className="btn btn-danger btn-sm"

                                                onClick={() => deleteDepartment(dept._id)}

                                            >

                                                Delete

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Department;