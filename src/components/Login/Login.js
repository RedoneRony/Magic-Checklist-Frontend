import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import "./Login.css";

const Login = () => {
  const { providerLogin, setLoading } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();

  const navigate = useNavigate();

  let currentUser = "";
  let result = "";

  // Provider
  const googleProvider = new GoogleAuthProvider();

  // Gmail login
  const handleProviderLogin = (provider) => {
    providerLogin(provider)
      .then((result) => {
        toast.success("Login Successful ");
        const user = result.user;
        currentUser = {
          email: user.email,
        };
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        insertNewUserToDb(currentUser.email);
        getEmployeeEmails(currentUser.email);
      });
  };

  // check db data

  const getEmployeeEmails = async (value) => {
    await axios
      .get(`${process.env.REACT_APP_SITE_API}/api/okr/getAll`, {
        headers: {
          "Content-Type": "application/json",
          email: `${value}`,
        },
      })
      .then((response) => {
        result = response.data.length;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        navigate(result === 1 ? "/db/result" : "/db/home");
      });
  };

  // insert new user to db
  const insertNewUserToDb = async (value) => {
    const addNewUser = {
      email: `${value}`,
    };
    await axios
      .post(`${process.env.REACT_APP_SITE_API}/api/user/createList`, addNewUser)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
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
            <div className="rt-login-box mb-5">
              <h3 className="text-start mb-4 brand-color">Sign In</h3>
              <button
                className="rt-outline-btn w-100 text-start"
                onClick={() => handleProviderLogin(googleProvider)}
              >
                <FaGoogle className="brand-color" />
                <span className="ps-4">Login with Google</span>
              </button>
            </div>

            <footer className="mt-5 text-center brand-color">
              &copy; {currentYear} Managed Coder.
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
