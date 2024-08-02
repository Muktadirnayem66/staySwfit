"use client";

import { useRouter } from "next/navigation";
import { lazy, useState } from "react";

const RegistrationForm = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const fromData = new FormData(event.currentTarget);

      const fname = fromData.get("fname");
      const lname = fromData.get("lname");
      const email = fromData.get("email");
      const password = fromData.get("password");

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
            fname,
            lname,
            email,
            password,
        }),
      });

      res.status === 201 && router.push("/login")
    } catch (err) {
        setError(err.message)
    }
  };
  return (
    <>
     <div className="text-xl text-red-500 text-center">{error && error}</div>
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="fname">First Name</label>
        <input type="text" name="fname" id="fname" />
      </div>
      <div>
        <label htmlFor="lname">Last Name</label>
        <input type="text" name="lname" id="lname" />
      </div>
      <div>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
      </div>
      <button type="submit" className="btn-primary w-full mt-4">
        Create Account
      </button>
    </form>
    </>
  );
};

export default RegistrationForm;
