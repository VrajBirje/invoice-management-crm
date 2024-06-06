// "use client";
// import React, { useState, useEffect } from 'react';

// const OtpComponent = () => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [generatedOtp, setGeneratedOtp] = useState(null);
//   const [otpSent, setOtpSent] = useState(false);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://smtpjs.com/v3/smtp.js';
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const sendOTP = () => {
//     const otp_val = Math.floor(1000 + Math.random() * 9000).toString();
//     setGeneratedOtp(otp_val);

//     const emailbody = `<h2>Your OTP is </h2>${otp_val}`;

//     window.Email.send({
//       SecureToken: "8f2c8c98-e812-4b25-aaa5-fe38b6fa204a",
//       To: email,
//       From: "vrajbirje0309@gmail.com",
//       Subject: "Email OTP using JavaScript",
//       Body: emailbody,
//     }).then((message) => {
//       console.log('Email response:', message);
//       if (message === "OK") {
//         alert("OTP sent to your email " + email);
//         setOtpSent(true);
//       } else {
//         alert("Failed to send OTP: " + message);
//       }
//     }).catch((error) => {
//       console.error('Error sending email:', error);
//       alert("Failed to send OTP: " + error);
//     });
//   };

//   const verifyOtp = () => {
//     if (otp === generatedOtp) {
//       alert("Email address verified...");
//     } else {
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <div className="form">
//       <h1>OTP Using JavaScript</h1>
//       <input
//         type="email"
//         id="email"
//         placeholder="Enter Email..."
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       {otpSent && (
//         <div className="otpverify">
//           <input
//             type="text"
//             id="otp_inp"
//             placeholder="Enter the OTP sent to your Email..."
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <button className="btn" id="otp-btn" onClick={verifyOtp}>
//             Verify
//           </button>
//         </div>
//       )}
//       <button className="btn" onClick={sendOTP}>
//         Send OTP
//       </button>
//     </div>
//   );
// };

// export default OtpComponent;

"use client";
import React, { useState, useEffect } from 'react';

const OtpComponent = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://smtpjs.com/v3/smtp.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const sendOTP = () => {
    const otp_val = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp_val);

    const emailbody = `<h2>Your OTP is </h2>${otp_val}`;

    window.Email.send({
      SecureToken: "8f2c8c98-e812-4b25-aaa5-fe38b6fa204a",
      To: email,
      From: "vrajbirje0309@gmail.com",
      Subject: "Email OTP using JavaScript",
      Body: emailbody,
    }).then((message) => {
      console.log('Email response:', message);
      if (message === "OK") {
        alert("OTP sent to your email " + email);
        setOtpSent(true);
      } else {
        alert("Failed to send OTP: " + message);
      }
    }).catch((error) => {
      console.error('Error sending email:', error);
      alert("Failed to send OTP: " + error);
    });
  };

  const verifyOtp = () => {
    if (otp === generatedOtp) {
      alert("Email address verified...");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="form">
      <h1>OTP Using JavaScript</h1>
      <input
        type="email"
        id="email"
        placeholder="Enter Email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {otpSent && (
        <div className="otpverify">
          <input
            type="text"
            id="otp_inp"
            placeholder="Enter the OTP sent to your Email..."
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button className="btn" id="otp-btn" onClick={verifyOtp}>
            Verify
          </button>
        </div>
      )}
      <button className="btn" onClick={sendOTP}>
        Send OTP
      </button>
    </div>
  );
};

export default OtpComponent;
