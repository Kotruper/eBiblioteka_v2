import { useLoaderData } from "react-router-dom";
import useUser from "../services/useUser";
import { Row,Col,Stack,Button,Badge,Image, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { useState } from "react";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title is required"),
    authors: Yup.array()
        .min(1,"You need at least one author"),
    categories: Yup.array()
        .of(Yup.number()),
    tags: Yup.array()
        .of(Yup.number()),
    description: Yup.string().
        required("Description is required"),
    imageUrl: Yup.string()
        .url("This is not a valid link")
        .required("A cover image link is required"),
})

export default function BookEdit(){
    const [content, setContent] = useState(useLoaderData());
    const [currentUser] = useUser();

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: content
      });

    return(
        <div className="container bg-light shadow-lg">
      <Link to={"./.."}>{"<< Powrót"}</Link>
        {content ?  
        <form>
            <Container className="border p-3" fluid>
            <Row md={3}>
                <Col md={3} className="text-center">
                    <Image src={content.imageUrl} thumbnail className="mx-2"/>
                    <input 
                        name="imageUrl" 
                        type="text" 
                        {...register('imageUrl')}
                        className={"form-control" + (errors.username ? 'is-invalid' : '')}
                    />
                </Col>
                <Col fluid={"true"} md={9}>
                <Stack className="float-right">
                    <Button {...(content.bookAmount < 1) ? "disabled" : ""} className="mx-1">Wypożycz</Button>
                </Stack>
                <h1 className="mx-2">
                    <input
                        name="title"
                        type="text"
                        {...register('title')}
                        className={"form-control" + (errors.username ? 'is-invalid' : '')}
                    />
                </h1>
                
                <p>Autorzy: {content.authors.map((author) => //Bruh
                    <span className="ml-1 p-1 border rounded" key={author.id}>{author.firstname + " " +author.lastname}</span>
                )}</p>
                <p>Kategorie: {content.categories.map((category) => 
                    <Badge bg="primary" className="ml-1 text-white" key={category.id}>{category.name}</Badge>
                )}</p>
                <p>Tagi: {content.tags.map((tag) => 
                    <Badge bg="primary" className="ml-1 text-white" key={tag.id}>{tag.name}</Badge>
                )}</p>
                <p className="m-3">Opis: {content.description}</p>
                </Col>

                
            </Row>
            </Container>
        </form>
        :
        <div>loading</div>} 
    </div>
    );
}