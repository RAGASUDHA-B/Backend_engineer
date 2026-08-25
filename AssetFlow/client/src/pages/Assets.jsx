import { useEffect,useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Assets() {
    const [assets,setAssets]=useState([]);
    const [form,setForm]=useState({
        assetTag:"",
        name:"",
        category:"",
        department:"",
        serialNumber:"",
        location:"",
        condition:"Good",
        status:"Available"
    });
    const [editingId,setEditingId]=useState(null);
    const [categories,setCategories]=useState([]);

    const [departments,setDepartments]=useState([]);

    useEffect(()=>{fetchAssets();fetchCategories();fetchDepartments();},[]);

    const fetchAssets=async()=>{try{const res=await api.get("/assets");setAssets(res.data);}catch(err){console.log(err);}}

    const fetchCategories=async()=>{try{const res=await api.get("/categories");setCategories(res.data);}catch(err){console.log(err);}}

    const fetchDepartments=async()=>{try{const res=await api.get("/departments");setDepartments(res.data);}catch(err){console.log(err);}}

    const handleChange=(e)=>{setForm({...form,[e.target.name]:e.target.value});}

    const handleSubmit=async(e)=>{e.preventDefault();try{if(editingId){await api.put(`/assets/${editingId}`,form);alert("Asset Updated");}else{await api.post("/assets",form);alert("Asset Added");}setForm({assetTag:"",name:"",category:"",department:"",serialNumber:"",location:"",condition:"Good",status:"Available"});setEditingId(null);fetchAssets();}catch(err){alert("Error");}}

    const editAsset=(a)=>{setEditingId(a._id);setForm({assetTag:a.assetTag,name:a.name,category:a.category?._id||a.category,department:a.department?._id||a.department,serialNumber:a.serialNumber||"",location:a.location||"",condition:a.condition||"Good",status:a.status||"Available"});}

    const deleteAsset=async(id)=>{if(!window.confirm("Delete Asset?"))return;try{await api.delete(`/assets/${id}`);fetchAssets();}catch(err){alert("Delete Failed");}}

    return (

        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <Navbar />

                <div className="container mt-4">

                    <h2>Asset Management</h2>

                    <div className="card shadow p-4 mb-4">

                        <form onSubmit={handleSubmit}>

                            <div className="row g-2">

                                <div className="col-md-3">

                                    <input type="text" name="assetTag" className="form-control" placeholder="Asset Tag" value={form.assetTag} onChange={handleChange} required />

                                </div>

                                <div className="col-md-3">

                                    <input type="text" name="name" className="form-control" placeholder="Asset Name" value={form.name} onChange={handleChange} required />

                                </div>

                                <div className="col-md-2">

                                    <select className="form-control" name="category" value={form.category} onChange={handleChange} required>

                                        <option value="">Select Category</option>

                                        {categories.map(cat=> (<option key={cat._id} value={cat._id}>{cat.name}</option>))}

                                    </select>

                                </div>

                                <div className="col-md-2">

                                    <select className="form-control" name="department" value={form.department} onChange={handleChange} required>

                                        <option value="">Select Department</option>

                                        {departments.map(d=> (<option key={d._id} value={d._id}>{d.name}</option>))}

                                    </select>

                                </div>

                                <div className="col-md-2">

                                    <button className="btn btn-primary w-100">{editingId?"Update":"Add"}</button>

                                </div>

                                <div className="col-12 mt-3">

                                    <div className="row g-2">

                                        <div className="col-md-3">

                                            <input type="text" name="serialNumber" className="form-control" placeholder="Serial Number" value={form.serialNumber} onChange={handleChange} />

                                        </div>

                                        <div className="col-md-3">

                                            <input type="text" name="location" className="form-control" placeholder="Location" value={form.location} onChange={handleChange} />

                                        </div>

                                        <div className="col-md-3">

                                            <select className="form-control" name="condition" value={form.condition} onChange={handleChange}>

                                                <option>Good</option>

                                                <option>Fair</option>

                                                <option>Poor</option>

                                            </select>

                                        </div>

                                        <div className="col-md-3">

                                            <select className="form-control" name="status" value={form.status} onChange={handleChange}>

                                                <option>Available</option>

                                                <option>Allocated</option>

                                                <option>Retired</option>

                                            </select>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </form>

                    </div>

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Tag</th>

                                <th>Name</th>

                                <th>Category</th>

                                <th>Department</th>

                                <th>Status</th>

                                <th width="200">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {assets.map(a=> (

                                <tr key={a._id}>

                                    <td>{a.assetTag}</td>

                                    <td>{a.name}</td>

                                    <td>{a.category?.name || "-"}</td>

                                    <td>{a.department?.name || "-"}</td>

                                    <td>{a.status}</td>

                                    <td>

                                        <button className="btn btn-warning btn-sm me-2" onClick={()=>editAsset(a)}>Edit</button>

                                        <button className="btn btn-danger btn-sm" onClick={()=>deleteAsset(a._id)}>Delete</button>

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
export default Assets;