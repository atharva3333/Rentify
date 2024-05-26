import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {    

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://rentify-1-xlg3.onrender.com/login", { email, password })
        .then(response => {
            const { data } = response;
            if (response.status === 200) {
                localStorage.setItem('email', email);  // Store the email in localStorage
                console.log("Stored Email:", localStorage.getItem('email'));  // Log the stored email
                navigate("/home");
            } else {
                setError(data.message);
                alert(error);
                if (response.status === 401 || response.status === 404) {
                    navigate("/register");
                }
            }
        })
        .catch(err => {
            console.log(err);
            setError("An error occurred. Please try again.");
        });
    };
    


  return (
    <div className="flex justify-center items-center bg-gray-900 min-h-screen">
    <div className="bg-white p-6 rounded w-1/4">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>

        <p>Note: Backend takes up to 50 sec for a request please be patient.</p>
        <form onSubmit={handleSubmit}>
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
                Login
            </button>
        </form>
        <p className="mt-4">Don&apos;t have an account?</p>
        <Link to="/register" className="block w-full py-2 mt-2 text-center border rounded bg-gray-200 hover:bg-gray-300 text-black no-underline">
            Sign Up
        </Link>
    </div>
</div>

  );
}

export default Login;