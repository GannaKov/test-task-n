import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import Root, {
  loader as rootLoader,
  action as createAction,
} from "./routes/root";
import { action as destroyAction } from "./routes/destroy";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/Contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: createAction,
  },
  {
    path: "/destroy/:contactId",
    action: destroyAction,
  },
  {
    path: "contact/:contactId",
    element: <Contact />,
    errorElement: <ErrorPage />,
    loader: contactLoader,
    action: contactAction,
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
