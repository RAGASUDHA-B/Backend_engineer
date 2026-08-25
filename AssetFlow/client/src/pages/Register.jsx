import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        name: "",

        email: "",

        password: ""

    });

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.post("/auth/register", form);

            alert("Registration Successful");

            navigate("/");

        }

        catch (err) {

            alert(

                err.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="container">

            <div className="row justify-content-center mt-5">

                <div className="col-md-5">

                    <div className="card shadow">

                        <div className="card-body">

                            <h2 className="text-center mb-4">

                                Register

                            </h2>

                            <form onSubmit={handleSubmit}>

                                <input

                                    className="form-control mb-3"

                                    type="text"

                                    name="name"

                                    placeholder="Name"

                                    onChange={handleChange}

                                    required

                                />

                                <input

                                    className="form-control mb-3"

                                    type="email"

                                    name="email"

                                    placeholder="Email"

                                    onChange={handleChange}

                                    required

                                />

                                <input

                                    className="form-control mb-3"

                                    type="password"

                                    name="password"

                                    placeholder="Password"

                                    onChange={handleChange}

                                    required

                                />

                                <button

                                    className="btn btn-success w-100"

                                >

                                    Register

                                </button>

                            </form>

                            <p className="mt-3 text-center">

                                Already have an account?

                                <Link to="/">

                                    Login

                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;