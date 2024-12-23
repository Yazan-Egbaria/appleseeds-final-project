import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserPreview from "./components/UserPreview";
import UserInfo from "./components/UserInfo";
import AttributeContainer from "./components/AttributeContainer";
import categorizeUsers from "../FirebaseFunctions/FetchFilteredData"; // Adjust the path
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function ProfilePage() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserId(user.uid); // Set logged-in user ID
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
        console.log("All Users:", users); // Debugging
        setAllUsers(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching and categorizing users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const profile = allUsers.find((user) => String(user.id) === String(id));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const TypeOfService = [
    "Digital Marketing",
    "Graphic Design",
    "Video Editing",
  ];
  const TypeOfSkills = ["Python", "JavaScript", "C", "React", "CSS"];

  function toggleEdit() {
    setIsEditing((prev) => !prev);
  }

  const handleDropdownChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // Only show "Edit Profile" button if the logged-in user is viewing their own profile
  const showEditButton = String(loggedInUserId) === String(id);

  return (
    <div className="container mx-auto max-w-screen-lg gap-5 p-5">
      <div className="pageHeader mb-6 flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        <button className="rounded-md bg-indigo-600 px-4 py-2 text-white transition-transform duration-300 hover:bg-indigo-700">
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      <article className="HeroSection grid grid-cols-3 gap-6 p-4">
        <UserPreview
          user={profile}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
        <UserInfo
          user={profile}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
      </article>

      <h1 className="section-header mb-4 text-2xl font-bold text-blue-600">
        My services
      </h1>
      <AttributeContainer
        user={profile}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"typeOfService"}
        options={TypeOfService}
      />

      <h1 className="section-header mb-4 text-2xl font-bold text-blue-600">
        My skills
      </h1>
      <AttributeContainer
        user={profile}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"MySkills"}
        options={TypeOfSkills}
      />

      <h1 className="section-header mb-4 text-2xl font-bold text-blue-600">
        Feedback
      </h1>
      <div className="square mb-5 rounded-md bg-gray-100 p-5 shadow-md">
        <div className="feedback-item mb-3 rounded-md bg-gray-200 p-4 shadow-lg transition-all duration-300 hover:translate-y-1 hover:bg-green-100">
          <div className="feedback-header mb-3 flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="Daniel"
              className="feedback-avatar mr-3 h-12 w-12 rounded-full"
            />
            <h5>
              <a
                href="/profile/daniel"
                className="feedback-name font-bold text-blue-600"
              >
                Daniel
              </a>
            </h5>
          </div>
          <p className="feedback-comment text-sm leading-6 text-gray-600">
            Amazing professional!
          </p>
        </div>

        <div className="feedback-item mb-3 rounded-md bg-gray-200 p-4 shadow-lg transition-all duration-300 hover:translate-y-1 hover:bg-green-100">
          <div className="feedback-header mb-3 flex items-center">
            <img
              src="https://via.placeholder.com/50"
              alt="Sarah"
              className="feedback-avatar mr-3 h-12 w-12 rounded-full"
            />
            <h5>
              <a
                href="/profile/daniel"
                className="feedback-name font-bold text-blue-600"
              >
                Sarah
              </a>
            </h5>
          </div>
          <p className="feedback-comment text-sm leading-6 text-gray-600">
            Good!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
