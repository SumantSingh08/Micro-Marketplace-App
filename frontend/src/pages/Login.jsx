import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../service/Api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setServerError("");

        try {
            setLoading(true);
            const res = await Api.post("/auth/login", data);
            login(res.data.token);
            navigate("/");
        } catch (err) {
            setServerError(
                err.response?.data?.message || "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back 👋
                </h2>

                <p className="text-center text-gray-500 mb-6 text-sm">
                    Login to manage your marketplace products
                </p>

                {/* Server Error */}
                {serverError && (
                    <div className="bg-red-100 text-red-600 text-sm p-3 rounded mb-4 text-center">
                        {serverError}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email format",
                                },
                            })}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.email
                                    ? "border-red-400 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-blue-500"
                                }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters required",
                                },
                            })}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.password
                                    ? "border-red-400 focus:ring-red-400"
                                    : "border-gray-300 focus:ring-blue-500"
                                }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 transform  disabled:opacity-70 cursor-pointer"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-blue-600 hover:underline cursor-pointer"
                    >
                        Register
                    </span>
                </p>

            </div>
        </div>
    );
}