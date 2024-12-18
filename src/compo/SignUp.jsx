import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [religion, setReligion] = useState("");
  const [dob, setDob] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [profession, setProfession] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      setStep(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!religion) {
      setError("Please select your religion.");
      return;
    }

    // Redirect to login page
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {step === 1 && (
          <>
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
              Sign Up
            </h2>
            <form onSubmit={handleContinue} className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}

              {/* Continue Button */}
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
              >
                Continue
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
              Additional Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Religion Field */}
              <div>
                <label
                  htmlFor="religion"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <select
                  id="religion"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select your religion
                  </option>
                  <option value="Jewish">Jewish</option>
                  <option value="Arab">Arab</option>
                </select>
              </div>

              {/* Date of Birth Field */}
              <div>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Education Field */}
              <div>
                <input
                  type="text"
                  placeholder="Education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Experience Field */}
              <div>
                <input
                  type="text"
                  placeholder="Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Profession Field */}
              <div>
                <input
                  type="text"
                  placeholder="Profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
