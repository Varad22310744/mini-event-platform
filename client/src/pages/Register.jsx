import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const nav = useNavigate();

  const submit = async () => {
    try {
      await axios.post("https://mini-event-backend-jd3b.onrender.com/auth/register", form);
      alert("Registration successful. Please login.");
      nav("/");
    } catch (err) {
      alert(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          className="input"
          placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-green-600 text-white py-2 rounded"
          onClick={submit}
        >
          Register
        </button>
        <p
  className="text-sm text-center mt-3 text-blue-600 cursor-pointer"
  onClick={() => nav("/")}
>
  Already have an account? Login
</p>

      </div>
    </div>
  );
}
