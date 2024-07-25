import React, { useState } from "react";
import { Link } from "react-router-dom";
import _ from 'lodash'

function Login() {
  const [formdata, setFormdata] = useState({
    email:'',
    password: '',
  })

  const handleChange = (event)=>{
  const {name, value} = event.target;
  debounceUpdateFromData(name,value);
  }

  const debounceUpdateFromData = _.debounce((name, value)=>{
    setFormdata((prevFormdata)=>{
      return {
        ...prevFormdata,
        [name]:value,
      }
    })
  }, 500)

  const handleSubmit = (e)=>{
  e.preventDefault()
  }


  return (
    <>
      <div className="relative py-16 bg-black">
        <div className="relative container m-auto px-6 text-[#FFDB00] md:px-12 xl:px-40">
          <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
            <div className="rounded-xl bg-black shadow-xl">
              <div className="p-6 sm:p-16">
                <div className="space-y-4">
                  <h2 className="mb-8 text-2xl text-[#FFDB00] font-bold">
                  Log in to Hive and keep <br /> the buzz going!
                  </h2>
                </div>
                <form onSubmit={handleSubmit}  className="mt-14 space-y-4 ">
                  <label className="input input-bordered border-[#FFDB00] flex items-center gap-2 bg-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow bg-transparent focus:outline-none text-white"
                      name="email"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                  </label>

                  <label className="input input-bordered border-[#FFDB00] flex items-center gap-2 bg-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      className="grow bg-transparent focus:outline-none text-white"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </label>
     
                  <div className="flex flex-col items-center">
                  <button type="submit" className="btn btn-ghost text-xl font-light w-auto md:w-auto">
                    Login
                  </button>
                  </div>
                </form>

                <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
                  <p className="text-sm">
                    First time on hive?{" "}
                    <Link to={"/signup"} className="underline">
                      Register here
                    </Link>{" "}
                    and confirm you have read our{" "}
                    <a href="#" className="underline">
                      Privacy and Cookie Statement
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
