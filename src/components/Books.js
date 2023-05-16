import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Books = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getBooks().then(
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
        <h3>Books page</h3>
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Books;
