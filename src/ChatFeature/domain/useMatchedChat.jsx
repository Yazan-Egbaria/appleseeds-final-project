import { useState, useEffect, useCallback } from "react";
import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase"; // Your Firebase setup
import initializeChat from "../data/initializeChat"; // The function to initialize chat

function useMatchedChat(user1Id, user2Id) {
  const [chatState, setChatState] = useState([]);

  const [isChatInitialized, setIsChatInitialized] = useState(false); // Track initialization
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(true); // Loading state for chat data

  //with sort we make sure to have predictable chat ID
  const chatId = [user1Id, user2Id].sort().join("-"); 
  const chatRef = doc(collection(db, "chats"), chatId); // Reference to the chat document

  useEffect(() => {
    const setupChat = async () => {
      // Initialize chat if not present
      if (!isChatInitialized) {
        await initializeChat(user1Id, user2Id); // Only initialize once
        setIsChatInitialized(true); // Mark chat as initialized
      }

      // Listen for updates to the chat document
      const unsubscribe = onSnapshot(chatRef, (docSnap) => {
        if (docSnap.exists()) {
          const chatData = docSnap.data();
          setChatState(chatData.messages || []);
          setIsLoadingChat(false); // Data loaded, set loading to false
        }
      });

      return () => unsubscribe(); // Cleanup listener
    };

    setupChat();
  }, [user1Id, user2Id, chatRef, isChatInitialized]);

  const sendMes = useCallback(
    async (text1) => {
      const newMessage = {
        sender: user1Id,
        text: text1,
        timestamp: Date.now(),
      };

      try {
        setIsLoadingSend(true); // Start loading
        const chatRef = doc(db, "chats", chatId);

        await updateDoc(chatRef, {
          messages: arrayUnion(newMessage),
        });

        console.log("Message sent successfully!");
      } catch (error) {
        console.error("Failed to send message:", error);
      } finally {
        setIsLoadingSend(false); // End loading
      }
    },
    [chatRef, user1Id],
  );

  return { chatState, sendMes, isLoadingChat, isLoadingSend };
}

export default useMatchedChat;
