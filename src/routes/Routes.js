import { createBrowserRouter } from "react-router-dom";
import DownloadAllUser from "../components/DownloadAllUser/DownloadAllUser";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import ShowingData from "../components/ShowingData/ShowingData";
import { Main } from "../layout/Main";
import PrivateRoute from "./PrivateRoute";
import PdfFile from './../components/PDF/PdfFile';
// import PdfTemplate from './../components/PDF/PdfTemplate';
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/viewPDF",
    element: (
      <PrivateRoute>
        <PdfFile />
      </PrivateRoute>
    ),
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
        path: "/db",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
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
            <ShowingData />
          </PrivateRoute>
        ),
      },
      
      {
        path: "/db/download/all/user/",
        element: (
          <PrivateRoute>
            <DownloadAllUser />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
