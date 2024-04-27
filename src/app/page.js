"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "@/Components/common/Button/Button";
import './login.css'

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    // You can perform further actions like sending the data to the server
  };

  return (
    <div className="login-screen">
      <div className="left-section">
        <Image src="/webLogo.png" width={160} height={35} />
        <h2>Your place to work <br /> Plan. Create. Control.</h2>
        <Image src="/Illustration.png" width={400} height={319}></Image>
      </div>
      <div className="right-section">
        <h5>Welcome to Hoarway Invoice !!</h5>
        <div className="InputsContainer">
          <div className="InputContainer">
            <div className="label">Email</div>
            <input 
              type="text" 
              className="inputBox" 
              placeholder="abc@gmail.com" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="InputContainer">
            <div className="label">Password</div>
            <input 
              type="password" 
              className="inputBox" 
              placeholder="********" 
              name="password" 
              value={formData.password} 
              onChange={handleInputChange} 
            />
            <div className="label2 forgotpass">Forgot Password?</div>
          </div>
        </div>
        <Button link="/dashboard" onClick={handleSubmit}>
          <div className="label3">
            Login
          </div>
        </Button>
        <div className="label2">Don't have an Account? Register</div>
      </div>
    </div>
  );
}
