import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayData from "./DisplayData";

export default function DisplayBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/allbooks")
      .then(res => setBooks(res.data));
  }, []);

  return <DisplayData books={books} />;
}