import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import Root, { loader as rootLoader } from "./routes/root";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Contact, { loader as contactLoader } from "./routes/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
  {
    path: "contact/:contactId",
    element: <Contact />,
    errorElement: <ErrorPage />,
    loader: contactLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     loader: rootLoader,
//     children: [
//       {
//         path: "contact/:contactId",
//         element: <Contact />,
//         loader: contactLoader,
//       },
//     ],
//   },
// ]);
