import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function register(e) {
    e.preventDefault();

    try {
      await api.post("/signup", form);

      alert("Account Created!");

      navigate("/login");

    } catch (err) {
      alert("Registration Failed");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <form
        onSubmit={register}
        className="bg-slate-900 p-10 rounded-3xl w-[420px]"
      >

        <h1 className="text-3xl font-bold text-white mb-8">
          Create Account
        </h1>

        <input
          className="w-full mb-4 p-3 rounded-xl"
          placeholder="Username"
          onChange={(e)=>
            setForm({...form,username:e.target.value})
          }
        />

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
          Register
        </button>

      </form>

    </div>
  );
}