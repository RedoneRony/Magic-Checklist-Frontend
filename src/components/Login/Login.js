import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import "./Login.css";

const Login = () => {
  const { providerLogin } = useContext(AuthContext);

  // dynamic Route Link
  const location = useLocation();
  const from = location.state?.from?.pathname || "/db/home";
  const navigate = useNavigate();

  // Provider
  const googleProvider = new GoogleAuthProvider();

  // Gmail login
  const handleProviderLogin = (provider) => {
    providerLogin(provider)
      .then((result) => {
        const user = result.user;
        const currentUser = {
          email: user.email,
        };

        toast.success("Login Successful ");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log(error);
      });
  };

  return (
    <div className="rt-login">
      <div className="container">
        <div className="vh-100  align-items-center justify-content-md-center row">
          <div className="col-lg-5">
            <div className="p-5 text-center">
              <img src="/logo.png" alt="logo" className="img-fluid" />
            </div>
            <div className="rt-login-box">
              <h3 className="text-start mb-4">Sign In</h3>
              <button
                className="rt-outline-btn w-100 text-start"
                onClick={() => handleProviderLogin(googleProvider)}
              >
                <FaGoogle />
                <span className="ps-4">Login with Google</span>
              </button>
            </div>

            <footer className="mt-5 text-center text-white">
              © 2022 reteamnow.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
