import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { userAccountState } from "../states/userAccountState";
import { useSetRecoilState } from "recoil";

/**
 * Fetch and set the user's app account data in Recoil state.
 * @param {string} userId Firebase Authentication userId
 */
export const useFetchAndSetAccount = () => {
  const setUserAccount = useSetRecoilState(userAccountState);

  return async (userId) => {
    setUserAccount((prev) => ({ ...prev, isLoading: true })); // Set loading state
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setUserAccount({
          ...userDoc.data(),
          userId,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        throw new Error("No app account found for this user.");
      }
    } catch (error) {
      console.error("Error fetching user account:", error);
      setUserAccount((prev) => ({
        ...prev,
        isLoading: false,
        isAuthenticated: false,
      }));
    }
  };
};
