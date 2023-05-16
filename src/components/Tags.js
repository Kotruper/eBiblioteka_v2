import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Tags = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getTags().then(
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
        <h1>Tags page:</h1>
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Tags;
