import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { bookId } = useParams();
  console.log("Book ID from URL:", bookId);
  const [book, setBook] = useState(null);
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) {
        console.error("Book ID is undefined");
        return;
      }
      try {
        const res = await axios.get(`http://localhost:4000/api/book/${bookId}`);
        setBook(res.data);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleContribute = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:4000/api/book/contribute/${bookId}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Contribution added!');
      setText('');
    } catch (error) {
      alert('Failed to contribute');
      console.error(error);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>

      <h3>Contribute to this book</h3>
      <form onSubmit={handleContribute}>
        <textarea
          placeholder="Write your contribution..."
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button type="submit">Submit Contribution</button>
      </form>

      <h3>Contributions</h3>
      {book.contributions?.map((c, idx) => (
        <div key={idx}>
          <p>{c.text}</p>
          <small>By user {c.contributor}</small>
        </div>
      ))}
    </div>
  );
};

export default BookDetails;
