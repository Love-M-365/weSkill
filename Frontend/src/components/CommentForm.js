import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import WeSkillNavbar from "./MainNavbar";

const CommentPage = () => {
  const location = useLocation();
  const { profileId } = location.state || {};
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // To show success/error message

  const handleSubmit = async () => {
    console.log("Sending Data:", { profileId, text: comment }); // Log before sending
  
    try {
      const response = await fetch("https://weskill.onrender.com/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileId, text: comment }), // Ensure 'text' is used
      });
  
      const data = await response.json();
      console.log("Response:", data);
  
      if (response.ok) {
        setMessage("Comment submitted successfully!");
      } else {
        setMessage("Failed to submit comment.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setMessage("Error submitting comment.");
    }
  };
  
  return (
    <>
    <WeSkillNavbar></WeSkillNavbar>
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center">Leave a Comment</h2>
        <p className="text-muted text-center">
          Your comment will be **AI-processed** to generate badges for this profile.
        </p>

        <textarea
          className="form-control mb-3"
          rows="4"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button 
          className="btn btn-primary w-100"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Comment"}
        </button>

        {message && <p className="text-center mt-3 text-success">{message}</p>}
      </div>
    </div>
    </>
  );
};

export default CommentPage;
