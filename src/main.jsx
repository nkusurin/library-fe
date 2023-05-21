import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import BookDetailsPage from "./pages/books/bookDetailsPage.jsx";
import Books from "./pages/books/books.jsx";
import Publishers from "./pages/publishers/publishers.jsx";
import { book } from "./mock";
import NewBookPage from "./pages/books/newBookPage";
import WelcomePage from "./pages/WelcomePage";
import NewPublisherPage from "./pages/publishers/newPublisherPage";
import EditPublisherPage from "./pages/publishers/editPublisherPage";
import NewLoanPage from "./pages/loans/newLoanPage";
import EditLoanPage from "./pages/loans/editLoanPage";
import EditBookPage from "./pages/books/editBookPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/book-details/:id",
    element: <BookDetailsPage />,
  },
  {
    path: "/new-book",
    element: <NewBookPage />,
  },
  {
    path: "/edit-book/:id",
    element: <EditBookPage />,
  },
  {
    path: "/publishers",
    element: <Publishers />,
  },
  {
    path: "/new-publisher",
    element: <NewPublisherPage />,
  },
  {
    path: "/edit-publisher/:id",
    element: <EditPublisherPage />,
  },
  {
    path: "/new-loan/:id",
    element: <NewLoanPage />,
  },
  {
    path: "/edit-loan/:loanId",
    element: <EditLoanPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
