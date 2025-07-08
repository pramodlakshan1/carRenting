import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signin() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [step, setStep] = useState("select");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!role) {
      setError("Please select a role");
      return;
    }

    setError("");
    alert(`Form submitted successfully as a ${role}!`);
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In clicked (you can integrate OAuth logic here)");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white/70 backdrop-blur-md p-8 shadow-2xl ring-1 ring-gray-100">
        {step === "select" ? (
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Get Started</h2>
            <p className="text-sm text-gray-500">Choose your role to create an account</p>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setRole("customer");
                  setStep("form");
                }}
                className="w-full rounded-lg bg-blue-500 px-4 py-3 text-base font-semibold text-white shadow hover:bg-blue-400 transition duration-200"
              >
                Sign Up as Customer
              </button>
              <button
                onClick={() => {
                  setRole("dealer");
                  setStep("form");
                }}
                className="w-full rounded-lg bg-emerald-500 px-4 py-3 text-base font-semibold text-white shadow hover:bg-emerald-400 transition duration-200"
              >
                Sign Up as Seller
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
              <p className="mt-1 text-sm text-gray-500">
                Signing up as{" "}
                <strong>{role === "customer" ? "Customer" : "Seller"}</strong>
              </p>
            </div>

            <div className="mb-5">
              <button
                onClick={handleGoogleSignIn}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition duration-200"
              >
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="h-5 w-5"
                />
                <span>Sign in with Google</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 shadow focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 shadow focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 shadow focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 shadow focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-base text-gray-900 shadow focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-lg bg-blue-500 px-4 py-2 text-base font-semibold text-white shadow hover:bg-blue-400 transition duration-200"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signin;
