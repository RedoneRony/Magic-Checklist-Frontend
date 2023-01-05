import React, { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

export const Main = () => {
  const { user, logOut } = useContext(AuthContext);
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Navbar bg="light" className="rt-nav">
        <Container>
          <Navbar.Brand>
            <Link>
              <img src="/logo.png" alt="logo" className="brand-logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <span className="m-3">{user.displayName}</span>
            </Navbar.Text>
            <Button variant="light" onClick={logOut}>
              <FaSignOutAlt />
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Outlet />
      </Container>

      <footer className="bg-light text-center text-lg-start">
        <div className="text-center p-3">
          ©{currentYear} Copyright
          <Link to="https://managedcoder.com/"> Managedcoder</Link>
        </div>
      </footer>
    </>
  );
};
