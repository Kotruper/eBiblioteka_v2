import React, { useState, useEffect } from "react";
import { Image, Badge, Button } from "react-bootstrap";

import UserService from "../services/user.service";
import { useParams } from "react-router-dom";

const BookPage = () => {
  const [content, setContent] = useState();
  const {id} = useParams();

  useEffect(() => {
    UserService.getBookbyId(id).then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, [id]);

  return (
    <div className="container bg-light">
        <h3>Book page</h3>
        {content && 
        <div className="border p-3 shadow h-100">
            <Image src={content.imageUrl} thumbnail fluid className="h-25 float-left mx-2"/>
            <h1 className="mx-2">{content.title}</h1>
            <Button {...(content.bookAmount < 1) ? "disabled" : ""} className="float-right mx-1">Wypożycz</Button>
            {console.log(content)}
           
            <p>Autorzy: {content.authors.map((author) => 
                <span className="ml-1 p-1 border rounded" key={author.id}>{author.firstname + " " +author.lastname}</span>
            )}</p>
            <p>Kategorie: {content.categories.map((category) => 
                <Badge bg="primary" className="ml-1" key={category.id}>{category.name}</Badge>
            )}</p>
            <p>Tagi: {content.tags.map((tag) => 
                <Badge bg="primary" className="ml-1" key={tag.id}>{tag.name}</Badge>
            )}</p>
            <p className="m-3">Opis: {content.description}</p>
        </div>}
    </div>
  );
};

export default BookPage;
