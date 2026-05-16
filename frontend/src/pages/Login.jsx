import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/authContext";

const Login = () => {

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await loginUser(formData);

        if (data.error) {
            alert(data.error);
            return;
        }

        alert(data.message);

        if (data.user) {
            setUser(data.user);
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            navigate("/");
        }
    };

    return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Login to Your Account</h2>

            <form onSubmit={handleSubmit} className='space-y-6'>

                <div>
                    <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Username</label>
                <input
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                />
                </div>

                <div>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                    <input
                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className='w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    Login
                </button>

            </form>
        </div>
    </div>

    );
};

export default Login;
