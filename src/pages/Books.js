import React, { useState, useEffect } from "react";
import { Image, Badge } from "react-bootstrap";

import UserService from "../services/user.service";
import { Link } from "react-router-dom";

const Books = () => {
  const [content, setContent] = useState();

  useEffect(() => {
    UserService.getBooks().then(
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
  }, []);

  function BookEntry({bookData}){
    return(
        <div className="border p-3 shadow m-2 overflow-hidden" style={{height:"20vh"}}>
          <Link to={`/book/${bookData.id}`} className="text-decoration-none">
              <Image src={bookData.imageUrl} thumbnail fluid className="img-thumbnail float-left mx-2 img-fluid p-1 h-100"/>

              <h5 className="mx-2">{bookData.title}</h5>
            </Link>
            {/*<Button {...(bookData.bookAmount < 1) ? "disabled" : ""} className="float-end mx-1">Zobacz</Button>*/}
        
            <span className="ml-2">Autorzy: {bookData.authors.map((author) => 
                <span className="ml-1 p-1 border rounded" key={author.id}>{author.firstname + " " +author.lastname}</span>
            )}</span>
            <span className="ml-2">Kategorie: {bookData.categories.map((category) => 
                <Badge bg="primary" className="ml-1 text-white" key={category.id}>{category.name}</Badge>
            )}</span>
            <span className="ml-2">Tagi: {bookData.tags.map((tag) => 
                <Badge bg="primary" className="ml-1 text-white" key={tag.id}>{tag.name}</Badge>
            )}</span>
            <p className="m-3">Opis: {bookData.description}</p>
        </div>
    )
}

  return (
    <div className="container bg-light">
        <h3>Books page</h3>
        {content && content.map((book) =>
            <BookEntry bookData={book} key={book.id}/>
        )}
    </div>
  );
};

export default Books;
