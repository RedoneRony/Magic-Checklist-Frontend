import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import Result from "../components/Result/Result";
import ShowingData from "../components/ShowingData/ShowingData";
import { Main } from "../layout/Main";
import PrivateRoute from "./PrivateRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/db",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/db/home",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/db/result",
        element: (
          <PrivateRoute>
            <Result />
          </PrivateRoute>
        ),
      },
      {
        path: "/db/showing",
        element: (
          <PrivateRoute>
            <ShowingData />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
