import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {    

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/register", { name, email, password })
        .then(result => {
            if (result.data.message === "Email already in use") {
                setError(result.data.message);
            } else {
                console.log(result);
                navigate("/login");
            }
        })
        .catch(err => {
            console.log(err);
            setError("An error occurred. Please try again.");
        });
    }

    return (
        <div className="flex justify-center items-center bg-gray-600 min-h-screen">
            <div className="bg-white p-6 rounded w-1/4">
                <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block font-semibold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block font-semibold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4">Already have an account?</p>
                <Link to="/login" className="block w-full py-2 mt-2 text-center border rounded bg-gray-200 hover:bg-gray-300 text-black no-underline">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
