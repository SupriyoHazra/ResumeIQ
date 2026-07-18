import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function login(e) {
    e.preventDefault();

    try {
      const res = await api.post("/login", form);

      localStorage.setItem(
        "token",
        res.data.access_token
      );

      localStorage.setItem(
        "username",
        res.data.username
      );

      navigate("/upload");

    } catch (err) {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <form
        onSubmit={login}
        className="bg-slate-900 p-10 rounded-3xl w-[420px]"
      >

        <h1 className="text-3xl font-bold text-white mb-8">
          Login
        </h1>

        <input
          className="w-full mb-4 p-3 rounded-xl"
          placeholder="Email"
          onChange={(e)=>
            setForm({...form,email:e.target.value})
          }
        />

        <input
          type="password"
          className="w-full mb-6 p-3 rounded-xl"
          placeholder="Password"
          onChange={(e)=>
            setForm({...form,password:e.target.value})
          }
        />

        <button
          className="w-full bg-indigo-600 p-3 rounded-xl text-white"
        >
          Login
        </button>

      </form>

    </div>
  );
}