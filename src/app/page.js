import Image from "next/image";
import './login.css'
import Button from "@/Components/Button/Button";

export default function Home() {
  return (
    <div className="login-screen">
      <div className="left-section">
        <Image src="/webLogo.png" width={160} height={35} />
        <h2>Your place to work <br /> Plan. Create. Control.</h2>
        <Image src="/Illustration.png" width={400} height={319}></Image>
      </div>
      <div className="right-section">
        <h4>Welcome to Hoarway Invoice !!</h4>
        <div className="InputsContainer">
          <div className="InputContainer">
            <div className="label">Email</div>
            <input type="text" className="inputBox" placeholder="abc@gmail.com" />
          </div>
          <div className="InputContainer">
            <div className="label">Password</div>
            <input type="password" className="inputBox" placeholder="********" />
            <div className="label2 forgotpass">Forgot Password?</div>
          </div>
        </div>
        <Button>
          <div className="label3">
            Login
          </div>
        </Button>
        <div className="label2">Don't have an Account? Register</div>
      </div>
    </div>
  );
}
