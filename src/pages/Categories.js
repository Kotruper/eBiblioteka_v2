import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Categories = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getCategories().then(
      (response) => {
        setContent(JSON.stringify(response.data));
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>Categories page:</h1>
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Categories;
