import { createBrowserRouter } from "react-router-dom";
import { Landing, MarketPlace, RootLayout } from "../pages";

import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/marketplace",
        element: <MarketPlace />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },
]);
