import {React, StrictMode} from "react";
import {createRoot} from "react-dom/client";
import { Routes, Route, Link, Outlet, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider, redirect } from "react-router-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import AuthService from "./services/auth.service";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import BoardUser from "./pages/BoardUser";
import BoardModerator from "./pages/BoardModerator";
import BoardAdmin from "./pages/BoardAdmin";

import Books from "./pages/Books";
import Authors from "./pages/Authors";
import Tags from "./pages/Tags";
import Categories from "./pages/Categories";
import BookPage from "./pages/BookPage";

const ProtectedRoute = ({
  isAllowed,
  redirectPath = '/home',
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const currentUser = AuthService.getCurrentUser();

const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route element={<App/>} >
        <Route path="/" element={<Home/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/books/:id" element={<BookPage/>} />
        <Route path="/author" element={<Authors/>} />
        <Route path="/tag" element={<Tags/>} />
        <Route path="/category" element={<Categories/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route element={<ProtectedRoute isAllowed={!!currentUser}/>}>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={currentUser && currentUser.role == "employee"}/>}>
          <Route path="/mod" element={<BoardModerator/>} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={currentUser && currentUser.role == "admin"}/>}>
          <Route path="/admin" element={<BoardAdmin/>} />
        </Route>
      </Route>
  )
)

root.render(
  <RouterProvider router={router}/>
);
serviceWorker.unregister();
