import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const login = async () => {
    try {
      const res = await axios.post("https://mini-event-backend-jd3b.onrender.com/auth/login", {
        email,
        password
      });

      // ✅ Store token & userId
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      nav("/events");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded"
          onClick={login}
        >
          Login
        </button>

        <p
          className="text-sm text-center mt-3 text-blue-600 cursor-pointer"
          onClick={() => nav("/register")}
        >
          Create new account
        </p>
      </div>
    </div>
  );
}
