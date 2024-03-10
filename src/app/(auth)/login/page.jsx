"use client";

import Link from "next/link";
import "../../globals.css";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import api from "@/actions/api";
import { redirect } from "next/navigation";
const DEFAULT_VALUE = {
  email: "",
  password: "",
};

const Login = () => {
  const [fields, setFields] = useState(DEFAULT_VALUE);
  const [successMessage, setSuccessMessage] = useState("");

  const { mutate, isLoading, isSuccess, error } = useMutation({
    mutationFn: (data) => api.auth("/user/login", data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.accessToken);
      setSuccessMessage("Log in successful. Redirecting to board...");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    },
  });

  const handleChange = (event) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await mutate(fields);
  };

  const isRegisterPage = true;
  return (
    <div id={isRegisterPage ? "register-root" : ""}>
      {error && (
        <div class='alert alert-danger'>
          <strong>{error.response.data.resultMessage.en}</strong>
        </div>
      )}
      {successMessage && (
        <div className='alert alert-success'>
          <strong>{successMessage}</strong>
        </div>
      )}
      {!isSuccess && (
        <div className='card'>
          <form className='login-form form-add-task' onSubmit={handleSubmit}>
            <div className='user-box'>
              <input
                type='text'
                required
                value={fields.email}
                onChange={handleChange}
                name='email'
              />
              <label>Email</label>
            </div>
            <div className='user-box'>
              <input
                type='password'
                required
                value={fields.password}
                onChange={handleChange}
                name='password'
              />
              <label>Password</label>
            </div>
            <button className='button-submit' type='submit'>
              Log in
              <div className='arrow-wrapper'>
                <div className='arrow'></div>
              </div>
            </button>
          </form>
          <p className='text-color-1'>
            Can&apos;t log in? <Link href='register'>Register</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
