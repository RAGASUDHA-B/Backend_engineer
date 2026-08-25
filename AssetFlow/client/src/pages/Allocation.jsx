import { useEffect,useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
function Allocation(){
    const [assets,setAssets]=useState([]);
    const [employees,setEmployees]=useState([]);
    const [allocations,setAllocations]=useState([]);
    const [form,setForm]=useState({asset:"",employee:"",expectedReturnDate:""});
    useEffect(()=>{fetchAssets();fetchEmployees();fetchAllocations();},[]);
    const fetchAssets=async()=>{try{const res=await api.get("/assets");setAssets(res.data.filter(a=>a.status==="Available"));}catch(err){console.log(err);}}
    const fetchEmployees=async()=>{try{const res=await api.get("/auth/users");setEmployees(res.data);}catch(err){console.log(err);}}
    const fetchAllocations=async()=>{try{const res=await api.get("/allocations");setAllocations(res.data);}catch(err){console.log(err);}}
    const handleChange=(e)=>{setForm({...form,[e.target.name]:e.target.value});}
    const handleSubmit=async(e)=>{e.preventDefault();try{await api.post("/allocations",form);alert("Asset Allocated");setForm({asset:"",employee:"",expectedReturnDate:""});fetchAllocations();fetchAssets();}catch(err){alert(err.response?.data?.message||"Error");}}
    const returnAllocation=async(id)=>{if(!window.confirm("Return Asset?"))return;try{await api.put(`/allocations/return/${id}`);fetchAllocations();fetchAssets();}catch(err){alert("Return Failed");}}
    return (

        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <Navbar />

                <div className="container mt-4">

                    <h2>Asset Allocation</h2>

                    <div className="card shadow p-4 mb-4">

                        <form onSubmit={handleSubmit}>

                            <div className="row g-2">

                                <div className="col-md-4">

                                    <select className="form-control" name="asset" value={form.asset} onChange={handleChange} required>

                                        <option value="">Select Asset</option>

                                        {assets.map(a=> (<option key={a._id} value={a._id}>{a.assetTag} - {a.name}</option>))}

                                    </select>

                                </div>

                                <div className="col-md-4">

                                    <select className="form-control" name="employee" value={form.employee} onChange={handleChange} required>

                                        <option value="">Select Employee</option>

                                        {employees.map(u=> (<option key={u._id} value={u._id}>{u.name} - {u.email}</option>))}

                                    </select>

                                </div>

                                <div className="col-md-3">

                                    <input type="date" name="expectedReturnDate" className="form-control" value={form.expectedReturnDate} onChange={handleChange} />

                                </div>

                                <div className="col-md-1">

                                    <button className="btn btn-primary w-100">Allocate</button>

                                </div>

                            </div>

                        </form>

                    </div>

                    <table className="table table-bordered table-hover">

                        <thead className="table-dark">

                            <tr>

                                <th>Asset</th>

                                <th>Employee</th>

                                <th>Allocated On</th>

                                <th>Expected Return</th>

                                <th>Status</th>

                                <th width="150">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {allocations.map(al=> (

                                <tr key={al._id}>

                                    <td>{al.asset?.assetTag} - {al.asset?.name}</td>

                                    <td>{al.employee?.name}</td>

                                    <td>{new Date(al.allocatedDate).toLocaleDateString()}</td>

                                    <td>{al.expectedReturnDate?new Date(al.expectedReturnDate).toLocaleDateString():"-"}</td>

                                    <td>{al.status}</td>

                                    <td>{al.status!=="Returned"&&(<button className="btn btn-success btn-sm" onClick={()=>returnAllocation(al._id)}>Return</button>)}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default Allocation;