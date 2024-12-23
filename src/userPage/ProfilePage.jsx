import "../userPage/ProfilePage.css";
import { useState } from "react";
import UserPreview from "./components/UserPreview";
import UserInfo from "./components/UserInfo";
import AttributeContainer from "./components/AttributeContainer";
import { useParams } from "react-router-dom";
export default function ProfilePage() {
  //the shred db user object
  const [user, setUser] = useState([{
    name: "Ohad",
    coins: 100,
    rating: "3.7",
    basicStatistics: "need to be improved...",
    feedback: "daniel: amazing, shara: good",
    profileImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQi2Mm5P8j09P4hPKa1B-t9eIOHzHmR7IBkw&s",
    language: ["Hebrew"],
    profession: "engineering",
    culture: "Jewish",
    academicInstitution: "University of Haifa",
    typeOfService: ["Private lessons"],
    MySkills: ["Programming"],
    aboutMe: "Passionate about design and innovation.",
    experience: "year",
    id:"1"
  }]);
  const {id}=useParams();/*retrieve the id using useParams*/
  const profile=user.find(User=>User.id===id);/*choose the correct profile using the id*/
  if (!profile) {
    return <div>Profile not found</div>; // Handle case where profile is not found
  }
  const [isEditing, setIsEditing] = useState(false);

  //const data menu
  const TypeOfService = [
    "Exam preparation",
    "Private lessons",
    "Professional intention",
  ];

  const TypeOfSkills = ["Chess", "Programming", "Cooking"];
 
  function toggleEdit() {
    setIsEditing((isEditingPrev) => {
      return !isEditingPrev;
    });
  }
  const handleDropdownChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <div className="container">
      <div className="pageHeader">
        <h1 className="section-header">User Profile</h1>
        <button onClick={() => toggleEdit()}>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
      <article className="HeroSection">
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

      <h1 className="section-header">My services</h1>
      <AttributeContainer
        user={profile}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"typeOfService"}
        options={TypeOfService}
      />

      <h1 className="section-header">My skills</h1>
      <AttributeContainer
        user={profile}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"MySkills"}
        options={TypeOfSkills}
      />

      <h1 className="section-header">Feedback</h1>
      <div className="square bottom">
        <div className="feedback-item">
          <div className="feedback-header">
            <img
              src="https://via.placeholder.com/50"
              alt="Daniel"
              className="feedback-avatar"
            />
            <h5>
              <a href="/profile/daniel" className="feedback-name">
                Daniel
              </a>
            </h5>
          </div>
          <p className="feedback-comment">Amazing professional!</p>
        </div>

        <div className="feedback-item">
          <div className="feedback-header">
            <img
              src="https://via.placeholder.com/50"
              alt="Sarah"
              className="feedback-avatar"
            />
            <h5>
              <a href="/profile/daniel" className="feedback-name">
                Sarah
              </a>
            </h5>
          </div>
          <p className="feedback-comment">Good!</p>
        </div>
      </div>
    </div>
  );
}
