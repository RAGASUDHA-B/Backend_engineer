import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Category() {

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        name: "",
        description: ""
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories");
            setCategories(res.data);
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

                await api.put(`/categories/${editingId}`, form);

                alert("Category Updated");

            } else {

                await api.post("/categories", form);

                alert("Category Added");

            }

            setForm({
                name: "",
                description: ""
            });

            setEditingId(null);

            fetchCategories();

        } catch (err) {

            alert("Operation Failed");

        }

    };

    const editCategory = (category) => {

        setEditingId(category._id);

        setForm({
            name: category.name,
            description: category.description
        });

    };

    const deleteCategory = async (id) => {

        if (!window.confirm("Delete Category?")) return;

        try {

            await api.delete(`/categories/${id}`);

            fetchCategories();

        } catch (err) {

            alert("Delete Failed");

        }

    };

    return (

        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <Navbar />

                <div className="container mt-4">

                    <h2>Category Management</h2>

                    <div className="card shadow p-4 mb-4">

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-4">

                                    <input
                                        className="form-control"
                                        name="name"
                                        placeholder="Category Name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                                <div className="col-md-4">

                                    <input
                                        className="form-control"
                                        name="description"
                                        placeholder="Description"
                                        value={form.description}
                                        onChange={handleChange}
                                    />

                                </div>

                                <div className="col-md-4">

                                    <button className="btn btn-success">

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

                                <th>Description</th>

                                <th width="200">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {categories.map((category) => (

                                <tr key={category._id}>

                                    <td>{category.name}</td>

                                    <td>{category.description}</td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => editCategory(category)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteCategory(category._id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Category;