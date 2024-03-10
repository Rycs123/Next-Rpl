"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import api from "@/actions/api";
import "../../globals.css";
import { useState } from "react";
import { redirect } from "next/navigation";

const DEFAULT_VALUE = {
  email: "",
  password: "",
  username: "",
  name: "",
  language: "en",
};

const Register = () => {
  const [fields, setFields] = useState(DEFAULT_VALUE);
  const [successMessage, setSuccessMessage] = useState("");

  const { mutate, isLoading, isSuccess, error } = useMutation({
    mutationFn: (data) => api.auth("/user", data),
    onSuccess: () => {
      setSuccessMessage("Registration successful. Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
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
          <div className='login-header-text'>
            <h6 className='login-text'>Sign Up to continue</h6>
          </div>
          <form className='login-form form-add-task' onSubmit={handleSubmit}>
            <div className='user-box'>
              <input
                onChange={handleChange}
                name='username'
                type='text'
                required
                value={fields.username}
              />
              <label>Username</label>
            </div>
            <div className='user-box'>
              <input
                onChange={handleChange}
                name='name'
                type='text'
                required
                value={fields.name}
              />
              <label>Name</label>
            </div>
            <div className='user-box'>
              <input
                onChange={handleChange}
                name='email'
                value={fields.email}
                type='text'
                required
              />
              <label>Email</label>
            </div>
            <div className='user-box'>
              <input
                onChange={handleChange}
                name='password'
                type='password'
                required
                value={fields.password}
              />
              <label>Password</label>
            </div>
            <button className='button-submit'>
              Register
              <div className='arrow-wrapper'>
                <div className='arrow'></div>
              </div>
            </button>
          </form>
          <p className='text-color-1'>
            Already have a Board account? <Link href='login'>Log in</Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default Register;
