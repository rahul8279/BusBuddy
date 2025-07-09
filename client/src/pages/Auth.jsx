import React, { useState } from "react";
import axios from "axios";
import { LuLoader } from "react-icons/lu";
import { USER_API_ENDPOINT } from "../services/constant.js";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const [loginInput, setloginInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [signupinput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const changeInput = (e) => {
    login
      ? setloginInput({
          ...loginInput,
          [e.target.name]: e.target.value,
        })
      : setSignupInput({ ...signupinput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (!login) {
        const user = await axios.post(
          `${USER_API_ENDPOINT}/register`,
          signupinput,
          {
            withCredentials: true,
          }
        );
        if (user.data.success) {
          navigate("/");
        }
      } else {
        const user = await axios.post(
          `${USER_API_ENDPOINT}/login`,
          loginInput,
          {
            withCredentials: true,
          }
        );
        if (user.data.success) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-[url('src/assets/bgimage.jpg')] bg-cover   ">
      <div className=" h-[60%] w-[70%] lg:w-[30%] rounded-lg shadow-2xl  flex flex-col justify-center bg-gray-100  items-center ">
        {login ? (
          <h1 className="text-3xl font-bold mb-4">Login</h1>
        ) : (
          <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        )}
        <div className="flex justify-between gap-10 mb-4">
          <button
            onClick={() => setLogin(true)}
            className={`cursor-pointer font-medium px-5 py-1  transition-all duration-300 rounded-xl ${
              login ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            login
          </button>
          <button
            onClick={() => setLogin(false)}
            className={`cursor-pointer font-medium px-5 py-1  transition-all duration-300 rounded-xl ${
              !login ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            Signup
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <input
            type="text"
            placeholder="name"
            name="name"
            value={signupinput.name}
            onChange={changeInput}
            className={`${
              !login
                ? " border-2 border-gray-300 rounded-lg p-2 w-64"
                : "hidden"
            }`}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={login ? loginInput.email : signupinput.email}
            onChange={changeInput}
            className="border-2 border-gray-300 rounded-lg p-2 w-64"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={login ? loginInput.password : signupinput.password}
            onChange={changeInput}
            className="border-2 border-gray-300 rounded-lg p-2 w-64"
          />
          <div className="flex justify-evenly gap-2">
            {["admin", "driver", "user"].map((r) => (
              <label key={r} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value={r}
                  checked={(login ? loginInput.role : signupinput.role) === r}
                  onChange={changeInput}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="capitalize text-gray-700">{r}</span>
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg p-2 w-64 hover:bg-blue-600 transition-all duration-300 text-center flex justify-center items-center"
          >
            {
              loading ? <LuLoader className=" text-2xl animate-spin" /> : login ? "login" : "signup"
            }
          </button>
        </form>

        
      </div>
    </div>
  );
}

export default Auth;
