import { createBrowserRouter } from "react-router-dom";
import { Landing, MarketPlace, RootLayout } from "../pages";
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";
import ProfilePage from "../userPage/ProfilePage.jsx";

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
        path: "/marketplace/:id?",
        element: <MarketPlace />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
