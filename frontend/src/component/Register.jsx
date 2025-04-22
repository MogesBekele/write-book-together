import React from "react";

const Register = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Register</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Username" className="border p-2" />
        <input type="email" placeholder="Email" className="border p-2" />
        <input type="password" placeholder="Password" className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
