import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import bgImage from './bg.jpg';

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
import Navbar from "./components/Navbar";

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


const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div style={{backgroundImage: "url("+bgImage+")", height: "100vh"}} >

      <Navbar user={currentUser}/>

      <div className="container mt-3" >
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/books" element={<Books/>} />
          <Route path="/book/:id" element={<BookPage/>} />
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
          
        </Routes>
      </div>
    </div>
  );
};

export default App;
