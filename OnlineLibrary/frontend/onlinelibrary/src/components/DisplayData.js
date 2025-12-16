import React from "react";
import { Link } from "react-router-dom";

export default function DisplayData({ books }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Design</th>
          <th>Designer</th>
          <th>Theme</th>
          <th>Type</th>
          <th>Year</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map(b => (
          <tr key={b._id}>
            <td>{b.booktitle}</td>
            <td>{b.author}</td>
            <td>{b.Topic}</td>
            <td>{b.formate}</td>
            <td>{b.PubYear}</td>
            <td>
              <Link to={`/edit/${b._id}`}>Edit</Link> |
              <Link to={`/delete/${b._id}`}>Delete</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}