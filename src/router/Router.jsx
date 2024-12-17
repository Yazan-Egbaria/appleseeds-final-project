import { createBrowserRouter } from "react-router-dom";
import { Landing, MarketPlace, RootLayout } from "../pages";
import LoginDialog from "../authenticationFeature/components/LoginDialog";

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
        path: "/Login",
        element: <LoginDialog />,
      },
    ],
  },
]);
