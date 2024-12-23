import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";

const categorizeUsers = async () => {
  const categories = {
    "Basic Programming": [],
    "Full-Stack Development": [],
    "Front-End Development": [],
    "Back-End Development": [],
    "Mobile Development": [],
    "Data Analysis": [],
    "UI/UX Design": [],
    "Graphic Design": [],
    "Video Editing": [],
    "Digital Marketing": [],
  };

  try {
    const usersCollectionRef = collection(db, "users");
    const querySnapshot = await getDocs(usersCollectionRef);

    querySnapshot.forEach((doc) => {
      const user = { id: doc.id, ...doc.data() };

      // Determine the category based on the profession
      user.profession.forEach((prof) => {
        if (categories[prof]) {
          categories[prof].push(user);
        }
      });
    });

    console.log("Categorized users:", categories);
    return categories;
  } catch (error) {
    console.error("Error categorizing users:", error);
    throw error;
  }
};

export default categorizeUsers;
