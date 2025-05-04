import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaTrashAlt, FaEdit } from "react-icons/fa"; // Import react-icons
import Loading from "../Loading";
import Contribution from "./Contribution";
import { AppContext } from "../context/Context";

const BookDetail = () => {
  const { bookId } = useParams(); 
  const navigate = useNavigate();
  const { book, setBook, error, setError, token } =
    useContext(AppContext).value;
  const [loading, setLoading] = useState(true);

  // Fetch book details
  const fetchBook = async () => {
    if (!token) {
      setError("You are not logged in. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:4000/api/book/${bookId}`,{
        headers:{Authorization: `Bearer ${token}`

        }
      }) 
      setBook(res.data)
      setError(null)

      
    } catch (error) {
      if (error.response?.status===401){
        setError('you are not authorised please log in ')
        navigate('/login')
      }
      else{
        setError(error.response?.data?.message || 'failed to load details')
      }
   
    }   finally{
      setLoading(false)
    }
    }

  //   try {
  //     const res = await axios.get(`http://localhost:4000/api/book/${bookId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     setBook(res.data);
  //     setError(null);
  //   } catch (err) {
  //     if (err.response?.status === 401) {
  //       setError("You are not authorized. Please log in.");
  //       navigate("/login");
  //     } else {
  //       setError(err.response?.data?.message || "Failed to load book details.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Delete contribution
  const deleteContribution = async (index) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/api/book/${bookId}/contributions/${book.contributions[index]._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update state to remove the deleted contribution
      setBook((prevBook) => {
        const updatedContributions = prevBook.contributions.filter(
          (contribution, i) => i !== index
        );
        return { ...prevBook, contributions: updatedContributions };
      });
    } catch (err) {
      setError("Failed to delete contribution");
    }
  };

  // Edit contribution
  const editContribution = async (index, updatedText) => {
    if (updatedText.trim() === "") {
      deleteContribution(index);
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:4000/api/book/${bookId}/contributions/${book.contributions[index]._id}`,
        { text: updatedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    
      setBook((prevBook) => {
        const updatedContributions = prevBook.contributions.map((contribution, i) =>
          i === index ? { ...contribution, text: updatedText, isEditing: false } : contribution
        );
        return { ...prevBook, contributions: updatedContributions };
      });
    } catch (err) {
      setError("Failed to update contribution");
    }
  };

  // Add a new contribution to the list
  const addNewContribution = (newContribution) => {
    setBook((prevBook) => ({
      ...prevBook,
      contributions: [...prevBook.contributions, newContribution],
    }));
  };

  useEffect(() => {
    fetchBook();
  }, [bookId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 font-medium text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-10 mb-72">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">{book.title}</h1>
      <p className="text-gray-700 mb-4">{book.description}</p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contributions</h2>
      {book.contributions?.length > 0 ? (
        book.contributions.map((contribution, index) => (
          <div
            key={index}
            className={`mb-6 p-4 shadow-md rounded-lg border border-gray-200 ${
              index % 2 === 0 ? "bg-white" : "bg-gray-100"
            }`}
          >
            <div
              className={`flex ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              } items-center mb-2`}
            >
              <span
                className={`inline-block font-semibold px-2 py-1 rounded-full ${
                  index % 2 === 0 ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"
                }`}
              >
                {contribution.contributor?.name || "Unknown"}
              </span>
              <span className="text-sm text-gray-400 ml-4">
                {new Date(contribution.date).toLocaleDateString()}
              </span>
            </div>
            {contribution.isEditing ? (
              <div>
                <textarea
                  value={contribution.text}
                  onChange={(e) => {
                    const updatedContributions = [...book.contributions];
                    updatedContributions[index].text = e.target.value;
                    setBook((prevBook) => ({ ...prevBook, contributions: updatedContributions }));
                  }}
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />
                <button
                  onClick={() => editContribution(index, contribution.text)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="text-gray-800 text-lg font-medium">{contribution.text}</p>
            )}
            <div className="flex justify-end mt-2">
              <FaEdit
                onClick={() => {
                  const updatedContributions = [...book.contributions];
                  updatedContributions[index].isEditing = true;
                  setBook((prevBook) => ({ ...prevBook, contributions: updatedContributions }));
                }}
                className="text-yellow-500 cursor-pointer mr-2"
              />
              <FaTrashAlt
                onClick={() => deleteContribution(index)}
                className="text-red-500 cursor-pointer"
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No contributions yet.</p>
      )}

      {/* Add Contribution Component */}
      <Contribution bookId={bookId} onNewContribution={addNewContribution} />
    </div>
  );
};

export default BookDetail;
