import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Title */}
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Email"
              className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          {/* Create Account Link */}
          <a
            href="/signup"
            className="block text-center text-sm text-blue-500 hover:underline"
          >
            Create an Account
          </a>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
          >
            Login
          </button>

          {/* Logo */}
          <img
            src="/images/LogoT2.png"
            alt="logo"
            className="mx-auto mt-40 h-40 w-52 object-contain"
          />
        </form>
      </div>
    </div>
  );
}
