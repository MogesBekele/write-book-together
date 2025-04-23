import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookPage = () => {
  const [book, setBook] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const fetchBook = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/book');
      setBook(res.data);
    } catch (err) {
      console.error('Failed to fetch book:', err);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      setLoading(true);
      await axios.post(
        'http://localhost:4000/api/book/contribute',
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setContent('');
      fetchBook(); // Refresh
    } catch (err) {
      console.error('Failed to contribute:', err);
      alert('Contribution failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        {book?.title || 'Write Together Book'}
      </h1>

      {/* Contributions */}
      <div className="space-y-4 mb-8">
        {book?.contributions?.map((contrib, i) => (
          <div
            key={i}
            className="bg-gray-100 p-4 rounded-md shadow-sm"
          >
            <p className="text-sm font-semibold text-blue-600 mb-1">
              {contrib.username || 'Unknown'}
            </p>
            <p className="text-gray-800">{contrib.content}</p>
          </div>
        ))}
      </div>

      {/* Contribution Form */}
      <div>
        <textarea
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          placeholder="Write your contribution here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Submit Contribution'}
        </button>
      </div>
    </div>
  );
};

export default BookPage;
