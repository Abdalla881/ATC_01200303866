import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import ErrorPage from "./components/ErrorPage";
import Register from "./components/Register";
import Login from "./components/Login";
import TicketsPage from "./components/TicketsPage";
import Cart from "./components/Cart";
import UnderProcessingPage from "./components/UnderProcessingPage"; // <-- Import the new page

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/events",
    element: <TicketsPage />,
  },
  {
    path: "/events/category/:categoryId",
    element: <TicketsPage />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/under-processing", // <-- Add this route
    element: <UnderProcessingPage />, // <-- Set the component to render
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
