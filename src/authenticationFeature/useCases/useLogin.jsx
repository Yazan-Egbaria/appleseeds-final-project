import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useFetchAndSetAccount } from "../useCases/useFetchAndSetAccount";

export const useLogin = () => {
  const fetchAndSetAccount = useFetchAndSetAccount();

  return async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const userId = userCredential.user.uid;
      console.log("Log in with :", userId);

      // Fetch and set the app account in Recoil
      await fetchAndSetAccount(userId);

      console.log("User logged in successfully!");
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.message };
    }
  };
};
