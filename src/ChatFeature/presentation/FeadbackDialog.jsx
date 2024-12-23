import React, { useState } from "react";
import { useFeedback } from "../domain/useFeadback"; // Custom hook to manage feedback submission
import "../presentation/style/feadbackDiaog.css";

   function FeedbackDialog({
     userIdtoFeadBack = "2SP0OZ6QHwQkosr2BHqMvsJZK4u1",
     myId = "LLSbAg2TO6XWGxSgxayeplS6xj93",
     closeDialog,
   }) {
     const [rating, setRating] = useState(0); // Rating input
     const [comment, setComment] = useState(""); // Comment box input

     const { submitFeedback, loading, error } = useFeedback(
       myId,
       userIdtoFeadBack,
     );

     const handleSubmit = async () => {
       if (!rating || !comment.trim()) {
         alert("Please provide a rating and a comment!");
         return;
       }

       const success = await submitFeedback({ rating, comment });
       if (success) {
         alert("Feedback submitted successfully!");
         closeDialog();
       } else {
         alert("Failed to submit feedback.");
       }
     };

     return (
       <div className="feedback-dialog">
         <h2>Leave Feedback</h2>
         <div className="rating">
           <label>Rating:</label>
           {[1, 2, 3, 4, 5].map((star) => (
             <span
               key={star}
               className={star <= rating ? "star selected" : "star"}
               onClick={() => setRating(star)}
             >
               ★
             </span>
           ))}
         </div>
         <textarea
           value={comment}
           onChange={(e) => setComment(e.target.value)}
           placeholder="Leave your feedback here..."
         />
         <button onClick={handleSubmit} disabled={loading}>
           {loading ? "Submitting..." : "Submit Feedback"}
         </button>
         {error && <p className="error">{error}</p>}
       </div>
     );
   };

export default FeedbackDialog;
