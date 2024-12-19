import "../userPage/ProfilePage.css";
import { useState } from "react";
import UserPreview from "./components/UserPreview";
import UserInfo from './components/UserInfo';


export default function ProfilePage() {

  const [user, setUser] = useState({
    name: "Ohad",
    age: 35,
    email: "ohad35@gmail.com",
    password: "12345",
    academicProfession: "engineering",
    culture: "Jewish",
    phoneNumber: "123-456-7890",
    academicInstitution: "University of Haifa",
    typeOfService: "Private classes",
    aboutMe: "Passionate about design and innovation.",
    experience: "year",
    rating: "4.7/5",
    basicStatistics: "10+ projects completed",
    profileImg: "https://via.placeholder.com/150",
    feedback: "daniel: amazing, shara: good",
    isEditing: false,
  });

  const TypeOfService = [
    "Exam preparation",
    "Private lessons",
    "Professional intention",
  ];
  const Culture = ["Arab", "Jewish"];
  const AcademicInstitution = [
    "University of Haifa",
    "Tel Aviv University",
    "The Hebrew University",
    "Technnyon",
  ];
  const areasOfInterest = ["Chess", "Programming", "Cooking"];
  const Experience = ["year", "2-5 years", "5-10 years", "10 and above"];
  const academicProfession = [
    "social science",
    "exact sciences",
    "engineering",
  ];

  function toggleEdit() {
    setUser((prevUser) => {
      const updatedUser = Object.assign({}, prevUser);
      updatedUser.isEditing = !updatedUser.isEditing;
      return updatedUser;
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return Object.assign({}, prevUser, { [name]: value });
    });
  }


  const userData = {
    name: "David Levy",
    title: "Software Engineer",
    imageUrl: "https://via.placeholder.com/150",
    coins: 50,
    bio: "Hi, I’m a passionate developer from Haifa, studying at the Technion. I enjoy working on innovative projects and sharing my knowledge to help others succeed.",
  };

  const userInfoData = {
    city: "Haifa",
    culture: "Jewish",
    instagram: "#",
    facebook: "#",
    language: "Hebrew, English",
    education: "Software Engineer",
    university: "Technion",
  };

  return (
    <div className="container">
      <div className="sectionHeader">
        <h1>Profile</h1>
        <button>Edit Profile</button>
      </div>
      <article className="HeroSection">
        <UserPreview user={userData} />
        <UserInfo userInfo={userInfoData} />
      </article>

      <div className="square middle">
        <h3>academicProfession: </h3>
        {user.isEditing ? (
          <select
            name="academicProfession"
            value={user.academicProfession}
            onChange={handleChange}
          >
            {academicProfession.map((proffesion, index) => (
              <option key={index} value={proffesion}>
                {proffesion}
              </option>
            ))}{" "}
          </select>
        ) : (
          <p> {user.academicProfession}</p>
        )}

        <h3>Culture: </h3>
        {user.isEditing ? (
          <select name="culture" value={user.culture} onChange={handleChange}>
            {Culture.map((culture, index) => (
              <option key={index} value={culture}>
                {culture}
              </option>
            ))}{" "}
          </select>
        ) : (
          <p> {user.culture}</p>
        )}

        <h3>Academic Institution: </h3>
        {user.isEditing ? (
          <select
            name="academicInstitution"
            value={user.academicInstitution}
            onChange={handleChange}
          >
            {AcademicInstitution.map((academicInstitution, index) => (
              <option key={index} value={academicInstitution}>
                {academicInstitution}
              </option>
            ))}{" "}
          </select>
        ) : (
          <p> {user.academicInstitution}</p>
        )}

        <h3>Type of Service: </h3>
        {user.isEditing ? (
          <select
            name="typeOfService"
            value={user.typeOfService}
            onChange={handleChange}
          >
            {TypeOfService.map((typeOfService, index) => (
              <option key={index} value={typeOfService}>
                {typeOfService}
              </option>
            ))}{" "}
          </select>
        ) : (
          <p> {user.typeOfService}</p>
        )}

        <h3>Experience:</h3>
        {user.isEditing ? (
          <select
            name="experience"
            value={user.experience}
            onChange={handleChange}
          >
            {Experience.map((experience, index) => (
              <option key={index} value={experience}>
                {experience}
              </option>
            ))}{" "}
          </select>
        ) : (
          <p> {user.experience}</p>
        )}
      </div>

      <div className="square bottom">
        <h3>Feedback:</h3>
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

      <button onClick={toggleEdit}>
        {user.isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
}
