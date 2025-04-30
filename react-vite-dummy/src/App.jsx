import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home";
import About from "./components/About";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/about",
    Component: About,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
