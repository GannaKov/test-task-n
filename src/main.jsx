import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import Root, {
  // loader as rootLoader,
  action as createAction,
} from "./routes/root";
import { action as destroyAction } from "./routes/destroy";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Contact from //{ loader as contactLoader }
"./routes/Contact/Contact";
import { getContactById, getContacts } from "./services/requests";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const contacts = await getContacts();
      return { contacts };
    },
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
    loader: async ({ params }) => {
      const result = await getContactById(params.contactId);
      return { result };
    },
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
