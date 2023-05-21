import { useState } from "react";
import BookForm from "./BookForm";

function NewBookPage() {
  let book = {
    title: "",
    description: "",
    availability: "dostupno",
    genre: {
      name: "",
    },
    publisher: {
      name: "",
    },
  };

  return (
    <>
      <h1>Nova knjiga</h1>
      <BookForm book={book} />
    </>
  );
}

export default NewBookPage;
