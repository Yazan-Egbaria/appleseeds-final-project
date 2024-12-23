import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserPreview from "./components/UserPreview";
import UserInfo from "./components/UserInfo";
import AttributeContainer from "./components/AttributeContainer";
import categorizeUsers from "../FirebaseFunctions/FetchFilteredData";
import { auth, db } from "../firebase"; // Import db (Firestore)
import { onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore"; // Import Firestore functions

function ProfilePage() {
  const [currentUser, setCurrentUser] = useState({}); // Renamed to currentUser
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const categorizedData = await categorizeUsers();
        const users = Object.values(categorizedData).flat();
        setAllUsers(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching and categorizing users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", id); // Replace "users" with your Firestore collection name
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCurrentUser(userSnap.data()); // Updated to setCurrentUser
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  const profile = allUsers.find((user) => String(user.id) === String(id));

  if (loading) {
    return <div>Loading...</div>;
  }


export default function ProfilePage() {
  //the shred db user object
  const [user, setUser] = useState({
    name: "Ohad",
    coins: 100,
    rating: "2",
    basicStatistics: "need to be improved...",
    feedback: "daniel: amazing, shara: good",
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQi2Mm5P8j09P4hPKa1B-t9eIOHzHmR7IBkw&s",
    language: ["Hebrew"],
    profession: "engineering",
    culture: "Jewish",
    academicInstitution: "University of Haifa",
    typeOfService: ["Digital Marketing"],
    MySkills: ["JavaScript"],
    aboutMe: "Passionate about design and innovation.",
    experience: "year",
    id:"1"
  });
  //const {id}=useParams();/*retrieve the id using useParams*/
  const profile = user//.find(User=>User.id===id);/*choose the correct profile using the id*/
  //if (!profile) {
   // return <div>Profile not found</div>; // Handle case where profile is not found
 // }
  const [isEditing, setIsEditing] = useState(false);

  if (!profile) {
    return <div>Profile not found</div>;
  }


  const TypeOfService = [
    "Digital Marketing",
    "Graphic Design",
    "Video Editing",
  ];
  const TypeOfSkills = ["Python", "JavaScript", "C", "React", "CSS"];

  // Function to update user data in Firestore
  const updateUserInFirebase = async (userId, updatedData) => {
    try {
      const userRef = doc(db, "users", userId); // Replace "users" with your Firestore collection name
      await updateDoc(userRef, updatedData);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  // Toggle edit mode and save changes
  function toggleEdit() {
    if (isEditing) {
      updateUserInFirebase(id, currentUser); // Save changes to Firestore
    }
    setIsEditing((prev) => !prev);
  }

  // Handle dropdown change
  const handleDropdownChange = (field, value) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const showEditButton = String(loggedInUserId) === String(id);

  return (
    <div className="pagePadding container mx-auto pt-20">
      <div id="pageHeader" className="mb-4 flex items-center justify-between">
        <h1 className="mb-4 text-lg font-bold md:text-xl">User Profile</h1>
        {showEditButton && (
          <button
            className="rounded bg-blue-500 px-8 py-1 text-base font-bold text-white transition hover:bg-blue-600"
            onClick={toggleEdit}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        )}
      </div>
      <article className="grid grid-cols-1 gap-6 py-4 md:grid-cols-[67%_30%]">
        <UserPreview
          user={currentUser} // Updated to currentUser
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
        <UserInfo
          user={currentUser} // Updated to currentUser
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
      </article>
      <h1 className="mb-4 pt-20 text-lg font-bold md:text-xl">My services</h1>
      <AttributeContainer
        user={currentUser} // Updated to currentUser
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"typeOfService"}
        options={TypeOfService}
      />
      <h1 className="mb-4 pt-20 text-lg font-bold md:text-xl">My skills</h1>
      <AttributeContainer
        user={currentUser} // Updated to currentUser
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"MySkills"}
        options={TypeOfSkills}
      />
    </div>
  );
}

export default ProfilePage;
