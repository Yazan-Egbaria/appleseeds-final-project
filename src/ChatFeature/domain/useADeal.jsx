import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export function useADeal() {
  const initiateDeal = async (user1Id, user2Id, price) => {
    try {
      const user1Ref = doc(db, "users", user1Id);
      const user2Ref = doc(db, "users", user2Id);

      // Fetch user1 and user2 data
      const user1Snap = await getDoc(user1Ref);
      const user2Snap = await getDoc(user2Ref);

      if (!user1Snap.exists() || !user2Snap.exists()) 
        throw new Error("User not found");

      const user1Coins = user1Snap.data().coins || -1;
      const user2Coins = user2Snap.data().coins || 0;

      if (user1Coins < price) {
        throw new Error("Insufficient coins");
      }

      // Update coin balances
      await updateDoc(user1Ref, { coins: user1Coins - price });
      await updateDoc(user2Ref, { coins: user2Coins + price });

      return true; // Success
    } catch (error) {
      console.error("Deal process failed:", error);
      return false; // Failure
    }
  };

  return { initiateDeal };
}