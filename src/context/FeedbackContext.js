// import { v4 as uuidv4 } from "uuid";
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feeback
  const fetchFeedback = async () => {
    const response = await fetch("api/feedback?_sort=_id&_order=desc");
    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    // newFeedback._id = parseInt(uuidv4()); // add _id to newFeedback object
    // and parseInt because uuid4() returns a string and we have propType of number

    // this
    setFeedback((prevVal) => {
      return [data, ...prevVal];
    });
    // same as this
    // setFeedback([newFeedback, ...feedback]);
  };

  // Delete feedback
  const deleteFeedback = async (_id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      await fetch(`/api/feedback/${_id}`, {
        method: "DELETE",
      });

      setFeedback(feedback.filter((item) => item._id !== _id));
    }
  };

  // Update feedback item
  const updateFeedback = async (_id, updItem) => {
    const response = await fetch(`/api/feedback/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item._id === _id ? { ...item, ...data } : item))
    );
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
