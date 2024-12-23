import { useState, useEffect, useRef } from "react";
import useMatchedChat from "../domain/useMatchedChat";
import LoadingDialog from "../presentation/util/LoadingDialog"; // Reusable loading dialog component
import '../presentation/style/chat.css'

/*
Purpose: Manages a live chat between two matched users.
arguments:
user1Id: Represents the logged-in user's ID (current user's account).
user2Id: Represents the matched user's ID (the person the current user is chatting with).
closeChat: A function to close or exit the chat, passed as a prop.
Functionality:

Chat Initialization: The component listens for updates to the chat between the two users. If the chat doesn't exist, it * * *   initializes it in Firestore.
Real-Time Sync: The component listens to Firestore changes (new messages) and updates the UI accordingly.
Message Sending: The component allows the current user to send messages, which are appended to the chat document in Firestore.
User-Specific Chat: It fetches and displays messages in the order they were sent, ensuring each user’s messages are aligned appropriately in the UI.
*/

function ChatComponent({
  user1Id = "Bqx5GLVVEXhSRtxK2v8cIlvMXzk1",
  user2Id = "NZwoRx3zkCTtamXDjYBSlI0Tif23",
  closeChat }) {
  const { chatState, sendMes, isLoadingChat, isLoadingSend } = useMatchedChat(user1Id, user2Id);
  const [message, setMessage] = useState("");

  //scroll state controll
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if the user is at the bottom
  const [isUserScrolling, setIsUserScrolling] = useState(false); // Track if the user is scrolling
  const messagesEndRef = useRef(null); // Reference to the end of the chat messages
  const chatMessagesRef = useRef(null); // Reference to the chat messages container

  const handleSend = () => {
    if (message.trim()) {
      sendMes(message.trim());
      setMessage(""); // Clear input after sending
    }
  };

  // Handle scroll events to detect if the user is at the bottom or not
  const handleScroll = () => {
    const container = chatMessagesRef.current;
    if (container) {
      const isBottom = container.scrollHeight - container.scrollTop === container.clientHeight;
      setIsAtBottom(isBottom);
      setIsUserScrolling(true); // User is manually scrolling
    }
  };

  // Scroll to the bottom when chatState updates or message is sent, if the user is at the bottom
  useEffect(() => {
    if (isAtBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatState, isAtBottom]); // Run when chatState or isAtBottom changes

  // Scroll to the bottom initially when the component mounts
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Only run on mount

  // After message send, ensure we scroll to the bottom if the user was at the bottom
  useEffect(() => {
    if (!isUserScrolling && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isUserScrolling]); // Only run when isUserScrolling changes

  return (
    <div className="chat-container">
      <div className="chat-header">
        <span>User1 && User2 :</span>
        <button onClick={closeChat}>X</button>
      </div>

      <div
        className="chat-messages"
        ref={chatMessagesRef}
        onScroll={handleScroll}
      >
        {isLoadingChat ? (
          <LoadingDialog isLoading={true} message="Loading chat messages..." />
        ) : (
          chatState.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.sender === user1Id ? "sent" : "received"}`}
            >
              <p>{msg.text}</p>
              <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoadingSend} // Disable input while sending
        />
        <button onClick={handleSend} disabled={isLoadingSend}>
          {isLoadingSend ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default ChatComponent;




