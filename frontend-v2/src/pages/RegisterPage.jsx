import axios from "axios";
import { useState } from "react";
import { Link, Navigate} from "react-router-dom";
import Footer from "../Footer";
import './register-page.css';
export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  // const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  // const [isOtpSent, setIsOtpSent] = useState("");
  // const [redirect, setRedirect] = useState(false);
  // const navigate = useNavigate();
  if(redirect) {
    return <Navigate to ={'/login'} />
  }
  const context = "register";
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      // const token = localStorage.getItem("token");
      await axios.post("/user/register", {
        firstName,
        lastName,
        email,
        password,
      },{
        headers: {
          "Content-Type": "application/json", // Đảm bảo header là JSON
        }
      });
      // alert("Registration successful! Now you can login.");
      // setRedirect(true);
      // localStorage.setItem('email', email);
      // localStorage.setItem('password', password);
      // localStorage.setItem('firstName', firstName);
      // localStorage.setItem('lastName', lastName);
      // localStorage.setItem('context', "register");
      // navigate("/otp");
      setIsOtpModalOpen(true);
    } catch (e) {
      alert("Registration failed. Please try again.");
    }
  }
  //tu dong gui otp va sau do xac minh otp
  // const requestOtp = async (email) => {
  //   try {
  //     const response = await fetch('http://localhost:8080/user/otp/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email }),
  //     });

  //     if (response.ok) {
  //       setIsOtpSent(true);
  //     } else {
  //       throw new Error('Failed to send OTP');
  //     }
  //   } catch (err) {
  //     setError('An error occurred while sending OTP');
      
  //   }
  // };
  return (
    <div className="pt-5 flex flex-col min-h-screen">
      <header className="flex justify-between px-10 mb-7">
        <Link
          to={"/"}
          className="flex items-center gap-1 text-primary md:pl-2 lg:pl-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
            />
          </svg>
          <span className="font-bold text-2xl text-primary hidden md:flex">
            StayEasy
          </span>
        </Link>
      </header>
      <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-32 border p-5 border-1 border-gray-300 rounded-xl">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Register
          </h1>
          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <label className="text-m font-medium text-gray-900">
              {"Your name"}
            </label>
            <div className="flex gap-2">
              <input
                className="input-log"
                type="text"
                placeholder={"First name"}
                value={firstName}
                onChange={(ev) => setFirstName(ev.target.value)}
              />
              <input
                className="input-log"
                type="text"
                placeholder={"Last name"}
                value={lastName}
                onChange={(ev) => setLastName(ev.target.value)}
              />
            </div>
            <label className="text-m font-medium text-gray-900"></label>
            <label className="text-m font-medium text-gray-900">
              {"Your email"}
            </label>
            <input
              className="input-log"
              type="email"
              placeholder={"your@email.com"}
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label className="text-m font-medium text-gray-900">
              {"Your password"}
            </label>
            <input
              className="input-log"
              type="password"
              placeholder="••••••••••••••••"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            {/* <label className="text-m font-medium text-gray-900">
              {"OTP"}
            </label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                className="input-log"
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(ev) => setOtp(ev.target.value)}
              />
              <button className="ml-3 px-4 py-2">
                Send
              </button>
          </div> */}
            {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2 mb-2">Resend OTP</button> */}
            <button className="register-button">Register</button>
            <div className="text-center py-2 text-gray-900">
              {"Already a member? "}
              <Link className="font-semibold underline" to={"/login"}>
                {"Log in"}
              </Link>
            </div>
          </form>
        </div>
      </div>
      {isOtpModalOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        className="input-log"
      />
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={async () => {
            try {
              // Gửi OTP lên server để xác thực
              await axios.post("/user/otp/verify", { email, otp, context });
              alert("OTP verified successfully!");
              setIsOtpModalOpen(false); // Đóng modal sau khi xác thực thành công
              setRedirect(true);
            } catch (err) {
              alert("OTP verification failed. Please try again.");
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Verify OTP
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={registerUser}>
          Resend
        </button>
        <button
          onClick={() => setIsOtpModalOpen(false)}
          className="bg-red-500 text-white px-4 py-2 rounded-full"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
      <Footer />
    </div>
  );
}
