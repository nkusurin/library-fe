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
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2 text-center">
        Nova knjiga
      </h1>{" "}
      <BookForm book={book} />
    </>
  );
}

export default NewBookPage;
