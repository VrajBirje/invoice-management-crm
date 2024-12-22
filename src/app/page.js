// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import Button from "@/Components/common/Button/Button";
// import './login.css'

// export default function Home() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = () => {
//     console.log(formData);
//     // You can perform further actions like sending the data to the server
//   };

//   return (
//     <div className="login-screen">
//       <div className="left-section">
//         <Image src="/webLogo.png" width={160} height={35} />
//         <h2>Your place to work <br /> Plan. Create. Control.</h2>
//         <Image src="/Illustration.png" width={400} height={319}></Image>
//       </div>
//       <div className="right-section">
//         <h5>Welcome to Hoarway Invoice !!</h5>
//         <div className="InputsContainer">
//           <div className="InputContainer">
//             <div className="label">Email</div>
//             <input 
//               type="text" 
//               className="inputBox" 
//               placeholder="abc@gmail.com" 
//               name="email" 
//               value={formData.email} 
//               onChange={handleInputChange} 
//             />
//           </div>
//           <div className="InputContainer">
//             <div className="label">Password</div>
//             <input 
//               type="password" 
//               className="inputBox" 
//               placeholder="********" 
//               name="password" 
//               value={formData.password} 
//               onChange={handleInputChange} 
//             />
//             <div className="label2 forgotpass">Forgot Password?</div>
//           </div>
//         </div>
//         <Button link="/dashboard" onClick={handleSubmit}>
//           <div className="label3">
//             Login
//           </div>
//         </Button>
//         <div className="label2">Don't have an Account? Register</div>
//       </div>
//     </div>
//   );
// }
"use client";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";
import Image from "next/image";
import Button from "@/Components/common/Button/Button";
import './login.css';
import Cookies from 'js-cookie';
import PageLoader from '@/Components/common/PageLoader';

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [load, setLoad] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          emailId: formData.email,
          password: formData.password
        })
      });
      setLoad(true);

      const data = await response.json();

      if (response.ok) {
        Cookies.set('token', data.token, { expires: 1 });
        toast.success("Login successful");
        console.log(data)
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 3000);
      } else {
        console.error(data.error);
        toast.error('Login failed: ' + data.error);
        setLoad(false);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred. Please try again.');
      setLoad(false);
    }
  };

  return (
    <div className="login-screen">
      <ToastContainer />
      <div className="left-section">
        <Image src="/webLogo.png" width={160} height={35} alt='img'/>
        <h2>Your place to work <br /> Plan. Create. Control.</h2>
        <Image src="/Illustration.png" width={400} height={319} alt='img'></Image>
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
        <Button onClick={handleSubmit}>
          <div className="label3">
            Login
          </div>
        </Button>
        <div className="label2">Dont have an Account? Register</div>
      </div>
      {load && <PageLoader />}
    </div>
  );
}
