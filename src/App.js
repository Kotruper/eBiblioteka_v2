import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
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


const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState();
  const [showAdminBoard, setShowAdminBoard] = useState();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user?.role == "employee");
      setShowAdminBoard(user?.role == "admin");
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

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
          <Route path="/profile" element={<Profile/>} />
          <Route path="/user" element={<BoardUser/>} />
          <Route path="/mod" element={<BoardModerator/>} />
          <Route path="/admin" element={<BoardAdmin/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
